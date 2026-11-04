const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const results = require('../tools/image-optimization-results.json');
assert.equal(results.length, 12);
for (const row of results) {
  assert.ok(row.visiblePixelsUnchanged, row.name);
  assert.equal(fs.statSync(path.join(root, 'assets', row.name + '.png')).size, row.original);
  assert.equal(fs.statSync(path.join(root, 'assets', row.name + '.webp')).size, row.optimized);
  assert.ok(row.optimized < row.original, row.name);
}
for (const file of fs.readdirSync(root).filter(f => /\.(js|html|css)$/.test(f))) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/assets\/[a-zA-Z0-9_-]+\.webp/g)) assert.ok(fs.existsSync(path.join(root, match[0])), match[0]);
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for(const name of ['learn-sun-conure-cover-v1','learn-home-safety-room-v1','about-two-friends-world-v1']) {
  const png=fs.readFileSync(path.join(root,'assets',name+'.png'));
  const webp=fs.readFileSync(path.join(root,'assets',name+'.webp'));
  assert.equal(png.readUInt32BE(16),1536);
  assert.equal(png.readUInt32BE(20),1024);
  assert.equal(webp.toString('ascii',8,12),'WEBP');
  assert.ok(webp.length<png.length);
}
const flow=fs.readFileSync(path.join(root,'flow.js'),'utf8');
const safetyLine=flow.split('\n').find(line=>line.includes("if(route==='learn/home/safety')view.querySelector"));
assert.ok(safetyLine);
let insertions=0;
vm.runInNewContext(safetyLine,{route:'learn/home/safety',view:{querySelector(selector){
  assert.equal(selector,'article .lesson-alert');
  return {insertAdjacentHTML(position,markup){
    insertions++;assert.equal(position,'afterend');
    assert.ok(markup.includes('learn-cockatiel-home-safety-v2.webp'));
    assert.ok(markup.includes('loading="lazy"'));
    assert.ok(markup.includes('<figcaption>'));
  }};
}}});
assert.equal(insertions,1);
for (const name of ['home-cover']) {
  assert.ok(html.includes(`href="assets/${name}.png"`), 'Original download ' + name);
  assert.ok(html.includes(`src="assets/${name}.webp"`), 'Optimized preview ' + name);
}
assert.ok(!html.includes('href="assets/home-village-layer.png"'), 'Village art is reserved for the home scene, not repeated as a postcard');
const home = results.slice(0, 6);
const about = results.filter(r => ['learn-foraging','learn-trust','learn-cleaning','learn-food-types'].includes(r.name));
for (const [group, rows] of [['All images',results],['Home scene',home],['About added images',about]]) {
  const before = rows.reduce((s,r) => s+r.original,0), after = rows.reduce((s,r) => s+r.optimized,0);
  console.log(`${group}: ${(before/1048576).toFixed(2)} -> ${(after/1048576).toFixed(2)} MiB (${Math.round((1-after/before)*100)}% smaller)`);
}
console.log('PASS: original files, optimized sizes, static WebP paths and PNG downloads. Not a browser loading benchmark.');
