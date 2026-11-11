/* Small DOM + state helpers shared by app and interactives */
(function(){
  const SVGNS = 'http://www.w3.org/2000/svg';
  const SVGTAGS = new Set(['svg','g','path','rect','circle','line','polyline','polygon','text','tspan','defs','marker','linearGradient','stop','ellipse','clipPath','use','title']);
  function append(el, k){
    if (k == null || k === false) return;
    if (Array.isArray(k)) return k.forEach(x => append(el, x));
    el.appendChild(k.nodeType ? k : document.createTextNode(String(k)));
  }
  function h(tag, attrs, ...kids){
    const isSvg = SVGTAGS.has(tag);
    const el = isSvg ? document.createElementNS(SVGNS, tag) : document.createElement(tag);
    for (const k in (attrs || {})){
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.forEach(k => append(el, k));
    return el;
  }
  function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const KEY = 'marineTraining.v1';
  const defaults = { done:{}, exams:[], qc:{}, unlockAll:false, theme:null, name:'', last:null };
  let S;
  try { S = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch(e){ S = Object.assign({}, defaults); }
  const state = {
    get: () => S,
    save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} },
    reset(){ S = Object.assign({}, defaults, { done:{}, exams:[], qc:{} }); this.save(); },
    replace(obj){ S = Object.assign({}, defaults, obj); this.save(); }
  };
  window.UI = { h, shuffle, state, fmt: (n, d = 2) => (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toString() };
})();
