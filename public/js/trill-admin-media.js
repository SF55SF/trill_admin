/* TRILL_ADMIN_MEDIA_CLIENT_FILE_START */
(()=>{
const form=document.querySelector("[data-admin-editor]");
if(!form)return;

const field=(name)=>form.querySelector('[name="'+name+'"][type="hidden"]');
const mainField=field("mainImage");
const planField=field("planImage");
const galleryField=field("gallery");
const status=form.querySelector("[data-admin-status]");

if(!(mainField instanceof HTMLInputElement)||!(planField instanceof HTMLInputElement)||!(galleryField instanceof HTMLInputElement))return;

const imageSettings={
  main:{width:1600,height:900,fit:"cover",quality:0.82},
  plan:{width:1600,height:900,fit:"contain",quality:0.82},
  gallery:{width:1200,height:675,fit:"cover",quality:0.82}
};

const setStatus=(message,state)=>{
  if(!status)return;
  status.textContent=message;
  status.dataset.state=state||"";
};

const markDirty=(message)=>{
  form.dispatchEvent(new Event("input",{bubbles:true}));
  setStatus(message||"Изменения не сохранены. Нажмите «Перевести и сохранить».","dirty");
};

const parseGallery=()=>{
  try{
    const value=JSON.parse(galleryField.value||"[]");
    return Array.isArray(value)?value.map(String).filter(Boolean):[];
  }catch{
    return [];
  }
};

const loadSource=async(file)=>{
  if("createImageBitmap" in window){
    return createImageBitmap(file,{imageOrientation:"from-image"});
  }

  return new Promise((resolve,reject)=>{
    const image=new Image();
    const url=URL.createObjectURL(file);
    image.onload=()=>{
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror=()=>{
      URL.revokeObjectURL(url);
      reject(Error("Не удалось открыть изображение"));
    };
    image.src=url;
  });
};

const canvasToDataUrl=(canvas,quality)=>new Promise((resolve,reject)=>{
  canvas.toBlob((blob)=>{
    if(!blob){
      reject(Error("Не удалось сжать изображение"));
      return;
    }

    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result||""));
    reader.onerror=()=>reject(Error("Не удалось подготовить изображение"));
    reader.readAsDataURL(blob);
  },"image/jpeg",quality);
});

const processImage=async(file,kind)=>{
  const config=imageSettings[kind]||imageSettings.gallery;
  const source=await loadSource(file);
  const width=source.width||source.naturalWidth;
  const height=source.height||source.naturalHeight;

  if(!width||!height)throw Error("Не удалось определить размер изображения");

  const canvas=document.createElement("canvas");
  canvas.width=config.width;
  canvas.height=config.height;

  const context=canvas.getContext("2d");
  if(!context)throw Error("Canvas недоступен");

  context.imageSmoothingEnabled=true;
  context.imageSmoothingQuality="high";
  context.fillStyle="#ffffff";
  context.fillRect(0,0,config.width,config.height);

  const scale=config.fit==="contain"
    ?Math.min(config.width/width,config.height/height)
    :Math.max(config.width/width,config.height/height);

  const drawWidth=width*scale;
  const drawHeight=height*scale;

  context.drawImage(
    source,
    (config.width-drawWidth)/2,
    (config.height-drawHeight)/2,
    drawWidth,
    drawHeight
  );

  if(typeof source.close==="function")source.close();

  const dataUrl=await canvasToDataUrl(canvas,config.quality);
  if(!dataUrl.startsWith("data:image/jpeg;base64,")){
    throw Error("Изображение не преобразовано в JPEG");
  }

  return dataUrl;
};

const removeMedia=(kind,index)=>{
  if(kind==="main"){
    mainField.value="";
    render("main",[]);
    markDirty("Главное фото удалено из объекта. Нажмите «Перевести и сохранить».");
    return;
  }

  if(kind==="plan"){
    planField.value="";
    render("plan",[]);
    markDirty("Планировка удалена из объекта. Нажмите «Перевести и сохранить».");
    return;
  }

  const gallery=parseGallery();
  gallery.splice(index,1);
  galleryField.value=JSON.stringify(gallery);
  render("gallery",gallery);
  markDirty("Фотография удалена из галереи. Нажмите «Перевести и сохранить».");
};

const render=(kind,paths)=>{
  const output=document.querySelector('[data-upload-output="'+kind+'"]');
  if(!output)return;

  output.innerHTML="";
  const normalized=(Array.isArray(paths)?paths:[]).filter(Boolean);

  for(const [index,path] of normalized.entries()){
    const figure=document.createElement("figure");
    const image=document.createElement("img");
    const code=document.createElement("code");
    const remove=document.createElement("button");

    figure.className="media-thumb";
    image.src=path+"?preview="+Date.now();
    image.alt=kind==="plan"?"Планировка офиса":"Изображение офиса";
    code.textContent=path;

    remove.type="button";
    remove.className="media-remove";
    remove.textContent="×";
    remove.title="Удалить изображение";
    remove.setAttribute("aria-label","Удалить изображение");
    remove.addEventListener("click",()=>removeMedia(kind,index));

    figure.append(image,remove,code);
    output.append(figure);
  }
};

window.trillAdminRenderMedia=render;

render("main",mainField.value?[mainField.value]:[]);
render("plan",planField.value?[planField.value]:[]);
render("gallery",parseGallery());

document.querySelectorAll("[data-auto-upload]").forEach((input)=>{
  input.addEventListener("change",async()=>{
    const files=Array.from(input.files||[]);
    const kind=input.getAttribute("data-auto-upload")||"gallery";
    if(!files.length)return;

    input.disabled=true;
    setStatus("Обрабатываем и сжимаем изображения...","saving");

    try{
      const paths=[];
      const start=kind==="gallery"?parseGallery().length:0;

      for(let index=0;index<files.length;index++){
        setStatus("Обработка и загрузка "+(index+1)+" из "+files.length+"...","saving");
        const dataUrl=await processImage(files[index],kind);
        const response=await fetch("/api/admin/upload",{
          method:"POST",
          credentials:"same-origin",
          headers:{"content-type":"application/json"},
          body:JSON.stringify({
            slug:form.getAttribute("data-object-slug"),
            kind,
            index:start+index+1,
            dataUrl
          })
        });

        const result=await response.json().catch(()=>({}));
        if(!response.ok)throw Error(result.error||("Ошибка загрузки: "+response.status));
        paths.push(result.path);
      }

      if(kind==="main"){
        mainField.value=paths[0]||mainField.value;
        render("main",mainField.value?[mainField.value]:[]);
      }else if(kind==="plan"){
        planField.value=paths[0]||planField.value;
        render("plan",planField.value?[planField.value]:[]);
      }else{
        const gallery=Array.from(new Set([...parseGallery(),...paths]));
        galleryField.value=JSON.stringify(gallery);
        render("gallery",gallery);
      }

      markDirty("Изображения сжаты и загружены. Нажмите «Перевести и сохранить».");
    }catch(error){
      setStatus(error instanceof Error?error.message:"Ошибка загрузки","error");
    }finally{
      input.disabled=false;
      input.value="";
    }
  });
});
})();
/* TRILL_ADMIN_MEDIA_CLIENT_FILE_END */
