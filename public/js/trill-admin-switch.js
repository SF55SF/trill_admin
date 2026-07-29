const form=document.querySelector("[data-admin-editor]");
const links=Array.from(document.querySelectorAll("[data-office-list] a[data-office]"));
for(const link of links)link.addEventListener("click",(event)=>{
event.preventDefault();const office=JSON.parse(link.dataset.office||"{}");if(!form||!office.pageSlug)return;form.dataset.objectSlug=office.pageSlug;
for(const name of ["published","title","detailTitle","area","floor","rentRate","rentTax","workplaces","ready","officeLayout","intro","mainImage","planImage","gallery"]){const field=form.elements.namedItem(name);if(!field)continue;if(field instanceof HTMLInputElement&&field.type==="checkbox")field.checked=office[name]!==false;else field.value=name==="gallery"?JSON.stringify(Array.isArray(office[name])?office[name]:[]):String(office[name]??"");}
const slug=form.querySelector("[data-admin-slug]"),heading=form.querySelector(".editor-head h2"),status=form.querySelector("[data-admin-status]"),frame=document.querySelector(".preview iframe"),open=document.querySelector(".preview header a");
if(slug)slug.value=office.pageSlug;if(heading)heading.textContent=office.title||office.pageSlug;if(status){status.textContent="Редактируется выбранный объект.";status.dataset.state="";}if(frame)frame.src="/"+office.pageSlug+"/";if(open)open.href="/"+office.pageSlug+"/";
for(const item of links)item.classList.toggle("active",item===link);history.replaceState({},"",link.href);
});
