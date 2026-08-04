const form=document.querySelector("[data-admin-editor]");
const links=Array.from(document.querySelectorAll("[data-office-list] a[data-office]"));
const previewPath=(slug,language)=>language==="ru"?"/"+slug+"/":"/"+language+"/"+slug+"/";

const renderOfficeMedia=(office)=>{
  const apply=()=>{
    if(typeof window.trillAdminRenderMedia!=="function")return false;
    window.trillAdminRenderMedia("main",office.mainImage?[office.mainImage]:[]);
    window.trillAdminRenderMedia("plan",office.planImage?[office.planImage]:[]);
    window.trillAdminRenderMedia("gallery",Array.isArray(office.gallery)?office.gallery:[]);
    return true;
  };

  if(!apply())window.setTimeout(apply,0);
};

window.trillAdminPreviewLanguage=(language)=>{
  if(!form)return;
  const slug=form.dataset.objectSlug||"";
  if(!slug)return;

  const path=previewPath(slug,language);
  const frame=document.querySelector(".preview iframe");
  const open=document.querySelector(".preview header a");

  if(frame)frame.src=path;
  if(open)open.href=path;
};

for(const link of links){
  link.addEventListener("click",(event)=>{
    event.preventDefault();

    const office=JSON.parse(link.dataset.office||"{}");
    if(!form||!office.pageSlug)return;

    form.dataset.objectSlug=office.pageSlug;

    if(typeof window.trillAdminApplyOffice==="function"){
      window.trillAdminApplyOffice(form,office);
    }

    renderOfficeMedia(office);

    const slug=form.querySelector("[data-admin-slug]");
    const heading=form.querySelector(".editor-head h2");
    const status=form.querySelector("[data-admin-status]");

    if(slug)slug.value=office.pageSlug;
    if(heading)heading.textContent=office.title||office.pageSlug;

    if(status){
      status.textContent="Редактируется выбранный объект.";
      status.dataset.state="";
    }

    const language=typeof window.trillAdminCurrentLanguage==="function"
      ?window.trillAdminCurrentLanguage()
      :"ru";

    window.trillAdminPreviewLanguage(language);

    for(const item of links)item.classList.toggle("active",item===link);
    history.replaceState({},"",link.href);
  });
}
