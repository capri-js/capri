import{w as l,c,g as u,p as d,r as $,t as p}from"./web.237bec24.js";import{i as m}from"./browser.baed1bce.js";const b=p('<div class="counter" data-testid="counter"><button>-</button><span></span><button>+</button></div>');function g({start:r=0}){const[i,n]=c(r);return(()=>{const e=u(b),s=e.firstChild,o=s.nextSibling,a=o.nextSibling;return s.$$click=()=>n(t=>t-1),d(o,i),a.$$click=()=>n(t=>t+1),$(),e})()}const v=m(g);l(["click"]);export{v as CounterIsland};