import"./modulepreload-polyfill-3cfb730f.js";const h="modulepreload",E=function(n,s){return n[0]==="."?new URL(n,s).href:n},f={},m=function(s,i,o){if(!i||i.length===0)return s();const c=document.getElementsByTagName("link");return Promise.all(i.map(t=>{if(t=E(t,o),t in f)return;f[t]=!0;const e=t.endsWith(".css"),d=e?'[rel="stylesheet"]':"";if(!!o)for(let l=c.length-1;l>=0;l--){const u=c[l];if(u.href===t&&(!e||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${d}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":h,e||(r.as="script",r.crossOrigin=""),r.href=t,document.head.appendChild(r),e)return new Promise((l,u)=>{r.addEventListener("load",l),r.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>s()).catch(t=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=t,window.dispatchEvent(e),!e.defaultPrevented)throw t})},_=Object.assign({"/src/Counter.island.tsx":()=>m(()=>import("./Counter.island-bf174874.js"),[],import.meta.url),"/src/Expandable.island.tsx":()=>m(()=>import("./Expandable.island-573468b7.js"),[],import.meta.url),"/src/MediaQuery.island.tsx":()=>m(()=>import("./MediaQuery.island-e7b1ff02.js"),[],import.meta.url)}),w=document.querySelectorAll("script[data-island]");w.forEach(n=>{const s=n.previousElementSibling;if(!s)throw new Error("Missing previousElementSibling");const i=n.getAttribute("data-island");if(!i)throw new Error("Missing attribute: data-island");const o=_[i];if(!o)throw new Error(`Island module not found: ${i}`);const{props:c={},options:t={}}=n.textContent?JSON.parse(n.textContent):{},e=async()=>{const a=(await m(()=>import("./hydrate-bfa4c5b3.js"),[],import.meta.url)).default,r=await o();a(r.default,c,s)},{media:d}=t;if(d&&"matchMedia"in window){const a=matchMedia(d);a.matches?e():a.addEventListener("change",e,{once:!0})}else e()});
