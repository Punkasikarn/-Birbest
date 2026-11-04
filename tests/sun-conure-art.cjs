const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
for (const file of ['learning-catalog.js','sun-conure-content.js','learning-content.js','learning-reader.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
}
const ids = ['welcome/cage','home/identification','welcome/location','welcome/setup','welcome/first-meal','welcome/settling','welcome/health','food/guide','home/cleaning','home/sleep','home/safety','health/guide','health/eggs','behavior/guide'];
const render = id => context.BirbestLearningReader.render(context.BirbestLearning,'sun-conure',id).html;
const hub = render('');
const deliveredPngs = fs.readdirSync(path.join(root,'assets')).filter(file => /^sun-conure-.*-20261018\.png$/.test(file));
assert.equal(deliveredPngs.length,19,'All original supplied images are retained');
const allPages = context.BirbestLearning.getCurriculum('sun-conure').flatMap(g=>g.lessons).map(l=>render(l.href)).join('');
for (const png of deliveredPngs) {
  const webp = png.replace(/\.png$/,'.webp');
  assert.ok(allPages.includes(webp),`${webp}: used in rendered lessons`);
  assert.ok(!allPages.includes(png),`${png}: original is not loaded by lessons`);
  assert.ok(fs.statSync(path.join(root,'assets',webp)).size < fs.statSync(path.join(root,'assets',png)).size);
}
const settling = render('welcome/settling');
const separateRooms = 'sun-conure-settling-separate-rooms-20261018.webp';
assert.equal(settling.split(separateRooms).length - 1, 1);
assert.ok(settling.indexOf(separateRooms) > settling.indexOf('มีนกอยู่แล้ว ให้เจอกันเลยได้ไหม?'));
assert.ok(!hub.includes(separateRooms), 'Supporting illustration stays inside the lesson');
assert.ok(fs.existsSync(path.join(root,'assets',separateRooms)));
assert.ok(hub.includes('aspect-ratio:3/2;object-fit:cover'), 'Card images fill their frames without distortion');
assert.ok(!hub.includes('object-fit:contain'), 'No letterboxing on overview cards');
const images = [...hub.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]);
assert.equal(images.length,new Set(images).size,'No repeated overview artwork');
ids.forEach((id,index)=>{
  const file = `sun-conure-lesson-${String(index+1).padStart(2,'0')}-20261018.webp`;
  const card = hub.split(`href="#/learn/sun-conure/${id}"`)[1]?.split('</a>')[0];
  assert.ok(card?.includes(file),`${id}: correct overview image`);
  const page = render(id);
  assert.ok(page.includes(file),`${id}: correct lesson image`);
  assert.ok(!page.includes('data-art-needed='));
  assert.ok(fs.existsSync(path.join(root,'assets',file)));
});
assert.ok(render('health/guide').indexOf('lesson-alert') < render('health/guide').indexOf('<img'));
console.log('PASS: all 14 supplied images match their overview cards and lessons; no repeated overview images.');
