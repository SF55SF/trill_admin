/* TRILL_ADMIN_SAVE_CLIENT_FILE_START */
const form=document.querySelector("[data-admin-editor]");
if(form){
const button=form.querySelector("[data-admin-save]");
const status=form.querySelector("[data-admin-status]");
const setStatus=(message,state)=>{if(!status)return;status.textContent=message;status.dataset.state=state||"";};
/* TRILL_ADMIN_NAMING_CLIENT_START */
let createMode=false;
const addButton=document.querySelector("[data-admin-add]"),titleInput=form.querySelector("[name=title]"),slugInput=form.querySelector("[data-admin-slug]"),publishedInput=form.querySelector("[name=published]");
const existingSlugs=new Set(Array.from(document.querySelectorAll("aside nav a")).map((link)=>new URL(link.href).searchParams.get("object")).filter(Boolean));
const defaultMain=form.querySelector("[name=mainImage]")?.value||"/images/office-2-photo-1.jpg",defaultPlan=form.querySelector("[name=planImage]")?.value||"/images/office-2-plan.jpg";
const defaults={area:"0",floor:"1",workplaces:"по запросу",ready:"Доступен",officeLayout:"Открытая планировка",mainImage:defaultMain,planImage:defaultPlan,gallery:"[]"};
addButton?.addEventListener("click",()=>{const name=window.prompt("Введите название офиса, например Офис 250 м², 8 этаж");if(name===null)return;const cleanName=name.trim();if(!cleanName){window.alert("Введите название офиса");return;}const raw=window.prompt("Введите адрес страницы латиницей, например office-250m2");if(raw===null)return;const allowed="abcdefghijklmnopqrstuvwxyz0123456789-",prepared=raw.trim().toLowerCase().split(String.fromCharCode(32)).join("-"),nextSlug=Array.from(prepared).filter((char)=>allowed.includes(char)).join("").replace(/-+/g,"-").replace(/^-|-$/g,"");if(!nextSlug){window.alert("Введите адрес страницы латиницей");return;}if(existingSlugs.has(nextSlug)){window.alert("Офис с таким адресом уже существует");return;}createMode=true;form.setAttribute("data-object-slug",nextSlug);if(publishedInput instanceof HTMLInputElement)publishedInput.checked=false;for(const element of Array.from(form.elements)){const fieldName=element.getAttribute("name");if(!fieldName||element.getAttribute("type")==="file"||!("value" in element))continue;element.value=Object.prototype.hasOwnProperty.call(defaults,fieldName)?defaults[fieldName]:"";}if(titleInput instanceof HTMLInputElement)titleInput.value=cleanName;const detailInput=form.querySelector("[name=detailTitle]");if(detailInput instanceof HTMLInputElement)detailInput.value=cleanName;if(slugInput instanceof HTMLInputElement)slugInput.value=nextSlug;const heading=form.querySelector(".editor-head h2");if(heading)heading.textContent=cleanName;const preview=document.querySelector(".preview iframe");if(preview)preview.setAttribute("src","about:blank");document.querySelectorAll("[data-upload-output]").forEach((node)=>node.innerHTML="");const url=new URL(window.location.href);url.searchParams.set("object",nextSlug);window.history.replaceState({},"",url);setStatus("Название можно менять в поле выше. Заполните данные и нажмите Сохранить.","dirty");});
titleInput?.addEventListener("input",()=>{const value=titleInput.value.trim()||"Без названия",heading=form.querySelector(".editor-head h2"),active=document.querySelector(".item.active b");if(heading)heading.textContent=value;if(active&&!createMode)active.textContent=value;});
/* TRILL_ADMIN_NAMING_CLIENT_END */
form.addEventListener("input",()=>setStatus("Есть несохранённые изменения.","dirty"));
form.addEventListener("submit",async(event)=>{
event.preventDefault();
if(!button)return;
const slug=form.getAttribute("data-object-slug")||"";
const fields={};
try{
for(const entry of new FormData(form).entries()){const key=entry[0],value=entry[1];if(typeof value!=="string")continue;const raw=value.trim();if(key==="area"){const number=Number(raw.split(",").join("."));if(!Number.isFinite(number))throw Error("Некорректная площадь");fields[key]=number;}else fields[key]=raw;}
fields.published=publishedInput instanceof HTMLInputElement?publishedInput.checked:false;button.disabled=true;setStatus("Сохраняем...","saving");
const response=await fetch("/api/admin/save",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({slug,fields,create:createMode})});
const result=await response.json().catch(()=>({}));
if(!response.ok)throw Error(result.error||("Ошибка сохранения: "+response.status));
if(result.created){createMode=false;existingSlugs.add(slug);setStatus("Офис создан. После публикации обновите страницу; название можно менять в любое время.","ok");}else setStatus(result.unchanged?"Изменений нет.":"Сохранено. Обновление сайта запущено.","ok");
}catch(error){setStatus(error instanceof Error?error.message:"Ошибка сохранения","error");}
finally{button.disabled=false;}
});
}
/* TRILL_ADMIN_SAVE_CLIENT_FILE_END */
