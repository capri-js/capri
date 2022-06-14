var he=Object.defineProperty,fe=Object.defineProperties;var de=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var X=(e,t,r)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,I=(e,t)=>{for(var r in t||(t={}))pe.call(t,r)&&X(e,r,t[r]);if(G)for(var r of G(t))ge.call(t,r)&&X(e,r,t[r]);return e},B=(e,t)=>fe(e,de(t));import{c as U,o as ee,a as me,b as be,d as w,e as te,u as we,f as ne,j as Q,k as M,l as ye,m as p,n as ve,S as re,g as q,t as H,p as N,q as K,N as Se,v as xe}from"./web.237bec24.js";import{CounterIsland as Y}from"./Counter.island.a9dc67ef.js";import{ExpandableIsland as Re}from"./Expandable.island.27b56a98.js";const Pe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}};Pe();function $e(e,t,r){return e.addEventListener(t,r),()=>e.removeEventListener(t,r)}function Ce([e,t],r,o){return[r?()=>r(e()):e,o?n=>t(o(n)):t]}function Ee(e){try{return document.querySelector(e)}catch{return null}}function _e(e,t){const r=Ee(`a#${e}`);r?r.scrollIntoView():t&&window.scrollTo(0,0)}function Ae(e,t,r,o){let n=!1;const a=l=>typeof l=="string"?{value:l}:l,s=Ce(U(a(e()),{equals:(l,i)=>l.value===i.value}),void 0,l=>(!n&&t(l),l));return r&&ee(r((l=e())=>{n=!0,s[1](a(l)),n=!1})),{signal:s,utils:o}}function Le(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:U({value:""})};return e}function Te(){return Ae(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:r,state:o})=>{t?window.history.replaceState(o,"",e):window.history.pushState(o,"",e),_e(window.location.hash.slice(1),r)},e=>$e(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}const Oe=/^(?:[a-z0-9]+:)?\/\//i,Ie=/^\/+|\/+$/g;function A(e,t=!1){const r=e.replace(Ie,"");return r?t||/^[?#]/.test(r)?r:"/"+r:""}function k(e,t,r){if(Oe.test(t))return;const o=A(e),n=r&&A(r);let a="";return!n||t.startsWith("/")?a=o:n.toLowerCase().indexOf(o.toLowerCase())!==0?a=o+n:a=n,(a||"/")+A(t,!a)}function Ne(e,t){if(e==null)throw new Error(t);return e}function oe(e,t){return A(e).replace(/\/*(\*.*)?$/g,"")+A(t)}function ke(e){const t={};return e.searchParams.forEach((r,o)=>{t[o]=r}),t}function $(e,t){return decodeURIComponent(t?e.replace(/\+/g," "):e)}function Ue(e,t){const[r,o]=e.split("/*",2),n=r.split("/").filter(Boolean),a=n.length;return s=>{const l=s.split("/").filter(Boolean),i=l.length-a;if(i<0||i>0&&o===void 0&&!t)return null;const c={path:a?"":"/",params:{}};for(let f=0;f<a;f++){const b=n[f],g=l[f];if(b[0]===":")c.params[b.slice(1)]=g;else if(b.localeCompare(g,void 0,{sensitivity:"base"})!==0)return null;c.path+=`/${g}`}return o&&(c.params[o]=i?l.slice(-i).join("/"):""),c}}function qe(e){const[t,r]=e.pattern.split("/*",2),o=t.split("/").filter(Boolean);return o.reduce((n,a)=>n+(a.startsWith(":")?2:3),o.length-(r===void 0?0:1))}function ae(e){const t=new Map,r=be();return new Proxy({},{get(o,n){return t.has(n)||me(r,()=>t.set(n,w(()=>e()[n]))),t.get(n)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}const He=100,ie=te(),j=te(),se=()=>Ne(M(ie),"Make sure your app is wrapped in a <Router />");let L;const ce=()=>L||M(j)||se().base;function je(e,t="",r){const{path:o,component:n,data:a,children:s}=e,l=!s||Array.isArray(s)&&!s.length,i=oe(t,o),c=l?i:i.split("/*",1)[0];return{originalPath:o,pattern:c,element:n?()=>p(n,{}):()=>{const{element:f}=e;return f===void 0&&r?p(r,{}):f},preload:e.component?n.preload:e.preload,data:a,matcher:Ue(c,!l)}}function ze(e,t=0){return{routes:e,score:qe(e[e.length-1])*1e4-t,matcher(r){const o=[];for(let n=e.length-1;n>=0;n--){const a=e[n],s=a.matcher(r);if(!s)return null;o.unshift(B(I({},s),{route:a}))}return o}}}function le(e,t="",r,o=[],n=[]){const a=Array.isArray(e)?e:[e];for(let s=0,l=a.length;s<l;s++){const i=a[s];if(i&&typeof i=="object"&&i.hasOwnProperty("path")){const c=je(i,t,r);if(o.push(c),i.children)le(i.children,c.pattern,r,o,n);else{const f=ze([...o],n.length);n.push(f)}o.pop()}}return o.length?n:n.sort((s,l)=>l.score-s.score)}function Be(e,t){for(let r=0,o=e.length;r<o;r++){const n=e[r].matcher(t);if(n)return n}return[]}function Ke(e,t){const r=new URL("http://sar"),o=w(i=>{const c=e();try{return new URL(c,r)}catch{return console.error(`Invalid path ${c}`),i}},r,{equals:(i,c)=>i.href===c.href}),n=w(()=>$(o().pathname)),a=w(()=>$(o().search,!0)),s=w(()=>$(o().hash)),l=w(()=>"");return{get pathname(){return n()},get search(){return a()},get hash(){return s()},get state(){return t()},get key(){return l()},query:ae(ne(a,()=>ke(o())))}}function Me(e,t="",r,o){const{signal:[n,a],utils:s={}}=Le(e),l=s.parsePath||(d=>d),i=s.renderPath||(d=>d),c=k("",t),f=void 0;if(c===void 0)throw new Error(`${c} is not a valid base path`);c&&!n().value&&a({value:c,replace:!0,scroll:!1});const[b,g]=we(),[u,y]=U(n().value),[S,T]=U(n().state),O=Ke(u,S),C=[],x={pattern:c,params:{},path:()=>c,outlet:()=>null,resolvePath(d){return k(c,d)}};if(r)try{L=x,x.data=r({data:void 0,params:{},location:O,navigate:F(x)})}finally{L=void 0}function W(d,h,m){Q(()=>{if(typeof h=="number"){h&&(s.go?s.go(h):console.warn("Router integration does not support relative routing"));return}const{replace:E,resolve:_,scroll:D,state:R}=I({replace:!1,resolve:!0,scroll:!0},m),v=_?d.resolvePath(h):k("",h);if(v===void 0)throw new Error(`Path '${h}' is not a routable path`);if(C.length>=He)throw new Error("Too many redirects");const P=u();if(v!==P||R!==S()){const z=C.push({value:P,replace:E,scroll:D,state:S()});g(()=>{y(v),T(R)}).then(()=>{C.length===z&&ue({value:v,state:R})})}})}function F(d){return d=d||M(j)||x,(h,m)=>W(d,h,m)}function ue(d){const h=C[0];h&&((d.value!==h.value||d.state!==h.state)&&a(B(I({},d),{replace:h.replace,scroll:h.scroll})),C.length=0)}ye(()=>{const{value:d,state:h}=n();Q(()=>{d!==u()&&g(()=>{y(d),T(h)})})});{let d=function(h){if(h.defaultPrevented||h.button!==0||h.metaKey||h.altKey||h.ctrlKey||h.shiftKey)return;const m=h.composedPath().find(V=>V instanceof Node&&V.nodeName.toUpperCase()==="A");if(!m)return;const E=m instanceof SVGAElement,_=E?m.href.baseVal:m.href;if((E?m.target.baseVal:m.target)||!_&&!m.hasAttribute("state"))return;const R=(m.getAttribute("rel")||"").split(/\s+/);if(m.hasAttribute("download")||R&&R.includes("external"))return;const v=E?new URL(_,document.baseURI):new URL(_),P=$(v.pathname);if(v.origin!==window.location.origin||c&&P&&!P.toLowerCase().startsWith(c.toLowerCase()))return;const z=l(P+$(v.search,!0)+$(v.hash)),J=m.getAttribute("state");h.preventDefault(),W(x,z,{resolve:!1,replace:m.hasAttribute("replace"),scroll:!m.hasAttribute("noscroll"),state:J&&JSON.parse(J)})};document.addEventListener("click",d),ee(()=>document.removeEventListener("click",d))}return{base:x,out:f,location:O,isRouting:b,renderPath:i,parsePath:l,navigatorFactory:F}}function We(e,t,r,o){const{base:n,location:a,navigatorFactory:s}=e,{pattern:l,element:i,preload:c,data:f}=o().route,b=w(()=>o().path),g=ae(()=>o().params);c&&c();const u={parent:t,pattern:l,get child(){return r()},path:b,params:g,data:t.data,outlet:i,resolvePath(y){return k(n.path(),y,b())}};if(f)try{L=u,u.data=f({data:t.data,params:g,location:a,navigate:s(u)})}finally{L=void 0}return u}const Fe=e=>{const{source:t,url:r,base:o,data:n,out:a}=e,s=t||Te(),l=Me(s,o,n);return p(ie.Provider,{value:l,get children(){return e.children}})},De=e=>{const t=se(),r=ce(),o=w(()=>le(e.children,oe(r.pattern,e.base||""),Je)),n=w(()=>Be(o(),t.location.pathname));t.out&&t.out.matches.push(n().map(({route:i,path:c,params:f})=>({originalPath:i.originalPath,pattern:i.pattern,path:c,params:f})));const a=[];let s;const l=w(ne(n,(i,c,f)=>{let b=c&&i.length===c.length;const g=[];for(let u=0,y=i.length;u<y;u++){const S=c&&c[u],T=i[u];f&&S&&T.route.pattern===S.route.pattern?g[u]=f[u]:(b=!1,a[u]&&a[u](),ve(O=>{a[u]=O,g[u]=We(t,g[u-1]||r,()=>l()[u+1],()=>n()[u])}))}return a.splice(i.length).forEach(u=>u()),f&&b?f:(s=g[0],g)}));return p(re,{get when(){return l()&&s},children:i=>p(j.Provider,{value:i,get children(){return i.outlet()}})})},Z=e=>e,Je=()=>{const e=ce();return p(re,{get when(){return e.child},children:t=>p(j.Provider,{value:t,get children(){return t.outlet()}})})};const Ve=H('<main><h1>This page is completely static.</h1><section>An since it does not contain any interactive islands, no JavaScript is shipped to the browser.</section><a href="..">Home</a></main>');function Ge(){return q(Ve)}const Xe=H("<div></div>");function Qe({children:e}){if(!e)throw new Error("TEST: THIS CODE MUST NOT SHOW UP IN THE CLIENT BUNDLE");return(()=>{const t=q(Xe);return N(t,e),t})()}const Ye=H("<code>ServerContent</code>"),Ze=H('<main><h1>Partial hydration with SolidJS and <i>Capri</i></h1><section>This page is static, but contains some dynamic parts.</section><section>This counter is an interactive island:<!#><!/></section><section>And here is another one, independent from the one above: <!#><!/></section><!#><!/><a href="about">Link to another page</a></main>');function et(){return(()=>{const e=q(Ze),t=e.firstChild,r=t.nextSibling,o=r.nextSibling,n=o.firstChild,a=n.nextSibling,[s,l]=K(a.nextSibling),i=o.nextSibling,c=i.firstChild,f=c.nextSibling,[b,g]=K(f.nextSibling),u=i.nextSibling,[y,S]=K(u.nextSibling);return y.nextSibling,N(o,p(Y,{}),s,l),N(i,p(Y,{start:100}),b,g),N(e,p(Re,{title:"Click to expand",get children(){return["This island receives children as prop. They are only rendered upon build time.",p(Qe,{get children(){return["The code for ",q(Ye)," should not show up in the client bundle."]}})]}}),y,S),e})()}function tt(){return p(Se,{get children(){return p(De,{get children(){return[p(Z,{path:"/",get element(){return p(et,{})}}),p(Z,{path:"/about",get element(){return p(Ge,{})}})]}})}})}xe(()=>p(Fe,{get children(){return p(tt,{})}}),document.getElementById("app"));
