import{h as u}from"./web.6cb06f90.js";const d="modulepreload",a={},h="/solid/",m=function(o,e){return!e||e.length===0?o():Promise.all(e.map(t=>{if(t=`${h}${t}`,t in a)return;a[t]=!0;const s=t.endsWith(".css"),i=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${i}`))return;const r=document.createElement("link");if(r.rel=s?"stylesheet":d,s||(r.as="script",r.crossOrigin=""),r.href=t,document.head.appendChild(r),s)return new Promise((c,l)=>{r.addEventListener("load",c),r.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>o())};function f(n,o,e){const t=e.getAttribute("data-hk");if(!t)throw new Error("Can't hydrate an element without a data-hk attribute.");u(()=>n(o),e.parentElement,{renderId:t.slice(0,-1)})}const E={"/src/Counter.island.tsx":()=>m(()=>import("./Counter.island.334d1fe5.js"),["assets/Counter.island.334d1fe5.js","assets/web.6cb06f90.js"])},y=document.querySelectorAll("script[data-island]");y.forEach(n=>{const o=n.getAttribute("data-island"),e=n.getAttribute("data-key");if(!o||!e)throw new Error("Missing attribute");const t=E[o];t&&t().then(s=>{const i=s[e],r=n.textContent?JSON.parse(n.textContent):{};f(i,r,n.previousElementSibling)}).catch(console.error)});