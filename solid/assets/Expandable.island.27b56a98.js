import{w as c,c as o,g as p,p as a,l as x,x as b,r as f,t as u}from"./web.237bec24.js";import{i as m}from"./browser.baed1bce.js";const E=u('<div class="expandable"><button></button><div class="expandable-content"></div></div>');function v({title:n,children:s}){const[l,d]=o(!1);return(()=>{const e=p(E),t=e.firstChild,i=t.nextSibling;return t.$$click=()=>d(r=>!r),a(t,n),a(i,s),x(()=>b(e,"data-expanded",l()?"true":"false")),f(),e})()}const _=m(v);c(["click"]);export{_ as ExpandableIsland};
