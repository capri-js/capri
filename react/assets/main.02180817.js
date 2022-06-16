import{r as f,c as vt}from"./client.6b0f1a33.js";import{j as U,a as b}from"./browser.fceea427.js";import{CounterIsland as He}from"./Counter.island.93ef8184.js";import{ExpandableIsland as pt}from"./Expandable.island.c8e78d1b.js";const mt=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}};mt();function ve(){return ve=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},ve.apply(this,arguments)}var G;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(G||(G={}));var $e=function(e){return e},Ue="beforeunload",gt="popstate";function yt(e){e===void 0&&(e={});var n=e,t=n.window,r=t===void 0?document.defaultView:t,a=r.history;function i(){var h=r.location,m=h.pathname,g=h.search,T=h.hash,E=a.state||{};return[E.idx,$e({pathname:m,search:g,hash:T,state:E.usr||null,key:E.key||"default"})]}var o=null;function s(){if(o)y.call(o),o=null;else{var h=G.Pop,m=i(),g=m[0],T=m[1];if(y.length){if(g!=null){var E=l-g;E&&(o={action:h,location:T,retry:function(){R(E*-1)}},R(E))}}else F(h)}}r.addEventListener(gt,s);var c=G.Pop,u=i(),l=u[0],p=u[1],v=Je(),y=Je();l==null&&(l=0,a.replaceState(ve({},a.state,{idx:l}),""));function V(h){return typeof h=="string"?h:Pe(h)}function w(h,m){return m===void 0&&(m=null),$e(ve({pathname:p.pathname,hash:"",search:""},typeof h=="string"?X(h):h,{state:m,key:bt()}))}function x(h,m){return[{usr:h.state,key:h.key,idx:m},V(h)]}function d(h,m,g){return!y.length||(y.call({action:h,location:m,retry:g}),!1)}function F(h){c=h;var m=i();l=m[0],p=m[1],v.call({action:c,location:p})}function M(h,m){var g=G.Push,T=w(h,m);function E(){M(h,m)}if(d(g,T,E)){var $=x(T,l+1),te=$[0],P=$[1];try{a.pushState(te,"",P)}catch{r.location.assign(P)}F(g)}}function D(h,m){var g=G.Replace,T=w(h,m);function E(){D(h,m)}if(d(g,T,E)){var $=x(T,l),te=$[0],P=$[1];a.replaceState(te,"",P),F(g)}}function R(h){a.go(h)}var H={get action(){return c},get location(){return p},createHref:V,push:M,replace:D,go:R,back:function(){R(-1)},forward:function(){R(1)},listen:function(m){return v.push(m)},block:function(m){var g=y.push(m);return y.length===1&&r.addEventListener(Ue,je),function(){g(),y.length||r.removeEventListener(Ue,je)}}};return H}function je(e){e.preventDefault(),e.returnValue=""}function Je(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter(function(r){return r!==t})}},call:function(t){e.forEach(function(r){return r&&r(t)})}}}function bt(){return Math.random().toString(36).substr(2,8)}function Pe(e){var n=e.pathname,t=n===void 0?"/":n,r=e.search,a=r===void 0?"":r,i=e.hash,o=i===void 0?"":i;return a&&a!=="?"&&(t+=a.charAt(0)==="?"?a:"?"+a),o&&o!=="#"&&(t+=o.charAt(0)==="#"?o:"#"+o),t}function X(e){var n={};if(e){var t=e.indexOf("#");t>=0&&(n.hash=e.substr(t),e=e.substr(0,t));var r=e.indexOf("?");r>=0&&(n.search=e.substr(r),e=e.substr(0,r)),e&&(n.pathname=e)}return n}/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const We=f.exports.createContext(null),Ne=f.exports.createContext(null),pe=f.exports.createContext({outlet:null,matches:[]});function N(e,n){if(!e)throw new Error(n)}function xt(e,n,t){t===void 0&&(t="/");let r=typeof n=="string"?X(n):n,a=Ye(r.pathname||"/",t);if(a==null)return null;let i=Qe(e);wt(i);let o=null;for(let s=0;o==null&&s<i.length;++s)o=kt(i[s],a);return o}function Qe(e,n,t,r){return n===void 0&&(n=[]),t===void 0&&(t=[]),r===void 0&&(r=""),e.forEach((a,i)=>{let o={relativePath:a.path||"",caseSensitive:a.caseSensitive===!0,childrenIndex:i,route:a};o.relativePath.startsWith("/")&&(o.relativePath.startsWith(r)||N(!1),o.relativePath=o.relativePath.slice(r.length));let s=K([r,o.relativePath]),c=t.concat(o);a.children&&a.children.length>0&&(a.index===!0&&N(!1),Qe(a.children,n,c,s)),!(a.path==null&&!a.index)&&n.push({path:s,score:Tt(s,a.index),routesMeta:c})}),n}function wt(e){e.sort((n,t)=>n.score!==t.score?t.score-n.score:Dt(n.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}const Rt=/^:\w+$/,Et=3,St=2,Ct=1,Pt=10,Ot=-2,Ke=e=>e==="*";function Tt(e,n){let t=e.split("/"),r=t.length;return t.some(Ke)&&(r+=Ot),n&&(r+=St),t.filter(a=>!Ke(a)).reduce((a,i)=>a+(Rt.test(i)?Et:i===""?Ct:Pt),r)}function Dt(e,n){return e.length===n.length&&e.slice(0,-1).every((r,a)=>r===n[a])?e[e.length-1]-n[n.length-1]:0}function kt(e,n){let{routesMeta:t}=e,r={},a="/",i=[];for(let o=0;o<t.length;++o){let s=t[o],c=o===t.length-1,u=a==="/"?n:n.slice(a.length)||"/",l=It({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},u);if(!l)return null;Object.assign(r,l.params);let p=s.route;i.push({params:r,pathname:K([a,l.pathname]),pathnameBase:Ze(K([a,l.pathnameBase])),route:p}),l.pathnameBase!=="/"&&(a=K([a,l.pathnameBase]))}return i}function It(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[t,r]=Lt(e.path,e.caseSensitive,e.end),a=n.match(t);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((u,l,p)=>{if(l==="*"){let v=s[p]||"";o=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}return u[l]=Wt(s[p]||""),u},{}),pathname:i,pathnameBase:o,pattern:e}}function Lt(e,n,t){n===void 0&&(n=!1),t===void 0&&(t=!0);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(o,s)=>(r.push(s),"([^\\/]+)"));return e.endsWith("*")?(r.push("*"),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a+=t?"\\/*$":"(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)",[new RegExp(a,n?void 0:"i"),r]}function Wt(e,n){try{return decodeURIComponent(e)}catch{return e}}function Nt(e,n){n===void 0&&(n="/");let{pathname:t,search:r="",hash:a=""}=typeof e=="string"?X(e):e;return{pathname:t?t.startsWith("/")?t:Vt(t,n):n,search:At(r),hash:_t(a)}}function Vt(e,n){let t=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function Xe(e,n,t){let r=typeof e=="string"?X(e):e,a=e===""||r.pathname===""?"/":r.pathname,i;if(a==null)i=t;else{let s=n.length-1;if(a.startsWith("..")){let c=a.split("/");for(;c[0]==="..";)c.shift(),s-=1;r.pathname=c.join("/")}i=s>=0?n[s]:"/"}let o=Nt(r,i);return a&&a!=="/"&&a.endsWith("/")&&!o.pathname.endsWith("/")&&(o.pathname+="/"),o}function Mt(e){return e===""||e.pathname===""?"/":typeof e=="string"?X(e).pathname:e.pathname}function Ye(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let t=e.charAt(n.length);return t&&t!=="/"?null:e.slice(n.length)||"/"}const K=e=>e.join("/").replace(/\/\/+/g,"/"),Ze=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),At=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,_t=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Bt(e){ee()||N(!1);let{basename:n,navigator:t}=f.exports.useContext(We),{hash:r,pathname:a,search:i}=tt(e),o=a;if(n!=="/"){let s=Mt(e),c=s!=null&&s.endsWith("/");o=a==="/"?n+(c?"/":""):K([n,a])}return t.createHref({pathname:o,search:i,hash:r})}function ee(){return f.exports.useContext(Ne)!=null}function me(){return ee()||N(!1),f.exports.useContext(Ne).location}function et(){ee()||N(!1);let{basename:e,navigator:n}=f.exports.useContext(We),{matches:t}=f.exports.useContext(pe),{pathname:r}=me(),a=JSON.stringify(t.map(s=>s.pathnameBase)),i=f.exports.useRef(!1);return f.exports.useEffect(()=>{i.current=!0}),f.exports.useCallback(function(s,c){if(c===void 0&&(c={}),!i.current)return;if(typeof s=="number"){n.go(s);return}let u=Xe(s,JSON.parse(a),r);e!=="/"&&(u.pathname=K([e,u.pathname])),(c.replace?n.replace:n.push)(u,c.state)},[e,n,a,r])}function tt(e){let{matches:n}=f.exports.useContext(pe),{pathname:t}=me(),r=JSON.stringify(n.map(a=>a.pathnameBase));return f.exports.useMemo(()=>Xe(e,JSON.parse(r),t),[e,r,t])}function Ft(e,n){ee()||N(!1);let{matches:t}=f.exports.useContext(pe),r=t[t.length-1],a=r?r.params:{};r&&r.pathname;let i=r?r.pathnameBase:"/";r&&r.route;let o=me(),s;if(n){var c;let v=typeof n=="string"?X(n):n;i==="/"||((c=v.pathname)==null?void 0:c.startsWith(i))||N(!1),s=v}else s=o;let u=s.pathname||"/",l=i==="/"?u:u.slice(i.length)||"/",p=xt(e,{pathname:l});return Ht(p&&p.map(v=>Object.assign({},v,{params:Object.assign({},a,v.params),pathname:K([i,v.pathname]),pathnameBase:v.pathnameBase==="/"?i:K([i,v.pathnameBase])})),t)}function Ht(e,n){return n===void 0&&(n=[]),e==null?null:e.reduceRight((t,r,a)=>f.exports.createElement(pe.Provider,{children:r.route.element!==void 0?r.route.element:t,value:{outlet:t,matches:n.concat(e.slice(0,a+1))}}),null)}function $t(e){let{to:n,replace:t,state:r}=e;ee()||N(!1);let a=et();return f.exports.useEffect(()=>{a(n,{replace:t,state:r})}),null}function fe(e){N(!1)}function Ut(e){let{basename:n="/",children:t=null,location:r,navigationType:a=G.Pop,navigator:i,static:o=!1}=e;ee()&&N(!1);let s=Ze(n),c=f.exports.useMemo(()=>({basename:s,navigator:i,static:o}),[s,i,o]);typeof r=="string"&&(r=X(r));let{pathname:u="/",search:l="",hash:p="",state:v=null,key:y="default"}=r,V=f.exports.useMemo(()=>{let w=Ye(u,s);return w==null?null:{pathname:w,search:l,hash:p,state:v,key:y}},[s,u,l,p,v,y]);return V==null?null:f.exports.createElement(We.Provider,{value:c},f.exports.createElement(Ne.Provider,{children:t,value:{location:V,navigationType:a}}))}function jt(e){let{children:n,location:t}=e;return Ft(Oe(n),t)}function Oe(e){let n=[];return f.exports.Children.forEach(e,t=>{if(!f.exports.isValidElement(t))return;if(t.type===f.exports.Fragment){n.push.apply(n,Oe(t.props.children));return}t.type!==fe&&N(!1);let r={caseSensitive:t.props.caseSensitive,element:t.props.element,index:t.props.index,path:t.props.path};t.props.children&&(r.children=Oe(t.props.children)),n.push(r)}),n}/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Te(){return Te=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},Te.apply(this,arguments)}function Jt(e,n){if(e==null)return{};var t={},r=Object.keys(e),a,i;for(i=0;i<r.length;i++)a=r[i],!(n.indexOf(a)>=0)&&(t[a]=e[a]);return t}const Kt=["onClick","reloadDocument","replace","state","target","to"];function zt(e){let{basename:n,children:t,window:r}=e,a=f.exports.useRef();a.current==null&&(a.current=yt({window:r}));let i=a.current,[o,s]=f.exports.useState({action:i.action,location:i.location});return f.exports.useLayoutEffect(()=>i.listen(s),[i]),f.exports.createElement(Ut,{basename:n,children:t,location:o.location,navigationType:o.action,navigator:i})}function qt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}const nt=f.exports.forwardRef(function(n,t){let{onClick:r,reloadDocument:a,replace:i=!1,state:o,target:s,to:c}=n,u=Jt(n,Kt),l=Bt(c),p=Gt(c,{replace:i,state:o,target:s});function v(y){r&&r(y),!y.defaultPrevented&&!a&&p(y)}return f.exports.createElement("a",Te({},u,{href:l,onClick:v,ref:t,target:s}))});function Gt(e,n){let{target:t,replace:r,state:a}=n===void 0?{}:n,i=et(),o=me(),s=tt(e);return f.exports.useCallback(c=>{if(c.button===0&&(!t||t==="_self")&&!qt(c)){c.preventDefault();let u=!!r||Pe(o)===Pe(s);i(e,{replace:u,state:a})}},[o,i,s,r,a,t,e])}function Qt(){return U("main",{children:[b("h1",{children:"This page is completely static."}),b("section",{children:"An since it does not contain any interactive islands, no JavaScript is shipped to the browser."}),b(nt,{to:"..",children:"Home"})]})}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function rt(e,n,t,r){function a(i){return i instanceof t?i:new t(function(o){o(i)})}return new(t||(t=Promise))(function(i,o){function s(l){try{u(r.next(l))}catch(p){o(p)}}function c(l){try{u(r.throw(l))}catch(p){o(p)}}function u(l){l.done?i(l.value):a(l.value).then(s,c)}u((r=r.apply(e,n||[])).next())})}function at(e,n){var t={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(u){return function(l){return c([u,l])}}function c(u){if(r)throw new TypeError("Generator is already executing.");for(;t;)try{if(r=1,a&&(i=u[0]&2?a.return:u[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,u[1])).done)return i;switch(a=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return t.label++,{value:u[1],done:!1};case 5:t.label++,a=u[1],u=[0];continue;case 7:u=t.ops.pop(),t.trys.pop();continue;default:if(i=t.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){t=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){t.label=u[1];break}if(u[0]===6&&t.label<i[1]){t.label=i[1],i=u;break}if(i&&t.label<i[2]){t.label=i[2],t.ops.push(u);break}i[2]&&t.ops.pop(),t.trys.pop();continue}u=n.call(e,t)}catch(l){u=[6,l],a=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}var B=function(){},O=B(),de=Object,C=function(e){return e===O},J=function(e){return typeof e=="function"},z=function(e,n){return de.assign({},e,n)},Ve="undefined",Me=function(){return typeof window!=Ve},Xt=function(){return typeof document!=Ve},Yt=function(){return Me()&&typeof window.requestAnimationFrame!=Ve},ce=new WeakMap,Zt=0,ue=function(e){var n=typeof e,t=e&&e.constructor,r=t==Date,a,i;if(de(e)===e&&!r&&t!=RegExp){if(a=ce.get(e),a)return a;if(a=++Zt+"~",ce.set(e,a),t==Array){for(a="@",i=0;i<e.length;i++)a+=ue(e[i])+",";ce.set(e,a)}if(t==de){a="#";for(var o=de.keys(e).sort();!C(i=o.pop());)C(e[i])||(a+=i+":"+ue(e[i])+",");ce.set(e,a)}}else a=r?e.toJSON():n=="symbol"?e.toString():n=="string"?JSON.stringify(e):""+e;return a},De=!0,en=function(){return De},it=Me(),Ae=Xt(),ke=it&&window.addEventListener?window.addEventListener.bind(window):B,tn=Ae?document.addEventListener.bind(document):B,Ie=it&&window.removeEventListener?window.removeEventListener.bind(window):B,nn=Ae?document.removeEventListener.bind(document):B,rn=function(){var e=Ae&&document.visibilityState;return C(e)||e!=="hidden"},an=function(e){return tn("visibilitychange",e),ke("focus",e),function(){nn("visibilitychange",e),Ie("focus",e)}},on=function(e){var n=function(){De=!0,e()},t=function(){De=!1};return ke("online",n),ke("offline",t),function(){Ie("online",n),Ie("offline",t)}},sn={isOnline:en,isVisible:rn},un={initFocus:an,initReconnect:on},ge=!Me()||"Deno"in window,ln=function(e){return Yt()?window.requestAnimationFrame(e):setTimeout(e,1)},he=ge?f.exports.useEffect:f.exports.useLayoutEffect,Se=typeof navigator!="undefined"&&navigator.connection,ze=!ge&&Se&&(["slow-2g","2g"].includes(Se.effectiveType)||Se.saveData),ot=function(e){if(J(e))try{e=e()}catch{e=""}var n=[].concat(e);e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?ue(e):"";var t=e?"$swr$"+e:"";return[e,n,t]},Q=new WeakMap,st=0,ut=1,lt=2,se=function(e,n,t,r,a,i,o){o===void 0&&(o=!0);var s=Q.get(e),c=s[0],u=s[1],l=s[3],p=c[n],v=u[n];if(o&&v)for(var y=0;y<v.length;++y)v[y](t,r,a);return i&&(delete l[n],p&&p[0])?p[0](lt).then(function(){return e.get(n)}):e.get(n)},cn=0,Le=function(){return++cn},ct=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return rt(void 0,void 0,void 0,function(){var t,r,a,i,o,s,c,u,l,p,v,y,V,w,x,d,F,M,D,R,H;return at(this,function(h){switch(h.label){case 0:if(t=e[0],r=e[1],a=e[2],i=e[3],o=typeof i=="boolean"?{revalidate:i}:i||{},s=C(o.populateCache)?!0:o.populateCache,c=o.revalidate!==!1,u=o.rollbackOnError!==!1,l=o.optimisticData,p=ot(r),v=p[0],y=p[2],!v)return[2];if(V=Q.get(t),w=V[2],e.length<3)return[2,se(t,v,t.get(v),O,O,c,!0)];if(x=a,F=Le(),w[v]=[F,0],M=!C(l),D=t.get(v),M&&(R=J(l)?l(D):l,t.set(v,R),se(t,v,R)),J(x))try{x=x(t.get(v))}catch(m){d=m}return x&&J(x.then)?[4,x.catch(function(m){d=m})]:[3,2];case 1:if(x=h.sent(),F!==w[v][0]){if(d)throw d;return[2,x]}else d&&M&&u&&(s=!0,x=D,t.set(v,D));h.label=2;case 2:return s&&(d||(J(s)&&(x=s(x,D)),t.set(v,x)),t.set(y,z(t.get(y),{error:d}))),w[v][1]=Le(),[4,se(t,v,x,d,O,c,!!s)];case 3:if(H=h.sent(),d)throw d;return[2,s?H:x]}})})},qe=function(e,n){for(var t in e)e[t][0]&&e[t][0](n)},fn=function(e,n){if(!Q.has(e)){var t=z(un,n),r={},a=ct.bind(O,e),i=B;if(Q.set(e,[r,{},{},{},a]),!ge){var o=t.initFocus(setTimeout.bind(O,qe.bind(O,r,st))),s=t.initReconnect(setTimeout.bind(O,qe.bind(O,r,ut)));i=function(){o&&o(),s&&s(),Q.delete(e)}}return[e,a,i]}return[e,Q.get(e)[4]]},dn=function(e,n,t,r,a){var i=t.errorRetryCount,o=a.retryCount,s=~~((Math.random()+.5)*(1<<(o<8?o:8)))*t.errorRetryInterval;!C(i)&&o>i||setTimeout(r,s,a)},ft=fn(new Map),hn=ft[0],vn=ft[1],pn=z({onLoadingSlow:B,onSuccess:B,onError:B,onErrorRetry:dn,onDiscarded:B,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:ze?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:ze?5e3:3e3,compare:function(e,n){return ue(e)==ue(n)},isPaused:function(){return!1},cache:hn,mutate:vn,fallback:{}},sn),mn=function(e,n){var t=z(e,n);if(n){var r=e.use,a=e.fallback,i=n.use,o=n.fallback;r&&i&&(t.use=r.concat(i)),a&&o&&(t.fallback=z(a,o))}return t},gn=f.exports.createContext({}),yn=function(e,n){var t=f.exports.useState({})[1],r=f.exports.useRef(e),a=f.exports.useRef({data:!1,error:!1,isValidating:!1}),i=f.exports.useCallback(function(o){var s=!1,c=r.current;for(var u in o){var l=u;c[l]!==o[l]&&(c[l]=o[l],a.current[l]&&(s=!0))}s&&!n.current&&t({})},[]);return he(function(){r.current=e}),[r,a.current,i]},bn=function(e){return J(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}]},xn=function(){return z(pn,f.exports.useContext(gn))},wn=function(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var a=xn(),i=bn(t),o=i[0],s=i[1],c=i[2],u=mn(a,c),l=e,p=u.use;if(p)for(var v=p.length;v-- >0;)l=p[v](l);return l(o,s||u.fetcher,u)}},Ge=function(e,n,t){var r=n[e]||(n[e]=[]);return r.push(t),function(){var a=r.indexOf(t);a>=0&&(r[a]=r[r.length-1],r.pop())}},Ce={dedupe:!0},Rn=function(e,n,t){var r=t.cache,a=t.compare,i=t.fallbackData,o=t.suspense,s=t.revalidateOnMount,c=t.refreshInterval,u=t.refreshWhenHidden,l=t.refreshWhenOffline,p=Q.get(r),v=p[0],y=p[1],V=p[2],w=p[3],x=ot(e),d=x[0],F=x[1],M=x[2],D=f.exports.useRef(!1),R=f.exports.useRef(!1),H=f.exports.useRef(d),h=f.exports.useRef(n),m=f.exports.useRef(t),g=function(){return m.current},T=function(){return g().isVisible()&&g().isOnline()},E=function(L){return r.set(M,z(r.get(M),L))},$=r.get(d),te=C(i)?t.fallback[d]:i,P=C($)?te:$,ye=r.get(M)||{},ne=ye.error,_e=!D.current,Be=function(){return _e&&!C(s)?s:g().isPaused()?!1:o?C(P)?!1:t.revalidateIfStale:C(P)||t.revalidateIfStale},dt=function(){return!d||!n?!1:ye.isValidating?!0:_e&&Be()},be=dt(),xe=yn({data:P,error:ne,isValidating:be},R),Y=xe[0],we=xe[1],le=xe[2],q=f.exports.useCallback(function(L){return rt(void 0,void 0,void 0,function(){var k,I,W,re,ae,A,S,j,_,Re,ie,Z,Ee;return at(this,function(oe){switch(oe.label){case 0:if(k=h.current,!d||!k||R.current||g().isPaused())return[2,!1];re=!0,ae=L||{},A=!w[d]||!ae.dedupe,S=function(){return!R.current&&d===H.current&&D.current},j=function(){var Fe=w[d];Fe&&Fe[1]===W&&delete w[d]},_={isValidating:!1},Re=function(){E({isValidating:!1}),S()&&le(_)},E({isValidating:!0}),le({isValidating:!0}),oe.label=1;case 1:return oe.trys.push([1,3,,4]),A&&(se(r,d,Y.current.data,Y.current.error,!0),t.loadingTimeout&&!r.get(d)&&setTimeout(function(){re&&S()&&g().onLoadingSlow(d,t)},t.loadingTimeout),w[d]=[k.apply(void 0,F),Le()]),Ee=w[d],I=Ee[0],W=Ee[1],[4,I];case 2:return I=oe.sent(),A&&setTimeout(j,t.dedupingInterval),!w[d]||w[d][1]!==W?(A&&S()&&g().onDiscarded(d),[2,!1]):(E({error:O}),_.error=O,ie=V[d],!C(ie)&&(W<=ie[0]||W<=ie[1]||ie[1]===0)?(Re(),A&&S()&&g().onDiscarded(d),[2,!1]):(a(Y.current.data,I)?_.data=Y.current.data:_.data=I,a(r.get(d),I)||r.set(d,I),A&&S()&&g().onSuccess(I,d,t),[3,4]));case 3:return Z=oe.sent(),j(),g().isPaused()||(E({error:Z}),_.error=Z,A&&S()&&(g().onError(Z,d,t),(typeof t.shouldRetryOnError=="boolean"&&t.shouldRetryOnError||J(t.shouldRetryOnError)&&t.shouldRetryOnError(Z))&&T()&&g().onErrorRetry(Z,d,t,q,{retryCount:(ae.retryCount||0)+1,dedupe:!0}))),[3,4];case 4:return re=!1,Re(),S()&&A&&se(r,d,_.data,_.error,!1),[2,!0]}})})},[d]),ht=f.exports.useCallback(ct.bind(O,r,function(){return H.current}),[]);if(he(function(){h.current=n,m.current=t}),he(function(){if(!!d){var L=d!==H.current,k=q.bind(O,Ce),I=function(S,j,_){le(z({error:j,isValidating:_},a(Y.current.data,S)?O:{data:S}))},W=0,re=function(S){if(S==st){var j=Date.now();g().revalidateOnFocus&&j>W&&T()&&(W=j+g().focusThrottleInterval,k())}else if(S==ut)g().revalidateOnReconnect&&T()&&k();else if(S==lt)return q()},ae=Ge(d,y,I),A=Ge(d,v,re);return R.current=!1,H.current=d,D.current=!0,L&&le({data:P,error:ne,isValidating:be}),Be()&&(C(P)||ge?k():ln(k)),function(){R.current=!0,ae(),A()}}},[d,q]),he(function(){var L;function k(){var W=J(c)?c(P):c;W&&L!==-1&&(L=setTimeout(I,W))}function I(){!Y.current.error&&(u||g().isVisible())&&(l||g().isOnline())?q(Ce).then(k):k()}return k(),function(){L&&(clearTimeout(L),L=-1)}},[c,u,l,q]),f.exports.useDebugValue(P),o&&C(P)&&d)throw h.current=n,m.current=t,R.current=!1,C(ne)?q(Ce):ne;return{mutate:ht,get data(){return we.data=!0,P},get error(){return we.error=!0,ne},get isValidating(){return we.isValidating=!0,be}}},En=wn(Rn);function Sn({children:e}){if(!e)throw new Error("TEST: THIS CODE MUST NOT SHOW UP IN THE CLIENT BUNDLE");return b("div",{children:e})}const Cn=e=>new Promise(n=>{setTimeout(()=>n(e),0)});function Pn(){const{data:e}=En("This data has been fetched via SWR.",Cn,{suspense:!0});return U("main",{children:[U("h1",{children:["Partial hydration with React and ",b("i",{children:"Capri"})]}),b("section",{children:"This page is static, but contains some dynamic parts."}),b("section",{children:e}),U("section",{children:["Here is a simple counter: ",b(He,{})]}),U("section",{children:["And here is another one, independent from the one above:"," ",b(He,{start:100})]}),U(pt,{title:"Click to expand",children:["This island receives children as prop. They are only rendered upon build time.",U(Sn,{children:["The code for ",b("code",{children:"ServerContent"})," should not show up in the client bundle."]})]}),b(nt,{to:"about",children:"Link to another page"})]})}function On(){var t;const n=(t=new URL(window.location.href).searchParams.get("slug"))!=null?t:"/";return b($t,{to:n})}function Tn(){return b("div",{className:"banner",children:"Preview Mode"})}function Dn(){return b(f.exports.Suspense,{children:U(jt,{children:[b(fe,{index:!0,element:b(Pn,{})}),b(fe,{path:"/about",element:b(Qt,{})}),b(fe,{path:"/preview",element:b(On,{})})]})})}vt.createRoot(document.getElementById("app")).render(b(f.exports.StrictMode,{children:U(zt,{children:[b(Tn,{}),b(Dn,{})]})}));
