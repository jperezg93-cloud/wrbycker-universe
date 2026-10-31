(() => {
  const links=[...document.querySelectorAll("[data-nav]")];
  const sections=links.map(link=>document.getElementById(link.dataset.nav)).filter(Boolean);
  const setActive=(id)=>links.forEach(link=>link.classList.toggle("active",link.dataset.nav===id));
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) setActive(visible.target.id);
  },{rootMargin:"-20% 0px -55% 0px",threshold:[.1,.35,.6]});
  sections.forEach(section=>observer.observe(section));
})();