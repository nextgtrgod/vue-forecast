(function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/vue-forecast/",i(i.s="1384")})({1384:function(t,e,i){"use strict";i.r(e);let n={from:t=>t[~~(Math.random()*t.length)],range:(t=0,e=1)=>Math.random()*(e-t)+t};var s=n;let r=(t,e,i,n)=>Math.hypot(Math.abs(i-t),Math.abs(n-e));var o=r;const l=2*Math.PI;let a=0;class h{constructor({id:t,x:e,y:i,r:n,v:s,fill:r="#000"}){this.id=t,this.x=e,this.y=i,this.r=n,this.v=s,this.fill=r,this.links={},this.setBounds()}checkCollision(t,e){(this.bounds.left<=0&&this.v.x<=0||this.bounds.right>=t&&this.v.x>=0)&&(this.v.x*=-1),(this.bounds.top<=0&&this.v.y<=0||this.bounds.bottom>=e&&this.v.y>=0)&&(this.v.y*=-1)}setBounds(){this.bounds={top:this.y-this.r,right:this.x+this.r,bottom:this.y+this.r,left:this.x-this.r}}link(t,e){let i=0;for(a=0;a<t.length;a++){if(t[a].id===this.id)continue;if(t[a].links[this.id])continue;i=o(this.x,this.y,t[a].x,t[a].y);let n=i<e?{from:{x:this.x,y:this.y},to:{x:t[a].x,y:t[a].y}}:null;this.links[t[a].id]={line:n}}}update(t,e,i,n,s){this.checkCollision(e,i),this.x+=this.v.x||0,this.y+=this.v.y||0,this.setBounds(),this.link(n,s),t.beginPath(),t.fillStyle=this.fill,t.arc(this.x,this.y,this.r,0,l),t.fill()}}var f=h;const u=Math.PI;let d=0,c=0,y=[],v=(t,e,i)=>{y=[];let n=24,r=2;for(c=t/5,d=1;d<=n;d++){let n=s.range(.5,r)*i,o=u/12,l=s.from([s.range(o,u/2-o),s.range(u/2+o,u-o),s.range(u+o,1.5*u-o),s.range(1.5*u+o,2*u-o)]);y.push(new f({id:d,x:s.range(0,t),y:s.range(0,e),r:s.range(6,10)*i,v:{x:n*Math.cos(l),y:n*Math.sin(l)}}))}},p=(t,{W:e,H:i})=>{for(t.fillStyle="#F0F0F0",t.fillRect(0,0,e,i),d=0;d<y.length;d++)y[d].update(t,e,i,y,c),Object.values(y[d].links).forEach(({line:e})=>{e&&(t.beginPath(),t.moveTo(e.from.x,e.from.y),t.lineTo(e.to.x,e.to.y),t.strokeStyle="#000",t.stroke())})};self.radId=null,self.canvas=null,onmessage=t=>{let{canvas:e,options:i}=t.data,{W:n,H:s,dpi:r}=i;e&&(self.canvas=e),self.canvas.width=n,self.canvas.height=s;let o=self.canvas.getContext("2d",{alpha:!1,desynchronized:!0});cancelAnimationFrame(self.radId),v(n,s,r),self.rafId=self.update(o,i)},self.update=(...t)=>{self.radId=requestAnimationFrame(()=>update(...t)),p(...t)}}});