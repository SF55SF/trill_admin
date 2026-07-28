/* TRILL_ADMIN_SAVE_CLIENT_FILE_START */
const form=document.querySelector("[data-admin-editor]");
if(form){
const button=form.querySelector("[data-admin-save]");
const status=form.querySelector("[data-admin-status]");
const setStatus=(message,state)=>{if(!status)return;status.textContent=message;status.dataset.state=state||"";};
form.addEventListener("input",()=>setStatus("Есть несохранённые изменения.","dirty"));
form.addEventListener("submit",async(event)=>{
event.preventDefault();
if(!button)return;
const slug=form.getAttribute("data-object-slug")||"";
const fields={};
try{
for(const entry of new FormData(form).entries()){const key=entry[0],value=entry[1];if(typeof value!=="string")continue;const raw=value.trim();if(key==="area"){const number=Number(raw.split(",").join("."));if(!Number.isFinite(number))throw Error("Некорректная площадь");fields[key]=number;}else fields[key]=raw;}
button.disabled=true;setStatus("Сохраняем...","saving");
const response=await fetch("/api/admin/save",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({slug,fields})});
const result=await response.json().catch(()=>({}));
if(!response.ok)throw Error(result.error||("Ошибка сохранения: "+response.status));
setStatus(result.unchanged?"Изменений нет.":"Сохранено. Обновление сайта запущено.","ok");
}catch(error){setStatus(error instanceof Error?error.message:"Ошибка сохранения","error");}
finally{button.disabled=false;}
});
}
/* TRILL_ADMIN_SAVE_CLIENT_FILE_END */
