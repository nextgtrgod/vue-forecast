(function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/vue-forecast/",r(r.s="1384")})({1384:function(e,t,r){"use strict";r.r(t);let n=(e,t,r,n)=>Math.hypot(a(r-e),a(n-t));Math.random;const a=Math.abs,l=Math.PI;let o=0,s=0,f=0,i=(e,t=[],{W:r,H:a,threshold:i})=>{for(e.fillStyle="#F0F0F0",e.fillRect(0,0,r,a),o=0;o<t.length;o++){for((t[o].x-t[o].r<=0&&t[o].s.x<=0||t[o].x+t[o].r>=r&&t[o].s.x>=0)&&(t[o].s.x*=-1),(t[o].y-t[o].r<=0&&t[o].s.y<=0||t[o].y+t[o].r>=a&&t[o].s.y>=0)&&(t[o].s.y*=-1),s=0;s<t.length;s++)s!==o&&(f=n(t[o].x,t[o].y,t[s].x,t[s].y),f<i&&(e.beginPath(),e.moveTo(t[o].x,t[o].y),e.lineTo(t[s].x,t[s].y),e.strokeStyle=`rgba(0, 0, 0, ${(i-f)/10})`,e.lineWidth=Math.min(i/f,Math.min(t[o].r,t[s].r)),e.stroke()));t[o].x+=t[o].s.x,t[o].y+=t[o].s.y,e.beginPath(),e.fillStyle="#000",e.arc(t[o].x,t[o].y,t[o].r,0,2*l),e.fill()}};var u=i;self.radId=null,self.canvas=null,onmessage=e=>{let{canvas:t,data:r,options:n}=e.data;t&&(self.canvas=t),self.canvas.width=n.W,self.canvas.height=n.H;let a=self.canvas.getContext("2d",{alpha:!1});a.fillStyle="#0f0",cancelAnimationFrame(self.radId),self.rafId=self.update(a,r,n)},self.update=(...e)=>{self.radId=requestAnimationFrame(()=>update(...e)),u(...e)}}});