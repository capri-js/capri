import{D as N,A as x,B as S,v as $,_ as K,S as T}from"./preact.module.4b7772f4.js";import{j as l,a as c,C,y as E}from"./Counter.island.e46a89fe.js";const H=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}};H();var W={};function d(e,t){for(var r in t)e[r]=t[r];return e}function z(e,t,r){var n,i=/(?:\?([^#]*))?(#.*)?$/,o=e.match(i),a={};if(o&&o[1])for(var h=o[1].split("&"),p=0;p<h.length;p++){var y=h[p].split("=");a[decodeURIComponent(y[0])]=decodeURIComponent(y.slice(1).join("="))}e=g(e.replace(i,"")),t=g(t||"");for(var M=Math.max(e.length,t.length),s=0;s<M;s++)if(t[s]&&t[s].charAt(0)===":"){var b=t[s].replace(/(^:|[+*?]+$)/g,""),m=(t[s].match(/[+*?]+$/)||W)[0]||"",k=~m.indexOf("+"),w=~m.indexOf("*"),A=e[s]||"";if(!A&&!w&&(m.indexOf("?")<0||k)){n=!1;break}if(a[b]=decodeURIComponent(A),k||w){a[b]=e.slice(s).map(decodeURIComponent).join("/");break}}else if(t[s]!==e[s]){n=!1;break}return(r.default===!0||n!==!1)&&a}function B(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function _(e,t){return e.index=t,e.rank=function(r){return r.props.default?0:g(r.props.path).map(q).join("")}(e),e.props}function g(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function q(e){return e.charAt(0)==":"?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var F={},f=[],P=[],u=null,U={url:v()},J=N(U);function v(){var e;return""+((e=u&&u.location?u.location:u&&u.getCurrentLocation?u.getCurrentLocation():typeof location!="undefined"?location:F).pathname||"")+(e.search||"")}function I(e,t){return t===void 0&&(t=!1),typeof e!="string"&&e.url&&(t=e.replace,e=e.url),function(r){for(var n=f.length;n--;)if(f[n].canRoute(r))return!0;return!1}(e)&&function(r,n){n===void 0&&(n="push"),u&&u[n]?u[n](r):typeof history!="undefined"&&history[n+"State"]&&history[n+"State"](null,null,r)}(e,t?"replace":"push"),O(e)}function O(e){for(var t=!1,r=0;r<f.length;r++)f[r].routeTo(e)&&(t=!0);return t}function G(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),r=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!r||r.match(/^_?self$/i)))return I(t)}}function Q(e){return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1}function R(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||e.button)){var t=e.target;do if(t.localName==="a"&&t.getAttribute("href")){if(t.hasAttribute("data-native")||t.hasAttribute("native"))return;if(G(t))return Q(e)}while(t=t.parentNode)}}var L=!1;function j(e){e.history&&(u=e.history),this.state={url:e.url||v()}}d(j.prototype=new K,{shouldComponentUpdate:function(e){return e.static!==!0||e.url!==this.props.url||e.onChange!==this.props.onChange},canRoute:function(e){var t=x(this.props.children);return this.g(t,e)!==void 0},routeTo:function(e){this.setState({url:e});var t=this.canRoute(e);return this.p||this.forceUpdate(),t},componentWillMount:function(){this.p=!0},componentDidMount:function(){var e=this;L||(L=!0,u||addEventListener("popstate",function(){O(v())}),addEventListener("click",R)),f.push(this),u&&(this.u=u.listen(function(t){var r=t.location||t;e.routeTo(""+(r.pathname||"")+(r.search||""))})),this.p=!1},componentWillUnmount:function(){typeof this.u=="function"&&this.u(),f.splice(f.indexOf(this),1)},componentWillUpdate:function(){this.p=!0},componentDidUpdate:function(){this.p=!1},g:function(e,t){e=e.filter(_).sort(B);for(var r=0;r<e.length;r++){var n=e[r],i=z(t,n.props.path,n.props);if(i)return[n,i]}},render:function(e,t){var r,n,i=e.onChange,o=t.url,a=this.c,h=this.g(x(e.children),o);if(h&&(n=S(h[0],d(d({url:o,matches:r=h[1]},r),{key:void 0,ref:void 0}))),o!==(a&&a.url)){d(U,a=this.c={url:o,previous:a&&a.url,current:n,path:n?n.props.path:null,matches:r}),a.router=this,a.active=n?[n]:[];for(var p=P.length;p--;)P[p]({});typeof i=="function"&&i(a)}return $(J.Provider,{value:a},n)}});var D=function(e){return $("a",d({onClick:R},e))};function V(){return l("main",{children:[c("h1",{children:"This page is completely static."}),c("section",{children:"An since it does not contain any interactive islands, no JavaScript is shipped to the browser."}),c(D,{href:"..",children:"Home"})]})}function X(){return l("main",{children:[l("h1",{children:["Partial hydration with ",c("i",{children:"Capri"})]}),c("section",{children:"This page is static, but contains some dynamic parts."}),l("section",{children:["Here is a simple counter: ",c(C,{})]}),l("section",{children:["And here is another one, independent from the one above:"," ",c(C,{start:100})]}),c(D,{href:"about",children:"Link to another page"})]})}function Y(){return E(()=>{var r;const t=(r=new URL(window.location.href).searchParams.get("slug"))!=null?r:"/";I(t)}),null}function Z(){return c("div",{class:"banner",children:"Preview Mode"})}function ee({url:e}){return l("div",{children:[!e&&c(Z,{}),l(j,{url:e,children:[c(X,{path:"/"}),c(V,{path:"/about"}),c(Y,{path:"/preview"})]})]})}T(c(ee,{}),document.body);