/* TRILL_ADMIN_AUTOFIELDS_MANUAL_VISIBILITY_V11 */
/* TRILL_ADMIN_SAVE_SEQUENCE_V10 */
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
const defaults={area:"0",floor:"1",rentRate:"40",rentTax:"НДС",workplaces:"по запросу",ready:"Доступен",officeLayout:"Открытая планировка",mainImage:defaultMain,planImage:defaultPlan,gallery:"[]"};
addButton?.addEventListener("click",()=>{const name=window.prompt("Введите название офиса, например Офис 250 м², 8 этаж");if(name===null)return;const cleanName=name.trim();if(!cleanName){window.alert("Введите название офиса");return;}const raw="office "+cleanName;const allowed="abcdefghijklmnopqrstuvwxyz0123456789-",prepared=raw.trim().toLowerCase().split(String.fromCharCode(32)).join("-"),nextSlug=Array.from(prepared).filter((char)=>allowed.includes(char)).join("").replace(/-+/g,"-").replace(/^-|-$/g,"");if(!nextSlug){window.alert("Введите адрес страницы латиницей");return;}if(existingSlugs.has(nextSlug)){window.alert("Офис с таким адресом уже существует");return;}createMode=true;form.setAttribute("data-object-slug",nextSlug);if(publishedInput instanceof HTMLInputElement)publishedInput.checked=false;for(const element of Array.from(form.elements)){const fieldName=element.getAttribute("name");if(!fieldName||element.getAttribute("type")==="file"||!("value" in element))continue;element.value=Object.prototype.hasOwnProperty.call(defaults,fieldName)?defaults[fieldName]:"";}if(titleInput instanceof HTMLInputElement)titleInput.value=cleanName;const detailInput=form.querySelector("[name=detailTitle]");if(detailInput instanceof HTMLInputElement)detailInput.value=cleanName;if(slugInput instanceof HTMLInputElement)slugInput.value=nextSlug;const heading=form.querySelector(".editor-head h2");if(heading)heading.textContent=cleanName;const preview=document.querySelector(".preview iframe");if(preview)preview.setAttribute("src","about:blank");document.querySelectorAll("[data-upload-output]").forEach((node)=>node.innerHTML="");const url=new URL(window.location.href);url.searchParams.set("object",nextSlug);window.history.replaceState({},"",url);setStatus("Название можно менять в поле выше. Заполните данные и нажмите Сохранить.","dirty");});
titleInput?.addEventListener("input",()=>{const value=titleInput.value.trim()||"Без названия",heading=form.querySelector(".editor-head h2"),active=document.querySelector(".item.active b");if(heading)heading.textContent=value;if(active&&!createMode)active.textContent=value;});
/* TRILL_ADMIN_NAMING_CLIENT_END */
form.addEventListener("input",()=>setStatus("Есть несохранённые изменения.","dirty"));
form.addEventListener("submit",async(event)=>{
event.preventDefault();
if(!button)return;
const slug=form.getAttribute("data-object-slug")||"";
const fields={};
try{
const arrayNames=new Set(["features","featuresUz","featuresEn","detailFeatures","detailFeaturesUz","detailFeaturesEn"]);for(const entry of new FormData(form).entries()){const key=entry[0],value=entry[1];if(typeof value!=="string")continue;const raw=value.trim();if(key==="area"||key==="rentRate"){const number=Number(raw.split(",").join("."));if(!Number.isFinite(number))throw Error(key==="area"?"Некорректная площадь":"Некорректная ставка аренды");fields[key]=number;}else if(arrayNames.has(key)){fields[key]=raw.split(String.fromCharCode(10)).map((item)=>item.replace(String.fromCharCode(13),"").trim()).filter(Boolean);}else if(key==="translationLocks"){try{const parsed=JSON.parse(raw||"[]");fields[key]=Array.isArray(parsed)?parsed:[];}catch{fields[key]=[];}}else fields[key]=raw;}fields.seoTitle=(fields.title||"")+" — аренда офиса в бизнес-центре Trilliant";fields.description=fields.intro||fields.title||"";fields.imageAlt=(fields.title||"")+" в бизнес-центре Trilliant";const automaticFeatures=[fields.area?String(fields.area)+" м²":"",fields.floor?String(fields.floor)+" этаж":"",fields.workplaces||"",fields.ready||""].filter(Boolean);fields.features=automaticFeatures;fields.detailFeatures=automaticFeatures.slice();
fields.published=publishedInput instanceof HTMLInputElement?publishedInput.checked:false;button.disabled=true;const saveFields=async(payloadFields,createFlag)=>{const response=await fetch("/api/admin/save",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({slug,fields:payloadFields,create:createFlag})});const result=await response.json().catch(()=>({}));if(!response.ok)throw Error(result.error||("Ошибка сохранения: "+response.status));return result;};const ruFields={};for(const fieldKey of Object.keys(fields))if(!fieldKey.endsWith("Uz")&&!fieldKey.endsWith("En")&&fieldKey!=="translationLocks")ruFields[fieldKey]=fields[fieldKey];setStatus("Сохраняем русскую версию...","saving");const firstResult=await saveFields(ruFields,createMode);if(firstResult.created){createMode=false;existingSlugs.add(slug);}if(typeof window.trillAdminFillTranslations!=="function")throw Error("Модуль перевода не загружен");setStatus("Переводим все текстовые поля...","saving");await window.trillAdminFillTranslations(form,fields);setStatus("Сохраняем узбекскую и английскую версии...","saving");
const result=await saveFields(fields,false);
if(firstResult.created)setStatus("Офис создан, переведён и сохранён на трёх языках.","ok");else setStatus(firstResult.unchanged&&result.unchanged?"Изменений нет.":"Сохранено на русском, узбекском и английском языках.","ok");
}catch(error){setStatus(error instanceof Error?error.message:"Ошибка сохранения","error");}
finally{button.disabled=false;}
});
}
/* TRILL_ADMIN_SAVE_CLIENT_FILE_END */


