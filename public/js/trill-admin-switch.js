const form=document.querySelector("[data-admin-editor]");
const links=Array.from(document.querySelectorAll("[data-office-list] a[data-office]"));
const previewPath=(slug,language)=>language==="ru"?"/"+slug+"/":"/"+language+"/"+slug+"/";
/* TRILL_ADMIN_MEDIA_SWITCH_SYNC_V4 */
const renderMedia=(kind,paths)=>{
  const output=document.querySelector("[data-upload-output="+kind+"]");
  if(!output)return;
  output.innerHTML="";
  for(const mediaPath of (Array.isArray(paths)?paths:[]).filter(Boolean)){
    const figure=document.createElement("figure");
    const image=document.createElement("img");
    const code=document.createElement("code");
    image.src=mediaPath+"?preview="+Date.now();
    image.alt="Изображение офиса";
    code.textContent=mediaPath;
    figure.append(image,code);
    output.append(figure);
  }
};
window.trillAdminPreviewLanguage=(language)=>{if(!form)return;const slug=form.dataset.objectSlug||"";if(!slug)return;const path=previewPath(slug,language);const frame=document.querySelector(".preview iframe"),open=document.querySelector(".preview header a");if(frame)frame.src=path;if(open)open.href=path;};
for(const link of links)link.addEventListener("click",(event)=>{event.preventDefault();const office=JSON.parse(link.dataset.office||"{}");if(!form||!office.pageSlug)return;form.dataset.objectSlug=office.pageSlug;if(typeof window.trillAdminApplyOffice==="function")window.trillAdminApplyOffice(form,office);renderMedia("main",[office.mainImage]);renderMedia("plan",[office.planImage]);renderMedia("gallery",office.gallery);const slug=form.querySelector("[data-admin-slug]"),heading=form.querySelector(".editor-head h2"),status=form.querySelector("[data-admin-status]");if(slug)slug.value=office.pageSlug;if(heading)heading.textContent=office.title||office.pageSlug;if(status){status.textContent="Редактируется выбранный объект.";status.dataset.state="";}const language=typeof window.trillAdminCurrentLanguage==="function"?window.trillAdminCurrentLanguage():"ru";window.trillAdminPreviewLanguage(language);for(const item of links)item.classList.toggle("active",item===link);history.replaceState({},"",link.href);});
