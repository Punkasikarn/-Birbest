const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({});
for (const file of ['learning-catalog.js','sun-conure-content.js','learning-content.js','learning-reader.js']) {
  vm.runInContext(read(file), context);
}
const catalog = context.BirbestLearning;
const reader = context.BirbestLearningReader;
const lesson = catalog.getLesson('cockatiel','health/eggs');
assert.equal(lesson.review,'pending-expert-review');
assert.equal(lesson.reader,'catalog');
assert.equal(lesson.questions.length,8);
assert.deepEqual(Array.from(new Set(lesson.questions.map(q=>q.group))).length,3);
for (const q of lesson.questions) assert.ok(lesson.sources[q.source]);
for (const species of ['green-cheek','forpus']) {
  assert.equal(catalog.getLesson(species,'health/eggs'),null);
}
const html = reader.render(catalog,'cockatiel','health/eggs','','2').html;
const sun = catalog.getLesson('sun-conure','health/eggs');
assert.equal(sun.questions.length,8);
assert.notDeepEqual(sun.questions,lesson.questions);
for (const q of sun.questions) assert.ok(sun.sources[q.source]);
const sunHtml = reader.render(catalog,'sun-conure','health/eggs','','2').html;
assert.ok(sunHtml.includes('sun-conure-lesson-13-20261018.webp'));
assert.ok(sunHtml.indexOf('class="lesson-alert"') < sunHtml.indexOf('class="food-question"'));
assert.ok(sunHtml.includes('ไม่บีบท้อง ดึงไข่ หรือหยอดน้ำมันเอง'));
assert.ok(sunHtml.includes('#/learn/sun-conure?section=daily'));
assert.ok(!/cockatiel|ค็อกคาเทล/.test(sunHtml));
assert.ok(html.indexOf('class="lesson-alert"') < html.indexOf('<details class="food-question">'));
assert.ok(html.includes('ไม่บีบท้อง ดึงไข่ หรือหยอดน้ำมันเอง'));
assert.ok(html.includes('รอตรวจบทเรียบเรียงโดยสัตวแพทย์'));
assert.ok(html.includes('#/learn/cockatiel/health/guide'));
assert.ok(html.includes('#/learn/cockatiel?section=daily'));
assert.ok(html.includes('?group=2" aria-current="location"'));
assert.ok(!/href="[^"]*(?:shop|daily-pack)|[0-9]+\s*(?:mg|มิลลิกรัม)/.test(html));
assert.ok(html.includes('assets/learn-cockatiel-eggs-v1.webp'));
assert.ok(!html.includes('assets/welcome-health.png'));

// Exercise the production dispatch for both canonical and legacy URLs.
const flow = read('flow.js');
const related = {innerHTML:''};
const navStart = flow.indexOf('    const lessonGroups=curriculum;');
const navEnd = flow.indexOf("    if(route==='learn'||",navStart);
vm.runInNewContext(flow.slice(navStart,navEnd),{
  curriculum:catalog.getCurriculum('cockatiel'),route:'learn/health/guide',
  esc:value=>String(value),
  view:{querySelector(){return related;},querySelectorAll(){return [];}}
});
assert.ok(related.innerHTML.includes('rel="next" href="#/learn/cockatiel/health/eggs"'));
const start = flow.indexOf('    const catalogSpeciesId=');
const end = flow.indexOf("    if(route==='learn')",start);
for (const legacy of [false,true]) {
  let focused = '';
  const state = {
    isLegacyLearn:legacy, parts:['learn','health','eggs'],
    requestedRoute:legacy?'learn/health/eggs':'learn/cockatiel/health/eggs',
    raw:legacy?'/learn/health/eggs?group=2':'/learn/cockatiel/health/eggs?group=2',
    learningSpecies:catalog.getSpecies('cockatiel'),
    BirbestLearning:catalog,BirbestLearningReader:reader,URLSearchParams,
    view:{innerHTML:'',focus(){},querySelectorAll(){return [];},
      querySelector(selector){focused=selector;return {scrollIntoView(){},focus(){}};}},
    document:{},window:{scrollTo(){}},requestAnimationFrame:fn=>fn()
  };
  vm.runInNewContext('(function(){'+flow.slice(start,end)+'})();',state);
  assert.ok(state.document.title.includes(lesson.title));
  assert.ok(state.view.innerHTML.includes('ไข่ค้าง'));
  assert.equal(focused,'#question-group-2');
}
console.log('PASS: egg-laying draft, sources, urgent notice, no sales/doses, species isolation, canonical/legacy routes and group focus.');
