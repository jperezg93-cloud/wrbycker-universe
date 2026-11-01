"use strict";
const CACHE="wrbycker-universe-v1";
const CORE=["./","./index.html","./assets/styles.css","./assets/app.js","./assets/wb-icon.svg","./manifest.webmanifest"];
self.addEventListener("install",(event)=>{
  event.waitUntil(caches.open(CACHE).then((cache)=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",(event)=>{
  event.waitUntil(caches.keys().then((keys)=>Promise.all(keys.filter((key)=>key.startsWith("wrbycker-universe-")&&key!==CACHE).map((key)=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",(event)=>{
  const request=event.request;
  if(request.method!=="GET") return;
  if(request.mode==="navigate"){
    event.respondWith(fetch(request).then((response)=>{
      const copy=response.clone();
      caches.open(CACHE).then((cache)=>cache.put("./index.html",copy)).catch(()=>{});
      return response;
    }).catch(()=>caches.match("./index.html")));
    return;
  }
  event.respondWith(caches.match(request).then((cached)=>cached||fetch(request).then((response)=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then((cache)=>cache.put(request,copy)).catch(()=>{});}
    return response;
  })));
});