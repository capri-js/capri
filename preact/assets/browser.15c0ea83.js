import{l as t,p as P}from"./preact.module.6a90d538.js";var m,o,s,d,h=0,A=[],H=t.__b,y=t.__r,g=t.diffed,j=t.__c,b=t.unmount;function F(_,n){t.__h&&t.__h(o,_,h||n),h=0;var r=o.__H||(o.__H={__:[],__h:[]});return _>=r.__.length&&r.__.push({}),r.__[_]}function S(_){return h=1,T(q,_)}function T(_,n,r){var e=F(m++,2);return e.t=_,e.__c||(e.__=[r?r(n):q(void 0,n),function(u){var i=e.t(e.__[0],u);e.__[0]!==i&&(e.__=[i,e.__[1]],e.__c.setState({}))}],e.__c=o),e.__}function B(_,n){var r=F(m++,3);!t.__s&&w(r.__H,n)&&(r.__=_,r.__H=n,o.__H.__h.push(r))}function k(){for(var _;_=A.shift();)if(_.__P)try{_.__H.__h.forEach(a),_.__H.__h.forEach(v),_.__H.__h=[]}catch(n){_.__H.__h=[],t.__e(n,_.__v)}}t.__b=function(_){o=null,H&&H(_)},t.__r=function(_){y&&y(_),m=0;var n=(o=_.__c).__H;n&&(s===o?(n.__h=[],o.__h=[],n.__.forEach(function(r){r.__H&&(r.__H=void 0)})):(n.__h.forEach(a),n.__h.forEach(v),n.__h=[])),s=o},t.diffed=function(_){g&&g(_);var n=_.__c;n&&n.__H&&n.__H.__h.length&&(A.push(n)!==1&&d===t.requestAnimationFrame||((d=t.requestAnimationFrame)||function(r){var e,u=function(){clearTimeout(i),E&&cancelAnimationFrame(e),setTimeout(r)},i=setTimeout(u,100);E&&(e=requestAnimationFrame(u))})(k)),o=null,s=null},t.__c=function(_,n){n.some(function(r){try{r.__h.forEach(a),r.__h=r.__h.filter(function(e){return!e.__||v(e)})}catch(e){n.some(function(u){u.__h&&(u.__h=[])}),n=[],t.__e(e,r.__v)}}),j&&j(_,n)},t.unmount=function(_){b&&b(_);var n,r=_.__c;r&&r.__H&&(r.__H.__.forEach(function(e){try{a(e)}catch(u){n=u}}),n&&t.__e(n,r.__v))};var E=typeof requestAnimationFrame=="function";function a(_){var n=o,r=_.__c;typeof r=="function"&&(_.__c=void 0,r()),o=n}function v(_){var n=o;_.__c=_.__(),o=n}function w(_,n){return!_||_.length!==n.length||n.some(function(r,e){return r!==_[e]})}function q(_,n){return typeof n=="function"?n(_):n}function M(_){if(_.__esModule)return _;var n=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(_).forEach(function(r){var e=Object.getOwnPropertyDescriptor(_,r);Object.defineProperty(n,r,e.get?e:{enumerable:!0,get:function(){return _[r]}})}),n}var z=M(P),x,O,l=z,D=0;function $(_,n,r,e,u){var i,c,f={};for(c in n)c=="ref"?i=n[c]:f[c]=n[c];var p={type:_,props:f,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--D,__source:u,__self:e};if(typeof _=="function"&&(i=_.defaultProps))for(c in i)f[c]===void 0&&(f[c]=i[c]);return l.options.vnode&&l.options.vnode(p),p}l.Fragment,O=$,x=$;const C=O,G=x;function I(_,n={}){return _}export{C as a,B as d,I as i,G as j,S as p};
