import{i as s,j as a,a as n}from"./browser.fe8bbda5.js";import{r as c}from"./client.91fb33d9.js";function i({start:e=0}){const[o,r]=c.exports.useState(e);return a("div",{className:"counter","data-testid":"counter",children:[n("button",{onClick:()=>r(t=>t-1),children:"-"}),n("span",{children:o}),n("button",{onClick:()=>r(t=>t+1),children:"+"})]})}const l=s(i);export{l as CounterIsland};
