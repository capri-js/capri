import{f as r,c,q as u,z as $,v as d,w as b}from"./web-154b5ce3.js";const p=b('<div class="counter" data-testid="counter"><button>-</button><span></span><button>+</button></div>');function g({start:i=0}){const[l,e]=c(i);return(()=>{const n=u(p),s=n.firstChild,a=s.nextSibling,o=a.nextSibling;return s.$$click=()=>e(t=>t-1),$(a,l),o.$$click=()=>e(t=>t+1),d(),n})()}r(["click"]);export{g as default};