document.querySelectorAll("[data-map-interaction]").forEach(function(root){
  const button=root.querySelector("[data-map-control]");
  if(!(button instanceof HTMLButtonElement))return;
  function setActive(active){
    root.classList.toggle("is-active",active);
    button.setAttribute("aria-pressed",String(active));
    button.textContent=active?"Отключить управление":"Управлять картой";
  }
  button.addEventListener("click",function(){setActive(!root.classList.contains("is-active"));});
  document.addEventListener("keydown",function(event){if(event.key==="Escape"&&root.classList.contains("is-active"))setActive(false);});
});
