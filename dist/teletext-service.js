/*! @techandsoftware/teletext-service
    SPDX-FileCopyrightText: (c) 2026 Rob Hardy
    SPDX-License-Identifier: AGPL-3.0-only */
let T = class rt {
  static tt(t, e) {
    const s = (t = t.replace(/-/g, "+").replace(/_/g, "/")).length % 4;
    if (s) {
      if (s === 1) throw Error("Utils.decodeBase64URLEncoded E16: Input base64url string is the wrong length to determine padding");
      t += Array(5 - s).join("=");
    }
    const i = e(t), n = [];
    let a = [];
    for (const l of (function* (c) {
      let _ = 6, d = 0;
      for (const f of c) {
        const C = ht(f.charCodeAt(0));
        for (const u of C) d |= u << _, _--, _ < 0 && (yield d, _ = 6, d = 0);
      }
      _ < 6 && (yield d);
    })(i)) a.push(String.fromCharCode(l)), a.length == 40 && (n.push(a.join("")), a = []);
    return a.length < 40 && n.push(a.join("")), n;
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
      n != null && (e[n[1]] = rt.st(n[2]));
    }
    return e;
  }
  static et(t) {
    return "ﻰﺋﺊﭼﭽﭘﭙﮔﻎﻼﻬﻪﻊﺔﺒﺘﺎﺑﺗﺛﺟﺣﺧﺳﺷﺻﺿﻃﻇﻋﻏﺜﺠﺤﺨـﻓﻗﻛﻟﻣﻧﻫﻰﻳﻴﻌﻐﻔﻘﻠﻤﻨ".indexOf(t) != -1;
  }
};
function ht(r) {
  let t = [];
  for (let e = 7; e >= 0; e--) t.push(r & 1 << e ? 1 : 0);
  return t;
}
const F = { ENGINEERING: "QIECBAgQIIcWLGg2EDdy3QIKnXKgYtUE7f2QA2TB0wYr2DECAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYMS54fzJmix4-YCDToOLOjyZ0WLSkzo6AkcGHuZUcRHlB4dgyAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAWDP9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YNCho9zImSoAqBGoAp0FUy8-iChhz5UCA4MPEuZYgTAFyAFg1_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2DYCAAoACACeQHkBdYTJlixIkSKlSJEoUKIEBQABAAQAEABYN_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39g4AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGDn9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YsAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIBix_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2LICAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYs_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39i0AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGLX9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_Ytq-jT0yg7OXZs39w0Pzh3Ao_LLl3BZuHPl3dMIGllyBIWzrlLmkKJGTSJUycsoUqlZJYtXLzLBiyZlWjVs3IuHLp2UePXz9AgQokaBIlTJ0ChSqVoFi1cvQMGLJmgaNWzdA4cunaB49fP0ECDChoIkWNHQSJMqWgmTZ09BQo0qaCpVrV0FizatoLl29fQYMOLGgyZc2dBo06taDZt3b0HDjy5oOnXt3QePPr2g-ff38pgw4sZHJlzZyujTq1ktm3dvNcOPLmW6de3cn48-vZf59_fwZiHv3Y8uHYIjbMPPQDVCxcLf4E0-mXDk8mI-_dlFCn5a9_DKr6q-qvqr6q-qvqr6AFS390DJoGQKr6q-qvqr6q-qvqr6o", ADVERT: "QIECBAgQIJ9KDDmRUDZi3QU8PRk1QQeHIHDaIEDJiwYumDACdDwcnbLy6aeeXbl3dECBAgQIECBAgQIECBAgQIHwZkvcoCx0og8LNGjYwQPEjzpoWaNjBA82YHnTQwabEjTpowPEiBAgLHSiBbs1atjFA9SPe2pZqQNUHX1qQatSlrqQNW-5UsaIECAsdKIFidUqQJUCVAlVKlipchQJUCJanVIEqpAlSqlC5CgQIEB0ogQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQHSKBAgQYEH7ogQaGCApw_fEm54R3PCm5JuSKHoFUEVIECAudIoECBB6-___TB-_v0JTU_WqkZHFyQKHmjYgYBECpAqQIC50igQIEH___3_-iD__6FFSAig-IP6JCg26lzRr3avEgFUgLnSKBAg1f1X9lv_9NSBAgI6G-HX1V_EqBUqQJUqXBzagVSAudIoECD9_Qa2qL__6IMDzoq682qdAgQIEARAgQIECBAgVIC50igQIP_9AiaoFX__0VfV_1kjQIECBAgQBECBAgAoECpAgLnSKBBq__0CBCgQa___oreokCBAgQIECBAgQBECBAgVIECAudIoEHr__QIECBAg3_36FAgQIECBAgQIECAIgQIFSBAgQIAZ0igQf_7dAgKIECAinKf9bTR9QIv-N6i_ofzNagQIECBAgJnSKDR__tUBRAoe6NiBB_XYf_rqg_q2iD-gRb-iBAgQIECAmdIoNX_-1QFECDrq9IMH9h664P_D-w34P7DZ4ToECBAgQICZ0ig___5TQ8SfEHzQ82MPCzpoedEHzA82MPjDQ0-LNDSk0JnSOD___lNXVh_Qf9T3cx_oP-prqa_1S3Y0_q_zX-s1NdTUmdI6v_9-U1NUH9B_1NdTX-g_6mvpL_wMNTX-g1Nf6DAz1tSZ0j-_v0JREjQokaFEhRIUSNCiRoUCNAjRoEaBEhRo0CNGgBnSP9OgQFECCNPpIIVKfDkVaUWmggzoiCFPny5M6PTQIECAGdIjUAGlJnR0DBu5coGrFm0YMEE-kgpxYqChBjxUDNuwQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy92np007s6AFSy9tOXvzQA7O_ryQTd-7L5DQVtpBJ3ZMvg", UK: "QIECBAgQIIcWLGg2EDFy2QIJu_cgZNUETLjQA2TN0xYr2DAodJIECBAgQIEGDB4_PUCBAgQIECBAgQIECBAgQIEANkvaMih0kgQIECDA1Qfv__OgQYGCBAgQIECBAgQIECBAgQIECBAgKHSSBAgQIH6FR-__-v7___oECBAgQIEAORPmxUE6LXpoECAodJIECBAoQKum7______9-gQIECBAgQA82_Zs39-aB8-QIAh0kgQIECBAgSev_____v06BAgQIECBAgQIECBAgQIECBAgKHSSBAgQIECBR00____-_w9GCBAgQIECBAgQIECBAgQIECAodJIECBAgQIECD8rx________ECBAgQIECBAgQIECBAgQICh0kgQIECBAgQLETRlv_______6oECBAgQIECBAgQIECBAgKHSyBAgQIHGQlwYIEH_-_x_____9-dECBAgQIECBAgQIECAIdLIECDAmJbfz_-0RJ0qBV________7sECBAgQIECBAgQIAh0sgQIMzAl-__fX5Sg0JECvX______586IECBAgQIECBAgCHSyBAgwJiW9OjX_0qBAgQIEX________-l8fPjBAgQIECAIdLIEHBYhQIECBQxQICWDhg5fv____________tUCBAgQIAh0sgzIECBAgQIEGlAgQEtP_______________-lQIECBAgCHSyBUwQIECBAgQakCBASQqv_____________-6FAgQIECAIdLIECJygQIECBAgaoEBJBg______________5-OiBAgQIAh0sgQKGKBAgQIEHBKgJIMH7____8v__________QoECBAgCHSyBRmQIECBA4RoECAkgVoVaNel________r16FAgQIECAIdLINCFAgwOEyBAgQICSBAgQePn7___r06RAgQIECBAgQIAh0sgQLeKxCgQIECBAgJIECDR__v0aNGhQIECBAgQIECBAgCHSSBAgQIECBAgQIECBAgQYP3_-1QIECBAgQIECBAgQIECAIdJIECBAgQIECBAgQIECBB6boUSBAgQIECBAgQIECBAgQIAh0kgQIECBAgQIECBAgQIFStAgQIECBAgQIECBAgQIECBAgAzsvjognZe_MFIy4cmzTuy8wdTfwQU-G_l0DVKy-lhyad6A", SPLASH: "QIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECAsaMIEGDx8YIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQICxowg0N2bdmgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgLGjCBFvz9_6BAZQIECBAgQIECAig0NECBAgQIECBAgQIECAsaMcOD5tjyoGCBAgQIECBAgQICLhCgQIECBAgQIECBAgQICxowoTod79ArSEcHBAgQIECBAg0ITKBAgQcGCBAgQIECBAgLGjCBBgXIUCAyRXmlLBAgQIECBuZ4fPn___aoECBAgQIECBAaQIECBAgQIEBFAgQaTPDh8-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmyClvxIJGHlk8oECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA" }, p = "http://www.w3.org/2000/svg";
let q, Q, K = 0;
class b {
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
      if (e === void 0) return this.nt.getAttribute(t);
      e == null ? this.nt.removeAttribute(t) : this.nt.setAttribute(t, e);
    }
    return this;
  }
  ot(t) {
    if (!this.lt(t)) {
      const e = this.At();
      e.push(t), this.nt.setAttribute("class", e.join(" "));
    }
    return this;
  }
  lt(t) {
    return this.At().indexOf(t) !== -1;
  }
  At() {
    const t = this.nt.getAttribute("class");
    return t == null ? [] : t.split(" ");
  }
  gt(t) {
    return this.lt(t) && this.nt.setAttribute("class", this.At().filter((e) => e !== t).join(" ")), this;
  }
  ct(t) {
    return this.lt(t) ? this.gt(t) : this.ot(t), this;
  }
  ut(t, e) {
    if (typeof t == "object") for (const s in t) t[s] == null ? delete this.nt.dataset[s] : this.nt.dataset[s] = t[s];
    else {
      if (e === void 0) return this.nt.dataset[t];
      e == null ? delete this.nt.dataset[t] : this.nt.dataset[t] = e;
    }
    return this;
  }
}
class ot extends b {
  constructor(t) {
    return super(), q = t, Q = q.document, this.nt = Q.createElementNS(p, "svg"), this.nt.setAttribute("xmlns", p), this;
  }
  Ct(t) {
    const e = Q.querySelector(t);
    if (!e) throw Error("@techandsoftware/teletext: E117: addTo failed to match provided selector");
    return e.appendChild(this.nt), this;
  }
  Et(t) {
    return this.nt.setAttribute("viewBox", t), this;
  }
  It(t, e) {
    return this.nt.setAttribute("width", t), this.nt.setAttribute("height", e), this;
  }
  Bt(t) {
    const e = Q.createElementNS(p, "style");
    return e.append(t), this.nt.append(e), this;
  }
  dt() {
    const t = new $();
    return this.nt.append(t.rt()), t;
  }
  ft() {
    return this.nt.clientWidth;
  }
  Qt() {
    return this.nt.clientHeight;
  }
  yt(t) {
    const e = new _t(t);
    return this.nt.append(e.rt()), e;
  }
}
class $ extends b {
  constructor() {
    return super(), this.nt = Q.createElementNS(p, "g"), this.bt = [], this;
  }
  dt() {
    const t = new $();
    return this.nt.append(t.rt()), this.bt.push(t), t;
  }
  wt(t) {
    const e = new ut(t);
    return this.nt.append(e.rt()), this.bt.push(e), e;
  }
  St() {
    const t = new At();
    return this.nt.append(t.rt()), t;
  }
  xt(t, e) {
    const s = new R(t, e);
    return this.nt.append(s.rt()), this.bt.push(s), s;
  }
  vt() {
    return this.bt[this.bt.length - 1];
  }
  Ut() {
    return this.bt;
  }
  Rt(t) {
    return this.nt.setAttribute("clip-path", `url("#${t.rt().id}")`), this;
  }
  Dt() {
    return this.nt.removeAttribute("clip-path"), this;
  }
  Lt() {
    this.nt.parentNode && this.nt.parentNode.removeChild(this.nt), this.nt = null, this.bt.forEach((t) => t._t()), this.bt = [];
  }
  Gt(t, e, s, i) {
    const n = new ft(t, e, s, i);
    return this.nt.append(n.rt()), this.bt.push(n), n;
  }
  Ft(t) {
    const e = new gt(t);
    return this.nt.append(e.rt()), this.bt.push(e), e;
  }
  Ot(t, e) {
    const s = new ct(t, e);
    return this.nt.append(s.rt()), this.bt.push(s), s;
  }
  Ht(t, e) {
    const s = new lt(t, e);
    return this.nt.append(s.rt()), this.bt.push(s), s;
  }
}
class lt extends b {
  constructor() {
    return super(), this.nt = Q.createElementNS(p, "svg"), this;
  }
  attr(...t) {
    return this.ht(...t);
  }
  get node() {
    return this.rt();
  }
}
class ct extends b {
  constructor(t, e) {
    return super(), this.nt = Q.createElementNS(p, "image"), this.nt.setAttribute("width", parseInt(t)), this.nt.setAttribute("height", parseInt(e)), this;
  }
  attr(...t) {
    return this.ht(...t);
  }
}
class gt extends b {
  constructor(t) {
    return super(), this.nt = Q.createElementNS(p, "use"), this.nt.setAttribute("href", "#" + t), this;
  }
  kt(t) {
    return this.nt.setAttribute("fill", t), this;
  }
  Nt(t, e) {
    return this.nt.setAttribute("x", t), this.nt.setAttribute("y", e), this;
  }
}
class _t extends b {
  constructor(t) {
    return super(), this.nt = Q.createElementNS(p, "symbol"), this.nt.setAttribute("id", t), this;
  }
  xt(t, e) {
    const s = new R(t, e);
    return this.nt.append(s.rt()), s;
  }
}
class ut extends b {
  constructor(t) {
    return super(), this.nt = Q.createElementNS(p, "text"), this.nt.append(t), this;
  }
  wt(t) {
    return this.nt.textContent = t, this;
  }
  kt(t) {
    return this.nt.setAttribute("fill", t), this;
  }
}
class At extends b {
  constructor() {
    return super(), this.nt = Q.createElementNS(p, "defs"), this;
  }
  Mt() {
    const t = new dt();
    return this.nt.append(t.rt()), t;
  }
  Tt(t) {
    return [...this.nt.querySelectorAll(t)].map(nt);
  }
  xt(t, e) {
    const s = new R(t, e);
    return this.nt.append(s.rt()), s;
  }
}
class dt extends b {
  constructor() {
    return super(), this.nt = Q.createElementNS(p, "clipPath"), this.nt.setAttribute("id", "clipPath-" + K), K++, this;
  }
  Ut() {
    return [...this.nt.children].map(nt);
  }
  Pt(t) {
    this.nt.appendChild(t.rt());
  }
}
class R extends b {
  constructor(t, e) {
    if (super(), t instanceof q.SVGElement) return this.nt = t, this;
    const s = t;
    return this.nt = Q.createElementNS(p, "rect"), this.nt.setAttribute("width", parseInt(s)), this.nt.setAttribute("height", parseInt(e)), this;
  }
  kt(t) {
    return this.nt.setAttribute("fill", t), this;
  }
  Nt(t, e) {
    return this.nt.setAttribute("x", t), this.nt.setAttribute("y", e), this;
  }
  ft(t) {
    return t === void 0 ? parseInt(this.nt.getAttribute("width")) : (this.nt.setAttribute("width", parseInt(t)), this);
  }
  Qt(t) {
    return t === void 0 ? parseInt(this.nt.getAttribute("height")) : (this.nt.setAttribute("height", parseInt(t)), this);
  }
  Lt() {
    this.nt.parentNode && this.nt.parentNode.removeChild(this.nt), this.nt = null;
  }
}
class ft extends b {
  constructor(t, e, s, i) {
    return super(), this.nt = Q.createElementNS(p, "line"), this.nt.setAttribute("x1", t), this.nt.setAttribute("y1", e), this.nt.setAttribute("x2", s), this.nt.setAttribute("y2", i), this;
  }
}
function nt(r) {
  let t;
  if (r.tagName !== "rect") throw Error("SVG:wrapSVGElement Unable to wrap SVG element " + r.tagName);
  return t = new R(r), t;
}
const g = { BLACK: /* @__PURE__ */ Symbol(), RED: /* @__PURE__ */ Symbol(), GREEN: /* @__PURE__ */ Symbol(), YELLOW: /* @__PURE__ */ Symbol(), BLUE: /* @__PURE__ */ Symbol(), MAGENTA: /* @__PURE__ */ Symbol(), CYAN: /* @__PURE__ */ Symbol(), WHITE: /* @__PURE__ */ Symbol() };
Object.freeze(g);
const h = { jt: /* @__PURE__ */ Symbol(), qt: /* @__PURE__ */ Symbol(), zt: /* @__PURE__ */ Symbol(), Jt: /* @__PURE__ */ Symbol() };
Object.freeze(h);
const A = { Vt: /* @__PURE__ */ Symbol(), Yt: /* @__PURE__ */ Symbol(), Kt: /* @__PURE__ */ Symbol(), Xt: /* @__PURE__ */ Symbol() };
Object.freeze(A);
const B = { 0: /* @__PURE__ */ Symbol(), 1: /* @__PURE__ */ Symbol(), 1.5: /* @__PURE__ */ Symbol(), 2.5: /* @__PURE__ */ Symbol() };
Object.freeze(B);
class o {
  static charFromTextColour(t) {
    if (t in V) return V[t];
    throw Error("Attributes.charFromTextColour: bad colour: " + t);
  }
  static charFromGraphicColour(t) {
    if (t in J) return J[t];
    throw Error("Attributes.charFromGraphicColour: bad colour");
  }
  static charFromAttribute(t) {
    if (t in Y) return Y[t];
    throw Error("Attributes.charFromAttribute: bad attribute");
  }
}
function j(r) {
  return at[r];
}
Object.assign(o, { TEXT_COLOUR: h.ALPHA, MOSAIC_COLOUR: /* @__PURE__ */ Symbol(), NEW_BACKGROUND: /* @__PURE__ */ Symbol(), BLACK_BACKGROUND: /* @__PURE__ */ Symbol(), CONTIGUOUS_GRAPHICS: h.qt, SEPARATED_GRAPHICS: h.zt, ESC: /* @__PURE__ */ Symbol(), FLASH: /* @__PURE__ */ Symbol(), STEADY: /* @__PURE__ */ Symbol(), NORMAL_SIZE: A.Vt, DOUBLE_HEIGHT: A.Yt, DOUBLE_WIDTH: A.Kt, DOUBLE_SIZE: A.Xt, CONCEAL: /* @__PURE__ */ Symbol(), HOLD_MOSAICS: /* @__PURE__ */ Symbol(), RELEASE_MOSAICS: /* @__PURE__ */ Symbol(), START_BOX: /* @__PURE__ */ Symbol(), END_BOX: /* @__PURE__ */ Symbol(), Zt: /* @__PURE__ */ Symbol() });
const at = { [g.BLACK]: "#000", [g.RED]: "#f00", [g.GREEN]: "#0f0", [g.YELLOW]: "#ff0", [g.BLUE]: "#00f", [g.MAGENTA]: "#f0f", [g.CYAN]: "#0ff", [g.WHITE]: "#fff" };
Object.freeze(at);
const k = { "\0": g.BLACK, "": g.RED, "": g.GREEN, "": g.YELLOW, "": g.BLUE, "": g.MAGENTA, "": g.CYAN, "\x07": g.WHITE };
Object.freeze(k);
const V = W(k), H = { "": g.BLACK, "": g.RED, "": g.GREEN, "": g.YELLOW, "": g.BLUE, "": g.MAGENTA, "": g.CYAN, "": g.WHITE };
Object.freeze(H);
const J = W(H), O = { "\b": o.FLASH, "	": o.STEADY, "\n": o.END_BOX, "\v": o.START_BOX, "\f": o.NORMAL_SIZE, "\r": o.DOUBLE_HEIGHT, "": o.DOUBLE_WIDTH, "": o.DOUBLE_SIZE, "": o.CONCEAL, "": o.CONTIGUOUS_GRAPHICS, "": o.SEPARATED_GRAPHICS, "\x1B": o.ESC, "": o.BLACK_BACKGROUND, "": o.NEW_BACKGROUND, "": o.HOLD_MOSAICS, "": o.RELEASE_MOSAICS };
Object.assign(O, k), Object.assign(O, H), Object.freeze(O);
const Y = W(O), L = { [B[0]]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23] };
function W(r) {
  const t = {};
  for (const e in r) t[r[e]] = e;
  return Object.freeze(t);
}
L[B[1]] = [...L[B[0]], 10, 11, 12, 13, 24, 25, 26, 27, 28, 29, 30, 31], L[B[1.5]] = [...L[B[1]], 0, 16], L[B[2.5]] = [...L[B[1.5]], 14, 15], Object.freeze(L);
const v = 10, I = 10, N = {}, P = { Wt: { $t: 10.4, ts: -5.2 }, ss: { $t: I, ts: -4.5 } };
Object.freeze(P);
class E {
  constructor(t, e) {
    N.es = t.ns, N._s = t.hs, this.ls = t.ns * I, this.As = t.hs * v, this.gs = { 1.33: this.ls / (1.33 * this.As), 1.2: this.ls / (1.2 * this.As), 1.22: this.ls / (1.22 * this.As) }, this.cs = new ot(e).Et(`0 0 ${this.ls} ${this.As}`).It(1.5 * this.ls, 1.5 * this.As * this.gs[1.2]).ht({ preserveAspectRatio: "none", style: "font-family: sans-serif" }).Bt(`@font-face {
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
`), this.d = this.cs.dt().ht("class", "conceal_concealed flash_flashing"), this.us = 1.2, this.Cs(), this.Es(), this.Is = null, this.Bs = t, this.ds = this.Bs.Qs.fs(() => this.ps()), this.ys = !1, this.bs = !1, this.ws = !1, this.Ss = {};
  }
  static get ROWS() {
    return N._s;
  }
  static get COLS() {
    return N.es;
  }
  Ct(t) {
    this.cs.Ct(t);
  }
  xs() {
    this.Bs.Qs.xs(this.ds), this.ds = null;
  }
  ps() {
    let t = !1, e = !1;
    this.ws = !1, this.d.gt("flash_flashing"), this.vs.forEach((s, i) => {
      let n = !1;
      if (this.Us(i), t) return t = !1, void this.Rs(s, i);
      const a = this.Bs.Ds(i);
      let l, c;
      s.forEach((_, d) => {
        if (n) return n = !1, this.Ls(_), this.Gs(i), void (c && this.Fs());
        const f = a.Os(d), C = j(f.Hs), u = f.ks(), m = j(f.Ns), D = this.Ms(f.Ts, u, f.et);
        this.Ps(_, f, D, m, d, i, u), f.js && (c ? this.Fs() : this.qs(i, d), this.ws = !0), l == C ? this.Gs(i) : this.zs(i, d, C), f.It != A.Kt && f.It != A.Xt || (n = !0), l = C, c = f.js, f.Js && (e = !0);
      }), a.Vs ? (this.Ys(i), this.Ks(), t = !0) : t = !1, this.Xs(i);
    }), "Zs" in this.Ss && this.Ss.Zs(this.cs.ft(), this.cs.Qt()), this.d.ot("conceal_concealed"), e && setTimeout(() => this.d.ot("flash_flashing"), 100), this.Ws();
  }
  Us(t) {
    this.$s(t), this.ti(t);
  }
  Rs(t, e) {
    "si" in this.Ss && this.Ss.si(t.length, e), t.forEach((s) => this.Ls(s));
  }
  Ls(t) {
    t.wt(" ").ht({ dx: null, dy: null, textLength: null, lengthAdjust: null, "text-anchor": null, transform: null, class: null });
  }
  Ps(t, e, s, i, n, a, l) {
    this.ii(t, e, s, i, n, a), e.Ts == h.qt && l || e.Ts == h.Jt ? t.ot("mosaic") : e.Ts == h.zt && l && t.ot("mosaic_separated");
  }
  ii(t, e, s, i, n, a) {
    t.wt(e.ei).ht(s).kt(i), e.It == A.Yt ? t.ht("transform", `translate(0 ${Z(a)}) scale(1 2)`) : e.It == A.Kt ? t.ht("transform", `translate(${tt(n)} 0) scale(2 1)`) : e.It == A.Xt && t.ht("transform", `translate(${tt(n)} ${Z(a)}) scale(2 2)`), e.Js && t.ot("flash"), e.ri && t.ot("conceal");
  }
  ni() {
    this.d.ct("conceal_concealed");
  }
  _i(t) {
    let e = t;
    t == "native" ? e = '-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif' : t == "default" && (e = "sans-serif"), this.cs.ht("style", "font-family: " + e);
  }
  hi() {
    this.Is ? (this.Is.Lt(), this.Is = null) : this.oi();
  }
  li() {
    this.bs ? (this.bs = !1, this.Ai.ht("opacity", null).Dt()) : (this.bs = !0, this.ai());
  }
  gi(t) {
    this.us = t, this.ci(this.cs.Qt());
  }
  ci(t) {
    this.cs.It(this.us == "natural" ? t * (this.ls / this.As) : t * this.us, t);
  }
  ai() {
    this.ys && this.ws ? this.Ai.ht("opacity", 0.3) : this.ws ? this.Ai.Rt(this.ui).ht("opacity", 0.3) : this.Ai.ht("opacity", 0);
  }
  Ws() {
    this.bs && this.ai();
  }
  Ci() {
    this.ys ? (this.d.Dt(), this.ys = !1) : (this.d.Rt(this.ui), this.ys = !0), this.Ws();
  }
  Ei() {
    return this.cs.rt().outerHTML;
  }
  oi() {
    this.Is = this.d.dt();
    for (let t = 0; t < N._s; t++) this.Is.Gt(0, t * v, this.ls - 1, t * v).ht({ stroke: "#555", "stroke-width": 0.5 });
    for (let t = 0; t < N.es; t++) this.Is.Gt(t * I, 0, t * I, this.As - 1).ht({ stroke: "#555", "stroke-width": 0.5 });
  }
  Es() {
    this.Ii = this.d.St(), this.Bi = null, this.ui = this.Ii.Mt();
  }
  Cs() {
    this.di(), this.fi();
  }
  di() {
    const t = this.d.dt();
    t.ht({ "shape-rendering": "crispEdges", id: "background" }), this.Qi = [], this.Ai = t;
  }
  fi() {
    const t = [], e = this.d.dt().ht({ "text-anchor": "middle", fill: "#fff" }).ht("id", "textlayer");
    for (let s = 0; s < N._s; s++) {
      const i = [];
      for (let n = 0; n < N.es; n++) i.push(e.wt(pt()).ht({ x: n * I + 5, y: s * v + 8 }));
      t.push(i);
    }
    this.vs = t, this.pi = e;
  }
  ti(t) {
    this.ui.Ut().filter((e) => e.ut("r") == t).forEach((e) => e.Lt());
  }
  $s(t) {
    this.Qi[t] && (this.Qi[t].Lt(), this.Qi[t] = null), this.Qi[t] = this.Ai.dt();
  }
  Gs(t) {
    const e = this.Qi[t].vt(), s = e.ft();
    e.ft(s + I);
  }
  zs(t, e, s) {
    const i = e * I, n = t * v;
    this.Qi[t].xt(I, v).kt(s).Nt(i, n);
  }
  Fs() {
    const t = this.Bi.ft();
    this.Bi.ft(t + I);
  }
  Ys(t) {
    this.Qi[t].Ut().forEach((e) => e.ht("height", 20));
  }
  Ks() {
    this.Ii.Tt("[data-boxbuffer]").forEach((t) => t.Qt(20));
  }
  qs(t, e) {
    const s = e * I, i = t * v;
    this.Bi = this.Ii.xt(I, v).ut("boxbuffer", !0).Nt(s, i);
  }
  Xs(t) {
    this.Ii.Tt("[data-boxbuffer]").forEach((e) => {
      e.ut({ r: t, boxbuffer: null }), this.ui.Pt(e);
    });
  }
  Ms(t, e, s) {
    return t == h.qt && e || t == h.Jt ? { dx: P.Wt.ts, dy: -0.15, textLength: P.Wt.$t, lengthAdjust: "spacingAndGlyphs", "text-anchor": "start", transform: null, class: null } : t == h.zt && e ? { dx: P.ss.ts, dy: null, textLength: P.ss.$t, lengthAdjust: "spacingAndGlyphs", "text-anchor": "start", transform: null, class: null } : { dx: null, dy: null, textLength: s ? I : null, lengthAdjust: s ? "spacingAndGlyphs" : null, "text-anchor": null, transform: null, class: null };
  }
  registerPlugin(t, e) {
    return "renderBackground" in e && (this.Ss.yi = e.renderBackground), "renderMosaic" in e && (this.Ss.bi = e.renderMosaic), "endOfPageUpdate" in e && (this.Ss.Zs = e.endOfPageUpdate), "clearCellsForRow" in e && (this.Ss.si = e.clearCellsForRow), { lookupColour: Et, isDoubleHeight: Ct, isDoubleWidth: It, isDoubleSize: Bt, isSeparatedMosaic: Qt, createImageOverlay: this.mi.bind(this), createSVGOverlay: this.wi.bind(this) };
  }
  mi() {
    const t = this.d.Ot(this.ls, this.As);
    return t.ht("preserveAspectRatio", "none"), t;
  }
  wi() {
    const t = this.d.Ht();
    return t.ht("preserveAspectRatio", "none"), t;
  }
}
E.Si = I, E.xi = v, E.Ui = 20, E.Ri = 20, E.Di = P;
const Et = (r) => j(r), Ct = (r) => r == A.Yt, It = (r) => r == A.Kt, Bt = (r) => r == A.Xt, Qt = (r) => r == h.zt, Z = (r) => 0 - r * v, tt = (r) => 0 - r * I;
function pt() {
  return String.fromCharCode(32 + 95 * Math.random());
}
class et extends E {
  constructor(t, e, s) {
    super(t, s), this.Li = e, this.Gi = /* @__PURE__ */ new Set();
  }
  Cs() {
    super.Cs(), this.Fi = [], this.Oi = this.d.dt();
  }
  Us(t) {
    super.Us(t), this.Hi(t);
  }
  Ps(t, e, s, i, n, a, l) {
    "yi" in this.Ss && this.Ss.yi(a, n, e.It, e.Hs), e.Ts != h.jt && e.Ts != h.Jt && l ? l && (t.wt(" ").ht(s), this.ki(a, n, e, i)) : (this.ii(t, e, s, i, n, a), e.Ts == h.Jt && t.ot("mosaic"));
  }
  ki(t, e, s, i) {
    if ("bi" in this.Ss && this.Ss.bi(t, e, s.Ni(), i)) return;
    const n = s.Mi();
    if (!n.includes("1")) return;
    const a = this.Ti(s.Ts, n), l = s.Ts == h.qt, c = E.Si + (l ? 0.3 : 0), _ = E.xi + (l ? 0.2 : 0);
    this.Gi.has(a) || this.Pi(n, a, l, c, _);
    const d = this.ji(t, e, a, i, l, c, _);
    this.qi(d, s);
  }
  Ti(t, e) {
    return (t === h.qt ? "c" : "s") + e.join("");
  }
  Pi(t, e, s, i, n) {
    this.Gi.add(e);
    const a = this.cs.yt(e), l = s ? 6 : 4, c = s ? [0, 0] : [1, 2];
    a.ht({ preserveAspectRatio: "none", width: i, height: n, viewBox: "0 0 12 18" });
    for (let _ = 0; _ < 6; _++) if (t[_] === "1") {
      const d = _ % 2 * 6 + c[0], f = 6 * Math.floor(_ / 2) + c[1];
      a.xt(l, l).Nt(d, f);
    }
    return { width: i, height: n };
  }
  ji(t, e, s, i, n, a, l) {
    const c = e * E.Si - (n ? 0.15 : 0), _ = t * E.xi - (n ? 0.1 : 0), d = this.Fi[t].Ft(s).Nt(c, _).kt(i);
    return this.Li && d.ht({ width: a, height: l }), d;
  }
  qi(t, e) {
    e.It !== A.Yt && e.It !== A.Xt || t.ht("height", E.Ri), e.It !== A.Kt && e.It !== A.Xt || t.ht("width", E.Ui), e.Js && t.ot("flash"), e.ri && t.ot("conceal");
  }
  Hi(t) {
    this.Fi[t] && this.Fi[t].Lt(), this.Fi[t] = this.Oi.dt();
  }
  Ms(t, e, s) {
    return t == h.Jt ? { dx: E.Di.Wt.ts, dy: -0.15, textLength: E.Di.Wt.$t, lengthAdjust: "spacingAndGlyphs", "text-anchor": "start", transform: null, class: null } : { dx: null, dy: null, textLength: s ? E.Si : null, lengthAdjust: s ? "spacingAndGlyphs" : null, "text-anchor": null, transform: null, class: null };
  }
}
class mt {
  constructor(t) {
    this.Bs = t, this.zi = 0, this.Ji = 0, this.Vi = [];
  }
  pos(t, e) {
    return (t = parseInt(t)) < 0 || t > 39 || (e = parseInt(e)) < 0 || e > 24 || (this.zi = t, this.Ji = e), this;
  }
  putG0(t, e) {
    let s = null;
    if (e !== void 0) {
      const n = parseInt(e);
      n >= 0 && n <= 15 && (s = n);
    }
    const i = t.charCodeAt(0);
    return i < 32 || i > 127 || this.Vi.push({ Yi: this.zi, Ki: this.Ji, Ts: "g0", ei: t, Xi: s }), this;
  }
  putG1(t) {
    const e = t.charCodeAt(0);
    return e < 32 || e > 127 || this.Vi.push({ Yi: this.zi, Ki: this.Ji, Ts: "g1", ei: t }), this;
  }
  putG2(t) {
    const e = t.charCodeAt(0);
    return e < 32 || e > 127 || this.Vi.push({ Yi: this.zi, Ki: this.Ji, Ts: "g2", ei: t }), this;
  }
  putG3(t) {
    const e = t.charCodeAt(0);
    return e < 32 || e > 127 || this.Vi.push({ Yi: this.zi, Ki: this.Ji, Ts: "g3", ei: t }), this;
  }
  putAt() {
    return this.Vi.push({ Yi: this.zi, Ki: this.Ji, Ts: "char", ei: "@" }), this;
  }
  end() {
    return this.Bs.Zi(this.Vi), this.Bs.Wi(), this;
  }
}
class bt extends E {
}
const St = ["SPLASH", "ENGINEERING", "ADVERT", "UK"];
class yt {
  constructor(t, e) {
    if (this.$i = null, typeof window == "object" && (this.$i = window), this.te = { se: !1 }, typeof e == "object" && ("webkitCompat" in e && (this.te.se = e.webkitCompat), "dom" in e && (this.$i = e.dom)), this.$i == null) throw Error("TeletextController E24: No window dom object available");
    this.ie = new et(t, this.te.se, this.$i), this.Bs = t, this.ee = 1, this.re = 0, this.ne(), this._e = null, this.he = null, this.oe = 0, this.le = 0, this.Ae = null;
  }
  setRowFromOutputLine(t, e) {
    const s = T.st(e);
    this.Bs.ae(t, s);
  }
  setRow(t, e) {
    this.Bs.ae(t, e);
  }
  setPageFromOutputLines(t, e) {
    const s = T.it(t);
    e !== void 0 && (s[0] = this.ge(e)), this.setPageRows(s);
  }
  setPageRows(t) {
    this.Bs.ce(), this.Bs.ue(t);
  }
  ge(t) {
    return (t = T.st(t)).join("").substring(0, 32).padStart(this.Bs.ns, " ");
  }
  showTestPage(t) {
    let e;
    t in F ? e = F[t] : (e = F[St[this.re]], this.re++, this.re == 4 && (this.re = 0)), this.loadPageFromEncodedString(e);
  }
  showRandomisedPage() {
    const t = [];
    for (let e = 0; e < this.Bs.hs; e++) {
      const s = [];
      for (let i = 0; i < this.Bs.ns; i++) s.push(String.fromCharCode(127 * Math.random()));
      t.push(s.join(""));
    }
    this.setPageRows(t);
  }
  loadPageFromEncodedString(t, e) {
    const s = T.tt(t, this.$i.atob);
    e !== void 0 && (s[0] = this.ge(e)), this.setPageRows(s);
  }
  ne() {
    this.Ce = { Ee: () => this.ie.ni(), Ie: () => this.ie.li(), Be: () => this.ie.Ci() }, this.$i.addEventListener("ttx.reveal", this.Ce.Ee), this.$i.addEventListener("ttx.mix", this.Ce.Ie), this.$i.addEventListener("ttx.subtitlemode", this.Ce.Be);
  }
  destroy() {
    this.$i.removeEventListener("ttx.reveal", this.Ce.Ee), this.$i.removeEventListener("ttx.mix", this.Ce.Ie), this.$i.removeEventListener("ttx.subtitlemode", this.Ce.Be), this.Ce = null;
  }
  toggleReveal() {
    this.ie.ni();
  }
  toggleMixMode() {
    this.ie.li();
  }
  toggleBoxMode() {
    this.ie.Ci();
  }
  toggleGrid() {
    this.ie.hi();
  }
  setLevel(t) {
    this.Bs.de(t);
  }
  addTo(t) {
    this.fe = t, this.ie.Ct(t);
  }
  setFont(t) {
    this.Ae = t, this.ie._i(t);
  }
  clearScreen(t) {
    this.Bs.ce(), this.Bs.Qe(t);
  }
  setAspectRatio(t) {
    if (t == "natural") return void this.ie.gi(t);
    const e = parseFloat(t);
    if (Number.isNaN(e)) throw Error("E80 setAspectRatio: bad number");
    this.ie.gi(e);
  }
  setHeight(t) {
    const e = parseFloat(t);
    if (Number.isNaN(e)) throw Error("E98 setHeight: bad number");
    this.ie.ci(e), this.he = e;
  }
  setDefaultG0Charset(t, e) {
    if (t.match(/g0_/) == null) throw Error("E130 setDefaultG0Charset: Bad g0 set");
    this.Bs.pe(t, e);
  }
  setSecondG0Charset(t, e) {
    if (t.match(/g0_/) == null) throw Error("E136 setSecondG0Charset: Bad g0 set");
    this.Bs.ye(t, e);
  }
  setG2Charset(t, e) {
    if (t.match(/g2_/) == null) throw Error("E142 setG2Charset: Bad g2 set");
    this.Bs.be(t, e);
  }
  remove() {
    if (this.ie.xs(), this.fe) {
      const t = this.$i.document.querySelector(this.fe);
      t && t.removeChild(t.firstChild);
    }
    this.ie = null;
  }
  setView(t) {
    switch (this.remove(), t) {
      case "classic__font-for-mosaic":
        this.ie = new bt(this.Bs, this.$i);
        break;
      case "classic__graphic-for-mosaic":
        this.ie = new et(this.Bs, this.te.se, this.$i);
        break;
      default:
        throw Error("setView E126: bad view name:" + t);
    }
    this.he && this.ie.ci(this.he), this.Ae && this.ie._i(this.Ae), this.fe && this.ie.Ct(this.fe), this.Bs.Wi();
  }
  registerViewPlugin(t) {
    t.registerWithView(this.ie), this.Bs.Wi();
  }
  enhance() {
    return new mt(this.Bs);
  }
  writeBytes(t, e, s, i) {
    this.Bs.me(t, e, s, i);
  }
  writeByte(t, e, s, i) {
    this.Bs.we(t, e, s, i);
  }
  plot(t, e) {
    this.Bs.Se(t, e);
  }
  plotPoints(t, e, s, i) {
    this.Bs.xe(t, e, s, i);
  }
  getBytes() {
    return this.Bs.ve();
  }
  getScreenImage() {
    return this.ie.Ei();
  }
  getText(t) {
    return this.Bs.Ue(t);
  }
  updateDisplay() {
    this.Bs.Wi();
  }
}
const x = { g0_latin: { $: "¤", "": "■" }, g0_latin__czech_slovak: { "#": "#", $: "ů", "@": "č", "[": "ť", "\\": "ž", "]": "ý", "^": "í", _: "ř", "`": "é", "{": "á", "|": "|", "}": "ú", "~": "š" }, g0_latin__english: { "#": "£", $: "$", "@": "@", "[": "←", "\\": "½", "]": "→", "^": "↑", _: "#", "`": "—", "{": "¼", "|": "‖", "}": "¾", "~": "÷" }, g0_latin__estonian: { "#": "#", $: "õ", "@": "Š", "[": "Ä", "\\": "Ö", "]": "Ž", "^": "Ü", _: "Õ", "`": "š", "{": "ä", "|": "ö", "}": "ž", "~": "ü" }, g0_latin__french: { "#": "é", $: "ï", "@": "à", "[": "ë", "\\": "ê", "]": "ù", "^": "î", _: "#", "`": "è", "{": "â", "|": "ô", "}": "û", "~": "ç" }, g0_latin__german: { "#": "#", $: "$", "@": "§", "[": "Ä", "\\": "Ö", "]": "Ü", "^": "^", _: "_", "`": "°", "{": "ä", "|": "ö", "}": "ü", "~": "ß" }, g0_latin__italian: { "#": "£", $: "$", "@": "é", "[": "°", "\\": "ç", "]": "→", "^": "↑", _: "#", "`": "ù", "{": "à", "|": "ò", "}": "è", "~": "ì" }, g0_latin__latvian_lithuanian: { "#": "#", $: "$", "@": "Š", "[": "ė", "\\": "ę", "]": "Ž", "^": "č", _: "ū", "`": "š", "{": "ą", "|": "ų", "}": "ž", "~": "į" }, g0_latin__polish: { "#": "#", $: "ń", "@": "ą", "[": "Ƶ", "\\": "Ś", "]": "Ł", "^": "ć", _: "ó", "`": "ę", "{": "ż", "|": "ś", "}": "ł", "~": "ź" }, g0_latin__portuguese_spanish: { "#": "ç", $: "$", "@": "¡", "[": "á", "\\": "é", "]": "í", "^": "ó", _: "ú", "`": "¿", "{": "ü", "|": "ñ", "}": "è", "~": "à" }, g0_latin__romanian: { "#": "#", $: "¤", "@": "Ț", "[": "Â", "\\": "Ș", "]": "Ă", "^": "Î", _: "ı", "`": "ț", "{": "â", "|": "ș", "}": "ă", "~": "î" }, g0_latin__serbian_croatian_slovenian: { "#": "#", $: "Ë", "@": "Č", "[": "Ć", "\\": "Ž", "]": "Đ", "^": "Š", _: "ë", "`": "č", "{": "ć", "|": "ž", "}": "đ", "~": "š" }, g0_latin__swedish_finnish_hungarian: { "#": "#", $: "¤", "@": "É", "[": "Ä", "\\": "Ö", "]": "Å", "^": "Ü", _: "_", "`": "é", "{": "ä", "|": "ö", "}": "å", "~": "ü" }, g0_latin__turkish: { "#": "₺", $: "ğ", "@": "İ", "[": "Ş", "\\": "Ö", "]": "Ç", "^": "Ü", _: "Ğ", "`": "ı", "{": "ş", "|": "ö", "}": "ç", "~": "ü" }, g2_latin: { 0: "°", 1: "±", 2: "²", 3: "³", 4: "×", 5: "µ", 6: "¶", 7: "·", 8: "÷", 9: "’", "!": "¡", '"': "¢", "#": "£", "%": "¥", "&": "#", "'": "§", "(": "¤", ")": "‘", "*": "“", "+": "«", ",": "←", "-": "↑", ".": "→", "/": "↓", ":": "”", ";": "»", "<": "¼", "=": "½", ">": "¾", "?": "¿", "@": " ", A: "̀", B: "́", C: "̂", D: "̃", E: "̄", F: "̆", G: "̇", H: "̈", I: "̣", J: "̊", K: "̧", L: "̲", M: "̋", N: "̨", O: "̌", P: "—", Q: "¹", R: "®", S: "©", T: "™", U: "♪", V: "₠", W: "‰", X: "α", Y: null, Z: null, "[": null, "\\": "⅛", "]": "⅜", "^": "⅝", _: "⅞", "`": "Ω", a: "Æ", b: "Ð", c: "ª", d: "Ħ", e: null, f: "Ĳ", g: "Ŀ", h: "Ł", i: "Ø", j: "Œ", k: "º", l: "Þ", m: "Ŧ", n: "Ŋ", o: "ŉ", p: "ĸ", q: "æ", r: "đ", s: "ð", t: "ħ", u: "ı", v: "ĳ", w: "ŀ", x: "ł", y: "ø", z: "œ", "{": "ß", "|": "þ", "}": "ŧ", "~": "ŋ", "": "■" }, g0_greek: { "<": "«", ">": "»", "@": "ΐ", A: "Α", B: "Β", C: "Γ", D: "Δ", E: "Ε", F: "Ζ", G: "Η", H: "Θ", I: "Ι", J: "Κ", K: "Λ", L: "Μ", M: "Ν", N: "Ξ", O: "Ο", P: "Π", Q: "Ρ", R: "ʹ", S: "Σ", T: "Τ", U: "Υ", V: "Φ", W: "Χ", X: "Ψ", Y: "Ω", Z: "Ϊ", "[": "Ϋ", "\\": "ά", "]": "έ", "^": "ή", _: "ί", "`": "ΰ", a: "α", b: "β", c: "γ", d: "δ", e: "ε", f: "ζ", g: "η", h: "θ", i: "ι", j: "κ", k: "λ", l: "μ", m: "ν", n: "ξ", o: "ο", p: "π", q: "ρ", r: "ς", s: "σ", t: "τ", u: "υ", v: "φ", w: "χ", x: "ψ", y: "ω", z: "ϊ", "{": "ϋ", "|": "ό", "}": "ύ", "~": "ώ", "": "■" }, g2_greek: { 0: "°", 1: "±", 2: "²", 3: "³", 4: "×", 5: "m", 6: "n", 7: "p", 8: "÷", 9: "’", "!": "a", '"': "b", "#": "£", $: "e", "%": "h", "&": "i", "'": "§", "(": ":", ")": "‘", "*": "“", "+": "k", ",": "←", "-": "↑", ".": "→", "/": "↓", ":": "”", ";": "t", "<": "¼", "=": "½", ">": "¾", "?": "x", "@": " ", A: "̀", B: "́", C: "̂", D: "̃", E: "̄", F: "̆", G: "̇", H: "̈", I: "̣", J: "̊", K: "̧", L: "̲", M: "̋", N: "̨", O: "̌", P: "?", Q: "¹", R: "®", S: "©", T: "™", U: "♪", V: "₠", W: "‰", X: "ɑ", Y: "Ί", Z: "Ύ", "[": "Ώ", "\\": "⅛", "]": "⅜", "^": "⅝", _: "⅞", "`": "C", a: "D", b: "F", c: "G", d: "J", e: "L", f: "Q", g: "R", h: "S", i: "U", j: "V", k: "W", l: "Y", m: "Z", n: "Ά", o: "Ή", p: "c", q: "d", r: "f", s: "g", t: "j", u: "l", v: "q", w: "r", x: "s", y: "u", z: "v", "{": "w", "|": "y", "}": "z", "~": "Έ", "": "■" }, g0_cyrillic: { "@": "Ю", A: "А", B: "Б", C: "Ц", D: "Д", E: "Е", F: "Ф", G: "Г", H: "Х", I: "И", J: "Ѝ", K: "К", L: "Л", M: "М", N: "Н", O: "О", P: "П", Q: "Я", R: "Р", S: "С", T: "Т", U: "У", V: "Ж", W: "В", X: "Ь", Z: "З", "[": "Ш", "]": "Щ", "^": "Ч", "`": "ю", a: "а", b: "б", c: "ц", d: "д", e: "е", f: "ф", g: "г", h: "х", i: "и", j: "ѝ", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "я", r: "р", s: "с", t: "т", u: "у", v: "ж", w: "в", x: "ь", z: "з", "{": "ш", "}": "щ", "~": "ч", "": "■" }, g0_cyrillic__russian_bulgarian: { "&": "ы", Y: "Ъ", "\\": "Э", _: "Ы", y: "ъ", "|": "э" }, g0_cyrillic__serbian_croatian: { "@": "Ч", J: "Ј", Q: "Ќ", V: "В", W: "Ѓ", X: "Љ", Y: "Њ", "[": "Ћ", "\\": "Ж", "]": "Ђ", "^": "Ш", _: "Џ", "`": "ч", j: "ј", q: "ќ", v: "в", w: "ѓ", x: "љ", y: "њ", "{": "ћ", "|": "ж", "}": "ђ", "~": "ш" }, g0_cyrillic__ukranian: { "&": "ї", Y: "І", "\\": "Є", _: "Ї", y: "і", "|": "є" }, g2_cyrillic: { 0: "m", 1: "n", 2: "p", 3: "t", 4: "x", 5: "x", 6: "°", 7: "±", 8: "²", 9: "³", "!": "a", '"': "b", "#": "£", $: "e", "%": "h", "&": "i", "'": "§", "(": ":", ")": "‘", "*": "“", "+": "k", ",": "←", "-": "↑", ".": "→", "/": "↓", ":": "¼", ";": "½", "<": "¾", "=": "÷", ">": "’", "?": "”", "@": " ", A: "̀", B: "́", C: "̂", D: "̃", E: "̄", F: "̆", G: "̇", H: "̈", I: "̣", J: "̊", K: "̧", L: "̲", M: "̋", N: "̨", O: "̌", P: "?", Q: "©", R: "®", S: "¹", T: "ɑ", U: "Ί", V: "Ύ", W: "Ώ", X: "‰", Y: "₠", Z: "™", "[": "⅛", "\\": "⅜", "]": "⅝", "^": "⅞", _: "♪", "`": "C", a: "D", b: "F", c: "G", d: "J", e: "L", f: "Q", g: "R", h: "S", i: "U", j: "V", k: "W", l: "Y", m: "Z", n: "Ά", o: "Ή", p: "c", q: "d", r: "f", s: "g", t: "j", u: "l", v: "q", w: "r", x: "s", y: "u", z: "v", "{": "w", "|": "y", "}": "z", "~": "Έ", "": "■" }, g0_arabic: { "#": "£", "&": "ﻰ", "'": "ﻱ", "(": ")", ")": "(", ";": "؛", "<": ">", ">": "<", "?": "؟", "@": "ﺔ", A: "ﺀ", B: "ﺒ", C: "ﺏ", D: "ﺘ", E: "ﺕ", F: "ﺎ", G: "ﺍ", H: "ﺑ", I: "ﺓ", J: "ﺗ", K: "ﺛ", L: "ﺟ", M: "ﺣ", N: "ﺧ", O: "ﺩ", P: "ﺫ", Q: "ﺭ", R: "ﺯ", S: "ﺳ", T: "ﺷ", U: "ﺻ", V: "ﺿ", W: "ﻃ", X: "ﻇ", Y: "ﻋ", Z: "ﻏ", "[": "ﺜ", "\\": "ﺠ", "]": "ﺤ", "^": "ﺨ", _: "#", "`": "ـ", a: "ﻓ", b: "ﻗ", c: "ﻛ", d: "ﻟ", e: "ﻣ", f: "ﻧ", g: "ﻫ", h: "ﻭ", i: "ﻰ", j: "ﻳ", k: "ﺙ", l: "ﺝ", m: "ﺡ", n: "ﺥ", o: "ﻴ", p: "ﻯ", q: "ﻌ", r: "ﻐ", s: "ﻔ", t: "ﻑ", u: "ﻘ", v: "ﻕ", w: "ﻙ", x: "ﻠ", y: "ﻝ", z: "ﻤ", "{": "ﻡ", "|": "ﻨ", "}": "ﻥ", "~": "ﻻ", "": "■" }, g2_arabic: { 0: "٠", 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", "!": "ﻉ", '"': "ﺁ", "#": "ﺃ", $: "ﺅ", "%": "ﺇ", "&": "ﺋ", "'": "ﺊ", "(": "ﭼ", ")": "ﭽ", "*": "ﭺ", "+": "ﭘ", ",": "ﭙ", "-": "ﭖ", ".": "ﮊ", "/": "ﮔ", ":": "ﻎ", ";": "ﻍ", "<": "ﻼ", "=": "ﻬ", ">": "ﻪ", "?": "ﻩ", "@": "à", "[": "ë", "\\": "ê", "]": "ù", "^": "î", _: "ﻊ", "`": "é", "{": "â", "|": "ô", "}": "û", "~": "ç", "": "■" }, g0_hebrew: { "#": "£", "[": "←", "\\": "½", "]": "→", "^": "↑", _: "#", "`": "א", a: "ב", b: "ג", c: "ד", d: "ה", e: "ו", f: "ז", g: "ח", h: "ט", i: "י", j: "ך", k: "כ", l: "ל", m: "ם", n: "מ", o: "ן", p: "נ", q: "ס", r: "ע", s: "ף", t: "פ", u: "ץ", v: "צ", w: "ק", x: "ר", y: "ש", z: "ת", "{": "₪", "|": "‖", "}": "¾", "~": "÷", "": "■" }, g1_block_mosaic_to_unicode__legacy_computing: { 0: "🬏", 1: "🬐", 2: "🬑", 3: "🬒", 4: "🬓", 5: "▌", 6: "🬔", 7: "🬕", 8: "🬖", 9: "🬗", " ": " ", "!": "🬀", '"': "🬁", "#": "🬂", $: "🬃", "%": "🬄", "&": "🬅", "'": "🬆", "(": "🬇", ")": "🬈", "*": "🬉", "+": "🬊", ",": "🬋", "-": "🬌", ".": "🬍", "/": "🬎", ":": "🬘", ";": "🬙", "<": "🬚", "=": "🬛", ">": "🬜", "?": "🬝", "`": "🬞", a: "🬟", b: "🬠", c: "🬡", d: "🬢", e: "🬣", f: "🬤", g: "🬥", h: "🬦", i: "🬧", j: "▐", k: "🬨", l: "🬩", m: "🬪", n: "🬫", o: "🬬", p: "🬭", q: "🬮", r: "🬯", s: "🬰", t: "🬱", u: "🬲", v: "🬳", w: "🬴", x: "🬵", y: "🬶", z: "🬷", "{": "🬸", "|": "🬹", "}": "🬺", "~": "🬻", "": "█" }, g1_block_mosaic_to_unicode__unscii_separated: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", " ": " ", "!": "", '"': "", "#": "", $: "", "%": "", "&": "", "'": "", "(": "", ")": "", "*": "", "+": "", ",": "", "-": "", ".": "", "/": "", ":": "", ";": "", "<": "", "=": "", ">": "", "?": "", "`": "", a: "", b: "", c: "", d: "", e: "", f: "", g: "", h: "", i: "", j: "", k: "", l: "", m: "", n: "", o: "", p: "", q: "", r: "", s: "", t: "", u: "", v: "", w: "", x: "", y: "", z: "", "{": "", "|": "", "}": "", "~": "", "": "" }, g3: { 0: "🭇", 1: "🭈", 2: "🭉", 3: "🭊", 4: "🭋", 5: "◢", 6: "🭌", 7: "🭍", 8: "🭎", 9: "🭏", " ": "🬼", "!": "🬽", '"': "🬾", "#": "🬿", $: "🭀", "%": "◣", "&": "🭁", "'": "🭂", "(": "🭃", ")": "🭄", "*": "🭅", "+": "🭆", ",": "🭨", "-": "🭩", ".": "🭰", "/": "▒", ":": "🭐", ";": "🭑", "<": "🭪", "=": "🭫", ">": "🭵", "?": "█", "@": "┷", A: "┯", B: "┝", C: "┥", D: "🮤", E: "🮥", F: "🮦", G: "🮧", H: "🮠", I: "🮡", J: "🮢", K: "🮣", L: "┿", M: "•", N: "●", O: "○", P: "│", Q: "─", R: "┌", S: "┐", T: "└", U: "┘", V: "├", W: "┤", X: "┬", Y: "┴", Z: "┼", "[": "→", "\\": "←", "]": "↑", "^": "↓", _: " ", "`": "🭒", a: "🭓", b: "🭔", c: "🭕", d: "🭖", e: "◥", f: "🭗", g: "🭘", h: "🭙", i: "🭚", j: "🭛", k: "🭜", l: "🭬", m: "🭭", n: null, o: null, p: "🭝", q: "🭞", r: "🭟", s: "🭠", t: "🭡", u: "◤", v: "🭢", w: "🭣", x: "🭤", y: "🭥", z: "🭦", "{": "🭧", "|": "🭮", "}": "🭯", "~": null, "": null } }, G = {};
class wt {
  constructor() {
    this.Re = " ", this.De = " ", this.Le = g.WHITE, this.Ge = g.BLACK, this.Fe = h.jt, this.Oe = !1, this.He = A.Vt, this.ke = !1, this.Ne = !1, this.Me = null, this.Te = !1, this.Pe = null, this.je = null;
  }
  Ni() {
    return { type: this.Fe, flashing: this.Oe, concealed: this.ke, size: this.He, sextants: this.Mi() };
  }
  set qe(t) {
    this.Re = t;
  }
  get qe() {
    return this.Re;
  }
  set Ns(t) {
    this.Le = t;
  }
  get Ns() {
    return this.Le;
  }
  set Hs(t) {
    this.Ge = t;
  }
  get Hs() {
    return this.Ge;
  }
  get et() {
    return this.Te;
  }
  ze(t) {
    const e = this.Fe, s = this.Re;
    ((i, n) => {
      const a = i === h.jt, l = i === h.qt || i === h.zt, c = !(32 & n.charCodeAt(0));
      return a || l && c;
    })(e, s) ? (this.De = U(s, t), this.Pe > 0 && (this.De += x.g2_latin[String.fromCharCode(this.Pe + 64)]), this.Te = !!t.includes("arabic") && T.et(this.De)) : this.De = ((i, n) => {
      switch (i) {
        case h.qt:
          return U(n, "g1_block_mosaic_to_unicode__legacy_computing");
        case h.zt:
          return U(n, "g1_block_mosaic_to_unicode__unscii_separated");
        case h.Jt:
          return U(n, "g3");
        default:
          return null;
      }
    })(e, s), this.Me = null;
  }
  Je(t) {
    if (this.Fe != h.qt && this.Fe != h.zt || !t.Ve) this.Me = null, this.De = " ";
    else {
      this.Me = t.ei, this.Fe = t.Ts;
      let e = "g1_block_mosaic_to_unicode__legacy_computing";
      this.Fe == h.zt && (e = "g1_block_mosaic_to_unicode__unscii_separated"), this.De = U(t.ei, e);
    }
  }
  get ei() {
    return this.je == null ? this.De : this.je;
  }
  get Ts() {
    return this.Fe;
  }
  set Ts(t) {
    this.Fe = t;
  }
  set Js(t) {
    this.Oe = t;
  }
  get Js() {
    return this.Oe;
  }
  get It() {
    return this.He;
  }
  set It(t) {
    this.He = t;
  }
  set ri(t) {
    this.ke = t;
  }
  get ri() {
    return this.ke;
  }
  set js(t) {
    this.Ne = t;
  }
  get js() {
    return this.Ne;
  }
  ks() {
    if (this.Me) return !0;
    const t = this.Re.charCodeAt(0);
    return t <= 127 && !(32 & ~t);
  }
  Ye() {
    const t = this.Re.charCodeAt(0);
    return (this.Fe == h.qt || this.Fe == h.zt) && t <= 127 && !(32 & ~t);
  }
  Mi() {
    const t = this.Me != null ? this.Me.charCodeAt(0) : this.Re.charCodeAt(0);
    if (t > 127) return null;
    if (t in G) return G[t];
    const e = t >= 96 ? t - 64 : t - 32, s = [];
    for (let i = 0; i < 6; i++) s.push(e & 1 << i ? "1" : "0");
    return G[t] = s, s;
  }
  set Xi(t) {
    this.Pe = t;
  }
  get Xi() {
    return this.Pe;
  }
  set Ke(t) {
    this.je = t;
  }
}
function U(r, t) {
  if (!(t in x)) throw Error("Cell getCharWithEncoding: bad encoding: " + t);
  if (r in x[t]) return x[t][r];
  const e = t.match(/^(.+)__/);
  if (e != null) {
    const s = e[1];
    if (r in x[s]) return x[t][r] = x[s][r], x[s][r];
  }
  return r;
}
class vt {
  constructor(t) {
    this.Xe = t, this.Ze = [];
  }
  fs(t) {
    return this.Ze.push(t), this.Ze.length - 1;
  }
  Wi(t) {
    this.Ze.forEach((e) => e != null && e(this.Xe, t));
  }
  xs(t) {
    this.Ze[t] = null;
  }
}
class xt {
  constructor() {
    this.We = !1, this.$e = [];
  }
  get Vs() {
    return this.We;
  }
  set Vs(t) {
    this.We = t;
  }
  tr(t) {
    this.$e.push(t);
  }
  Os(t) {
    if (t >= this.$e.length) throw Error("RowModel.getCell E20 bad cell index");
    return this.$e[t];
  }
}
const S = 25, y = 40, Nt = [B[1.5], B[2.5]], Lt = o.charFromAttribute(o.START_BOX), Ot = o.charFromAttribute(o.END_BOX);
class Pt {
  constructor() {
    this.sr = [];
    for (let t = 0; t < S; t++) {
      const e = [];
      for (let s = 0; s < y; s++) e.push(new wt());
      this.sr.push(e);
    }
    this.ir = "g0_latin", this.er = null, this.rr = "g2_latin", this.nr = B[1], this._r = [], this.hs = S, this.ns = y, this.Qs = new vt(this);
  }
  Wi() {
    this.Qs.Wi();
  }
  ae(t, e) {
    if (t >= S) throw Error("PageModel E29 bad row number");
    this.hr(t, e), this.Qs.Wi();
  }
  ue(t) {
    (t = t.slice(0, S)).forEach((e, s) => {
      this.hr(s, e);
    }), this.Qs.Wi();
  }
  me(t, e, s, i) {
    for (let n = e, a = 0; n < S && a < s.length; n++, a++) {
      const l = [...s[a]].slice(0, y - t);
      for (let c = t, _ = 0; c < y && _ < l.length; c++, _++) this.sr[n][c].qe = l[_];
    }
    i !== void 0 && i && this.Qs.Wi();
  }
  we(t, e, s, i) {
    t >= 0 && t < y && e >= 0 && e < S && (this.sr[e][t].qe = s), i !== void 0 && i && this.Qs.Wi();
  }
  Se(t, e, s) {
    const i = Math.floor(e / 3), n = Math.floor(t / 2), a = this.sr[i][n].Re.charCodeAt(0);
    if (a < 32 || (s ? a == 32 : a == 255)) return;
    const l = t - 2 * n + 2 * (e - 3 * i);
    let c = 0;
    a < 64 ? c = a - 32 : a >= 96 && (c = a - 64), s ? c &= ~(1 << l) : c |= 1 << l, this.sr[i][n].Re = String.fromCharCode(c >= 32 ? c + 64 : c + 32);
  }
  xe(t, e, s, i) {
    let n = 0, a = 0;
    for (let l = 0; l < i.length && e + n < 75; l++) t + a < 80 && (i[n * s + a] == 255 ? this.Se(t + a, e + n) : this.Se(t + a, e + n, !0)), a++, a == s && (n++, a = 0);
  }
  hr(t, e) {
    let s = [...e];
    if (s = s.slice(0, y), s.forEach((i, n) => {
      const a = i.charCodeAt(0);
      if (Number.isNaN(a) || a > 127) throw Error(`PageModel E51 failed to write row: bad character code (${a}) at row ${t} col ${n}`);
      this.sr[t][n].qe = i;
    }), s.length < y) for (let i = s.length; i < y; i++) this.sr[t][i].qe = " ";
  }
  de(t) {
    this.nr = t, this.Qs.Wi();
  }
  Qe(t) {
    if (t === void 0 || t) {
      const e = [];
      for (let s = 0; s < S; s++) e.push("");
      this.ue(e);
    } else for (let e = 0; e < S; e++) this.hr(e, "");
  }
  pe(t, e) {
    this.ir = t;
    const s = t.match(/^g0_([a-z]+)/);
    if (s != null) {
      const i = "g2_" + s[1];
      i in x ? this.rr = i : s[1] == "hebrew" && (this.rr = "g2_arabic");
    }
    e && this.Qs.Wi();
  }
  ye(t, e) {
    this.er = t, e && this.Qs.Wi();
  }
  be(t, e) {
    this.rr = t, e && this.Qs.Wi();
  }
  Ds(t) {
    if (t >= S) throw Error("PageModel.getRow E42 bad rowNum");
    const e = new xt(), s = { lr: h.jt, Ar: g.WHITE, ar: !1, gr: A.Vt, cr: !1, ur: !1, Cr: !1, Er: !1, Ir: g.WHITE, Br: !1, dr: g.BLACK, Qr: h.qt, pr: { Ve: !1, ei: " ", Ts: h.qt } };
    let i = [];
    Nt.includes(this.nr) && (i = this._r.filter((a) => a.Ki == t));
    let n = null;
    return this.sr[t].forEach((a, l) => {
      const c = a.qe, _ = ((C, u) => {
        let m = null, D = null;
        return u in O && L[C].includes(u.charCodeAt(0)) ? u in k ? (m = o.TEXT_COLOUR, D = O[u]) : u in H ? (m = o.MOSAIC_COLOUR, D = O[u]) : m = O[u] : u.charCodeAt(0) <= 31 && (m = o.Zt), { yr: m, br: D };
      })(this.nr, c);
      ((C, u, m) => {
        u.Ir = u.Ar, u.Br = u.cr, C.Ts = u.lr, C.js = u.Er, m.yr != o.STEADY && (C.Js = u.ar), m.yr != o.NORMAL_SIZE && (C.It = u.gr), m.yr != o.CONCEAL && (C.ri = u.ur), u.Cr && (m.yr != o.HOLD_MOSAICS && (u.pr.Ve = !1, u.pr.ei = " "), u.Cr = !1);
      })(a, s, _);
      const d = Dt[_.yr];
      d ? (d({ rs: s, mr: a, wr: _, Sr: e, vr: n, er: this.er }), a.Je(s.pr)) : (a.ze(s.Br ? this.er : this.ir), a.Ye() && (s.pr.ei = c, s.pr.Ts = a.Ts)), a.Ns = s.Ir, a.Hs = s.dr;
      const f = i.filter((C) => C.Yi == l);
      this.Ur(a, f, s), e.tr(a), n = c;
    }), e;
  }
  Zi(t) {
    this._r = t;
  }
  ce() {
    this._r = [];
  }
  ve() {
    const t = new Uint8Array(1e3);
    return this.sr.forEach((e, s) => {
      e.forEach((i, n) => {
        t[s * y + n] = i.qe.charCodeAt(0);
      });
    }), t;
  }
  Ue(t) {
    let e = "";
    for (let s = 0; s < S; s++) {
      const i = this.Ds(s);
      for (let n = 0; n < y; n++) {
        const a = i.Os(n);
        e += Ut(a.Ts, a.ei, a.ks(), t), a.It != A.Kt && a.It != A.Xt || (n < 39 && (e += " "), n++);
      }
      e += `
`, i.Vs && (s < 24 && (e += `
`), s++);
    }
    return e;
  }
  Rr(t) {
    return this.nr != B[1.5] || "Q[\\]".indexOf(t) != -1;
  }
  Ur(t, e, s) {
    e.forEach((i) => {
      switch (i.Ts) {
        case "g0":
          t.qe = i.ei, t.Xi = i.Xi, t.Ts = h.jt, this.ir.includes("latin") ? t.ze("g0_latin") : t.ze(this.ir);
          break;
        case "g1":
          this.nr == B[2.5] && (t.qe = i.ei, t.Ts = s.Qr, this.ir.includes("latin") ? t.ze("g0_latin") : t.ze(this.ir));
          break;
        case "g2":
          t.qe = i.ei, t.Ts = h.jt, t.ze(this.rr);
          break;
        case "g3":
          this.Rr(i.ei) && (t.qe = i.ei, t.Ts = h.Jt, t.ze());
          break;
        case "char":
          t.Ke = i.ei, t.Ts = h.jt;
      }
    });
  }
}
const Dt = { [o.TEXT_COLOUR]: ({ rs: r, wr: t }) => {
  r.lr = h.jt, r.Ar = t.br, r.ur = !1;
}, [o.MOSAIC_COLOUR]: ({ rs: r, wr: t }) => {
  r.lr = r.Qr, r.Ar = t.br, r.ur = !1;
}, [o.NEW_BACKGROUND]: ({ rs: r }) => {
  r.dr = r.Ir;
}, [o.BLACK_BACKGROUND]: ({ rs: r }) => {
  r.dr = g.BLACK;
}, [o.CONTIGUOUS_GRAPHICS]: ({ rs: r, mr: t }) => {
  r.Qr = h.qt, t.Ts == h.zt && (t.Ts = h.qt), r.lr == h.zt && (r.lr = h.qt);
}, [o.SEPARATED_GRAPHICS]: ({ rs: r, mr: t }) => {
  r.Qr = h.zt, t.Ts === h.qt && (t.Ts = h.zt), r.lr === h.qt && (r.lr = h.zt);
}, [o.ESC]: ({ rs: r, er: t }) => {
  t && (r.cr = !r.Br);
}, [o.FLASH]: ({ rs: r }) => {
  r.ar = !0;
}, [o.STEADY]: ({ rs: r, mr: t }) => {
  t.Js = !1, r.ar = !1;
}, [o.NORMAL_SIZE]: ({ rs: r, mr: t }) => {
  t.It = A.Vt, r.gr = A.Vt;
}, [o.DOUBLE_HEIGHT]: ({ rs: r, Sr: t }) => {
  r.gr = A.Yt, t.Vs = !0;
}, [o.DOUBLE_WIDTH]: ({ rs: r }) => {
  r.gr = A.Kt;
}, [o.DOUBLE_SIZE]: ({ rs: r, Sr: t }) => {
  r.gr = A.Xt, t.Vs = !0;
}, [o.CONCEAL]: ({ rs: r, mr: t }) => {
  t.ri = !0, r.ur = !0;
}, [o.HOLD_MOSAICS]: ({ rs: r }) => {
  r.pr.Ve = !0;
}, [o.RELEASE_MOSAICS]: ({ rs: r }) => {
  r.Cr = !0;
}, [o.START_BOX]: ({ rs: r, mr: t, vr: e }) => {
  e == Lt && (t.js = !0, r.Er = !0);
}, [o.END_BOX]: ({ rs: r, mr: t, vr: e }) => {
  e == Ot && (t.js = !1, r.Er = !1);
}, [o.Zt]: () => {
} };
function Ut(r, t, e, s) {
  const i = t || " ";
  return s ? i : r !== h.jt && (r !== h.qt && r !== h.zt || e) ? " " : i;
}
function Tt(r) {
  const t = new Pt();
  return new yt(t, r);
}
class Rt {
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
          const a = await n.json();
          "pages" in a ? (this._magazineData = a, this._magazine = s) : console.warn(`W21 fetchPage: 'pages' property missing in ${i}`);
        } else console.warn(`W22 fetchPage: failed to load magazine data from ${i} : ${n.status} ${n.statusText}`);
      } catch (n) {
        console.warn(`W24 fetchPage: failed to load magazine data from ${i}.json :`, n.message);
      }
    }
    return this._magazine == s && t in this._magazineData.pages ? this._magazineData.pages[t] : null;
  }
}
const kt = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Ht = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
class st {
  constructor(t) {
    this._template = t;
  }
  _tokens() {
    const t = /* @__PURE__ */ new Date();
    return {
      "%%a": kt[t.getDay()],
      "%%b": Ht[t.getMonth()],
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
const Ft = "       %%#  %%a %e %%b \x1BC%H:%M/%S";
class Gt {
  constructor(t) {
    if (typeof t != "object") throw new Error("E8 Service.constructor: options object required");
    if (!("DOMSelector" in t)) throw new Error("E9 Service.constructor DOMSelector property required");
    this._caster = "caster" in t ? t.caster : null, this._defaultG0Charset = "defaultG0Charset" in t ? t.defaultG0Charset : "g0_latin", this._header = "header" in t ? new st(t.header) : new st(Ft), this._fetcher = "fetcher" in t ? t.fetcher : new Rt(t.baseURL), this._baseURL = "baseURL" in t ? t.baseURL : "./", this._ttx = Tt(), this._ttx.setDefaultG0Charset(this._defaultG0Charset), this._ttx.setLevel(B[1.5]), this._ttx.addTo(t.DOMSelector), this._page = null, this._pageNumber = null, this._subPageNumber = 0, this._fastext = null;
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
class it {
  constructor(t) {
    this.t = t, this.i = [];
  }
  attach(t) {
    this.i.push(t);
  }
  notify(t) {
    this.i.forEach((e, s) => this.i[s](this.t, t));
  }
  removeListeners() {
    this.i = [];
  }
}
const w = new class {
  constructor() {
    this.available = new it(this), this.castStateChanged = new it(this);
  }
  o() {
    if (typeof cast > "u") return;
    const r = { receiverApplicationId: "000F65B3", autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED };
    this.h = cast.framework.CastContext.getInstance(), this.h.setOptions(r), this.l = new cast.framework.RemotePlayer(), this.u = new cast.framework.RemotePlayerController(this.l), this.h.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, () => this.castStateChanged.notify()), this.available.notify(), this.castStateChanged.notify();
  }
  mount() {
    this.h && (this.available.notify(), this.castStateChanged.notify());
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
    this.v("clear");
  }
  toggleGrid() {
    this.v("grid");
  }
  toggleReveal() {
    this.v("reveal");
  }
  toggleMixMode() {
    this.v("mix");
  }
  toggleBoxMode() {
    this.v("box");
  }
  setSmoothMosaics() {
    this.v("smoothmosaic");
  }
  setBlockMosaics() {
    this.v("blockmosaic");
  }
  async v(r) {
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
  destroy() {
    this.available.removeListeners(), this.castStateChanged.removeListeners();
  }
}();
let z;
const Mt = new Promise((r) => {
  z = r;
});
if (typeof window < "u") if (typeof cast < "u" && cast.framework) z();
else {
  let t = function() {
    setTimeout(() => {
      typeof cast < "u" && cast.framework ? z() : ++r < 10 && t();
    }, 500);
  };
  window.__onGCastApiAvailable = (e) => {
    e && t();
  };
  let r = 0;
}
Mt.then(() => {
  w.o();
});
const qt = ["sans-serif", "Bedstead", "native", "serif", "Unscii", "monospace", "cursive"], X = ["classic__graphic-for-mosaic", "classic__font-for-mosaic"], jt = "OoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6RQIECBAgQYOHDhw4cOHDhw4cOHDhw4cOHBAgQIECBAgQIDo0igQIECBBqAy8vnFvw8siDHv3dOW_ZzI_2qBAgQIECBAgQIECBAgQIEHdAgQIECBAgQIECDjz9IECBAgQIECBAgQIECA6RQIECBAgQIl69evXr169evXr169evXr169KgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOhECCTmQed_VBow9sqDCg15fOLfh5ZFiDrzyoOmjKgQIECA6EQIN3Xbiy8kGvL55oMO7Ig6aMqDXl880GLLs390CBAgQIDoFAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOlNSNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjR_2iA6U1BECBA_QIECCll7ZcOxAgQIECBAgQIECBAUQIECBB_aoDpTUEQIEG1AgQIJunwgQIECBAgQIECBAgQIEBRAgQIEH9qgOlNQRAgQW0CBAgocsvbTv680HPri4Yc-VAgQFECBAgQf2qA6U1BECBBdQIECCdl8dEHPri4Yc-VAgQIECAogQIECBB_aoDpTUE5L86_yvxIIe_Zv68kGLr06b93NAgQIEBRAgQIEH9qgOlNQRAgQaUCBAgk7smXwgxdenTfuQIECBAgQFECBAgQf2qA6U1BECBB0QIECCpl5ctObTjQZ-WHho04-aDfuX782Yp_aoDpTUEQIEGZAgQII2_d0Qc--npj0IECBAgQIEBRAgQIEH9qgOlNQRAgQekCBAgtZdyDbvyZUG_cv35syBAgQFECBAgQf2qA6U1IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBB_aoDpREvXr169evXr169evXr169evXr169evXr169evXr169KgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA6gQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIDqBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgOoECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA", zt = "https://cdn.jsdelivr.net/npm/@techandsoftware/teletext-plugin-smooth-mosaic@latest/dist/teletext-plugin-smooth-mosaic.min.js";
class $t {
  constructor(t) {
    const e = {
      defaultG0Charset: "g0_latin__english",
      header: "FAXFAX %%#  %%a %e %%b \x1BC%H:%M/%S",
      caster: w,
      DOMSelector: "#teletextscreen"
    };
    let s = "", i = !1;
    if (this._fonts = qt, this._serviceName = "FAXFAX", typeof t == "object") {
      for (const n of ["defaultG0Charset", "header", "DOMSelector", "baseURL"])
        n in t && (e[n] = t[n]);
      "frontPage" in t && (typeof t.frontPage == "number" ? s = String(t.frontPage) : typeof t.frontPage == "string" ? s = t.frontPage : t.frontPage == null), "smoothMosaics" in t && t.smoothMosaics && (i = !0), Array.isArray(t.fontList) && (this._fonts = t.fontList), "serviceName" in t && (this._serviceName = t.serviceName);
    }
    s == "" && (s = "100"), this._service = new Gt(e), this._initPageNumber(s), this._fontIndex = 0, this._viewIndex = 0, this._inhibitUpdateHistoryState = !1, w.available.attach(() => this._castAvailable.call(this)), w.castStateChanged.attach(() => this._castStateChanged.call(this)), this._initEventListeners(), this._service.teletextInstance.setFont(this._fonts[0]), i && this._toggleSmoothMosaics(), this._newPage();
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
    const t = w.getCastState(), e = document.querySelector("#castOuter");
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
        this._newPage(), this._smoothPluginIsLoaded && w.setSmoothMosaics();
        break;
    }
  }
  _castAvailable() {
    document.querySelector("#castOuter").style.display = "inline-block";
  }
  _initEventListeners() {
    window.addEventListener("keydown", (t) => Xt.call(this, t)), window.addEventListener("popstate", (t) => this._handlePopState(t)), window.addEventListener("DOMContentLoaded", () => {
      document.querySelector("#revealButton").addEventListener("click", () => this._reveal()), document.querySelector("#mixButton").addEventListener("click", () => this._mix());
      for (const t of ["red", "green", "yellow", "blue", "index"])
        document.querySelector(`#${t}`).addEventListener("click", () => this._handleFastext(t));
      document.querySelectorAll("[data-num]").forEach((t) => t.addEventListener("click", () => this._numberInput(t.dataset.num))), document.querySelector("#left").addEventListener("click", () => this._previousSubPage()), document.querySelector("#right").addEventListener("click", () => this._nextSubPage()), document.querySelector("#helpicon").addEventListener("click", () => this._showHelp());
    });
  }
  _reveal() {
    window.dispatchEvent(new Event("ttx.reveal")), w.toggleReveal();
  }
  _mix() {
    window.dispatchEvent(new Event("ttx.mix")), w.toggleMixMode();
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
    document.title = e, M("twitter:title", e), t != null && (M("twitter:card", "summary_large_image"), M("twitter:image", t));
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
    t.setDefaultG0Charset("g0_latin__english", !1), t.loadPageFromEncodedString(jt);
  }
  _generateBackground() {
    const t = Math.floor(Math.random() * 360), s = `linear-gradient(${Math.floor(Math.random() * 360)}deg, hsl(${t} 100% 7%) 0%, hsl(${t} 83% 52%) 86%, hsl(${t} 100% 85%) 100%)`;
    document.body.style.background = s;
  }
  async _toggleSmoothMosaics() {
    if (this._smoothPluginIsLoaded)
      this._service.teletextInstance.setView(X[this._viewIndex]), this._smoothPluginIsLoaded = !1, w.setBlockMosaics();
    else if (this._viewIndex == 0)
      try {
        const t = await import(
          /* @vite-ignore */
          zt
        );
        this._service.teletextInstance.registerViewPlugin(t.SmoothMosaicPlugin), this._smoothPluginIsLoaded = !0, w.setSmoothMosaics();
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
function M(r, t) {
  const e = document.createElement("meta");
  e.setAttribute("name", r), e.setAttribute("content", t), e.setAttribute("data-meta", ""), document.head.appendChild(e);
}
function Xt(r) {
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
        this._viewIndex++, this._viewIndex == X.length && (this._viewIndex = 0), this._service.teletextInstance.setView(X[this._viewIndex]), this._smoothPluginIsLoaded = !1;
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
  Gt as TeletextService,
  $t as TeletextServiceViewer
};
//# sourceMappingURL=teletext-service.js.map
