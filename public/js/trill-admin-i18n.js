(function(){
var form=document.querySelector("[data-admin-editor]");
if(!form)return;
var buttons=Array.from(document.querySelectorAll("[data-admin-language]"));
var fields=Array.from(form.querySelectorAll("[data-lang-field]"));
var setLanguage=function(language){fields.forEach(function(field){field.hidden=field.getAttribute("data-lang-field")!=language;});buttons.forEach(function(button){var active=button.getAttribute("data-admin-language")==language;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});};
buttons.forEach(function(button){button.addEventListener("click",function(){setLanguage(button.getAttribute("data-admin-language")||"ru");});});
setLanguage("ru");
var mapping=[["title","titleUz","titleEn"],["detailTitle","detailTitleUz","detailTitleEn"],["workplaces","workplacesUz","workplacesEn"],["ready","readyUz","readyEn"],["officeLayout","officeLayoutUz","officeLayoutEn"],["intro","introUz","introEn"]];
var requestTranslations=async function(target,texts){var response=await fetch("/api/admin/translate",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({target:target,texts:texts})});var result=await response.json().catch(function(){return {};});if(!response.ok)throw Error(result.error||("Ошибка перевода: "+response.status));return result.translations||{};};
window.trillAdminFillTranslations=async function(formNode,values){var targets=[["uz",1],["en",2]];for(var i=0;i<targets.length;i++){var target=targets[i][0];var index=targets[i][1];var source={};for(var j=0;j<mapping.length;j++){var sourceName=mapping[j][0];var targetName=mapping[j][index];if(!String(values[targetName]||"").trim()&&String(values[sourceName]||"").trim())source[targetName]=values[sourceName];}if(!Object.keys(source).length)continue;var translated=await requestTranslations(target,source);for(var key in translated){values[key]=translated[key];var input=formNode.querySelector("[name="+key+"]");if(input&&"value" in input)input.value=translated[key];}}};
})();
