/* Interactives part 2: hotspot diagrams, matching, fault-finding simulator, trim tabs, NMEA 2000 tester, charge profiles */
(function(){
  const T = TRAINING, { h, shuffle, fmt } = UI;
  const reg = (id, title, build) => { T.interactives[id] = { title: typeof title === 'function' ? title : () => title, build }; };
  const num = (v, d) => { const n = parseFloat(v); return isNaN(n) ? d : n; };
  const field = (label, input) => h('label', { class:'fld' }, label, input);

  /* ---------- Hotspot diagrams (data in data/diagrams.js) ---------- */
  reg('hot', arg => (T.diagrams[arg] || {}).title || 'Diagram', (body, arg) => {
    const D = T.diagrams[arg]; if (!D) { body.textContent = 'Diagram data missing: ' + arg; return; }
    const svg = h('svg', { viewBox:`0 0 ${D.w} ${D.h}` });
    const byId = {}; D.nodes.forEach(n => byId[n.id] = n);
    D.links.forEach(([a, b, type, label, mode]) => {
      const A = byId[a], B = byId[b]; if (!A || !B) return;
      let ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
      if (B.bus) bx = ax; if (A.bus) ax = bx;
      let d;
      if (mode === 'hv') d = `M${ax} ${ay} H${bx} V${by}`;
      else if (mode === 'vh') d = `M${ax} ${ay} V${by} H${bx}`;
      else if (Math.abs(ax - bx) < 4 || Math.abs(ay - by) < 4) d = `M${ax} ${ay} L${bx} ${by}`;
      else if (Math.abs(bx - ax) > Math.abs(by - ay)) { const m = (ax + bx) / 2; d = `M${ax} ${ay} H${m} V${by} H${bx}`; } else { const m = (ay + by) / 2; d = `M${ax} ${ay} V${m} H${bx} V${by}`; }
      svg.appendChild(h('path', { d, class:'lnk ' + (type || 'dc') }));
      if (label) svg.appendChild(h('text', { x:(ax + bx) / 2, y:(ay + by) / 2 - 6, 'text-anchor':'middle', style:{ fontSize:'11px', fontWeight:700 } }, label));
    });
    const gEls = {};
    D.nodes.forEach(n => {
      const g = h('g', { class:'node', tabindex:0, role:'button', 'aria-label':n.l, onclick:() => pick(n.id), onkeydown:e => { if (e.key === 'Enter' || e.key === ' ') pick(n.id); } },
        h('rect', { x:n.x, y:n.y, width:n.w, height:n.h, rx:10 }),
        h('text', { class:'nl', x:n.x + n.w / 2, y:n.y + n.h / 2 - (n.s ? 2 : -4), 'text-anchor':'middle' }, n.l),
        n.s ? h('text', { class:'ns', x:n.x + n.w / 2, y:n.y + n.h / 2 + 13, 'text-anchor':'middle' }, n.s) : null);
      gEls[n.id] = g; svg.appendChild(g);
    });
    const panel = h('div', { class:'panel' }, h('i', { class:'muted' }, 'Click any component to learn what it does, or press “Quiz me” to test yourself.'));
    const score = h('span', { class:'hint' }); let quiz = null, right = 0, tries = 0;
    const qbtn = h('button', { class:'btn sm', onclick(){ right = 0; tries = 0; ask(); } }, '🎯 Quiz me');
    function clear(){ Object.values(gEls).forEach(g => g.classList.remove('sel', 'right', 'wrong', 'pulse')); }
    function ask(){ clear(); quiz = D.nodes[Math.floor(Math.random() * D.nodes.length)]; const mask = t => t.replace(new RegExp(quiz.l.replace(/[^A-Za-z0-9 ]/g, '.').split(' ')[0], 'ig'), '____'); panel.innerHTML = `<b>Quiz:</b> which component is this? <i>${mask(quiz.d.split('. ')[0])}.</i>`; score.textContent = `Score ${right}/${tries}`; }
    function pick(id){
      const n = byId[id];
      if (quiz){ tries++; const ok = id === quiz.id; clear(); gEls[id].classList.add(ok ? 'right' : 'wrong'); if (ok) right++; score.textContent = `Score ${right}/${tries}`;
        panel.innerHTML = (ok ? '✅ <b>Correct!</b> ' : `❌ That was <b>${n.l}</b>. The answer was <b>${quiz.l}</b>. `) + `<br>${quiz.d}`; if (ok) quiz = null; else gEls[quiz.id].classList.add('pulse'); quiz = ok ? null : quiz; if (!ok) quiz = null; return; }
      clear(); gEls[id].classList.add('sel');
      panel.innerHTML = `<b>${n.l}</b>${n.s ? ' – ' + n.s : ''}<br>${n.d}` + (n.tip ? `<br><br>🔧 <b>Field tip:</b> ${n.tip}` : '');
    }
    const legend = h('div', { class:'legend' }, [['dc', 'DC power'], ['ac', 'AC power'], ['data', 'Data / control'], ['hyd', 'Hydraulic']].filter(([k]) => D.links.some(l => (l[2] || 'dc') === k)).map(([k, l]) => h('span', null, h('i', { style:{ background: k === 'hyd' ? '#3b82f6' : `var(--${k})` } }), l)));
    body.append(h('div', { class:'btnrow' }, qbtn, score), svg, legend, panel);
  });

  /* ---------- Matching (data in data/activities.js) ---------- */
  reg('match', arg => (T.matches[arg] || {}).title || 'Matching activity', (body, arg) => {
    const M = T.matches[arg]; if (!M) { body.textContent = 'Missing: ' + arg; return; }
    let sel = null, done = 0, tries = 0;
    const L = M.pairs.map((p, i) => ({ t:p[0], i })), R = shuffle(M.pairs.map((p, i) => ({ t:p[1], i })));
    const status = h('div', { class:'hint' }, 'Click an item on the left, then its match on the right.');
    const grid = h('div', { class:'match' }); const lc = h('div'), rc = h('div'); grid.append(lc, rc);
    const lb = [], rb = [];
    L.forEach(x => { const b = h('button', { class:'mi', style:{ display:'block', width:'100%', marginBottom:'8px', fontWeight:700 }, onclick(){ if (b.classList.contains('ok')) return; lb.forEach(y => y.classList.remove('sel')); b.classList.add('sel'); sel = x.i; } }, x.t); lb.push(b); lc.appendChild(b); });
    R.forEach(x => { const b = h('button', { class:'mi', style:{ display:'block', width:'100%', marginBottom:'8px' }, onclick(){
      if (b.classList.contains('ok') || sel === null) { if (sel === null) status.textContent = 'Pick an item on the left first.'; return; }
      tries++; if (x.i === sel){ b.classList.add('ok'); lb[sel].classList.remove('sel'); lb[sel].classList.add('ok'); done++; sel = null; status.innerHTML = done === M.pairs.length ? `🎉 <b>All matched</b> in ${tries} attempts (perfect = ${M.pairs.length}).` : `✅ Correct (${done}/${M.pairs.length})`; }
      else { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); status.textContent = '❌ Not that one – try again.'; }
    } }, x.t); rb.push(b); rc.appendChild(b); });
    body.append(h('p', { class:'hint' }, M.intro || ''), grid, status, h('button', { class:'btn sm sec', style:{ marginTop:'8px' }, onclick(){ body.innerHTML = ''; T.interactives.match.build(body, arg); } }, '↻ Shuffle / restart'));
  });

  /* ---------- Fault-finding simulator (data in data/activities.js) ---------- */
  reg('sim', arg => 'Fault-Finding Simulator: ' + ((T.scenarios[arg] || {}).title || ''), (body, arg) => {
    const S = T.scenarios[arg]; if (!S) { body.textContent = 'Missing scenario ' + arg; return; }
    const used = new Set(), log = h('tbody'), lcd = h('div', { class:'lcd' }, h('small', null, 'Select a test point'), '----');
    const count = h('span', { class:'hint' }, 'Tests used: 0');
    const groups = {}; S.tests.forEach(t => (groups[t.g] = groups[t.g] || []).push(t));
    const tests = h('div'); Object.keys(groups).forEach(g => { tests.appendChild(h('div', { class:'spec-title' }, g)); tests.appendChild(h('div', { class:'testgrid' }, groups[g].map(t => h('button', { class:'btn sm sec', onclick(){
      lcd.innerHTML = ''; lcd.append(h('small', null, t.l), t.r);
      if (!used.has(t)){ used.add(t); log.appendChild(h('tr', null, h('td', null, t.l), h('td', null, h('b', null, t.r)))); count.textContent = 'Tests used: ' + used.size; }
    } }, t.l)))); });
    const sel = h('select', null, h('option', { value:-1 }, '— choose your diagnosis —'), S.diagnoses.map((d, i) => h('option', { value:i }, d)));
    const res = h('div');
    const check = h('button', { class:'btn', onclick(){
      const v = num(sel.value, -1); if (v < 0) return;
      const ok = v === S.answer;
      res.innerHTML = `<div class="callout ${ok ? 'tip' : 'safety'}"><b class="l">${ok ? '✅ Correct diagnosis' : '❌ Not quite'}</b>${ok ? '' : 'The most likely cause was: <b>' + S.diagnoses[S.answer] + '</b>.<br>'}${S.explain}<br><span class="hint">You used ${used.size} test(s). A good technician needs about ${S.par}.</span></div>`;
    } }, 'Submit diagnosis');
    body.append(h('div', { class:'panel' }, h('b', null, 'Customer complaint: '), S.intro), h('div', { class:'row', style:{ marginTop:'10px', alignItems:'flex-start' } }, lcd, h('div', { style:{ flex:1, minWidth:'260px' } }, h('table', { class:'log' }, h('thead', null, h('tr', null, h('th', null, 'Test'), h('th', null, 'Reading'))), log), count)), tests, h('div', { class:'row', style:{ marginTop:'14px' } }, field('Diagnosis', sel), check), res);
  });

  /* ---------- Trim tab simulator ---------- */
  reg('trim', 'Trim Tab Simulator', body => {
    const port = h('input', { type:'range', min:0, max:100, value:0 }), stbd = h('input', { type:'range', min:0, max:100, value:0 });
    const cond = h('select', null, [['Cruising on plane, level load', 3, 0], ['Light bow, porpoising risk', 7, 0], ['Heavy load aft (bow high)', 6, 0], ['Beam wind from starboard (list to stbd)', 3, 4], ['Fuel/water weight to port (list to port)', 3, -4]].map((c, i) => h('option', { value:i }, c[0])));
    const C = [[3, 0], [7, 0], [6, 0], [3, 4], [3, -4]];
    const side = h('svg', { viewBox:'0 0 320 170' }), rear = h('svg', { viewBox:'0 0 220 170' }), out = h('div', { class:'out' }), note = h('div', { class:'panel' });
    function calc(){
      const p = num(port.value, 0), s = num(stbd.value, 0), c = C[num(cond.value, 0)];
      const pitch = c[0] - (p + s) / 2 * 0.07, roll = c[1] + (p - s) * 0.05;
      side.innerHTML = ''; rear.innerHTML = '';
      side.append(h('rect', { x:0, y:112, width:320, height:60, fill:'#0e7490', opacity:.35 }),
        h('g', { transform:`rotate(${-pitch} 150 100)`, style:{ transition:'transform .4s' } },
          h('path', { d:'M30 78 H250 L290 56 L255 112 H40 Z', fill:'var(--navy2)' }), h('rect', { x:110, y:46, width:90, height:32, rx:4, fill:'var(--card)', stroke:'var(--navy2)', 'stroke-width':2 }), h('rect', { x:120, y:54, width:70, height:12, fill:'#7dd3fc' }),
          h('path', { d:`M30 108 L${30 - 22} ${108 + (p + s) / 2 * 0.28} L30 112 Z`, fill:'var(--amber)' }), h('text', { x:60, y:99, style:{ fill:'#fff', fontSize:'11px', fontWeight:700 } }, 'MOTOR YACHT')),
        h('line', { x1:0, y1:112, x2:320, y2:112, stroke:'#0e7490', 'stroke-width':2 }), h('text', { x:8, y:18, style:{ fontWeight:700 } }, 'Side view – bow angle ' + fmt(pitch, 1) + '°'));
      rear.append(h('rect', { x:0, y:112, width:220, height:60, fill:'#0e7490', opacity:.35 }),
        h('g', { transform:`rotate(${roll} 110 100)`, style:{ transition:'transform .4s' } }, h('path', { d:'M30 70 H190 L170 120 H50 Z', fill:'var(--navy2)' }), h('rect', { x:75, y:42, width:70, height:28, rx:4, fill:'var(--card)', stroke:'var(--navy2)', 'stroke-width':2 }),
          h('rect', { x:36, y:117, width:30, height:5 + p * 0.1, fill:'var(--amber)' }), h('rect', { x:154, y:117, width:30, height:5 + s * 0.1, fill:'var(--amber)' }),
          h('text', { x:44, y:108, style:{ fill:'#fff', fontSize:'11px' } }, 'P'), h('text', { x:168, y:108, style:{ fill:'#fff', fontSize:'11px' } }, 'S')),
        h('text', { x:8, y:18, style:{ fontWeight:700 } }, 'Rear view – list ' + fmt(Math.abs(roll), 1) + '° to ' + (Math.abs(roll) < .3 ? 'none' : roll > 0 ? 'starboard' : 'port')));
      out.innerHTML = ''; const avg = (p + s) / 2;
      const verdict = avg > 75 ? 'Too much tab: drag & fuel burn' : Math.abs(roll) > 1.5 ? 'List – correct with tabs' : pitch > 5 ? 'Bow high – deploy more tab' : pitch < 0.5 ? 'Bow down – retract tabs' : 'Good running attitude';
      [['Bow angle', fmt(pitch, 1) + '°'], ['List', fmt(Math.abs(roll), 1) + '° ' + (Math.abs(roll) < .3 ? '' : roll > 0 ? 'stbd' : 'port')], ['Tab deployment', fmt(avg, 0) + '% avg'], ['Assessment', verdict, avg > 75 || pitch < 0.5 ? 'warn' : '']].forEach(([l, v, c]) => out.appendChild(h('div', { class:c || '' }, h('b', { style:{ fontSize:'17px' } }, v), h('span', null, l))));
      note.innerHTML = '<b>Remember:</b> tabs push the <i>stern up</i> by deflecting water down, which pushes the <i>bow down</i>. Deploy <b>both</b> to lower a high bow (and to get on the plane sooner); deploy only the tab on the <b>low side</b> to correct a list. Use the minimum deflection needed – excess deflection adds drag, and tabs should be fully retracted before going astern or docking.';
    }
    [port, stbd, cond].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Condition', cond), field('Port tab (%)', port), field('Starboard tab (%)', stbd), h('button', { class:'btn sm sec', onclick(){ port.value = 0; stbd.value = 0; calc(); } }, 'Retract both')), h('div', { class:'row', style:{ alignItems:'stretch' } }, h('div', { style:{ flex:'3 1 300px' } }, side), h('div', { style:{ flex:'2 1 200px' } }, rear)), out, note);
    calc();
  });

  /* ---------- NMEA 2000 / CAN termination tester ---------- */
  reg('n2k', 'NMEA 2000 / CAN-bus Termination Tester', body => {
    const st = { a:true, b:true, c:false, short:false, cut:false, power:false };
    const svg = h('svg', { viewBox:'0 0 700 200' }), lcd = h('div', { class:'lcd' }), say = h('div', { class:'panel' });
    const tg = (k, label) => { const b = h('button', { class:'toggle' + (st[k] ? ' on' : ''), onclick(){ st[k] = !st[k]; b.classList.toggle('on', st[k]); draw(); } }, label); return b; };
    function draw(){
      const t = (st.a ? 1 : 0) + (st.b ? 1 : 0) + (st.c ? 1 : 0); let ohm;
      if (st.short) ohm = 0.3; else if (st.cut) ohm = (st.a ? 120 : Infinity); else if (!t) ohm = Infinity; else ohm = 120 / t;
      svg.innerHTML = '';
      svg.append(h('path', { d:'M80 100 H620', class:'lnk dc', style:{ strokeWidth:8, stroke:'var(--navy2)' } }));
      if (st.cut) svg.append(h('rect', { x:340, y:80, width:20, height:40, fill:'var(--bg)' }), h('text', { x:350, y:75, 'text-anchor':'middle', style:{ fontSize:'12px', fill:'var(--red)', fontWeight:700 } }, '✂ break'));
      [[160, 'GPS'], [300, 'MFD'], [440, 'Engine gateway'], [560, 'Autopilot']].forEach(([x, l]) => svg.append(h('path', { d:`M${x} 100 V150`, class:'lnk data', style:{ animation:'none' } }), h('rect', { x:x - 40, y:150, width:80, height:32, rx:6, fill:'var(--card)', stroke:'var(--navy2)', 'stroke-width':2 }), h('text', { x:x, y:171, 'text-anchor':'middle', style:{ fontSize:'11px', fontWeight:700 } }, l)));
      const term = (x, on, l) => h('g', null, h('rect', { x:x - 22, y:84, width:44, height:32, rx:6, fill:on ? 'var(--amber)' : 'var(--card)', stroke:on ? 'var(--amber)' : 'var(--line)', 'stroke-width':2, 'stroke-dasharray':on ? '' : '4 3' }), h('text', { x, y:105, 'text-anchor':'middle', style:{ fontSize:'12px', fontWeight:800, fill:on ? '#000' : 'var(--muted)' } }, on ? '120Ω' : l));
      svg.append(term(70, st.a, 'none'), term(630, st.b, 'none'), term(230, st.c, 'none'));
      svg.append(h('text', { x:350, y:30, 'text-anchor':'middle', style:{ fontWeight:700 } }, 'NMEA 2000 backbone (CAN-H / CAN-L pair)'), h('text', { x:350, y:50, 'text-anchor':'middle', style:{ fontSize:'12px', fill:'var(--muted)' } }, 'Power OFF · meter across CAN-H (white) and CAN-L (blue) at any T-piece'));
      lcd.innerHTML = ''; lcd.append(h('small', null, 'Ω across CAN-H / CAN-L'), ohm === Infinity ? 'O.L' : fmt(ohm, ohm < 10 ? 1 : 0) + ' Ω');
      let msg;
      if (st.short) msg = '<b>≈0 Ω – short circuit</b> between CAN-H and CAN-L (crushed cable, water in a connector). The whole bus is down. Disconnect branches one at a time to isolate it.';
      else if (st.cut && !st.a) msg = '<b>Open circuit</b> – this segment has no terminator at all and the backbone is broken. Devices beyond the break lose comms.';
      else if (st.cut) msg = '<b>120 Ω</b> – the break splits the backbone; this side sees only one terminator. Measure from each side of a suspected break to find it.';
      else if (t === 2) msg = '<b>≈60 Ω – correct.</b> Two 120 Ω terminators (one at each end) in parallel. This is the healthy result with power off.';
      else if (t === 1) msg = '<b>≈120 Ω – one terminator missing</b> (or a break). Expect intermittent data loss and “missing device” faults.';
      else if (t === 3) msg = '<b>≈40 Ω – too many terminators</b> (often a device with a built-in terminator or an extra one in the middle). Remove the extra.';
      else msg = '<b>Open (O.L)</b> – no terminators fitted. The network will not communicate reliably.';
      say.innerHTML = msg + '<br><span class="hint">Always test with the network powered down. Then power up and check voltage at the furthest device (should be ≥ 9 V under load) and look for a single power feed point with only one negative-to-ground connection.</span>';
    }
    body.append(h('div', { class:'sw-wrap' }, tg('a', 'Terminator – left end'), tg('b', 'Terminator – right end'), tg('c', 'Extra terminator (middle)'), tg('short', 'Crushed cable (H–L short)'), tg('cut', 'Cut backbone')), svg, h('div', { class:'row', style:{ alignItems:'flex-start' } }, lcd, h('div', { style:{ flex:1, minWidth:'260px' } }, say)));
    draw();
  });

  /* ---------- Charge profile ---------- */
  reg('charge', 'Charge Profile Explorer: Bulk, Absorption & Float', body => {
    const P = {
      flood: { n:'Flooded lead-acid', v0:12.1, abs:14.5, flt:13.5, b:38, a:78, I:0.2, p:0.55, note:'Long absorption is needed to fully restore the plates; periodic equalisation is sometimes specified. Hot batteries need temperature compensation (≈ –3 mV/°C/cell, or about –18 mV/°C for a 12 V battery).' },
      agm: { n:'AGM lead-acid', v0:12.3, abs:14.4, flt:13.5, b:38, a:74, I:0.25, p:0.55, note:'Sealed batteries are sensitive to over-voltage and heat – follow the manufacturer\'s voltages and use temperature compensation. Never equalise unless the maker says so.' },
      lfp: { n:'LiFePO4 lithium', v0:13.0, abs:14.2, flt:13.5, b:62, a:78, I:0.5, p:3.2, note:'Voltage stays flat for most of the charge, then rises sharply at the end. Absorption is short, a float is not required (a lower “maintenance” voltage is common), and charging must stop below 0°C unless the battery has heating. The BMS can and will disconnect to protect cells.' }
    };
    const sel = h('select', null, Object.keys(P).map(k => h('option', { value:k }, P[k].n))), sl = h('input', { type:'range', min:0, max:100, value:30 });
    const svg = h('svg', { viewBox:'0 0 640 280' }), out = h('div', { class:'out' }), note = h('div', { class:'panel' });
    const X = t => 50 + t * 5.6, VY = v => 250 - (v - 12) / 3 * 200, IY = i => 250 - i * 200;
    function V(c, t){ return t < c.b ? c.v0 + (c.abs - c.v0) * Math.pow(t / c.b, c.p) : t < c.a ? c.abs : c.flt; }
    function I(c, t){ return t < c.b ? c.I : t < c.a ? c.I * Math.exp(-3.2 * (t - c.b) / (c.a - c.b)) : 0.02; }
    function calc(){
      const c = P[sel.value], t = num(sl.value, 0); svg.innerHTML = '';
      svg.append(h('rect', { x:50, y:50, width:560, height:200, fill:'var(--soft)', opacity:.5 }));
      [[0, c.b, 'BULK'], [c.b, c.a, 'ABSORPTION'], [c.a, 100, 'FLOAT / MAINT.']].forEach(([a, b, l], i) => svg.append(h('rect', { x:X(a), y:50, width:X(b) - X(a), height:200, fill:['#ef4444', '#f59e0b', '#14b8a6'][i], opacity:.12 }), h('text', { x:(X(a) + X(b)) / 2, y:66, 'text-anchor':'middle', style:{ fontSize:'12px', fontWeight:800 } }, l)));
      const pts = f => Array.from({ length:101 }, (_, k) => X(k) + ',' + f(k)).join(' ');
      svg.append(h('polyline', { points:pts(k => VY(V(c, k))), fill:'none', stroke:'var(--navy2)', 'stroke-width':3.5 }), h('polyline', { points:pts(k => IY(I(c, k))), fill:'none', stroke:'var(--dc)', 'stroke-width':3.5 }),
        h('line', { x1:X(t), x2:X(t), y1:50, y2:250, stroke:'var(--text)', 'stroke-dasharray':'4 3' }), h('circle', { cx:X(t), cy:VY(V(c, t)), r:6, fill:'var(--navy2)' }), h('circle', { cx:X(t), cy:IY(I(c, t)), r:6, fill:'var(--dc)' }),
        h('text', { x:50, y:272, style:{ fontSize:'12px' } }, 'time →'), h('text', { x:10, y:42, style:{ fontSize:'12px', fill:'var(--navy2)', fontWeight:700 } }, 'Voltage (blue)'), h('text', { x:540, y:42, style:{ fontSize:'12px', fill:'var(--dc)', fontWeight:700 } }, 'Current (red)'),
        h('text', { x:8, y:VY(c.abs) + 4, style:{ fontSize:'11px' } }, fmt(c.abs, 1)), h('text', { x:8, y:VY(c.flt) + 4, style:{ fontSize:'11px' } }, fmt(c.flt, 1)));
      const stage = t < c.b ? 'Bulk (constant current)' : t < c.a ? 'Absorption (constant voltage)' : 'Float / maintenance';
      out.innerHTML = ''; [['Stage', stage], ['Battery voltage', fmt(V(c, t), 2) + ' V'], ['Charge current', fmt(I(c, t) * 100, 0) + '% of max'], ['Typical 12 V setpoints', `Abs ${c.abs} V / Float ${c.flt} V`]].forEach(([l, v]) => out.appendChild(h('div', null, h('b', { style:{ fontSize:'17px' } }, v), h('span', null, l))));
      note.innerHTML = '<b>' + c.n + ':</b> ' + c.note + ' <span class="hint">Typical figures only – always program the battery manufacturer\'s values.</span>';
    }
    sel.addEventListener('input', calc); sl.addEventListener('input', calc);
    body.append(h('div', { class:'row' }, field('Battery chemistry', sel), field('Scrub through the charge', sl), h('button', { class:'btn sm', onclick(){ let v = 0; sl.value = 0; const iv = setInterval(() => { v += 1.2; sl.value = v; calc(); if (v >= 100 || !document.body.contains(svg)) clearInterval(iv); }, 40); } }, '▶ Play')), svg, out, note);
    calc();
  });
})();
