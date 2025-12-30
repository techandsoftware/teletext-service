/*! @techandsoftware/teletext-service
    SPDX-FileCopyrightText: (c) 2025 Rob Hardy
    SPDX-License-Identifier: AGPL-3.0-only */
let G = class At {
  static tt(t, e) {
    const s = (t = t.replace(/-/g, "+").replace(/_/g, "/")).length % 4;
    if (s) {
      if (s === 1) throw Error("Utils.decodeBase64URLEncoded E16: Input base64url string is the wrong length to determine padding");
      t += Array(5 - s).join("=");
    }
    const i = e(t), n = [];
    let h = [];
    for (const g of (function* (c) {
      let d = 6, f = 0;
      for (const _ of c) {
        const w = ft(_.charCodeAt(0));
        for (const x of w) f |= x << d, d--, d < 0 && (yield f, d = 6, f = 0);
      }
      d < 6 && (yield f);
    })(i)) h.push(String.fromCharCode(g)), h.length == 40 && (n.push(h.join("")), h = []);
    return h.length < 40 && n.push(h.join("")), n;
  }
  static st(t) {
    const e = [];
    let s = !1;
    for (const i of [...t]) {
      const n = i.charCodeAt(0);
      n == 27 ? s = !0 : n >= 128 && n <= 159 ? (e.push(String.fromCharCode(n - 128)), s = !1) : n >= 160 ? (e.push(""), s = !1) : s ? (e.push(String.fromCharCode(n - 64)), s = !1) : e.push(i);
    }
    return e;
  }
  static it(t) {
    const e = [], s = /^OL,(\d{1,2}),(.*)/;
    for (const i of [...t]) {
      const n = i.match(s);
      n != null && (e[n[1]] = At.st(n[2]));
    }
    return e;
  }
  static et(t) {
    return "ﻰﺋﺊﭼﭽﭘﭙﮔﻎﻼﻬﻪﻊﺔﺒﺘﺎﺑﺗﺛﺟﺣﺧﺳﺷﺻﺿﻃﻇﻋﻏﺜﺠﺤﺨـﻓﻗﻛﻟﻣﻧﻫﻰﻳﻴﻌﻐﻔﻘﻠﻤﻨ".indexOf(t) != -1;
  }
};
function ft(r) {
  let t = [];
  for (let e = 7; e >= 0; e--) t.push(r & 1 << e ? 1 : 0);
  return t;
}
const X = { ENGINEERING: "QIECBAgQIIcWLGg2EDdy3QIKnXKgYtUE7f2QA2TB0wYr2DECAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYMS54fzJmix4-YCDToOLOjyZ0WLSkzo6AkcGHuZUcRHlB4dgyAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAWDP9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YNCho9zImSoAqBGoAp0FUy8-iChhz5UCA4MPEuZYgTAFyAFg1_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2DYCAAoACACeQHkBdYTJlixIkSKlSJEoUKIEBQABAAQAEABYN_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39g4AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGDn9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YsAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIBix_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2LICAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYs_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39i0AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGLX9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_Ytq-jT0yg7OXZs39w0Pzh3Ao_LLl3BZuHPl3dMIGllyBIWzrlLmkKJGTSJUycsoUqlZJYtXLzLBiyZlWjVs3IuHLp2UePXz9AgQokaBIlTJ0ChSqVoFi1cvQMGLJmgaNWzdA4cunaB49fP0ECDChoIkWNHQSJMqWgmTZ09BQo0qaCpVrV0FizatoLl29fQYMOLGgyZc2dBo06taDZt3b0HDjy5oOnXt3QePPr2g-ff38pgw4sZHJlzZyujTq1ktm3dvNcOPLmW6de3cn48-vZf59_fwZiHv3Y8uHYIjbMPPQDVCxcLf4E0-mXDk8mI-_dlFCn5a9_DKr6q-qvqr6q-qvqr6AFS390DJoGQKr6q-qvqr6q-qvqr6o", ADVERT: "QIECBAgQIJ9KDDmRUDZi3QU8PRk1QQeHIHDaIEDJiwYumDACdDwcnbLy6aeeXbl3dECBAgQIECBAgQIECBAgQIHwZkvcoCx0og8LNGjYwQPEjzpoWaNjBA82YHnTQwabEjTpowPEiBAgLHSiBbs1atjFA9SPe2pZqQNUHX1qQatSlrqQNW-5UsaIECAsdKIFidUqQJUCVAlVKlipchQJUCJanVIEqpAlSqlC5CgQIEB0ogQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQHSKBAgQYEH7ogQaGCApw_fEm54R3PCm5JuSKHoFUEVIECAudIoECBB6-___TB-_v0JTU_WqkZHFyQKHmjYgYBECpAqQIC50igQIEH___3_-iD__6FFSAig-IP6JCg26lzRr3avEgFUgLnSKBAg1f1X9lv_9NSBAgI6G-HX1V_EqBUqQJUqXBzagVSAudIoECD9_Qa2qL__6IMDzoq682qdAgQIEARAgQIECBAgVIC50igQIP_9AiaoFX__0VfV_1kjQIECBAgQBECBAgAoECpAgLnSKBBq__0CBCgQa___oreokCBAgQIECBAgQBECBAgVIECAudIoEHr__QIECBAg3_36FAgQIECBAgQIECAIgQIFSBAgQIAZ0igQf_7dAgKIECAinKf9bTR9QIv-N6i_ofzNagQIECBAgJnSKDR__tUBRAoe6NiBB_XYf_rqg_q2iD-gRb-iBAgQIECAmdIoNX_-1QFECDrq9IMH9h664P_D-w34P7DZ4ToECBAgQICZ0ig___5TQ8SfEHzQ82MPCzpoedEHzA82MPjDQ0-LNDSk0JnSOD___lNXVh_Qf9T3cx_oP-prqa_1S3Y0_q_zX-s1NdTUmdI6v_9-U1NUH9B_1NdTX-g_6mvpL_wMNTX-g1Nf6DAz1tSZ0j-_v0JREjQokaFEhRIUSNCiRoUCNAjRoEaBEhRo0CNGgBnSP9OgQFECCNPpIIVKfDkVaUWmggzoiCFPny5M6PTQIECAGdIjUAGlJnR0DBu5coGrFm0YMEE-kgpxYqChBjxUDNuwQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy92np007s6AFSy9tOXvzQA7O_ryQTd-7L5DQVtpBJ3ZMvg", UK: "QIECBAgQIIcWLGg2EDFy2QIJu_cgZNUETLjQA2TN0xYr2DAodJIECBAgQIEGDB4_PUCBAgQIECBAgQIECBAgQIEANkvaMih0kgQIECDA1Qfv__OgQYGCBAgQIECBAgQIECBAgQIECBAgKHSSBAgQIH6FR-__-v7___oECBAgQIEAORPmxUE6LXpoECAodJIECBAoQKum7______9-gQIECBAgQA82_Zs39-aB8-QIAh0kgQIECBAgSev_____v06BAgQIECBAgQIECBAgQIECBAgKHSSBAgQIECBR00____-_w9GCBAgQIECBAgQIECBAgQIECAodJIECBAgQIECD8rx________ECBAgQIECBAgQIECBAgQICh0kgQIECBAgQLETRlv_______6oECBAgQIECBAgQIECBAgKHSyBAgQIHGQlwYIEH_-_x_____9-dECBAgQIECBAgQIECAIdLIECDAmJbfz_-0RJ0qBV________7sECBAgQIECBAgQIAh0sgQIMzAl-__fX5Sg0JECvX______586IECBAgQIECBAgCHSyBAgwJiW9OjX_0qBAgQIEX________-l8fPjBAgQIECAIdLIEHBYhQIECBQxQICWDhg5fv____________tUCBAgQIAh0sgzIECBAgQIEGlAgQEtP_______________-lQIECBAgCHSyBUwQIECBAgQakCBASQqv_____________-6FAgQIECAIdLIECJygQIECBAgaoEBJBg______________5-OiBAgQIAh0sgQKGKBAgQIEHBKgJIMH7____8v__________QoECBAgCHSyBRmQIECBA4RoECAkgVoVaNel________r16FAgQIECAIdLINCFAgwOEyBAgQICSBAgQePn7___r06RAgQIECBAgQIAh0sgQLeKxCgQIECBAgJIECDR__v0aNGhQIECBAgQIECBAgCHSSBAgQIECBAgQIECBAgQYP3_-1QIECBAgQIECBAgQIECAIdJIECBAgQIECBAgQIECBB6boUSBAgQIECBAgQIECBAgQIAh0kgQIECBAgQIECBAgQIFStAgQIECBAgQIECBAgQIECBAgAzsvjognZe_MFIy4cmzTuy8wdTfwQU-G_l0DVKy-lhyad6A", SPLASH: "QIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECAsaMIEGDx8YIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQICxowg0N2bdmgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgLGjCBFvz9_6BAZQIECBAgQIECAig0NECBAgQIECBAgQIECAsaMcOD5tjyoGCBAgQIECBAgQICLhCgQIECBAgQIECBAgQICxowoTod79ArSEcHBAgQIECBAg0ITKBAgQcGCBAgQIECBAgLGjCBBgXIUCAyRXmlLBAgQIECBuZ4fPn___aoECBAgQIECBAaQIECBAgQIEBFAgQaTPDh8-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmqClvxIJGHlk8oECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmaCplx6ECZBT35unfDyyoJnTIuQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA" }, b = "http://www.w3.org/2000/svg";
let K, Q, st = 0;
class S {
  constructor() {
  }
  rt() {
    return this.nt;
  }
  _t() {
    this.nt = null;
  }
  ht(t, e) {
    if (typeof t == "object") for (const s in t) t[s] == null ? this.nt.removeAttribute(s) : this.nt.setAttribute(s, t[s]);
    else {
      if (typeof e > "u") return this.nt.getAttribute(t);
      e == null ? this.nt.removeAttribute(t) : this.nt.setAttribute(t, e);
    }
    return this;
  }
  ot(t) {
    if (!this.At(t)) {
      const e = this.gt();
      e.push(t), this.nt.setAttribute("class", e.join(" "));
    }
    return this;
  }
  At(t) {
    return this.gt().indexOf(t) !== -1;
  }
  gt() {
    const t = this.nt.getAttribute("class");
    return t == null ? [] : t.split(" ");
  }
  lt(t) {
    return this.At(t) && this.nt.setAttribute("class", this.gt().filter((e) => e !== t).join(" ")), this;
  }
  ct(t) {
    return this.At(t) ? this.lt(t) : this.ot(t), this;
  }
  Ct(t, e) {
    if (typeof t == "object") for (const s in t) t[s] == null ? delete this.nt.dataset[s] : this.nt.dataset[s] = t[s];
    else {
      if (typeof e > "u") return this.nt.dataset[t];
      e == null ? delete this.nt.dataset[t] : this.nt.dataset[t] = e;
    }
    return this;
  }
}
class dt extends S {
  constructor(t) {
    return super(), K = t, Q = K.document, this.nt = Q.createElementNS(b, "svg"), this.nt.setAttribute("xmlns", b), this;
  }
  Et(t) {
    const e = Q.querySelector(t);
    if (!e) throw Error("@techandsoftware/teletext: E117: addTo failed to match provided selector");
    return e.appendChild(this.nt), this;
  }
  ut(t) {
    return this.nt.setAttribute("viewBox", t), this;
  }
  It(t, e) {
    return this.nt.setAttribute("width", t), this.nt.setAttribute("height", e), this;
  }
  Bt(t) {
    const e = Q.createElementNS(b, "style");
    return e.append(t), this.nt.append(e), this;
  }
  Qt() {
    const t = new J();
    return this.nt.append(t.rt()), t;
  }
  ft() {
    return this.nt.clientWidth;
  }
  dt() {
    return this.nt.clientHeight;
  }
  yt(t) {
    const e = new pt(t);
    return this.nt.append(e.rt()), e;
  }
}
class J extends S {
  constructor() {
    return super(), this.nt = Q.createElementNS(b, "g"), this.bt = [], this;
  }
  Qt() {
    const t = new J();
    return this.nt.append(t.rt()), this.bt.push(t), t;
  }
  wt(t) {
    const e = new bt(t);
    return this.nt.append(e.rt()), this.bt.push(e), e;
  }
  St() {
    const t = new mt();
    return this.nt.append(t.rt()), t;
  }
  xt(t, e) {
    const s = new q(t, e);
    return this.nt.append(s.rt()), this.bt.push(s), s;
  }
  Rt() {
    return this.bt[this.bt.length - 1];
  }
  Ut() {
    return this.bt;
  }
  vt(t) {
    return this.nt.setAttribute("clip-path", `url("#${t.rt().id}")`), this;
  }
  Dt() {
    return this.nt.removeAttribute("clip-path"), this;
  }
  Lt() {
    this.nt.parentNode && this.nt.parentNode.removeChild(this.nt), this.nt = null, this.bt.forEach((t) => t._t()), this.bt = [];
  }
  kt(t, e, s, i) {
    const n = new yt(t, e, s, i);
    return this.nt.append(n.rt()), this.bt.push(n), n;
  }
  Ot(t) {
    const e = new Qt(t);
    return this.nt.append(e.rt()), this.bt.push(e), e;
  }
  Ft(t, e) {
    const s = new Bt(t, e);
    return this.nt.append(s.rt()), this.bt.push(s), s;
  }
  Gt(t, e) {
    const s = new It(t, e);
    return this.nt.append(s.rt()), this.bt.push(s), s;
  }
}
class It extends S {
  constructor() {
    return super(), this.nt = Q.createElementNS(b, "svg"), this;
  }
  attr(...t) {
    return this.ht(...t);
  }
  get node() {
    return this.rt();
  }
}
class Bt extends S {
  constructor(t, e) {
    return super(), this.nt = Q.createElementNS(b, "image"), this.nt.setAttribute("width", parseInt(t)), this.nt.setAttribute("height", parseInt(e)), this;
  }
  attr(...t) {
    return this.ht(...t);
  }
}
class Qt extends S {
  constructor(t) {
    return super(), this.nt = Q.createElementNS(b, "use"), this.nt.setAttribute("href", "#" + t), this;
  }
  Ht(t) {
    return this.nt.setAttribute("fill", t), this;
  }
  Nt(t, e) {
    return this.nt.setAttribute("x", t), this.nt.setAttribute("y", e), this;
  }
}
class pt extends S {
  constructor(t) {
    return super(), this.nt = Q.createElementNS(b, "symbol"), this.nt.setAttribute("id", t), this;
  }
  xt(t, e) {
    const s = new q(t, e);
    return this.nt.append(s.rt()), s;
  }
}
class bt extends S {
  constructor(t) {
    return super(), this.nt = Q.createElementNS(b, "text"), this.nt.append(t), this;
  }
  wt(t) {
    return this.nt.textContent = t, this;
  }
  Ht(t) {
    return this.nt.setAttribute("fill", t), this;
  }
}
class mt extends S {
  constructor() {
    return super(), this.nt = Q.createElementNS(b, "defs"), this;
  }
  jt() {
    const t = new St();
    return this.nt.append(t.rt()), t;
  }
  Pt(t) {
    return [...this.nt.querySelectorAll(t)].map(_t);
  }
  xt(t, e) {
    const s = new q(t, e);
    return this.nt.append(s.rt()), s;
  }
}
class St extends S {
  constructor() {
    return super(), this.nt = Q.createElementNS(b, "clipPath"), this.nt.setAttribute("id", "clipPath-" + st), st++, this;
  }
  Ut() {
    return [...this.nt.children].map(_t);
  }
  Mt(t) {
    this.nt.appendChild(t.rt());
  }
}
class q extends S {
  constructor(t, e) {
    if (super(), t instanceof K.SVGElement) return this.nt = t, this;
    const s = t;
    return this.nt = Q.createElementNS(b, "rect"), this.nt.setAttribute("width", parseInt(s)), this.nt.setAttribute("height", parseInt(e)), this;
  }
  Ht(t) {
    return this.nt.setAttribute("fill", t), this;
  }
  Nt(t, e) {
    return this.nt.setAttribute("x", t), this.nt.setAttribute("y", e), this;
  }
  ft(t) {
    return t === void 0 ? parseInt(this.nt.getAttribute("width")) : (this.nt.setAttribute("width", parseInt(t)), this);
  }
  dt(t) {
    return t === void 0 ? parseInt(this.nt.getAttribute("height")) : (this.nt.setAttribute("height", parseInt(t)), this);
  }
  Lt() {
    this.nt.parentNode && this.nt.parentNode.removeChild(this.nt), this.nt = null;
  }
}
class yt extends S {
  constructor(t, e, s, i) {
    return super(), this.nt = Q.createElementNS(b, "line"), this.nt.setAttribute("x1", t), this.nt.setAttribute("y1", e), this.nt.setAttribute("x2", s), this.nt.setAttribute("y2", i), this;
  }
}
function _t(r) {
  let t;
  if (r.tagName !== "rect") throw Error("SVG:wrapSVGElement Unable to wrap SVG element " + r.tagName);
  return t = new q(r), t;
}
const A = { BLACK: /* @__PURE__ */ Symbol(), RED: /* @__PURE__ */ Symbol(), GREEN: /* @__PURE__ */ Symbol(), YELLOW: /* @__PURE__ */ Symbol(), BLUE: /* @__PURE__ */ Symbol(), MAGENTA: /* @__PURE__ */ Symbol(), CYAN: /* @__PURE__ */ Symbol(), WHITE: /* @__PURE__ */ Symbol() };
Object.freeze(A);
const o = { Tt: /* @__PURE__ */ Symbol(), qt: /* @__PURE__ */ Symbol(), zt: /* @__PURE__ */ Symbol(), Vt: /* @__PURE__ */ Symbol() };
Object.freeze(o);
const C = { Jt: /* @__PURE__ */ Symbol(), Kt: /* @__PURE__ */ Symbol(), Yt: /* @__PURE__ */ Symbol(), Xt: /* @__PURE__ */ Symbol() };
Object.freeze(C);
const B = { 0: /* @__PURE__ */ Symbol(), 1: /* @__PURE__ */ Symbol(), 1.5: /* @__PURE__ */ Symbol(), 2.5: /* @__PURE__ */ Symbol() };
Object.freeze(B);
class l {
  static charFromTextColour(t) {
    if (t in it) return it[t];
    throw Error("Attributes.charFromTextColour: bad colour: " + t);
  }
  static charFromGraphicColour(t) {
    if (t in nt) return nt[t];
    throw Error("Attributes.charFromGraphicColour: bad colour");
  }
  static charFromAttribute(t) {
    if (t in rt) return rt[t];
    throw Error("Attributes.charFromAttribute: bad attribute");
  }
}
function W(r) {
  return ut[r];
}
Object.assign(l, { TEXT_COLOUR: o.ALPHA, MOSAIC_COLOUR: /* @__PURE__ */ Symbol(), NEW_BACKGROUND: /* @__PURE__ */ Symbol(), BLACK_BACKGROUND: /* @__PURE__ */ Symbol(), CONTIGUOUS_GRAPHICS: o.qt, SEPARATED_GRAPHICS: o.zt, ESC: /* @__PURE__ */ Symbol(), FLASH: /* @__PURE__ */ Symbol(), STEADY: /* @__PURE__ */ Symbol(), NORMAL_SIZE: C.Jt, DOUBLE_HEIGHT: C.Kt, DOUBLE_WIDTH: C.Yt, DOUBLE_SIZE: C.Xt, CONCEAL: /* @__PURE__ */ Symbol(), HOLD_MOSAICS: /* @__PURE__ */ Symbol(), RELEASE_MOSAICS: /* @__PURE__ */ Symbol(), START_BOX: /* @__PURE__ */ Symbol(), END_BOX: /* @__PURE__ */ Symbol(), Zt: /* @__PURE__ */ Symbol() });
const ut = { [A.BLACK]: "#000", [A.RED]: "#f00", [A.GREEN]: "#0f0", [A.YELLOW]: "#ff0", [A.BLUE]: "#00f", [A.MAGENTA]: "#f0f", [A.CYAN]: "#0ff", [A.WHITE]: "#fff" };
Object.freeze(ut);
const F = { "\0": A.BLACK, "": A.RED, "": A.GREEN, "": A.YELLOW, "": A.BLUE, "": A.MAGENTA, "": A.CYAN, "\x07": A.WHITE };
Object.freeze(F);
const it = Z(F), j = { "": A.BLACK, "": A.RED, "": A.GREEN, "": A.YELLOW, "": A.BLUE, "": A.MAGENTA, "": A.CYAN, "": A.WHITE };
Object.freeze(j);
const nt = Z(j), D = { "\b": l.FLASH, "	": l.STEADY, "\n": l.END_BOX, "\v": l.START_BOX, "\f": l.NORMAL_SIZE, "\r": l.DOUBLE_HEIGHT, "": l.DOUBLE_WIDTH, "": l.DOUBLE_SIZE, "": l.CONCEAL, "": l.CONTIGUOUS_GRAPHICS, "": l.SEPARATED_GRAPHICS, "\x1B": l.ESC, "": l.BLACK_BACKGROUND, "": l.NEW_BACKGROUND, "": l.HOLD_MOSAICS, "": l.RELEASE_MOSAICS };
Object.assign(D, F), Object.assign(D, j), Object.freeze(D);
const rt = Z(D), P = { [B[0]]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23] };
function Z(r) {
  const t = {};
  for (const e in r) t[r[e]] = e;
  return Object.freeze(t);
}
P[B[1]] = [...P[B[0]], 10, 11, 12, 13, 24, 25, 26, 27, 28, 29, 30, 31], P[B[1.5]] = [...P[B[1]], 0, 16], P[B[2.5]] = [...P[B[1.5]], 14, 15], Object.freeze(P);
const v = 10, p = 10, k = { Wt: { $t: 10.4, ts: -5.2 }, ss: { $t: p, ts: -4.5 } };
Object.freeze(k);
class E {
  constructor(t, e) {
    this.es = new dt(e).ut("0 0 400 250").It(600, 500).ht({ preserveAspectRatio: "none", style: "font-family: sans-serif" }).Bt(`@font-face {
font-family: 'Unscii';
src: url('fonts/unscii-16.woff') format('woff'), 
url('fonts/unscii-16.ttf') format('truetype'),
url('fonts/unscii-16.otf') format('opentype');
unicode-range: U+0000-00FF, U+2022, U+2500, U+2502, U+250C, U+2510, U+2514, U+2518, U+251C, U+251D, U+2524, U+2525, U+252C, U+252F, U+2534, U+2537, U+253C, U+253F, U+2588, U+258C, U+2590, U+2592, U+25CB, U+25CF, U+25E2-25E5, U+2B60-2B63, U+E0C0-E0FF, U+1FB00-1FB70, U+1FB75, U+1FBA0-1FBA7;
-webkit-font-smoothing: none;
font-smooth: never;
}
@font-face {
font-family: 'Bedstead';
src: url('fonts/bedstead.otf') format('opentype');
unicode-range: U+0000-00FF;
}
@keyframes blink {
to {
visibility: hidden;
}
}
@keyframes fancyblink {
from {
filter: none;
opacity: 0.7;
}
33% {
filter: none;
opacity: 1;
}
66% {
filter: blur(0px);
opacity: 1;
}
95% {
filter: blur(4px);
opacity: 0;
}
to {
filter: blur(0px);
opacity: 0;
}
}
#textlayer {
font-size: 10px;
}
.mosaic {
font-family: 'Unscii';
font-size: 10.3px;
}
.mosaic_separated {
font-family: 'Unscii';
font-size: 10px;
}
.flash_flashing .flash {
/* animation: blink 2s steps(3, start) infinite; */
animation: fancyblink 2s linear infinite;
}
.conceal_concealed  .conceal {
visibility: hidden;
}
svg #background {
transition-property: opacity;
transition-duration: 0.25s;
}
svg {
background-color: transparent;
}
svg use {
shape-rendering: crispEdges;
}
rect { color: orange; }
`), this.d = this.es.Qt().ht("class", "conceal_concealed flash_flashing"), this.rs = 1.2, this.ns(), this._s(), this.hs = null, this.As = t, this.gs = this.As.cs.ls(() => this.Cs()), this.Es = !1, this.us = !1, this.Is = !1, this.Bs = {};
  }
  Et(t) {
    this.es.Et(t);
  }
  Qs() {
    this.As.cs.Qs(this.gs), this.gs = null;
  }
  Cs() {
    let t = !1, e = !1;
    this.Is = !1, this.d.lt("flash_flashing"), this.fs.forEach((s, i) => {
      let n = !1;
      if (this.ds(i), t) return t = !1, void this.ps(s, i);
      const h = this.As.ys(i);
      let g, c;
      s.forEach((d, f) => {
        if (n) return n = !1, this.bs(d), this.ws(i), void (c && this.Ss());
        const _ = h.xs(f), w = W(_.Rs), x = _.Us(), T = W(_.vs), u = this.Ds(_.Ls, x, _.et);
        this.ks(d, _, u, T, f, i, x), _.Os && (c ? this.Ss() : this.Fs(i, f), this.Is = !0), g == w ? this.ws(i) : this.Gs(i, f, w), (_.It == C.Yt || _.It == C.Xt) && (n = !0), g = w, c = _.Os, _.Hs && (e = !0);
      }), h.Ns ? (this.js(i), this.Ps(), t = !0) : t = !1, this.Ms(i);
    }), "Ts" in this.Bs && this.Bs.Ts(this.es.ft(), this.es.dt()), this.d.ot("conceal_concealed"), e && setTimeout(() => this.d.ot("flash_flashing"), 100), this.qs();
  }
  ds(t) {
    this.zs(t), this.Vs(t);
  }
  ps(t, e) {
    "Js" in this.Bs && this.Bs.Js(t.length, e), t.forEach((s) => this.bs(s));
  }
  bs(t) {
    t.wt(" ").ht({ dx: null, dy: null, textLength: null, lengthAdjust: null, "text-anchor": null, transform: null, class: null });
  }
  ks(t, e, s, i, n, h, g) {
    this.Ks(t, e, s, i, n, h), e.Ls == o.qt && g || e.Ls == o.Vt ? t.ot("mosaic") : e.Ls == o.zt && g && t.ot("mosaic_separated");
  }
  Ks(t, e, s, i, n, h) {
    t.wt(e.Ys).ht(s).Ht(i), e.It == C.Kt ? t.ht("transform", `translate(0 ${at(h)}) scale(1 2)`) : e.It == C.Yt ? t.ht("transform", `translate(${ht(n)} 0) scale(2 1)`) : e.It == C.Xt && t.ht("transform", `translate(${ht(n)} ${at(h)}) scale(2 2)`), e.Hs && t.ot("flash"), e.Xs && t.ot("conceal");
  }
  Zs() {
    this.d.ct("conceal_concealed");
  }
  Ws(t) {
    let e = t;
    t == "native" ? e = '-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif' : t == "default" && (e = "sans-serif"), this.es.ht("style", "font-family: " + e);
  }
  $s() {
    this.hs ? (this.hs.Lt(), this.hs = null) : this.ti();
  }
  si() {
    this.us ? (this.us = !1, this.ii.ht("opacity", null).Dt()) : (this.us = !0, this.ei());
  }
  ri(t) {
    this.rs = t, this.ni(this.es.dt());
  }
  ni(t) {
    this.es.It(this.rs == "natural" ? 1.6 * t : t * this.rs, t);
  }
  ei() {
    this.Es && this.Is ? this.ii.ht("opacity", 0.3) : this.Is ? this.ii.vt(this._i).ht("opacity", 0.3) : this.ii.ht("opacity", 0);
  }
  qs() {
    this.us && this.ei();
  }
  hi() {
    this.Es ? (this.d.Dt(), this.Es = !1) : (this.d.vt(this._i), this.Es = !0), this.qs();
  }
  oi() {
    return this.es.rt().outerHTML;
  }
  ti() {
    this.hs = this.d.Qt();
    for (let t = 0; t < 25; t++) this.hs.kt(0, t * v, 399, t * v).ht({ stroke: "#555", "stroke-width": 0.5 });
    for (let t = 0; t < 40; t++) this.hs.kt(t * p, 0, t * p, 249).ht({ stroke: "#555", "stroke-width": 0.5 });
  }
  _s() {
    this.Ai = this.d.St(), this.gi = null, this._i = this.Ai.jt();
  }
  ns() {
    this.li(), this.ai();
  }
  li() {
    const t = this.d.Qt();
    t.ht({ "shape-rendering": "crispEdges", id: "background" }), this.ci = [], this.ii = t;
  }
  ai() {
    const t = [], e = this.d.Qt().ht({ "text-anchor": "middle", fill: "#fff" }).ht("id", "textlayer");
    for (let s = 0; s < 25; s++) {
      const i = [];
      for (let n = 0; n < 40; n++) i.push(e.wt(Ot()).ht({ x: n * p + 5, y: s * v + 8 }));
      t.push(i);
    }
    this.fs = t, this.Ci = e;
  }
  Vs(t) {
    this._i.Ut().filter((e) => e.Ct("r") == t).forEach((e) => e.Lt());
  }
  zs(t) {
    this.ci[t] && (this.ci[t].Lt(), this.ci[t] = null), this.ci[t] = this.ii.Qt();
  }
  ws(t) {
    const e = this.ci[t].Rt(), s = e.ft();
    e.ft(s + p);
  }
  Gs(t, e, s) {
    const i = e * p, n = t * v;
    this.ci[t].xt(p, v).Ht(s).Nt(i, n);
  }
  Ss() {
    const t = this.gi.ft();
    this.gi.ft(t + p);
  }
  js(t) {
    this.ci[t].Ut().forEach((e) => e.ht("height", 20));
  }
  Ps() {
    this.Ai.Pt("[data-boxbuffer]").forEach((t) => t.dt(20));
  }
  Fs(t, e) {
    const s = e * p, i = t * v;
    this.gi = this.Ai.xt(p, v).Ct("boxbuffer", !0).Nt(s, i);
  }
  Ms(t) {
    this.Ai.Pt("[data-boxbuffer]").forEach((e) => {
      e.Ct({ r: t, boxbuffer: null }), this._i.Mt(e);
    });
  }
  Ds(t, e, s) {
    return t == o.qt && e || t == o.Vt ? { dx: k.Wt.ts, dy: -0.15, textLength: k.Wt.$t, lengthAdjust: "spacingAndGlyphs", "text-anchor": "start", transform: null, class: null } : t == o.zt && e ? { dx: k.ss.ts, dy: null, textLength: k.ss.$t, lengthAdjust: "spacingAndGlyphs", "text-anchor": "start", transform: null, class: null } : { dx: null, dy: null, textLength: s ? p : null, lengthAdjust: s ? "spacingAndGlyphs" : null, "text-anchor": null, transform: null, class: null };
  }
  registerPlugin(t, e) {
    return "renderBackground" in e && (this.Bs.Ei = e.renderBackground), "renderMosaic" in e && (this.Bs.ui = e.renderMosaic), "endOfPageUpdate" in e && (this.Bs.Ts = e.endOfPageUpdate), "clearCellsForRow" in e && (this.Bs.Js = e.clearCellsForRow), { lookupColour: wt, isDoubleHeight: Lt, isDoubleWidth: vt, isDoubleSize: Nt, isSeparatedMosaic: xt, createImageOverlay: this.Ii.bind(this), createSVGOverlay: this.Bi.bind(this) };
  }
  Ii() {
    const t = this.d.Ft(400, 250);
    return t.ht("preserveAspectRatio", "none"), t;
  }
  Bi() {
    const t = this.d.Gt();
    return t.ht("preserveAspectRatio", "none"), t;
  }
}
E.Qi = p, E.fi = v, E.di = 20, E.pi = 20, E.yi = 400, E.bi = 250, E.mi = k, E.ROWS = 25, E.COLS = 40;
const wt = (r) => W(r), Lt = (r) => r == C.Kt, vt = (r) => r == C.Yt, Nt = (r) => r == C.Xt, xt = (r) => r == o.zt, at = (r) => 0 - r * v, ht = (r) => 0 - r * p;
function Ot() {
  return String.fromCharCode(32 + 95 * Math.random());
}
const N = { g0_latin: { $: "¤", "": "■" }, g0_latin__czech_slovak: { "#": "#", $: "ů", "@": "č", "[": "ť", "\\": "ž", "]": "ý", "^": "í", _: "ř", "`": "é", "{": "á", "|": "|", "}": "ú", "~": "š" }, g0_latin__english: { "#": "£", $: "$", "@": "@", "[": "←", "\\": "½", "]": "→", "^": "↑", _: "#", "`": "—", "{": "¼", "|": "‖", "}": "¾", "~": "÷" }, g0_latin__estonian: { "#": "#", $: "õ", "@": "Š", "[": "Ä", "\\": "Ö", "]": "Ž", "^": "Ü", _: "Õ", "`": "š", "{": "ä", "|": "ö", "}": "ž", "~": "ü" }, g0_latin__french: { "#": "é", $: "ï", "@": "à", "[": "ë", "\\": "ê", "]": "ù", "^": "î", _: "#", "`": "è", "{": "â", "|": "ô", "}": "û", "~": "ç" }, g0_latin__german: { "#": "#", $: "$", "@": "§", "[": "Ä", "\\": "Ö", "]": "Ü", "^": "^", _: "_", "`": "°", "{": "ä", "|": "ö", "}": "ü", "~": "ß" }, g0_latin__italian: { "#": "£", $: "$", "@": "é", "[": "°", "\\": "ç", "]": "→", "^": "↑", _: "#", "`": "ù", "{": "à", "|": "ò", "}": "è", "~": "ì" }, g0_latin__latvian_lithuanian: { "#": "#", $: "$", "@": "Š", "[": "ė", "\\": "ę", "]": "Ž", "^": "č", _: "ū", "`": "š", "{": "ą", "|": "ų", "}": "ž", "~": "į" }, g0_latin__polish: { "#": "#", $: "ń", "@": "ą", "[": "Ƶ", "\\": "Ś", "]": "Ł", "^": "ć", _: "ó", "`": "ę", "{": "ż", "|": "ś", "}": "ł", "~": "ź" }, g0_latin__portuguese_spanish: { "#": "ç", $: "$", "@": "¡", "[": "á", "\\": "é", "]": "í", "^": "ó", _: "ú", "`": "¿", "{": "ü", "|": "ñ", "}": "è", "~": "à" }, g0_latin__romanian: { "#": "#", $: "¤", "@": "Ț", "[": "Â", "\\": "Ș", "]": "Ă", "^": "Î", _: "ı", "`": "ț", "{": "â", "|": "ș", "}": "ă", "~": "î" }, g0_latin__serbian_croatian_slovenian: { "#": "#", $: "Ë", "@": "Č", "[": "Ć", "\\": "Ž", "]": "Đ", "^": "Š", _: "ë", "`": "č", "{": "ć", "|": "ž", "}": "đ", "~": "š" }, g0_latin__swedish_finnish_hungarian: { "#": "#", $: "¤", "@": "É", "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", _: "_", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" }, g0_latin__turkish: { "#": "₺", $: "ğ", "@": "İ", "[": "Ş", "\\": "Ö", "]": "Ç", "^": "Ü", _: "Ğ", "`": "ı", "{": "ş", "|": "ö", "}": "ç", "~": "ü" }, g2_latin: { 0: "°", 1: "±", 2: "²", 3: "³", 4: "×", 5: "µ", 6: "¶", 7: "·", 8: "÷", 9: "’", "!": "¡", '"': "¢", "#": "£", "%": "¥", "&": "#", "'": "§", "(": "¤", ")": "‘", "*": "“", "+": "«", ",": "←", "-": "↑", ".": "→", "/": "↓", ":": "”", ";": "»", "<": "¼", "=": "½", ">": "¾", "?": "¿", "@": " ", A: "̀", B: "́", C: "̂", D: "̃", E: "̄", F: "̆", G: "̇", H: "̈", I: "̣", J: "̊", K: "̧", L: "̲", M: "̋", N: "̨", O: "̌", P: "—", Q: "¹", R: "®", S: "©", T: "™", U: "♪", V: "₠", W: "‰", X: "α", Y: null, Z: null, "[": null, "\\": "⅛", "]": "⅜", "^": "⅝", _: "⅞", "`": "Ω", a: "Æ", b: "Ð", c: "ª", d: "Ħ", e: null, f: "Ĳ", g: "Ŀ", h: "Ł", i: "Ø", j: "Œ", k: "º", l: "Þ", m: "Ŧ", n: "Ŋ", o: "ŉ", p: "ĸ", q: "æ", r: "đ", s: "ð", t: "ħ", u: "ı", v: "ĳ", w: "ŀ", x: "ł", y: "ø", z: "œ", "{": "ß", "|": "þ", "}": "ŧ", "~": "ŋ", "": "■" }, g0_greek: { "<": "«", ">": "»", "@": "ΐ", A: "Α", B: "Β", C: "Γ", D: "Δ", E: "Ε", F: "Ζ", G: "Η", H: "Θ", I: "Ι", J: "Κ", K: "Λ", L: "Μ", M: "Ν", N: "Ξ", O: "Ο", P: "Π", Q: "Ρ", R: "ʹ", S: "Σ", T: "Τ", U: "Υ", V: "Φ", W: "Χ", X: "Ψ", Y: "Ω", Z: "Ϊ", "[": "Ϋ", "\\": "ά", "]": "έ", "^": "ή", _: "ί", "`": "ΰ", a: "α", b: "β", c: "γ", d: "δ", e: "ε", f: "ζ", g: "η", h: "θ", i: "ι", j: "κ", k: "λ", l: "μ", m: "ν", n: "ξ", o: "ο", p: "π", q: "ρ", r: "ς", s: "σ", t: "τ", u: "υ", v: "φ", w: "χ", x: "ψ", y: "ω", z: "ϊ", "{": "ϋ", "|": "ό", "}": "ύ", "~": "ώ", "": "■" }, g2_greek: { 0: "°", 1: "±", 2: "²", 3: "³", 4: "×", 5: "m", 6: "n", 7: "p", 8: "÷", 9: "’", "!": "a", '"': "b", "#": "£", $: "e", "%": "h", "&": "i", "'": "§", "(": ":", ")": "‘", "*": "“", "+": "k", ",": "←", "-": "↑", ".": "→", "/": "↓", ":": "”", ";": "t", "<": "¼", "=": "½", ">": "¾", "?": "x", "@": " ", A: "̀", B: "́", C: "̂", D: "̃", E: "̄", F: "̆", G: "̇", H: "̈", I: "̣", J: "̊", K: "̧", L: "̲", M: "̋", N: "̨", O: "̌", P: "?", Q: "¹", R: "®", S: "©", T: "™", U: "♪", V: "₠", W: "‰", X: "ɑ", Y: "Ί", Z: "Ύ", "[": "Ώ", "\\": "⅛", "]": "⅜", "^": "⅝", _: "⅞", "`": "C", a: "D", b: "F", c: "G", d: "J", e: "L", f: "Q", g: "R", h: "S", i: "U", j: "V", k: "W", l: "Y", m: "Z", n: "Ά", o: "Ή", p: "c", q: "d", r: "f", s: "g", t: "j", u: "l", v: "q", w: "r", x: "s", y: "u", z: "v", "{": "w", "|": "y", "}": "z", "~": "Έ", "": "■" }, g0_cyrillic: { "@": "Ю", A: "А", B: "Б", C: "Ц", D: "Д", E: "Е", F: "Ф", G: "Г", H: "Х", I: "И", J: "Ѝ", K: "К", L: "Л", M: "М", N: "Н", O: "О", P: "П", Q: "Я", R: "Р", S: "С", T: "Т", U: "У", V: "Ж", W: "В", X: "Ь", Z: "З", "[": "Ш", "]": "Щ", "^": "Ч", "`": "ю", a: "а", b: "б", c: "ц", d: "д", e: "е", f: "ф", g: "г", h: "х", i: "и", j: "ѝ", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "я", r: "р", s: "с", t: "т", u: "у", v: "ж", w: "в", x: "ь", z: "з", "{": "ш", "}": "щ", "~": "ч", "": "■" }, g0_cyrillic__russian_bulgarian: { "&": "ы", Y: "Ъ", "\\": "Э", _: "Ы", y: "ъ", "|": "э" }, g0_cyrillic__serbian_croatian: { "@": "Ч", J: "Ј", Q: "Ќ", V: "В", W: "Ѓ", X: "Љ", Y: "Њ", "[": "Ћ", "\\": "Ж", "]": "Ђ", "^": "Ш", _: "Џ", "`": "ч", j: "ј", q: "ќ", v: "в", w: "ѓ", x: "љ", y: "њ", "{": "ћ", "|": "ж", "}": "ђ", "~": "ш" }, g0_cyrillic__ukranian: { "&": "ї", Y: "І", "\\": "Є", _: "Ї", y: "і", "|": "є" }, g2_cyrillic: { 0: "m", 1: "n", 2: "p", 3: "t", 4: "x", 5: "x", 6: "°", 7: "±", 8: "²", 9: "³", "!": "a", '"': "b", "#": "£", $: "e", "%": "h", "&": "i", "'": "§", "(": ":", ")": "‘", "*": "“", "+": "k", ",": "←", "-": "↑", ".": "→", "/": "↓", ":": "¼", ";": "½", "<": "¾", "=": "÷", ">": "’", "?": "”", "@": " ", A: "̀", B: "́", C: "̂", D: "̃", E: "̄", F: "̆", G: "̇", H: "̈", I: "̣", J: "̊", K: "̧", L: "̲", M: "̋", N: "̨", O: "̌", P: "?", Q: "©", R: "®", S: "¹", T: "ɑ", U: "Ί", V: "Ύ", W: "Ώ", X: "‰", Y: "₠", Z: "™", "[": "⅛", "\\": "⅜", "]": "⅝", "^": "⅞", _: "♪", "`": "C", a: "D", b: "F", c: "G", d: "J", e: "L", f: "Q", g: "R", h: "S", i: "U", j: "V", k: "W", l: "Y", m: "Z", n: "Ά", o: "Ή", p: "c", q: "d", r: "f", s: "g", t: "j", u: "l", v: "q", w: "r", x: "s", y: "u", z: "v", "{": "w", "|": "y", "}": "z", "~": "Έ", "": "■" }, g0_arabic: { "#": "£", "&": "ﻰ", "'": "ﻱ", "(": ")", ")": "(", ";": "؛", "<": ">", ">": "<", "?": "؟", "@": "ﺔ", A: "ﺀ", B: "ﺒ", C: "ﺏ", D: "ﺘ", E: "ﺕ", F: "ﺎ", G: "ﺍ", H: "ﺑ", I: "ﺓ", J: "ﺗ", K: "ﺛ", L: "ﺟ", M: "ﺣ", N: "ﺧ", O: "ﺩ", P: "ﺫ", Q: "ﺭ", R: "ﺯ", S: "ﺳ", T: "ﺷ", U: "ﺻ", V: "ﺿ", W: "ﻃ", X: "ﻇ", Y: "ﻋ", Z: "ﻏ", "[": "ﺜ", "\\": "ﺠ", "]": "ﺤ", "^": "ﺨ", _: "#", "`": "ـ", a: "ﻓ", b: "ﻗ", c: "ﻛ", d: "ﻟ", e: "ﻣ", f: "ﻧ", g: "ﻫ", h: "ﻭ", i: "ﻰ", j: "ﻳ", k: "ﺙ", l: "ﺝ", m: "ﺡ", n: "ﺥ", o: "ﻴ", p: "ﻯ", q: "ﻌ", r: "ﻐ", s: "ﻔ", t: "ﻑ", u: "ﻘ", v: "ﻕ", w: "ﻙ", x: "ﻠ", y: "ﻝ", z: "ﻤ", "{": "ﻡ", "|": "ﻨ", "}": "ﻥ", "~": "ﻻ", "": "■" }, g2_arabic: { 0: "٠", 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", "!": "ﻉ", '"': "ﺁ", "#": "ﺃ", $: "ﺅ", "%": "ﺇ", "&": "ﺋ", "'": "ﺊ", "(": "ﭼ", ")": "ﭽ", "*": "ﭺ", "+": "ﭘ", ",": "ﭙ", "-": "ﭖ", ".": "ﮊ", "/": "ﮔ", ":": "ﻎ", ";": "ﻍ", "<": "ﻼ", "=": "ﻬ", ">": "ﻪ", "?": "ﻩ", "@": "à", "[": "ë", "\\": "ê", "]": "ù", "^": "î", _: "ﻊ", "`": "é", "{": "â", "|": "ô", "}": "û", "~": "ç", "": "■" }, g0_hebrew: { "#": "£", "[": "←", "\\": "½", "]": "→", "^": "↑", _: "#", "`": "א", a: "ב", b: "ג", c: "ד", d: "ה", e: "ו", f: "ז", g: "ח", h: "ט", i: "י", j: "ך", k: "כ", l: "ל", m: "ם", n: "מ", o: "ן", p: "נ", q: "ס", r: "ע", s: "ף", t: "פ", u: "ץ", v: "צ", w: "ק", x: "ר", y: "ש", z: "ת", "{": "₪", "|": "‖", "}": "¾", "~": "÷", "": "■" }, g1_block_mosaic_to_unicode__legacy_computing: { 0: "🬏", 1: "🬐", 2: "🬑", 3: "🬒", 4: "🬓", 5: "▌", 6: "🬔", 7: "🬕", 8: "🬖", 9: "🬗", " ": " ", "!": "🬀", '"': "🬁", "#": "🬂", $: "🬃", "%": "🬄", "&": "🬅", "'": "🬆", "(": "🬇", ")": "🬈", "*": "🬉", "+": "🬊", ",": "🬋", "-": "🬌", ".": "🬍", "/": "🬎", ":": "🬘", ";": "🬙", "<": "🬚", "=": "🬛", ">": "🬜", "?": "🬝", "`": "🬞", a: "🬟", b: "🬠", c: "🬡", d: "🬢", e: "🬣", f: "🬤", g: "🬥", h: "🬦", i: "🬧", j: "▐", k: "🬨", l: "🬩", m: "🬪", n: "🬫", o: "🬬", p: "🬭", q: "🬮", r: "🬯", s: "🬰", t: "🬱", u: "🬲", v: "🬳", w: "🬴", x: "🬵", y: "🬶", z: "🬷", "{": "🬸", "|": "🬹", "}": "🬺", "~": "🬻", "": "█" }, g1_block_mosaic_to_unicode__unscii_separated: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", " ": " ", "!": "", '"': "", "#": "", $: "", "%": "", "&": "", "'": "", "(": "", ")": "", "*": "", "+": "", ",": "", "-": "", ".": "", "/": "", ":": "", ";": "", "<": "", "=": "", ">": "", "?": "", "`": "", a: "", b: "", c: "", d: "", e: "", f: "", g: "", h: "", i: "", j: "", k: "", l: "", m: "", n: "", o: "", p: "", q: "", r: "", s: "", t: "", u: "", v: "", w: "", x: "", y: "", z: "", "{": "", "|": "", "}": "", "~": "", "": "" }, g3: { 0: "🭇", 1: "🭈", 2: "🭉", 3: "🭊", 4: "🭋", 5: "◢", 6: "🭌", 7: "🭍", 8: "🭎", 9: "🭏", " ": "🬼", "!": "🬽", '"': "🬾", "#": "🬿", $: "🭀", "%": "◣", "&": "🭁", "'": "🭂", "(": "🭃", ")": "🭄", "*": "🭅", "+": "🭆", ",": "🭨", "-": "🭩", ".": "🭰", "/": "▒", ":": "🭐", ";": "🭑", "<": "🭪", "=": "🭫", ">": "🭵", "?": "█", "@": "┷", A: "┯", B: "┝", C: "┥", D: "🮤", E: "🮥", F: "🮦", G: "🮧", H: "🮠", I: "🮡", J: "🮢", K: "🮣", L: "┿", M: "•", N: "●", O: "○", P: "│", Q: "─", R: "┌", S: "┐", T: "└", U: "┘", V: "├", W: "┤", X: "┬", Y: "┴", Z: "┼", "[": "→", "\\": "←", "]": "↑", "^": "↓", _: " ", "`": "🭒", a: "🭓", b: "🭔", c: "🭕", d: "🭖", e: "◥", f: "🭗", g: "🭘", h: "🭙", i: "🭚", j: "🭛", k: "🭜", l: "🭬", m: "🭭", n: null, o: null, p: "🭝", q: "🭞", r: "🭟", s: "🭠", t: "🭡", u: "◤", v: "🭢", w: "🭣", x: "🭤", y: "🭥", z: "🭦", "{": "🭧", "|": "🭮", "}": "🭯", "~": null, "": null } }, Y = {};
class Pt {
  constructor(t) {
    this.type = t.Ls, this.flashing = t.Hs, this.concealed = t.Xs, this.size = t.It, this.sextants = t.wi();
  }
}
class Et {
  constructor() {
    this.Si = " ", this.xi = " ", this.Ri = A.WHITE, this.Ui = A.BLACK, this.Di = o.Tt, this.Li = !1, this.ki = C.Jt, this.Oi = !1, this.Fi = !1, this.Gi = null, this.Hi = !1, this.Ni = null, this.ji = null;
  }
  set Pi(t) {
    this.Si = t;
  }
  get Pi() {
    return this.Si;
  }
  set vs(t) {
    this.Ri = t;
  }
  get vs() {
    return this.Ri;
  }
  set Rs(t) {
    this.Ui = t;
  }
  get Rs() {
    return this.Ui;
  }
  get et() {
    return this.Hi;
  }
  Mi(t) {
    const e = this.Di, s = this.Si;
    ((i, n) => {
      const h = i === o.Tt, g = i === o.qt || i === o.zt, c = !(32 & n.charCodeAt(0));
      return h || g && c;
    })(e, s) ? (this.xi = M(s, t), this.Ni > 0 && (this.xi += N.g2_latin[String.fromCharCode(this.Ni + 64)]), t.includes("arabic") && (this.Hi = G.et(this.xi))) : this.xi = ((i, n) => {
      switch (i) {
        case o.qt:
          return M(n, "g1_block_mosaic_to_unicode__legacy_computing");
        case o.zt:
          return M(n, "g1_block_mosaic_to_unicode__unscii_separated");
        case o.Vt:
          return M(n, "g3");
        default:
          return null;
      }
    })(e, s), this.Gi = null;
  }
  Ti(t) {
    if (this.Di != o.qt && this.Di != o.zt || !t.qi) this.Gi = null, this.xi = " ";
    else {
      this.Gi = t.Ys, this.Di = t.Ls;
      let e = "g1_block_mosaic_to_unicode__legacy_computing";
      this.Di == o.zt && (e = "g1_block_mosaic_to_unicode__unscii_separated"), this.xi = M(t.Ys, e);
    }
  }
  get Ys() {
    return this.xi;
  }
  get Ls() {
    return this.Di;
  }
  set Ls(t) {
    this.Di = t;
  }
  set Hs(t) {
    this.Li = t;
  }
  get Hs() {
    return this.Li;
  }
  get It() {
    return this.ki;
  }
  set It(t) {
    this.ki = t;
  }
  set Xs(t) {
    this.Oi = t;
  }
  get Xs() {
    return this.Oi;
  }
  set Os(t) {
    this.Fi = t;
  }
  get Os() {
    return this.Fi;
  }
  Us() {
    if (this.Gi) return !0;
    const t = this.Si.charCodeAt(0);
    return t <= 127 && !(32 & ~t);
  }
  zi() {
    const t = this.Si.charCodeAt(0);
    return (this.Di == o.qt || this.Di == o.zt) && t <= 127 && !(32 & ~t);
  }
  wi() {
    const t = this.Gi != null ? this.Gi.charCodeAt(0) : this.Si.charCodeAt(0);
    if (t > 127) return null;
    if (t in Y) return Y[t];
    const e = t >= 96 ? t - 64 : t - 32, s = [];
    for (let i = 0; i < 6; i++) s.push(e & 1 << i ? "1" : "0");
    return Y[t] = s, s;
  }
}
class Dt extends Et {
  constructor(t) {
    super(), Object.assign(this, t);
  }
  set Vi(t) {
    this.Ni = t;
  }
  get Vi() {
    return this.Ni;
  }
  set Ji(t) {
    this.ji = t;
  }
  get Ys() {
    return this.ji == null ? this.xi : this.ji;
  }
}
function M(r, t) {
  if (!(t in N)) throw Error("Cell getCharWithEncoding: bad encoding: " + t);
  if (r in N[t]) return N[t][r];
  const e = t.match(/^(.+)__/);
  if (e != null) {
    const s = e[1];
    if (r in N[s]) return N[t][r] = N[s][r], N[s][r];
  }
  return r;
}
class ot extends E {
  constructor(t, e, s) {
    super(t, s), this.Ki = e, this.Yi = /* @__PURE__ */ new Set();
  }
  ns() {
    super.ns(), this.Xi = [], this.Zi = this.d.Qt();
  }
  ds(t) {
    super.ds(t), this.Wi(t);
  }
  ks(t, e, s, i, n, h, g) {
    "Ei" in this.Bs && this.Bs.Ei(h, n, e.It, e.Rs), e.Ls != o.Tt && e.Ls != o.Vt && g ? g && (t.wt(" ").ht(s), this.$i(h, n, e, i)) : (this.Ks(t, e, s, i, n, h), e.Ls == o.Vt && t.ot("mosaic"));
  }
  $i(t, e, s, i) {
    if ("ui" in this.Bs) {
      const f = new Pt(s);
      if (this.Bs.ui(t, e, f, i)) return;
    }
    const n = s.wi();
    if (!n.includes("1")) return;
    const h = (s.Ls == o.qt ? "c" : "s") + n.join("");
    let g, c = E.Qi, d = E.fi;
    if (s.Ls == o.qt && (c = E.Qi + 0.3, d = E.fi + 0.2), !this.Yi.has(h)) {
      this.Yi.add(h);
      const f = this.es.yt(h);
      if (s.Ls == o.qt) {
        f.ht({ preserveAspectRatio: "none", width: c, height: d, viewBox: "0 0 12 18" });
        for (let _ = 0; _ < 6; _++) n[_] == "1" && f.xt(6, 6).Nt(_ % 2 * 6, 6 * Math.floor(_ / 2));
      } else {
        f.ht({ preserveAspectRatio: "none", width: c, height: d, viewBox: "0 0 12 18" });
        for (let _ = 0; _ < 6; _++) n[_] == "1" && f.xt(4, 4).Nt(_ % 2 * 6 + 1, 6 * Math.floor(_ / 2) + 2);
      }
    }
    g = s.Ls == o.qt ? this.Xi[t].Ot(h).Nt(e * E.Qi - 0.15, t * E.fi - 0.1).Ht(i) : this.Xi[t].Ot(h).Nt(e * E.Qi, t * E.fi).Ht(i), this.Ki && g.ht({ width: c, height: d }), (s.It == C.Kt || s.It == C.Xt) && g.ht("height", E.pi), (s.It == C.Yt || s.It == C.Xt) && g.ht("width", E.di), s.Hs && g.ot("flash"), s.Xs && g.ot("conceal");
  }
  Wi(t) {
    this.Xi[t] && this.Xi[t].Lt(), this.Xi[t] = this.Zi.Qt();
  }
  Ds(t, e, s) {
    return t == o.Vt ? { dx: E.mi.Wt.ts, dy: -0.15, textLength: E.mi.Wt.$t, lengthAdjust: "spacingAndGlyphs", "text-anchor": "start", transform: null, class: null } : { dx: null, dy: null, textLength: s ? E.Qi : null, lengthAdjust: s ? "spacingAndGlyphs" : null, "text-anchor": null, transform: null, class: null };
  }
}
class Rt {
  constructor(t) {
    this.As = t, this.te = 0, this.se = 0, this.ie = [];
  }
  pos(t, e) {
    return t = parseInt(t), e = parseInt(e), t < 0 || t > 39 || e < 0 || e > 24 || (this.te = t, this.se = e), this;
  }
  putG0(t, e) {
    let s = null;
    if (typeof e < "u") {
      const n = parseInt(e);
      n >= 0 && n <= 15 && (s = n);
    }
    const i = t.charCodeAt(0);
    return i < 32 || i > 127 || this.ie.push({ ee: this.te, re: this.se, Ls: "g0", Ys: t, Vi: s }), this;
  }
  putG1(t) {
    const e = t.charCodeAt(0);
    return e < 32 || e > 127 || this.ie.push({ ee: this.te, re: this.se, Ls: "g1", Ys: t }), this;
  }
  putG2(t) {
    const e = t.charCodeAt(0);
    return e < 32 || e > 127 || this.ie.push({ ee: this.te, re: this.se, Ls: "g2", Ys: t }), this;
  }
  putG3(t) {
    const e = t.charCodeAt(0);
    return e < 32 || e > 127 || this.ie.push({ ee: this.te, re: this.se, Ls: "g3", Ys: t }), this;
  }
  putAt() {
    return this.ie.push({ ee: this.te, re: this.se, Ls: "char", Ys: "@" }), this;
  }
  end() {
    return this.As.ne(this.ie), this.As._e(), this;
  }
}
class Tt extends E {
}
const kt = ["SPLASH", "ENGINEERING", "ADVERT", "UK"];
class Ut {
  constructor(t, e) {
    if (this.he = null, typeof window == "object" && (this.he = window), this.oe = { Ae: !0 }, typeof e == "object" && ("webkitCompat" in e && !e.webkitCompat && (this.oe.Ae = !1), "dom" in e && (this.he = e.dom)), this.he == null) throw Error("TeletextController E24: No window dom object available");
    this.ge = new ot(t, this.oe.Ae, this.he), this.As = t, this.le = 1, this.ae = 0, this.ce(), this.Ce = null, this.Ee = null, this.ue = 0, this.Ie = 0, this.Be = null;
  }
  setRowFromOutputLine(t, e) {
    const s = G.st(e);
    this.As.Qe(t, s);
  }
  setRow(t, e) {
    this.As.Qe(t, e);
  }
  setPageFromOutputLines(t, e) {
    const s = G.it(t);
    typeof e < "u" && (s[0] = this.fe(e)), this.setPageRows(s);
  }
  setPageRows(t) {
    this.As.de(), this.As.pe(t);
  }
  fe(t) {
    return (t = G.st(t)).join("").substring(0, 32).padStart(40, " ");
  }
  showTestPage(t) {
    let e;
    t in X ? e = X[t] : (e = X[kt[this.ae]], this.ae++, this.ae == 4 && (this.ae = 0)), this.loadPageFromEncodedString(e);
  }
  showRandomisedPage() {
    const t = [];
    for (let e = 0; e < 25; e++) {
      const s = [];
      for (let i = 0; i < 40; i++) s.push(String.fromCharCode(127 * Math.random()));
      t.push(s.join(""));
    }
    this.setPageRows(t);
  }
  loadPageFromEncodedString(t, e) {
    const s = G.tt(t, this.he.atob);
    typeof e < "u" && (s[0] = this.fe(e)), this.setPageRows(s);
  }
  ce() {
    this.ye = { be: () => this.ge.Zs(), me: () => this.ge.si(), we: () => this.ge.hi() }, this.he.addEventListener("ttx.reveal", this.ye.be), this.he.addEventListener("ttx.mix", this.ye.me), this.he.addEventListener("ttx.subtitlemode", this.ye.we);
  }
  destroy() {
    this.he.removeEventListener("ttx.reveal", this.ye.be), this.he.removeEventListener("ttx.mix", this.ye.me), this.he.removeEventListener("ttx.subtitlemode", this.ye.we), this.ye = null;
  }
  toggleReveal() {
    this.ge.Zs();
  }
  toggleMixMode() {
    this.ge.si();
  }
  toggleBoxMode() {
    this.ge.hi();
  }
  toggleGrid() {
    this.ge.$s();
  }
  setLevel(t) {
    this.As.Se(t);
  }
  addTo(t) {
    this.xe = t, this.ge.Et(t);
  }
  setFont(t) {
    this.Be = t, this.ge.Ws(t);
  }
  clearScreen(t) {
    this.As.de(), this.As.Re(t);
  }
  setAspectRatio(t) {
    if (t == "natural") return void this.ge.ri(t);
    const e = parseFloat(t);
    if (Number.isNaN(e)) throw Error("E80 setAspectRatio: bad number");
    this.ge.ri(e);
  }
  setHeight(t) {
    const e = parseFloat(t);
    if (Number.isNaN(e)) throw Error("E98 setHeight: bad number");
    this.ge.ni(e), this.Ee = e;
  }
  setDefaultG0Charset(t, e) {
    if (t.match(/g0_/) == null) throw Error("E130 setDefaultG0Charset: Bad g0 set");
    this.As.Ue(t, e);
  }
  setSecondG0Charset(t, e) {
    if (t.match(/g0_/) == null) throw Error("E136 setSecondG0Charset: Bad g0 set");
    this.As.ve(t, e);
  }
  setG2Charset(t, e) {
    if (t.match(/g2_/) == null) throw Error("E142 setG2Charset: Bad g2 set");
    this.As.De(t, e);
  }
  remove() {
    if (this.ge.Qs(), this.xe) {
      const t = this.he.document.querySelector(this.xe);
      t && t.removeChild(t.firstChild);
    }
    this.ge = null;
  }
  setView(t) {
    switch (this.remove(), t) {
      case "classic__font-for-mosaic":
        this.ge = new Tt(this.As, this.he);
        break;
      case "classic__graphic-for-mosaic":
        this.ge = new ot(this.As, this.oe.Ae, this.he);
        break;
      default:
        throw Error("setView E126: bad view name:" + t);
    }
    this.Ee && this.ge.ni(this.Ee), this.Be && this.ge.Ws(this.Be), this.xe && this.ge.Et(this.xe), this.As._e();
  }
  registerViewPlugin(t) {
    t.registerWithView(this.ge), this.As._e();
  }
  enhance() {
    return new Rt(this.As);
  }
  writeBytes(t, e, s, i) {
    this.As.Le(t, e, s, i);
  }
  writeByte(t, e, s, i) {
    this.As.ke(t, e, s, i);
  }
  plot(t, e) {
    this.As.Oe(t, e);
  }
  plotPoints(t, e, s, i) {
    this.As.Fe(t, e, s, i);
  }
  getBytes() {
    return this.As.Ge();
  }
  getScreenImage() {
    return this.ge.oi();
  }
  updateDisplay() {
    this.As._e();
  }
}
class Ht {
  constructor(t) {
    this.He = t, this.Ne = [];
  }
  ls(t) {
    return this.Ne.push(t), this.Ne.length - 1;
  }
  _e(t) {
    this.Ne.forEach((e) => e != null && e(this.He, t));
  }
  Qs(t) {
    this.Ne[t] = null;
  }
}
class Mt {
  constructor() {
    this.je = !1, this.Pe = [];
  }
  get Ns() {
    return this.je;
  }
  set Ns(t) {
    this.je = t;
  }
  Me(t) {
    this.Pe.push(t);
  }
  xs(t) {
    if (t >= this.Pe.length) throw Error("RowModel.getCell E20 bad cell index");
    return this.Pe[t];
  }
}
const L = 25, y = 40, Gt = [B[1.5], B[2.5]];
class qt {
  constructor() {
    this.Te = [];
    for (let t = 0; t < L; t++) {
      const e = [];
      for (let s = 0; s < y; s++) e.push(new Et());
      this.Te.push(e);
    }
    this.qe = "g0_latin", this.ze = null, this.Ve = "g2_latin", this.Je = l.charFromAttribute(l.START_BOX), this.Ke = l.charFromAttribute(l.END_BOX), this.Ye = B[1], this.Xe = [], this.cs = new Ht(this);
  }
  _e() {
    this.cs._e();
  }
  Qe(t, e) {
    if (t >= L) throw Error("PageModel E29 bad row number");
    this.Ze(t, e), this.cs._e();
  }
  pe(t) {
    (t = t.slice(0, L)).forEach((e, s) => {
      this.Ze(s, e);
    }), this.cs._e();
  }
  Le(t, e, s, i) {
    for (let n = e, h = 0; n < L && h < s.length; n++, h++) {
      const g = [...s[h]].slice(0, y - t);
      for (let c = t, d = 0; c < y && d < g.length; c++, d++) this.Te[n][c].Pi = g[d];
    }
    typeof i < "u" && i && this.cs._e();
  }
  ke(t, e, s, i) {
    t >= 0 && t < y && e >= 0 && e < L && (this.Te[e][t].Pi = s), typeof i < "u" && i && this.cs._e();
  }
  Oe(t, e, s) {
    const i = Math.floor(e / 3), n = Math.floor(t / 2), h = this.Te[i][n].Si.charCodeAt(0);
    if (h < 32 || (s ? h == 32 : h == 255)) return;
    const g = t - 2 * n + 2 * (e - 3 * i);
    let c = 0;
    h < 64 ? c = h - 32 : h >= 96 && (c = h - 64), s ? c &= ~(1 << g) : c |= 1 << g, this.Te[i][n].Si = String.fromCharCode(c >= 32 ? c + 64 : c + 32);
  }
  Fe(t, e, s, i) {
    let n = 0, h = 0;
    for (let g = 0; g < i.length && e + n < 75; g++) t + h < 80 && (i[n * s + h] == 255 ? this.Oe(t + h, e + n) : this.Oe(t + h, e + n, !0)), h++, h == s && (n++, h = 0);
  }
  Ze(t, e) {
    let s = [...e];
    if (s = s.slice(0, y), s.forEach((i, n) => {
      const h = i.charCodeAt(0);
      if (Number.isNaN(h) || h > 127) throw Error(`PageModel E51 failed to write row: bad character code (${h}) at row ${t} col ${n}`);
      this.Te[t][n].Pi = i;
    }), s.length < y) for (let i = s.length; i < y; i++) this.Te[t][i].Pi = " ";
  }
  Se(t) {
    this.Ye = t, this.cs._e();
  }
  Re(t) {
    if (typeof t < "u" && !t) for (let e = 0; e < L; e++) this.Ze(e, "");
    else {
      const e = [];
      for (let s = 0; s < L; s++) e.push("");
      this.pe(e);
    }
  }
  Ue(t, e) {
    this.qe = t;
    const s = t.match(/^g0_([a-z]+)/);
    if (s != null) {
      const i = "g2_" + s[1];
      i in N ? this.Ve = i : s[1] == "hebrew" && (this.Ve = "g2_arabic");
    }
    e && this.cs._e();
  }
  ve(t, e) {
    this.ze = t, e && this.cs._e();
  }
  De(t, e) {
    this.Ve = t, e && this.cs._e();
  }
  ys(t) {
    if (t >= L) throw Error("PageModel.getRow E42 bad rowNum");
    const e = new Mt();
    let s, i, n = o.Tt, h = A.WHITE, g = !1, c = C.Jt, d = !1, f = !1, _ = !1, w = !1, x = A.BLACK, T = o.qt, u = { qi: !1, Ys: " ", Ls: o.qt }, tt = [];
    return Gt.includes(this.Ye) && (tt = this.Xe.filter((a) => a.re == t)), this.Te[t].forEach((a, U) => {
      const et = a.Pi, R = ((I, O) => {
        let H = null, z = null;
        return O in D && P[I].includes(O.charCodeAt(0)) ? O in F ? (H = l.TEXT_COLOUR, z = D[O]) : O in j ? (H = l.MOSAIC_COLOUR, z = D[O]) : H = D[O] : O.charCodeAt(0) <= 31 && (H = l.Zt), { We: H, $e: z };
      })(this.Ye, et);
      switch (s = h, a.Ls = n, a.Os = w, i = d, R.We != l.STEADY && (a.Hs = g), R.We != l.NORMAL_SIZE && (a.It = c), R.We != l.CONCEAL && (a.Xs = f), _ && (R.We != l.HOLD_MOSAICS && (u.qi = !1, u.Ys = " "), _ = !1), R.We) {
        case l.TEXT_COLOUR:
          n = o.Tt, h = R.$e, f = !1, a.Ti(u);
          break;
        case l.MOSAIC_COLOUR:
          n = T, h = R.$e, f = !1, a.Ti(u);
          break;
        case l.NEW_BACKGROUND:
          x = s, a.Ti(u);
          break;
        case l.BLACK_BACKGROUND:
          x = A.BLACK, a.Ti(u);
          break;
        case l.CONTIGUOUS_GRAPHICS:
          T = o.qt, a.Ls == o.zt && (a.Ls = o.qt), n == o.zt && (n = o.qt), a.Ti(u);
          break;
        case l.SEPARATED_GRAPHICS:
          T = o.zt, a.Ls == o.qt && (a.Ls = o.zt), n == o.qt && (n = o.zt), a.Ti(u);
          break;
        case l.ESC:
          this.ze && (d = !i), a.Ti(u);
          break;
        case l.FLASH:
          g = !0, a.Ti(u);
          break;
        case l.STEADY:
          a.Hs = !1, g = !1, a.Ti(u);
          break;
        case l.NORMAL_SIZE:
          a.It = C.Jt, c = C.Jt, a.Ti(u);
          break;
        case l.DOUBLE_HEIGHT:
          c = C.Kt, e.Ns = !0, a.Ti(u);
          break;
        case l.DOUBLE_WIDTH:
          c = C.Yt, a.Ti(u);
          break;
        case l.DOUBLE_SIZE:
          c = C.Xt, e.Ns = !0, a.Ti(u);
          break;
        case l.CONCEAL:
          a.Xs = !0, f = !0, a.Ti(u);
          break;
        case l.HOLD_MOSAICS:
          u.qi = !0, a.Ti(u);
          break;
        case l.RELEASE_MOSAICS:
          _ = !0, a.Ti(u);
          break;
        case l.START_BOX:
          U >= 1 && this.Te[t][U - 1].Pi == this.Je && (a.Os = !0, w = !0), a.Ti(u);
          break;
        case l.END_BOX:
          U + 1 < y && this.Te[t][U + 1].Pi == this.Ke && (w = !1), a.Ti(u);
          break;
        case l.Zt:
          a.Ti(u);
          break;
        default:
          a.Mi(i ? this.ze : this.qe), a.zi() && (u.Ys = et, u.Ls = a.Ls);
      }
      a.vs = s, a.Rs = x, tt.filter((I) => I.ee == U).forEach((I) => {
        a = new Dt(a), I.Ls == "g0" ? (a.Pi = I.Ys, a.Vi = I.Vi, a.Ls = o.Tt, this.qe.includes("latin") ? a.Mi("g0_latin") : a.Mi(this.qe)) : I.Ls == "g1" ? this.Ye == B[2.5] && (a.Pi = I.Ys, a.Ls = T, this.qe.includes("latin") ? a.Mi("g0_latin") : a.Mi(this.qe)) : I.Ls == "g2" ? (a.Pi = I.Ys, a.Ls = o.Tt, a.Mi(this.Ve)) : I.Ls == "g3" ? this.tr(I.Ys) && (a.Pi = I.Ys, a.Ls = o.Vt, a.Mi()) : I.Ls == "char" && (a.Ji = I.Ys, a.Ls = o.Tt);
      }), e.Me(a);
    }), e;
  }
  ne(t) {
    this.Xe = t;
  }
  de() {
    this.Xe = [];
  }
  Ge() {
    const t = new Uint8Array(L * y);
    return this.Te.forEach((e, s) => {
      e.forEach((i, n) => {
        t[s * y + n] = i.Pi.charCodeAt(0);
      });
    }), t;
  }
  tr(t) {
    return !(this.Ye == B[1.5] && "Q[\\]".indexOf(t) == -1);
  }
}
function Ft(r) {
  const t = new qt();
  return new Ut(t, r);
}
class jt {
  constructor(t) {
    this._baseURL = typeof t == "string" ? t : "./", this._magazine = null, this._magazineData = null;
  }
  async fetchPage(t) {
    const e = t.match(/^([1-8])[0-9A-Fa-f]{2}$/);
    if (e == null) return null;
    const s = e[1];
    if (t = t.toUpperCase(), this._magazine != s) {
      const i = `${this._baseURL}${s}.json`;
      try {
        const n = await fetch(i);
        if (n.ok) {
          const h = await n.json();
          "pages" in h ? (this._magazineData = h, this._magazine = s) : console.warn(`W21 fetchPage: 'pages' property missing in ${i}`);
        } else console.warn(`W22 fetchPage: failed to load magazine data from ${i} : ${n.status} ${n.statusText}`);
      } catch (n) {
        console.warn(`W24 fetchPage: failed to load magazine data from ${i}.json :`, n.message);
      }
    }
    return this._magazine == s && t in this._magazineData.pages ? this._magazineData.pages[t] : null;
  }
}
const zt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Xt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
class lt {
  constructor(t) {
    this._template = t;
  }
  _tokens() {
    const t = /* @__PURE__ */ new Date();
    return {
      "%%a": zt[t.getDay()],
      "%%b": Xt[t.getMonth()],
      "%d": String(t.getDate()).padStart(2, 0),
      "%e": String(t.getDate()).padStart(2, " "),
      "%m": String(t.getMonth() + 1).padStart(2, " "),
      "%y": String(t.getFullYear()).substring(2, 2),
      "%H": String(t.getHours()).padStart(2, 0),
      "%M": String(t.getMinutes()).padStart(2, 0),
      "%S": String(t.getSeconds()).padStart(2, 0)
    };
  }
  generate_(t) {
    const e = this._tokens();
    let s = this._template;
    for (const i of Object.keys(e))
      s = s.replace(i, e[i]);
    return typeof t < "u" && (s = s.replace("%%#", t)), s;
  }
}
const Yt = "       %%#  %%a %e %%b \x1BC%H:%M/%S";
class Vt {
  constructor(t) {
    if (typeof t != "object") throw new Error("E8 Service.constructor: options object required");
    if (!("DOMSelector" in t)) throw new Error("E9 Service.constructor DOMSelector property required");
    this._caster = "caster" in t ? t.caster : null, this._defaultG0Charset = "defaultG0Charset" in t ? t.defaultG0Charset : "g0_latin", this._header = "header" in t ? new lt(t.header) : new lt(Yt), this._fetcher = "fetcher" in t ? t.fetcher : new jt(t.baseURL), this._baseURL = "baseURL" in t ? t.baseURL : "./", this._ttx = Ft(), this._ttx.setDefaultG0Charset(this._defaultG0Charset), this._ttx.setLevel(B[1.5]), this._ttx.addTo(t.DOMSelector), this._page = null, this._pageNumber = null, this._subPageNumber = 0, this._fastext = null;
  }
  get teletextInstance() {
    return this._ttx;
  }
  async showPage(t) {
    if (typeof t == "number" && (t = String(t)), t.match(/^[1-8][0-9A-Fa-f]{2}$/) == null)
      return console.warn("W37 Service.showPage: bad page number", t), null;
    const s = await this._fetcher.fetchPage(t);
    if (s != null) {
      const i = this._getFirstSubPage(s);
      if (i != null)
        return this._page = s, this._pageNumber = t, this._subPageNumber = i, this._update(), this._pageMetaObj();
      console.info("No subpages for page", t);
    } else
      console.info("No page", t);
    return null;
  }
  showLink(t) {
    return this._fastext != null && t in this._fastext ? this.showPage(this._fastext[t]) : Promise.resolve(null);
  }
  _getFirstSubPage(t) {
    const e = t.subpages;
    for (let s = 0; s < e.length; s++)
      if (e[s] != null) return s;
    return null;
  }
  nextSubPage() {
    const t = this._page.subpages;
    let e = this._subPageNumber, s = !1;
    for (; !s && (e++, e == t.length && (e = 0), e != this._subPageNumber); )
      t[e] != null && (s = !0);
    return s && (this._subPageNumber = e, this._update()), this._pageMetaObj();
  }
  previousSubPage() {
    const t = this._page.subpages;
    let e = this._subPageNumber, s = !1;
    for (; !s && (e--, e == -1 && (e = t.length - 1), e != this._subPageNumber); )
      t[e] != null && (s = !0);
    return s && (this._subPageNumber = e, this._update()), this._pageMetaObj();
  }
  _pageMetaObj() {
    return {
      pageNumber: this._pageNumber,
      subPage: this._subPageNumber,
      numSubPages: this._page.subpages.filter((t) => t != null).length,
      fastext: this._fastext,
      webUrl: "webUrl" in this._page ? this._page.webUrl : null,
      image: "image" in this._page ? this._baseURL + this._page.image : null
    };
  }
  _update() {
    const t = this._page.subpages[this._subPageNumber], e = "encoding" in t ? t.encoding : this._defaultG0Charset, s = this._header.generate_(this._pageNumber);
    let i = {
      defaultG0Charset: e,
      header: s
    };
    if (this._ttx.clearScreen(!1), this._ttx.setDefaultG0Charset(e, !1), "outputLines" in t) {
      const n = t.outputLines.split(`
`);
      this._ttx.setPageFromOutputLines(n, s), i.outputLines = n;
    } else if ("packed" in t) {
      const n = t.packed;
      this._ttx.loadPageFromEncodedString(n, s), i.packed = n;
    } else
      console.error("E138 _update: outputLines or packed properties expected in subpage"), i = null;
    i && this._caster && this._caster.display(i), this._fastext = "fastext" in t ? t.fastext : null;
  }
}
class gt {
  constructor(t) {
    this.t = t, this.i = [];
  }
  attach(t) {
    this.i.push(t);
  }
  notify(t) {
    this.i.forEach((e, s) => this.i[s](this.t, t));
  }
}
const m = new class {
  constructor() {
    this.available = new gt(this), this.castStateChanged = new gt(this);
  }
  o() {
    if (typeof cast > "u") return;
    const r = { receiverApplicationId: "000F65B3", autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED };
    this.h = cast.framework.CastContext.getInstance(), this.h.setOptions(r), this.l = new cast.framework.RemotePlayer(), this.u = new cast.framework.RemotePlayerController(this.l), this.h.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, () => this.castStateChanged.notify()), this.available.notify(), this.castStateChanged.notify();
  }
  async display(r) {
    if (!this.m()) return;
    const t = this.p();
    this.u.stop();
    const e = new chrome.cast.media.MediaInfo("https://teletextforchromecast.robdev.org.uk/250-milliseconds-of-silence.mp3", "audio/mpeg3");
    e.entity = r;
    const s = new chrome.cast.media.LoadRequest(e);
    try {
      await t.loadMedia(s);
    } catch {
    }
  }
  getCastState() {
    return this.h.getCastState();
  }
  clearScreen() {
    this.M("clear");
  }
  toggleGrid() {
    this.M("grid");
  }
  toggleReveal() {
    this.M("reveal");
  }
  toggleMixMode() {
    this.M("mix");
  }
  toggleBoxMode() {
    this.M("box");
  }
  setSmoothMosaics() {
    this.M("smoothmosaic");
  }
  setBlockMosaics() {
    this.M("blockmosaic");
  }
  async M(r) {
    if (!this.m()) return;
    const t = this.p();
    try {
      await t.sendMessage("urn:x-cast:uk.ltd.techandsoftware.teletext", `"${r}"`);
    } catch {
    }
  }
  m() {
    return typeof this.l == "object" && this.l.isConnected;
  }
  p() {
    return this.h.getCurrentSession();
  }
}();
let ct = 0;
function Ct() {
  window.setTimeout(() => {
    typeof cast > "u" ? (ct++, ct < 10 && Ct()) : m.o();
  }, 500);
}
window.__onGCastApiAvailable = (r) => {
  r && (typeof cast > "u" ? Ct() : m.o());
};
const Kt = ["sans-serif", "Bedstead", "native", "serif", "Unscii", "monospace", "cursive"], $ = ["classic__graphic-for-mosaic", "classic__font-for-mosaic"], Wt = "OoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6RQIECBAgQYOHDhw4cOHDhw4cOHDhw4cOHBAgQIECBAgQIDo0igQIECBBqAy8vnFvw8siDHv3dOW_ZzI_2qBAgQIECBAgQIECBAgQIEHdAgQIECBAgQIECDjz9IECBAgQIECBAgQIECA6RQIECBAgQIl69evXr169evXr169evXr169KgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOhECCTmQed_VBow9sqDCg15fOLfh5ZFiDrzyoOmjKgQIECA6EQIN3Xbiy8kGvL55oMO7Ig6aMqDXl880GLLs390CBAgQIDoFAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOlNSNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjR_2iA6U1BECBA_QIECCll7ZcOxAgQIECBAgQIECBAUQIECBB_aoDpTUEQIEG1AgQIJunwgQIECBAgQIECBAgQIEBRAgQIEH9qgOlNQRAgQW0CBAgocsvbTv680HPri4Yc-VAgQFECBAgQf2qA6U1BECBBdQIECCdl8dEHPri4Yc-VAgQIECAogQIECBB_aoDpTUE5L86_yvxIIe_Zv68kGLr06b93NAgQIEBRAgQIEH9qgOlNQRAgQaUCBAgk7smXwgxdenTfuQIECBAgQFECBAgQf2qA6U1BECBB0QIECCpl5ctObTjQZ-WHho04-aDfuX782Yp_aoDpTUEQIEGZAgQII2_d0Qc--npj0IECBAgQIEBRAgQIEH9qgOlNQRAgQekCBAgtZdyDbvyZUG_cv35syBAgQFECBAgQf2qA6U1IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBB_aoDpREvXr169evXr169evXr169evXr169evXr169evXr169KgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6gQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA", $t = "https://cdn.jsdelivr.net/npm/@techandsoftware/teletext-plugin-smooth-mosaic@latest/dist/teletext-plugin-smooth-mosaic.min.js";
class Zt {
  constructor(t) {
    const e = {
      defaultG0Charset: "g0_latin__english",
      header: "FAXFAX %%#  %%a %e %%b \x1BC%H:%M/%S",
      caster: m,
      DOMSelector: "#teletextscreen"
    };
    let s = "", i = !1;
    if (this._fonts = Kt, this._serviceName = "FAXFAX", typeof t == "object") {
      for (const n of ["defaultG0Charset", "header", "DOMSelector", "baseURL"])
        n in t && (e[n] = t[n]);
      "frontPage" in t && (typeof t.frontPage == "number" ? s = String(t.frontPage) : typeof t.frontPage == "string" ? s = t.frontPage : t.frontPage == null), "smoothMosaics" in t && t.smoothMosaics && (i = !0), Array.isArray(t.fontList) && (this._fonts = t.fontList), "serviceName" in t && (this._serviceName = t.serviceName);
    }
    s == "" && (s = "100"), this._service = new Vt(e), this._initPageNumber(s), this._fontIndex = 0, this._viewIndex = 0, this._inhibitUpdateHistoryState = !1, m.available.attach(() => this._castAvailable.call(this)), m.castStateChanged.attach(() => this._castStateChanged.call(this)), this._initEventListeners(), this._service.teletextInstance.setFont(this._fonts[0]), i && this._toggleSmoothMosaics(), this._newPage();
  }
  _initPageNumber(t) {
    const e = t.length == 3 ? t : "XXX", s = new URL(window.location), i = s.pathname;
    if (i == "/") {
      this._pageNumber = e;
      return;
    }
    const n = i.match(/^\/(?<pageNumber>[1-8][0-9A-Fa-f]{2})$/);
    if (n) {
      this._pageNumber = n.groups.pageNumber;
      return;
    } else {
      s.pathname = "/", history.replaceState({}, "", s), this._pageNumber = e;
      return;
    }
  }
  _castStateChanged() {
    const t = m.getCastState(), e = document.querySelector("#castOuter");
    switch (t) {
      case "NO_DEVICES_AVAILABLE":
        e.title = "Cast to Chromecast - no devices available", e.style.cursor = "default";
        break;
      case "NOT_CONNECTED":
        e.title = "Cast to Chromecast", e.style.cursor = "pointer";
        break;
      case "CONNECTING":
        break;
      case "CONNECTED":
        this._newPage(), this._smoothPluginIsLoaded && m.setSmoothMosaics();
        break;
    }
  }
  _castAvailable() {
    document.querySelector("#castOuter").style.display = "inline-block";
  }
  _initEventListeners() {
    window.addEventListener("keydown", (t) => Jt.call(this, t)), window.addEventListener("popstate", (t) => this._handlePopState(t)), window.addEventListener("DOMContentLoaded", () => {
      document.querySelector("#revealButton").addEventListener("click", () => this._reveal()), document.querySelector("#mixButton").addEventListener("click", () => this._mix());
      for (const t of ["red", "green", "yellow", "blue", "index"])
        document.querySelector(`#${t}`).addEventListener("click", () => this._handleFastext(t));
      document.querySelectorAll("[data-num]").forEach((t) => t.addEventListener("click", () => this._numberInput(t.dataset.num))), document.querySelector("#left").addEventListener("click", () => this._previousSubPage()), document.querySelector("#right").addEventListener("click", () => this._nextSubPage()), document.querySelector("#helpicon").addEventListener("click", () => this._showHelp());
    });
  }
  _reveal() {
    window.dispatchEvent(new Event("ttx.reveal")), m.toggleReveal();
  }
  _mix() {
    window.dispatchEvent(new Event("ttx.mix")), m.toggleMixMode();
  }
  _numberInput(t) {
    String(this._pageNumber).length == 3 ? this._pageNumber = t : this._pageNumber = String(this._pageNumber) + t, this._updatePageNumber(), String(this._pageNumber).length == 3 && this._newPage();
  }
  _updatePageNumber() {
    document.querySelector("#pageNumber").innerHTML = this._pageNumber;
  }
  _clearPageNumber() {
    this._pageNumber = "XXX", document.querySelector("#pageNumber").innerHTML = "- - -", document.querySelector("#subpage").style.visibility = "hidden";
  }
  async _newPage() {
    if (this._pageNumber.match(/[1-8][0-9A-Fa-f]{2}/) != null) {
      const e = await this._service.showPage(this._pageNumber);
      this._update(e);
    }
  }
  _nextSubPage() {
    const t = this._service.nextSubPage();
    this._update(t);
  }
  _previousSubPage() {
    const t = this._service.previousSubPage();
    this._update(t);
  }
  _update(t) {
    t != null && (this._pageNumber = t.pageNumber, this._updatePageNumber(), this._updateSubpageNav(t), this._updateButtonState(t), this._updateWebLink(t.webUrl), this._updateMetaTags(t.image), this._updateHistoryState(), this._updateFocus());
  }
  // FUDGE Firefox keeps focus on disabled element which blocks keyboard entry
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1712587
  _updateFocus() {
    document.activeElement.disabled && document.activeElement.blur();
  }
  _updateSubpageNav(t) {
    const e = document.querySelector("#subpage");
    t != null && t.numSubPages > 1 ? (e.innerHTML = `${t.subPage} of ${t.numSubPages}`, e.style.visibility = "visible", document.querySelectorAll("#lrnav button").forEach((s) => s.disabled = !1)) : (e.style.visibility = "hidden", document.querySelectorAll("#lrnav button").forEach((s) => s.disabled = !0));
  }
  _updateButtonState(t) {
    const e = t != null ? t.fastext : {};
    for (const s of ["red", "green", "yellow", "blue", "index"]) {
      let i = !0;
      e != null && s in e && (i = !1), document.querySelector(`#${s}`).disabled = i;
    }
  }
  _updateWebLink(t) {
    const e = document.querySelector("#webicon");
    t == null ? (e.style.display = "none", e.href = "") : (e.href = t, e.style.display = "");
  }
  _updateMetaTags(t) {
    document.querySelectorAll("[data-meta]").forEach((s) => {
      s.remove();
    });
    const e = this._serviceName + " " + this._pageNumber;
    document.title = e, V("twitter:title", e), t != null && (V("twitter:card", "summary_large_image"), V("twitter:image", t));
  }
  _updateHistoryState() {
    if (this._inhibitUpdateHistoryState) {
      this._inhibitUpdateHistoryState = !1;
      return;
    }
    const t = {
      pageNumber: this._pageNumber
    }, e = "", s = new URL(window.location), i = s.pathname;
    s.pathname = `/${this._pageNumber}`, i == "/" || i == s.pathname ? history.replaceState(t, e, s) : history.pushState(t, e, s);
  }
  async _handleFastext(t) {
    const e = await this._service.showLink(t);
    this._update(e);
  }
  _disableNav() {
    for (const t of ["red", "green", "yellow", "blue", "index", "left", "right"])
      document.querySelector(`#${t}`).disabled = !0;
  }
  _showHelp() {
    this._clearPageNumber(), this._disableNav();
    const t = this._service.teletextInstance;
    t.setDefaultG0Charset("g0_latin__english", !1), t.loadPageFromEncodedString(Wt);
  }
  _generateBackground() {
    const t = Math.floor(Math.random() * 360), s = `linear-gradient(${Math.floor(Math.random() * 360)}deg, hsl(${t} 100% 7%) 0%, hsl(${t} 83% 52%) 86%, hsl(${t} 100% 85%) 100%)`;
    document.body.style.background = s;
  }
  async _toggleSmoothMosaics() {
    if (this._smoothPluginIsLoaded)
      this._service.teletextInstance.setView($[this._viewIndex]), this._smoothPluginIsLoaded = !1, m.setBlockMosaics();
    else if (this._viewIndex == 0)
      try {
        const t = await import(
          /* @vite-ignore */
          $t
        );
        this._service.teletextInstance.registerViewPlugin(t.SmoothMosaicPlugin), this._smoothPluginIsLoaded = !0, m.setSmoothMosaics();
      } catch (t) {
        console.error("TeletextServiceViewer: Failed to use smooth mosaic plugin: import failed:", t.message);
      }
  }
  _toggleZenMode() {
    document.body.classList.toggle("zen");
  }
  get teletextInstance() {
    return this._service.teletextInstance;
  }
  _handlePopState(t) {
    "pageNumber" in t.state && (this._pageNumber = t.state.pageNumber, this._inhibitUpdateHistoryState = !0, this._newPage());
  }
}
function V(r, t) {
  const e = document.createElement("meta");
  e.setAttribute("name", r), e.setAttribute("content", t), e.setAttribute("data-meta", ""), document.head.appendChild(e);
}
function Jt(r) {
  if (!(r.altKey || r.metaKey || r.ctrlKey))
    switch (r.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        document.querySelector(`#b${r.key}`).focus({ preventScroll: !0 }), this._numberInput(r.key);
        break;
      case "?":
        this._reveal();
        break;
      case "m":
        this._mix();
        break;
      case "f":
        this._fontIndex++, this._fontIndex == this._fonts.length && (this._fontIndex = 0), console.debug("setting font to", this._fonts[this._fontIndex]), this._service.teletextInstance.setFont(this._fonts[this._fontIndex]);
        break;
      case "w":
        this._service.teletextInstance.clearScreen();
        break;
      case "h":
        this._showHelp();
        break;
      case "v":
        this._viewIndex++, this._viewIndex == $.length && (this._viewIndex = 0), this._service.teletextInstance.setView($[this._viewIndex]), this._smoothPluginIsLoaded = !1;
        break;
      case "t":
        this._toggleSmoothMosaics();
        break;
      case "r":
        this._handleFastext("red");
        break;
      case "g":
        this._handleFastext("green");
        break;
      case "y":
        this._handleFastext("yellow");
        break;
      case "b":
        this._handleFastext("blue");
        break;
      case "i":
        this._handleFastext("index");
        break;
      case "=":
      case "+":
      case ">":
      case "ArrowRight":
        this._nextSubPage();
        break;
      case "-":
      case "<":
      case "ArrowLeft":
        this._previousSubPage();
        break;
      case "c":
        this._generateBackground();
        break;
      case "z":
        this._toggleZenMode();
        break;
    }
}
export {
  Vt as TeletextService,
  Zt as TeletextServiceViewer
};
//# sourceMappingURL=teletext-service.js.map
