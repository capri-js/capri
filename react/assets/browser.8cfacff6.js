import{r as l}from"./client.6b0f1a33.js";var p={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i=l.exports,u=Symbol.for("react.element"),c=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,m=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function _(o,r,a){var e,t={},s=null,f=null;a!==void 0&&(s=""+a),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(f=r.ref);for(e in r)x.call(r,e)&&!y.hasOwnProperty(e)&&(t[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)t[e]===void 0&&(t[e]=r[e]);return{$$typeof:u,type:o,key:s,ref:f,props:t,_owner:m.current}}n.Fragment=c;n.jsx=_;n.jsxs=_;p.exports=n;const j=p.exports.jsx,v=p.exports.jsxs;function O(o,r={}){return o}function E(o){return r=>l.exports.createElement("capri-lagoon",{dangerouslySetInnerHTML:{__html:""}})}export{j as a,O as i,v as j,E as l};
