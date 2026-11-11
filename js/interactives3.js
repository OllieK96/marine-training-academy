/* Interactives part 3: error / LED code tools (lookup, VE.Bus LED decoder, Lynx LED simulator, error-code trainer). Data: data/codes.js */
(function(){
  const T = TRAINING, { h, shuffle } = UI;
  const reg = (id, title, build) => { T.interactives[id] = { title: typeof title === 'function' ? title : () => title, build }; };
  const field = (label, input) => h('label', { class:'fld' }, label, input);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const alive = el => document.body.contains(el);

  /* ---------- Lookup: codes:<family> ---------- */
  reg('codes', arg => (T.codes[arg] || {}).title ? 'Code Lookup: ' + T.codes[arg].title : 'Code Lookup', (body, arg) => {
    const C = T.codes[arg]; if (!C) { body.textContent = 'Unknown code family: ' + arg; return; }
    const three = C.rows.some(r => r[2]);
    const inp = h('input', { type:'search', placeholder:'Type a code, symptom or word…', style:{ minWidth:'260px' } });
    const out = h('div', { class:'tblwrap' });
    const quiz = h('div');
    function draw(){
      const q = inp.value.trim().toLowerCase();
      const rows = C.rows.filter(r => !q || r.join(' ').toLowerCase().indexOf(q) >= 0);
      const t = h('table', { class:'t' }, h('tr', null, h('th', null, 'Code / pattern'), h('th', null, 'Meaning'), three ? h('th', null, 'What to do') : null));
      rows.forEach(r => t.appendChild(h('tr', null, h('td', null, h('b', null, r[0])), h('td', { html:esc(r[1]) }), three ? h('td', { html:esc(r[2] || '') }) : null)));
      out.innerHTML = ''; out.appendChild(rows.length ? t : h('p', { class:'hint' }, 'No match.'));
    }
    inp.addEventListener('input', draw);
    let right = 0, tries = 0;
    function ask(){
      const r = C.rows[Math.floor(Math.random() * C.rows.length)];
      const wrong = shuffle(C.rows.filter(x => x[1] !== r[1])).slice(0, 3).map(x => x[1]);
      const opts = shuffle([r[1]].concat(wrong));
      quiz.innerHTML = '';
      const fb = h('div');
      quiz.append(h('div', { class:'qc' }, h('div', { class:'tag' }, `Quiz ${right}/${tries}`), h('p', { html:'<b>What does “' + esc(r[0]) + '” mean?</b>' }),
        opts.map(o => h('button', { class:'opt', html:esc(o), onclick(ev){
          const ok = o === r[1]; tries++; if (ok) right++;
          quiz.querySelectorAll('.opt').forEach(b => { b.disabled = true; if (b.textContent === r[1].replace(/&amp;/g, '&')) b.classList.add('right'); });
          if (!ok) ev.currentTarget.classList.add('wrong');
          fb.innerHTML = '<div class="fb">' + (ok ? '✅ Correct. ' : '❌ Not quite. ') + esc(r[2] || '') + '</div>';
          fb.appendChild(h('button', { class:'btn sm', onclick:ask }, 'Next ▶'));
        } })), fb));
    }
    body.append(h('div', { class:'row' }, field('Search', inp), h('button', { class:'btn sm', onclick:ask }, '🎯 Quiz me on this list')), quiz, out,
      h('p', { class:'hint' }, 'Paraphrased from the manufacturer manuals listed in the lesson source box. Always check the current manual or the vendor\'s live error page for your firmware.'));
    draw();
  });

  /* ---------- VE.Bus LED decoder ---------- */
  reg('vebusdec', 'VE.Bus LED Code Decoder', body => {
    const VB = T.vebusCodes, states = ['off', 'flash', 'on'], names = ['Off', 'Flashing', 'On'];
    const mk = () => h('select', null, names.map((n, i) => h('option', { value:i }, n)));
    const bulk = mk(), abs = mk(), flt = mk();
    const leds = {};
    const ledRow = h('div', { class:'row', style:{ gap:'20px' } });
    [['inv', 'Inverter on', '#22c55e'], ['bulk', 'Bulk', '#f59e0b'], ['abs', 'Absorption', '#f59e0b'], ['flt', 'Float', '#f59e0b']].forEach(([k, l, c]) => {
      const dot = h('div', { style:{ width:'26px', height:'26px', borderRadius:'50%', background:'#444', border:'2px solid #111', margin:'0 auto' } });
      leds[k] = { dot, c }; ledRow.appendChild(h('div', { style:{ textAlign:'center', fontSize:'12px' } }, dot, l));
    });
    const out = h('div', { class:'panel' });
    let phase = 0, iv;
    function paint(){
      if (!alive(ledRow)) return clearInterval(iv);
      phase = 1 - phase;
      const set = (k, st, opp) => { const on = st === 2 || (st === 1 && (opp ? !phase : phase)); leds[k].dot.style.background = on ? leds[k].c : '#444'; leds[k].dot.style.boxShadow = on ? '0 0 10px ' + leds[k].c : 'none'; };
      set('inv', 1, false); set('bulk', +bulk.value, true); set('abs', +abs.value, true); set('flt', +flt.value, true);
    }
    function decode(){
      const b = +bulk.value, a = +abs.value, f = +flt.value, g = VB.grid[states[b]];
      const code = g[f][a];
      if (!b && !a && !f) { out.innerHTML = '<b>No code.</b> At least one of Bulk / Absorption / Float must be on or flashing, and the Inverter-on LED must flash in opposition. Check you are not reading a normal charge or special LED indication.'; return; }
      const m = VB.meaning[code];
      out.innerHTML = '<b>VE.Bus code ' + code + '</b><br>' + (m ? esc(m[0]) + '.<br><i>' + esc(m[1]) + '</i>' : 'This code is not explained in the manual table used for this course (only codes 1, 3, 4, 5, 10, 14, 17, 18, 22, 24, 25 and 26 are). Check the current manual or the Victron Toolkit app.');
    }
    [bulk, abs, flt].forEach(s => s.addEventListener('input', decode));
    body.append(h('p', { class:'hint' }, 'Rules: the device is in error (no AC output), the Inverter-on LED flashes, and any flashing Bulk/Absorption/Float LED flashes in opposition to it. The Bulk LED picks the table; Float picks the row; Absorption picks the column.'),
      h('div', { class:'row' }, field('Bulk LED', bulk), field('Absorption LED', abs), field('Float LED', flt)), ledRow, out);
    decode(); iv = setInterval(paint, 500); paint();
  });

  /* ---------- Lynx Smart BMS LED simulator ---------- */
  reg('lyxled', 'Lynx Smart BMS LED Simulator', body => {
    const rows = T.codes.lynx.rows;
    const sel = h('select', null, rows.map((r, i) => h('option', { value:i }, r[0])));
    const dotS = h('div', { style:{ width:'34px', height:'34px', borderRadius:'50%', background:'#444', border:'2px solid #111' } });
    const dotB = h('div', { style:{ width:'34px', height:'34px', borderRadius:'50%', background:'#444', border:'2px solid #111' } });
    const out = h('div', { class:'panel' });
    let t0 = Date.now(), iv;
    const light = (d, c) => { d.style.background = c || '#444'; d.style.boxShadow = c ? '0 0 12px ' + c : 'none'; };
    function pattern(label){
      const l = label.toLowerCase(), m = l.match(/red (\d+) flash/);
      return { status: m ? { kind:'red', n:+m[1] } : l.startsWith('green and red') ? { kind:'alt' } : l.startsWith('green flash') ? { kind:'g3' } : l.startsWith('green blink') ? { kind:'gb' } : l.startsWith('green on') ? { kind:'on', c:'#22c55e' } : l.startsWith('orange blink') ? { kind:'ob' } : l.startsWith('orange') ? { kind:'on', c:'#f59e0b' } : null,
        blue: l.startsWith('blue on') ? { kind:'on' } : l.startsWith('blue flash every') ? { kind:'b3' } : l.startsWith('blue flash') ? { kind:'bb' } : null };
    }
    function tick(){
      if (!alive(dotS)) return clearInterval(iv);
      const p = pattern(rows[+sel.value][0]), t = (Date.now() - t0) / 1000;
      light(dotS, null); light(dotB, null);
      const s = p.status;
      if (s){
        if (s.kind === 'on') light(dotS, s.c);
        else if (s.kind === 'ob') light(dotS, Math.floor(t * 2) % 2 ? '#f59e0b' : null);
        else if (s.kind === 'gb') light(dotS, Math.floor(t * 2) % 2 ? '#22c55e' : null);
        else if (s.kind === 'g3') light(dotS, (t % 3) < 0.25 ? '#22c55e' : null);
        else if (s.kind === 'alt') light(dotS, Math.floor(t * 2) % 2 ? '#22c55e' : '#ef4444');
        else if (s.kind === 'red'){ const k = t % 4, on = k < s.n * 0.4 && (k % 0.4) < 0.2; light(dotS, on ? '#ef4444' : null); }
      }
      const b = p.blue;
      if (b){ if (b.kind === 'on') light(dotB, '#3b82f6'); else if (b.kind === 'bb') light(dotB, Math.floor(t * 2) % 2 ? '#3b82f6' : null); else if (b.kind === 'b3') light(dotB, (t % 3) < 0.25 ? '#3b82f6' : null); }
    }
    function say(){ const r = rows[+sel.value]; out.innerHTML = '<b>' + esc(r[0]) + '</b><br>' + esc(r[1]) + (r[2] ? '<br><i>' + esc(r[2]) + '</i>' : ''); t0 = Date.now(); }
    sel.addEventListener('input', say);
    body.append(h('div', { class:'row' }, field('LED pattern', sel)), h('div', { class:'row', style:{ gap:'30px' } }, h('div', { style:{ textAlign:'center', fontSize:'12px' } }, dotS, 'Status LED'), h('div', { style:{ textAlign:'center', fontSize:'12px' } }, dotB, 'Bluetooth LED')), out,
      h('p', { class:'hint' }, 'Red flash counts repeat every 4 seconds: count the flashes in a cycle. Animation is approximate; the table is the reference.'));
    say(); iv = setInterval(tick, 100);
  });

  /* ---------- Error-code trainer ---------- */
  reg('trainer', 'Victron Error-Code Trainer', body => {
    const fam = { mppt:'SmartSolar MPPT', orion:'Orion XS', lynx:'Lynx Smart BMS LEDs', led:'Blue Smart / Orion-Tr LEDs', vedirect:'VE.Direct ERR', multi:'MultiPlus-II symptoms', vebus:'VE.Bus LED code (read the grid)' };
    const sel = h('select', null, Object.keys(fam).concat(['all']).map(k => h('option', { value:k }, k === 'all' ? 'Mixed (all families)' : fam[k])));
    const dir = h('select', null, h('option', { value:'cm' }, 'Code → meaning'), h('option', { value:'mc' }, 'Meaning → code'), h('option', { value:'fix' }, 'Meaning → action'));
    const area = h('div'), score = h('div', { class:'hint' });
    let right = 0, tries = 0, streak = 0, best = 0;
    function pool(){
      const keys = sel.value === 'all' ? ['mppt', 'orion', 'lynx', 'led', 'vedirect', 'multi'] : [sel.value];
      let rows = [];
      keys.forEach(k => { if (k === 'vebus') return; T.codes[k].rows.forEach(r => rows.push({ f:k, c:r[0], m:r[1], a:r[2] || r[1] })); });
      if (sel.value === 'vebus') Object.keys(T.vebusCodes.meaning).forEach(c => rows.push({ f:'vebus', c:'VE.Bus code ' + c, m:T.vebusCodes.meaning[c][0], a:T.vebusCodes.meaning[c][1] }));
      return rows;
    }
    function ask(){
      let P = pool(), d = dir.value;
      if (d === 'fix') P = P.filter(r => r.a && r.a !== r.m && r.a.length > 4);
      if (P.length < 4){ area.textContent = 'Not enough entries for this mode: choose another family.'; return; }
      const r = P[Math.floor(Math.random() * P.length)];
      const others = shuffle(P.filter(x => x.c !== r.c && (d === 'cm' ? x.m !== r.m : d === 'mc' ? x.c !== r.c : x.a !== r.a))).slice(0, 3);
      const pick = x => d === 'cm' ? x.m : d === 'mc' ? x.c : x.a;
      const stem = d === 'cm' ? `${fam[r.f]}: <b>${esc(r.c)}</b>. What does it mean?` : d === 'mc' ? `${fam[r.f]}: which code or pattern means <b>“${esc(r.m)}”</b>?` : `${fam[r.f]}: <b>${esc(r.c)} (${esc(r.m)})</b>. What is the recommended action?`;
      const opts = shuffle([r].concat(others));
      area.innerHTML = '';
      const fb = h('div');
      area.append(h('div', { class:'qc' }, h('div', { class:'tag' }, 'Trainer'), h('p', { html:stem }),
        opts.map(o => h('button', { class:'opt', html:esc(pick(o)), onclick(ev){
          const ok = o === r; tries++; if (ok){ right++; streak++; best = Math.max(best, streak); } else streak = 0;
          area.querySelectorAll('.opt').forEach((b, i) => { b.disabled = true; if (opts[i] === r) b.classList.add('right'); });
          if (!ok) ev.currentTarget.classList.add('wrong');
          fb.innerHTML = '<div class="fb">' + (ok ? '✅ Correct. ' : '❌ Not quite. ') + '<b>' + esc(r.c) + '</b>: ' + esc(r.m) + (r.a && r.a !== r.m ? ' - ' + esc(r.a) : '') + '</div>';
          fb.appendChild(h('button', { class:'btn sm', onclick:ask }, 'Next ▶'));
          score.textContent = `Score ${right}/${tries} · streak ${streak} · best ${best}`;
        } })), fb));
    }
    sel.addEventListener('input', () => { right = tries = streak = 0; ask(); }); dir.addEventListener('input', ask);
    body.append(h('div', { class:'row' }, field('Family', sel), field('Direction', dir), h('button', { class:'btn sm', onclick:ask }, '▶ New question')), score, area);
    ask();
  });
})();
