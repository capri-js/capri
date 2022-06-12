import{r as c}from"./client.91fb33d9.js";var i={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=c.exports,d=Symbol.for("react.element"),f=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,m=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function p(t,r,o){var e,n={},u=null,a=null;o!==void 0&&(u=""+o),r.key!==void 0&&(u=""+r.key),r.ref!==void 0&&(a=r.ref);for(e in r)x.call(r,e)&&!y.hasOwnProperty(e)&&(n[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)n[e]===void 0&&(n[e]=r[e]);return{$$typeof:d,type:t,key:u,ref:a,props:n,_owner:m.current}}s.Fragment=f;s.jsx=p;s.jsxs=p;i.exports=s;const l=i.exports.jsx,j=i.exports.jsxs;function v({start:t=0}){const[r,o]=c.exports.useState(t);return j("div",{className:"counter","data-testid":"counter",children:[l("button",{onClick:()=>o(e=>e-1),children:"-"}),l("span",{children:r}),l("button",{onClick:()=>o(e=>e+1),children:"+"})]})}const b=v;var O=Object.freeze(Object.defineProperty({__proto__:null,CounterIsland:b},Symbol.toStringTag,{value:"Module"}));export{b as C,l as a,O as b,j};
