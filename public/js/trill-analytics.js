(function(){
var id=Number(window.TRILLIANT_YM_ID||0);
if(!id)return;
var campaignKeys=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
var current=new URLSearchParams(window.location.search);
var campaign={};
for(var index=0;index<campaignKeys.length;index+=1){
var key=campaignKeys[index];
var value=current.get(key);
if(value){
campaign[key]=value;
try{window.sessionStorage.setItem("trilliant_"+key,value);}catch(error){}
}else{
try{var saved=window.sessionStorage.getItem("trilliant_"+key);if(saved)campaign[key]=saved;}catch(error){}
}
}
var reach=function(goal,details){
if(typeof window.ym!=="function")return;
var params=Object.assign({page:window.location.pathname,referrer:document.referrer||"direct"},campaign,details||{});
window.ym(id,"reachGoal",goal,params);
};
var match=window.location.pathname.match(/^\/(?:uz\/|en\/)?([^/]+)\/$/);
if(match&&match[1]&&["uz","en","admin"].indexOf(match[1])===-1)reach("office_view",{office:match[1]});
document.addEventListener("click",function(event){
var target=event.target;
if(!(target instanceof Element))return;
var link=target.closest("a[href]");
if(!link)return;
var href=String(link.getAttribute("href")||"");
var normalized=href.toLowerCase();
if(normalized.indexOf("https://t.me/")===0||normalized.indexOf("http://t.me/")===0||normalized.indexOf("tg://")===0)reach("telegram_click",{link:href});
else if(normalized.indexOf("tel:")===0)reach("phone_click",{link:href});
else if(normalized.indexOf("mailto:")===0)reach("email_click",{link:href});
},true);
document.addEventListener("submit",function(event){
var form=event.target;
if(!(form instanceof HTMLFormElement))return;
reach("form_submit",{form:form.getAttribute("name")||form.id||form.getAttribute("action")||"contact"});
},true);
})();
