(function(t){function e(e){for(var i,r,s=e[0],A=e[1],c=e[2],u=0,d=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(i in A)Object.prototype.hasOwnProperty.call(A,i)&&(t[i]=A[i]);l&&l(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,s=1;s<n.length;s++){var A=n[s];0!==o[A]&&(i=!1)}i&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},o={app:0},a=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/vue-forecast/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],A=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=A;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0084":function(t,e,n){},"125f":function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"ru":{"language":"Предпочитаемый язык","units":"Единицы измерения температуры"},"en":{"language":"Preferred language","units":"Temperature units"}}'),delete t.options._Ctor}},"1a8b":function(t,e,n){"use strict";var i=n("125f"),o=n.n(i);e["default"]=o.a},"1be1":function(t,e,n){t.exports=n.p+"img/pin.3c2d0c05.svg"},2654:function(t,e,n){t.exports=n.p+"img/cloud_rain_night.40f6fa08.svg"},"27e4":function(t,e,n){t.exports=n.p+"img/arrow.d6611044.svg"},"2bc8":function(t,e,n){t.exports=n.p+"img/cloud_rain_alt_night.d718e5f6.svg"},"39cf":function(t,e,n){t.exports=function(){return new Worker(n.p+"766ba57955dfa0dbce3a.worker.js")}},"3ad5":function(t,e){let n=()=>{let t=window.navigator.userAgent.toLowerCase(),e=t.indexOf("msie"),n=t.indexOf("trident"),i=t.indexOf("edge"),o=t.indexOf("firefox"),a=t.indexOf("chrome"),r=t.indexOf("safari"),s=document.getElementsByTagName("html")[0];return"undefined"!==typeof window.orientation&&s.classList.add("mobile-device"),e>0||n>0||i>0?"ie":o>0?"firefox":a>0?"chrome":r>0?"safari":void 0};t.exports=n},"3bac":function(t,e,n){"use strict";var i=n("bba3"),o=n.n(i);e["default"]=o.a},"3ce0":function(t,e,n){var i={"./cloud_day.svg":"967b","./cloud_drizzle_day.svg":"7276","./cloud_drizzle_night.svg":"526a","./cloud_fog_alt_day.svg":"9a4f","./cloud_fog_alt_night.svg":"655a","./cloud_fog_day.svg":"48d7","./cloud_fog_night.svg":"a4a1","./cloud_hail_day.svg":"3e67","./cloud_hail_night.svg":"d1ba","./cloud_lightning_day.svg":"7770","./cloud_lightning_night.svg":"b649","./cloud_night.svg":"b2e0","./cloud_rain_alt_day.svg":"ef70","./cloud_rain_alt_night.svg":"2bc8","./cloud_rain_day.svg":"4c9b","./cloud_rain_night.svg":"2654","./cloud_snow_alt_day.svg":"ffe9","./cloud_snow_alt_night.svg":"4b05","./cloud_snow_day.svg":"d4f7","./cloud_snow_night.svg":"5725","./sun_day.svg":"54af","./sun_night.svg":"5ca2","./tornado_day.svg":"66d8","./tornado_night.svg":"48a3"};function o(t){var e=a(t);return n(e)}function a(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}o.keys=function(){return Object.keys(i)},o.resolve=a,t.exports=o,o.id="3ce0"},"3e67":function(t,e,n){t.exports=n.p+"img/cloud_hail_day.d39dce22.svg"},4451:function(t,e,n){},"48a3":function(t,e,n){t.exports=n.p+"img/tornado_night.b1e3cd0b.svg"},"48d7":function(t,e,n){t.exports=n.p+"img/cloud_fog_day.0912a816.svg"},"4b05":function(t,e,n){t.exports=n.p+"img/cloud_snow_alt_night.29a1adca.svg"},"4c9b":function(t,e,n){t.exports=n.p+"img/cloud_rain_day.0896edbd.svg"},"4de2":function(t,e,n){"use strict";var i=n("0084"),o=n.n(i);o.a},"4e63":function(t,e,n){},"4e6f":function(t,e,n){},"526a":function(t,e,n){t.exports=n.p+"img/cloud_drizzle_night.9a2900f7.svg"},"53ba":function(t,e,n){},"54af":function(t,e,n){t.exports=n.p+"img/sun_day.0403bef5.svg"},"553f":function(t,e,n){"use strict";var i=n("4e6f"),o=n.n(i);o.a},"56d7":function(t,e,n){"use strict";n.r(e);var i=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{attrs:{id:"app"}},[n("background"),n("div",{staticClass:"center"},[n("ui-switch",{staticClass:"units",attrs:{value:"metric"===t.units,labels:["C°","F°"],title:t.$t("units")},nativeOn:{click:function(e){return t.switchUnits(e)}}}),n("search",{ref:"search"}),n("widget")],1),n("ui-switch",{staticClass:"language",attrs:{value:"en"===t.language,labels:["EN","RU"],title:t.$t("language")},nativeOn:{click:function(e){return t.switchLanguage(e)}}})],1)},a=[],r=n("2f62"),s=n("ec8b"),A={forecast:(t,e,n)=>"https://api.openweathermap.org/data/2.5/forecast?lang="+e+"&units="+n+"&appid="+s["open_weather_api"]+`&lat=${t.latitude}&lon=${t.longitude}`,autocomplete:t=>"https://maps.googleapis.com/maps/api/js?&libraries=places&types=(cities)&language="+t+"&key="+s["google_places_api"]},c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("canvas",{attrs:{id:"background"}})},l=[];let u={from:t=>t[~~(Math.random()*t.length)],range:(t=0,e=1)=>Math.random()*(e-t)+t};var d=u;let g=(t,e,n,i)=>Math.hypot(h(n-t),h(i-e));Math.random;const h=Math.abs,f=Math.PI;let p=0,m=0,_=0,v=(t,e=[],{W:n,H:i,threshold:o})=>{for(t.fillStyle="#F0F0F0",t.fillRect(0,0,n,i),p=0;p<e.length;p++){for((e[p].x-e[p].r<0&&e[p].s.x<=0||e[p].x+e[p].r>n&&e[p].s.x>=0)&&(e[p].s.x*=-1),(e[p].y-e[p].r<0&&e[p].s.y<=0||e[p].y+e[p].r>i&&e[p].s.y>=0)&&(e[p].s.y*=-1),m=0;m<e.length;m++)m!==p&&(_=g(e[p].x,e[p].y,e[m].x,e[m].y),_<o&&(t.beginPath(),t.moveTo(e[p].x,e[p].y),t.lineTo(e[m].x,e[m].y),t.strokeStyle=`rgba(0, 0, 0, ${(o-_)/10})`,t.lineWidth=Math.min(o/_,Math.min(e[p].r,e[m].r)),t.stroke()));e[p].x+=e[p].s.x,e[p].y+=e[p].s.y,t.beginPath(),t.fillStyle="#000",t.arc(e[p].x,e[p].y,e[p].r,0,2*f),t.fill()}};var y=v,w=n("39cf"),b=n.n(w);let x=Math.PI;class M{constructor(t,e=window.devicePixelRatio,n=1.5){this.canvas=t,this.dpi=e,this.speed=n,this.init();let i=null;window.onresize=()=>{clearTimeout(i),i=setTimeout(()=>this.init(),150)}}init(){let t=window.innerWidth*this.dpi,e=window.innerHeight*this.dpi,n=~~(window.innerWidth/(window.innerWidth<720?25:80)),i=this.speed,o=t/3,a=this.createDots(n,i,t,e,this.dpi);if(this.worker)this.worker.postMessage({data:a,options:{W:t,H:e,threshold:o}});else if("transferControlToOffscreen"in this.canvas){this.worker=new b.a;let n=this.canvas.transferControlToOffscreen();this.worker.postMessage({canvas:n,data:a,options:{W:t,H:e,threshold:o}},[n])}else{this.canvas.width=t,this.canvas.height=e,cancelAnimationFrame(this.radId);let n=this.canvas.getContext("2d",{alpha:!1,desynchronized:!0});this.update(n,a,{W:t,H:e,threshold:o})}}createDots(t,e,n,i,o){let a=[];a.length=t;for(let r=0;r<a.length;r++){let t=d.range(.5,e)*o,s=x/12,A=d.from([d.range(s,x/2-s),d.range(x/2+s,x-s),d.range(x+s,1.5*x-s),d.range(1.5*x+s,2*x-s)]);a[r]={x:d.range(0,n),y:d.range(0,i),r:d.range(6,15)*o,s:{x:t*Math.cos(A),y:t*Math.sin(A)}}}return a}update(...t){this.radId=requestAnimationFrame(()=>this.update(...t)),y(...t)}}var O=M,k={name:"Background",mounted(){this.reducedMotion||(this.sketch=new O(this.$el,2,2))},computed:{...Object(r["c"])({reducedMotion:t=>t.reducedMotion})}},E=k,S=(n("a9c0"),n("2877")),C=Object(S["a"])(E,c,l,!1,null,"0dcf0850",null),z=C.exports,F=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"search"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],ref:"input",attrs:{type:"text"},domProps:{value:t.query},on:{input:function(e){e.target.composing||(t.query=e.target.value)}}}),i("button",{ref:"button",attrs:{disabled:t.loading,title:t.$t("location")},on:{click:t.locate}},[i("img",{attrs:{src:n("1be1"),role:"presentation"}})])])},T=[],j={name:"Search",data(){return{query:"",loading:!1}},async mounted(){await this.init(),this.locate()},methods:{init(){return new Promise(t=>{let e=document.getElementById("google-maps-api");e&&(document.body.removeChild(e),delete google.maps);let n=document.createElement("script");n.id="google-maps-api",n.onload=()=>{this.autocomplete=new google.maps.places.Autocomplete(this.$refs["input"],{types:["(cities)"]}),this.geocoder=new google.maps.Geocoder,google.maps.event.addListener(this.autocomplete,"place_changed",this.search),t(),this.coords&&this.getCity()},n.src=A.autocomplete(this.language),document.body.appendChild(n)})},async locate(t,e){this.loading=!0;try{let{coords:t}=await new Promise((t,e)=>{navigator.geolocation.getCurrentPosition(t,e)});this.$store.commit("setCoords",{latitude:t.latitude,longitude:t.longitude}),this.getCity()}catch(n){this.$refs["button"].classList.remove("error"),setTimeout(()=>this.$refs["button"].classList.add("error"),100)}this.loading=!1},getCity(){let t={location:new google.maps.LatLng(this.coords.latitude,this.coords.longitude)};this.geocoder.geocode(t,(t,e)=>{if("OK"===!e)return;let n=t.find(t=>t.types.includes("locality"));n&&(document.title=n.formatted_address,this.query=n.formatted_address)})},search(){let t=this.autocomplete.getPlace();if(!t.geometry)return;let e=t.geometry.location.lat(),n=t.geometry.location.lng();this.$store.commit("setCoords",{latitude:e,longitude:n,name:t.formatted_address})}},computed:{...Object(r["c"])({coords:t=>t.coords,language:t=>t.language})}},$=j,L=(n("b53f"),n("7fdf")),P=Object(S["a"])($,F,T,!1,null,"58f8c660",null);"function"===typeof L["default"]&&Object(L["default"])(P);var U=P.exports,I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{class:{visible:t.today},attrs:{id:"widget"}},[t.today?[n("div",{staticClass:"status"},[n("icon",{attrs:{id:t.now.weather[0].id,daytime:t.daytime}}),n("h2",[t._v(t._s(t.description))])],1),n("div",{staticClass:"temperature"},[n("h1",[t._v(t._s(t.temperature.current)+"°")]),n("p",[t._v(" "+t._s(t.temperature.min!==t.temperature.max?t.temperature.min+".."+t.temperature.max+"°":null)+" ")])]),n("ul",t._l(t.info,(function(e,i){return n("li",{key:i,attrs:{title:e.title}},[n("img",{style:e.style,attrs:{src:e.icon,alt:""}}),n("span",{attrs:{"data-units":e.units}},[t._v(t._s(e.value))])])})),0)]:t._e()],2)},q=[],D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"icon"},[t.animation?n("img",{attrs:{src:t.icon,alt:""}}):n("i",{class:t.icon,attrs:{"aria-hidden":""}})])},K=[];const N={200:"cloud_lightning",201:"cloud_lightning",202:"cloud_lightning",210:"cloud_lightning",211:"cloud_lightning",212:"cloud_lightning",221:"cloud_lightning",230:"cloud_lightning",231:"cloud_lightning",232:"cloud_lightning",300:"cloud_drizzle",301:"cloud_drizzle",302:"cloud_drizzle",310:"cloud_drizzle",311:"cloud_drizzle",312:"cloud_drizzle",313:"cloud_drizzle",314:"cloud_drizzle",321:"cloud_drizzle",500:"cloud_rain",501:"cloud_rain",502:"cloud_rain",503:"cloud_rain",504:"cloud_rain",511:"cloud_hail",520:"cloud_rain_alt",521:"cloud_rain_alt",522:"cloud_rain_alt",531:"cloud_rain_alt",600:"cloud_snow",601:"cloud_snow_alt",602:"cloud_snow_alt",611:"cloud_hail",612:"cloud_hail",615:"cloud_hail",616:"cloud_hail",620:"cloud_snow",621:"cloud_snow",622:"cloud_snow_alt",701:"cloud_fog",711:"cloud_fog_alt",721:"cloud_fog",731:"tornado",741:"cloud_fog",751:"cloud_fog_alt",761:"cloud_fog_alt",762:"cloud_fog_alt",771:"cloud_fog_alt",781:"tornado",800:"sun",801:"cloud",802:"cloud",803:"cloud",804:"cloud"};var B=N,Q={name:"Icon",props:{id:{type:Number},daytime:{type:String}},computed:{...Object(r["c"])({reducedMotion:t=>t.reducedMotion,browser:t=>t.browser}),animation(){return!this.reducedMotion&&"chrome"===this.browser},icon(){if(!this.animation)return`wi wi-owm-${this.daytime}-${this.id}`;try{return n("3ce0")(`./${B[this.id]}_${this.daytime}.svg`)}catch{return console.log(`no icon for id ${this.now.weather[0].id}: ${this.now.weather[0].main}`),n("5947")(`./sun_${this.daytime}.svg`)}}}},W=Q,J=(n("4de2"),Object(S["a"])(W,D,K,!1,null,"a7efa0b6",null)),V=J.exports;let Y=window.matchMedia("(prefers-color-scheme: dark)").matches?"#FFF":"#000",H=(t,e)=>{let n=document.createElement("canvas");n.width=128,n.height=128;let i=n.getContext("2d");i.textBaseline="middle",i.textAlign="center",i.font=e,i.clearRect(0,0,n.width,n.height),i.fillStyle=Y,i.fillText(t,n.width/2,n.height/2,n.width);let o=n.toDataURL("image/png"),a=document.querySelector('link[rel*="icon"]');a.type="image/x-icon",a.href=o};var R=H,Z={name:"Widget",components:{Icon:V},computed:{...Object(r["c"])({city:t=>t.city,units:t=>t.units}),daytime(){let t=Date.now();return t>1e3*this.city.sunrise&&t<1e3*this.city.sunset?"day":"night"},...Object(r["b"])({today:"current"}),now(){return this.today[0]},description(){return this.now.weather[0].description},temperature(){let t=Math.round(this.now.main.temp);R(t+"°","bold 128px jura");let{min:e,max:n}=this.today.reduce((t,e)=>({min:[...t.min,e.main.temp_min],max:[...t.max,e.main.temp_max]}),{min:[],max:[]});return{current:Math.round(this.now.main.temp),min:Math.round(Math.min(...e)),max:Math.round(Math.max(...n))}},info(){return{humidity:{value:this.now.main.humidity,units:"%",icon:n("f5e0"),title:this.$t("humidity")},wind:{value:Math.round(this.now.wind.speed),units:this.$t("wind.units."+this.units),icon:n("27e4"),style:{transform:`rotate(${45*Math.round(this.now.wind.deg%360/45)}deg)`},title:this.$t("wind.title")},pressure:{value:Math.round(this.now.main.pressure/1.33322368),units:this.$t("pressure.units"),icon:n("823b"),title:this.$t("pressure.title")},cloudiness:{value:this.now.clouds.all,units:"%",icon:n("9853"),title:this.$t("cloudiness")}}}}},G=Z,X=(n("7392"),n("3bac")),tt=Object(S["a"])(G,I,q,!1,null,"f69d0f90",null);"function"===typeof X["default"]&&Object(X["default"])(tt);var et=tt.exports,nt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"ui-switch",class:{active:t.innerValue},attrs:{title:t.title},on:{click:t.toggle}},[i("span",[t._v(t._s(t.labels[0]))]),i("span",[t._v(t._s(t.labels[1]))]),i("audio",{ref:"audio",attrs:{src:n("c94c"),preload:"auto",hidden:""}})])},it=[],ot={name:"uiSwitch",props:{value:{type:Boolean,default:!1},labels:{type:Array,default:()=>[]},title:{type:String}},data(){return{innerValue:this.value}},methods:{toggle(){this.innerValue=!this.innerValue,this.$refs["audio"].currentTime=0,this.$refs["audio"].play()}},watch:{value(t){this.innerValue=t},innerValue(t){this.$emit("input",t)}}},at=ot,rt=(n("e810"),Object(S["a"])(at,nt,it,!1,null,"184e8d69",null)),st=rt.exports,At={name:"App",components:{Background:z,Search:U,Widget:et,uiSwitch:st},methods:{async getForecast(t){try{let e=await fetch(A.forecast(t,this.language,this.units)),n=await e.json();this.$store.commit("setForecast",n)}catch(e){console.log(e)}},switchUnits(){this.$store.commit("setUnits","metric"===this.units?"imperial":"metric"),this.getForecast(this.coords)},async switchLanguage(){this.$store.commit("setLanguage","en"===this.language?"ru":"en"),await this.$refs["search"].init(),this.getForecast(this.coords)}},computed:{...Object(r["c"])({language:t=>t.language,coords:t=>t.coords,units:t=>t.units})},watch:{coords:{immediate:!0,handler(t){t&&this.getForecast(t)}}}},ct=At,lt=(n("5c0b"),n("553f"),n("1a8b")),ut=Object(S["a"])(ct,o,a,!1,null,null,null);"function"===typeof lt["default"]&&Object(lt["default"])(ut);var dt=ut.exports,gt=n("a925");i["a"].use(gt["a"]);let ht=["en","ru"],ft=ht.find(t=>t===localStorage.getItem("language"))||ht[0];document.documentElement.lang!==ft&&(document.documentElement.lang=ft);const pt=new gt["a"]({locale:ft,fallbackLocale:ht[0],silentFallbackWarn:!0});var mt=pt;let _t=t=>{let e=new Date(t);return`${e.getUTCDate()}.${e.getUTCMonth()}.${e.getUTCFullYear()}`};var vt=_t,yt=n("3ad5"),wt=n.n(yt);i["a"].use(r["a"]);const bt=wt()(),xt=window.matchMedia("(prefers-reduced-motion: reduce)").matches;{let t=document.createElement("link");t.rel="stylesheet",t.href="weather-icons/weather-icons.css",document.head.appendChild(t)}let Mt=null;try{let{latitude:t,longitude:e}=JSON.parse(localStorage.getItem("coords"))||{};t&&e&&(Mt={latitude:t,longitude:e})}catch(Et){console.warn("Error reading localStorage:",Et)}let Ot=["metric","imperial"].find(t=>t===localStorage.getItem("units"))||"metric";var kt=new r["a"].Store({state:{browser:bt,reducedMotion:xt,coords:Mt,language:mt.locale,units:Ot,city:{},forecast:{}},mutations:{setLanguage:(t,e)=>{t.language=e,mt.locale=t.language,document.documentElement.lang=t.language,localStorage.setItem("language",t.language)},setCoords:(t,e)=>{t.coords=e,document.title=t.coords.name,localStorage.setItem("coords",JSON.stringify({latitude:t.coords.latitude,longitude:t.coords.longitude}))},setUnits:(t,e)=>{t.units=e,localStorage.setItem("units",t.units)},setForecast:(t,e)=>{t.city=e.city,t.forecast=(e.list||[]).reduce((t,e)=>{let n=vt(1e3*e.dt);return(t[n]=t[n]||[]).push(e),t},{})}},getters:{current:t=>t.forecast[vt(Date.now())]}});i["a"].config.productionTip=!1,new i["a"]({store:kt,i18n:mt,render:function(t){return t(dt)}}).$mount("#app")},5725:function(t,e,n){t.exports=n.p+"img/cloud_snow_night.0e811a86.svg"},5947:function(t,e,n){var i={"./sun_day.svg":"54af","./sun_night.svg":"5ca2"};function o(t){var e=a(t);return n(e)}function a(t){if(!n.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}o.keys=function(){return Object.keys(i)},o.resolve=a,t.exports=o,o.id="5947"},"5c0b":function(t,e,n){"use strict";var i=n("9c0c"),o=n.n(i);o.a},"5ca2":function(t,e,n){t.exports=n.p+"img/sun_night.5ce13094.svg"},"655a":function(t,e,n){t.exports=n.p+"img/cloud_fog_alt_night.c4dd0bbf.svg"},"66d8":function(t,e,n){t.exports=n.p+"img/tornado_day.b1e3cd0b.svg"},7276:function(t,e,n){t.exports=n.p+"img/cloud_drizzle_day.29c92232.svg"},7392:function(t,e,n){"use strict";var i=n("4451"),o=n.n(i);o.a},7770:function(t,e,n){t.exports=n.p+"img/cloud_lightning_day.47fbb71d.svg"},"7fdf":function(t,e,n){"use strict";var i=n("f230"),o=n.n(i);e["default"]=o.a},"823b":function(t,e,n){t.exports=n.p+"img/thermometer.f498dc85.svg"},"967b":function(t,e,n){t.exports=n.p+"img/cloud_day.3c2fbad8.svg"},9853:function(t,e,n){t.exports=n.p+"img/cloud.1228a313.svg"},"9a4f":function(t,e,n){t.exports=n.p+"img/cloud_fog_alt_day.fdb32528.svg"},"9c0c":function(t,e,n){},a463:function(t,e,n){},a4a1:function(t,e,n){t.exports=n.p+"img/cloud_fog_night.aac68235.svg"},a9c0:function(t,e,n){"use strict";var i=n("4e63"),o=n.n(i);o.a},b2e0:function(t,e,n){t.exports=n.p+"img/cloud_night.c8b0bd7c.svg"},b53f:function(t,e,n){"use strict";var i=n("53ba"),o=n.n(i);o.a},b649:function(t,e,n){t.exports=n.p+"img/cloud_lightning_night.009cf303.svg"},bba3:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"ru":{"humidity":"Влажность","wind":{"title":"Направление и скорость ветра","units":{"metric":"м/с","imperial":"mph"}},"pressure":{"title":"Давление","units":"мм. рт. ст."},"cloudiness":"Облачность"},"en":{"humidity":"Humidity","wind":{"title":"Wind direction and speed","units":{"metric":"m/s","imperial":"mph"}},"pressure":{"title":"Pressure","units":"mmHg"},"cloudiness":"Cloudiness"}}'),delete t.options._Ctor}},c94c:function(t,e){t.exports="data:audio/mpeg;base64,SUQzAwAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+7TAAAAUZUkP1MeAA/ZA67cfMAOqlnMRESpqmSYhgmA9cAgSCYeNMGDmnZmrKhCzrhKyY/yDiZo9TlvHrLmzD4ByCwGGAQAJg/IrGz7gPFe/vinve+Yb+PInDQUEE5EMZKXfv9wEPV8fEB5Sn9IFMsavc2A0zrc4DyJm795E1m+/7vIms3////97797//3venzfeKUu8eavvFKZeRNZ9IFMvIjlAhdw//WGFh+n/EZ8oCHy75d4P7Ox1JkoBEIkkhFotGIrsW86ScoglqFksIcLQpB2mGeZmk6ISJ0JzIwiQrxFg1cThgRQnRoIieRGIth4qRBMQEDbC6Q4XdBFNMkAuAGRNifAAGHyhqkWpC9PKZXDVBUNw+QU0WwLXQ+EFghdv7BcILAREMBi3gdUg2LDbwsyGqQ5ADGYcwGzybd8tg3eLOE4CeAAABggLhAy0YALgBMoEQBicBYYyVvp4aoLQYkIiQcxNy4TYhcZ0QRMQ+UYwqjPC3kVFt0Lf4sZPm8gAhQZAZNI0EpkHNxCInVkNJoiw1RjiDEWY2V/////0EGQQQT63bf7f/uTKRUb0kSTfFQi0BLEAAAXBAACQVFOmE1A1E0EzKqUSiccstH8ZBPRzuxYE6Pp6Rgoy6E5NlNCwnSSKA3xglrL+tTi68XFYLAEDQHDcpaJYl1LGqXkVvINO45S848z6XOTAbLmfsqZdGX3VtUBW+1EEkVymM+MeZCz5r0ol1yVSymTwjjWC6SjRUNB8HQqSdYNH52X/+7TAQAAdiXdL+PwAAw0vJfee8AEwa3ZtpZLqN+qrBHeykDOuNUg53S8yYTPnLkT9UH00AUtPda2zyKOArp4XaL3LVdmD3IpKeM09JegK/9+npqX6Kjv0z6Nkfijg24+3tyZdKn1pG7Rm9GflL6xqmpvuU1ylpbtz7t29TX7yotquJKSJKJJKcZPyaHQHUAvFjiq1WwWp/WaeSM3SMJun4hTNGxBbky6VKuV0hzKWiFH83rlQNJBVlPSrksLScLtcFyeop/HMk5VclTKsbqNfJ3DUhyJqtlQMaMxRpT9nbx6UJejBLRz79x05KHUVcrNmW7VDXSFGEUyqP5jerotw/lckxbk3EV0rDElYX7Aq2XUFFMbKnobcly4C1QD+Ub5bVLKfpolxaHbNKrW7Ku3Mh01ma1p4ma4npu0KNX31b+8WsHXA/2mu7qVBUIQBg7DYAwpMI5auta+s46dJ0RldlEDYah/EUvK3fdMg6FYwA8PJ4feth7lxykf5hRKcPIlJgFqLiXZD3OkrxmYad8fx6qBCmGaFO9uywr6gti0cq+sKKDTds0iwr1tuK+YWtwZoMR9BpbFs6tnVq5puts6/+N1hXijSqLHIn6KY76gkTOKO/v/3dyX/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7TAfYA0vR0ZJjHtiAAAJcAAAAT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7TAwAA/8AEuAAAAIK4AJcAAAAT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="},d1ba:function(t,e,n){t.exports=n.p+"img/cloud_hail_night.6b2a7671.svg"},d4f7:function(t,e,n){t.exports=n.p+"img/cloud_snow_day.93bfbcd5.svg"},e810:function(t,e,n){"use strict";var i=n("a463"),o=n.n(i);o.a},ec8b:function(t,e){t.exports={open_weather_api:"2c3411e04634c1650d366b2b58e053bc",google_places_api:"AIzaSyAfPiD9Aa3AQ5a4oMDahOTTqPyZ8tW2BlY"}},ef70:function(t,e,n){t.exports=n.p+"img/cloud_rain_alt_day.6aff9330.svg"},f230:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"ru":{"location":"Ваше расположение"},"en":{"location":"Your location"}}'),delete t.options._Ctor}},f5e0:function(t,e,n){t.exports=n.p+"img/raindrop.41658d0d.svg"},ffe9:function(t,e,n){t.exports=n.p+"img/cloud_snow_alt_day.93af63a7.svg"}});