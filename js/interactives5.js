/* Interactives part 5: CZone DIP/address simulator, Seakeeper model finder, network-map explorer */
(function(){
  const T = TRAINING, { h, fmt } = UI;
  const reg = (id, title, build) => { T.interactives[id] = { title: typeof title === 'function' ? title : () => title, build }; };
  const num = (v, d) => { const n = parseFloat(v); return isNaN(n) ? d : n; };
  const field = (label, input) => h('label', { class:'fld' }, label, input);

  /* ---------- CZone DIP address and LED simulator ---------- */
  reg('czdip', 'CZone DIP Address & Channel LED Simulator', body => {
    const cfg = [
      { name:'Bilge OI', pat:'01101100' },
      { name:'Lighting COI', pat:'01101101' },
      { name:'Pumps MOI', pat:'01101110' }
    ];
    const state = [
      { present:true, pat:'01101100' },
      { present:true, pat:'01101101' },
      { present:true, pat:'01101110' }
    ];
    const out = h('div');
    const rows = h('div');
    function result(i){
      const s = state[i], c = cfg[i];
      if (!s.present) return { led:'Module not on the network', css:'warn', txt:'Configured but not found: the tool shows it off-line and a Missing Module alarm is raised.' };
      const dup = state.some((o, j) => j !== i && o.present && o.pat === s.pat);
      if (dup) return { led:'Channel LED: red x3', css:'bad', txt:'DIP-switch conflict: two modules on the network share this address.' };
      const known = cfg.some(x => x.pat === s.pat);
      if (!known) return { led:'Channel LED: red x1', css:'warn', txt:'Not configured: this address is not in the loaded configuration.' };
      if (s.pat !== c.pat) return { led:'Address is valid but belongs to another entry', css:'warn', txt:'The module will act as a different configured entry. Check the label against the configuration.' };
      return { led:'Channel LEDs: green when output on', css:'', txt:'Address matches the configuration.' };
    }
    function draw(){
      rows.innerHTML = '';
      cfg.forEach((c, i) => {
        const s = state[i], r = result(i);
        const sw = h('div', { style:{ display:'flex', gap:'4px', alignItems:'center', flexWrap:'wrap' } },
          s.pat.split('').map((b, k) => h('button', { class:'btn sm ' + (b === '1' ? '' : 'sec'), style:{ minWidth:'34px' }, 'aria-label':'DIP switch ' + (k + 1) + (b === '1' ? ' on' : ' off'), onclick(){ const a = s.pat.split(''); a[k] = b === '1' ? '0' : '1'; s.pat = a.join(''); draw(); } }, b === '1' ? 'ON' : 'off')));
        rows.appendChild(h('div', { class:'panel', style:{ marginBottom:'8px' } },
          h('b', null, c.name), h('span', { class:'hint' }, '  configured pattern ' + c.pat + ' (1 = ON)'),
          h('div', { style:{ margin:'6px 0' } }, sw),
          h('label', { class:'fld', style:{ display:'inline-flex', gap:'6px' } }, h('input', { type:'checkbox', checked:s.present, onchange(e){ s.present = e.target.checked; draw(); } }), 'module connected to the network'),
          h('div', { class: r.css }, h('b', null, r.led), ' ', r.txt)));
      });
    }
    body.append(h('p', { class:'hint' }, 'Each module needs a unique DIP address matching its entry in the configuration file. Flip switches, copy a pattern or disconnect a module to see what the LEDs show. LED codes follow the CZone OI/MOI sheet; the real address mapping is set in the Configuration Tool.'), rows, out);
    draw();
  });

  /* ---------- Seakeeper model finder ---------- */
  reg('skcalc', 'Seakeeper Model Finder & Electrical Summary', body => {
    const len = h('input', { type:'number', value:52, min:20, max:120, step:1 });
    const disp = h('input', { type:'number', value:0, min:0, step:100 });
    const out = h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'10px', margin:'10px 0' } }), pn = h('div', { class:'panel' });
    const parse = s => { const m = /(\d+)-(\d+)/.exec(s || ''); return m ? [+m[1], +m[2]] : null; };
    function calc(){
      const L = num(len.value, 0), D = num(disp.value, 0);
      const hits = T.skmodels.filter(m => { const r = parse(m.len); return r && L >= r[0] && L <= r[1]; });
      out.innerHTML = ''; pn.innerHTML = '';
      if (!hits.length){ pn.innerHTML = 'No Seakeeper model lists this boat length on the products page. Check the maker for very small or very large boats.'; return; }
      hits.forEach(m => {
        const pct = D && m.kg ? ' (' + fmt(m.kg / D * 100, 1) + ' % of the displacement you entered)' : '';
        out.appendChild(h('div', { class:'panel', style:{ margin:0 } },
          h('b', null, m.m), h('div', { class:'hint' }, 'Boat length ' + m.len + (m.kg ? '; weight ' + m.kg + ' kg' : '') + pct),
          h('div', null, 'Type: ' + (m.kind === '?' ? 'electrical data not verified in a manual obtained for this course' : m.kind)),
          m.ac ? h('div', null, 'AC supply: ' + m.ac) : null, m.hi ? h('div', null, 'DC supply: ' + m.hi) : null,
          m.ctl ? h('div', null, 'Control: ' + m.ctl) : null, m.pump ? h('div', null, 'Seawater pump: ' + m.pump) : null,
          m.rpm ? h('div', null, 'Flywheel: ' + m.rpm) : null, m.flow ? h('div', null, 'Cooling flow: ' + m.flow) : null,
          h('div', { class:'callout verify', style:{ marginTop:'6px' } }, m.note)));
      });
      pn.innerHTML = 'Length ranges come from the Seakeeper products page and overlap between neighbouring models, so the final choice depends on the boat\'s displacement, hull, beam and the maker\'s sizing guidance. Electrical figures are from the manuals named in each note; where manuals disagree, the note says so.';
    }
    [len, disp].forEach(e => e.addEventListener('input', calc));
    body.append(h('div', { class:'row' }, field('Boat length (ft)', len), field('Displacement (kg, optional)', disp)), out, pn); calc();
  });

  /* ---------- Network map explorer ---------- */
  reg('netmap', 'Network Map Explorer: Buses, Faults and Symptoms', body => {
    const N = T.netmap; if (!N){ body.textContent = 'Network map data missing'; return; }
    const W = 970, H = 420, NW = 108, NH = 62, GAP = 118, X0 = 12, LANE0 = 125, LD = 28;
    const active = new Set(N.buses.map(b => b.id)); let broken = null, picked = null, quizOn = null, score = [0, 0];
    const laneY = id => LANE0 + LD * N.buses.findIndex(b => b.id === id);
    const nodeXY = n => ({ x:X0 + n.col * GAP, y:n.row === 0 ? 14 : H - 14 - NH });
    const svg = h('svg', { viewBox:`0 0 ${W} ${H}`, role:'img', 'aria-label':'Network map' });
    const chips = h('div', { class:'btnrow', style:{ flexWrap:'wrap', gap:'6px' } });
    const panel = h('div', { class:'panel' }), msg = h('div', { class:'hint' });
    function affected(){ return broken ? N.nodes.filter(n => n.buses.includes(broken)).map(n => n.id) : []; }
    function draw(){
      svg.innerHTML = '';
      N.buses.forEach(b => {
        if (!active.has(b.id)) return; const y = laneY(b.id), bad = broken === b.id;
        svg.appendChild(h('line', { x1:6, x2:W - 6, y1:y, y2:y, stroke:b.color, 'stroke-width':bad ? 4 : 3, 'stroke-dasharray':bad ? '8 6' : null, opacity:.9 }));
        svg.appendChild(h('text', { x:W - 8, y:y - 4, 'text-anchor':'end', style:{ fontSize:'10px', fontWeight:700, fill:b.color } }, b.name.split(' (')[0]));
      });
      const aff = affected();
      N.nodes.forEach(n => {
        const p = nodeXY(n), vis = n.buses.some(b => active.has(b));
        const shown = n.buses.filter(b => active.has(b));
        shown.forEach((b, k) => {
          const x = shown.length === 1 ? p.x + NW / 2 : p.x + 14 + k * ((NW - 28) / (shown.length - 1));
          const y1 = n.row === 0 ? p.y + NH : p.y, y2 = laneY(b);
          svg.appendChild(h('line', { x1:x, x2:x, y1, y2, stroke:N.buses.find(q => q.id === b).color, 'stroke-width':2, opacity:.7 }));
          svg.appendChild(h('circle', { cx:x, cy:y2, r:4, fill:N.buses.find(q => q.id === b).color }));
        });
        const isAff = aff.includes(n.id), sel = picked === n.id;
        svg.appendChild(h('g', { class:'node' + (sel ? ' sel' : ''), tabindex:0, role:'button', 'aria-label':n.l, onclick:() => pick(n.id), onkeydown:e => { if (e.key === 'Enter' || e.key === ' ') pick(n.id); } },
          h('rect', { x:p.x, y:p.y, width:NW, height:NH, rx:9, style:{ opacity: vis ? 1 : .25, stroke: isAff ? '#d6361e' : null, strokeWidth: isAff ? 3 : null, fill: isAff ? '#fde4df' : null } }),
          ...wrap(n.l, 15).map((t, i, a) => h('text', { class:'nl', x:p.x + NW / 2, y:p.y + NH / 2 + (i - (a.length - 1) / 2) * 12 + 4, 'text-anchor':'middle', style:{ fontSize:'10.5px', opacity: vis ? 1 : .35 } }, t))));
      });
    }
    function wrap(s, n){ const w = s.split(' '), lines = []; let cur = ''; w.forEach(x => { if ((cur + ' ' + x).trim().length > n && cur){ lines.push(cur); cur = x; } else cur = (cur + ' ' + x).trim(); }); lines.push(cur); return lines.slice(0, 3); }
    function pick(id){
      picked = id; const n = N.nodes.find(x => x.id === id);
      panel.innerHTML = `<b>${n.l}</b><br>Buses: ${n.buses.map(b => `<span style="color:${N.buses.find(q => q.id === b).color};font-weight:700">${N.buses.find(q => q.id === b).name.split(' (')[0]}</span>`).join(', ')}<br>${n.d}<br><br>⚠️ <b>If it fails or loses its supply:</b> ${n.fail}`;
      draw();
    }
    function chipsDraw(){
      chips.innerHTML = '';
      N.buses.forEach(b => chips.appendChild(h('button', { class:'btn sm ' + (active.has(b.id) ? '' : 'sec'), style:{ borderColor:b.color }, title:b.note, onclick(){ if (active.has(b.id)) active.delete(b.id); else active.add(b.id); chipsDraw(); draw(); } }, (active.has(b.id) ? '● ' : '○ ') + b.name.split(' (')[0])));
    }
    const brk = h('select', null, h('option', { value:'' }, 'No fault'), N.buses.map(b => h('option', { value:b.id }, 'Break: ' + b.name.split(' (')[0])));
    brk.addEventListener('input', () => { broken = brk.value || null; const b = N.buses.find(x => x.id === broken); draw(); panel.innerHTML = b ? `<b>${b.name} is down.</b> ${b.note}<br>Highlighted units depend on it (${affected().length}). Click each to see what you would notice.` : 'Click any unit to see what it does and what happens when it fails.'; });
    const qbtn = h('button', { class:'btn sm', onclick(){ quiz(); } }, '🎯 Which bus is it?');
    function quiz(){
      const q = N.symptoms[Math.floor(Math.random() * N.symptoms.length)]; quizOn = q;
      panel.innerHTML = `<b>Symptom:</b> ${q.q}<br><span class="hint">Choose the bus most likely involved.</span>`;
      const bx = h('div', { class:'btnrow', style:{ marginTop:'6px', flexWrap:'wrap', gap:'6px' } }, N.buses.map(b => h('button', { class:'btn sm sec', onclick(){ score[1]++; const ok = b.id === q.a; if (ok) score[0]++; msg.textContent = `Score ${score[0]}/${score[1]}`; panel.innerHTML = (ok ? '✅ <b>Correct.</b> ' : `❌ It was <b>${N.buses.find(x => x.id === q.a).name.split(' (')[0]}</b>. `) + q.why; quizOn = null; } }, b.name.split(' (')[0])));
      panel.appendChild(bx);
    }
    panel.innerHTML = 'Click any unit to see what it does and what happens when it fails. Toggle buses on and off, break a bus, or press the quiz button.';
    body.append(h('p', { class:'hint' }, 'A typical modern boat, drawn product-first. Every vessel differs: identify what is actually fitted and which bus each unit uses.'), chips, h('div', { class:'row' }, field('Fault injection', brk), qbtn, msg), svg, panel);
    chipsDraw(); draw();
  });
})();
