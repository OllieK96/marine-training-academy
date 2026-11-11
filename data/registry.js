/* Central registry. All data files push into window.TRAINING. See README.md */
window.TRAINING = {
  passMark: 0.8,
  moduleExamSize: 15,
  finalPerModule: 2,
  paths: [], modules: {}, order: [], questions: {},
  diagrams: {}, matches: {}, scenarios: {}, interactives: {},
  addPath(p){ this.paths.push(p); },
  addModule(m){ this.modules[m.id] = m; this.order.push(m.id); },
  /* question: [text, [options...], correctIndex, explanation] */
  /* append lessons to an existing module (used by the manual-based expansion files) */
  addLessons(modId, lessons){ const m = this.modules[modId]; if (!m) { console.error('addLessons: no module', modId); return; } lessons.forEach(l => m.lessons.push(l)); },
  /* append extra blocks (and source keys) to an existing lesson */
  extend(modId, lessonId, blocks, srcKeys){ const m = this.modules[modId]; const l = m && m.lessons.find(x => x.id === lessonId); if (!l) { console.error('extend: no lesson', modId, lessonId); return; } (blocks || []).forEach(b => l.body.push(b)); if (srcKeys) l.src = (l.src || []).concat(srcKeys); },
  addQuestions(modId, arr){
    const list = this.questions[modId] = this.questions[modId] || [];
    arr.forEach((q, i) => list.push({ id: modId + '-' + (list.length + 1), q: q[0], o: q[1], a: q[2], e: q[3] }));
  }
};
