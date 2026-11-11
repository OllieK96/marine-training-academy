/* Question helper for the product-based modules.
   TRAINING.addQ(modId, rows) where row = [question, correct answer, wrong1, wrong2, wrong3, explanation].
   The correct answer is placed at a deterministic pseudo-random position (the exam also shuffles at run time). */
TRAINING.addQ = function(modId, rows){
  let seed = 7; for (let i = 0; i < modId.length; i++) seed = (seed * 31 + modId.charCodeAt(i)) % 2147483647;
  const rnd = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
  this.addQuestions(modId, rows.map(r => {
    const opts = [r[1], r[2], r[3], r[4]].filter(x => x != null);
    const pos = Math.floor(rnd() * opts.length), ans = opts.shift();
    opts.splice(pos, 0, ans);
    return [r[0], opts, pos, r[5]];
  }));
};
