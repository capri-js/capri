import{o as e,p as o}from"./jsxRuntime.module.46c0aeaa.js";import"./preact.module.e69c8677.js";function a(){return e("capri-lagoon",{style:"display:contents",dangerouslySetInnerHTML:{__html:""}})}function c({title:t,children:l}){const[n,d]=o(!1);return e("div",{class:"expandable box","data-expanded":n?"true":"false",children:[e(a,{children:"This is static content inside an island. We call this a lagoon."}),e("button",{onClick:()=>d(!n),children:t}),e("div",{class:"expandable-content",children:[e(a,{children:"This a second lagoon. Below you see the children that were passed to the Expandable island:"}),l]})]})}export{c as default};
