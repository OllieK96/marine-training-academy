/* Marine Electrical Training Academy - core app (router, views, exams, progress) */
(function(){
  const T = window.TRAINING, { h, shuffle, state } = window.UI;
  const view = document.getElementById('view');
  const LEVELS = ['Foundation', 'Intermediate', 'Advanced'];
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const strip = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
  const S = () => state.get();
  const fmtDate = ts => new Date(ts).toLocaleDateString('en-AU', { day:'numeric', month:'long', year:'numeric' });
  const lessonKey = (m, l) => m + '/' + l;

  /* ---------- progress helpers ---------- */
  function modLessons(m){ return T.modules[m].lessons; }
  function isDone(m, l){ return !!S().done[lessonKey(m, l)]; }
  function modProgress(m){ const ls = modLessons(m); const d = ls.filter(l => isDone(m, l.id)).length; return { done:d, total:ls.length, pct: ls.length ? Math.round(d / ls.length * 100) : 0 }; }
  function overall(){ let d = 0, t = 0; T.order.forEach(m => { const p = modProgress(m); d += p.done; t += p.total; }); return { done:d, total:t, pct: t ? Math.round(d / t * 100) : 0 }; }
  function lessonLocked(m, l){
    if (S().unlockAll) return false;
    const lv = LEVELS.indexOf(l.level); if (lv <= 0) return false;
    return modLessons(m).some(x => LEVELS.indexOf(x.level) < lv && !isDone(m, x.id));
  }
  function bestExam(id){ const e = S().exams.filter(x => x.mod === id); if (!e.length) return null; return e.reduce((a, b) => b.pct > a.pct ? b : a); }
  function examsPassed(){ return T.order.filter(m => { const b = bestExam(m); return b && b.pass; }).length; }

  /* ---------- search index ---------- */
  const INDEX = [];
  function blockText(b){
    const t = b[0];
    if (t === 'p' || t === 'h' || t === 'tip' || t === 'safety' || t === 'note' || t === 'where' || t === 'verify') return strip(b[1]);
    if (t === 'tcode') return '';
    if (t === 'ul' || t === 'ol' || t === 'steps') return strip(b[1].join(' '));
    if (t === 'spec') return strip(b[1] + ' ' + b[2].map(r => r.join(' ')).join(' '));
    if (t === 'table') return strip(b[1].join(' ') + ' ' + b[2].map(r => r.join(' ')).join(' '));
    return '';
  }
  function buildIndex(){
    T.order.forEach(m => modLessons(m).forEach(l => INDEX.push({ m, l:l.id, title:l.title, mt:T.modules[m].title, text:l.body.map(blockText).join(' ') })));
  }

  /* ---------- sidebar ---------- */
  function renderNav(){
    const cur = location.hash || '#/';
    const nav = $('#nav'); nav.innerHTML = '';
    const link = (href, label, extra) => h('a', { href, class: cur === href || cur.startsWith(href + '/') ? 'active' : '' }, label, extra || '');
    nav.appendChild(link('#/', '🏠 Dashboard'));
    T.paths.forEach(p => {
      nav.appendChild(h('div', { class:'grp' }, p.title));
      p.modules.forEach(m => {
        const mod = T.modules[m], pr = modProgress(m);
        nav.appendChild(h('a', { class:'sub' + (cur.startsWith('#/module/' + m) || cur.startsWith('#/lesson/' + m + '/') || cur === '#/exam/' + m ? ' active' : ''), href:'#/module/' + m },
          h('span', null, mod.icon), h('span', null, mod.title),
          h('span', { class: pr.pct === 100 ? 'pct tick' : 'pct' }, pr.pct === 100 ? '✔' : pr.pct + '%')));
      });
    });
    nav.appendChild(h('div', { class:'grp' }, 'Assessment'));
    nav.appendChild(link('#/final', '🎓 Final Certification Exam'));
    nav.appendChild(link('#/results', '📊 Results & Certificates'));
    nav.appendChild(link('#/settings', '⚙️ Settings & About'));
  }

  /* ---------- router ---------- */
  function route(){
    const hash = location.hash || '#/';
    const parts = hash.slice(2).split('/').map(decodeURIComponent);
    document.getElementById('sidebar').classList.remove('open');
    view.innerHTML = '';
    try {
      const [r, a, b] = parts;
      if (r !== 'search') $('#searchInput').value = '';
      if (!r) viewDashboard();
      else if (r === 'module') viewModule(a);
      else if (r === 'lesson') viewLesson(a, b);
      else if (r === 'exam') viewExam(a);
      else if (r === 'final') viewExam('final');
      else if (r === 'results') viewResults();
      else if (r === 'cert') viewCert(a);
      else if (r === 'search') viewSearch(parts.slice(1).join('/'));
      else if (r === 'settings') viewSettings();
      else viewDashboard();
    } catch (e){ console.error(e); view.appendChild(h('div', { class:'card' }, 'Something went wrong: ' + e.message)); }
    renderNav();
    window.scrollTo(0, 0);
  }

  /* ---------- dashboard ---------- */
  function ring(pct){
    const r = 52, c = 2 * Math.PI * r;
    return h('div', { class:'ring' },
      h('svg', { viewBox:'0 0 120 120' },
        h('circle', { cx:60, cy:60, r, fill:'none', stroke:'rgba(255,255,255,.2)', 'stroke-width':10 }),
        h('circle', { cx:60, cy:60, r, fill:'none', stroke:'#5eead4', 'stroke-width':10, 'stroke-linecap':'round', 'stroke-dasharray':c, 'stroke-dashoffset':c * (1 - pct / 100), transform:'rotate(-90 60 60)', style:{ transition:'stroke-dashoffset 1s' } })),
      h('b', null, pct + '%'));
  }
  function nextLesson(){
    for (const m of T.order) for (const l of modLessons(m)) if (!isDone(m, l.id) && !lessonLocked(m, l)) return { m, l };
    return null;
  }
  function viewDashboard(){
    const o = overall(), ex = S().exams;
    const avg = ex.length ? Math.round(ex.reduce((a, b) => a + b.pct, 0) / ex.length) : 0;
    const nl = (S().last && T.modules[S().last.m] && modLessons(S().last.m).find(x => x.id === S().last.l)) ? S().last : null;
    const next = nextLesson();
    view.appendChild(h('div', { class:'hero' },
      ring(o.pct),
      h('div', null, h('h1', null, S().name ? 'Welcome back, ' + S().name : 'Marine Electrical Training Academy'),
        h('p', null, 'Interactive training for Riviera, Maritimo and general marine electrical systems. Work through each path from Foundation to Advanced, then prove it in the exams.'),
        h('div', { class:'btnrow' },
          next ? h('a', { class:'btn', href:`#/lesson/${next.m}/${next.l.id}` }, o.done ? '▶ Continue learning' : '▶ Start learning') : h('a', { class:'btn', href:'#/final' }, '🎓 Take the final exam'),
          h('a', { class:'btn sec', style:{ color:'#fff', borderColor:'rgba(255,255,255,.4)' }, href:'#/final' }, 'Final certification exam')))));
    view.appendChild(h('div', { class:'stats' },
      stat(o.done + ' / ' + o.total, 'Lessons completed'), stat(examsPassed() + ' / ' + T.order.length, 'Module exams passed'),
      stat(ex.length ? avg + '%' : '–', 'Average exam score'), stat(ex.length, 'Exam attempts')));
    T.paths.forEach(p => {
      view.appendChild(h('div', { class:'path-head' }, h('h2', null, p.icon + ' ' + p.title)));
      view.appendChild(h('p', { class:'muted' }, p.desc));
      view.appendChild(h('div', { class:'grid' }, p.modules.map(m => {
        const mod = T.modules[m], pr = modProgress(m), be = bestExam(m);
        return h('a', { class:'mcard', href:'#/module/' + m },
          h('div', { class:'ic' }, mod.icon), h('h3', null, mod.title), h('p', null, mod.summary),
          h('div', { class:'bar' }, h('i', { style:{ width:pr.pct + '%' } })),
          h('div', { class:'meta' }, h('span', null, `${pr.done}/${pr.total} lessons`), h('span', null, be ? (be.pass ? '✔ Exam ' : 'Exam ') + be.pct + '%' : 'Exam not taken')));
      })));
    });
  }
  const stat = (b, s) => h('div', { class:'stat' }, h('b', null, b), h('span', null, s));

  /* ---------- module ---------- */
  function viewModule(id){
    const mod = T.modules[id]; if (!mod) return viewDashboard();
    const pr = modProgress(id), be = bestExam(id), qn = (T.questions[id] || []).length;
    view.appendChild(h('div', { class:'crumbs' }, h('a', { href:'#/' }, 'Dashboard'), ' › ', mod.title));
    view.appendChild(h('h1', null, mod.icon + ' ' + mod.title));
    view.appendChild(h('p', { class:'muted' }, mod.summary));
    view.appendChild(h('div', { class:'bar', style:{ maxWidth:'420px' } }, h('i', { style:{ width:pr.pct + '%' } })));
    view.appendChild(h('p', { class:'hint' }, `${pr.done} of ${pr.total} lessons complete`));
    LEVELS.forEach(lv => {
      const ls = modLessons(id).filter(l => l.level === lv); if (!ls.length) return;
      view.appendChild(h('h3', null, h('span', { class:'chip ' + lv }, lv)));
      ls.forEach(l => {
        const i = modLessons(id).indexOf(l) + 1, lock = lessonLocked(id, l), done = isDone(id, l.id);
        const inner = [h('div', { class:'n' }, done ? '✔' : lock ? '🔒' : i), h('div', { class:'t' }, h('b', null, l.title), h('small', null, `${l.min || 8} min` + (l.interactive ? ' · interactive' : ''))), h('span', { class:'chip ' + lv }, lv)];
        view.appendChild(lock ? h('div', { class:'lesson-row locked', title:'Complete earlier levels in this module to unlock (or enable "Unlock all" in Settings)' }, inner) : h('a', { class:'lesson-row' + (done ? ' done' : ''), href:`#/lesson/${id}/${l.id}` }, inner));
      });
    });
    view.appendChild(h('h3', null, 'Module exam'));
    view.appendChild(h('div', { class:'card' },
      h('p', null, `${Math.min(T.moduleExamSize, qn)} randomised multiple-choice questions drawn from a bank of ${qn}. Pass mark ${T.passMark * 100}%.`),
      be ? h('p', null, 'Best score: ', h('b', null, be.pct + '%'), ' ', h('span', { class:'chip ' + (be.pass ? 'pass' : 'fail') }, be.pass ? 'Passed' : 'Not yet passed')) : h('p', { class:'hint' }, 'No attempts yet.'),
      h('div', { class:'btnrow' }, h('a', { class:'btn', href:'#/exam/' + id }, be ? 'Retake exam' : 'Start exam'), be && be.pass ? h('a', { class:'btn sec', href:'#/cert/' + id }, '🏅 Certificate') : null)));
  }

  /* ---------- lesson ---------- */
  function renderBlock(b){
    const t = b[0];
    switch (t){
      case 'h': return h('h3', null, b[1]);
      case 'p': return h('p', { html:b[1] });
      case 'ul': return h('ul', null, b[1].map(x => h('li', { html:x })));
      case 'ol': return h('ol', null, b[1].map(x => h('li', { html:x })));
      case 'steps': return h('ol', { class:'steps' }, b[1].map(x => h('li', { html:x })));
      case 'tip': return callout('tip', '🔧 Field tip', b[1]);
      case 'safety': return callout('safety', '⚠ Safety', b[1]);
      case 'note': return callout('note', '★ Key point', b[1]);
      case 'where': return callout('where', '📍 Where you\'ll see it', b[1]);
      case 'verify': return callout('verify', '🔎 Verify before you rely on this', b[1]);
      case 'spec': return h('div', null, h('div', { class:'spec-title' }, b[1]), table(['Item', 'Detail'], b[2]));
      case 'table': return table(b[1], b[2]);
      case 'int': return interactive(b[1]);
      case 'qc': return quickCheck(b[1]);
      case 'src': return sourceBox(b[1]);
    }
    return h('div');
  }
  function sourceBox(keys){
    const items = keys.map(k => { const s = (T.sources || {})[k]; if (!s) return null; return h('li', null, h('a', { href:s.u, target:'_blank', rel:'noopener' }, s.t), ' ', (s.f ? h('a', { class:'muted', href:'sources/' + s.f, target:'_blank', rel:'noopener' }, '(local copy)') : null)); }).filter(Boolean);
    return h('div', { class:'srcbox' }, h('b', { class:'l' }, '📚 Source'), h('p', { class:'hint', style:{ margin:'2px 0 6px' } }, 'Facts in this lesson are paraphrased from the manufacturer documents below. Check the current revision for the exact model and firmware.'), h('ul', null, items));
  }
  const callout = (cls, label, html) => h('div', { class:'callout ' + cls }, h('b', { class:'l' }, label), h('div', { html }));
  const table = (head, rows) => h('div', { class:'tblwrap' }, h('table', { class:'t' }, h('thead', null, h('tr', null, head.map(x => h('th', { html:x })))), h('tbody', null, rows.map(r => h('tr', null, r.map(c => h('td', { html:String(c) })))))));
  function interactive(spec){
    const [type, arg] = spec.split(':');
    const def = T.interactives[type];
    if (!def){ return h('div', { class:'callout safety' }, 'Missing interactive: ' + spec); }
    const body = h('div', { class:'int-b' });
    const box = h('div', { class:'int' }, h('div', { class:'int-h' }, h('span', null, 'Interactive'), def.title(arg)), body);
    try { def.build(body, arg); } catch (e){ console.error('Interactive failed', spec, e); body.textContent = 'Interactive failed to load.'; }
    return box;
  }
  function quickCheck(q){
    const order = shuffle(q.o.map((t, i) => i));
    const box = h('div', { class:'qc' }, h('div', { class:'tag' }, 'Quick check'), h('p', { html:'<b>' + q.q + '</b>' }));
    const fb = h('div');
    order.forEach(i => {
      const btn = h('button', { class:'opt', html:q.o[i], onclick(){
        box.querySelectorAll('.opt').forEach(b => b.disabled = true);
        const ok = i === q.a; btn.classList.add(ok ? 'right' : 'wrong');
        if (!ok) box.querySelectorAll('.opt').forEach((b, k) => { if (order[k] === q.a) b.classList.add('right'); });
        fb.innerHTML = '<div class="fb">' + (ok ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> ') + q.e + '</div>';
      } });
      box.appendChild(btn);
    });
    box.appendChild(fb); return box;
  }
  function viewLesson(m, lid){
    const mod = T.modules[m]; if (!mod) return viewDashboard();
    const ls = mod.lessons, idx = ls.findIndex(l => l.id === lid); if (idx < 0) return viewModule(m);
    const l = ls[idx];
    if (lessonLocked(m, l)){ view.appendChild(h('div', { class:'card' }, h('h2', null, '🔒 Locked'), h('p', null, `Complete the earlier levels in "${mod.title}" first, or enable "Unlock all levels" in Settings.`), h('a', { class:'btn', href:'#/module/' + m }, 'Back to module'))); return; }
    S().last = { m, l:lid }; state.save();
    view.appendChild(h('div', { class:'crumbs' }, h('a', { href:'#/' }, 'Dashboard'), ' › ', h('a', { href:'#/module/' + m }, mod.title), ' › Lesson ' + (idx + 1)));
    const wrap = h('div', { class:'lesson' });
    wrap.appendChild(h('div', null, h('span', { class:'chip ' + l.level }, l.level), ' ', h('span', { class:'hint' }, `${l.min || 8} min read`)));
    wrap.appendChild(h('h1', null, l.title));
    const body = h('div', { class:'lesson-body' }); l.body.forEach(b => body.appendChild(renderBlock(b))); if (l.src && l.src.length) body.appendChild(sourceBox(l.src)); wrap.appendChild(body);
    wrap.appendChild(h('div', { class:'callout note' }, h('b', { class:'l' }, 'Disclaimer'), 'General training information only. Always follow the manufacturer\'s installation and service manuals and the standards that apply to your vessel.'));
    const doneBtn = h('button', { class:'btn', onclick(){ S().done[lessonKey(m, lid)] = Date.now(); state.save(); route(); } }, isDone(m, lid) ? '✔ Completed' : 'Mark lesson complete');
    if (isDone(m, lid)) doneBtn.className = 'btn sec';
    const nextL = ls[idx + 1], prevL = ls[idx - 1];
    wrap.appendChild(h('div', { class:'lesson-nav' },
      prevL ? h('a', { class:'btn sec', href:`#/lesson/${m}/${prevL.id}` }, '← ' + prevL.title) : h('span'),
      doneBtn,
      nextL ? h('a', { class:'btn', href:`#/lesson/${m}/${nextL.id}` }, 'Next: ' + nextL.title + ' →') : h('a', { class:'btn', href:'#/exam/' + m }, 'Take module exam →')));
    view.appendChild(wrap);
  }

  /* ---------- exams ---------- */
  let EX = null;
  function buildExam(id){
    let pool;
    if (id === 'final'){
      pool = []; let rest = [];
      T.order.forEach(m => { const s = shuffle(T.questions[m] || []); pool.push(...s.slice(0, T.finalPerModule).map(q => ({ ...q, mod:m }))); rest.push(...s.slice(T.finalPerModule).map(q => ({ ...q, mod:m }))); });
      pool.push(...shuffle(rest).slice(0, 2)); pool = shuffle(pool);
    } else pool = shuffle(T.questions[id] || []).slice(0, T.moduleExamSize).map(q => ({ ...q, mod:id }));
    return pool.map(q => { const order = shuffle(q.o.map((t, i) => i)); return { q:q.q, e:q.e, mod:q.mod, opts:order.map(i => q.o[i]), correct:order.indexOf(q.a), pick:null }; });
  }
  function examTitle(id){ return id === 'final' ? 'Final Certification Exam' : T.modules[id].title + ' – Module Exam'; }
  function viewExam(id){
    if (id !== 'final' && !T.modules[id]) return viewDashboard();
    EX = null;
    const n = id === 'final' ? T.order.length * T.finalPerModule + 2 : Math.min(T.moduleExamSize, (T.questions[id] || []).length);
    view.appendChild(h('div', { class:'crumbs' }, h('a', { href:'#/' }, 'Dashboard'), ' › ', id === 'final' ? 'Final exam' : h('a', { href:'#/module/' + id }, T.modules[id].title), ' › Exam'));
    view.appendChild(h('h1', null, '📝 ' + examTitle(id)));
    const be = bestExam(id);
    view.appendChild(h('div', { class:'card' },
      h('p', null, `${n} multiple-choice questions, randomised each attempt (questions and answer order). You need ${T.passMark * 100}% (${Math.ceil(n * T.passMark)}/${n}) to pass. You can move back and forth and change answers before you submit; explanations are shown in the review afterwards.`),
      id === 'final' ? h('p', null, 'Questions are drawn from every module in the course.') : null,
      be ? h('p', null, 'Previous best: ', h('b', null, be.pct + '%')) : null,
      h('button', { class:'btn', onclick(){ EX = { id, qs:buildExam(id), i:0 }; renderExam(); } }, 'Begin exam')));
  }
  function renderExam(){
    view.innerHTML = '';
    const { qs, i } = EX, q = qs[i];
    view.appendChild(h('h2', null, examTitle(EX.id)));
    view.appendChild(h('div', { class:'hint' }, `Question ${i + 1} of ${qs.length} · ${qs.filter(x => x.pick !== null).length} answered`));
    view.appendChild(h('div', { class:'progress-dots' }, qs.map((x, k) => h('i', { class:(x.pick !== null ? 'ans ' : '') + (k === i ? 'cur' : ''), onclick(){ EX.i = k; renderExam(); } }))));
    const card = h('div', { class:'card' }, h('div', { class:'examq', html:q.q }));
    q.opts.forEach((o, k) => card.appendChild(h('button', { class:'opt' + (q.pick === k ? ' sel' : ''), html:o, onclick(){ q.pick = k; renderExam(); } })));
    view.appendChild(card);
    const last = i === qs.length - 1;
    view.appendChild(h('div', { class:'lesson-nav' },
      h('button', { class:'btn sec', disabled:i === 0, onclick(){ EX.i--; renderExam(); } }, '← Previous'),
      last ? h('button', { class:'btn', onclick(){
        const un = qs.filter(x => x.pick === null).length;
        if (un && !confirm(`${un} question(s) unanswered. Submit anyway?`)) return; finishExam();
      } }, 'Submit exam') : h('button', { class:'btn', onclick(){ EX.i++; renderExam(); } }, 'Next →')));
    window.scrollTo(0, 0);
  }
  function finishExam(){
    const { id, qs } = EX; const score = qs.filter(q => q.pick === q.correct).length, pct = Math.round(score / qs.length * 100), pass = pct >= T.passMark * 100;
    const rec = { mod:id, score, total:qs.length, pct, pass, ts:Date.now() };
    S().exams.push(rec); state.save(); renderNav();
    view.innerHTML = '';
    view.appendChild(h('div', { class:'card', style:{ textAlign:'center' } },
      h('div', { class:'hint' }, examTitle(id)), h('div', { class:'score-big ' + (pass ? 'pass' : 'fail') }, pct + '%'),
      h('p', null, `${score} of ${qs.length} correct · pass mark ${T.passMark * 100}%`),
      h('h2', { style:{ margin:'6px 0' } }, pass ? '🎉 Passed!' : 'Not passed yet – review and try again'),
      h('div', { class:'btnrow noprint', style:{ justifyContent:'center' } },
        h('button', { class:'btn', onclick(){ view.innerHTML = ''; viewExam(id); window.scrollTo(0, 0); } }, 'Retake'),
        pass ? h('a', { class:'btn sec', href:'#/cert/' + id }, '🏅 Certificate') : null,
        h('button', { class:'btn sec', onclick(){ window.print(); } }, '🖨 Print result'),
        id === 'final' ? null : h('a', { class:'btn sec', href:'#/module/' + id }, 'Back to module'))));
    view.appendChild(h('h2', null, 'Review'));
    qs.forEach((q, k) => {
      const ok = q.pick === q.correct;
      view.appendChild(h('div', { class:'review ' + (ok ? 'ok' : 'no') },
        h('p', { html:`<b>${k + 1}. ${q.q}</b>` }),
        h('p', { html:(ok ? '✅ Your answer: ' : '❌ Your answer: ') + (q.pick === null ? '<i>no answer</i>' : q.opts[q.pick]) }),
        ok ? null : h('p', { html:'✔ Correct answer: <b>' + q.opts[q.correct] + '</b>' }),
        h('p', { class:'muted', html:q.e })));
    });
    EX = null; window.scrollTo(0, 0);
  }

  /* ---------- results / certificates ---------- */
  function viewResults(){
    view.appendChild(h('h1', null, '📊 Results & Certificates'));
    view.appendChild(h('div', { class:'card' }, h('h3', { style:{ marginTop:0 } }, 'Certificates'),
      h('p', { class:'muted' }, 'A certificate becomes available when you pass a module exam (80%+) or the final exam. Set the name printed on it in Settings.'),
      h('div', { class:'btnrow' }, T.order.map(m => { const b = bestExam(m); return b && b.pass ? h('a', { class:'btn sm sec', href:'#/cert/' + m }, '🏅 ' + T.modules[m].title) : null; }),
        (() => { const b = bestExam('final'); return b && b.pass ? h('a', { class:'btn sm', href:'#/cert/final' }, '🎓 Final certification') : null; })()),
      examsPassed() === 0 && !(bestExam('final') && bestExam('final').pass) ? h('p', { class:'hint' }, 'No certificates earned yet.') : null));
    view.appendChild(h('h2', null, 'Exam history'));
    const ex = S().exams.slice().reverse();
    if (!ex.length){ view.appendChild(h('p', { class:'muted' }, 'No exams taken yet.')); return; }
    view.appendChild(h('div', { class:'card tblwrap' }, h('table', { class:'log' },
      h('thead', null, h('tr', null, ['Date', 'Exam', 'Score', 'Result'].map(x => h('th', null, x)))),
      h('tbody', null, ex.map(e => h('tr', null, h('td', null, new Date(e.ts).toLocaleString('en-AU')), h('td', null, e.mod === 'final' ? 'Final Certification' : (T.modules[e.mod] ? T.modules[e.mod].title : e.mod)), h('td', null, `${e.score}/${e.total} (${e.pct}%)`), h('td', null, h('span', { class:'chip ' + (e.pass ? 'pass' : 'fail') }, e.pass ? 'Pass' : 'Fail'))))))));
    view.appendChild(h('button', { class:'btn sec noprint', style:{ marginTop:'12px' }, onclick(){ window.print(); } }, '🖨 Print results'));
  }
  function viewCert(id){
    const b = bestExam(id);
    if (!b || !b.pass){ view.appendChild(h('div', { class:'card' }, h('h2', null, 'Certificate not yet earned'), h('p', null, 'Pass this exam with 80% or more to unlock the certificate.'), h('a', { class:'btn', href:id === 'final' ? '#/final' : '#/exam/' + id }, 'Go to exam'))); return; }
    const nameIn = h('input', { type:'text', value:S().name, placeholder:'Your name', style:{ padding:'8px 10px', borderRadius:'9px', border:'1.5px solid var(--line)', background:'var(--card)', color:'var(--text)' }, oninput(){ S().name = nameIn.value; state.save(); nm.textContent = nameIn.value || 'Marine Electrician'; } });
    view.appendChild(h('div', { class:'btnrow noprint' }, h('label', { class:'fld' }, 'Name on certificate', nameIn), h('button', { class:'btn', onclick(){ window.print(); } }, '🖨 Print / Save as PDF'), h('a', { class:'btn sec', href:'#/results' }, 'Back')));
    const nm = h('div', { class:'nm' }, S().name || 'Marine Electrician');
    view.appendChild(h('div', { class:'cert' },
      h('div', { style:{ letterSpacing:'4px', fontSize:'13px', color:'#0d9488', fontWeight:700 } }, 'MARINE ELECTRICAL TRAINING ACADEMY'),
      h('h1', null, id === 'final' ? 'Certificate of Achievement' : 'Certificate of Completion'),
      h('p', null, 'This certifies that'), nm,
      h('p', null, id === 'final' ? 'has successfully completed the' : 'has successfully passed the module exam in'),
      h('h2', { style:{ color:'#0a2540', margin:'4px 0 8px' } }, id === 'final' ? 'Final Certification Exam – Marine Electrical Systems' : T.modules[id].title),
      h('p', null, `Score: ${b.pct}% (${b.score}/${b.total}) · Pass mark ${T.passMark * 100}%`),
      h('p', null, 'Awarded ' + fmtDate(b.ts)),
      h('div', { class:'seal' }, '⚓'),
      h('p', { style:{ fontSize:'11px', marginTop:'18px' } }, 'Self-assessment certificate generated by the training app. It is not a licence or a formal qualification.')));
  }

  /* ---------- search ---------- */
  function viewSearch(q){
    view.appendChild(h('h1', null, 'Search'));
    q = (q || '').trim();
    if (!q){ view.appendChild(h('p', { class:'muted' }, 'Type something in the search box above.')); return; }
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const res = INDEX.map(x => {
      const tl = x.title.toLowerCase(), tx = x.text.toLowerCase(); let sc = 0;
      for (const t of terms){ if (tl.includes(t)) sc += 10; const c = tx.split(t).length - 1; if (!c && !tl.includes(t)){ sc = -1e9; break; } sc += Math.min(c, 8); }
      return { x, sc };
    }).filter(r => r.sc > 0).sort((a, b) => b.sc - a.sc);
    view.appendChild(h('p', { class:'muted' }, `${res.length} result${res.length === 1 ? '' : 's'} for “${q}”`));
    res.slice(0, 40).forEach(({ x }) => {
      const tx = x.text, pos = tx.toLowerCase().indexOf(terms[0]);
      let snip = pos < 0 ? tx.slice(0, 160) : (pos > 60 ? '…' : '') + tx.slice(Math.max(0, pos - 60), pos + 140) + '…';
      let html = esc(snip); terms.forEach(t => { html = html.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<span class="hl">$1</span>'); });
      view.appendChild(h('a', { class:'srch', href:`#/lesson/${x.m}/${x.l}` }, h('b', null, x.title), ' ', h('small', null, '· ' + x.mt), h('div', { class:'muted', style:{ fontSize:'14px' }, html })));
    });
  }

  /* ---------- settings ---------- */
  function viewSettings(){
    view.appendChild(h('h1', null, '⚙️ Settings & About'));
    const nameIn = h('input', { type:'text', value:S().name, placeholder:'Name for certificates', onchange(){ S().name = nameIn.value; state.save(); } });
    const ua = h('button', { class:'toggle' + (S().unlockAll ? ' on' : ''), onclick(){ S().unlockAll = !S().unlockAll; state.save(); ua.classList.toggle('on'); renderNav(); } }, 'Unlock all levels (override)');
    view.appendChild(h('div', { class:'card' },
      h('div', { class:'row' }, h('label', { class:'fld' }, 'Your name', nameIn)),
      h('p', null, ua), h('p', { class:'hint' }, 'By default, Intermediate lessons unlock after the Foundation lessons in that module are complete, and Advanced after Intermediate. The override opens everything.'),
      h('div', { class:'btnrow' },
        h('button', { class:'btn sec', onclick(){ const blob = new Blob([JSON.stringify(S(), null, 2)], { type:'application/json' }); const a = h('a', { href:URL.createObjectURL(blob), download:'marine-training-progress.json' }); document.body.appendChild(a); a.click(); a.remove(); } }, '⬇ Export progress'),
        h('label', { class:'btn sec' }, '⬆ Import progress', h('input', { type:'file', accept:'application/json', style:{ display:'none' }, onchange(e){ const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { state.replace(JSON.parse(t)); route(); } catch (er){ alert('Invalid file'); } }); } })),
        h('button', { class:'btn danger', onclick(){ if (confirm('Erase all progress and exam history on this device?')){ state.reset(); route(); } } }, 'Reset all progress'))));
    const nq = Object.values(T.questions).reduce((a, b) => a + b.length, 0), nl = T.order.reduce((a, m) => a + modLessons(m).length, 0);
    view.appendChild(h('h2', null, 'About'));
    view.appendChild(h('div', { class:'card' }, h('p', null, `${T.order.length} modules · ${nl} lessons · ${nq} exam questions. Works fully offline; progress is saved in this browser's local storage only.`),
      h('p', null, 'Brand and product content is deliberately general. Settings, part numbers, firmware behaviour and wiring details change between models and software versions – always use the manufacturer\'s current manuals, and comply with AS/NZS 3004, ISO 10133 / ISO 13297, ABYC guidance, your licence conditions and the vessel builder\'s documentation.'),
      h('p', { class:'hint' }, 'To add modules or questions, see README.md in the app folder.')));
  }

  /* ---------- boot ---------- */
  function applyTheme(){
    const t = S().theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t); $('#themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
  }
  $('#themeBtn').onclick = () => { S().theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; state.save(); applyTheme(); };
  $('#menuBtn').onclick = () => $('#sidebar').classList.toggle('open');
  $('#searchForm').onsubmit = e => { e.preventDefault(); const v = $('#searchInput').value.trim(); if (v) location.hash = '#/search/' + encodeURIComponent(v); };
  $('#searchInput').addEventListener('input', e => { const v = e.target.value.trim(); if (v.length >= 3) { clearTimeout(window.__st); window.__st = setTimeout(() => location.hash = '#/search/' + encodeURIComponent(v), 350); } });
  window.addEventListener('hashchange', route);
  applyTheme(); buildIndex(); route();
  window.__app = { route, overall, modProgress, buildExam, isDone };
})();
