import{r as i}from"./client.6b0f1a33.js";var p={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l=i.exports,u=Symbol.for("react.element"),a=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,y=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function x(o,r,_){var e,t={},n=null,f=null;_!==void 0&&(n=""+_),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(f=r.ref);for(e in r)m.call(r,e)&&!c.hasOwnProperty(e)&&(t[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)t[e]===void 0&&(t[e]=r[e]);return{$$typeof:u,type:o,key:n,ref:f,props:t,_owner:y.current}}s.Fragment=a;s.jsx=x;s.jsxs=x;p.exports=s;const d=p.exports.jsx,v=p.exports.jsxs;export{d as a,v as j};
