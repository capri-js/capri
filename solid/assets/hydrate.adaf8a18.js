import{h as w,g,s as C,i as b,r as v,t as S}from"./web.237bec24.js";const $="modulepreload",p={},k="/capri/solid/",E=function(s,t){return!t||t.length===0?s():Promise.all(t.map(e=>{if(e=`${k}${e}`,e in p)return;p[e]=!0;const n=e.endsWith(".css"),o=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":$,n||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),n)return new Promise((i,c)=>{r.addEventListener("load",i),r.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>s())},x=S("<div></div>"),L={hydrate(a,s,t){const e=t.getAttribute("data-hk");if(!e)throw new Error("Can't hydrate an element without a data-hk attribute.");const n=e.slice(0,-1);w(()=>a(s),t.parentElement,{renderId:n})},renderRawHtml(a,s){return(()=>{const t=g(x);return C(t,a,!1,!1),b(t,s),v(),t})()}};function A({hydrate:a,renderRawHtml:s}){const t={"/src/Counter.island.tsx":()=>E(()=>import("./Counter.island.a9dc67ef.js"),["assets/Counter.island.a9dc67ef.js","assets/web.237bec24.js","assets/browser.baed1bce.js"]),"/src/Expandable.island.tsx":()=>E(()=>import("./Expandable.island.27b56a98.js"),["assets/Expandable.island.27b56a98.js","assets/web.237bec24.js","assets/browser.baed1bce.js"])};document.querySelectorAll("script[data-island]").forEach(n=>{const o=n.previousElementSibling;if(!o)throw new Error("Missing previousElementSibling");const r=n.getAttribute("data-island");if(!r)throw new Error("Missing attribute: data-island");const[i,c]=r.split("::"),u=t[i];if(!u)throw new Error(`Module not found: ${i}`);const{props:h={},options:_={}}=n.textContent?JSON.parse(n.textContent):{},m=o.querySelector("[data-island-children]");m&&(h.children=s({"data-island-children":!0},m.innerHTML));const d=()=>{u().then(l=>{const y=l[c];a(y,h,o)}).catch(console.error)},{media:f}=_;if(f){const l=matchMedia(f);l.matches?d():l.addEventListener("change",d,{once:!0})}else d()})}A(L);
