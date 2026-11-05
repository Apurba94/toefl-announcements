/* Announcement Listening: campus announcements with questions about what, when and why. */
(function () {
  'use strict';
  const items = (data) => SK.listeningItems(data.listening.filter((x) => x.kind === 'announcement'));
  const App = {
    about: 'Announcements give practical information fast: a fire drill, a workshop, a change of bus route. Listen to original campus announcements read aloud and answer questions on what is happening, when, where and why, as in the updated TOEFL Listening section.',
    how: ['Before pressing Play, think: what, when, where, why?', 'Listen once in **Practice**, then answer.', 'Read the text afterwards and notice the key words you missed.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { const all = items(ctx.data); SK.quizStarter(el, { title: 'Announcements', sizes: [2, 4, 6], make: (t, n, s) => SK.takeGroups(SK.rng(s), all, n), seconds: (n) => n * 45 }); } },
      { id: 'voices', label: 'Voices', render(el) { el.appendChild(SK.card('Voice and speed', SK.voicePicker())); } },
    ],
    items,
    checks: { 'every announcement question is valid and has its text': (data, assert) => { const all = items(data); assert.ok(all.length >= 6); for (const it of all) { assert.ok(it.audio.text.length > 100); assert.deepEqual(SK.validateItem(it), []); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
