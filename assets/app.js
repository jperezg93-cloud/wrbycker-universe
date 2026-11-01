(() => {
  const links=[...document.querySelectorAll("[data-nav]")];
  const sections=links.map(link=>document.getElementById(link.dataset.nav)).filter(Boolean);
  const setActive=(id)=>links.forEach(link=>{const active=link.dataset.nav===id;link.classList.toggle("active",active);if(active)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");});
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) setActive(visible.target.id);
  },{rootMargin:"-20% 0px -55% 0px",threshold:[.1,.35,.6]});
  sections.forEach(section=>observer.observe(section));

  let deferredPrompt=null;
  const installButton=document.getElementById("install-universe");
  window.addEventListener("beforeinstallprompt",(event)=>{
    event.preventDefault();
    deferredPrompt=event;
    if(installButton) installButton.hidden=false;
  });
  if(installButton) installButton.addEventListener("click",async()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
    installButton.hidden=true;
  });
  if("serviceWorker" in navigator && location.protocol==="https:"){
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(()=>{}));
  }
})();