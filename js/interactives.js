/* Interactives part 1: calculators and animated system diagrams */
(function(){
  const T = TRAINING, { h, fmt } = UI;
  const reg = (id, title, build) => { T.interactives[id] = { title: typeof title === 'function' ? title : () => title, build }; };
  const num = (v, d) => { const n = parseFloat(v); return isNaN(n) ? d : n; };
  const field = (label, input) => h('label', { class:'fld' }, label, input);
  const alive = el => document.body.contains(el);

  /* ---------- 1. Ohm's law ---------- */
  reg('ohm', "Ohm's Law & Power Calculator", body => {
    const keys = ['V','I','R','P'], units = { V:'Volts (V)', I:'Current (A)', R:'Resistance (Ω)', P:'Power (W)' };
    let touched = ['V','R']; const vals = { V:12, R:0.5 };
    const inputs = {};
    function calc(){
      const [a, b] = touched, x = vals[a], y = vals[b], set = new Set([a, b]); let v = {};
      v[a] = x; v[b] = y;
      const k = [a, b].sort().join('');
      if (k === 'IV'){ v.R = v.V / v.I; v.P = v.V * v.I; }
      else if (k === 'RV'){ v.I = v.V / v.R; v.P = v.V * v.V / v.R; }
      else if (k === 'PV'){ v.I = v.P / v.V; v.R = v.V * v.V / v.P; }
      else if (k === 'IR'){ v.V = v.I * v.R; v.P = v.I * v.I * v.R; }
      else if (k === 'IP'){ v.V = v.P / v.I; v.R = v.P / (v.I * v.I); }
      else if (k === 'PR'){ v.V = Math.sqrt(v.P * v.R); v.I = Math.sqrt(v.P / v.R); }
      keys.forEach(q => { vals[q] = v[q]; if (!set.has(q)) inputs[q].value = isFinite(v[q]) ? fmt(v[q], 3) : '–'; });
      draw();
    }
    const row = h('div', { class:'row' });
    keys.forEach(k => { inputs[k] = h('input', { type:'number', step:'any', min:'0', value:vals[k] != null ? vals[k] : '', oninput(e){ const n = parseFloat(e.target.value); if (isNaN(n) || n <= 0) return; vals[k] = n; touched = touched.filter(t => t !== k); touched.push(k); if (touched.length > 2) touched.shift(); calc(); } }); row.appendChild(field(units[k], inputs[k])); });
    const svg = h('svg', { viewBox:'0 0 600 170' });
    const info = h('div', { class:'panel' });
    function draw(){
      const I = vals.I || 0, dur = Math.max(0.15, 3 / (1 + I / 4));
      svg.innerHTML = '';
      svg.append(
        h('rect', { x:60, y:30, width:480, height:110, rx:14, fill:'none', stroke:'var(--line)', 'stroke-width':4 }),
        h('rect', { x:60, y:30, width:480, height:110, rx:14, fill:'none', class:'flow dc', style:{ animationDuration:dur + 's' } }),
        h('rect', { x:36, y:62, width:48, height:46, rx:6, fill:'var(--navy2)' }), h('text', { x:60, y:90, 'text-anchor':'middle', style:{ fill:'#fff', fontWeight:700 } }, fmt(vals.V, 1) + 'V'),
        h('rect', { x:430, y:118, width:110, height:44, rx:6, fill:'var(--card)', stroke:'var(--amber)', 'stroke-width':3 }), h('text', { x:485, y:146, 'text-anchor':'middle' }, 'R = ' + fmt(vals.R, 2) + ' Ω'),
        h('text', { x:300, y:24, 'text-anchor':'middle', style:{ fontWeight:700 } }, 'I = ' + fmt(vals.I, 2) + ' A   →   P = ' + fmt(vals.P, 1) + ' W'));
      const hot = vals.P > 1500 ? 'That is a heavy DC load – think about cable size, voltage drop and protection.' : vals.P > 300 ? 'A substantial load: check conductor size and fuse rating.' : 'A light load.';
      info.innerHTML = `<b>Worked result:</b> ${fmt(vals.V, 2)} V across ${fmt(vals.R, 3)} Ω drives ${fmt(vals.I, 2)} A and dissipates ${fmt(vals.P, 1)} W as heat/work. ${hot}<br><span class="hint">V = I × R · P = V × I = I²R = V²/R. Type in any two values; the other two are calculated.</span>`;
    }
    const presets = [['Bilge pump 12 V, 4 A', { V:12, I:4 }], ['Windlass 12 V, 1500 W', { V:12, P:1500 }], ['Thruster 24 V, 400 A', { V:24, I:400 }], ['Cable: 100 A through 5 mΩ', { I:100, R:0.005 }], ['Shore power 240 V, 10 A', { V:240, I:10 }]];
    body.append(row, svg, info, h('div', { class:'btnrow' }, presets.map(([l, o]) => h('button', { class:'btn sm sec', onclick(){ const ks = Object.keys(o); touched = ks.slice(); ks.forEach(k => { vals[k] = o[k]; inputs[k].value = o[k]; }); calc(); } }, l))));
    calc();
  });

  /* ---------- 2. Voltage drop / wire size ---------- */
  reg('vdrop', 'Voltage-Drop & Cable Size Calculator', body => {
    const SIZES = [[1.5, 15, '16'], [2.5, 20, '14'], [4, 28, '12'], [6, 36, '10'], [10, 50, '8'], [16, 70, '6'], [25, 95, '4'], [35, 120, '2'], [50, 150, '1/0'], [70, 190, '2/0'], [95, 230, '3/0'], [120, 270, '4/0'], [150, 310, '–'], [185, 360, '–']];
    const RHO = 0.0185; // ohm.mm2/m, tinned copper, warm conductor (conservative)
    const sys = h('select', null, [12, 24, 32, 48].map(v => h('option', { value:v }, v + ' V DC')));
    const cur = h('input', { type:'number', value:40, min:0, step:'any' });
    const len = h('input', { type:'number', value:6, min:0, step:'any' });
    const pct = h('select', null, h('option', { value:3 }, '3% – critical (nav, bilge, engine, comms)'), h('option', { value:10 }, '10% – non-critical (lighting, general)'), h('option', { value:5 }, '5% – general'), h('option', { value:2 }, '2% – sensitive / lithium charge leads'));
    const out = h('div', { class:'out' }), tbl = h('div'), note = h('div', { class:'panel' });
    function calc(){
      const V = num(sys.value, 12), I = num(cur.value, 0), L = num(len.value, 0), p = num(pct.value, 3);
      const vdMax = V * p / 100; const aMin = I > 0 && L > 0 ? 2 * L * I * RHO / vdMax : 0;
      let pick = SIZES.find(s => s[0] >= aMin) || SIZES[SIZES.length - 1];
      const ampOk = I <= pick[1]; if (!ampOk){ const q = SIZES.find(s => s[0] >= aMin && s[1] >= I); if (q) pick = q; }
      const vd = 2 * L * I * RHO / pick[0], vp = vd / V * 100;
      out.innerHTML = '';
      [['Minimum area (voltage drop)', fmt(aMin, 2) + ' mm²'], ['Recommended size', pick[0] + ' mm²'], ['Actual drop', fmt(vd, 2) + ' V (' + fmt(vp, 2) + '%)', vp > p ? 'bad' : ''], ['Loop length', fmt(2 * L, 1) + ' m'], ['Indicative ampacity', pick[1] + ' A', I > pick[1] ? 'bad' : ''], ['Power lost in cable', fmt(I * vd, 0) + ' W', I * vd > 100 ? 'warn' : '']]
        .forEach(([l, v, c]) => out.appendChild(h('div', { class:c || '' }, h('b', null, v), h('span', null, l))));
      tbl.innerHTML = '';
      tbl.appendChild(h('div', { class:'tblwrap' }, h('table', { class:'t' }, h('thead', null, h('tr', null, ['Size', 'Drop at this current/length', '% of system', 'Within limit?'].map(x => h('th', null, x)))),
        h('tbody', null, SIZES.filter(s => s[0] >= 4 && s[0] <= 95).map(s => { const d = 2 * L * I * RHO / s[0], q = d / V * 100; return h('tr', null, h('td', null, s[0] + ' mm²'), h('td', null, fmt(d, 2) + ' V'), h('td', null, fmt(q, 2) + '%'), h('td', null, q <= p ? '✔ yes' : '✘ no')); })))));
      note.innerHTML = `<b>How it works:</b> ΔV = 2 × L × I × ρ ÷ A, where L is the <i>one-way</i> run (positive <i>and</i> negative are both in the loop), ρ ≈ ${RHO} Ω·mm²/m for warm tinned copper. The cable is then also checked against an <i>indicative</i> current rating. Real ratings depend on insulation temperature rating, ambient temperature, bundling and the standard in use (AS/NZS 3004 / ISO 10133 / ABYC) – always confirm with the cable data sheet and standard. Fuse/breaker must protect the cable, not just the load.`;
    }
    [sys, cur, len, pct].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('System voltage', sys), field('Load current (A)', cur), field('One-way length (m)', len), field('Allowed drop', pct)), out, tbl, note);
    calc();
  });

  /* ---------- 3. Battery bank sizing ---------- */
  reg('bank', 'Battery Bank Sizing Tool', body => {
    let loads = [['Fridge / freezer (avg DC)', 60, 1, 24, 'DC'], ['LED lighting', 120, 1, 5, 'DC'], ['Nav electronics + autopilot', 90, 1, 8, 'DC'], ['Freshwater / bilge / misc pumps', 80, 1, 1, 'DC'], ['TV / entertainment (inverter)', 150, 1, 4, 'AC'], ['Microwave (inverter)', 1200, 1, 0.3, 'AC']];
    const sys = h('select', null, [12, 24, 48].map(v => h('option', { value:v }, v + ' V')));
    const chem = h('select', null, h('option', { value:0.5 }, 'AGM / flooded lead-acid (50% usable)'), h('option', { value:0.8 }, 'LiFePO4 lithium (80% usable)'), h('option', { value:0.9 }, 'LiFePO4 lithium (90% usable)'));
    const days = h('input', { type:'number', min:0.5, step:0.5, value:1 });
    const sun = h('input', { type:'number', min:1, max:7, step:0.5, value:4 });
    const list = h('div'), out = h('div', { class:'out' }), note = h('div', { class:'panel' });
    function render(){
      list.innerHTML = '';
      list.appendChild(h('div', { class:'tblwrap' }, h('table', { class:'log' }, h('thead', null, h('tr', null, ['Load', 'Watts', 'Qty', 'Hours/day', 'Type', ''].map(x => h('th', null, x)))),
        h('tbody', null, loads.map((l, i) => h('tr', null,
          h('td', null, h('input', { value:l[0], style:{ width:'100%', minWidth:'150px' }, oninput(e){ l[0] = e.target.value; } })),
          h('td', null, h('input', { type:'number', value:l[1], style:{ width:'80px' }, oninput(e){ l[1] = num(e.target.value, 0); calc(); } })),
          h('td', null, h('input', { type:'number', value:l[2], style:{ width:'55px' }, oninput(e){ l[2] = num(e.target.value, 0); calc(); } })),
          h('td', null, h('input', { type:'number', step:'any', value:l[3], style:{ width:'70px' }, oninput(e){ l[3] = num(e.target.value, 0); calc(); } })),
          h('td', null, h('select', { onchange(e){ l[4] = e.target.value; calc(); } }, ['DC', 'AC'].map(t => h('option', { value:t, selected:t === l[4] }, t)))),
          h('td', null, h('button', { class:'btn sm sec', onclick(){ loads.splice(i, 1); render(); calc(); } }, '✕'))))))));
      list.appendChild(h('button', { class:'btn sm sec', onclick(){ loads.push(['New load', 100, 1, 2, 'DC']); render(); calc(); } }, '+ Add load'));
    }
    function calc(){
      const V = num(sys.value, 12), usable = num(chem.value, 0.5), d = num(days.value, 1), ps = num(sun.value, 4);
      let wh = 0; loads.forEach(l => { wh += l[1] * l[2] * l[3] / (l[4] === 'AC' ? 0.85 : 1); });
      const ahDay = wh / V, need = ahDay * d / usable * 1.1, solar = wh / (ps * 0.75);
      const std = [100, 150, 200, 280, 300, 400, 500, 600, 800, 1000, 1200].find(x => x >= need) || Math.ceil(need);
      out.innerHTML = '';
      [['Daily energy', fmt(wh / 1000, 2) + ' kWh'], ['Daily amp-hours', fmt(ahDay, 0) + ' Ah @ ' + V + 'V'], ['Bank capacity needed', fmt(need, 0) + ' Ah'], ['Suggested bank', std + ' Ah @ ' + V + ' V'], ['Solar to replace a day', fmt(solar, 0) + ' W'], ['Bank energy', fmt(std * V / 1000, 1) + ' kWh']]
        .forEach(([l, v]) => out.appendChild(h('div', null, h('b', null, v), h('span', null, l))));
      note.innerHTML = `<b>Method:</b> Wh/day = W × qty × hours (AC loads ÷ 0.85 inverter efficiency). Capacity = Ah/day × days of autonomy ÷ usable depth-of-discharge × 1.1 ageing/temperature margin. Solar = Wh/day ÷ (peak-sun-hours × 0.75 system losses). Also check <b>peak current</b>: an inverter at 3 kW on a 12 V bank pulls roughly 280 A, which drives cable, fuse and battery C-rate decisions.`;
    }
    [sys, chem, days, sun].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Bank voltage', sys), field('Battery type', chem), field('Days autonomy', days), field('Peak sun hours', sun)), list, out, note);
    render(); calc();
  });

  /* ---------- 4. Series / parallel ---------- */
  reg('sp', 'Series / Parallel Battery Wiring', body => {
    const cnt = h('select', null, h('option', { value:2 }, '2 batteries'), h('option', { value:4 }, '4 batteries'));
    const bv = h('select', null, h('option', { value:12 }, '12 V'), h('option', { value:6 }, '6 V'));
    const bah = h('input', { type:'number', value:100, min:1 });
    const cfg = h('select'); const svg = h('svg', { viewBox:'0 0 600 250' }), out = h('div', { class:'out' }), note = h('div', { class:'panel' });
    function opts(){ const c = num(cnt.value, 2); const o = c === 2 ? [['series', 'Series'], ['parallel', 'Parallel']] : [['series', 'Series (4S)'], ['parallel', 'Parallel (4P)'], ['sp', 'Series-parallel (2S2P)']]; cfg.innerHTML = ''; o.forEach(([v, l]) => cfg.appendChild(h('option', { value:v }, l))); }
    function batt(x, y, i){ return h('g', null, h('rect', { x, y, width:100, height:60, rx:6, fill:'var(--card)', stroke:'var(--navy2)', 'stroke-width':2.5 }), h('text', { x:x + 50, y:y + 36, 'text-anchor':'middle', style:{ fontWeight:700, fontSize:'13px' } }, bv.value + 'V ' + bah.value + 'Ah'),
      h('text', { x:x + 10, y:y + 16, style:{ fill:'var(--dc)', fontWeight:800 } }, '+'), h('text', { x:x + 84, y:y + 16, style:{ fill:'var(--dcneg)', fontWeight:800 } }, '–')); }
    const w = (d, c) => h('path', { d, class:'lnk ' + c });
    function calc(){
      const c = num(cnt.value, 2), V = num(bv.value, 12), A = num(bah.value, 100), mode = cfg.value;
      let tv, ta, ns, np;
      if (mode === 'series'){ ns = c; np = 1; } else if (mode === 'parallel'){ ns = 1; np = c; } else { ns = 2; np = 2; }
      tv = V * ns; ta = A * np;
      svg.innerHTML = ''; const els = [];
      // batteries drawn in a row (x), terminals: + at left-top (x+15), - at right-top (x+85) y
      const xs = c === 2 ? [100, 400] : [30, 180, 330, 480], bw = c === 2 ? 100 : 100, y = 100;
      xs.forEach((x, i) => els.push(batt(x, y, i)));
      const P = i => [xs[i] + 15, y], N = i => [xs[i] + 85, y];
      const link = (a, b, cls, lift) => w(`M${a[0]} ${a[1]} V${a[1] - lift} H${b[0]} V${b[1]}`, cls);
      if (c === 2){
        if (mode === 'series'){ els.push(link(N(0), P(1), 'dc', 30)); }
        else { els.push(link(P(0), P(1), 'dc', 40)); els.push(link(N(0), N(1), 'neg', 40)); }
      } else if (mode === 'series'){ [0, 1, 2].forEach(i => els.push(link(N(i), P(i + 1), 'dc', 30))); }
      else if (mode === 'parallel'){ els.push(link(P(0), P(3), 'dc', 55)); els.push(link(N(0), N(3), 'neg', 55)); els.push(link(P(1), P(2), 'dc', 38)); els.push(link(N(1), N(2), 'neg', 38)); }
      else { els.push(link(N(0), P(1), 'dc', 30)); els.push(link(N(2), P(3), 'dc', 30)); els.push(link(P(0), P(2), 'dc', 55)); els.push(link(N(1), N(3), 'neg', 55)); }
      // output labels
      const outP = mode === 'series' ? P(0) : P(0), outN = mode === 'series' ? N(c - 1) : (mode === 'parallel' ? N(c - 1) : N(3));
      els.push(h('text', { x:outP[0] - 10, y:y + 90, style:{ fill:'var(--dc)', fontWeight:700, fontSize:'13px' } }, 'To loads +'));
      els.push(h('text', { x:outN[0] - 60, y:y + 90, style:{ fill:'var(--dcneg)', fontWeight:700, fontSize:'13px' } }, 'To loads –'));
      els.push(h('text', { x:300, y:215, 'text-anchor':'middle', style:{ fontWeight:800, fontSize:'20px' } }, `Bank = ${tv} V · ${ta} Ah · ${fmt(tv * ta / 1000, 2)} kWh`));
      svg.append(...els);
      out.innerHTML = ''; [['Bank voltage', tv + ' V'], ['Bank capacity', ta + ' Ah'], ['Energy', fmt(tv * ta / 1000, 2) + ' kWh'], ['Layout', ns + 'S' + np + 'P']].forEach(([l, v]) => out.appendChild(h('div', null, h('b', null, v), h('span', null, l))));
      note.innerHTML = mode === 'series' ? '<b>Series:</b> voltages add, capacity (Ah) stays the same. Used to make 24 V from two 12 V batteries. Every battery carries the full load current, so they must be identical and balanced – and 12 V loads must never be taken from only one battery of a series pair.'
        : mode === 'parallel' ? '<b>Parallel:</b> capacity adds, voltage stays the same. Connect the load/charge cables to <i>opposite ends</i> of the bank (positive on first battery, negative on the last) so currents share evenly. Use equal-length cables between batteries.'
        : '<b>Series-parallel:</b> two series strings (giving the voltage) wired in parallel (giving the capacity). Keep strings identical. Many installers prefer 24 V or 48 V banks of fewer, larger lithium batteries to reduce current and complexity.';
    }
    cnt.addEventListener('input', () => { opts(); calc(); }); [cfg, bv, bah].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Batteries', cnt), field('Each battery', bv), field('Capacity (Ah each)', bah), field('Wiring', cfg)), svg, out, note);
    opts(); calc();
  });

  /* ---------- 5. Animated power-flow system ---------- */
  reg('flow', 'Live System Flow: Shore, Alternator, Solar & Loads', body => {
    const st = { shore:true, engine:false, sun:false, dc:true, ac:false, inv:true }; let soc = 60;
    const nodes = [
      ['shore', 20, 40, 130, 64, 'Shore power', '240 V inlet · RCD'], ['panel', 200, 40, 130, 64, 'AC switchboard', 'ATS / breakers'],
      ['acl', 700, 40, 140, 64, 'AC loads', 'Air-con · galley'], ['inv', 390, 190, 170, 70, 'Inverter / Charger', 'MultiPlus · Combi · ePOWER'],
      ['sun', 20, 190, 130, 64, 'Solar array', 'PV panels'], ['mppt', 200, 190, 130, 64, 'MPPT', 'solar charger'],
      ['alt', 20, 360, 130, 64, 'Alternator', 'engine driven'], ['dcdc', 200, 360, 130, 64, 'DC-DC charger', 'isolating, current-limited'],
      ['bat', 390, 350, 170, 84, 'House battery', 'LiFePO4 / AGM + shunt'], ['dcl', 700, 360, 140, 64, 'DC loads', 'Fridge · nav · pumps']];
    const edges = [
      ['e1', 'M150 72 H200', 'ac', () => st.shore, 1], ['e2', 'M330 72 H475 V190', 'ac', () => st.shore, 1],
      ['e3', 'M560 225 H770 V104', 'ac', () => st.ac && (st.shore || st.inv), 1],
      ['e4', 'M475 260 V350', 'dc', () => st.shore, 1], ['e5', 'M475 260 V350', 'dc rev', () => !st.shore && st.inv && st.ac, 1],
      ['e6', 'M560 392 H700', 'dc', () => st.dc, 1], ['e7', 'M150 392 H200', 'dc', () => st.engine, 1], ['e8', 'M330 392 H390', 'dc', () => st.engine, 1],
      ['e9', 'M150 222 H200', 'sol', () => st.sun, 1], ['e10', 'M330 222 H365 V366 H390', 'sol', () => st.sun, 1]];
    const svg = h('svg', { viewBox:'0 0 880 470' });
    edges.forEach(e => svg.appendChild(h('path', { d:e[1].replace(' rev', ''), class:'wire-off' })));
    const eEls = edges.map(e => { const p = h('path', { d:e[1], class:'flow ' + e[2] + ' off' }); svg.appendChild(p); return p; });
    nodes.forEach(n => svg.appendChild(h('g', { class:'node', style:{ cursor:'default' } }, h('rect', { x:n[1], y:n[2], width:n[3], height:n[4], rx:10 }), h('text', { class:'nl', x:n[1] + n[3] / 2, y:n[2] + n[4] / 2 - 2, 'text-anchor':'middle' }, n[5]), h('text', { class:'ns', x:n[1] + n[3] / 2, y:n[2] + n[4] / 2 + 14, 'text-anchor':'middle' }, n[6]))));
    const socBar = h('rect', { x:398, y:420, width:0, height:8, rx:4, fill:'var(--teal)' }); svg.append(h('rect', { x:398, y:420, width:154, height:8, rx:4, fill:'var(--line)' }), socBar);
    const socTxt = h('text', { x:475, y:416, 'text-anchor':'middle', style:{ fontSize:'11px', fontWeight:700 } }); svg.appendChild(socTxt);
    const status = h('div', { class:'panel' });
    const tg = (k, label) => { const b = h('button', { class:'toggle' + (st[k] ? ' on' : ''), onclick(){ st[k] = !st[k]; b.classList.toggle('on', st[k]); update(); } }, label); return b; };
    let net = 0;
    function update(){
      edges.forEach((e, i) => eEls[i].classList.toggle('off', !e[3]()));
      const shoreChg = st.shore ? 55 : 0, alt = st.engine ? 35 : 0, sol = st.sun ? 18 : 0, dcl = st.dc ? 28 : 0;
      const invDraw = (!st.shore && st.inv && st.ac) ? 1500 / 0.9 / 12.8 : 0;
      net = shoreChg + alt + sol - dcl - invDraw;
      const acText = st.ac ? (st.shore ? 'AC loads run straight from shore power (pass-through).' : st.inv ? 'AC loads run from the battery via the inverter (~' + fmt(invDraw, 0) + ' A at 12 V).' : 'AC loads have <b>no supply</b>: shore is off and the inverter is off.') : 'AC loads are switched off.';
      status.innerHTML = `<b>Battery current:</b> ${net >= 0 ? '🔋 charging +' + fmt(net, 0) + ' A' : '⚠ discharging ' + fmt(net, 0) + ' A'} · state of charge ≈ ${fmt(soc, 0)}%<br>${acText}<br><span class="hint">Sources: shore charger ${shoreChg} A, DC-DC ${alt} A, solar ${sol} A. Loads: DC ${dcl} A, inverter ${fmt(invDraw, 0)} A. (Illustrative figures for a 12 V system.) Note how current direction on the inverter/charger link reverses when shore power is removed.</span>`;
    }
    const timer = setInterval(() => { if (!alive(svg)) return clearInterval(timer); soc = Math.max(0, Math.min(100, soc + net * 0.5 * 300 / 3600 / 400 * 100)); socBar.setAttribute('width', 154 * soc / 100); socTxt.textContent = 'SoC ' + fmt(soc, 0) + '%'; socBar.setAttribute('fill', soc < 25 ? 'var(--red)' : 'var(--teal)'); update(); }, 500);
    body.append(h('div', { class:'sw-wrap' }, tg('shore', '🔌 Shore power'), tg('engine', '⚙ Engine running'), tg('sun', '☀ Sunshine'), tg('dc', '💡 DC loads'), tg('ac', '❄ AC loads'), tg('inv', '〰 Inverter enabled')), svg,
      h('div', { class:'legend' }, h('span', null, h('i', { style:{ background:'var(--ac)' } }), 'AC 240 V'), h('span', null, h('i', { style:{ background:'var(--dc)' } }), 'DC'), h('span', null, h('i', { style:{ background:'#eab308' } }), 'Solar DC')), status);
    update();
  });

  /* ---------- 6. Galvanic corrosion lab ---------- */
  reg('galv', 'Galvanic Corrosion Lab', body => {
    const M = [['Magnesium anode', -1.60], ['Zinc anode', -1.03], ['Aluminium alloy (hull / leg)', -0.87], ['Mild steel', -0.65], ['Stainless 316 (active, low-oxygen)', -0.45], ['Copper', -0.33], ['Brass', -0.30], ['Bronze (prop / skin fitting)', -0.28], ['Stainless 316 (passive)', -0.08], ['Titanium', -0.05], ['Graphite', 0.25]];
    const mk = (d) => h('select', null, M.map((m, i) => h('option', { value:i, selected:i === d }, m[0] + '  (' + m[1] + ' V)')));
    const a = mk(2), b = mk(7), water = h('select', null, h('option', { value:1 }, 'Seawater (good electrolyte)'), h('option', { value:0.15 }, 'Fresh water (poor electrolyte)')), ratio = h('input', { type:'range', min:1, max:20, value:5 }), ratioL = h('span', { class:'hint' });
    let zinc = false; const zb = h('button', { class:'toggle', onclick(){ zinc = !zinc; zb.classList.toggle('on', zinc); calc(); } }, 'Fit zinc anode');
    const svg = h('svg', { viewBox:'0 0 600 230' }), out = h('div', { class:'out' }), note = h('div', { class:'panel' });
    function calc(){
      let ia = num(a.value, 0), ib = num(b.value, 0), A = M[ia], B = M[ib];
      const w = num(water.value, 1), r = num(ratio.value, 5); ratioL.textContent = `Cathode area ≈ ${r}× anode area`;
      let an = A[1] <= B[1] ? A : B, ca = an === A ? B : A, dv = Math.abs(A[1] - B[1]);
      const same = ia === ib;
      let rate = same ? 0 : dv * Math.pow(r, 0.6) * w * 10;
      let prot = false; if (zinc && !same && an[1] > -1.03){ prot = true; }
      const sev = same ? 'None' : (prot ? 'Zinc protecting' : rate < 3 ? 'Mild' : rate < 12 ? 'Moderate' : 'Severe');
      out.innerHTML = '';
      [['Corroding (anode)', prot ? 'Zinc anode (sacrificial)' : same ? '—' : an[0]], ['Protected (cathode)', same ? '—' : ca[0]], ['Potential difference', fmt(dv, 2) + ' V'], ['Corrosion severity', sev, !prot && sev === 'Severe' ? 'bad' : (!prot && sev === 'Moderate' ? 'warn' : '')]].forEach(([l, v, c]) => out.appendChild(h('div', { class:c || '' }, h('b', { style:{ fontSize:'16px' } }, v), h('span', null, l))));
      svg.innerHTML = '';
      svg.append(h('rect', { x:20, y:60, width:560, height:150, rx:12, fill:'#0e7490', opacity:w === 1 ? .35 : .15 }), h('text', { x:30, y:82, style:{ fontSize:'12px', fontWeight:700 } }, w === 1 ? 'Seawater electrolyte' : 'Fresh water'));
      const ax = 130, bx = 400, aw = 90, bw = Math.min(150, 40 + r * 6), top = 30;
      const cur = prot ? 'Zinc' : an[0].split(' (')[0];
      svg.append(h('rect', { x:ax, y:top, width:aw, height:150, fill:'#94a3b8', stroke:'var(--navy2)', 'stroke-width':2 }), h('text', { x:ax + aw / 2, y:120, 'text-anchor':'middle', style:{ fontSize:'11px', fontWeight:700 } }, cur), h('text', { x:ax + aw / 2, y:136, 'text-anchor':'middle', style:{ fontSize:'10px' } }, '(anode  –)'),
        h('rect', { x:bx, y:top, width:bw, height:150, fill:'#d4a373', stroke:'var(--navy2)', 'stroke-width':2 }), h('text', { x:bx + bw / 2, y:120, 'text-anchor':'middle', style:{ fontSize:'11px', fontWeight:700 } }, ca[0].split(' (')[0]), h('text', { x:bx + bw / 2, y:136, 'text-anchor':'middle', style:{ fontSize:'10px' } }, '(cathode +)'),
        h('path', { d:`M${ax + aw / 2} ${top} V12 H${bx + bw / 2} V${top}`, class:'lnk dc' }), h('text', { x:300, y:8, 'text-anchor':'middle', style:{ fontSize:'11px' } }, 'electrons flow through the bond / hull wiring →'));
      const n = same ? 0 : Math.min(14, 2 + Math.round(rate / 2.5)), dur = Math.max(1.1, 4 - rate / 6);
      for (let i = 0; i < n; i++){ const y = 105 + (i % 5) * 18, dl = -(i / n) * dur; svg.appendChild(h('circle', { cx:ax + aw + 4, cy:y, r:4.5, fill:'var(--amber)', class:'ion', style:{ '--dx':(bx - ax - aw - 12) + 'px', animationDuration:dur + 's', animationDelay:dl + 's' } })); }
      svg.appendChild(h('text', { x:300, y:200, 'text-anchor':'middle', style:{ fontSize:'12px' } }, same ? 'Same metal – no driving voltage' : 'Metal ions leave the anode (it dissolves); the cathode is protected'));
      note.innerHTML = same ? 'Pick two <b>different</b> metals.' : prot ? '<b>Sacrificial anode working:</b> zinc is more active than everything else here, so it dissolves first and the metals it is bonded to are protected. Anodes must be electrically bonded, correctly sized, and replaced at ~50% wastage.' : `<b>${an[0]}</b> is the more active (more negative) metal and will be consumed when bonded to <b>${ca[0]}</b> in an electrolyte. A large cathode with a small anode (high area ratio) concentrates the attack. Try fitting a zinc anode, switching to fresh water, or pairing similar metals. <span class="hint">Values are approximate seawater potentials vs Ag/AgCl; real results vary with alloy, oxygen and temperature.</span>`;
    }
    [a, b, water, ratio].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Metal A', a), field('Metal B', b)), h('div', { class:'row' }, field('Electrolyte', water), field('Area ratio', ratio), ratioL, zb), svg, out, note);
    calc();
  });
})();
