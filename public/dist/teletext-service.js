// SPDX-FileCopyrightText: (c) 2025 Rob Hardy
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0
let t$1 = class t{static tt(t,i){const e=(t=t.replace(/-/g,"+").replace(/_/g,"/")).length%4;if(e){if(1===e)throw Error("Utils.decodeBase64URLEncoded E16: Input base64url string is the wrong length to determine padding");t+=Array(5-e).join("=");}const r=i(t),n=[];let _=[];for(const t of function*(t){let i=6,e=0;for(const r of t){const t=s$1(r.charCodeAt(0));for(const s of t)e|=s<<i,i--,i<0&&(yield e,i=6,e=0);}i<6&&(yield e);}(r))_.push(String.fromCharCode(t)),40==_.length&&(n.push(_.join("")),_=[]);return _.length<40&&n.push(_.join("")),n}static st(t){const s=[];let i=false;for(const e of [...t]){const t=e.charCodeAt(0);27==t?i=true:t>=128&&t<=159?(s.push(String.fromCharCode(t-128)),i=false):t>=160?(s.push(""),i=false):i?(s.push(String.fromCharCode(t-64)),i=false):s.push(e);}return s}static it(s){const i=[],e=/^OL,(\d{1,2}),(.*)/;for(const r of [...s]){const s=r.match(e);null!=s&&(i[s[1]]=t.st(s[2]));}return i}static et(t){return  -1!="ﻰﺋﺊﭼﭽﭘﭙﮔﻎﻼﻬﻪﻊﺔﺒﺘﺎﺑﺗﺛﺟﺣﺧﺳﺷﺻﺿﻃﻇﻋﻏﺜﺠﺤﺨـﻓﻗﻛﻟﻣﻧﻫﻰﻳﻴﻌﻐﻔﻘﻠﻤﻨ".indexOf(t)}};function s$1(t){let s=[];for(let i=7;i>=0;i--)s.push(t&1<<i?1:0);return s}const i$1={ENGINEERING:"QIECBAgQIIcWLGg2EDdy3QIKnXKgYtUE7f2QA2TB0wYr2DECAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYMS54fzJmix4-YCDToOLOjyZ0WLSkzo6AkcGHuZUcRHlB4dgyAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAWDP9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YNCho9zImSoAqBGoAp0FUy8-iChhz5UCA4MPEuZYgTAFyAFg1_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2DYCAAoACACeQHkBdYTJlixIkSKlSJEoUKIEBQABAAQAEABYN_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39g4AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGDn9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YsAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIBix_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2LICAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYs_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39i0AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGLX9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_Ytq-jT0yg7OXZs39w0Pzh3Ao_LLl3BZuHPl3dMIGllyBIWzrlLmkKJGTSJUycsoUqlZJYtXLzLBiyZlWjVs3IuHLp2UePXz9AgQokaBIlTJ0ChSqVoFi1cvQMGLJmgaNWzdA4cunaB49fP0ECDChoIkWNHQSJMqWgmTZ09BQo0qaCpVrV0FizatoLl29fQYMOLGgyZc2dBo06taDZt3b0HDjy5oOnXt3QePPr2g-ff38pgw4sZHJlzZyujTq1ktm3dvNcOPLmW6de3cn48-vZf59_fwZiHv3Y8uHYIjbMPPQDVCxcLf4E0-mXDk8mI-_dlFCn5a9_DKr6q-qvqr6q-qvqr6AFS390DJoGQKr6q-qvqr6q-qvqr6o",ADVERT:"QIECBAgQIJ9KDDmRUDZi3QU8PRk1QQeHIHDaIEDJiwYumDACdDwcnbLy6aeeXbl3dECBAgQIECBAgQIECBAgQIHwZkvcoCx0og8LNGjYwQPEjzpoWaNjBA82YHnTQwabEjTpowPEiBAgLHSiBbs1atjFA9SPe2pZqQNUHX1qQatSlrqQNW-5UsaIECAsdKIFidUqQJUCVAlVKlipchQJUCJanVIEqpAlSqlC5CgQIEB0ogQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQHSKBAgQYEH7ogQaGCApw_fEm54R3PCm5JuSKHoFUEVIECAudIoECBB6-___TB-_v0JTU_WqkZHFyQKHmjYgYBECpAqQIC50igQIEH___3_-iD__6FFSAig-IP6JCg26lzRr3avEgFUgLnSKBAg1f1X9lv_9NSBAgI6G-HX1V_EqBUqQJUqXBzagVSAudIoECD9_Qa2qL__6IMDzoq682qdAgQIEARAgQIECBAgVIC50igQIP_9AiaoFX__0VfV_1kjQIECBAgQBECBAgAoECpAgLnSKBBq__0CBCgQa___oreokCBAgQIECBAgQBECBAgVIECAudIoEHr__QIECBAg3_36FAgQIECBAgQIECAIgQIFSBAgQIAZ0igQf_7dAgKIECAinKf9bTR9QIv-N6i_ofzNagQIECBAgJnSKDR__tUBRAoe6NiBB_XYf_rqg_q2iD-gRb-iBAgQIECAmdIoNX_-1QFECDrq9IMH9h664P_D-w34P7DZ4ToECBAgQICZ0ig___5TQ8SfEHzQ82MPCzpoedEHzA82MPjDQ0-LNDSk0JnSOD___lNXVh_Qf9T3cx_oP-prqa_1S3Y0_q_zX-s1NdTUmdI6v_9-U1NUH9B_1NdTX-g_6mvpL_wMNTX-g1Nf6DAz1tSZ0j-_v0JREjQokaFEhRIUSNCiRoUCNAjRoEaBEhRo0CNGgBnSP9OgQFECCNPpIIVKfDkVaUWmggzoiCFPny5M6PTQIECAGdIjUAGlJnR0DBu5coGrFm0YMEE-kgpxYqChBjxUDNuwQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy92np007s6AFSy9tOXvzQA7O_ryQTd-7L5DQVtpBJ3ZMvg",UK:"QIECBAgQIIcWLGg2EDFy2QIJu_cgZNUETLjQA2TN0xYr2DAodJIECBAgQIEGDB4_PUCBAgQIECBAgQIECBAgQIEANkvaMih0kgQIECDA1Qfv__OgQYGCBAgQIECBAgQIECBAgQIECBAgKHSSBAgQIH6FR-__-v7___oECBAgQIEAORPmxUE6LXpoECAodJIECBAoQKum7______9-gQIECBAgQA82_Zs39-aB8-QIAh0kgQIECBAgSev_____v06BAgQIECBAgQIECBAgQIECBAgKHSSBAgQIECBR00____-_w9GCBAgQIECBAgQIECBAgQIECAodJIECBAgQIECD8rx________ECBAgQIECBAgQIECBAgQICh0kgQIECBAgQLETRlv_______6oECBAgQIECBAgQIECBAgKHSyBAgQIHGQlwYIEH_-_x_____9-dECBAgQIECBAgQIECAIdLIECDAmJbfz_-0RJ0qBV________7sECBAgQIECBAgQIAh0sgQIMzAl-__fX5Sg0JECvX______586IECBAgQIECBAgCHSyBAgwJiW9OjX_0qBAgQIEX________-l8fPjBAgQIECAIdLIEHBYhQIECBQxQICWDhg5fv____________tUCBAgQIAh0sgzIECBAgQIEGlAgQEtP_______________-lQIECBAgCHSyBUwQIECBAgQakCBASQqv_____________-6FAgQIECAIdLIECJygQIECBAgaoEBJBg______________5-OiBAgQIAh0sgQKGKBAgQIEHBKgJIMH7____8v__________QoECBAgCHSyBRmQIECBA4RoECAkgVoVaNel________r16FAgQIECAIdLINCFAgwOEyBAgQICSBAgQePn7___r06RAgQIECBAgQIAh0sgQLeKxCgQIECBAgJIECDR__v0aNGhQIECBAgQIECBAgCHSSBAgQIECBAgQIECBAgQYP3_-1QIECBAgQIECBAgQIECAIdJIECBAgQIECBAgQIECBB6boUSBAgQIECBAgQIECBAgQIAh0kgQIECBAgQIECBAgQIFStAgQIECBAgQIECBAgQIECBAgAzsvjognZe_MFIy4cmzTuy8wdTfwQU-G_l0DVKy-lhyad6A",SPLASH:"QIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECAsaMIEGDx8YIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQICxowg0N2bdmgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgLGjCBFvz9_6BAZQIECBAgQIECAig0NECBAgQIECBAgQIECAsaMcOD5tjyoGCBAgQIECBAgQICLhCgQIECBAgQIECBAgQICxowoTod79ArSEcHBAgQIECBAg0ITKBAgQcGCBAgQIECBAgLGjCBBgXIUCAyRXmlLBAgQIECBuZ4fPn___aoECBAgQIECBAaQIECBAgQIEBFAgQaTPDh8-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmqClvxIJGHlk8oECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmaCplx6ECZBT35unfDyyoJnTIuQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA"},e$1="http://www.w3.org/2000/svg";let r,n,_=0;class h{constructor(){}rt(){return this.nt}_t(){this.nt=null;}ht(t,s){if("object"==typeof t)for(const s in t)null==t[s]?this.nt.removeAttribute(s):this.nt.setAttribute(s,t[s]);else {if(void 0===s)return this.nt.getAttribute(t);null==s?this.nt.removeAttribute(t):this.nt.setAttribute(t,s);}return this}ot(t){if(!this.At(t)){const s=this.gt();s.push(t),this.nt.setAttribute("class",s.join(" "));}return this}At(t){return  -1!==this.gt().indexOf(t)}gt(){const t=this.nt.getAttribute("class");return null==t?[]:t.split(" ")}lt(t){return this.At(t)&&this.nt.setAttribute("class",this.gt().filter(s=>s!==t).join(" ")),this}ct(t){return this.At(t)?this.lt(t):this.ot(t),this}Ct(t,s){if("object"==typeof t)for(const s in t)null==t[s]?delete this.nt.dataset[s]:this.nt.dataset[s]=t[s];else {if(void 0===s)return this.nt.dataset[t];null==s?delete this.nt.dataset[t]:this.nt.dataset[t]=s;}return this}}class o extends h{constructor(t){return super(),r=t,n=r.document,this.nt=n.createElementNS(e$1,"svg"),this.nt.setAttribute("xmlns",e$1),this}Et(t){const s=n.querySelector(t);if(!s)throw Error("@techandsoftware/teletext: E117: addTo failed to match provided selector");return s.appendChild(this.nt),this}It(t){return this.nt.setAttribute("viewBox",t),this}ut(t,s){return this.nt.setAttribute("width",t),this.nt.setAttribute("height",s),this}Bt(t){const s=n.createElementNS(e$1,"style");return s.append(t),this.nt.append(s),this}Qt(){const t=new A;return this.nt.append(t.rt()),t}ft(){return this.nt.clientWidth}dt(){return this.nt.clientHeight}bt(t){const s=new c(t);return this.nt.append(s.rt()),s}}class A extends h{constructor(){return super(),this.nt=n.createElementNS(e$1,"g"),this.yt=[],this}Qt(){const t=new A;return this.nt.append(t.rt()),this.yt.push(t),t}wt(t){const s=new C(t);return this.nt.append(s.rt()),this.yt.push(s),s}St(){const t=new E;return this.nt.append(t.rt()),t}xt(t,s){const i=new u(t,s);return this.nt.append(i.rt()),this.yt.push(i),i}vt(){return this.yt[this.yt.length-1]}Rt(){return this.yt}Ut(t){return this.nt.setAttribute("clip-path",`url("#${t.rt().id}")`),this}Dt(){return this.nt.removeAttribute("clip-path"),this}Lt(){this.nt.parentNode&&this.nt.parentNode.removeChild(this.nt),this.nt=null,this.yt.forEach(t=>t._t()),this.yt=[];}kt(t,s,i,e){const r=new B(t,s,i,e);return this.nt.append(r.rt()),this.yt.push(r),r}Ot(t){const s=new a(t);return this.nt.append(s.rt()),this.yt.push(s),s}Gt(t,s){const i=new l(t,s);return this.nt.append(i.rt()),this.yt.push(i),i}Ft(t,s){const i=new g(t,s);return this.nt.append(i.rt()),this.yt.push(i),i}}class g extends h{constructor(){return super(),this.nt=n.createElementNS(e$1,"svg"),this}attr(...t){return this.ht(...t)}get node(){return this.rt()}}class l extends h{constructor(t,s){return super(),this.nt=n.createElementNS(e$1,"image"),this.nt.setAttribute("width",parseInt(t)),this.nt.setAttribute("height",parseInt(s)),this}attr(...t){return this.ht(...t)}}class a extends h{constructor(t){return super(),this.nt=n.createElementNS(e$1,"use"),this.nt.setAttribute("href","#"+t),this}Ht(t){return this.nt.setAttribute("fill",t),this}Nt(t,s){return this.nt.setAttribute("x",t),this.nt.setAttribute("y",s),this}}class c extends h{constructor(t){return super(),this.nt=n.createElementNS(e$1,"symbol"),this.nt.setAttribute("id",t),this}xt(t,s){const i=new u(t,s);return this.nt.append(i.rt()),i}}class C extends h{constructor(t){return super(),this.nt=n.createElementNS(e$1,"text"),this.nt.append(t),this}wt(t){return this.nt.textContent=t,this}Ht(t){return this.nt.setAttribute("fill",t),this}}class E extends h{constructor(){return super(),this.nt=n.createElementNS(e$1,"defs"),this}jt(){const t=new I;return this.nt.append(t.rt()),t}Pt(t){return [...this.nt.querySelectorAll(t)].map(Q)}xt(t,s){const i=new u(t,s);return this.nt.append(i.rt()),i}}class I extends h{constructor(){return super(),this.nt=n.createElementNS(e$1,"clipPath"),this.nt.setAttribute("id","clipPath-"+_),_++,this}Rt(){return [...this.nt.children].map(Q)}Mt(t){this.nt.appendChild(t.rt());}}class u extends h{constructor(t,s){if(super(),t instanceof r.SVGElement)return this.nt=t,this;const i=t;return this.nt=n.createElementNS(e$1,"rect"),this.nt.setAttribute("width",parseInt(i)),this.nt.setAttribute("height",parseInt(s)),this}Ht(t){return this.nt.setAttribute("fill",t),this}Nt(t,s){return this.nt.setAttribute("x",t),this.nt.setAttribute("y",s),this}ft(t){return void 0===t?parseInt(this.nt.getAttribute("width")):(this.nt.setAttribute("width",parseInt(t)),this)}dt(t){return void 0===t?parseInt(this.nt.getAttribute("height")):(this.nt.setAttribute("height",parseInt(t)),this)}Lt(){this.nt.parentNode&&this.nt.parentNode.removeChild(this.nt),this.nt=null;}}class B extends h{constructor(t,s,i,r){return super(),this.nt=n.createElementNS(e$1,"line"),this.nt.setAttribute("x1",t),this.nt.setAttribute("y1",s),this.nt.setAttribute("x2",i),this.nt.setAttribute("y2",r),this}}function Q(t){let s;if("SVGRectElement"!==t.constructor.name)throw Error("SVG:wrapSVGElement Unable to wrap SVG element of type "+t.constructor.name);return s=new u(t),s}const f={BLACK:Symbol(),RED:Symbol(),GREEN:Symbol(),YELLOW:Symbol(),BLUE:Symbol(),MAGENTA:Symbol(),CYAN:Symbol(),WHITE:Symbol()};Object.freeze(f);const d={Tt:Symbol(),qt:Symbol(),zt:Symbol(),Vt:Symbol()};Object.freeze(d);const p={Jt:Symbol(),Kt:Symbol(),Yt:Symbol(),Xt:Symbol()};Object.freeze(p);const b={0:Symbol(),1:Symbol(),1.5:Symbol(),2.5:Symbol()};Object.freeze(b);class y{static charFromTextColour(t){if(t in x)return x[t];throw Error("Attributes.charFromTextColour: bad colour: "+t)}static charFromGraphicColour(t){if(t in R)return R[t];throw Error("Attributes.charFromGraphicColour: bad colour")}static charFromAttribute(t){if(t in D)return D[t];throw Error("Attributes.charFromAttribute: bad attribute")}}function m(t){return w[t]}Object.assign(y,{TEXT_COLOUR:d.ALPHA,MOSAIC_COLOUR:Symbol(),NEW_BACKGROUND:Symbol(),BLACK_BACKGROUND:Symbol(),CONTIGUOUS_GRAPHICS:d.qt,SEPARATED_GRAPHICS:d.zt,ESC:Symbol(),FLASH:Symbol(),STEADY:Symbol(),NORMAL_SIZE:p.Jt,DOUBLE_HEIGHT:p.Kt,DOUBLE_WIDTH:p.Yt,DOUBLE_SIZE:p.Xt,CONCEAL:Symbol(),HOLD_MOSAICS:Symbol(),RELEASE_MOSAICS:Symbol(),START_BOX:Symbol(),END_BOX:Symbol(),Zt:Symbol()});const w={[f.BLACK]:"#000",[f.RED]:"#f00",[f.GREEN]:"#0f0",[f.YELLOW]:"#ff0",[f.BLUE]:"#00f",[f.MAGENTA]:"#f0f",[f.CYAN]:"#0ff",[f.WHITE]:"#fff"};Object.freeze(w);const S={"\0":f.BLACK,"":f.RED,"":f.GREEN,"":f.YELLOW,"":f.BLUE,"":f.MAGENTA,"":f.CYAN,"":f.WHITE};Object.freeze(S);const x=k(S),v={"":f.BLACK,"":f.RED,"":f.GREEN,"":f.YELLOW,"":f.BLUE,"":f.MAGENTA,"":f.CYAN,"":f.WHITE};Object.freeze(v);const R=k(v),U={"\b":y.FLASH,"\t":y.STEADY,"\n":y.END_BOX,"\v":y.START_BOX,"\f":y.NORMAL_SIZE,"\r":y.DOUBLE_HEIGHT,"":y.DOUBLE_WIDTH,"":y.DOUBLE_SIZE,"":y.CONCEAL,"":y.CONTIGUOUS_GRAPHICS,"":y.SEPARATED_GRAPHICS,"":y.ESC,"":y.BLACK_BACKGROUND,"":y.NEW_BACKGROUND,"":y.HOLD_MOSAICS,"":y.RELEASE_MOSAICS};Object.assign(U,S),Object.assign(U,v),Object.freeze(U);const D=k(U),L={[b[0]]:[1,2,3,4,5,6,7,8,9,17,18,19,20,21,22,23]};function k(t){const s={};for(const i in t)s[t[i]]=i;return Object.freeze(s)}L[b[1]]=[...L[b[0]],10,11,12,13,24,25,26,27,28,29,30,31],L[b[1.5]]=[...L[b[1]],0,16],L[b[2.5]]=[...L[b[1.5]],14,15],Object.freeze(L);const O=10,G=10,F={Wt:{$t:10.4,ts:-5.2},ss:{$t:G,ts:-4.5}};Object.freeze(F);class H{constructor(t,s){this.es=new o(s).It("0 0 400 250").ut(600,500).ht({preserveAspectRatio:"none",style:"font-family: sans-serif"}).Bt("@font-face {\nfont-family: 'Unscii';\nsrc: url('fonts/unscii-16.woff') format('woff'), \nurl('fonts/unscii-16.ttf') format('truetype'),\nurl('fonts/unscii-16.otf') format('opentype');\nunicode-range: U+0000-00FF, U+2022, U+2500, U+2502, U+250C, U+2510, U+2514, U+2518, U+251C, U+251D, U+2524, U+2525, U+252C, U+252F, U+2534, U+2537, U+253C, U+253F, U+2588, U+258C, U+2590, U+2592, U+25CB, U+25CF, U+25E2-25E5, U+2B60-2B63, U+E0C0-E0FF, U+1FB00-1FB70, U+1FB75, U+1FBA0-1FBA7;\n-webkit-font-smoothing: none;\nfont-smooth: never;\n}\n@font-face {\nfont-family: 'Bedstead';\nsrc: url('fonts/bedstead.otf') format('opentype');\nunicode-range: U+0000-00FF;\n}\n@keyframes blink {\nto {\nvisibility: hidden;\n}\n}\n@keyframes fancyblink {\nfrom {\nfilter: none;\nopacity: 0.7;\n}\n33% {\nfilter: none;\nopacity: 1;\n}\n66% {\nfilter: blur(0px);\nopacity: 1;\n}\n95% {\nfilter: blur(4px);\nopacity: 0;\n}\nto {\nfilter: blur(0px);\nopacity: 0;\n}\n}\n#textlayer {\nfont-size: 10px;\n}\n.mosaic {\nfont-family: 'Unscii';\nfont-size: 10.3px;\n}\n.mosaic_separated {\nfont-family: 'Unscii';\nfont-size: 10px;\n}\n.flash_flashing .flash {\n/* animation: blink 2s steps(3, start) infinite; */\nanimation: fancyblink 2s linear infinite;\n}\n.conceal_concealed  .conceal {\nvisibility: hidden;\n}\nsvg #background {\ntransition-property: opacity;\ntransition-duration: 0.25s;\n}\nsvg {\nbackground-color: transparent;\n}\nsvg use {\nshape-rendering: crispEdges;\n}\nrect { color: orange; }\n"),this.d=this.es.Qt().ht("class","conceal_concealed flash_flashing"),this.rs=1.2,this.ns(),this._s(),this.hs=null,this.As=t,this.gs=this.As.cs.ls(()=>this.Cs()),this.Es=false,this.Is=false,this.us=false,this.Bs={};}Et(t){this.es.Et(t);}Qs(){this.As.cs.Qs(this.gs),this.gs=null;}Cs(){let t=false,s=false;this.us=false,this.d.lt("flash_flashing"),this.fs.forEach((i,e)=>{let r=false;if(this.ds(e),t)return t=false,void this.ps(i,e);const n=this.As.bs(e);let _,h;i.forEach((t,i)=>{if(r)return r=false,this.ys(t),this.ws(e),void(h&&this.Ss());const o=n.xs(i),A=m(o.vs),g=o.Rs(),l=m(o.Us),a=this.Ds(o.Ls,g,o.et);this.ks(t,o,a,l,i,e,g),o.Os&&(h?this.Ss():this.Gs(e,i),this.us=true),_==A?this.ws(e):this.Fs(e,i,A),o.ut!=p.Yt&&o.ut!=p.Xt||(r=true),_=A,h=o.Os,o.Hs&&(s=true);}),n.Ns?(this.js(e),this.Ps(),t=true):t=false,this.Ms(e);}),"Ts"in this.Bs&&this.Bs.Ts(this.es.ft(),this.es.dt()),this.d.ot("conceal_concealed"),s&&setTimeout(()=>this.d.ot("flash_flashing"),100),this.qs();}ds(t){this.zs(t),this.Vs(t);}ps(t,s){"Js"in this.Bs&&this.Bs.Js(t.length,s),t.forEach(t=>this.ys(t));}ys(t){t.wt(" ").ht({dx:null,dy:null,textLength:null,lengthAdjust:null,"text-anchor":null,transform:null,class:null});}ks(t,s,i,e,r,n,_){this.Ks(t,s,i,e,r,n),s.Ls==d.qt&&_||s.Ls==d.Vt?t.ot("mosaic"):s.Ls==d.zt&&_&&t.ot("mosaic_separated");}Ks(t,s,i,e,r,n){t.wt(s.Ys).ht(i).Ht(e),s.ut==p.Kt?t.ht("transform",`translate(0 ${q(n)}) scale(1 2)`):s.ut==p.Yt?t.ht("transform",`translate(${z(r)} 0) scale(2 1)`):s.ut==p.Xt&&t.ht("transform",`translate(${z(r)} ${q(n)}) scale(2 2)`),s.Hs&&t.ot("flash"),s.Xs&&t.ot("conceal");}Zs(){this.d.ct("conceal_concealed");}Ws(t){let s=t;"native"==t?s='-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif':"default"==t&&(s="sans-serif"),this.es.ht("style","font-family: "+s);}$s(){this.hs?(this.hs.Lt(),this.hs=null):this.ti();}si(){this.Is?(this.Is=false,this.ii.ht("opacity",null).Dt()):(this.Is=true,this.ei());}ri(t){this.rs=t,this.ni(this.es.dt());}ni(t){this.es.ut("natural"==this.rs?1.6*t:t*this.rs,t);}ei(){this.Es&&this.us?this.ii.ht("opacity",.3):this.us?this.ii.Ut(this._i).ht("opacity",.3):this.ii.ht("opacity",0);}qs(){this.Is&&this.ei();}hi(){this.Es?(this.d.Dt(),this.Es=false):(this.d.Ut(this._i),this.Es=true),this.qs();}oi(){return this.es.rt().outerHTML}ti(){this.hs=this.d.Qt();for(let t=0;t<25;t++)this.hs.kt(0,t*O,399,t*O).ht({stroke:"#555","stroke-width":.5});for(let t=0;t<40;t++)this.hs.kt(t*G,0,t*G,249).ht({stroke:"#555","stroke-width":.5});}_s(){this.Ai=this.d.St(),this.gi=null,this._i=this.Ai.jt();}ns(){this.li(),this.ai();}li(){const t=this.d.Qt();t.ht({"shape-rendering":"crispEdges",id:"background"}),this.ci=[],this.ii=t;}ai(){const t=[],s=this.d.Qt().ht({"text-anchor":"middle",fill:"#fff"}).ht("id","textlayer");for(let i=0;i<25;i++){const e=[];for(let t=0;t<40;t++)e.push(s.wt(V()).ht({x:t*G+5,y:i*O+8}));t.push(e);}this.fs=t,this.Ci=s;}Vs(t){this._i.Rt().filter(s=>s.Ct("r")==t).forEach(t=>t.Lt());}zs(t){this.ci[t]&&this.ci[t].Lt(),this.ci[t]=this.ii.Qt();}ws(t){const s=this.ci[t].vt(),i=s.ft();s.ft(i+G);}Fs(t,s,i){const e=s*G,r=t*O;this.ci[t].xt(G,O).Ht(i).Nt(e,r);}Ss(){const t=this.gi.ft();this.gi.ft(t+G);}js(t){this.ci[t].Rt().forEach(t=>t.ht("height",20));}Ps(){this.Ai.Pt("[data-boxbuffer]").forEach(t=>t.dt(20));}Gs(t,s){const i=s*G,e=t*O;this.gi=this.Ai.xt(G,O).Ct("boxbuffer",true).Nt(i,e);}Ms(t){this.Ai.Pt("[data-boxbuffer]").forEach(s=>{s.Ct({r:t,boxbuffer:null}),this._i.Mt(s);});}Ds(t,s,i){return t==d.qt&&s||t==d.Vt?{dx:F.Wt.ts,dy:-0.15,textLength:F.Wt.$t,lengthAdjust:"spacingAndGlyphs","text-anchor":"start",transform:null,class:null}:t==d.zt&&s?{dx:F.ss.ts,dy:null,textLength:F.ss.$t,lengthAdjust:"spacingAndGlyphs","text-anchor":"start",transform:null,class:null}:{dx:null,dy:null,textLength:i?G:null,lengthAdjust:i?"spacingAndGlyphs":null,"text-anchor":null,transform:null,class:null}}registerPlugin(t,s){return "renderBackground"in s&&(this.Bs.Ei=s.renderBackground),"renderMosaic"in s&&(this.Bs.Ii=s.renderMosaic),"endOfPageUpdate"in s&&(this.Bs.Ts=s.endOfPageUpdate),"clearCellsForRow"in s&&(this.Bs.Js=s.clearCellsForRow),{lookupColour:N,isDoubleHeight:j,isDoubleWidth:P,isDoubleSize:M,isSeparatedMosaic:T,createImageOverlay:this.ui.bind(this),createSVGOverlay:this.Bi.bind(this)}}ui(){const t=this.d.Gt(400,250);return t.ht("preserveAspectRatio","none"),t}Bi(){const t=this.d.Ft();return t.ht("preserveAspectRatio","none"),t}}H.Qi=G,H.fi=O,H.di=20,H.pi=20,H.bi=400,H.yi=250,H.mi=F,H.ROWS=25,H.COLS=40;const N=t=>m(t),j=t=>t==p.Kt,P=t=>t==p.Yt,M=t=>t==p.Xt,T=t=>t==d.zt,q=t=>0-t*O,z=t=>0-t*G;function V(){return String.fromCharCode(32+95*Math.random())}const J={g0_latin:{$:"¤","":"■"},g0_latin__czech_slovak:{"#":"#",$:"ů","@":"č","[":"ť","\\":"ž","]":"ý","^":"í",_:"ř","`":"é","{":"á","|":"|","}":"ú","~":"š"},g0_latin__english:{"#":"£",$:"$","@":"@","[":"←","\\":"½","]":"→","^":"↑",_:"#","`":"—","{":"¼","|":"‖","}":"¾","~":"÷"},g0_latin__estonian:{"#":"#",$:"õ","@":"Š","[":"Ä","\\":"Ö","]":"Ž","^":"Ü",_:"Õ","`":"š","{":"ä","|":"ö","}":"ž","~":"ü"},g0_latin__french:{"#":"é",$:"ï","@":"à","[":"ë","\\":"ê","]":"ù","^":"î",_:"#","`":"è","{":"â","|":"ô","}":"û","~":"ç"},g0_latin__german:{"#":"#",$:"$","@":"§","[":"Ä","\\":"Ö","]":"Ü","^":"^",_:"_","`":"°","{":"ä","|":"ö","}":"ü","~":"ß"},g0_latin__italian:{"#":"£",$:"$","@":"é","[":"°","\\":"ç","]":"→","^":"↑",_:"#","`":"ù","{":"à","|":"ò","}":"è","~":"ì"},g0_latin__latvian_lithuanian:{"#":"#",$:"$","@":"Š","[":"ė","\\":"ę","]":"Ž","^":"č",_:"ū","`":"š","{":"ą","|":"ų","}":"ž","~":"į"},g0_latin__polish:{"#":"#",$:"ń","@":"ą","[":"Ƶ","\\":"Ś","]":"Ł","^":"ć",_:"ó","`":"ę","{":"ż","|":"ś","}":"ł","~":"ź"},g0_latin__portuguese_spanish:{"#":"ç",$:"$","@":"¡","[":"á","\\":"é","]":"í","^":"ó",_:"ú","`":"¿","{":"ü","|":"ñ","}":"è","~":"à"},g0_latin__romanian:{"#":"#",$:"¤","@":"Ț","[":"Â","\\":"Ș","]":"Ă","^":"Î",_:"ı","`":"ț","{":"â","|":"ș","}":"ă","~":"î"},g0_latin__serbian_croatian_slovenian:{"#":"#",$:"Ë","@":"Č","[":"Ć","\\":"Ž","]":"Đ","^":"Š",_:"ë","`":"č","{":"ć","|":"ž","}":"đ","~":"š"},g0_latin__swedish_finnish_hungarian:{"#":"#",$:"¤","@":"É","[":"Ä","\\":"Ö","]":"Å","^":"Ü",_:"_","`":"é","{":"ä","|":"ö","}":"å","~":"ü"},g0_latin__turkish:{"#":"₺",$:"ğ","@":"İ","[":"Ş","\\":"Ö","]":"Ç","^":"Ü",_:"Ğ","`":"ı","{":"ş","|":"ö","}":"ç","~":"ü"},g2_latin:{0:"°",1:"±",2:"²",3:"³",4:"×",5:"µ",6:"¶",7:"·",8:"÷",9:"’","!":"¡",'"':"¢","#":"£","%":"¥","&":"#","'":"§","(":"¤",")":"‘","*":"“","+":"«",",":"←","-":"↑",".":"→","/":"↓",":":"”",";":"»","<":"¼","=":"½",">":"¾","?":"¿","@":" ",A:"̀",B:"́",C:"̂",D:"̃",E:"̄",F:"̆",G:"̇",H:"̈",I:"̣",J:"̊",K:"̧",L:"̲",M:"̋",N:"̨",O:"̌",P:"—",Q:"¹",R:"®",S:"©",T:"™",U:"♪",V:"₠",W:"‰",X:"α",Y:null,Z:null,"[":null,"\\":"⅛","]":"⅜","^":"⅝",_:"⅞","`":"Ω",a:"Æ",b:"Ð",c:"ª",d:"Ħ",e:null,f:"Ĳ",g:"Ŀ",h:"Ł",i:"Ø",j:"Œ",k:"º",l:"Þ",m:"Ŧ",n:"Ŋ",o:"ŉ",p:"ĸ",q:"æ",r:"đ",s:"ð",t:"ħ",u:"ı",v:"ĳ",w:"ŀ",x:"ł",y:"ø",z:"œ","{":"ß","|":"þ","}":"ŧ","~":"ŋ","":"■"},g0_greek:{"<":"«",">":"»","@":"ΐ",A:"Α",B:"Β",C:"Γ",D:"Δ",E:"Ε",F:"Ζ",G:"Η",H:"Θ",I:"Ι",J:"Κ",K:"Λ",L:"Μ",M:"Ν",N:"Ξ",O:"Ο",P:"Π",Q:"Ρ",R:"ʹ",S:"Σ",T:"Τ",U:"Υ",V:"Φ",W:"Χ",X:"Ψ",Y:"Ω",Z:"Ϊ","[":"Ϋ","\\":"ά","]":"έ","^":"ή",_:"ί","`":"ΰ",a:"α",b:"β",c:"γ",d:"δ",e:"ε",f:"ζ",g:"η",h:"θ",i:"ι",j:"κ",k:"λ",l:"μ",m:"ν",n:"ξ",o:"ο",p:"π",q:"ρ",r:"ς",s:"σ",t:"τ",u:"υ",v:"φ",w:"χ",x:"ψ",y:"ω",z:"ϊ","{":"ϋ","|":"ό","}":"ύ","~":"ώ","":"■"},g2_greek:{0:"°",1:"±",2:"²",3:"³",4:"×",5:"m",6:"n",7:"p",8:"÷",9:"’","!":"a",'"':"b","#":"£",$:"e","%":"h","&":"i","'":"§","(":":",")":"‘","*":"“","+":"k",",":"←","-":"↑",".":"→","/":"↓",":":"”",";":"t","<":"¼","=":"½",">":"¾","?":"x","@":" ",A:"̀",B:"́",C:"̂",D:"̃",E:"̄",F:"̆",G:"̇",H:"̈",I:"̣",J:"̊",K:"̧",L:"̲",M:"̋",N:"̨",O:"̌",P:"?",Q:"¹",R:"®",S:"©",T:"™",U:"♪",V:"₠",W:"‰",X:"ɑ",Y:"Ί",Z:"Ύ","[":"Ώ","\\":"⅛","]":"⅜","^":"⅝",_:"⅞","`":"C",a:"D",b:"F",c:"G",d:"J",e:"L",f:"Q",g:"R",h:"S",i:"U",j:"V",k:"W",l:"Y",m:"Z",n:"Ά",o:"Ή",p:"c",q:"d",r:"f",s:"g",t:"j",u:"l",v:"q",w:"r",x:"s",y:"u",z:"v","{":"w","|":"y","}":"z","~":"Έ","":"■"},g0_cyrillic:{"@":"Ю",A:"А",B:"Б",C:"Ц",D:"Д",E:"Е",F:"Ф",G:"Г",H:"Х",I:"И",J:"Ѝ",K:"К",L:"Л",M:"М",N:"Н",O:"О",P:"П",Q:"Я",R:"Р",S:"С",T:"Т",U:"У",V:"Ж",W:"В",X:"Ь",Z:"З","[":"Ш","]":"Щ","^":"Ч","`":"ю",a:"а",b:"б",c:"ц",d:"д",e:"е",f:"ф",g:"г",h:"х",i:"и",j:"ѝ",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",q:"я",r:"р",s:"с",t:"т",u:"у",v:"ж",w:"в",x:"ь",z:"з","{":"ш","}":"щ","~":"ч","":"■"},g0_cyrillic__russian_bulgarian:{"&":"ы",Y:"Ъ","\\":"Э",_:"Ы",y:"ъ","|":"э"},g0_cyrillic__serbian_croatian:{"@":"Ч",J:"Ј",Q:"Ќ",V:"В",W:"Ѓ",X:"Љ",Y:"Њ","[":"Ћ","\\":"Ж","]":"Ђ","^":"Ш",_:"Џ","`":"ч",j:"ј",q:"ќ",v:"в",w:"ѓ",x:"љ",y:"њ","{":"ћ","|":"ж","}":"ђ","~":"ш"},g0_cyrillic__ukranian:{"&":"ї",Y:"І","\\":"Є",_:"Ї",y:"і","|":"є"},g2_cyrillic:{0:"m",1:"n",2:"p",3:"t",4:"x",5:"x",6:"°",7:"±",8:"²",9:"³","!":"a",'"':"b","#":"£",$:"e","%":"h","&":"i","'":"§","(":":",")":"‘","*":"“","+":"k",",":"←","-":"↑",".":"→","/":"↓",":":"¼",";":"½","<":"¾","=":"÷",">":"’","?":"”","@":" ",A:"̀",B:"́",C:"̂",D:"̃",E:"̄",F:"̆",G:"̇",H:"̈",I:"̣",J:"̊",K:"̧",L:"̲",M:"̋",N:"̨",O:"̌",P:"?",Q:"©",R:"®",S:"¹",T:"ɑ",U:"Ί",V:"Ύ",W:"Ώ",X:"‰",Y:"₠",Z:"™","[":"⅛","\\":"⅜","]":"⅝","^":"⅞",_:"♪","`":"C",a:"D",b:"F",c:"G",d:"J",e:"L",f:"Q",g:"R",h:"S",i:"U",j:"V",k:"W",l:"Y",m:"Z",n:"Ά",o:"Ή",p:"c",q:"d",r:"f",s:"g",t:"j",u:"l",v:"q",w:"r",x:"s",y:"u",z:"v","{":"w","|":"y","}":"z","~":"Έ","":"■"},g0_arabic:{"#":"£","&":"ﻰ","'":"ﻱ","(":")",")":"(",";":"؛","<":">",">":"<","?":"؟","@":"ﺔ",A:"ﺀ",B:"ﺒ",C:"ﺏ",D:"ﺘ",E:"ﺕ",F:"ﺎ",G:"ﺍ",H:"ﺑ",I:"ﺓ",J:"ﺗ",K:"ﺛ",L:"ﺟ",M:"ﺣ",N:"ﺧ",O:"ﺩ",P:"ﺫ",Q:"ﺭ",R:"ﺯ",S:"ﺳ",T:"ﺷ",U:"ﺻ",V:"ﺿ",W:"ﻃ",X:"ﻇ",Y:"ﻋ",Z:"ﻏ","[":"ﺜ","\\":"ﺠ","]":"ﺤ","^":"ﺨ",_:"#","`":"ـ",a:"ﻓ",b:"ﻗ",c:"ﻛ",d:"ﻟ",e:"ﻣ",f:"ﻧ",g:"ﻫ",h:"ﻭ",i:"ﻰ",j:"ﻳ",k:"ﺙ",l:"ﺝ",m:"ﺡ",n:"ﺥ",o:"ﻴ",p:"ﻯ",q:"ﻌ",r:"ﻐ",s:"ﻔ",t:"ﻑ",u:"ﻘ",v:"ﻕ",w:"ﻙ",x:"ﻠ",y:"ﻝ",z:"ﻤ","{":"ﻡ","|":"ﻨ","}":"ﻥ","~":"ﻻ","":"■"},g2_arabic:{0:"٠",1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩","!":"ﻉ",'"':"ﺁ","#":"ﺃ",$:"ﺅ","%":"ﺇ","&":"ﺋ","'":"ﺊ","(":"ﭼ",")":"ﭽ","*":"ﭺ","+":"ﭘ",",":"ﭙ","-":"ﭖ",".":"ﮊ","/":"ﮔ",":":"ﻎ",";":"ﻍ","<":"ﻼ","=":"ﻬ",">":"ﻪ","?":"ﻩ","@":"à","[":"ë","\\":"ê","]":"ù","^":"î",_:"ﻊ","`":"é","{":"â","|":"ô","}":"û","~":"ç","":"■"},g0_hebrew:{"#":"£","[":"←","\\":"½","]":"→","^":"↑",_:"#","`":"א",a:"ב",b:"ג",c:"ד",d:"ה",e:"ו",f:"ז",g:"ח",h:"ט",i:"י",j:"ך",k:"כ",l:"ל",m:"ם",n:"מ",o:"ן",p:"נ",q:"ס",r:"ע",s:"ף",t:"פ",u:"ץ",v:"צ",w:"ק",x:"ר",y:"ש",z:"ת","{":"₪","|":"‖","}":"¾","~":"÷","":"■"},g1_block_mosaic_to_unicode__legacy_computing:{0:"🬏",1:"🬐",2:"🬑",3:"🬒",4:"🬓",5:"▌",6:"🬔",7:"🬕",8:"🬖",9:"🬗"," ":" ","!":"🬀",'"':"🬁","#":"🬂",$:"🬃","%":"🬄","&":"🬅","'":"🬆","(":"🬇",")":"🬈","*":"🬉","+":"🬊",",":"🬋","-":"🬌",".":"🬍","/":"🬎",":":"🬘",";":"🬙","<":"🬚","=":"🬛",">":"🬜","?":"🬝","`":"🬞",a:"🬟",b:"🬠",c:"🬡",d:"🬢",e:"🬣",f:"🬤",g:"🬥",h:"🬦",i:"🬧",j:"▐",k:"🬨",l:"🬩",m:"🬪",n:"🬫",o:"🬬",p:"🬭",q:"🬮",r:"🬯",s:"🬰",t:"🬱",u:"🬲",v:"🬳",w:"🬴",x:"🬵",y:"🬶",z:"🬷","{":"🬸","|":"🬹","}":"🬺","~":"🬻","":"█"},g1_block_mosaic_to_unicode__unscii_separated:{0:"",1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""," ":" ","!":"",'"':"","#":"",$:"","%":"","&":"","'":"","(":"",")":"","*":"","+":"",",":"","-":"",".":"","/":"",":":"",";":"","<":"","=":"",">":"","?":"","`":"",a:"",b:"",c:"",d:"",e:"",f:"",g:"",h:"",i:"",j:"",k:"",l:"",m:"",n:"",o:"",p:"",q:"",r:"",s:"",t:"",u:"",v:"",w:"",x:"",y:"",z:"","{":"","|":"","}":"","~":"","":""},g3:{0:"🭇",1:"🭈",2:"🭉",3:"🭊",4:"🭋",5:"◢",6:"🭌",7:"🭍",8:"🭎",9:"🭏"," ":"🬼","!":"🬽",'"':"🬾","#":"🬿",$:"🭀","%":"◣","&":"🭁","'":"🭂","(":"🭃",")":"🭄","*":"🭅","+":"🭆",",":"🭨","-":"🭩",".":"🭰","/":"▒",":":"🭐",";":"🭑","<":"🭪","=":"🭫",">":"🭵","?":"█","@":"┷",A:"┯",B:"┝",C:"┥",D:"🮤",E:"🮥",F:"🮦",G:"🮧",H:"🮠",I:"🮡",J:"🮢",K:"🮣",L:"┿",M:"•",N:"●",O:"○",P:"│",Q:"─",R:"┌",S:"┐",T:"└",U:"┘",V:"├",W:"┤",X:"┬",Y:"┴",Z:"┼","[":"→","\\":"←","]":"↑","^":"↓",_:" ","`":"🭒",a:"🭓",b:"🭔",c:"🭕",d:"🭖",e:"◥",f:"🭗",g:"🭘",h:"🭙",i:"🭚",j:"🭛",k:"🭜",l:"🭬",m:"🭭",n:null,o:null,p:"🭝",q:"🭞",r:"🭟",s:"🭠",t:"🭡",u:"◤",v:"🭢",w:"🭣",x:"🭤",y:"🭥",z:"🭦","{":"🭧","|":"🭮","}":"🭯","~":null,"":null}},K={};class Y{constructor(t){this.type=t.Ls,this.flashing=t.Hs,this.concealed=t.Xs,this.size=t.ut,this.sextants=t.wi();}}class X{constructor(){this.Si=" ",this.xi=" ",this.Ri=f.WHITE,this.Ui=f.BLACK,this.Di=d.Tt,this.Li=false,this.ki=p.Jt,this.Oi=false,this.Gi=false,this.Fi=null,this.Hi=false,this.Ni=null,this.ji=null;}set Pi(t){this.Si=t;}get Pi(){return this.Si}set Us(t){this.Ri=t;}get Us(){return this.Ri}set vs(t){this.Ui=t;}get vs(){return this.Ui}get et(){return this.Hi}Mi(s){const i=this.Di==d.qt||this.Di==d.zt;this.Di==d.Tt||!(32&this.Si.charCodeAt(0))&&i?(this.xi=W(this.Si,s),this.Ni>0&&(this.xi+=J.g2_latin[String.fromCharCode(this.Ni+64)]),this.Hi=false,"g0_arabic"!=s&&"g2_arabic"!=s||(this.Hi=t$1.et(this.xi))):this.Di==d.qt?this.xi=W(this.Si,"g1_block_mosaic_to_unicode__legacy_computing"):this.Di==d.zt?this.xi=W(this.Si,"g1_block_mosaic_to_unicode__unscii_separated"):this.Di==d.Vt&&(this.xi=W(this.Si,"g3")),this.Fi=null;}Ti(t){if(this.Di!=d.qt&&this.Di!=d.zt||!t.qi)this.Fi=null,this.xi=" ";else {this.Fi=t.Ys,this.Di=t.Ls;let s="g1_block_mosaic_to_unicode__legacy_computing";this.Di==d.zt&&(s="g1_block_mosaic_to_unicode__unscii_separated"),this.xi=W(t.Ys,s);}}get Ys(){return this.xi}get Ls(){return this.Di}set Ls(t){this.Di=t;}set Hs(t){this.Li=t;}get Hs(){return this.Li}get ut(){return this.ki}set ut(t){this.ki=t;}set Xs(t){this.Oi=t;}get Xs(){return this.Oi}set Os(t){this.Gi=t;}get Os(){return this.Gi}Rs(){const t=null!=this.Fi?this.Fi.charCodeAt(0):this.Si.charCodeAt(0);return t<=127&&!(32&~t)}zi(){const t=this.Si.charCodeAt(0);return (this.Di==d.qt||this.Di==d.zt)&&t<=127&&!(32&~t)}wi(){const t=null!=this.Fi?this.Fi.charCodeAt(0):this.Si.charCodeAt(0);if(t>127)return null;if(t in K)return K[t];const s=t>=96?t-64:t-32,i=[];for(let t=0;t<6;t++)i.push(s&1<<t?"1":"0");return K[t]=i,i}}class Z extends X{constructor(t){super(),Object.assign(this,t);}set Vi(t){this.Ni=t;}get Vi(){return this.Ni}set Ji(t){this.ji=t;}get Ys(){return null==this.ji?this.xi:this.ji}}function W(t,s){if(!(s in J))throw Error("Cell getCharWithEncoding: bad encoding: "+s);if(t in J[s])return J[s][t];const i=s.match(/^(.+)__/);if(null!=i){const e=i[1];if(t in J[e])return J[s][t]=J[e][t],J[e][t]}return t}class $ extends H{constructor(t,s,i){super(t,i),this.Ki=s,this.Yi=new Set;}ns(){super.ns(),this.Xi=[],this.Zi=this.d.Qt();}ds(t){super.ds(t),this.Wi(t);}ks(t,s,i,e,r,n,_){"Ei"in this.Bs&&this.Bs.Ei(n,r,s.ut,s.vs),s.Ls!=d.Tt&&s.Ls!=d.Vt&&_?_&&(t.wt(" ").ht(i),this.$i(n,r,s,e)):(this.Ks(t,s,i,e,r,n),s.Ls==d.Vt&&t.ot("mosaic"));}$i(t,s,i,e){if("Ii"in this.Bs){const r=new Y(i);if(this.Bs.Ii(t,s,r,e))return}const r=i.wi();if(!r.includes("1"))return;const n=(i.Ls==d.qt?"c":"s")+r.join("");let _,h=H.Qi,o=H.fi;if(i.Ls==d.qt&&(h=H.Qi+.3,o=H.fi+.2),!this.Yi.has(n)){this.Yi.add(n);const t=this.es.bt(n);if(i.Ls==d.qt){t.ht({preserveAspectRatio:"none",width:h,height:o,viewBox:"0 0 12 18"});for(let s=0;s<6;s++)"1"==r[s]&&t.xt(6,6).Nt(s%2*6,6*Math.floor(s/2));}else {t.ht({preserveAspectRatio:"none",width:h,height:o,viewBox:"0 0 12 18"});for(let s=0;s<6;s++)"1"==r[s]&&t.xt(4,4).Nt(s%2*6+1,6*Math.floor(s/2)+2);}}_=i.Ls==d.qt?this.Xi[t].Ot(n).Nt(s*H.Qi-.15,t*H.fi-.1).Ht(e):this.Xi[t].Ot(n).Nt(s*H.Qi,t*H.fi).Ht(e),this.Ki&&_.ht({width:h,height:o}),i.ut!=p.Kt&&i.ut!=p.Xt||_.ht("height",H.pi),i.ut!=p.Yt&&i.ut!=p.Xt||_.ht("width",H.di),i.Hs&&_.ot("flash"),i.Xs&&_.ot("conceal");}Wi(t){this.Xi[t]&&this.Xi[t].Lt(),this.Xi[t]=this.Zi.Qt();}Ds(t,s,i){return t==d.Vt?{dx:H.mi.Wt.ts,dy:-0.15,textLength:H.mi.Wt.$t,lengthAdjust:"spacingAndGlyphs","text-anchor":"start",transform:null,class:null}:{dx:null,dy:null,textLength:i?H.Qi:null,lengthAdjust:i?"spacingAndGlyphs":null,"text-anchor":null,transform:null,class:null}}}class tt{constructor(t){this.As=t,this.te=0,this.se=0,this.ie=[];}pos(t,s){return (t=parseInt(t))<0||t>39||(s=parseInt(s))<0||s>24||(this.te=t,this.se=s),this}putG0(t,s){let i=null;if(void 0!==s){const t=parseInt(s);t>=0&&t<=15&&(i=t);}const e=t.charCodeAt(0);return e<32||e>127||this.ie.push({ee:this.te,re:this.se,Ls:"g0",Ys:t,Vi:i}),this}putG1(t){const s=t.charCodeAt(0);return s<32||s>127||s>=64&&s<=95||this.ie.push({ee:this.te,re:this.se,Ls:"g1",Ys:t}),this}putG2(t){const s=t.charCodeAt(0);return s<32||s>127||this.ie.push({ee:this.te,re:this.se,Ls:"g2",Ys:t}),this}putG3(t){const s=t.charCodeAt(0);return s<32||s>127||this.ie.push({ee:this.te,re:this.se,Ls:"g3",Ys:t}),this}putAt(){return this.ie.push({ee:this.te,re:this.se,Ls:"char",Ys:"@"}),this}end(){return this.As.ne(this.ie),this.As._e(),this}}class st extends H{}const it=["SPLASH","ENGINEERING","ADVERT","UK"];class et{constructor(t,s){if(this.he=null,"object"==typeof window&&(this.he=window),this.oe={Ae:true},"object"==typeof s&&("webkitCompat"in s&&!s.webkitCompat&&(this.oe.Ae=false),"dom"in s&&(this.he=s.dom)),null==this.he)throw Error("TeletextController E24: No window dom object available");this.ge=new $(t,this.oe.Ae,this.he),this.As=t,this.le=1,this.ae=0,this.ce(),this.Ce=null,this.Ee=null,this.Ie=0,this.ue=0,this.Be=null;}setRowFromOutputLine(s,i){const e=t$1.st(i);this.As.Qe(s,e);}setRow(t,s){this.As.Qe(t,s);}setPageFromOutputLines(s,i){const e=t$1.it(s);void 0!==i&&(e[0]=this.fe(i)),this.setPageRows(e);}setPageRows(t){this.As.de(),this.As.pe(t);}fe(s){return (s=t$1.st(s)).join("").substring(0,32).padStart(40," ")}showTestPage(){this.loadPageFromEncodedString(i$1[it[this.ae]]),this.ae++,4==this.ae&&(this.ae=0);}showRandomisedPage(){const t=[];for(let s=0;s<25;s++){const s=[];for(let t=0;t<40;t++)s.push(String.fromCharCode(127*Math.random()));t.push(s.join(""));}this.setPageRows(t);}loadPageFromEncodedString(s,i){const e=t$1.tt(s,this.he.atob);void 0!==i&&(e[0]=this.fe(i)),this.setPageRows(e);}ce(){this.he.addEventListener("ttx.reveal",()=>this.ge.Zs()),this.he.addEventListener("ttx.mix",()=>this.ge.si()),this.he.addEventListener("ttx.subtitlemode",()=>this.ge.hi());}toggleReveal(){this.ge.Zs();}toggleMixMode(){this.ge.si();}toggleBoxMode(){this.ge.hi();}toggleGrid(){this.ge.$s();}setLevel(t){this.As.be(t);}addTo(t){this.ye=t,this.ge.Et(t);}setFont(t){this.Be=t,this.ge.Ws(t);}clearScreen(t){this.As.de(),this.As.me(t);}setAspectRatio(t){if("natural"==t)return void this.ge.ri(t);const s=parseFloat(t);if(Number.isNaN(s))throw Error("E80 setAspectRatio: bad number");this.ge.ri(s);}setHeight(t){const s=parseFloat(t);if(Number.isNaN(s))throw Error("E98 setHeight: bad number");this.ge.ni(s),this.Ee=s;}setDefaultG0Charset(t,s){if(null==t.match(/g0_/))throw Error("E130 setDefaultG0Charset: Bad g0 set");this.As.we(t,s);}setSecondG0Charset(t,s){if(null==t.match(/g0_/))throw Error("E136 setSecondG0Charset: Bad g0 set");this.As.Se(t,s);}setG2Charset(t,s){if(null==t.match(/g2_/))throw Error("E142 setG2Charset: Bad g2 set");this.As.xe(t,s);}remove(){if(this.ge.Qs(),this.ye){const t=document.querySelector(this.ye);t&&t.removeChild(t.firstChild);}this.ge=null;}setView(t){switch(this.remove(),t){case "classic__font-for-mosaic":this.ge=new st(this.As,this.he);break;case "classic__graphic-for-mosaic":this.ge=new $(this.As,this.oe.Ae,this.he);break;default:throw Error("setView E126: bad view name:"+t)}this.Ee&&this.ge.ni(this.Ee),this.Be&&this.ge.Ws(this.Be),this.ye&&this.ge.Et(this.ye),this.As._e();}registerViewPlugin(t){t.registerWithView(this.ge),this.As._e();}enhance(){return new tt(this.As)}writeBytes(t,s,i){this.As.ve(t,s,i);}writeByte(t,s,i,e){this.As.Re(t,s,i,e);}plot(t,s){this.As.Ue(t,s);}plotPoints(t,s,i,e){this.As.De(t,s,i,e);}getBytes(){return this.As.Le()}getScreenImage(){return this.ge.oi()}updateDisplay(){this.As._e();}}class rt{constructor(t){this.ke=t,this.Oe=[];}ls(t){return this.Oe.push(t),this.Oe.length-1}_e(t){this.Oe.forEach(s=>null!=s&&s(this.ke,t));}Qs(t){this.Oe[t]=null;}}class nt{constructor(){this.Ge=false,this.Fe=[];}get Ns(){return this.Ge}set Ns(t){this.Ge=t;}He(t){this.Fe.push(t);}xs(t){if(t>=this.Fe.length)throw Error("RowModel.getCell E20 bad cell index");return this.Fe[t]}}const _t=25,ht=40,ot=[b[1.5],b[2.5]],At=new class{constructor(){this.Ne=[];for(let t=0;t<_t;t++){const t=[];for(let s=0;s<ht;s++)t.push(new X);this.Ne.push(t);}this.je="g0_latin",this.Pe=null,this.Me="g2_latin",this.Te=y.charFromAttribute(y.START_BOX),this.qe=y.charFromAttribute(y.END_BOX),this.ze=b[1],this.Ve=[],this.cs=new rt(this);}_e(){this.cs._e();}Qe(t,s){if(t>=_t)throw Error("PageModel E29 bad row number");this.Je(t,s),this.cs._e();}pe(t){(t=t.slice(0,_t)).forEach((t,s)=>{this.Je(s,t);}),this.cs._e();}ve(t,s,i){for(let e=s,r=0;e<_t&&r<i.length;e++,r++){const s=[...i[r]].slice(0,ht-t);for(let i=t,r=0;i<ht&&r<s.length;i++,r++)this.Ne[e][i].Pi=s[r];}this.cs._e();}Re(t,s,i,e){t>=0&&t<ht&&s>=0&&s<_t&&(this.Ne[s][t].Pi=i),void 0!==e&&e&&this.cs._e();}Ue(t,s,i){const e=Math.floor(s/3),r=Math.floor(t/2),n=this.Ne[e][r].Si.charCodeAt(0);if(n<32)return;if(i?32==n:255==n)return;const _=t-2*r+2*(s-3*e);let h=0;n<64?h=n-32:n>=96&&(h=n-64),i?h&=~(1<<_):h|=1<<_,this.Ne[e][r].Si=String.fromCharCode(h>=32?h+64:h+32);}De(t,s,i,e){let r=0,n=0;for(let _=0;_<e.length&&s+r<75;_++)t+n<80&&(255==e[r*i+n]?this.Ue(t+n,s+r):this.Ue(t+n,s+r,true)),n++,n==i&&(r++,n=0);}Je(t,s){let i=[...s];if(i=i.slice(0,ht),i.forEach((s,i)=>{const e=s.charCodeAt(0);if(Number.isNaN(e)||e>127)throw Error(`PageModel E51 failed to write row: bad character code (${e}) at row ${t} col ${i}`);this.Ne[t][i].Pi=s;}),i.length<ht)for(let s=i.length;s<ht;s++)this.Ne[t][s].Pi=" ";}be(t){this.ze=t,this.cs._e();}me(t){if(void 0===t||t){const t=[];for(let s=0;s<_t;s++)t.push("");this.pe(t);}else for(let t=0;t<_t;t++)this.Je(t,"");}we(t,s){this.je=t;const i=t.match(/^g0_([a-z]+)/);if(null!=i){const t="g2_"+i[1];t in J?this.Me=t:"hebrew"==i[1]&&(this.Me="g2_arabic");}s&&this.cs._e();}Se(t,s){this.Pe=t,s&&this.cs._e();}xe(t,s){this.Me=t,s&&this.cs._e();}bs(t){if(t>=_t)throw Error("PageModel.getRow E42 bad rowNum");const s=new nt;let i,e,r=d.Tt,n=f.WHITE,_=false,h=p.Jt,o=false,A=false,g=false,l=false,a=f.BLACK,c=d.qt,C={qi:false,Ys:" ",Ls:d.qt},E=[];return ot.includes(this.ze)&&(E=this.Ve.filter(s=>s.re==t)),this.Ne[t].forEach((I,u)=>{const B=I.Pi,Q=((t,s)=>{let i=null,e=null;return s in U&&L[t].includes(s.charCodeAt(0))?s in S?(i=y.TEXT_COLOUR,e=U[s]):s in v?(i=y.MOSAIC_COLOUR,e=U[s]):i=U[s]:s.charCodeAt(0)<=31&&(i=y.Zt),{Ke:i,Ye:e}})(this.ze,B);switch(i=n,I.Ls=r,I.Os=l,e=o,Q.Ke!=y.STEADY&&(I.Hs=_),Q.Ke!=y.NORMAL_SIZE&&(I.ut=h),Q.Ke!=y.CONCEAL&&(I.Xs=A),g&&(Q.Ke!=y.HOLD_MOSAICS&&(C.qi=false,C.Ys=" "),g=false),Q.Ke){case y.TEXT_COLOUR:r=d.Tt,n=Q.Ye,A=false,I.Ti(C);break;case y.MOSAIC_COLOUR:r=c,n=Q.Ye,A=false,I.Ti(C);break;case y.NEW_BACKGROUND:a=i,I.Ti(C);break;case y.BLACK_BACKGROUND:a=f.BLACK,I.Ti(C);break;case y.CONTIGUOUS_GRAPHICS:c=d.qt,I.Ls==d.zt&&(I.Ls=d.qt),r==d.zt&&(r=d.qt),I.Ti(C);break;case y.SEPARATED_GRAPHICS:c=d.zt,I.Ls==d.qt&&(I.Ls=d.zt),r==d.qt&&(r=d.zt),I.Ti(C);break;case y.ESC:this.Pe&&(o=!e),I.Ti(C);break;case y.FLASH:_=true,I.Ti(C);break;case y.STEADY:I.Hs=false,_=false,I.Ti(C);break;case y.NORMAL_SIZE:I.ut=p.Jt,h=p.Jt,I.Ti(C);break;case y.DOUBLE_HEIGHT:h=p.Kt,s.Ns=true,I.Ti(C);break;case y.DOUBLE_WIDTH:h=p.Yt,I.Ti(C);break;case y.DOUBLE_SIZE:h=p.Xt,s.Ns=true,I.Ti(C);break;case y.CONCEAL:I.Xs=true,A=true,I.Ti(C);break;case y.HOLD_MOSAICS:C.qi=true,I.Ti(C);break;case y.RELEASE_MOSAICS:g=true,I.Ti(C);break;case y.START_BOX:u>=1&&this.Ne[t][u-1].Pi==this.Te&&(I.Os=true,l=true),I.Ti(C);break;case y.END_BOX:u+1<ht&&this.Ne[t][u+1].Pi==this.qe&&(l=false),I.Ti(C);break;case y.Zt:I.Ti(C);break;default:I.Mi(e?this.Pe:this.je),I.zi()&&(C.Ys=B,C.Ls=I.Ls);}I.Us=i,I.vs=a,E.filter(t=>t.ee==u).forEach(t=>{const s=new Z(I);I=s,"g0"==t.Ls?(I.Pi=t.Ys,I.Vi=t.Vi,I.Ls=d.Tt,I.Mi(e?this.Pe:this.je)):"g1"==t.Ls?this.ze==b[2.5]&&(I.Pi=t.Ys,I.Ls=c,I.Mi()):"g2"==t.Ls?(I.Pi=t.Ys,I.Ls=d.Tt,I.Mi(this.Me)):"g3"==t.Ls?this.Xe(t.Ys)&&(I.Pi=t.Ys,I.Ls=d.Vt,I.Mi()):"char"==t.Ls&&(I.Ji=t.Ys,I.Ls=d.Tt);}),s.He(I);}),s}ne(t){this.Ve=t;}de(){this.Ve=[];}Le(){const t=new Uint8Array(1e3);return this.Ne.forEach((s,i)=>{s.forEach((s,e)=>{t[i*ht+e]=s.Pi.charCodeAt(0);});}),t}Xe(t){return this.ze!=b[1.5]||-1!="Q[\\]".indexOf(t)}};function gt(t){return new et(At,t)}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

class PageFetcher {
    constructor(baseURL) {
        this._baseURL = typeof baseURL == 'string' ? baseURL : './'; 
        this._magazine = null;
        this._magazineData = null;
    }

    async fetchPage(pageNumber) {
        const matches = pageNumber.match(/^([1-8])[0-9A-Fa-f]{2}$/);
        if (matches == null) return null;
        const magazine = matches[1];
        pageNumber = pageNumber.toUpperCase();

        if (this._magazine != magazine) {
            const url = `${this._baseURL}${magazine}.json`;
            try {
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    if ('pages' in data) {
                        this._magazineData = data;
                        this._magazine = magazine;
                    } else console.warn(`W21 fetchPage: 'pages' property missing in ${url}`);
                } else console.warn(`W22 fetchPage: failed to load magazine data from ${url} : ${res.status} ${res.statusText}`);
            } catch (e) {
                console.warn(`W24 fetchPage: failed to load magazine data from ${url}.json :`, e.message);
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
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0


const DEFAULT_HEADER = '       %%#  %%a %e %%b \x1bC%H:%M/%S';

class TeletextService {
    constructor(options) {
        if (typeof options != 'object') throw new Error("E8 Service.constructor: options object required");
        if (!('DOMSelector' in options)) throw new Error("E9 Service.constructor DOMSelector property required");

        this._caster = 'caster' in options ? options.caster : null;
        this._defaultG0Charset = 'defaultG0Charset' in options ? options.defaultG0Charset : 'g0_latin';
        this._header = 'header' in options ? new Header(options.header) : new Header(DEFAULT_HEADER);
        this._fetcher = 'fetcher' in options ? options.fetcher : new PageFetcher(options.baseURL);
        this._baseURL = 'baseURL' in options ? options.baseURL : './';

        this._ttx = gt();
        this._ttx.setDefaultG0Charset(this._defaultG0Charset);
        this._ttx.setLevel(b[1.5]);
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
            fastext: this._fastext,
            webUrl: 'webUrl' in this._page ? this._page.webUrl : null,
            image: 'image' in this._page ? this._baseURL + this._page.image : null
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

        if ('outputLines' in subpage) {
            const outputLines = subpage.outputLines.split("\n");
            this._ttx.setPageFromOutputLines(outputLines, header);
            casterDisplay.outputLines = outputLines;
        } else if ('packed' in subpage) {
            const packed = subpage.packed;
            this._ttx.loadPageFromEncodedString(packed, header);
            casterDisplay.packed = packed;
        } else {
            console.error('E138 _update: outputLines or packed properties expected in subpage');
            casterDisplay = null;
        }

        if (casterDisplay && this._caster) this._caster.display(casterDisplay);

        this._fastext = 'fastext' in subpage ? subpage.fastext : null;
    }
}

// SPDX-FileCopyrightText: (c) 2025 Rob Hardy
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0
//
// The Chromecast receiver app is for non-commerical use only. Contact techandsoftwareltd@outlook.com for commercial enquiries
class t{constructor(t){this.t=t,this.i=[];}attach(t){this.i.push(t);}notify(t){this.i.forEach((s,e)=>this.i[e](this.t,t));}}const s=new class{constructor(){this.available=new t(this),this.castStateChanged=new t(this);}o(){if("undefined"==typeof cast)return;const t={receiverApplicationId:"000F65B3",autoJoinPolicy:chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED};this.h=cast.framework.CastContext.getInstance(),this.h.setOptions(t),this.l=new cast.framework.RemotePlayer,this.u=new cast.framework.RemotePlayerController(this.l),this.h.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED,()=>this.castStateChanged.notify()),this.available.notify(),this.castStateChanged.notify();}async display(t){if(!this.m())return;const s=this.p();this.u.stop();const e=new chrome.cast.media.MediaInfo("https://teletextforchromecast.robdev.org.uk/250-milliseconds-of-silence.mp3","audio/mpeg3");e.entity=t;const i=new chrome.cast.media.LoadRequest(e);try{await s.loadMedia(i);}catch(t){}}getCastState(){return this.h.getCastState()}clearScreen(){this.M("clear");}toggleGrid(){this.M("grid");}toggleReveal(){this.M("reveal");}toggleMixMode(){this.M("mix");}toggleBoxMode(){this.M("box");}setSmoothMosaics(){this.M("smoothmosaic");}setBlockMosaics(){this.M("blockmosaic");}async M(t){if(!this.m())return;const s=this.p();try{await s.sendMessage("urn:x-cast:uk.ltd.techandsoftware.teletext",`"${t}"`);}catch(t){}}m(){return "object"==typeof this.l&&this.l.isConnected}p(){return this.h.getCurrentSession()}};let e=0;function i(){window.setTimeout(()=>{"undefined"==typeof cast?(e++,e<10&&i()):s.o();},500);}window.__onGCastApiAvailable=t=>{t&&("undefined"==typeof cast?i():s.o());};

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
            DOMSelector: '#teletextscreen',
        };
        let frontPageNumber = "";
        let useSmoothMosaics = false;
        this._fonts = FONTS;
        this._serviceName = 'FAXFAX';
        if (typeof options == 'object') {
            for (const prop of ['defaultG0Charset', 'header', 'DOMSelector', 'baseURL']) {
                if (prop in options) serviceOptions[prop] = options[prop];
            }
            if ('frontPage' in options) {
                if (typeof options.frontPage == 'number') frontPageNumber = String(options.frontPage);
                else if (typeof options.frontPage == 'string') frontPageNumber = options.frontPage;
                else if (options.frontPage == null) ;
            }
            if ('smoothMosaics' in options && options.smoothMosaics) useSmoothMosaics = true;
            if (Array.isArray(options.fontList)) this._fonts = options.fontList;
            if ('serviceName' in options) this._serviceName = options.serviceName;
        }
        if (frontPageNumber == "") frontPageNumber = '100';

        this._service = new TeletextService(serviceOptions);

        this._initPageNumber(frontPageNumber);
        this._fontIndex = 0;
        this._viewIndex = 0;
        this._inhibitUpdateHistoryState = false;

        s.available.attach(() => this._castAvailable.call(this));
        s.castStateChanged.attach(() => this._castStateChanged.call(this));

        this._initEventListeners();
        this._service.teletextInstance.setFont(this._fonts[0]);
        if (useSmoothMosaics) this._toggleSmoothMosaics();
        this._newPage();
    }

    _initPageNumber(frontPageNumber) {
        const defaultPageNumber = frontPageNumber.length == 3 ? frontPageNumber : 'XXX';

        const url = new URL(window.location);
        const path = url.pathname;
        // no page number in url
        if (path == '/') {
            this._pageNumber = defaultPageNumber;
            return;
        }
        
        const matches = path.match(/^\/(?<pageNumber>[1-8][0-9A-Fa-f]{2})$/);
        if (matches) {
            // valid page number in url
            this._pageNumber = matches.groups.pageNumber;
            return;
        } else {
            // invalid page number in url
            url.pathname = '/';
            history.replaceState({}, "", url);
            this._pageNumber = defaultPageNumber;
            return;
        }
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
        window.addEventListener('popstate', e => this._handlePopState(e));

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
            this._updateWebLink(meta.webUrl);
            this._updateMetaTags(meta.image);
            this._updateHistoryState();
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

    _updateWebLink(url) {
        const link = document.querySelector('#webicon');
        if (url == null) {
            link.style.display = 'none';
            link.href = '';
        } else {
            link.href = url;
            link.style.display = '';
        }
    }

    _updateMetaTags(image) {
        document.querySelectorAll('[data-meta]').forEach(el => {
            el.remove();
        });
        const title = this._serviceName + ' ' + this._pageNumber;
        document.title = title;
        createMetaElement('twitter:title', title);

        if (image != null) {
            createMetaElement('twitter:card', 'summary_large_image');
            createMetaElement('twitter:image', image);
        }
    }

    _updateHistoryState() {
        if (this._inhibitUpdateHistoryState) {
            this._inhibitUpdateHistoryState = false;
            return;
        }

        const state = {
            pageNumber: this._pageNumber
        };
        const title = '';
        const url = new URL(window.location);
        const previousPathname = url.pathname;
        url.pathname = `/${this._pageNumber}`;

        if (previousPathname == '/' || previousPathname == url.pathname)
            history.replaceState(state, title, url);
        else
            history.pushState(state, title, url);
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
        document.body.classList.toggle('zen');
    }

    get teletextInstance() {
        return this._service.teletextInstance;
    }

    _handlePopState(e) {
        if ('pageNumber' in e.state) {
            this._pageNumber = e.state.pageNumber;
            this._inhibitUpdateHistoryState = true;
            this._newPage();
        }
    }
}

function createMetaElement(name, content) {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    meta.setAttribute('data-meta', '');
    document.head.appendChild(meta);
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
            if (this._fontIndex == this._fonts.length) this._fontIndex = 0;
            console.debug('setting font to', this._fonts[this._fontIndex]);
            this._service.teletextInstance.setFont(this._fonts[this._fontIndex]);
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
