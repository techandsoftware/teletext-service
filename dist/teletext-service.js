// SPDX-FileCopyrightText: (c) 2021 Tech and Software Ltd.
// SPDX-FileCopyrightText: (c) 2017 dosaygo
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0
// LicenseRef-uk.ltd.TechAndSoftware-1.0 refers to https://tech-and-software.ltd.uk/LICENSES/LicenseRef-uk.ltd.TechAndSoftware-1.0.txt
const t$1=new Set(["Uint1Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","UInt32Array","Float32Array","Float64Array"]),s$1=Uint8Array,i$1=Symbol();class e$1{constructor(t,{length:i=null,buffer:e=null,byteOffset:r=0,byteLength:n=null}={}){let h;e?i=8*(n||e.byteLength):i||(i=0);const _=s$1.BYTES_PER_ELEMENT,o=8*_,a=o-1,l=(t=>{let s=0;for(;t>>=1;)s++;return s})(o),A=Math.max(1,i+a>>l);e?h=new s$1(e,r,A):(e=new ArrayBuffer(_*A),h=new s$1(e)),Object.assign(this,{buffer:e,byteOffset:r,length:i,wordSize:o,wordCount:A,wordSizeMask:a,wordSizeShift:l,internal:h});}toArray(){const t=new Uint8Array(this.length);for(let s=0;s<this.wordCount;s++){const i=this.internal[s];for(let e=s*this.wordSize;e<(s+1)*this.wordSize;e++)t[e]=this.getBit(e,i);}return t}getBit(t,s){if(!(t>=this.length))return null==s&&(s=this.internal[t>>this.wordSizeShift]),s>>(t&this.wordSizeMask)&1}setBit(t,s){if(t>=this.length)return;const i=t>>this.wordSizeShift,e=t&this.wordSizeMask,r=this.internal[i];let n=r;return n|=s<<e,n&=~((1&~s)<<e),r!==n&&(this.internal[i]=n),s}}class r{constructor(t,s=0,r=null){let h,l,A;switch(a(t)){case"Number":h=t=~~t,l=new e$1(this,{length:h});break;case"ArrayBuffer":l=new e$1(this,{buffer:t,byteOffset:s,byteLength:r});break;case"Undefined":case"Null":case"RegExp":case"Infinity":h=0,l=new e$1(this,{length:h});break;case"Array":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"UInt32Array":case"Float32Array":case"Float64Array":case"Uint1Array":case"Object":default:A=_(t),l=new e$1(this,{length:A.length}),A.forEach(((t,s)=>l.setBit(s,o(t))));}return this[i$1]=l,new n(this)}static get BYTES_PER_ELEMENT(){return .125}static get name(){return "Uint1Array"}static get length(){return 0}static get[Symbol.species](){return this}static[Symbol.hasInstance](t){return t.__proto__=this}static from(t){const s=_(t);return new r(s)}static of(...t){return r.from(t)}get buffer(){return this[i$1].buffer}get byteLength(){return this.length+7>>3}get byteOffset(){return this[i$1].byteOffset}get length(){return this[i$1].length}get[Symbol.toStringTag](){return "Uint1Array"}copyWithin(t,s=0,i=this.length){if(!Number.isInteger(t))return this;const e=new Uint8Array(i-s);for(let t=s;t<i;t++)e[t-s]=this[t];return this.set(e,t),this}entries(){return this[i$1].toArray().entries()}every(...t){return this[i$1].toArray().every(...t)}fill(t,s=0,i=this.length){for(let e=s;e<i;e++)this[e]=t;return this}filter(...t){return new r(this[i$1].toArray().filter(...t))}find(...t){return this[i$1].toArray().find(...t)}findIndex(...t){return this[i$1].toArray().findIndex(...t)}forEach(...t){this[i$1].toArray().forEach(...t);}includes(...t){return this[i$1].toArray().includes(...t)}indexOf(...t){return this[i$1].toArray().indexOf(...t)}join(...t){return this[i$1].toArray().join(...t)}keys(...t){return this[i$1].toArray().keys(...t)}lastIndexOf(...t){return this[i$1].toArray().lastIndexOf(...t)}map(...t){return new r(this[i$1].toArray().map(...t))}reduce(...t){return this[i$1].toArray().reduce(...t)}reduceRight(...t){return this[i$1].toArray().reduceRight(...t)}reverse(){const t=this[i$1].toArray().reverse();return this.set(t),this}set(s,i=0){if(!Number.isInteger(i))return;const e=a(s);if("Array"!==e&&!t$1.has(e))return;const r=Math.min(s.length+i,this.length);s=s.map((t=>o(t)));for(let t=i;t<r;t++)this[t]=s[t-i];}slice(...t){return new r(this[i$1].toArray().slice(...t))}sort(...t){const s=this[i$1].toArray().sort(...t);return this.set(s),this}subarray(...t){return new r(this[i$1].toArray().subarray(...t))}values(...t){return this[i$1].toArray().values(...t)}toLocaleString(...t){return Array.from(this).toLocaleString()}toString(){return ""+Array.from(this)}[Symbol.iterator](){return this[i$1].toArray()[Symbol.iterator]()}valueOf(){return this}toJSON(){return Array.from(this)}}function n(t){const s=t[i$1];return new Proxy(t,{get(i,e,r){const n="string"==typeof e?parseInt(e):e;return Number.isInteger(n)?s.getBit(n):Reflect.get(t,e)},set(i,e,r,n){const h="string"==typeof e?parseInt(e):e;return Number.isInteger(h)?(s.setBit(h,o(r)),!0):Reflect.set(t,e,r)}})}const h=/\[object (\w+)]/;function _(t){const s=[];for(let i of t){const t=o(i);s.push(t);}return s}function o(t){return "number"!=typeof t||Number.isNaN(t)?new Boolean(t).valueOf():t%2}function a(t){const s=t&&t.constructor?t.constructor.name:null,i=h.exec(Object.prototype.toString.call(t))[1];return i!==s&&s?s:i}class l{static tt(t,s){const i=(t=t.replace(/-/g,"+").replace(/_/g,"/")).length%4;if(i){if(1===i)throw Error("Utils.decodeBase64URLEncoded E16: Input base64url string is the wrong length to determine padding");t+=Array(5-i).join("=");}const e=[...s(t)].map((t=>c(t))),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),(t=>{const s=[];for(let i=0;i<25;i++){const e=[];for(let s=0;s<40;s++){let r=6,n=0;const h=280*i+7*s;for(let s=h;s<h+7;s++)n+=t[s]*Math.pow(2,r),r--;e.push(String.fromCharCode(n));}s.push(e.join(""));}return s})(new r(n))}static st(t){const s=[];let i=!1;for(const e of [...t]){const t=e.charCodeAt(0);27==t?i=!0:t>=128?s.push(String.fromCharCode(t-128)):i?(s.push(String.fromCharCode(t-64)),i=!1):s.push(e);}return s}static it(t){const s=[],i=/^OL,(\d{1,2}),(.+)/;for(const e of [...t]){const t=e.match(i);null!=t&&(s[t[1]]=l.st(t[2]));}return s}static et(t){return -1!="ﻰﺋﺊﭼﭽﭘﭙﮔﻎﻼﻬﻪﻊﺔﺒﺘﺎﺑﺗﺛﺟﺣﺧﺳﺷﺻﺿﻃﻇﻋﻏﺜﺠﺤﺨـﻓﻗﻛﻟﻣﻧﻫﻰﻳﻴﻌﻐﻔﻘﻠﻤﻨ".indexOf(t)}}const A={};function c(t){if(t in A)return A[t];const s=[...t.charCodeAt(0).toString(2).padStart(8,"0")].reverse();return A[t]=Number.parseInt(s.join(""),2),A[t]}const g={ENGINEERING:"QIECBAgQIIcWLGg2EDdy3QIKnXKgYtUE7f2QA2TB0wYr2DECAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYMS54fzJmix4-YCDToOLOjyZ0WLSkzo6AkcGHuZUcRHlB4dgyAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAWDP9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YNCho9zImSoAqBGoAp0FUy8-iChhz5UCA4MPEuZYgTAFyAFg1_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2DYCAAoACACeQHkBdYTJlixIkSKlSJEoUKIEBQABAAQAEABYN_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39g4AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGDn9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YsAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIBix_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2LICAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYs_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39i0AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGLX9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_Ytq-jT0yg7OXZs39w0Pzh3Ao_LLl3BZuHPl3dMIGllyBIWzrlLmkKJGTSJUycsoUqlZJYtXLzLBiyZlWjVs3IuHLp2UePXz9AgQokaBIlTJ0ChSqVoFi1cvQMGLJmgaNWzdA4cunaB49fP0ECDChoIkWNHQSJMqWgmTZ09BQo0qaCpVrV0FizatoLl29fQYMOLGgyZc2dBo06taDZt3b0HDjy5oOnXt3QePPr2g-ff38pgw4sZHJlzZyujTq1ktm3dvNcOPLmW6de3cn48-vZf59_fwZiHv3Y8uHYIjbMPPQDVCxcLf4E0-mXDk8mI-_dlFCn5a9_DKr6q-qvqr6q-qvqr6AFS390DJoGQKr6q-qvqr6q-qvqr6o",ADVERT:"QIECBAgQIJ9KDDmRUDZi3QU8PRk1QQeHIHDaIEDJiwYumDACdDwcnbLy6aeeXbl3dECBAgQIECBAgQIECBAgQIHwZkvcoCx0og8LNGjYwQPEjzpoWaNjBA82YHnTQwabEjTpowPEiBAgLHSiBbs1atjFA9SPe2pZqQNUHX1qQatSlrqQNW-5UsaIECAsdKIFidUqQJUCVAlVKlipchQJUCJanVIEqpAlSqlC5CgQIEB0ogQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQHSKBAgQYEH7ogQaGCApw_fEm54R3PCm5JuSKHoFUEVIECAudIoECBB6-___TB-_v0JTU_WqkZHFyQKHmjYgYBECpAqQIC50igQIEH___3_-iD__6FFSAig-IP6JCg26lzRr3avEgFUgLnSKBAg1f1X9lv_9NSBAgI6G-HX1V_EqBUqQJUqXBzagVSAudIoECD9_Qa2qL__6IMDzoq682qdAgQIEARAgQIECBAgVIC50igQIP_9AiaoFX__0VfV_1kjQIECBAgQBECBAgAoECpAgLnSKBBq__0CBCgQa___oreokCBAgQIECBAgQBECBAgVIECAudIoEHr__QIECBAg3_36FAgQIECBAgQIECAIgQIFSBAgQIAZ0igQf_7dAgKIECAinKf9bTR9QIv-N6i_ofzNagQIECBAgJnSKDR__tUBRAoe6NiBB_XYf_rqg_q2iD-gRb-iBAgQIECAmdIoNX_-1QFECDrq9IMH9h664P_D-w34P7DZ4ToECBAgQICZ0ig___5TQ8SfEHzQ82MPCzpoedEHzA82MPjDQ0-LNDSk0JnSOD___lNXVh_Qf9T3cx_oP-prqa_1S3Y0_q_zX-s1NdTUmdI6v_9-U1NUH9B_1NdTX-g_6mvpL_wMNTX-g1Nf6DAz1tSZ0j-_v0JREjQokaFEhRIUSNCiRoUCNAjRoEaBEhRo0CNGgBnSP9OgQFECCNPpIIVKfDkVaUWmggzoiCFPny5M6PTQIECAGdIjUAGlJnR0DBu5coGrFm0YMEE-kgpxYqChBjxUDNuwQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy92np007s6AFSy9tOXvzQA7O_ryQTd-7L5DQVtpBJ3ZMvg",UK:"QIECBAgQIIcWLGg2EDFy2QIJu_cgZNUETLjQA2TN0xYr2DAodJIECBAgQIEGDB4_PUCBAgQIECBAgQIECBAgQIEANkvaMih0kgQIECDA1Qfv__OgQYGCBAgQIECBAgQIECBAgQIECBAgKHSSBAgQIH6FR-__-v7___oECBAgQIEAORPmxUE6LXpoECAodJIECBAoQKum7______9-gQIECBAgQA82_Zs39-aB8-QIAh0kgQIECBAgSev_____v06BAgQIECBAgQIECBAgQIECBAgKHSSBAgQIECBR00____-_w9GCBAgQIECBAgQIECBAgQIECAodJIECBAgQIECD8rx________ECBAgQIECBAgQIECBAgQICh0kgQIECBAgQLETRlv_______6oECBAgQIECBAgQIECBAgKHSyBAgQIHGQlwYIEH_-_x_____9-dECBAgQIECBAgQIECAIdLIECDAmJbfz_-0RJ0qBV________7sECBAgQIECBAgQIAh0sgQIMzAl-__fX5Sg0JECvX______586IECBAgQIECBAgCHSyBAgwJiW9OjX_0qBAgQIEX________-l8fPjBAgQIECAIdLIEHBYhQIECBQxQICWDhg5fv____________tUCBAgQIAh0sgzIECBAgQIEGlAgQEtP_______________-lQIECBAgCHSyBUwQIECBAgQakCBASQqv_____________-6FAgQIECAIdLIECJygQIECBAgaoEBJBg______________5-OiBAgQIAh0sgQKGKBAgQIEHBKgJIMH7____8v__________QoECBAgCHSyBRmQIECBA4RoECAkgVoVaNel________r16FAgQIECAIdLINCFAgwOEyBAgQICSBAgQePn7___r06RAgQIECBAgQIAh0sgQLeKxCgQIECBAgJIECDR__v0aNGhQIECBAgQIECBAgCHSSBAgQIECBAgQIECBAgQYP3_-1QIECBAgQIECBAgQIECAIdJIECBAgQIECBAgQIECBB6boUSBAgQIECBAgQIECBAgQIAh0kgQIECBAgQIECBAgQIFStAgQIECBAgQIECBAgQIECBAgAzsvjognZe_MFIy4cmzTuy8wdTfwQU-G_l0DVKy-lhyad6A",SPLASH:"QIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECAsaMIEGDx8YIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQICxowg0N2bdmgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgLGjCBFvz9_6BAZQIECBAgQIECAig0NECBAgQIECBAgQIECAsaMcOD5tjyoGCBAgQIECBAgQICLhCgQIECBAgQIECBAgQICxowoTod79ArSEcHBAgQIECBAg0ITKBAgQcGCBAgQIECBAgLGjCBBgXIUCAyRXmlLBAgQIECBuZ4fPn___aoECBAgQIECBAaQIECBAgQIEBFAgQaTPDh8-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmKCplx6ECZBT35unfDyyoJnTIuQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA"},u="http://www.w3.org/2000/svg";let C,f,I=0;class E{constructor(){}rt(){return this.nt}ht(){this.nt=null;}_t(t,s){if("object"==typeof t)for(const s in t)null==t[s]?this.nt.removeAttribute(s):this.nt.setAttribute(s,t[s]);else {if(void 0===s)return this.nt.getAttribute(t);null==s?this.nt.removeAttribute(t):this.nt.setAttribute(t,s);}return this}ot(t){if(!this.at(t)){const s=this.lt();s.push(t),this.nt.setAttribute("class",s.join(" "));}return this}at(t){return -1!==this.lt().indexOf(t)}lt(){const t=this.nt.getAttribute("class");return null==t?[]:t.split(" ")}At(t){return this.at(t)&&this.nt.setAttribute("class",this.lt().filter((s=>s!==t)).join(" ")),this}ct(t){return this.at(t)?this.At(t):this.ot(t),this}gt(t,s){if("object"==typeof t)for(const s in t)null==t[s]?delete this.nt.dataset[s]:this.nt.dataset[s]=t[s];else {if(void 0===s)return this.nt.dataset[t];null==s?delete this.nt.dataset[t]:this.nt.dataset[t]=s;}return this}}class B extends E{constructor(t){return super(),C=t,f=C.document,this.nt=f.createElementNS(u,"svg"),this.nt.setAttribute("xmlns",u),this}ut(t){const s=f.querySelector(t);if(!s)throw Error("@techandsoftware/teletext: E117: addTo failed to match provided selector");return s.appendChild(this.nt),this}Ct(t){return this.nt.setAttribute("viewBox",t),this}ft(t,s){return this.nt.setAttribute("width",t),this.nt.setAttribute("height",s),this}It(t){const s=f.createElementNS(u,"style");return s.append(t),this.nt.append(s),this}Et(){const t=new d;return this.nt.append(t.rt()),t}Bt(){return this.nt.clientWidth}dt(){return this.nt.clientHeight}Qt(t){const s=new b(t);return this.nt.append(s.rt()),s}}class d extends E{constructor(){return super(),this.nt=f.createElementNS(u,"g"),this.yt=[],this}Et(){const t=new d;return this.nt.append(t.rt()),this.yt.push(t),t}bt(t){const s=new p(t);return this.nt.append(s.rt()),this.yt.push(s),s}wt(){const t=new m;return this.nt.append(t.rt()),t}St(t,s){const i=new S(t,s);return this.nt.append(i.rt()),this.yt.push(i),i}xt(){return this.yt[this.yt.length-1]}Ut(){return this.yt}vt(t){return this.nt.setAttribute("clip-path",`url("#${t.rt().id}")`),this}kt(){return this.nt.removeAttribute("clip-path"),this}Rt(){this.nt.parentNode&&this.nt.parentNode.removeChild(this.nt),this.nt=null,this.yt.forEach((t=>t.ht())),this.yt=[];}Ft(t,s,i,e){const r=new x(t,s,i,e);return this.nt.append(r.rt()),this.yt.push(r),r}Lt(t){const s=new y(t);return this.nt.append(s.rt()),this.yt.push(s),s}Dt(t,s){const i=new Q(t,s);return this.nt.append(i.rt()),this.yt.push(i),i}}class Q extends E{constructor(t,s){return super(),this.nt=f.createElementNS(u,"image"),this.nt.setAttribute("width",parseInt(t)),this.nt.setAttribute("height",parseInt(s)),this}attr(...t){return this._t(...t)}}class y extends E{constructor(t){return super(),this.nt=f.createElementNS(u,"use"),this.nt.setAttribute("href","#"+t),this}Nt(t){return this.nt.setAttribute("fill",t),this}Gt(t,s){return this.nt.setAttribute("x",t),this.nt.setAttribute("y",s),this}}class b extends E{constructor(t){return super(),this.nt=f.createElementNS(u,"symbol"),this.nt.setAttribute("id",t),this}St(t,s){const i=new S(t,s);return this.nt.append(i.rt()),i}}class p extends E{constructor(t){return super(),this.nt=f.createElementNS(u,"text"),this.nt.append(t),this}bt(t){return this.nt.textContent=t,this}Nt(t){return this.nt.setAttribute("fill",t),this}}class m extends E{constructor(){return super(),this.nt=f.createElementNS(u,"defs"),this}Ht(){const t=new w;return this.nt.append(t.rt()),t}jt(t){return [...this.nt.querySelectorAll(t)].map(U)}St(t,s){const i=new S(t,s);return this.nt.append(i.rt()),i}}class w extends E{constructor(){return super(),this.nt=f.createElementNS(u,"clipPath"),this.nt.setAttribute("id","clipPath-"+I),I++,this}Ut(){return [...this.nt.children].map(U)}Ot(t){this.nt.appendChild(t.rt());}}class S extends E{constructor(t,s){if(super(),t instanceof C.SVGElement)return this.nt=t,this;const i=t;return this.nt=f.createElementNS(u,"rect"),this.nt.setAttribute("width",parseInt(i)),this.nt.setAttribute("height",parseInt(s)),this}Nt(t){return this.nt.setAttribute("fill",t),this}Gt(t,s){return this.nt.setAttribute("x",t),this.nt.setAttribute("y",s),this}Bt(t){return void 0===t?parseInt(this.nt.getAttribute("width")):(this.nt.setAttribute("width",parseInt(t)),this)}dt(t){return void 0===t?parseInt(this.nt.getAttribute("height")):(this.nt.setAttribute("height",parseInt(t)),this)}Rt(){this.nt.parentNode&&this.nt.parentNode.removeChild(this.nt),this.nt=null;}}class x extends E{constructor(t,s,i,e){return super(),this.nt=f.createElementNS(u,"line"),this.nt.setAttribute("x1",t),this.nt.setAttribute("y1",s),this.nt.setAttribute("x2",i),this.nt.setAttribute("y2",e),this}}function U(t){let s;switch(t.constructor.name){case"SVGRectElement":s=new S(t);break;default:throw Error("SVG:wrapSVGElement Unable to wrap SVG element of type "+t.constructor.name)}return s}const v={BLACK:Symbol(),RED:Symbol(),GREEN:Symbol(),YELLOW:Symbol(),BLUE:Symbol(),MAGENTA:Symbol(),CYAN:Symbol(),WHITE:Symbol()};Object.freeze(v);const k={Pt:Symbol(),Mt:Symbol(),qt:Symbol(),Tt:Symbol()};Object.freeze(k);const R={zt:Symbol(),Jt:Symbol(),Yt:Symbol(),Vt:Symbol()};Object.freeze(R);class F{static charFromTextColour(t){if(t in j)return j[t];throw Error("Attributes.charFromTextColour: bad colour: "+t)}static charFromGraphicColour(t){if(t in O)return O[t];throw Error("Attributes.charFromGraphicColour: bad colour")}static charFromAttribute(t){if(t in P)return P[t];throw Error("Attributes.charFromAttribute: bad attribute")}}function L(t){return D[t]}F.TEXT_COLOUR=k.Pt,F.MOSAIC_COLOUR=Symbol(),F.NEW_BACKGROUND=Symbol(),F.BLACK_BACKGROUND=Symbol(),F.CONTIGUOUS_GRAPHICS=k.Mt,F.SEPARATED_GRAPHICS=k.qt,F.ESC=Symbol(),F.FLASH=Symbol(),F.STEADY=Symbol(),F.NORMAL_SIZE=R.zt,F.DOUBLE_HEIGHT=R.Jt,F.DOUBLE_WIDTH=R.Yt,F.DOUBLE_SIZE=R.Vt,F.CONCEAL=Symbol(),F.HOLD_MOSAICS=Symbol(),F.RELEASE_MOSAICS=Symbol(),F.START_BOX=Symbol(),F.END_BOX=Symbol(),F.Kt=Symbol();const D={[v.BLACK]:"#000",[v.RED]:"#f00",[v.GREEN]:"#0f0",[v.YELLOW]:"#ff0",[v.BLUE]:"#00f",[v.MAGENTA]:"#f0f",[v.CYAN]:"#0ff",[v.WHITE]:"#fff"};Object.freeze(D);const N={"\0":v.BLACK,"":v.RED,"":v.GREEN,"":v.YELLOW,"":v.BLUE,"":v.MAGENTA,"":v.CYAN,"":v.WHITE};Object.freeze(N);const G={"":v.BLACK,"":v.RED,"":v.GREEN,"":v.YELLOW,"":v.BLUE,"":v.MAGENTA,"":v.CYAN,"":v.WHITE};Object.freeze(G);const H={"\b":F.FLASH,"\t":F.STEADY,"\n":F.END_BOX,"\v":F.START_BOX,"\f":F.NORMAL_SIZE,"\r":F.DOUBLE_HEIGHT,"":F.DOUBLE_WIDTH,"":F.DOUBLE_SIZE,"":F.CONCEAL,"":F.CONTIGUOUS_GRAPHICS,"":F.SEPARATED_GRAPHICS,"":F.ESC,"":F.BLACK_BACKGROUND,"":F.NEW_BACKGROUND,"":F.HOLD_MOSAICS,"":F.RELEASE_MOSAICS},j={};for(const t in N)j[N[t]]=t,H[t]=N[t];Object.freeze(j);const O={};for(const t in G)O[G[t]]=t,H[t]=G[t];Object.freeze(O),Object.freeze(H);const P={};for(const t in H)P[H[t]]=t;Object.freeze(P);const M={0:Symbol(),1:Symbol(),1.5:Symbol(),2.5:Symbol()};Object.freeze(M);const q={};q[M[0]]=[1,2,3,4,5,6,7,8,9,17,18,19,20,21,22,23],q[M[1]]=[...q[M[0]]].concat([10,11,12,13,24,25,26,27,28,29,30,31]),q[M[1.5]]=[...q[M[1]]].concat([0,16]),q[M[2.5]]=[...q[M[1.5]]].concat([14,15]),Object.freeze(q);const T={Zt:{Xt:10.4,Wt:-5.2},$t:{Xt:10,Wt:-4.5}};Object.freeze(T);class z{constructor(t,s){this.ts=new B(s).Ct("0 0 399 249").ft(800,666.6666666666666)._t({preserveAspectRatio:"none",style:"font-family: sans-serif"}).It("@font-face {\nfont-family: 'Unscii';\nsrc: url('fonts/unscii-16.woff') format('woff'), \nurl('fonts/unscii-16.ttf') format('truetype'),\nurl('fonts/unscii-16.otf') format('opentype');\nunicode-range: U+0000-00FF, U+2022, U+2500, U+2502, U+250C, U+2510, U+2514, U+2518, U+251C, U+251D, U+2524, U+2525, U+252C, U+252F, U+2534, U+2537, U+253C, U+253F, U+2588, U+258C, U+2590, U+2592, U+25CB, U+25CF, U+25E2-25E5, U+2B60-2B63, U+E0C0-E0FF, U+1FB00-1FB70, U+1FB75, U+1FBA0-1FBA7;\n-webkit-font-smoothing: none;\nfont-smooth: never;\n}\n@font-face {\nfont-family: 'Bedstead';\nsrc: url('fonts/bedstead.otf') format('opentype');\nunicode-range: U+0000-00FF;\n}\n@keyframes blink {\nto {\nvisibility: hidden;\n}\n}\n@keyframes fancyblink {\nfrom {\nfilter: none;\nopacity: 0.7;\n}\n33% {\nfilter: none;\nopacity: 1;\n}\n66% {\nfilter: blur(0px);\nopacity: 1;\n}\n95% {\nfilter: blur(4px);\nopacity: 0;\n}\nto {\nfilter: blur(0px);\nopacity: 0;\n}\n}\n#textlayer {\nfont-size: 10px;\n}\n.mosaic {\nfont-family: 'Unscii';\nfont-size: 10.3px;\n}\n.mosaic_separated {\nfont-family: 'Unscii';\nfont-size: 10px;\n}\n.flash_flashing .flash {\n/* animation: blink 2s steps(3, start) infinite; */\nanimation: fancyblink 2s linear infinite;\n}\n.conceal_concealed  .conceal {\nvisibility: hidden;\n}\nsvg #background {\ntransition-property: opacity;\ntransition-duration: 0.25s;\n}\nsvg {\nbackground-color: transparent;\n}\nsvg use {\nshape-rendering: crispEdges;\n}\nrect { color: orange; }\n"),this.d=this.ts.Et()._t("class","conceal_concealed flash_flashing"),this.ss=1.2,this.es(),this.rs(),this.ns=null,this.hs=t,this._s=this.hs.ls.os((()=>this.As())),this.cs=!1,this.gs=!1,this.us=!1,this.Cs={};}ut(t){this.ts.ut(t);}fs(){this.hs.ls.fs(this._s),this._s=null;}As(){let t=!1,s=!1;this.us=!1,this.d.At("flash_flashing"),this.Is.forEach(((i,e)=>{let r=!1;if(this.Es(e),t)return t=!1,void this.Bs(i,e);const n=this.hs.ds(e);let h,_;i.forEach(((t,i)=>{if(r)return r=!1,this.Qs(t),this.ys(e),void(_&&this.bs());const o=n.ps(i),a=L(o.ws),l=o.Ss(),A=L(o.xs),c=this.Us(o.vs,l,o.et);this.ks(t,o,c,A,i,e,l),o.Rs&&(_?this.bs():this.Fs(e,i),this.us=!0),h==a?this.ys(e):this.Ls(e,i,a),o.ft!=R.Yt&&o.ft!=R.Vt||(r=!0),h=a,_=o.Rs,o.Ds&&(s=!0);})),n.Ns?(this.Gs(e),this.Hs(),t=!0):t=!1,this.js(e);})),"Os"in this.Cs&&this.Cs.Os(this.ts.Bt(),this.ts.dt()),this.d.ot("conceal_concealed"),s&&setTimeout((()=>this.d.ot("flash_flashing")),100),this.Ps();}Es(t){this.Ms(t),this.qs(t);}Bs(t,s){"Ts"in this.Cs&&this.Cs.Ts(t.length,s),t.forEach((t=>this.Qs(t)));}Qs(t){t.bt(" ")._t({dx:null,dy:null,textLength:null,lengthAdjust:null,"text-anchor":null,transform:null,class:null});}ks(t,s,i,e,r,n,h){this.zs(t,s,i,e,r,n),s.vs==k.Mt&&h||s.vs==k.Tt?t.ot("mosaic"):s.vs==k.qt&&h&&t.ot("mosaic_separated");}zs(t,s,i,e,r,n){t.bt(s.Js)._t(i).Nt(e),s.ft==R.Jt?t._t("transform",`translate(0 ${X(n)}) scale(1 2)`):s.ft==R.Yt?t._t("transform",`translate(${W(r)} 0) scale(2 1)`):s.ft==R.Vt&&t._t("transform",`translate(${W(r)} ${X(n)}) scale(2 2)`),s.Ds&&t.ot("flash"),s.Ys&&t.ot("conceal");}Vs(){this.d.ct("conceal_concealed");}Ks(t){let s=t;"native"==t?s='-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif':"default"==t&&(s="sans-serif"),this.ts._t("style","font-family: "+s);}Zs(){this.ns?(this.ns.Rt(),this.ns=null):this.Xs();}Ws(){this.gs?(this.gs=!1,this.$s._t("opacity",null).kt()):(this.gs=!0,this.ti());}si(t){this.ss=t,this.ii(this.ts.dt());}ii(t){this.ts.ft("natural"==this.ss?1.6*t:t*this.ss,t);}ti(){this.cs&&this.us?this.$s._t("opacity",.3):this.us?this.$s.vt(this.ei)._t("opacity",.3):this.$s._t("opacity",0);}Ps(){this.gs&&this.ti();}ri(){this.cs?(this.d.kt(),this.cs=!1):(this.d.vt(this.ei),this.cs=!0),this.Ps();}Xs(){this.ns=this.d.Et();for(let t=0;t<25;t++)this.ns.Ft(0,10*t,399,10*t)._t({stroke:"#555","stroke-width":.5});for(let t=0;t<40;t++)this.ns.Ft(10*t,0,10*t,249)._t({stroke:"#555","stroke-width":.5});}rs(){this.ni=this.d.wt(),this.hi=null,this.ei=this.ni.Ht();}es(){this._i(),this.oi();}_i(){const t=this.d.Et();t._t({"shape-rendering":"crispEdges",id:"background"}),this.ai=[],this.$s=t;}oi(){const t=[],s=this.d.Et()._t({"text-anchor":"middle",fill:"#fff"})._t("id","textlayer");for(let i=0;i<25;i++){const e=[];for(let t=0;t<40;t++)e.push(s.bt(String.fromCharCode(32+95*Math.random()))._t({x:10*t+5,y:10*i+8}));t.push(e);}this.Is=t,this.li=s;}qs(t){this.ei.Ut().filter((s=>s.gt("r")==t)).forEach((t=>t.Rt()));}Ms(t){this.ai[t]&&this.ai[t].Rt(),this.ai[t]=this.$s.Et();}ys(t){const s=this.ai[t].xt(),i=s.Bt();s.Bt(i+10);}Ls(t,s,i){const e=10*s,r=10*t;this.ai[t].St(10,10).Nt(i).Gt(e,r);}bs(){const t=this.hi.Bt();this.hi.Bt(t+10);}Gs(t){this.ai[t].Ut().forEach((t=>t._t("height",20)));}Hs(){this.ni.jt("[data-boxbuffer]").forEach((t=>t.dt(20)));}Fs(t,s){const i=10*s,e=10*t;this.hi=this.ni.St(10,10).gt("boxbuffer",!0).Gt(i,e);}js(t){this.ni.jt("[data-boxbuffer]").forEach((s=>{s.gt({r:t,boxbuffer:null}),this.ei.Ot(s);}));}Us(t,s,i){return t==k.Mt&&s||t==k.Tt?{dx:T.Zt.Wt,dy:-.15,textLength:T.Zt.Xt,lengthAdjust:"spacingAndGlyphs","text-anchor":"start",transform:null,class:null}:t==k.qt&&s?{dx:T.$t.Wt,dy:null,textLength:T.$t.Xt,lengthAdjust:"spacingAndGlyphs","text-anchor":"start",transform:null,class:null}:{dx:null,dy:null,textLength:i?10:null,lengthAdjust:i?"spacingAndGlyphs":null,"text-anchor":null,transform:null,class:null}}registerPlugin(t,s){return "renderBackground"in s&&(this.Cs.Ai=s.renderBackground),"renderMosaic"in s&&(this.Cs.ci=s.renderMosaic),"endOfPageUpdate"in s&&(this.Cs.Os=s.endOfPageUpdate),"clearCellsForRow"in s&&(this.Cs.Ts=s.clearCellsForRow),{lookupColour:J,isDoubleHeight:Y,isDoubleWidth:V,isDoubleSize:K,isSeparatedMosaic:Z,createImageOverlay:this.gi.bind(this)}}gi(){const t=this.d.Dt(400,250);return t._t("preserveAspectRatio","none"),t}}z.ui=10,z.Ci=10,z.fi=20,z.Ii=20,z.Ei=400,z.Bi=250,z.di=T,z.ROWS=25,z.COLS=40;const J=t=>L(t),Y=t=>t==R.Jt,V=t=>t==R.Yt,K=t=>t==R.Vt,Z=t=>t==k.qt,X=t=>0-10*t,W=t=>0-10*t,$={g0_latin:{$:"¤","":"■"},g0_latin__czech_slovak:{"#":"#",$:"ů","@":"č","[":"ť","\\":"ž","]":"ý","^":"í",_:"ř","`":"é","{":"á","|":"|","}":"ú","~":"š"},g0_latin__english:{"#":"£",$:"$","@":"@","[":"←","\\":"½","]":"→","^":"↑",_:"#","`":"—","{":"¼","|":"‖","}":"¾","~":"÷"},g0_latin__estonian:{"#":"#",$:"õ","@":"Š","[":"Ä","\\":"Ö","]":"Ž","^":"Ü",_:"Õ","`":"š","{":"ä","|":"ö","}":"ž","~":"ü"},g0_latin__french:{"#":"é",$:"ï","@":"à","[":"ë","\\":"ê","]":"ù","^":"î",_:"#","`":"è","{":"â","|":"ô","}":"û","~":"ç"},g0_latin__german:{"#":"#",$:"$","@":"§","[":"Ä","\\":"Ö","]":"Ü","^":"^",_:"_","`":"°","{":"ä","|":"ö","}":"ü","~":"ß"},g0_latin__italian:{"#":"£",$:"$","@":"é","[":"°","\\":"ç","]":"→","^":"↑",_:"#","`":"ù","{":"à","|":"ò","}":"è","~":"ì"},g0_latin__latvian_lithuanian:{"#":"#",$:"$","@":"Š","[":"ė","\\":"ę","]":"Ž","^":"č",_:"ū","`":"š","{":"ą","|":"ų","}":"ž","~":"į"},g0_latin__polish:{"#":"#",$:"ń","@":"ą","[":"Ƶ","\\":"Ś","]":"Ł","^":"ć",_:"ó","`":"ę","{":"ż","|":"ś","}":"ł","~":"ź"},g0_latin__portuguese_spanish:{"#":"ç",$:"$","@":"¡","[":"á","\\":"é","]":"í","^":"ó",_:"ú","`":"¿","{":"ü","|":"ñ","}":"è","~":"à"},g0_latin__romanian:{"#":"#",$:"¤","@":"Ț","[":"Â","\\":"Ș","]":"Ă","^":"Î",_:"ı","`":"ț","{":"â","|":"ș","}":"ă","~":"î"},g0_latin__serbian_croatian_slovenian:{"#":"#",$:"Ë","@":"Č","[":"Ć","\\":"Ž","]":"Đ","^":"Š",_:"ë","`":"č","{":"ć","|":"ž","}":"đ","~":"š"},g0_latin__swedish_finnish_hungarian:{"#":"#",$:"¤","@":"É","[":"Ä","\\":"Ö","]":"Å","^":"Ü",_:"_","`":"é","{":"ä","|":"ö","}":"å","~":"ü"},g0_latin__turkish:{"#":"₺",$:"ğ","@":"İ","[":"Ş","\\":"Ö","]":"Ç","^":"Ü",_:"Ğ","`":"ı","{":"ş","|":"ö","}":"ç","~":"ü"},g2_latin:{0:"°",1:"±",2:"²",3:"³",4:"×",5:"µ",6:"¶",7:"·",8:"÷",9:"’","!":"¡",'"':"¢","#":"£","%":"¥","&":"#","'":"§","(":"¤",")":"‘","*":"“","+":"«",",":"←","-":"↑",".":"→","/":"↓",":":"”",";":"»","<":"¼","=":"½",">":"¾","?":"¿","@":" ",A:"̀",B:"́",C:"̂",D:"̃",E:"̄",F:"̆",G:"̇",H:"̈",I:"̣",J:"̊",K:"̧",L:"̲",M:"̋",N:"̨",O:"̌",P:"—",Q:"¹",R:"®",S:"©",T:"™",U:"♪",V:"₠",W:"‰",X:"α",Y:null,Z:null,"[":null,"\\":"⅛","]":"⅜","^":"⅝",_:"⅞","`":"Ω",a:"Æ",b:"Ð",c:"ª",d:"Ħ",e:null,f:"Ĳ",g:"Ŀ",h:"Ł",i:"Ø",j:"Œ",k:"º",l:"Þ",m:"Ŧ",n:"Ŋ",o:"ŉ",p:"ĸ",q:"æ",r:"đ",s:"ð",t:"ħ",u:"ı",v:"ĳ",w:"ŀ",x:"ł",y:"ø",z:"œ","{":"ß","|":"þ","}":"ŧ","~":"ŋ","":"■"},g0_greek:{"<":"«",">":"»","@":"ΐ",A:"Α",B:"Β",C:"Γ",D:"Δ",E:"Ε",F:"Ζ",G:"Η",H:"Θ",I:"Ι",J:"Κ",K:"Λ",L:"Μ",M:"Ν",N:"Ξ",O:"Ο",P:"Π",Q:"Ρ",R:"ʹ",S:"Σ",T:"Τ",U:"Υ",V:"Φ",W:"Χ",X:"Ψ",Y:"Ω",Z:"Ϊ","[":"Ϋ","\\":"ά","]":"έ","^":"ή",_:"ί","`":"ΰ",a:"α",b:"β",c:"γ",d:"δ",e:"ε",f:"ζ",g:"η",h:"θ",i:"ι",j:"κ",k:"λ",l:"μ",m:"ν",n:"ξ",o:"ο",p:"π",q:"ρ",r:"ς",s:"σ",t:"τ",u:"υ",v:"φ",w:"χ",x:"ψ",y:"ω",z:"ϊ","{":"ϋ","|":"ό","}":"ύ","~":"ώ","":"■"},g2_greek:{0:"°",1:"±",2:"²",3:"³",4:"×",5:"m",6:"n",7:"p",8:"÷",9:"’","!":"a",'"':"b","#":"£",$:"e","%":"h","&":"i","'":"§","(":":",")":"‘","*":"“","+":"k",",":"←","-":"↑",".":"→","/":"↓",":":"”",";":"t","<":"¼","=":"½",">":"¾","?":"x","@":" ",A:"̀",B:"́",C:"̂",D:"̃",E:"̄",F:"̆",G:"̇",H:"̈",I:"̣",J:"̊",K:"̧",L:"̲",M:"̋",N:"̨",O:"̌",P:"?",Q:"¹",R:"®",S:"©",T:"™",U:"♪",V:"₠",W:"‰",X:"ɑ",Y:"Ί",Z:"Ύ","[":"Ώ","\\":"⅛","]":"⅜","^":"⅝",_:"⅞","`":"C",a:"D",b:"F",c:"G",d:"J",e:"L",f:"Q",g:"R",h:"S",i:"U",j:"V",k:"W",l:"Y",m:"Z",n:"Ά",o:"Ή",p:"c",q:"d",r:"f",s:"g",t:"j",u:"l",v:"q",w:"r",x:"s",y:"u",z:"v","{":"w","|":"y","}":"z","~":"Έ","":"■"},g0_cyrillic:{"@":"Ю",A:"А",B:"Б",C:"Ц",D:"Д",E:"Е",F:"Ф",G:"Г",H:"Х",I:"И",J:"Ѝ",K:"К",L:"Л",M:"М",N:"Н",O:"О",P:"П",Q:"Я",R:"Р",S:"С",T:"Т",U:"У",V:"Ж",W:"В",X:"Ь",Z:"З","[":"Ш","]":"Щ","^":"Ч","`":"ю",a:"а",b:"б",c:"ц",d:"д",e:"е",f:"ф",g:"г",h:"х",i:"и",j:"ѝ",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",q:"я",r:"р",s:"с",t:"т",u:"у",v:"ж",w:"в",x:"ь",z:"з","{":"ш","}":"щ","~":"ч","":"■"},g0_cyrillic__russian_bulgarian:{"&":"ы",Y:"Ъ","\\":"Э",_:"Ы",y:"ъ","|":"э"},g0_cyrillic__serbian_croatian:{"@":"Ч",J:"Ј",Q:"Ќ",V:"В",W:"Ѓ",X:"Љ",Y:"Њ","[":"Ћ","\\":"Ж","]":"Ђ","^":"Ш",_:"Џ","`":"ч",j:"ј",q:"ќ",v:"в",w:"ѓ",x:"љ",y:"њ","{":"ћ","|":"ж","}":"ђ","~":"ш"},g0_cyrillic__ukranian:{"&":"ї",Y:"І","\\":"Є",_:"Ї",y:"і","|":"є"},g2_cyrillic:{0:"m",1:"n",2:"p",3:"t",4:"x",5:"x",6:"°",7:"±",8:"²",9:"³","!":"a",'"':"b","#":"£",$:"e","%":"h","&":"i","'":"§","(":":",")":"‘","*":"“","+":"k",",":"←","-":"↑",".":"→","/":"↓",":":"¼",";":"½","<":"¾","=":"÷",">":"’","?":"”","@":" ",A:"̀",B:"́",C:"̂",D:"̃",E:"̄",F:"̆",G:"̇",H:"̈",I:"̣",J:"̊",K:"̧",L:"̲",M:"̋",N:"̨",O:"̌",P:"?",Q:"©",R:"®",S:"¹",T:"ɑ",U:"Ί",V:"Ύ",W:"Ώ",X:"‰",Y:"₠",Z:"™","[":"⅛","\\":"⅜","]":"⅝","^":"⅞",_:"♪","`":"C",a:"D",b:"F",c:"G",d:"J",e:"L",f:"Q",g:"R",h:"S",i:"U",j:"V",k:"W",l:"Y",m:"Z",n:"Ά",o:"Ή",p:"c",q:"d",r:"f",s:"g",t:"j",u:"l",v:"q",w:"r",x:"s",y:"u",z:"v","{":"w","|":"y","}":"z","~":"Έ","":"■"},g0_arabic:{"#":"£","&":"ﻰ","'":"ﻱ","(":")",")":"(",";":"؛","<":">",">":"<","?":"؟","@":"ﺔ",A:"ﺀ",B:"ﺒ",C:"ﺏ",D:"ﺘ",E:"ﺕ",F:"ﺎ",G:"ﺍ",H:"ﺑ",I:"ﺓ",J:"ﺗ",K:"ﺛ",L:"ﺟ",M:"ﺣ",N:"ﺧ",O:"ﺩ",P:"ﺫ",Q:"ﺭ",R:"ﺯ",S:"ﺳ",T:"ﺷ",U:"ﺻ",V:"ﺿ",W:"ﻃ",X:"ﻇ",Y:"ﻋ",Z:"ﻏ","[":"ﺜ","\\":"ﺠ","]":"ﺤ","^":"ﺨ",_:"#","`":"ـ",a:"ﻓ",b:"ﻗ",c:"ﻛ",d:"ﻟ",e:"ﻣ",f:"ﻧ",g:"ﻫ",h:"ﻭ",i:"ﻰ",j:"ﻳ",k:"ﺙ",l:"ﺝ",m:"ﺡ",n:"ﺥ",o:"ﻴ",p:"ﻯ",q:"ﻌ",r:"ﻐ",s:"ﻔ",t:"ﻑ",u:"ﻘ",v:"ﻕ",w:"ﻙ",x:"ﻠ",y:"ﻝ",z:"ﻤ","{":"ﻡ","|":"ﻨ","}":"ﻥ","~":"ﻻ","":"■"},g2_arabic:{0:"٠",1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩","!":"ﻉ",'"':"ﺁ","#":"ﺃ",$:"ﺅ","%":"ﺇ","&":"ﺋ","'":"ﺊ","(":"ﭼ",")":"ﭽ","*":"ﭺ","+":"ﭘ",",":"ﭙ","-":"ﭖ",".":"ﮊ","/":"ﮔ",":":"ﻎ",";":"ﻍ","<":"ﻼ","=":"ﻬ",">":"ﻪ","?":"ﻩ","@":"à","[":"ë","\\":"ê","]":"ù","^":"î",_:"ﻊ","`":"é","{":"â","|":"ô","}":"û","~":"ç","":"■"},g0_hebrew:{"#":"£","[":"←","\\":"½","]":"→","^":"↑",_:"#","`":"א",a:"ב",b:"ג",c:"ד",d:"ה",e:"ו",f:"ז",g:"ח",h:"ט",i:"י",j:"ך",k:"כ",l:"ל",m:"ם",n:"מ",o:"ן",p:"נ",q:"ס",r:"ע",s:"ף",t:"פ",u:"ץ",v:"צ",w:"ק",x:"ר",y:"ש",z:"ת","{":"₪","|":"‖","}":"¾","~":"÷","":"■"},g1_block_mosaic_to_unicode__legacy_computing:{0:"🬏",1:"🬐",2:"🬑",3:"🬒",4:"🬓",5:"▌",6:"🬔",7:"🬕",8:"🬖",9:"🬗"," ":" ","!":"🬀",'"':"🬁","#":"🬂",$:"🬃","%":"🬄","&":"🬅","'":"🬆","(":"🬇",")":"🬈","*":"🬉","+":"🬊",",":"🬋","-":"🬌",".":"🬍","/":"🬎",":":"🬘",";":"🬙","<":"🬚","=":"🬛",">":"🬜","?":"🬝","`":"🬞",a:"🬟",b:"🬠",c:"🬡",d:"🬢",e:"🬣",f:"🬤",g:"🬥",h:"🬦",i:"🬧",j:"▐",k:"🬨",l:"🬩",m:"🬪",n:"🬫",o:"🬬",p:"🬭",q:"🬮",r:"🬯",s:"🬰",t:"🬱",u:"🬲",v:"🬳",w:"🬴",x:"🬵",y:"🬶",z:"🬷","{":"🬸","|":"🬹","}":"🬺","~":"🬻","":"█"},g1_block_mosaic_to_unicode__unscii_separated:{0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""," ":" ","!":"",'"':"","#":"",$:"","%":"","&":"","'":"","(":"",")":"","*":"","+":"",",":"","-":"",".":"","/":"",":":"",";":"","<":"","=":"",">":"","?":"","`":"",a:"",b:"",c:"",d:"",e:"",f:"",g:"",h:"",i:"",j:"",k:"",l:"",m:"",n:"",o:"",p:"",q:"",r:"",s:"",t:"",u:"",v:"",w:"",x:"",y:"",z:"","{":"","|":"","}":"","~":"","":""},g3:{0:"🭇",1:"🭈",2:"🭉",3:"🭊",4:"🭋",5:"◢",6:"🭌",7:"🭍",8:"🭎",9:"🭏"," ":"🬼","!":"🬽",'"':"🬾","#":"🬿",$:"🭀","%":"◣","&":"🭁","'":"🭂","(":"🭃",")":"🭄","*":"🭅","+":"🭆",",":"🭨","-":"🭩",".":"🭰","/":"▒",":":"🭐",";":"🭑","<":"🭪","=":"🭫",">":"🭵","?":"█","@":"┷",A:"┯",B:"┝",C:"┥",D:"🮤",E:"🮥",F:"🮦",G:"🮧",H:"🮠",I:"🮡",J:"🮢",K:"🮣",L:"┿",M:"•",N:"●",O:"○",P:"│",Q:"─",R:"┌",S:"┐",T:"└",U:"┘",V:"├",W:"┤",X:"┬",Y:"┴",Z:"┼","[":"→","\\":"←","]":"↑","^":"↓",_:" ","`":"🭒",a:"🭓",b:"🭔",c:"🭕",d:"🭖",e:"◥",f:"🭗",g:"🭘",h:"🭙",i:"🭚",j:"🭛",k:"🭜",l:"🭬",m:"🭭",n:null,o:null,p:"🭝",q:"🭞",r:"🭟",s:"🭠",t:"🭡",u:"◤",v:"🭢",w:"🭣",x:"🭤",y:"🭥",z:"🭦","{":"🭧","|":"🭮","}":"🭯","~":null,"":null}},tt={};class st{constructor(t){this.type=t.vs,this.flashing=t.Ds,this.concealed=t.Ys,this.size=t.ft,this.sextants=t.Qi();}}class it{constructor(){this.yi=" ",this.bi=" ",this.pi=v.WHITE,this.mi=v.BLACK,this.wi=k.Pt,this.Si=!1,this.xi=R.zt,this.Ui=!1,this.vi=!1,this.ki=null,this.Ri=!1,this.Fi=null,this.Li=null;}set Di(t){this.yi=t;}get Di(){return this.yi}set xs(t){this.pi=t;}get xs(){return this.pi}set ws(t){this.mi=t;}get ws(){return this.mi}get et(){return this.Ri}Ni(t){const s=this.wi==k.Mt||this.wi==k.qt;this.wi==k.Pt||0==(32&this.yi.charCodeAt(0))&&s?(this.bi=rt(this.yi,t),this.Fi>0&&(this.bi+=$.g2_latin[String.fromCharCode(this.Fi+64)]),this.Ri=!1,"g0_arabic"!=t&&"g2_arabic"!=t||(this.Ri=l.et(this.bi))):this.wi==k.Mt?this.bi=rt(this.yi,"g1_block_mosaic_to_unicode__legacy_computing"):this.wi==k.qt?this.bi=rt(this.yi,"g1_block_mosaic_to_unicode__unscii_separated"):this.wi==k.Tt&&(this.bi=rt(this.yi,"g3")),this.ki=null;}Gi(t){if(this.wi!=k.Mt&&this.wi!=k.qt||!t.Hi)this.ki=null,this.bi=" ";else {this.ki=t.Js,this.wi=t.vs;let s="g1_block_mosaic_to_unicode__legacy_computing";this.wi==k.qt&&(s="g1_block_mosaic_to_unicode__unscii_separated"),this.bi=rt(t.Js,s);}}get Js(){return this.bi}get vs(){return this.wi}set vs(t){this.wi=t;}set Ds(t){this.Si=t;}get Ds(){return this.Si}get ft(){return this.xi}set ft(t){this.xi=t;}set Ys(t){this.Ui=t;}get Ys(){return this.Ui}set Rs(t){this.vi=t;}get Rs(){return this.vi}Ss(){const t=null!=this.ki?this.ki.charCodeAt(0):this.yi.charCodeAt(0);return t<=127&&32==(32&t)}ji(){const t=this.yi.charCodeAt(0);return (this.wi==k.Mt||this.wi==k.qt)&&t<=127&&32==(32&t)}Qi(){const t=null!=this.ki?this.ki.charCodeAt(0):this.yi.charCodeAt(0);if(t>127)return null;if(t in tt)return tt[t];let s=t-32;return s>=64&&(s-=32),tt[t]=[...s.toString(2).padStart(6,"0")].reverse(),tt[t]}}class et extends it{constructor(t){super(),Object.assign(this,t);}set Oi(t){this.Fi=t;}get Oi(){return this.Fi}set Pi(t){this.Li=t;}get Js(){return null==this.Li?this.bi:this.Li}}function rt(t,s){if(!(s in $))throw Error("Cell getCharWithEncoding: bad encoding: "+s);if(t in $[s])return $[s][t];const i=s.match(/^(.+)__/);if(null!=i){const e=i[1];if(t in $[e])return $[s][t]=$[e][t],$[e][t]}return t}class nt extends z{constructor(t,s,i){super(t,i),this.Mi=s,this.qi=new Set;}es(){super.es(),this.Ti=[],this.zi=this.d.Et();}Es(t){super.Es(t),this.Ji(t);}ks(t,s,i,e,r,n,h){"Ai"in this.Cs&&this.Cs.Ai(n,r,s.ft,s.ws),s.vs!=k.Pt&&s.vs!=k.Tt&&h?h&&(t.bt(" ")._t(i),this.Yi(n,r,s,e)):(this.zs(t,s,i,e,r,n),s.vs==k.Tt&&t.ot("mosaic"));}Yi(t,s,i,e){if("ci"in this.Cs){const r=new st(i);if(this.Cs.ci(t,s,r,e))return}const r=i.Qi();if(!r.includes("1"))return;let n=i.vs==k.Mt?"c":"s";n+=r.join("");let h,_=z.ui,o=z.Ci;if(i.vs==k.Mt&&(_=z.ui+.3,o=z.Ci+.2),!this.qi.has(n)){this.qi.add(n);const t=this.ts.Qt(n);if(i.vs==k.Mt){t._t({preserveAspectRatio:"none",width:_,height:o,viewBox:"0 0 12 18"});for(let s=0;s<6;s++)"1"==r[s]&&t.St(6,6).Gt(s%2*6,6*Math.floor(s/2));}else {t._t({preserveAspectRatio:"none",width:_,height:o,viewBox:"0 0 12 18"});for(let s=0;s<6;s++)"1"==r[s]&&t.St(4,4).Gt(s%2*6+1,6*Math.floor(s/2)+2);}}h=i.vs==k.Mt?this.Ti[t].Lt(n).Gt(s*z.ui-.15,t*z.Ci-.1).Nt(e):this.Ti[t].Lt(n).Gt(s*z.ui,t*z.Ci).Nt(e),this.Mi&&h._t({width:_,height:o}),i.ft!=R.Jt&&i.ft!=R.Vt||h._t("height",z.Ii),i.ft!=R.Yt&&i.ft!=R.Vt||h._t("width",z.fi),i.Ds&&h.ot("flash"),i.Ys&&h.ot("conceal");}Ji(t){this.Ti[t]&&this.Ti[t].Rt(),this.Ti[t]=this.zi.Et();}Us(t,s,i){return t==k.Tt?{dx:z.di.Zt.Wt,dy:-.15,textLength:z.di.Zt.Xt,lengthAdjust:"spacingAndGlyphs","text-anchor":"start",transform:null,class:null}:{dx:null,dy:null,textLength:i?z.ui:null,lengthAdjust:i?"spacingAndGlyphs":null,"text-anchor":null,transform:null,class:null}}}class ht{constructor(t){this.hs=t,this.Vi=0,this.Ki=0,this.Zi=[];}pos(t,s){return (t=parseInt(t))<0||t>39||(s=parseInt(s))<0||s>24||(this.Vi=t,this.Ki=s),this}putG0(t,s){let i=null;if(void 0!==s){const t=parseInt(s);t>=0&&t<=15&&(i=t);}const e=t.charCodeAt(0);return e<32||e>127||this.Zi.push({Xi:this.Vi,Wi:this.Ki,vs:"g0",Js:t,Oi:i}),this}putG1(t){const s=t.charCodeAt(0);return s<32||s>127||s>=64&&s<=95||this.Zi.push({Xi:this.Vi,Wi:this.Ki,vs:"g1",Js:t}),this}putG2(t){const s=t.charCodeAt(0);return s<32||s>127||this.Zi.push({Xi:this.Vi,Wi:this.Ki,vs:"g2",Js:t}),this}putG3(t){const s=t.charCodeAt(0);return s<32||s>127||this.Zi.push({Xi:this.Vi,Wi:this.Ki,vs:"g3",Js:t}),this}putAt(){return this.Zi.push({Xi:this.Vi,Wi:this.Ki,vs:"char",Js:"@"}),this}end(){return this.hs.$i(this.Zi),this.hs.te(),this}}class _t extends z{}const ot=["SPLASH","ENGINEERING","ADVERT","UK"];class at{constructor(t,s){if(this.se=null,"object"==typeof window&&(this.se=window),this.ie={ee:!0},"object"==typeof s&&("webkitCompat"in s&&!s.webkitCompat&&(this.ie.ee=!1),"dom"in s&&(this.se=s.dom)),null==this.se)throw Error("TeletextController E24: No window dom object available");this.re=new nt(t,this.ie.ee,this.se),this.hs=t,this.ne=1,this.he=0,this._e(),this.oe=null,this.ae=null,this.le=0,this.Ae=0;}setRowFromOutputLine(t,s){const i=l.st(s);this.hs.ce(t,i);}setRow(t,s){this.hs.ce(t,s);}setPageFromOutputLines(t,s){const i=l.it(t);void 0!==s&&(i[0]=this.ge(s)),this.setPageRows(i);}setPageRows(t){this.hs.ue(),this.hs.Ce(t);}ge(t){return (t=l.st(t)).join("").substring(0,32).padStart(40," ")}showTestPage(){this.loadPageFromEncodedString(g[ot[this.he]]),this.he++,4==this.he&&(this.he=0);}showRandomisedPage(){const t=[];for(let s=0;s<25;s++){const s=[];for(let t=0;t<40;t++)s.push(String.fromCharCode(127*Math.random()));t.push(s.join(""));}this.setPageRows(t);}loadPageFromEncodedString(t,s){const i=l.tt(t,this.se.atob);void 0!==s&&(i[0]=this.ge(s)),this.setPageRows(i);}_e(){this.se.addEventListener("ttx.reveal",(()=>this.re.Vs())),this.se.addEventListener("ttx.mix",(()=>this.re.Ws())),this.se.addEventListener("ttx.subtitlemode",(()=>this.re.ri()));}toggleReveal(){this.re.Vs();}toggleMixMode(){this.re.Ws();}toggleBoxMode(){this.re.ri();}toggleGrid(){this.re.Zs();}setLevel(t){this.hs.fe(t);}addTo(t){this.Ie=t,this.re.ut(t);}setFont(t){this.re.Ks(t);}clearScreen(t){this.hs.ue(),this.hs.Ee(t);}setAspectRatio(t){if("natural"==t)return void this.re.si(t);const s=parseFloat(t);if(Number.isNaN(s))throw Error("E80 setAspectRatio: bad number");this.re.si(s);}setHeight(t){const s=parseFloat(t);if(Number.isNaN(s))throw Error("E98 setHeight: bad number");this.re.ii(s),this.ae=s;}setDefaultG0Charset(t,s){if(null==t.match(/g0_/))throw Error("E130 setDefaultG0Charset: Bad g0 set");this.hs.Be(t,s);}setSecondG0Charset(t,s){if(null==t.match(/g0_/))throw Error("E136 setSecondG0Charset: Bad g0 set");this.hs.de(t,s);}setG2Charset(t,s){if(null==t.match(/g2_/))throw Error("E142 setG2Charset: Bad g2 set");this.hs.Qe(t,s);}remove(){if(this.re.fs(),this.Ie){const t=document.querySelector(this.Ie);t&&t.removeChild(t.firstChild);}this.re=null;}setView(t){switch(this.remove(),t){case"classic__font-for-mosaic":this.re=new _t(this.hs,this.se);break;case"classic__graphic-for-mosaic":this.re=new nt(this.hs,this.ie.ee,this.se);break;default:throw Error("setView E126: bad view name:"+t)}this.ae&&this.re.ii(this.ae),this.Ie&&this.re.ut(this.Ie),this.hs.te();}registerViewPlugin(t){t.registerWithView(this.re),this.hs.te();}enhance(){return new ht(this.hs)}}class lt{constructor(t){this.ye=t,this.be=[];}os(t){return this.be.push(t),this.be.length-1}te(t){this.be.forEach((s=>null!=s&&s(this.ye,t)));}fs(t){this.be[t]=null;}}class At{constructor(){this.pe=!1,this.me=[];}get Ns(){return this.pe}set Ns(t){this.pe=t;}we(t){this.me.push(t);}ps(t){if(t>=this.me.length)throw Error("RowModel.getCell E20 bad cell index");return this.me[t]}}const ct=[M[1.5],M[2.5]],gt=new class{constructor(){this.Se=[];for(let t=0;t<25;t++){const t=[];for(let s=0;s<40;s++)t.push(new it);this.Se.push(t);}this.xe="g0_latin",this.Ue=null,this.ve="g2_latin",this.ke=F.charFromAttribute(F.START_BOX),this.Re=M[1],this.Fe=[],this.ls=new lt(this);}te(){this.ls.te();}ce(t,s){if(t>=25)throw Error("PageModel E29 bad row number");this.Le(t,s),this.ls.te();}Ce(t){(t=t.slice(0,25)).forEach(((t,s)=>{this.Le(s,t);})),this.ls.te();}Le(t,s){let i=[...s];if(i=i.slice(0,40),i.forEach(((s,i)=>{const e=s.charCodeAt(0);if(Number.isNaN(e)||e>127)throw Error(`PageModel E51 failed to write row: bad character code (${e}) at row ${t} col ${i}`);this.Se[t][i].Di=s;})),i.length<40)for(let s=i.length;s<40;s++)this.Se[t][s].Di=" ";}fe(t){this.Re=t,this.ls.te();}Ee(t){if(void 0===t||t){const t=[];for(let s=0;s<25;s++)t.push("");this.Ce(t);}else for(let t=0;t<25;t++)this.Le(t,"");}Be(t,s){this.xe=t;const i=t.match(/^g0_([a-z]+)/);if(null!=i){const t="g2_"+i[1];t in $?this.ve=t:"hebrew"==i[1]&&(this.ve="g2_arabic");}s&&this.ls.te();}de(t,s){this.Ue=t,s&&this.ls.te();}Qe(t,s){this.ve=t,s&&this.ls.te();}ds(t){if(t>=25)throw Error("PageModel.getRow E42 bad rowNum");const s=new At;let i,e,r=k.Pt,n=v.WHITE,h=!1,_=R.zt,o=!1,a=!1,l=!1,A=!1,c=v.BLACK,g=k.Mt,u={Hi:!1,Js:" ",vs:k.Mt},C=[];return ct.includes(this.Re)&&(C=this.Fe.filter((s=>s.Wi==t))),this.Se[t].forEach(((f,I)=>{const E=f.Di,B=((t,s)=>{let i=null,e=null;return s in H&&q[t].includes(s.charCodeAt(0))?s in N?(i=F.TEXT_COLOUR,e=H[s]):s in G?(i=F.MOSAIC_COLOUR,e=H[s]):i=H[s]:s.charCodeAt(0)<=31&&(i=F.Kt),{De:i,Ne:e}})(this.Re,E);switch(i=n,f.vs=r,f.Rs=A,e=o,B.De!=F.STEADY&&(f.Ds=h),B.De!=F.NORMAL_SIZE&&(f.ft=_),B.De!=F.CONCEAL&&(f.Ys=a),l&&(B.De!=F.HOLD_MOSAICS&&(u.Hi=!1,u.Js=" "),l=!1),B.De){case F.TEXT_COLOUR:r=k.Pt,n=B.Ne,a=!1,f.Gi(u);break;case F.MOSAIC_COLOUR:r=g,n=B.Ne,a=!1,f.Gi(u);break;case F.NEW_BACKGROUND:c=i,f.Gi(u);break;case F.BLACK_BACKGROUND:c=v.BLACK,f.Gi(u);break;case F.CONTIGUOUS_GRAPHICS:g=k.Mt,f.vs==k.qt&&(f.vs=k.Mt),r==k.qt&&(r=k.Mt),f.Gi(u);break;case F.SEPARATED_GRAPHICS:g=k.qt,f.vs==k.Mt&&(f.vs=k.qt),r==k.Mt&&(r=k.qt),f.Gi(u);break;case F.ESC:this.Ue&&(o=!e),f.Gi(u);break;case F.FLASH:h=!0,f.Gi(u);break;case F.STEADY:f.Ds=!1,h=!1,f.Gi(u);break;case F.NORMAL_SIZE:f.ft=R.zt,_=R.zt,f.Gi(u);break;case F.DOUBLE_HEIGHT:_=R.Jt,s.Ns=!0,f.Gi(u);break;case F.DOUBLE_WIDTH:_=R.Yt,f.Gi(u);break;case F.DOUBLE_SIZE:_=R.Vt,s.Ns=!0,f.Gi(u);break;case F.CONCEAL:f.Ys=!0,a=!0,f.Gi(u);break;case F.HOLD_MOSAICS:u.Hi=!0,f.Gi(u);break;case F.RELEASE_MOSAICS:l=!0,f.Gi(u);break;case F.START_BOX:I>=1&&this.Se[t][I-1].Di==this.ke&&(f.Rs=!0,A=!0),f.Gi(u);break;case F.END_BOX:A=!1,f.Gi(u);break;case F.Kt:f.Gi(u);break;default:f.Ni(e?this.Ue:this.xe),f.ji()&&(u.Js=E,u.vs=f.vs);}f.xs=i,f.ws=c,C.filter((t=>t.Xi==I)).forEach((t=>{const s=new et(f);f=s,"g0"==t.vs?(f.Di=t.Js,f.Oi=t.Oi,f.vs=k.Pt,f.Ni(e?this.Ue:this.xe)):"g1"==t.vs?this.Re==M[2.5]&&(f.Di=t.Js,f.vs=g,f.Ni()):"g2"==t.vs?(f.Di=t.Js,f.vs=k.Pt,f.Ni(this.ve)):"g3"==t.vs?(this.Re!=M[1.5]||-1!="Q[\\]".indexOf(t.Js))&&(f.Di=t.Js,f.vs=k.Tt,f.Ni()):"char"==t.vs&&(f.Pi=t.Js,f.vs=k.Pt);})),s.we(f);})),s}$i(t){this.Fe=t;}ue(){this.Fe=[];}};function ut(t){return new at(gt,t)}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

class PageFetcher {
    constructor() {
        this._magazine = null;
        this._magazineData = null;
    }

    async fetchPage(pageNumber) {
        const matches = pageNumber.match(/([1-8])[0-9A-Fa-f]{2}/);
        if (matches == null) return null;
        const magazine = matches[1];

        if (this._magazine != magazine) {
            try {
                const res = await fetch(`${magazine}.json`);
                if (res.ok) {
                    const data = await res.json();
                    if ('pages' in data) {
                        this._magazineData = data;
                        this._magazine = magazine;
                    } else console.warn(`W21 fetchPage: 'pages' property missing in ${magazine}.json`);
                } else console.warn(`W22 fetchPage: failed to load magazine data from ${magazine}.json : ${res.status} ${res.statusText}`);
            } catch (e) {
                console.warn(`W24 fetchPage: failed to load magazine data from ${magazine}.json :`, e.message);
            }
        }

        if (this._magazine == magazine && pageNumber in this._magazineData.pages) {
            return this._magazineData.pages[pageNumber];
        }
        return null;
    }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Header {
    constructor(string) {
        this._template = string;
    }

    _tokens () {
        const now = new Date();
        return {
            '%%a': DAYS[now.getDay()],
            '%%b': MONTHS[now.getMonth()],
            '%d': String(now.getDate()).padStart(2, 0),
            '%e': String(now.getDate()).padStart(2, " "),
            '%m': String(now.getMonth() + 1).padStart(2, " "),
            "%y": String(now.getFullYear()).substring(2, 2),
            "%H": String(now.getHours()).padStart(2, 0),
            "%M": String(now.getMinutes()).padStart(2, 0),
            "%S": String(now.getSeconds()).padStart(2, 0)
        };
    }

    generate_(pageNumber) {
        const tokens = this._tokens();
        let t = this._template;
        for (const token of Object.keys(tokens)) {
            t = t.replace(token, tokens[token]);
        }

        if (typeof pageNumber != 'undefined')
            t = t.replace("%%#", pageNumber);
        return t;
    }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

const DEFAULT_HEADER = '       %%#  %%a %e %%b \x1bC%H:%M/%S';

class TeletextService {
    constructor(options) {
        if (typeof options != 'object') throw new Error("E8 Service.constructor: options object required");
        if (!('DOMSelector' in options)) throw new Error("E9 Service.constructor DOMSelector property required");

        this._caster = 'caster' in options ? options.caster : null;
        this._defaultG0Charset = 'defaultG0Charset' in options ? options.defaultG0Charset : 'g0_latin';
        this._header = 'header' in options ? new Header(options.header) : new Header(DEFAULT_HEADER);
        this._fetcher = 'fetcher' in options ? options.fetcher : new PageFetcher();

        this._ttx = ut();
        this._ttx.setDefaultG0Charset(this._defaultG0Charset);
        this._ttx.setLevel(M[1.5]);
        this._ttx.addTo(options.DOMSelector);

        this._page = null;
        this._pageNumber = null;
        this._subPageNumber = 0;
        this._fastext = null;
    }

    get teletextInstance() {
        return this._ttx;
    }

    async showPage(pageNumber) {
        if (typeof pageNumber == 'number') pageNumber = String(pageNumber);
        const matches = pageNumber.match(/^[1-8][0-9A-Fa-f]{2}$/);
        if (matches == null) {
            console.warn('W37 Service.showPage: bad page number', pageNumber);
            return null;
        }

        const page = await this._fetcher.fetchPage(pageNumber);
        if (page != null) {
            const firstSubPage = this._getFirstSubPage(page);
            if (firstSubPage != null) {
                this._page = page;
                this._pageNumber = pageNumber;
                this._subPageNumber = firstSubPage;

                this._update();
                return this._pageMetaObj();
            } else
                console.info('No subpages for page', pageNumber);
        } else
            console.info('No page', pageNumber);
        return null;
    }

    showLink(link) {
        if (this._fastext != null && link in this._fastext)
            return this.showPage(this._fastext[link]);

        return Promise.resolve(null);
    }

    _getFirstSubPage(page) {
        const subpages = page.subpages;
        for (let i = 0; i < subpages.length; i++) {
            if (subpages[i] != null) return i;
        }
        return null;
    }

    nextSubPage() {
        const subpages = this._page.subpages;
        let nextSub = this._subPageNumber;
        let gotSubPage = false;
        while (!gotSubPage) {
            nextSub++;
            if (nextSub == subpages.length) nextSub = 0;
            if (nextSub == this._subPageNumber) break;
            if (subpages[nextSub] != null) gotSubPage = true;
        }
        if (gotSubPage) {
            this._subPageNumber = nextSub;
            this._update();
        }
        return this._pageMetaObj();
    }

    previousSubPage() {
        const subpages = this._page.subpages;
        let prevSub = this._subPageNumber;
        let gotSubPage = false;
        while (!gotSubPage) {
            prevSub--;
            if (prevSub == -1) prevSub = subpages.length - 1;
            if (prevSub == this._subPageNumber) break;
            if (subpages[prevSub] != null) gotSubPage = true;
        }
        if (gotSubPage) {
            this._subPageNumber = prevSub;
            this._update();
        }
        return this._pageMetaObj();
    }

    _pageMetaObj() {
        return {
            pageNumber: this._pageNumber,
            subPage: this._subPageNumber,
            numSubPages: this._page.subpages.filter(s => s != null).length,
            fastext: this._fastext
        };
    }

    _update() {
        const subpage = this._page.subpages[this._subPageNumber];
        const encoding = 'encoding' in subpage ? subpage.encoding : this._defaultG0Charset;
        const header = this._header.generate_(this._pageNumber);
        let casterDisplay = {
            defaultG0Charset: encoding,
            header: header,
        };
        this._ttx.clearScreen(false);
        this._ttx.setDefaultG0Charset(encoding, false);

        if ('ouputLines' in subpage) {
            const outputLines = subpage.outputLines.split("\n");
            this._ttx.setPageFromOutputLines(outputLines, header);
            casterDisplay.outputLines = outputLines;
        } else if ('packed' in subpage) {
            const packed = subpage.packed;
            this._ttx.loadPageFromEncodedString(packed, header);
            casterDisplay.packed = packed;
        } else {
            casterDisplay = null;
        }

        if (casterDisplay && this._caster) this._caster.display(casterDisplay);

        this._fastext = 'fastext' in subpage ? subpage.fastext : null;
    }
}

// SPDX-FileCopyrightText: (c) 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0
// LicenseRef-uk.ltd.TechAndSoftware-1.0 refers to https://tech-and-software.ltd.uk/LICENSES/LicenseRef-uk.ltd.TechAndSoftware-1.0.txt
//
// The Chromecast receiver app is for non-commerical use only. Contact techandsoftwareltd@outlook.com for commercial enquiries
class t{constructor(t){this.t=t,this.i=[];}attach(t){this.i.push(t);}notify(t){this.i.forEach(((s,e)=>this.i[e](this.t,t)));}}const s=new class{constructor(){this.available=new t(this),this.castStateChanged=new t(this);}o(){if("undefined"==typeof cast)return;const t={receiverApplicationId:"000F65B3",autoJoinPolicy:chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED};this.h=cast.framework.CastContext.getInstance(),this.h.setOptions(t),this.l=new cast.framework.RemotePlayer,this.u=new cast.framework.RemotePlayerController(this.l),this.h.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED,(()=>this.castStateChanged.notify())),this.available.notify(),this.castStateChanged.notify();}async display(t){if(!this.m())return;const s=this.g();this.u.stop();const e=new chrome.cast.media.MediaInfo("https://teletextforchromecast.tech-and-software.ltd.uk/250-milliseconds-of-silence.mp3","audio/mpeg3");e.entity=t;const i=new chrome.cast.media.LoadRequest(e);try{await s.loadMedia(i);}catch(t){}}getCastState(){return this.h.getCastState()}clearScreen(){this.p("clear");}toggleGrid(){this.p("grid");}toggleReveal(){this.p("reveal");}toggleMixMode(){this.p("mix");}toggleBoxMode(){this.p("box");}setSmoothMosaics(){this.p("smoothmosaic");}setBlockMosaics(){this.p("blockmosaic");}async p(t){if(!this.m())return;const s=this.g();try{await s.sendMessage("urn:x-cast:uk.ltd.techandsoftware.teletext",`"${t}"`);}catch(t){}}m(){return "object"==typeof this.l&&this.l.isConnected}g(){return this.h.getCurrentSession()}};let e=0;function i(){window.setTimeout((()=>{"undefined"==typeof cast?(e++,e<10&&i()):s.o();}),500);}window.__onGCastApiAvailable=t=>{t&&("undefined"==typeof cast?i():s.o());};

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const FONTS = ['sans-serif', 'Bedstead', 'native', 'serif', 'Unscii', 'monospace', 'cursive'];
const VIEWS = ['classic__graphic-for-mosaic', 'classic__font-for-mosaic'];

const HELP_PAGE = "OoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6RQIECBAgQYOHDhw4cOHDhw4cOHDhw4cOHBAgQIECBAgQIDo0igQIECBBqAy8vnFvw8siDHv3dOW_ZzI_2qBAgQIECBAgQIECBAgQIEHdAgQIECBAgQIECDjz9IECBAgQIECBAgQIECA6RQIECBAgQIl69evXr169evXr169evXr169KgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOhECCTmQed_VBow9sqDCg15fOLfh5ZFiDrzyoOmjKgQIECA6EQIN3Xbiy8kGvL55oMO7Ig6aMqDXl880GLLs390CBAgQIDoFAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOlNSNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjR_2iA6U1BECBA_QIECCll7ZcOxAgQIECBAgQIECBAUQIECBB_aoDpTUEQIEG1AgQIJunwgQIECBAgQIECBAgQIEBRAgQIEH9qgOlNQRAgQW0CBAgocsvbTv680HPri4Yc-VAgQFECBAgQf2qA6U1BECBBdQIECCdl8dEHPri4Yc-VAgQIECAogQIECBB_aoDpTUE5L86_yvxIIe_Zv68kGLr06b93NAgQIEBRAgQIEH9qgOlNQRAgQaUCBAgk7smXwgxdenTfuQIECBAgQFECBAgQf2qA6U1BECBB0QIECCpl5ctObTjQZ-WHho04-aDfuX782Yp_aoDpTUEQIEGZAgQII2_d0Qc--npj0IECBAgQIEBRAgQIEH9qgOlNQRAgQekCBAgtZdyDbvyZUG_cv35syBAgQFECBAgQf2qA6U1IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBB_aoDpREvXr169evXr169evXr169evXr169evXr169evXr169KgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6gQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA";
const TELETEXT_PLUGIN_SMOOTH_MOSAIC_URL = "https://cdn.jsdelivr.net/npm/@techandsoftware/teletext-plugin-smooth-mosaic@latest/dist/teletext-plugin-smooth-mosaic.min.js";

class TeletextServiceViewer {
    constructor(options) {
        const serviceOptions = {
            defaultG0Charset: 'g0_latin__english',
            header: 'FAXFAX %%#  %%a %e %%b \x1bC%H:%M/%S',
            caster: s,
            DOMSelector: '#teletextscreen'
        };
        let frontPageNumber = "";
        let useSmoothMosaics = false;
        if (typeof options == 'object') {
            for (const prop of ['defaultG0Charset', 'header', 'DOMSelector']) {
                if (prop in options) serviceOptions[prop] = options[prop];
            }
            if ('frontPage' in options) {
                if (typeof options.frontPage == 'number') frontPageNumber = String(options.frontPage);
                else if (typeof options.frontPage == 'string') frontPageNumber = options.frontPage;
                else if (options.frontPage == null) ;
            }
            if ('smoothMosaics' in options && options.smoothMosaics) useSmoothMosaics = true;
        }
        if (frontPageNumber == "") frontPageNumber = '100';

        this._service = new TeletextService(serviceOptions);

        this._pageNumber = frontPageNumber.length == 3 ? frontPageNumber : 'XXX';
        this._fontIndex = 0;
        this._viewIndex = 0;
        this._zenMode = false;

        s.available.attach(() => this._castAvailable.call(this));
        s.castStateChanged.attach(() => this._castStateChanged.call(this));

        this._initEventListeners();
        if (useSmoothMosaics) this._toggleSmoothMosaics();
        this._newPage();
    }

    _castStateChanged() {
        const state = s.getCastState();
        const castEl = document.querySelector('#castOuter');
        switch (state) {
            case 'NO_DEVICES_AVAILABLE':
                castEl.title = "Cast to Chromecast - no devices available";
                castEl.style.cursor = 'default';
                break;

            case 'NOT_CONNECTED':
                castEl.title = "Cast to Chromecast";
                castEl.style.cursor = 'pointer';
                break;

            case 'CONNECTING':
                break;

            case 'CONNECTED':
                this._newPage();
                if (this._smoothPluginIsLoaded) s.setSmoothMosaics();
                break;
        }
    }

    _castAvailable() {
        document.querySelector('#castOuter').style.display = 'inline-block';
    }

    _initEventListeners() {
        window.addEventListener('keydown', e => handleKeyDown.call(this, e));

        window.addEventListener('DOMContentLoaded', () => {
            document.querySelector('#revealButton').addEventListener('click', () => this._reveal());
            document.querySelector('#mixButton').addEventListener('click', () => this._mix());
            for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
                document.querySelector(`#${link}`).addEventListener('click', () => this._handleFastext(link));
            }
            document.querySelectorAll('[data-num]').forEach(el => el.addEventListener('click', () => this._numberInput(el.dataset.num)));
            document.querySelector('#left').addEventListener('click', () => this._previousSubPage());
            document.querySelector('#right').addEventListener('click', () => this._nextSubPage());
            document.querySelector('#helpicon').addEventListener('click', () => this._showHelp());
        });
    }

    _reveal() {
        window.dispatchEvent(new Event('ttx.reveal'));
        s.toggleReveal();
    }

    _mix() {
        window.dispatchEvent(new Event('ttx.mix'));
        s.toggleMixMode();
    }

    _numberInput(number) {
        const pnLength = String(this._pageNumber).length;
        if (pnLength == 3) {
            this._pageNumber = number;
        } else {
            this._pageNumber = String(this._pageNumber) + number;
        }
        this._updatePageNumber();
        if (String(this._pageNumber).length == 3) this._newPage();
    }

    _updatePageNumber() {
        document.querySelector('#pageNumber').innerHTML = this._pageNumber;
    }

    _clearPageNumber() {
        this._pageNumber = 'XXX';
        document.querySelector('#pageNumber').innerHTML = '- - -';
        document.querySelector('#subpage').style.visibility = 'hidden';
    }

    async _newPage() {
        const matches = this._pageNumber.match(/[1-8][0-9A-Fa-f]{2}/);
        if (matches != null) {
            const meta = await this._service.showPage(this._pageNumber);
            this._update(meta);
        }
    }

    _nextSubPage() {
        const meta = this._service.nextSubPage();
        this._update(meta);
    }

    _previousSubPage() {
        const meta = this._service.previousSubPage();
        this._update(meta);
    }

    _update(meta) {
        if (meta != null) {
            this._pageNumber = meta.pageNumber;
            this._updatePageNumber();
            this._updateSubpageNav(meta);
            this._updateButtonState(meta);
            this._updateFocus();
        }
    }

    // FUDGE Firefox keeps focus on disabled element which blocks keyboard entry
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1712587
    _updateFocus() {
        if (document.activeElement.disabled) document.activeElement.blur();
    }

    _updateSubpageNav(meta) {
        const label = document.querySelector('#subpage');
        if (meta != null && meta.numSubPages > 1) {
            label.innerHTML = `${meta.subPage} of ${meta.numSubPages}`;
            label.style.visibility = 'visible';
            document.querySelectorAll('#lrnav button').forEach(b => b.disabled = false);
        } else {
            label.style.visibility = 'hidden';
            document.querySelectorAll('#lrnav button').forEach(b => b.disabled = true);
        }
    }

    _updateButtonState(meta) {
        const ft = meta != null ? meta.fastext : {};
        for (const link of ['red', 'green', 'yellow', 'blue', 'index']) {
            let disabled = true;
            if (ft != null && link in ft) disabled = false;
            document.querySelector(`#${link}`).disabled = disabled;
        }
    }

    async _handleFastext(link) {
        const meta = await this._service.showLink(link);
        this._update(meta);
    }

    _disableNav() {
        for (const link of ['red', 'green', 'yellow', 'blue', 'index', 'left', 'right']) {
            document.querySelector(`#${link}`).disabled = true;
        }
    }

    _showHelp() {
        this._clearPageNumber();
        this._disableNav();
        const ttx = this._service.teletextInstance;
        ttx.setDefaultG0Charset('g0_latin__english', false);
        ttx.loadPageFromEncodedString(HELP_PAGE);
    }

    _generateBackground() {
        const hue = Math.floor((Math.random() * 360));
        const deg = Math.floor((Math.random() * 360));
        const bg = `linear-gradient(${deg}deg, hsl(${hue} 100% 7%) 0%, hsl(${hue} 83% 52%) 86%, hsl(${hue} 100% 85%) 100%)`;
        document.body.style.background = bg;
    }

    async _toggleSmoothMosaics() {
        if (this._smoothPluginIsLoaded) {
            this._service.teletextInstance.setView(VIEWS[this._viewIndex]); // resetting the view removes the plugin
            this._smoothPluginIsLoaded = false;
            s.setBlockMosaics();
        } else if (this._viewIndex == 0) {  // plugin works on the graphical mosaic view
            // Loading the plugin as a dynamic import as it's large
            // This also avoids having to bundle it with the application lib at build time
            try {
                const module = await import(TELETEXT_PLUGIN_SMOOTH_MOSAIC_URL);
                this._service.teletextInstance.registerViewPlugin(module.SmoothMosaicPlugin);
                this._smoothPluginIsLoaded = true;
                s.setSmoothMosaics();
            } catch (e) {
                console.error('TeletextServiceViewer: Failed to use smooth mosaic plugin: import failed:', e.message);
            }
        }
    }

    _toggleZenMode() {
        const selectors = ['#lrnav', '#fastext', '#remote', '#otherButtons'];
        if (this._zenMode) {
            selectors.forEach(selector =>
                document.querySelector(selector).style.display = ''
            );
            this._zenMode = false;
        } else {
            selectors.forEach(selector =>
                document.querySelector(selector).style.display = 'none'
            );
            this._zenMode = true;
        }
    }
}

function handleKeyDown(e) {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            document.querySelector(`#b${e.key}`).focus({ preventScroll: true});
            this._numberInput(e.key);
            break;

        case '?':
            this._reveal();
            break;

        case 'm':
            this._mix();
            break;

        case 'f': // rotate through fonts
            this._fontIndex++;
            if (this._fontIndex == FONTS.length) this._fontIndex = 0;
            console.debug('setting font to', FONTS[this._fontIndex]);
            this._service.teletextInstance.setFont(FONTS[this._fontIndex]);
            break;

        case 'w': // for wipe
            this._service.teletextInstance.clearScreen();
            break;

        case 'h':
            this._showHelp();
            break;

        case 'v': // switch views which changes the mosaic rendering method
            this._viewIndex++;
            if (this._viewIndex == VIEWS.length) this._viewIndex = 0;
            this._service.teletextInstance.setView(VIEWS[this._viewIndex]);
            this._smoothPluginIsLoaded = false;
            break;

        case 't': // 'terrific' graphics: pixel art upscaling
            this._toggleSmoothMosaics();
            break;

        case 'r':
            this._handleFastext('red');
            break;

        case 'g':
            this._handleFastext('green');
            break;

        case 'y':
            this._handleFastext('yellow');
            break;

        case 'b':
            this._handleFastext('blue');
            break;

        case 'i':
            this._handleFastext('index');
            break;

        case '=':
        case '+':
        case '>':
        case "ArrowRight":
            this._nextSubPage();
            break;

        case '-':
        case '<':
        case "ArrowLeft":
            this._previousSubPage();
            break;

        case 'c':
            this._generateBackground();
            break;

        case 'z':
            this._toggleZenMode();
            break;
    }
}

export { TeletextService, TeletextServiceViewer };
