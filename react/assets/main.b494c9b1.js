import{r as h,c as dt}from"./client.91fb33d9.js";import{j as Z,a as w,C as Be}from"./Counter.island.3560c51c.js";const vt=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}};vt();function de(){return de=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},de.apply(this,arguments)}var z;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(z||(z={}));var je=function(e){return e},He="beforeunload",pt="popstate";function mt(e){e===void 0&&(e={});var n=e,t=n.window,r=t===void 0?document.defaultView:t,a=r.history;function i(){var d=r.location,m=d.pathname,g=d.search,T=d.hash,E=a.state||{};return[E.idx,je({pathname:m,search:g,hash:T,state:E.usr||null,key:E.key||"default"})]}var o=null;function s(){if(o)y.call(o),o=null;else{var d=z.Pop,m=i(),g=m[0],T=m[1];if(y.length){if(g!=null){var E=l-g;E&&(o={action:d,location:T,retry:function(){R(E*-1)}},R(E))}}else $(d)}}r.addEventListener(pt,s);var c=z.Pop,u=i(),l=u[0],p=u[1],v=Je(),y=Je();l==null&&(l=0,a.replaceState(de({},a.state,{idx:l}),""));function V(d){return typeof d=="string"?d:Ce(d)}function b(d,m){return m===void 0&&(m=null),je(de({pathname:p.pathname,hash:"",search:""},typeof d=="string"?Q(d):d,{state:m,key:gt()}))}function x(d,m){return[{usr:d.state,key:d.key,idx:m},V(d)]}function f(d,m,g){return!y.length||(y.call({action:d,location:m,retry:g}),!1)}function $(d){c=d;var m=i();l=m[0],p=m[1],v.call({action:c,location:p})}function N(d,m){var g=z.Push,T=b(d,m);function E(){N(d,m)}if(f(g,T,E)){var j=x(T,l+1),ee=j[0],P=j[1];try{a.pushState(ee,"",P)}catch{r.location.assign(P)}$(g)}}function D(d,m){var g=z.Replace,T=b(d,m);function E(){D(d,m)}if(f(g,T,E)){var j=x(T,l),ee=j[0],P=j[1];a.replaceState(ee,"",P),$(g)}}function R(d){a.go(d)}var B={get action(){return c},get location(){return p},createHref:V,push:N,replace:D,go:R,back:function(){R(-1)},forward:function(){R(1)},listen:function(m){return v.push(m)},block:function(m){var g=y.push(m);return y.length===1&&r.addEventListener(He,Ue),function(){g(),y.length||r.removeEventListener(He,Ue)}}};return B}function Ue(e){e.preventDefault(),e.returnValue=""}function Je(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter(function(r){return r!==t})}},call:function(t){e.forEach(function(r){return r&&r(t)})}}}function gt(){return Math.random().toString(36).substr(2,8)}function Ce(e){var n=e.pathname,t=n===void 0?"/":n,r=e.search,a=r===void 0?"":r,i=e.hash,o=i===void 0?"":i;return a&&a!=="?"&&(t+=a.charAt(0)==="?"?a:"?"+a),o&&o!=="#"&&(t+=o.charAt(0)==="#"?o:"#"+o),t}function Q(e){var n={};if(e){var t=e.indexOf("#");t>=0&&(n.hash=e.substr(t),e=e.substr(0,t));var r=e.indexOf("?");r>=0&&(n.search=e.substr(r),e=e.substr(0,r)),e&&(n.pathname=e)}return n}/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const ke=h.exports.createContext(null),Ve=h.exports.createContext(null),ve=h.exports.createContext({outlet:null,matches:[]});function F(e,n){if(!e)throw new Error(n)}function yt(e,n,t){t===void 0&&(t="/");let r=typeof n=="string"?Q(n):n,a=Ye(r.pathname||"/",t);if(a==null)return null;let i=Qe(e);xt(i);let o=null;for(let s=0;o==null&&s<i.length;++s)o=Tt(i[s],a);return o}function Qe(e,n,t,r){return n===void 0&&(n=[]),t===void 0&&(t=[]),r===void 0&&(r=""),e.forEach((a,i)=>{let o={relativePath:a.path||"",caseSensitive:a.caseSensitive===!0,childrenIndex:i,route:a};o.relativePath.startsWith("/")&&(o.relativePath.startsWith(r)||F(!1),o.relativePath=o.relativePath.slice(r.length));let s=J([r,o.relativePath]),c=t.concat(o);a.children&&a.children.length>0&&(a.index===!0&&F(!1),Qe(a.children,n,c,s)),!(a.path==null&&!a.index)&&n.push({path:s,score:Pt(s,a.index),routesMeta:c})}),n}function xt(e){e.sort((n,t)=>n.score!==t.score?t.score-n.score:Ot(n.routesMeta.map(r=>r.childrenIndex),t.routesMeta.map(r=>r.childrenIndex)))}const bt=/^:\w+$/,wt=3,Rt=2,Et=1,St=10,Ct=-2,Ke=e=>e==="*";function Pt(e,n){let t=e.split("/"),r=t.length;return t.some(Ke)&&(r+=Ct),n&&(r+=Rt),t.filter(a=>!Ke(a)).reduce((a,i)=>a+(bt.test(i)?wt:i===""?Et:St),r)}function Ot(e,n){return e.length===n.length&&e.slice(0,-1).every((r,a)=>r===n[a])?e[e.length-1]-n[n.length-1]:0}function Tt(e,n){let{routesMeta:t}=e,r={},a="/",i=[];for(let o=0;o<t.length;++o){let s=t[o],c=o===t.length-1,u=a==="/"?n:n.slice(a.length)||"/",l=Dt({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},u);if(!l)return null;Object.assign(r,l.params);let p=s.route;i.push({params:r,pathname:J([a,l.pathname]),pathnameBase:Ze(J([a,l.pathnameBase])),route:p}),l.pathnameBase!=="/"&&(a=J([a,l.pathnameBase]))}return i}function Dt(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[t,r]=Wt(e.path,e.caseSensitive,e.end),a=n.match(t);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((u,l,p)=>{if(l==="*"){let v=s[p]||"";o=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}return u[l]=It(s[p]||""),u},{}),pathname:i,pathnameBase:o,pattern:e}}function Wt(e,n,t){n===void 0&&(n=!1),t===void 0&&(t=!0);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(o,s)=>(r.push(s),"([^\\/]+)"));return e.endsWith("*")?(r.push("*"),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):a+=t?"\\/*$":"(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)",[new RegExp(a,n?void 0:"i"),r]}function It(e,n){try{return decodeURIComponent(e)}catch{return e}}function Lt(e,n){n===void 0&&(n="/");let{pathname:t,search:r="",hash:a=""}=typeof e=="string"?Q(e):e;return{pathname:t?t.startsWith("/")?t:kt(t,n):n,search:Nt(r),hash:At(a)}}function kt(e,n){let t=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?t.length>1&&t.pop():a!=="."&&t.push(a)}),t.length>1?t.join("/"):"/"}function Xe(e,n,t){let r=typeof e=="string"?Q(e):e,a=e===""||r.pathname===""?"/":r.pathname,i;if(a==null)i=t;else{let s=n.length-1;if(a.startsWith("..")){let c=a.split("/");for(;c[0]==="..";)c.shift(),s-=1;r.pathname=c.join("/")}i=s>=0?n[s]:"/"}let o=Lt(r,i);return a&&a!=="/"&&a.endsWith("/")&&!o.pathname.endsWith("/")&&(o.pathname+="/"),o}function Vt(e){return e===""||e.pathname===""?"/":typeof e=="string"?Q(e).pathname:e.pathname}function Ye(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let t=e.charAt(n.length);return t&&t!=="/"?null:e.slice(n.length)||"/"}const J=e=>e.join("/").replace(/\/\/+/g,"/"),Ze=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Nt=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,At=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Mt(e){ue()||F(!1);let{basename:n,navigator:t}=h.exports.useContext(ke),{hash:r,pathname:a,search:i}=et(e),o=a;if(n!=="/"){let s=Vt(e),c=s!=null&&s.endsWith("/");o=a==="/"?n+(c?"/":""):J([n,a])}return t.createHref({pathname:o,search:i,hash:r})}function ue(){return h.exports.useContext(Ve)!=null}function pe(){return ue()||F(!1),h.exports.useContext(Ve).location}function _t(){ue()||F(!1);let{basename:e,navigator:n}=h.exports.useContext(ke),{matches:t}=h.exports.useContext(ve),{pathname:r}=pe(),a=JSON.stringify(t.map(s=>s.pathnameBase)),i=h.exports.useRef(!1);return h.exports.useEffect(()=>{i.current=!0}),h.exports.useCallback(function(s,c){if(c===void 0&&(c={}),!i.current)return;if(typeof s=="number"){n.go(s);return}let u=Xe(s,JSON.parse(a),r);e!=="/"&&(u.pathname=J([e,u.pathname])),(c.replace?n.replace:n.push)(u,c.state)},[e,n,a,r])}function et(e){let{matches:n}=h.exports.useContext(ve),{pathname:t}=pe(),r=JSON.stringify(n.map(a=>a.pathnameBase));return h.exports.useMemo(()=>Xe(e,JSON.parse(r),t),[e,r,t])}function Ft(e,n){ue()||F(!1);let{matches:t}=h.exports.useContext(ve),r=t[t.length-1],a=r?r.params:{};r&&r.pathname;let i=r?r.pathnameBase:"/";r&&r.route;let o=pe(),s;if(n){var c;let v=typeof n=="string"?Q(n):n;i==="/"||((c=v.pathname)==null?void 0:c.startsWith(i))||F(!1),s=v}else s=o;let u=s.pathname||"/",l=i==="/"?u:u.slice(i.length)||"/",p=yt(e,{pathname:l});return $t(p&&p.map(v=>Object.assign({},v,{params:Object.assign({},a,v.params),pathname:J([i,v.pathname]),pathnameBase:v.pathnameBase==="/"?i:J([i,v.pathnameBase])})),t)}function $t(e,n){return n===void 0&&(n=[]),e==null?null:e.reduceRight((t,r,a)=>h.exports.createElement(ve.Provider,{children:r.route.element!==void 0?r.route.element:t,value:{outlet:t,matches:n.concat(e.slice(0,a+1))}}),null)}function Pe(e){F(!1)}function Bt(e){let{basename:n="/",children:t=null,location:r,navigationType:a=z.Pop,navigator:i,static:o=!1}=e;ue()&&F(!1);let s=Ze(n),c=h.exports.useMemo(()=>({basename:s,navigator:i,static:o}),[s,i,o]);typeof r=="string"&&(r=Q(r));let{pathname:u="/",search:l="",hash:p="",state:v=null,key:y="default"}=r,V=h.exports.useMemo(()=>{let b=Ye(u,s);return b==null?null:{pathname:b,search:l,hash:p,state:v,key:y}},[s,u,l,p,v,y]);return V==null?null:h.exports.createElement(ke.Provider,{value:c},h.exports.createElement(Ve.Provider,{children:t,value:{location:V,navigationType:a}}))}function jt(e){let{children:n,location:t}=e;return Ft(Oe(n),t)}function Oe(e){let n=[];return h.exports.Children.forEach(e,t=>{if(!h.exports.isValidElement(t))return;if(t.type===h.exports.Fragment){n.push.apply(n,Oe(t.props.children));return}t.type!==Pe&&F(!1);let r={caseSensitive:t.props.caseSensitive,element:t.props.element,index:t.props.index,path:t.props.path};t.props.children&&(r.children=Oe(t.props.children)),n.push(r)}),n}/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Te(){return Te=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},Te.apply(this,arguments)}function Ht(e,n){if(e==null)return{};var t={},r=Object.keys(e),a,i;for(i=0;i<r.length;i++)a=r[i],!(n.indexOf(a)>=0)&&(t[a]=e[a]);return t}const Ut=["onClick","reloadDocument","replace","state","target","to"];function Jt(e){let{basename:n,children:t,window:r}=e,a=h.exports.useRef();a.current==null&&(a.current=mt({window:r}));let i=a.current,[o,s]=h.exports.useState({action:i.action,location:i.location});return h.exports.useLayoutEffect(()=>i.listen(s),[i]),h.exports.createElement(Bt,{basename:n,children:t,location:o.location,navigationType:o.action,navigator:i})}function Kt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}const tt=h.exports.forwardRef(function(n,t){let{onClick:r,reloadDocument:a,replace:i=!1,state:o,target:s,to:c}=n,u=Ht(n,Ut),l=Mt(c),p=qt(c,{replace:i,state:o,target:s});function v(y){r&&r(y),!y.defaultPrevented&&!a&&p(y)}return h.exports.createElement("a",Te({},u,{href:l,onClick:v,ref:t,target:s}))});function qt(e,n){let{target:t,replace:r,state:a}=n===void 0?{}:n,i=_t(),o=pe(),s=et(e);return h.exports.useCallback(c=>{if(c.button===0&&(!t||t==="_self")&&!Kt(c)){c.preventDefault();let u=!!r||Ce(o)===Ce(s);i(e,{replace:u,state:a})}},[o,i,s,r,a,t,e])}function zt(){return Z("main",{children:[w("h1",{children:"This page is completely static."}),w("section",{children:"An since it does not contain any interactive islands, no JavaScript is shipped to the browser."}),w(tt,{to:"/",children:"Home"})]})}/*! *****************************************************************************
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
***************************************************************************** */function nt(e,n,t,r){function a(i){return i instanceof t?i:new t(function(o){o(i)})}return new(t||(t=Promise))(function(i,o){function s(l){try{u(r.next(l))}catch(p){o(p)}}function c(l){try{u(r.throw(l))}catch(p){o(p)}}function u(l){l.done?i(l.value):a(l.value).then(s,c)}u((r=r.apply(e,n||[])).next())})}function rt(e,n){var t={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,a,i,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(u){return function(l){return c([u,l])}}function c(u){if(r)throw new TypeError("Generator is already executing.");for(;t;)try{if(r=1,a&&(i=u[0]&2?a.return:u[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,u[1])).done)return i;switch(a=0,i&&(u=[u[0]&2,i.value]),u[0]){case 0:case 1:i=u;break;case 4:return t.label++,{value:u[1],done:!1};case 5:t.label++,a=u[1],u=[0];continue;case 7:u=t.ops.pop(),t.trys.pop();continue;default:if(i=t.trys,!(i=i.length>0&&i[i.length-1])&&(u[0]===6||u[0]===2)){t=0;continue}if(u[0]===3&&(!i||u[1]>i[0]&&u[1]<i[3])){t.label=u[1];break}if(u[0]===6&&t.label<i[1]){t.label=i[1],i=u;break}if(i&&t.label<i[2]){t.label=i[2],t.ops.push(u);break}i[2]&&t.ops.pop(),t.trys.pop();continue}u=n.call(e,t)}catch(l){u=[6,l],a=0}finally{r=i=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}var _=function(){},O=_(),fe=Object,C=function(e){return e===O},U=function(e){return typeof e=="function"},K=function(e,n){return fe.assign({},e,n)},Ne="undefined",Ae=function(){return typeof window!=Ne},Gt=function(){return typeof document!=Ne},Qt=function(){return Ae()&&typeof window.requestAnimationFrame!=Ne},ce=new WeakMap,Xt=0,se=function(e){var n=typeof e,t=e&&e.constructor,r=t==Date,a,i;if(fe(e)===e&&!r&&t!=RegExp){if(a=ce.get(e),a)return a;if(a=++Xt+"~",ce.set(e,a),t==Array){for(a="@",i=0;i<e.length;i++)a+=se(e[i])+",";ce.set(e,a)}if(t==fe){a="#";for(var o=fe.keys(e).sort();!C(i=o.pop());)C(e[i])||(a+=i+":"+se(e[i])+",");ce.set(e,a)}}else a=r?e.toJSON():n=="symbol"?e.toString():n=="string"?JSON.stringify(e):""+e;return a},De=!0,Yt=function(){return De},at=Ae(),Me=Gt(),We=at&&window.addEventListener?window.addEventListener.bind(window):_,Zt=Me?document.addEventListener.bind(document):_,Ie=at&&window.removeEventListener?window.removeEventListener.bind(window):_,en=Me?document.removeEventListener.bind(document):_,tn=function(){var e=Me&&document.visibilityState;return C(e)||e!=="hidden"},nn=function(e){return Zt("visibilitychange",e),We("focus",e),function(){en("visibilitychange",e),Ie("focus",e)}},rn=function(e){var n=function(){De=!0,e()},t=function(){De=!1};return We("online",n),We("offline",t),function(){Ie("online",n),Ie("offline",t)}},an={isOnline:Yt,isVisible:tn},on={initFocus:nn,initReconnect:rn},me=!Ae()||"Deno"in window,sn=function(e){return Qt()?window.requestAnimationFrame(e):setTimeout(e,1)},he=me?h.exports.useEffect:h.exports.useLayoutEffect,Ee=typeof navigator!="undefined"&&navigator.connection,qe=!me&&Ee&&(["slow-2g","2g"].includes(Ee.effectiveType)||Ee.saveData),it=function(e){if(U(e))try{e=e()}catch{e=""}var n=[].concat(e);e=typeof e=="string"?e:(Array.isArray(e)?e.length:e)?se(e):"";var t=e?"$swr$"+e:"";return[e,n,t]},G=new WeakMap,ot=0,st=1,ut=2,oe=function(e,n,t,r,a,i,o){o===void 0&&(o=!0);var s=G.get(e),c=s[0],u=s[1],l=s[3],p=c[n],v=u[n];if(o&&v)for(var y=0;y<v.length;++y)v[y](t,r,a);return i&&(delete l[n],p&&p[0])?p[0](ut).then(function(){return e.get(n)}):e.get(n)},un=0,Le=function(){return++un},lt=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return nt(void 0,void 0,void 0,function(){var t,r,a,i,o,s,c,u,l,p,v,y,V,b,x,f,$,N,D,R,B;return rt(this,function(d){switch(d.label){case 0:if(t=e[0],r=e[1],a=e[2],i=e[3],o=typeof i=="boolean"?{revalidate:i}:i||{},s=C(o.populateCache)?!0:o.populateCache,c=o.revalidate!==!1,u=o.rollbackOnError!==!1,l=o.optimisticData,p=it(r),v=p[0],y=p[2],!v)return[2];if(V=G.get(t),b=V[2],e.length<3)return[2,oe(t,v,t.get(v),O,O,c,!0)];if(x=a,$=Le(),b[v]=[$,0],N=!C(l),D=t.get(v),N&&(R=U(l)?l(D):l,t.set(v,R),oe(t,v,R)),U(x))try{x=x(t.get(v))}catch(m){f=m}return x&&U(x.then)?[4,x.catch(function(m){f=m})]:[3,2];case 1:if(x=d.sent(),$!==b[v][0]){if(f)throw f;return[2,x]}else f&&N&&u&&(s=!0,x=D,t.set(v,D));d.label=2;case 2:return s&&(f||(U(s)&&(x=s(x,D)),t.set(v,x)),t.set(y,K(t.get(y),{error:f}))),b[v][1]=Le(),[4,oe(t,v,x,f,O,c,!!s)];case 3:if(B=d.sent(),f)throw f;return[2,s?B:x]}})})},ze=function(e,n){for(var t in e)e[t][0]&&e[t][0](n)},ln=function(e,n){if(!G.has(e)){var t=K(on,n),r={},a=lt.bind(O,e),i=_;if(G.set(e,[r,{},{},{},a]),!me){var o=t.initFocus(setTimeout.bind(O,ze.bind(O,r,ot))),s=t.initReconnect(setTimeout.bind(O,ze.bind(O,r,st)));i=function(){o&&o(),s&&s(),G.delete(e)}}return[e,a,i]}return[e,G.get(e)[4]]},cn=function(e,n,t,r,a){var i=t.errorRetryCount,o=a.retryCount,s=~~((Math.random()+.5)*(1<<(o<8?o:8)))*t.errorRetryInterval;!C(i)&&o>i||setTimeout(r,s,a)},ct=ln(new Map),fn=ct[0],hn=ct[1],dn=K({onLoadingSlow:_,onSuccess:_,onError:_,onErrorRetry:cn,onDiscarded:_,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:qe?1e4:5e3,focusThrottleInterval:5*1e3,dedupingInterval:2*1e3,loadingTimeout:qe?5e3:3e3,compare:function(e,n){return se(e)==se(n)},isPaused:function(){return!1},cache:fn,mutate:hn,fallback:{}},an),vn=function(e,n){var t=K(e,n);if(n){var r=e.use,a=e.fallback,i=n.use,o=n.fallback;r&&i&&(t.use=r.concat(i)),a&&o&&(t.fallback=K(a,o))}return t},pn=h.exports.createContext({}),mn=function(e,n){var t=h.exports.useState({})[1],r=h.exports.useRef(e),a=h.exports.useRef({data:!1,error:!1,isValidating:!1}),i=h.exports.useCallback(function(o){var s=!1,c=r.current;for(var u in o){var l=u;c[l]!==o[l]&&(c[l]=o[l],a.current[l]&&(s=!0))}s&&!n.current&&t({})},[]);return he(function(){r.current=e}),[r,a.current,i]},gn=function(e){return U(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(e[1]===null?e[2]:e[1])||{}]},yn=function(){return K(dn,h.exports.useContext(pn))},xn=function(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var a=yn(),i=gn(t),o=i[0],s=i[1],c=i[2],u=vn(a,c),l=e,p=u.use;if(p)for(var v=p.length;v-- >0;)l=p[v](l);return l(o,s||u.fetcher,u)}},Ge=function(e,n,t){var r=n[e]||(n[e]=[]);return r.push(t),function(){var a=r.indexOf(t);a>=0&&(r[a]=r[r.length-1],r.pop())}},Se={dedupe:!0},bn=function(e,n,t){var r=t.cache,a=t.compare,i=t.fallbackData,o=t.suspense,s=t.revalidateOnMount,c=t.refreshInterval,u=t.refreshWhenHidden,l=t.refreshWhenOffline,p=G.get(r),v=p[0],y=p[1],V=p[2],b=p[3],x=it(e),f=x[0],$=x[1],N=x[2],D=h.exports.useRef(!1),R=h.exports.useRef(!1),B=h.exports.useRef(f),d=h.exports.useRef(n),m=h.exports.useRef(t),g=function(){return m.current},T=function(){return g().isVisible()&&g().isOnline()},E=function(L){return r.set(N,K(r.get(N),L))},j=r.get(f),ee=C(i)?t.fallback[f]:i,P=C(j)?ee:j,ge=r.get(N)||{},te=ge.error,_e=!D.current,Fe=function(){return _e&&!C(s)?s:g().isPaused()?!1:o?C(P)?!1:t.revalidateIfStale:C(P)||t.revalidateIfStale},ft=function(){return!f||!n?!1:ge.isValidating?!0:_e&&Fe()},ye=ft(),xe=mn({data:P,error:te,isValidating:ye},R),X=xe[0],be=xe[1],le=xe[2],q=h.exports.useCallback(function(L){return nt(void 0,void 0,void 0,function(){var W,I,k,ne,re,A,S,H,M,we,ae,Y,Re;return rt(this,function(ie){switch(ie.label){case 0:if(W=d.current,!f||!W||R.current||g().isPaused())return[2,!1];ne=!0,re=L||{},A=!b[f]||!re.dedupe,S=function(){return!R.current&&f===B.current&&D.current},H=function(){var $e=b[f];$e&&$e[1]===k&&delete b[f]},M={isValidating:!1},we=function(){E({isValidating:!1}),S()&&le(M)},E({isValidating:!0}),le({isValidating:!0}),ie.label=1;case 1:return ie.trys.push([1,3,,4]),A&&(oe(r,f,X.current.data,X.current.error,!0),t.loadingTimeout&&!r.get(f)&&setTimeout(function(){ne&&S()&&g().onLoadingSlow(f,t)},t.loadingTimeout),b[f]=[W.apply(void 0,$),Le()]),Re=b[f],I=Re[0],k=Re[1],[4,I];case 2:return I=ie.sent(),A&&setTimeout(H,t.dedupingInterval),!b[f]||b[f][1]!==k?(A&&S()&&g().onDiscarded(f),[2,!1]):(E({error:O}),M.error=O,ae=V[f],!C(ae)&&(k<=ae[0]||k<=ae[1]||ae[1]===0)?(we(),A&&S()&&g().onDiscarded(f),[2,!1]):(a(X.current.data,I)?M.data=X.current.data:M.data=I,a(r.get(f),I)||r.set(f,I),A&&S()&&g().onSuccess(I,f,t),[3,4]));case 3:return Y=ie.sent(),H(),g().isPaused()||(E({error:Y}),M.error=Y,A&&S()&&(g().onError(Y,f,t),(typeof t.shouldRetryOnError=="boolean"&&t.shouldRetryOnError||U(t.shouldRetryOnError)&&t.shouldRetryOnError(Y))&&T()&&g().onErrorRetry(Y,f,t,q,{retryCount:(re.retryCount||0)+1,dedupe:!0}))),[3,4];case 4:return ne=!1,we(),S()&&A&&oe(r,f,M.data,M.error,!1),[2,!0]}})})},[f]),ht=h.exports.useCallback(lt.bind(O,r,function(){return B.current}),[]);if(he(function(){d.current=n,m.current=t}),he(function(){if(!!f){var L=f!==B.current,W=q.bind(O,Se),I=function(S,H,M){le(K({error:H,isValidating:M},a(X.current.data,S)?O:{data:S}))},k=0,ne=function(S){if(S==ot){var H=Date.now();g().revalidateOnFocus&&H>k&&T()&&(k=H+g().focusThrottleInterval,W())}else if(S==st)g().revalidateOnReconnect&&T()&&W();else if(S==ut)return q()},re=Ge(f,y,I),A=Ge(f,v,ne);return R.current=!1,B.current=f,D.current=!0,L&&le({data:P,error:te,isValidating:ye}),Fe()&&(C(P)||me?W():sn(W)),function(){R.current=!0,re(),A()}}},[f,q]),he(function(){var L;function W(){var k=U(c)?c(P):c;k&&L!==-1&&(L=setTimeout(I,k))}function I(){!X.current.error&&(u||g().isVisible())&&(l||g().isOnline())?q(Se).then(W):W()}return W(),function(){L&&(clearTimeout(L),L=-1)}},[c,u,l,q]),h.exports.useDebugValue(P),o&&C(P)&&f)throw d.current=n,m.current=t,R.current=!1,C(te)?q(Se):te;return{mutate:ht,get data(){return be.data=!0,P},get error(){return be.error=!0,te},get isValidating(){return be.isValidating=!0,ye}}},wn=xn(bn);const Rn=()=>new Promise(e=>{setTimeout(()=>e("Data fetched via SWR!"),0)});function En(){const{data:e}=wn("This data has been fetched via SWR.",Rn,{suspense:!0});return Z("main",{children:[Z("h1",{children:["Welcome to ",w("i",{children:"Capri"})]}),w("section",{children:"This page is static, but contains some dynamic parts."}),w("section",{children:e}),Z("section",{children:["Here is a simple counter: ",w(Be,{})]}),Z("section",{children:["And here is another one, independent from the one above:"," ",w(Be,{start:100})]}),w(tt,{to:"/about",children:"Link to another page"})]})}function Sn(){return w(h.exports.Suspense,{children:Z(jt,{children:[w(Pe,{index:!0,element:w(En,{})}),w(Pe,{path:"/about",element:w(zt,{})})]})})}dt.createRoot(document.getElementById("app")).render(w(h.exports.StrictMode,{children:w(Jt,{children:w(Sn,{})})}));
