const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const index = read('index.html');

// Repeated logos are navigation chrome. Content art in the home page must be unique.
const homeArt = [...index.matchAll(/<img src="assets\/([^"]+)"/g)].map(match => match[1])
  .filter(file => file !== 'birbest-rainbow-original.webp');
assert.equal(new Set(homeArt).size,homeArt.length,'Home content artwork must not repeat');
assert.ok(index.includes('data-art-needed="home-quiz-raptor"'));
assert.ok(index.includes('data-art-needed="postcard-village-day"'));
assert.ok(!index.includes('postcard" data-card="village"><a href="assets/home-village-layer.png"'));

const context = vm.createContext({});
for (const file of ['learning-catalog.js','sun-conure-content.js','learning-content.js','learning-reader.js']) {
  vm.runInContext(read(file),context);
}
for (const species of ['cockatiel','sun-conure']) {
  const page = context.BirbestLearningReader.render(context.BirbestLearning,species,'home/identification').html;
  if (species === 'cockatiel') {
    assert.ok(page.includes('assets/learn-cockatiel-leg-band-v1.webp'));
    assert.ok(!page.includes('data-art-needed='));
  } else {
    assert.ok(page.includes('assets/sun-conure-lesson-02-20261018.webp'));
    assert.ok(!page.includes('data-art-needed='));
  }
}
const cockatielArt = [
  ['welcome/cage','learn-cockatiel-cage-v2.webp'],
  ['behavior/guide','learn-cockatiel-trust-v2.webp'],
  ['home/safety','learn-cockatiel-home-safety-v2.webp'],
  ['health/guide','learn-cockatiel-health-v2.webp'],
  ['health/eggs','learn-cockatiel-eggs-v1.webp'],
  ['home/identification','learn-cockatiel-leg-band-v1.webp']
];
const delivered = new Set(cockatielArt.map(([,file]) => file));
for (const [lessonId,file] of cockatielArt) {
  const page = context.BirbestLearningReader.render(context.BirbestLearning,'cockatiel',lessonId).html;
  assert.equal((page.match(new RegExp(`assets/${file}`,'g')) || []).length,1,`${lessonId} must use its delivered image once`);
  for (const other of delivered) {
    if (other !== file) assert.ok(!page.includes(`assets/${other}`),`${lessonId} must not reuse ${other}`);
  }
}
const flow = read('flow.js');
assert.ok(flow.includes("'welcome/cage': 'learn-cockatiel-cage-v2.webp'"));
assert.ok(flow.includes("'home/identification': 'learn-cockatiel-leg-band-v1.webp'"));
assert.ok(flow.includes("'welcome/settling': 'learn-cockatiel-trust-v2.webp'"));
assert.ok(flow.includes("'health/guide': 'learn-cockatiel-health-v2.webp'"));
assert.ok(flow.includes("'health/eggs': 'learn-cockatiel-eggs-v1.webp'"));
console.log('PASS: no repeated home content art; both identification lessons use delivered artwork.');
