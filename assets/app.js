(() => {
  const links=[...document.querySelectorAll("[data-nav]")];
  const sections=links.map(link=>document.getElementById(link.dataset.nav)).filter(Boolean);
  const setActive=(id)=>links.forEach(link=>{const active=link.dataset.nav===id;link.classList.toggle("active",active);if(active)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");});
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) setActive(visible.target.id);
  },{rootMargin:"-20% 0px -55% 0px",threshold:[.1,.35,.6]});
  sections.forEach(section=>observer.observe(section));
})();