/* TRILL_ADMIN_EXISTING_OFFICES_RETRANSLATE_V5 */
/* TRILL_ADMIN_HIDDEN_AUTOFIELDS_V4 */
/* TRILL_ADMIN_TRANSLATION_COMPLETE_V3 */
(function(){
var form=document.querySelector("[data-admin-editor]");
if(!form)return;
var suffix={ru:"",uz:"Uz",en:"En"};
var languages=["ru","uz","en"];
var bases=["title","detailTitle","seoTitle","description","imageAlt","workplaces","ready","officeLayout","intro","features","detailFeatures"];
var automaticBases=["seoTitle","description","imageAlt","features","detailFeatures"];
var arrayNames=new Set(["features","featuresUz","featuresEn","detailFeatures","detailFeaturesUz","detailFeaturesEn"]);
var labels={seoTitle:{ru:"SEO-заголовок",uz:"SEO sarlavhasi",en:"SEO title"},description:{ru:"SEO-описание",uz:"SEO tavsifi",en:"SEO description"},imageAlt:{ru:"Alt-текст изображения",uz:"Rasm uchun alt matn",en:"Image alt text"},features:{ru:"Характеристики карточки — по одной строке",uz:"Karta xususiyatlari — har biri yangi qatorda",en:"Card features — one per line"},detailFeatures:{ru:"Характеристики страницы — по одной строке",uz:"Sahifa xususiyatlari — har biri yangi qatorda",en:"Page features — one per line"}};
var fieldName=function(base,language){return base+suffix[language];};
var fieldsRoot=form.querySelector(".fields");
var media=fieldsRoot?fieldsRoot.querySelector(".media"):null;
var createField=function(base,language){var control=document.createElement("input");control.type="hidden";control.name=fieldName(base,language);control.setAttribute("data-admin-automatic","");return control;};
if(fieldsRoot){for(var base of ["seoTitle","description","imageAlt","features","detailFeatures"])for(var language of languages)fieldsRoot.insertBefore(createField(base,language),media);}
var locksInput=document.createElement("input");locksInput.type="hidden";locksInput.name="translationLocks";locksInput.value="[]";if(fieldsRoot)fieldsRoot.insertBefore(locksInput,media);
var tabs=form.querySelector(".language-tabs");
var refresh=document.createElement("button");refresh.type="button";refresh.setAttribute("data-admin-refresh-translation","");refresh.textContent="Обновить из RU";refresh.hidden=true;if(tabs)tabs.appendChild(refresh);
var buttons=Array.from(document.querySelectorAll("[data-admin-language]"));
var currentLanguage="ru";
var locks=new Set(["__automatic_translation_v5"]);
var writeLocks=function(){locksInput.value=JSON.stringify(Array.from(locks));};
var parseOffice=function(link){try{return JSON.parse(link&&link.dataset.office||"{}");}catch{return {};}};
var setControlValue=function(control,value,name){if(!control)return;if(control instanceof HTMLInputElement&&control.type==="checkbox"){control.checked=value!==false;return;}if(!("value" in control))return;if(name==="gallery")control.value=JSON.stringify(Array.isArray(value)?value:[]);else if(arrayNames.has(name))control.value=Array.isArray(value)?value.join(String.fromCharCode(10)):String(value||"");else control.value=String(value??"");};
var allNames=["published","title","titleUz","titleEn","detailTitle","detailTitleUz","detailTitleEn","seoTitle","seoTitleUz","seoTitleEn","description","descriptionUz","descriptionEn","imageAlt","imageAltUz","imageAltEn","area","floor","rentRate","rentTax","workplaces","workplacesUz","workplacesEn","ready","readyUz","readyEn","officeLayout","officeLayoutUz","officeLayoutEn","intro","introUz","introEn","features","featuresUz","featuresEn","detailFeatures","detailFeaturesUz","detailFeaturesEn","mainImage","planImage","gallery"];
window.trillAdminApplyOffice=function(formNode,office){for(var name of allNames)setControlValue(formNode.elements.namedItem(name),office[name],name);locks=new Set(["__automatic_translation_v5"]);writeLocks();};
window.trillAdminCurrentLanguage=function(){return currentLanguage;};
var setLanguage=function(language){currentLanguage=language;var fields=Array.from(form.querySelectorAll("[data-lang-field]"));fields.forEach(function(field){field.hidden=field.getAttribute("data-lang-field")!=language;});buttons.forEach(function(button){var active=button.getAttribute("data-admin-language")==language;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});refresh.hidden=language==="ru";if(typeof window.trillAdminPreviewLanguage==="function")window.trillAdminPreviewLanguage(language);};
buttons.forEach(function(button){button.addEventListener("click",function(){setLanguage(button.getAttribute("data-admin-language")||"ru");});});
form.addEventListener("input",function(event){var target=event.target;if(!(target instanceof HTMLInputElement)&&!(target instanceof HTMLTextAreaElement))return;var name=target.name||"";if(!name.endsWith("Uz")&&!name.endsWith("En"))return;if(String(target.value||"").trim())locks.add(name);else locks.delete(name);writeLocks();},true);
refresh.addEventListener("click",function(){if(currentLanguage==="ru")return;for(var base of bases){var name=fieldName(base,currentLanguage);var control=form.elements.namedItem(name);if(control&&"value" in control)control.value="";locks.delete(name);}writeLocks();var status=form.querySelector("[data-admin-status]");if(status){status.textContent="Перевод будет заново создан из русской версии после сохранения.";status.dataset.state="dirty";}});
var requestTranslations=async function(target,texts){var response=await fetch("/api/admin/translate",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({target:target,texts:texts})});var result=await response.json().catch(function(){return {};});if(!response.ok)throw Error(result.error||("Ошибка перевода: "+response.status));return result.translations||{};};
window.trillAdminFillTranslations=async function(formNode,values){var savedLocks=new Set(["__automatic_translation_v5"]);for(var target of [["uz","узбекский"],["en","английский"]]){var language=target[0],source={};for(var base of bases){var sourceName=base,targetName=fieldName(base,language);var value=values[sourceName];if(Array.isArray(value)?value.length:String(value||"").trim())source[targetName]=value;else values[targetName]=Array.isArray(value)?[]:"";}var statusNode=formNode.querySelector("[data-admin-status]");if(statusNode){statusNode.textContent="Переводим все поля на "+target[1]+" язык...";statusNode.dataset.state="saving";}var translated=await requestTranslations(language,source);for(var key of Object.keys(source)){if(!Object.prototype.hasOwnProperty.call(translated,key))throw Error("Не переведено поле "+key);var sourceValue=source[key],translatedValue=translated[key];if(Array.isArray(sourceValue)){if(!Array.isArray(translatedValue)||translatedValue.length!==sourceValue.length)throw Error("Не полностью переведено поле "+key);}else if(String(sourceValue||"").trim()&&!String(translatedValue||"").trim())throw Error("Получен пустой перевод поля "+key);values[key]=translatedValue;var control=formNode.elements.namedItem(key);if(control&&"value" in control)control.value=Array.isArray(translatedValue)?translatedValue.join(String.fromCharCode(10)):String(translatedValue||"");}}values.translationLocks=Array.from(savedLocks);locks=savedLocks;writeLocks();};
var active=document.querySelector("[data-office-list] a.active[data-office]");
window.trillAdminApplyOffice(form,parseOffice(active));
setLanguage("ru");
})();
