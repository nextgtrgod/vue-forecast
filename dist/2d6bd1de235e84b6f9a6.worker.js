(function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="3799")})({3799:function(e,t,n){"use strict";n.r(t);let r=(e,t,n,r)=>Math.hypot(l(n-e),l(r-t));Math.random;const l=Math.abs,a=Math.PI;let o=0,i=0,f=0,s=(e,t=[],{W:n,H:l,threshold:s})=>{for(e.fillStyle="#F0F0F0",e.fillRect(0,0,n,l),o=0;o<t.length;o++){for((t[o].x-t[o].r<0||t[o].x+t[o].r>n)&&(t[o].s.x*=-1),(t[o].y-t[o].r<0||t[o].y+t[o].r>l)&&(t[o].s.y*=-1),i=0;i<t.length;i++)i!==o&&(f=r(t[o].x,t[o].y,t[i].x,t[i].y),f<s&&(e.beginPath(),e.moveTo(t[o].x,t[o].y),e.lineTo(t[i].x,t[i].y),e.strokeStyle=`rgba(0, 0, 0, ${(s-f)/10})`,e.lineWidth=Math.min(s/f,Math.min(t[o].r,t[i].r)),e.stroke()));t[o].x+=t[o].s.x,t[o].y+=t[o].s.y,e.beginPath(),e.fillStyle="#000",e.arc(t[o].x,t[o].y,t[o].r,0,2*a),e.fill()}};var u=s;self.radId=null,self.canvas=null,onmessage=e=>{let{canvas:t,data:n,options:r}=e.data;t&&(self.canvas=t),self.canvas.width=r.W,self.canvas.height=r.H;let l=self.canvas.getContext("2d",{alpha:!1,desynchronized:!0});l.fillStyle="#0f0",cancelAnimationFrame(self.radId),self.rafId=c(l,n,r)};let c=(...e)=>{self.radId=requestAnimationFrame(()=>c(...e)),u(...e)}}});