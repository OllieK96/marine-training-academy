/* Interactives part 4: Victron calculators and simulators (rating/derating, cable drop, DIP switches, VE.Bus builder, DVCC, shunt wiring, lithium bank, PV string, Orion XS) */
(function(){
  const T = TRAINING, { h, fmt } = UI;
  const reg = (id, title, build) => { T.interactives[id] = { title: typeof title === 'function' ? title : () => title, build }; };
  const num = (v, d) => { const n = parseFloat(v); return isNaN(n) ? d : n; };
  const field = (label, input) => h('label', { class:'fld' }, label, input);
  const sel = (opts, val) => { const s = h('select', null, opts.map(o => h('option', { value:o[0] }, o[1]))); if (val != null) s.value = val; return s; };
  const rng = (min, max, val, step) => h('input', { type:'range', min, max, value:val, step:step || 1 });
  const stat = (l, v, cls) => h('div', { class:cls || '' }, h('b', null, v), h('span', null, l));
  const note = () => h('div', { class:'panel' });

  /* ---------- rates: MultiPlus-II 3 kVA derating, DC current, cable ---------- */
  reg('rates', 'MultiPlus-II Rating, Derating & DC-Side Sizing', body => {
    const M = { '12': { v:12, eff:.93, fuse:400, cab:['2 x 50 mm²', '2 x 70 mm²'], ch:120, lo:9.5, name:'12/3000/120-32' }, '24': { v:24, eff:.94, fuse:300, cab:['50 mm²', '95 mm²'], ch:70, lo:19, name:'24/3000/70-32' }, '48': { v:48, eff:.95, fuse:125, cab:['35 mm²', '70 mm²'], ch:35, lo:38, name:'48/3000/35-32' } };
    const P = [[25, 2400], [40, 2200], [65, 1700]];
    const m = sel([['12', '12/3000/120-32'], ['24', '24/3000/70-32'], ['48', '48/3000/35-32']], '24');
    const tp = sel([['0', '25 °C (open, cool)'], ['1', '40 °C (engine space)'], ['2', '65 °C (very hot)']], '1');
    const load = h('input', { type:'number', value:2000, min:0, step:100 }), batt = h('input', { type:'number', value:25.2, step:.1 });
    const out = h('div', { class:'out' }), pn = note();
    function calc(){
      const c = M[m.value], cont = P[+tp.value][1], L = num(load.value, 0), V = num(batt.value, c.v), I = L / (c.eff * V);
      out.innerHTML = '';
      out.append(stat('Continuous limit (this temp)', cont + ' W'), stat('Peak (short)', '5500 W'), stat('Load vs limit', Math.round(L / cont * 100) + ' %', L > cont ? 'bad' : L > cont * .85 ? 'warn' : ''), stat('Best-case DC current', fmt(I, 0) + ' A', I > c.fuse * .8 ? 'warn' : ''), stat('DC fuse (manual)', c.fuse + ' A'), stat('Cable 0-5 m / 5-10 m', c.cab[0] + ' / ' + c.cab[1]));
      pn.innerHTML = (L > cont ? '<b>Overload.</b> The load exceeds the continuous rating at this temperature: expect an Overload LED / shutdown unless it is a short peak (up to 5500 W). Cool the unit or shed load. ' : '<b>Within rating.</b> ') + 'DC current uses the model\'s <i>maximum</i> efficiency (' + Math.round(c.eff * 100) + ' %) at the battery voltage you entered, so real current is a little higher. Charger rating on this model: ' + c.ch + ' A. Cable sizes are from the manual\'s per-pole table for 0-5 m and 5-10 m (90 °C copper).' + (V < c.lo ? ' <b>Battery voltage is below the model\'s DC input range (' + c.lo + ' V).</b>' : '');
    }
    [m, tp, load, batt].forEach(e => e.addEventListener('input', calc));
    m.addEventListener('input', () => { batt.value = M[m.value].v * 1.05; calc(); });
    body.append(h('div', { class:'row' }, field('Model', m), field('Ambient', tp), field('AC load (W)', load), field('Battery volts', batt)), out, pn); calc();
  });

  /* ---------- cable: voltage-drop calculator ---------- */
  reg('cable', 'DC Cable Voltage-Drop & Chart Checker', body => {
    const S = [10, 16, 25, 35, 50, 70, 95, 120], CH = { 10:[30, 15, 10, 8], 16:[48, 24, 16, 12], 25:[75, 38, 25, 19], 35:[105, 53, 35, 26], 50:[150, 75, 50, 38], 70:[210, 105, 70, 53], 95:[285, 143, 95, 71], 120:[360, 180, 120, 90] };
    const v = sel([['12', '12 V'], ['24', '24 V'], ['48', '48 V']], '24'), cur = h('input', { type:'number', value:100, min:1 }), len = h('input', { type:'number', value:3, min:.5, step:.5 }), sz = sel(S.map(s => [s, s + ' mm²']), 50);
    const out = h('div', { class:'out' }), pn = note();
    function calc(){
      const V = +v.value, I = num(cur.value, 1), L = num(len.value, 1), s = +sz.value, R = 0.0172 * L / s, drop = 2 * I * R, pct = drop / V * 100, tot = 2 * L;
      const band = tot <= 5 ? 0 : tot <= 10 ? 1 : tot <= 15 ? 2 : tot <= 20 ? 3 : -1, chartA = band >= 0 ? CH[s][band] : null;
      out.innerHTML = '';
      out.append(stat('Voltage drop (+ and −)', fmt(drop, 2) + ' V'), stat('% of ' + V + ' V', fmt(pct, 2) + ' %', pct > 2.5 ? 'bad' : pct > 1.8 ? 'warn' : ''), stat('Target max (2.5 %)', fmt(V * .025, 2) + ' V'), stat('Total length', tot + ' m (+ and −)'), stat('Chart max at this length', chartA == null ? 'over 20 m' : chartA + ' A', chartA != null && I > chartA ? 'bad' : ''), stat('Heat in cable', fmt(I * drop, 0) + ' W'));
      pn.innerHTML = (pct > 2.5 ? '<b>Too much drop.</b> Use thicker cable, a shorter run or a higher system voltage. ' : '<b>Within the 2.5 % guide.</b> ') + 'Calculated from copper resistivity ≈ 0.0172 Ω·mm²/m (20 °C), so it is an estimate: Wiring Unlimited\'s own example is 200 A × 0.0016 Ω = 0.32 V per cable. The chart column uses the Victron cable chart (0.259 V loss, joints not included). Fuse to protect the <i>cable</i>, and check each joint under load.' + (chartA != null && I > chartA ? ' <b>Current exceeds the chart value for this section and length.</b>' : '');
    }
    [v, cur, len, sz].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('System', v), field('Current (A)', cur), field('One-way length (m)', len), field('Cable section', sz)), out, pn); calc();
  });

  /* ---------- dip: DIP-switch simulators (dip:quattro) ---------- */
  const DIP = {
    quattro: { title:'Quattro 3 kVA DIP-Switch Simulator (Step 1)', n:8, note:'Step 1 settings from the Quattro manual. Switch order below is ds8 … ds1 (left to right).',
      decode(on){
        const g = [6, 10, 12, 16, 20, 25, 30, 50][(on[8] ? 4 : 0) + (on[7] ? 2 : 0) + (on[6] ? 1 : 0)], cc = [25, 50, 75, 100][(on[4] ? 2 : 0) + (on[3] ? 1 : 0)];
        return [['AC-in-1 (generator) limit', g + ' A (' + fmt(g * .23, 1) + ' kVA at 230 V)'], ['AC-in-2 (shore) limit', on[5] ? '30 A' : '16 A (default)'], ['Charge current', cc + ' % of maximum'], ['ds2/ds1', 'Not used in step 1 on this firmware family']];
      }, goals:[['Generator 12 A, shore 16 A, 50 % charge', { 8:0, 7:1, 6:0, 5:0, 4:0, 3:1 }], ['Generator 30 A, shore 30 A, 75 % charge', { 8:1, 7:1, 6:0, 5:1, 4:1, 3:0 }], ['Generator 16 A, shore 16 A, 100 % charge', { 8:0, 7:1, 6:1, 5:0, 4:1, 3:1 }], ['Generator 25 A, shore 30 A, 25 % charge', { 8:1, 7:0, 6:1, 5:1, 4:0, 3:0 }]] }
  };

  const bits = (on, a, b) => (on[a] ? 1 : 0) + '' + (on[b] ? 1 : 0);
  DIP.epc = { title:'Enerdrive ePRO Combi DIP-Switch Simulator', n:7, asc:true, note:'DIP 1-7 as listed in the ePRO Combi manual (EPC 1600-3500). Switches 8 and 9 (ground switch / remote-switch bypass, model dependent) are not modelled. On 24 V models all voltages double.',
    decode(on){
      if (on[1]) return [['Programming source', 'EXTERNAL: DIP 2-7 are ignored and the unit loads whatever was saved with ePRO Dashboard']];
      const prog = { '00':'Flooded: absorb 14.4 V, float 13.5 V', '10':'GEL: absorb 14.2 V, float 13.5 V', '01':'AGM: absorb 14.3 V, float 13.3 V (factory)', '11':'Custom program from Dashboard' }[bits(on, 5, 6)];
      return [['Programming source', 'LOCAL: DIP 2-7 used, all other parameters return to factory defaults'], ['Inverter frequency', on[2] ? '60 Hz' : '50 Hz (factory)'], ['Low battery protect', on[3] ? 'ON (shutdown/restart/delay 10 V / 12 V / 5 s by default)' : 'OFF: immediate shutdown below 8.0 V'], ['Automatic Stand By (ASB)', on[4] ? 'ON (pulses the output to detect loads)' : 'OFF (continuous, better for computers, clocks, AV)'], ['Charge program (DIP 5 and 6)', prog], ['AC Input Power Boost', on[7] ? 'ON: inverter helps a weak AC source' : 'OFF (factory)']];
    }, goals:[['60 Hz output, GEL charge program, low battery protect on', { 1:0, 2:1, 3:1, 5:1, 6:0 }], ['Flooded batteries, ASB on, Power Boost on', { 1:0, 4:1, 5:0, 6:0, 7:1 }], ['Hand control to Dashboard', { 1:1 }], ['Factory defaults (50 Hz, LBP on, ASB off, AGM, boost off)', { 1:0, 2:0, 3:1, 4:0, 5:0, 6:1, 7:0 }]] };
  DIP.mcu = { title:'Mastervolt Mass Combi Ultra DIP-Switch Simulator (A1-A8, B1-B8)', n:16, asc:true, lab: i => (i <= 8 ? 'A' + i : 'B' + (i - 8)),
    note:'Groups A and B from the Mass Combi Ultra manual (chapter 6). Digit pairs in the manual are read here as first switch, second switch. All switches at 0 = default (and MasterBus values are then default too). Secondary charger table shown for 24/3500.',
    decode(on){
      const A = i => on[i], B = i => on[8 + i];
      const par = { '00':'Stand alone', '10':'Master', '01':'Slave', '11':'Not applicable' }[bits(on, 1, 2)];
      const sec = { '00':'Follow main battery (24 V 3-step+)', '10':'24 V constant voltage', '01':'12 V 3-step+', '11':'12 V constant voltage' }[bits(on, 5, 6)];
      const typ = { '00':'Flooded', '10':'Gel', '01':'AGM', '11':'Flooded traction' }[bits(on, 7, 8)];
      const mains = { '00':'30 A', '10':'16 A', '01':'10 A', '11':'6 A' }[bits(on, 9, 10)];
      return [['Parallel mode (A1-A2)', par], ['Inverter frequency (A3)', A(3) ? '60 Hz' : '50 Hz'], ['Energy saving / scan mode (A4)', A(4) ? 'On' : 'Off'], ['Secondary charger (A5-A6)', sec], ['Main battery type (A7-A8)', typ], ['Mains input fuse setting (B1-B2)', mains], ['Generator input fuse setting (B3)', B(3) ? '50 A' : '25 A'], ['Power sharing (B4)', B(4) ? 'Disabled' : 'Enabled'], ['Generator / mains support (B5)', B(5) ? 'Enabled (check local rules first)' : 'Disabled'], ['AC voltage input window (B6)', B(6) ? 'Narrow (+/-23 V)' : 'Wide (+/-40 V)'], ['Generator frequency window (B7)', B(7) ? 'Narrow (+/-5 Hz)' : 'Wide (+8/-10 Hz)'], ['Ground relay (B8)', B(8) ? 'Enabled' : 'Disabled']];
    }, goals:[['AGM main battery, 16 A shore limit, 60 Hz', { 7:0, 8:1, 9:1, 10:0, 3:1 }], ['Gel batteries, 10 A mains, generator 50 A, narrow voltage window', { 7:1, 8:0, 9:0, 10:1, 11:1, 14:1 }], ['Enable ground relay and generator/mains support, 6 A mains', { 9:1, 10:1, 13:1, 16:1 }], ['Energy saving on, power sharing disabled', { 4:1, 12:1 }]] };
  DIP.cmp = { title:'Mastervolt ChargeMaster Plus DIP-Switch Simulator', n:10, asc:true, note:'DIP 1-10 as described in the ChargeMaster Plus manual. In MasterBus mode, switch 1 is ON; switches 6-10 are not used. In CZone mode, switches 1-2 are OFF and 3-10 hold the CZone address.',
    decode(on){
      if (on[1]){
        const code = '' + (on[3] ? 1 : 0) + (on[4] ? 1 : 0) + (on[5] ? 1 : 0);
        const typ = { '000':'MasterBus settings (Flooded unless changed in MasterAdjust)', '001':'Flooded (fixed)', '010':'AGM (fixed)', '011':'Gel (fixed)', '100':'Lithium-ion (fixed, fits Mastervolt MLI)', '111':'Constant voltage 13.25 / 26.50 V (no temperature compensation)' }[code] || 'Combination not listed in the manual';
        return [['Network mode', 'MasterBus (DIP 1 ON)'], ['MasterBus powering (DIP 2)', on[2] ? 'ON' : 'OFF'], ['Battery type (DIP 3-4-5 = ' + code + ')', typ], ['DIP 6-10', 'Not used in MasterBus']];
      }
      if (!on[2]){
        const any = [3, 4, 5, 6, 7, 8, 9, 10].some(i => on[i]);
        return [['Network mode', 'CZone (DIP 1 and 2 OFF)'], ['CZone address (DIP 3-10)', any ? 'Set: must match the address assigned in the CZone Configuration Tool' : 'INVALID: at least one of DIP 3-10 must be ON']];
      }
      return [['Combination', 'DIP 2 ON with DIP 1 OFF is not a documented combination']];
    }, goals:[['MasterBus, AGM fixed settings', { 1:1, 3:0, 4:1, 5:0 }], ['MasterBus, lithium-ion (MLI) charging', { 1:1, 3:1, 4:0, 5:0 }], ['MasterBus, Gel fixed with MasterBus powering on', { 1:1, 2:1, 3:0, 4:1, 5:1 }], ['CZone network with a valid address (any of 3-10 on)', { 1:0, 2:0, 4:1 }]] };
  reg('dip', arg => (DIP[arg] || {}).title || 'DIP-Switch Simulator', (body, arg) => {
    const D = DIP[arg]; if (!D) { body.textContent = 'Unknown DIP set'; return; }
    const on = {}; for (let i = 1; i <= D.n; i++) on[i] = 0;
    const sw = h('div', { class:'row', style:{ gap:'8px' } }), out = h('div', { class:'out' }), goal = note();
    const els = {};
    for (let ii = 1; ii <= D.n; ii++){
      const i = D.asc ? ii : D.n + 1 - ii;
      const knob = h('div', { style:{ width:'20px', height:'22px', background:'#e5e7eb', borderRadius:'3px', position:'absolute', left:'2px', top:'30px', transition:'top .15s' } });
      const box = h('div', { style:{ position:'relative', width:'24px', height:'56px', background:'#1f2937', borderRadius:'4px', cursor:'pointer' }, onclick(){ on[i] ^= 1; draw(); } }, knob);
      els[i] = knob; sw.appendChild(h('div', { style:{ textAlign:'center', fontSize:'11px' } }, box, (D.lab ? D.lab(i) : 'ds' + i), h('div', null, h('b', { id:'s' + i }, ''))));
    }
    let cur = null;
    function draw(){
      for (let i = 1; i <= D.n; i++) els[i].style.top = on[i] ? '2px' : '30px';
      out.innerHTML = ''; D.decode(on).forEach(r => out.appendChild(stat(r[0], r[1])));
      if (cur){ const ok = Object.keys(cur[1]).every(k => on[k] === cur[1][k]); goal.innerHTML = '<b>Challenge:</b> ' + cur[0] + (ok ? ' &nbsp;✅ <b>Done.</b>' : ' <span class="hint">(switch up = on)</span>'); }
    }
    body.append(h('p', { class:'hint' }, D.note + ' Click a switch to move it (up = on).'), sw, out, goal, h('button', { class:'btn sm', onclick(){ cur = D.goals[Math.floor(Math.random() * D.goals.length)]; draw(); } }, '🎯 Give me a challenge'));
    draw();
  });
  /* ChargeMaster / charger-style DIP sets can be added to DIP; Quattro is the Victron one used here */

  /* ---------- vebus: parallel / three-phase builder ---------- */
  reg('vebus', 'VE.Bus System Builder: Parallel & Three-Phase', body => {
    const mod = sel([['3', 'MultiPlus-II 24/3000/70 (3 kVA)'], ['5', 'MultiPlus-II 24/5000/120 (5 kVA)']], '3');
    const per = sel([1, 2, 3, 4, 5, 6].map(n => [n, n + ' per phase']), 2), ph = sel([['1', 'Single phase'], ['3', 'Three-phase (wye)']], '1');
    const cfg = h('input', { type:'number', min:1, max:18, value:2 });
    const svg = h('svg', { viewBox:'0 0 640 170' }), out = h('div', { class:'out' }), pn = note();
    function calc(){
      const n = +per.value, p = +ph.value, tot = n * p, kva = (mod.value === '3' ? 3 : 5) * tot, ch = (mod.value === '3' ? 70 : 120) * tot, found = tot, set = num(cfg.value, tot);
      svg.innerHTML = '';
      const w = Math.min(90, 600 / tot - 8);
      for (let i = 0; i < tot; i++){
        const x = 20 + i * (w + 8);
        svg.append(h('rect', { x, y:50, width:w, height:56, rx:8, fill:'var(--soft)', stroke:'var(--teal)', 'stroke-width':2 }), h('text', { x:x + w / 2, y:82, 'text-anchor':'middle', style:{ fontSize:'11px', fontWeight:700 } }, 'Multi ' + (i + 1)));
        if (p === 3) svg.append(h('text', { x:x + w / 2, y:126, 'text-anchor':'middle', style:{ fontSize:'10px' } }, 'L' + (Math.floor(i / n) + 1)));
        if (i) svg.append(h('line', { x1:x - 8, x2:x, y1:78, y2:78, stroke:'#2563eb', 'stroke-width':3 }));
        svg.append(h('line', { x1:x + w / 2, x2:x + w / 2, y1:106, y2:140, stroke:'var(--dc)', 'stroke-width':3 }));
      }
      svg.append(h('line', { x1:20, x2:20 + tot * (w + 8) - 8, y1:140, y2:140, stroke:'var(--dc)', 'stroke-width':5 }), h('text', { x:20, y:160, style:{ fontSize:'11px', fill:'var(--dc)', fontWeight:700 } }, 'common battery (equal-length DC cables)'), h('text', { x:20, y:32, style:{ fontSize:'11px', fill:'#2563eb', fontWeight:700 } }, 'RJ45 UTP unit-to-unit (blue)'));
      out.innerHTML = '';
      out.append(stat('Units', tot), stat('System rating', kva + ' kVA'), stat('Charger total', ch + ' A'), stat('VE.Bus device count', set === found ? 'OK' : 'Mismatch', set === found ? '' : 'bad'));
      const msgs = [];
      if (n > 6) msgs.push('max six identical units in parallel');
      if (set !== found) msgs.push('configured for ' + set + ' units but ' + found + ' found: VE.Bus <b>code 3</b> (expected device count mismatch) - check cables and configuration');
      pn.innerHTML = (msgs.length ? '<b>Check:</b> ' + msgs.join('; ') + '. ' : '<b>Looks consistent.</b> ') + 'Rules from the manual: identical units, same battery, equal DC cable length and section, unit-to-unit UTP with no splitters, negatives first, only one remote control, three-phase is wye only, ≥ 10 cm clearance. Configure with VictronConnect, VE.Bus Quick Configure (max three units) or the VE.Bus System Configurator.';
    }
    [mod, per, ph, cfg].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Model', mod), field('Units', per), field('Phases', ph), field('Configured unit count', cfg)), svg, out, pn); calc();
  });

  /* ---------- dvcc ---------- */
  reg('dvcc', 'DVCC Charge-Limit Explorer', body => {
    const on = sel([['1', 'DVCC on'], ['0', 'DVCC off']], 1), lim = h('input', { type:'number', value:60, min:0 }), sol = h('input', { type:'number', value:40, min:0 }), ori = h('input', { type:'number', value:30, min:0 }), mul = h('input', { type:'number', value:70, min:0 });
    const bms = h('input', { type:'number', value:0, min:0, title:'0 = no CAN-bus BMS' }), load = h('input', { type:'number', value:15, min:0 }), meter = sel([['1', 'Yes - shunt set as DC system'], ['0', 'No']], 0);
    const out = h('div', { class:'out' }), pn = note();
    function calc(){
      const enabled = on.value === '1', L = num(lim.value, 0), B = num(bms.value, 0), dc = num(load.value, 0), comp = meter.value === '1' ? dc : 0;
      let eff = L + comp; if (B > 0) eff = Math.min(eff, B);
      const want = [['Solar (MPPT)', num(sol.value, 0)], ['Orion XS', num(ori.value, 0)], ['Inverter/charger', num(mul.value, 0)]];
      let left = eff, res = [];
      want.forEach(([n, a]) => { const g = enabled ? Math.min(a, Math.max(left, 0)) : a; left -= g; res.push([n, g, a]); });
      out.innerHTML = ''; out.append(stat('Effective system limit', enabled ? fmt(eff, 0) + ' A' : 'none (DVCC off)', ''));
      res.forEach(r => out.append(stat(r[0] + ' allowed', fmt(r[1], 0) + ' A of ' + r[2], r[1] < r[2] ? 'warn' : '')));
      out.append(stat('Total to battery', fmt(res.reduce((s, r) => s + r[1], 0), 0) + ' A'));
      pn.innerHTML = enabled ? 'Priority per the Cerbo manual: <b>1) MPPT, 2) Orion XS, 3) inverter/charger</b>. The system limit is not enforced for chargers that DVCC does not control (e.g. Skylla-i or a plain alternator). DC loads only raise the allowance if a SmartShunt/BMV is configured as a DC meter; if a CAN-bus BMS asks for a different limit, the <b>lower</b> value wins.' : 'With DVCC off the GX device is only monitoring: every charger runs its own algorithm and nothing limits the combined current.';
    }
    [on, lim, sol, ori, mul, bms, load, meter].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('DVCC', on), field('System charge limit (A)', lim), field('BMS CCL (A, 0 = none)', bms), field('DC load (A)', load), field('DC meter?', meter)), h('div', { class:'row' }, field('Solar available (A)', sol), field('Orion XS wants (A)', ori), field('Inverter/charger wants (A)', mul)), out, pn); calc();
  });

  /* ---------- shunt: negative wiring vs SoC ---------- */
  reg('shunt', 'SmartShunt Wiring & SoC Drift Simulator', body => {
    const cap = 200, items = [{ n:'Fridge', a:-6, by:false }, { n:'Inverter loads', a:-18, by:false }, { n:'Solar charger', a:12, by:false }, { n:'Alternator DC-DC', a:8, by:false }];
    const hrs = rng(0, 24, 8), svg = h('svg', { viewBox:'0 0 640 190' }), out = h('div', { class:'out' }), pn = note(), tg = h('div', { class:'row' });
    items.forEach(it => tg.appendChild(h('label', { style:{ fontSize:'13px', marginRight:'10px' } }, h('input', { type:'checkbox', onchange(e){ it.by = e.target.checked; calc(); } }), ' ' + it.n + ' (' + (it.a > 0 ? '+' : '') + it.a + ' A) negative direct to battery (bypasses shunt)')));
    function calc(){
      const t = +hrs.value, real = items.reduce((s, i) => s + i.a, 0), seen = items.reduce((s, i) => s + (i.by ? 0 : i.a), 0), soc0 = 90;
      const tr = Math.max(0, Math.min(100, soc0 + real * t / cap * 100)), sh = Math.max(0, Math.min(100, soc0 + seen * t / cap * 100));
      svg.innerHTML = '';
      svg.append(h('rect', { x:20, y:60, width:90, height:70, rx:8, fill:'var(--soft)', stroke:'var(--teal)', 'stroke-width':2 }), h('text', { x:65, y:100, 'text-anchor':'middle', style:{ fontWeight:700 } }, 'Battery'),
        h('rect', { x:180, y:80, width:70, height:30, rx:5, fill:'#fde68a', stroke:'#92400e' }), h('text', { x:215, y:100, 'text-anchor':'middle', style:{ fontSize:'12px', fontWeight:700 } }, 'Shunt'),
        h('line', { x1:110, x2:180, y1:95, y2:95, stroke:'var(--dc)', 'stroke-width':4 }), h('line', { x1:250, x2:300, y1:95, y2:95, stroke:'var(--dc)', 'stroke-width':4 }), h('text', { x:310, y:45, style:{ fontSize:'12px' } }, 'system minus bus →'));
      items.forEach((it, i) => { const y = 25 + i * 38; svg.append(h('rect', { x:430, y, width:170, height:28, rx:6, fill:'var(--card)', stroke:it.by ? 'var(--red)' : 'var(--teal)', 'stroke-width':2 }), h('text', { x:515, y:y + 19, 'text-anchor':'middle', style:{ fontSize:'12px' } }, it.n), h('path', { d:it.by ? `M430 ${y + 14} H120 V120` : `M430 ${y + 14} H300 V95`, fill:'none', stroke:it.by ? 'var(--red)' : 'var(--dc)', 'stroke-width':2.5, 'stroke-dasharray':it.by ? '6 4' : '' })); });
      out.innerHTML = ''; out.append(stat('True net current', fmt(real, 0) + ' A'), stat('Shunt sees', fmt(seen, 0) + ' A', real !== seen ? 'warn' : ''), stat('True SoC', fmt(tr, 0) + ' %'), stat('Displayed SoC', fmt(sh, 0) + ' %', Math.abs(sh - tr) > 3 ? 'bad' : ''));
      pn.innerHTML = real === seen ? '<b>Correct wiring.</b> Every load and charger negative goes to the system side of the shunt, so the monitor sees everything.' : '<b>Drift.</b> Current that bypasses the shunt is not counted: ' + (sh > tr ? 'SoC reads <b>higher</b> than reality (discharge missed).' : 'SoC reads lower than reality (charge missed).') + ' Fix the wiring, then fully charge to re-synchronise.';
    }
    hrs.addEventListener('input', calc);
    body.append(h('p', { class:'hint' }, 'Start from 90 % of a 200 Ah bank. Tick a circuit to wire its negative straight to the battery and watch the state of charge drift. Hours elapsed:'), hrs, tg, svg, out, pn); calc();
  });

  /* ---------- bank: Lithium Smart battery bank designer ---------- */
  reg('bank', 'Lithium Smart Bank Designer', body => {
    const B = { '12.8-100':{ v:12.8, wh:1280, cont:100, max:200 }, '12.8-200':{ v:12.8, wh:2560, cont:200, max:400 }, '12.8-330':{ v:12.8, wh:4220, cont:300, max:400 }, '25.6-100':{ v:25.6, wh:2560, cont:100, max:200 }, '25.6-200':{ v:25.6, wh:5210, cont:200, max:400 } };
    const m = sel(Object.keys(B).map(k => [k, k.replace('-', 'V / ') + ' Ah']), '12.8-200'), sv = sel([['12', '12 V system'], ['24', '24 V system'], ['48', '48 V system']], 24), s = sel([1, 2, 3, 4].map(n => [n, n + ' in series']), 2), p = sel(Array.from({ length:20 }, (_, i) => [i + 1, (i + 1) + ' in parallel']), 1);
    const out = h('div', { class:'out' }), pn = note();
    function calc(){
      const b = B[m.value], S = +s.value, P = +p.value, n = S * P, V = b.v * S, sysV = +sv.value, ah = b.wh / b.v * P;
      const okV = Math.abs(V / (sysV * 1.067) - 1) < .08;
      out.innerHTML = '';
      out.append(stat('Batteries', n, n > 20 ? 'bad' : ''), stat('Bank voltage', fmt(V, 1) + ' V', okV ? '' : 'bad'), stat('Energy', fmt(b.wh * n / 1000, 1) + ' kWh'), stat('Capacity', fmt(ah, 0) + ' Ah'), stat('Recommended continuous', b.cont * P + ' A'), stat('Max continuous', b.max * P + ' A'));
      pn.innerHTML = (n > 20 ? '<b>Too many batteries.</b> The manual allows up to 20 per system. ' : '') + (okV ? '' : '<b>Series count does not match the ' + sysV + ' V system</b> (12.8 V × 1 = 12 V, ×2 = 24 V, ×4 = 48 V; 25.6 V × 1 = 24 V, ×2 = 48 V). ') + 'Energy and current figures come from the Lithium Smart battery datasheet table (nominal energy, recommended and maximum continuous discharge per battery). Charging is only allowed from +5 °C. Also check the BMS and fuse interrupt ratings.';
    }
    [m, sv, s, p].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Battery', m), field('System', sv), field('Series', s), field('Parallel', p)), out, pn); calc();
  });

  /* ---------- pv: string design ---------- */
  reg('pv', 'PV String Designer (Voc, cold weather, charger limit)', body => {
    const CH = { '100/30':{ v:100, a:30 }, '100/50':{ v:100, a:50 }, '150/35':{ v:150, a:35 }, '150/45':{ v:150, a:45 } };
    const ch = sel(Object.keys(CH).map(k => [k, 'SmartSolar ' + k]), '100/30'), bv = sel([['12', '12 V battery'], ['24', '24 V battery'], ['48', '48 V battery']], 24), voc = h('input', { type:'number', value:22.5, step:.1 }), vmp = h('input', { type:'number', value:18, step:.1 }), tc = h('input', { type:'number', value:-0.3, step:.01 }), wp = h('input', { type:'number', value:100 }), tmin = h('input', { type:'number', value:0 }), ns = sel([1, 2, 3, 4, 5, 6, 7, 8].map(n => [n, n + ' in series']), 2), np = sel([1, 2, 3, 4, 5, 6].map(n => [n, n + ' strings']), 1);
    const out = h('div', { class:'out' }), pn = note();
    function calc(){
      const c = CH[ch.value], V = +bv.value, N = +ns.value, NP = +np.value, cold = num(voc.value, 0) * (1 + num(tc.value, 0) / 100 * (num(tmin.value, 0) - 25)) * N, nom = num(vmp.value, 0) * N, pw = num(wp.value, 0) * N * NP, maxP = c.a * V * 1.2;
      const msgs = [];
      if (cold > c.v) msgs.push('cold open-circuit voltage exceeds the charger rating');
      if (nom < V + 5) msgs.push('string Vmp is less than battery voltage + 5 V: it will not track well');
      out.innerHTML = '';
      out.append(stat('Cold string Voc', fmt(cold, 1) + ' V', cold > c.v ? 'bad' : cold > c.v * .9 ? 'warn' : ''), stat('Charger max PV volts', c.v + ' V'), stat('String Vmp (nominal)', fmt(nom, 1) + ' V', nom < V + 5 ? 'bad' : ''), stat('Array power', pw + ' W'), stat('Charger output ≈ max', fmt(c.a * V * 1.2, 0) + ' W' + ' (illustr.)'), stat('Power vs charger', pw > maxP ? 'Over-paneled' : 'OK', pw > maxP ? 'warn' : ''));
      pn.innerHTML = (msgs.length ? '<b>Problem:</b> ' + msgs.join('; ') + '. ' : '<b>Voltage window OK.</b> ') + 'Voc rises below 25 °C by the panel\'s temperature coefficient (typically around -0.3 %/°C: <i>enter the datasheet value</i>). Rules from the MPPT manual: Voc at the coldest temperature must stay below the charger limit, and PV voltage should be at least 5 V above battery voltage. The charger-output figure is an illustrative estimate (rated amps × 1.2 × battery volts); small over-paneling is tolerated but power beyond the current limit is clipped. Panel values default to a generic 12 V panel; they are not from any datasheet.';
    }
    [ch, bv, voc, vmp, tc, wp, tmin, ns, np].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Charger', ch), field('Battery', bv), field('Panel Voc (V)', voc), field('Panel Vmp (V)', vmp), field('Temp coeff Voc (%/°C)', tc), field('Panel W', wp), field('Coldest °C', tmin), field('Series', ns), field('Strings', np)), out, pn); calc();
  });

  /* ---------- orion: Orion XS limits ---------- */
  reg('orion', 'Orion XS 12/12-50A Alternator Limit Planner', body => {
    const alt = h('input', { type:'number', value:100, min:10 }), lim = rng(1, 50, 30), bat = h('input', { type:'number', value:14.2, step:.1 }), len = sel([['0', 'Up to 5 m total'], ['1', '5 to 10 m']], 0);
    const out = h('div', { class:'out' }), pn = note();
    function calc(){
      const A = num(alt.value, 100), L = +lim.value, idle = A * .5, V = num(bat.value, 14.2), P = L * V;
      out.innerHTML = '';
      out.append(stat('Current limit', L + ' A'), stat('Output power ≈', fmt(P, 0) + ' W', P > 700 ? 'bad' : ''), stat('Alternator at idle (≈50 %)', fmt(idle, 0) + ' A'), stat('Alternator load at idle', fmt(L / idle * 100, 0) + ' %', L > idle * .8 ? 'warn' : ''), stat('Fuse (both sides)', '60 - 70 A'), stat('Cable', len.value === '0' ? '16 mm² / 6 AWG' : '4 AWG (21.2 mm²)'));
      pn.innerHTML = (L > idle * .8 ? '<b>Limit is high for the alternator at idle.</b> ' : '<b>Reasonable.</b> ') + 'The manual warns an alternator can deliver only about 50 % at idle and a lithium bank can overheat an alternator, so set the Orion XS current limit to what the alternator can safely give. The 12/12-50A is rated 700 W continuous up to 40 °C (derate above). Engine shutdown detection is built in.';
    }
    [alt, lim, bat, len].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Alternator rating (A)', alt), field('Orion current limit (A)', lim), field('Output volts', bat), field('Cable run', len)), out, pn); calc();
  });

  /* ---------- n2kcalc: NMEA 2000 power-drop and rules checker (Garmin NMEA 2000 Network Fundamentals) ---------- */
  reg('n2kcalc', 'NMEA 2000 Power-Drop & Network Rules Checker', body => {
    const pos = sel([['end', 'Power connected at the END of the backbone'], ['mid', 'Power connected in the MIDDLE (two sides)']], 'end');
    const res = h('input', { type:'number', value:0.053, step:.001, min:.01 }), dist = h('input', { type:'number', value:38, min:1 }), len = h('input', { type:'number', value:16, min:1 });
    const dist2 = h('input', { type:'number', value:18, min:1 }), len2 = h('input', { type:'number', value:12, min:1 });
    const span = h('input', { type:'number', value:60, min:1 }), drops = h('input', { type:'number', value:30, min:0 }), maxd = h('input', { type:'number', value:6, min:0, step:.5 }), devs = h('input', { type:'number', value:8, min:1 }), terms = h('input', { type:'number', value:2, min:0 });
    const out = h('div', { class:'out' }), pn = note(), side2 = h('div', { class:'row' }, field('Right side: distance to farthest device (m)', dist2), field('Right side: sum of LEN', len2));
    function calc(){
      const R = num(res.value, .053), mid = pos.value === 'mid';
      const d1 = R * num(dist.value, 0) * num(len.value, 0) * .1, d2 = mid ? R * num(dist2.value, 0) * num(len2.value, 0) * .1 : 0, worst = Math.max(d1, d2);
      side2.style.display = mid ? '' : 'none';
      const probs = [];
      if (worst > 3) probs.push(mid ? 'a side exceeds a 3 V drop: move the power connection or rebalance' : 'drop exceeds 3 V: connect power to the middle of the network');
      if (num(span.value, 0) > 100) probs.push('longer than 100 m between any two points');
      if (num(drops.value, 0) > 78) probs.push('total drop cable above 78 m');
      if (num(maxd.value, 0) > 6) probs.push('a single drop above 6 m');
      if (num(devs.value, 0) > 50) probs.push('more than 50 devices');
      if (num(terms.value, 0) !== 2) probs.push(num(terms.value, 0) > 2 ? 'more than two terminators' : 'fewer than two terminators');
      out.innerHTML = '';
      out.append(stat(mid ? 'Left-side drop' : 'Voltage drop', fmt(d1, 2) + ' V', d1 > 3 ? 'bad' : d1 > 2.4 ? 'warn' : ''));
      if (mid) out.append(stat('Right-side drop', fmt(d2, 2) + ' V', d2 > 3 ? 'bad' : d2 > 2.4 ? 'warn' : ''));
      out.append(stat('Rules failed', String(probs.length), probs.length ? 'bad' : ''));
      pn.innerHTML = (probs.length ? '<b>Problems:</b> ' + probs.join('; ') + '.' : '<b>Within Garmin\'s published limits.</b>') + '<br><span class="hint">Formula (Garmin): drop = cable resistance (0.053 ohm/m in their worked example) x distance from battery to farthest device (m) x network load (sum of LEN) x 0.1. Limits: 3 V maximum drop, 100 m between any two points, 78 m of drop cable in total, 6 m per drop, 50 devices, exactly two terminators. A conservative estimate: check device LEN labels.</span>';
    }
    [pos, res, dist, len, dist2, len2, span, drops, maxd, devs, terms].forEach(e => e.addEventListener('input', calc));
    body.append(h('p', { class:'hint' }, 'Try the manual\'s worked example: end-powered, 2 + 20 + 10 + 6 = 38 m to the farthest device and LEN 4 + 5 + 7 = 16 gives 3.22 V (fails); moving power to the middle gives about 1.15 V per side.'), h('div', { class:'row' }, field('Power position', pos), field('Cable resistance (ohm/m)', res), field('Distance to farthest device (m)', dist), field('Sum of LEN on that path', len)), side2, h('div', { class:'row' }, field('Longest path between devices (m)', span), field('Total drop cable (m)', drops), field('Longest single drop (m)', maxd), field('Devices', devs), field('Terminators', terms)), out, pn); calc();
  });
})();
