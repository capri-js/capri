import{j as e,d as i,a}from"./jsx-runtime.326fd956.js";import"./preact.module.6a90d538.js";function t(){return e("capri-lagoon",{style:"display:contents",dangerouslySetInnerHTML:{__html:""}})}function r({title:s,children:d}){const[n,l]=i(!1);return a("div",{class:"expandable box","data-expanded":n?"true":"false",children:[e(t,{children:"This is static content inside an island. We call this a lagoon."}),e("button",{onClick:()=>l(!n),children:s}),a("div",{class:"expandable-content",children:[e(t,{children:"This a second lagoon. Below you see the children that were passed to the Expandable island:"}),d]})]})}export{r as default};
