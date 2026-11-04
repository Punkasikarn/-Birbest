const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const ctx = vm.createContext({});
for(const name of ['learning-catalog.js','sun-conure-content.js','learning-content.js','learning-reader.js'])
  vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx);
const catalog = ctx.BirbestLearning;
for(const species of ['cockatiel','sun-conure']) {
  const lesson = catalog.getLesson(species,'home/identification');
  assert.equal(lesson.review,'pending-expert-review');
  assert.equal(lesson.questions.length,7);
  assert.equal(lesson.reuse,'shared');
  assert.ok(lesson.questions.every(q=>lesson.sources[q.source]));
  const html = ctx.BirbestLearningReader.render(catalog,species,'home/identification','','1').html;
  assert.ok(html.includes('ชื่อที่เรียกน้องและเบอร์โทรที่ติดต่อได้จริง'));
  assert.ok(html.includes('รหัสบนห่วงไม่ได้เชื่อมถึงชื่อและเบอร์เจ้าของโดยอัตโนมัติ'));
  assert.ok(html.includes('ถ้าเก็บนกได้'));
  assert.ok(html.includes('อย่าโพสต์รหัสเต็มต่อสาธารณะ'));
  assert.ok(html.includes('ขอรูปเดิม ลักษณะเฉพาะ หรือรหัสห่วง'));
  assert.ok(html.includes('อย่าตัด งัด หรือดึงห่วงออกเอง'));
  assert.ok(html.indexOf('class="lesson-alert"') < html.indexOf('class="food-question"'));
  assert.ok(html.includes('รอตรวจบทเรียบเรียงโดยสัตวแพทย์'));
  assert.ok(html.includes('https://vcahospitals.com/know-your-pet/leg-bands-and-identification'));
  assert.ok(html.includes(`#/learn/${species}/welcome/cage`));
  assert.ok(html.includes(`#/learn/${species}/welcome/location`));
  assert.equal(catalog.getCurriculum(species)[0].lessons[1].href,'home/identification');
  assert.ok(!html.includes('href="#/shop'));
}
assert.equal(catalog.getLesson('green-cheek','home/identification'),null);
assert.equal(catalog.getLesson('forpus','home/identification'),null);
const flow = fs.readFileSync(path.join(root,'flow.js'),'utf8');
const start = flow.indexOf('    const catalogSpeciesId=');
const end = flow.indexOf("    if(route==='learn')",start);
for(const species of ['cockatiel','sun-conure']) {
  const state = {
    isLegacyLearn:false,parts:['learn',species,'home','identification'],
    requestedRoute:`learn/${species}/home/identification`,
    raw:`/learn/${species}/home/identification?group=1`,
    learningSpecies:catalog.getSpecies(species),
    BirbestLearning:catalog,BirbestLearningReader:ctx.BirbestLearningReader,URLSearchParams,
    view:{innerHTML:'',focus(){},querySelectorAll(){return [];},querySelector(){return {scrollIntoView(){},focus(){}};}},
    document:{},window:{scrollTo(){}},requestAnimationFrame:fn=>fn()
  };
  vm.runInNewContext('(function(){'+flow.slice(start,end)+'})();',state);
  assert.ok(state.view.innerHTML.includes('ชื่อที่เรียกน้องและเบอร์โทรที่ติดต่อได้จริง'));
  assert.ok(state.document.title.includes('ห่วงขา'));
}
console.log('PASS: shared contact-band lesson, both species routes, sources, safety alert, and draft review.');
