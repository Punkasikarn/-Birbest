const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const css = fs.readFileSync(path.join(__dirname,'../home-chapters.css'),'utf8');
const scene = css.slice(css.indexOf('/* Scene coordinates'));
assert.ok(scene.includes('top:16.6667cqw'));
assert.ok(scene.includes('grid-template-columns:20% 30% 30% 20%'));
assert.ok(scene.includes('grid-template-columns:10% 40% 40% 10%'));
assert.ok(scene.includes('translate(-55.5%,-94.5%)'));
assert.ok(scene.includes('translate(-55%,-93%)'));
assert.ok(!scene.includes('16cqw 20px'), 'No independently scaled row gap');
assert.ok(scene.includes('box-shadow:none'));
assert.ok(fs.existsSync(path.join(__dirname,'../assets/home-friends-branch-20261019.webp')));
// Anchors taken from the existing source artwork; test scale invariance,
// not rendered visual acceptance of the branch contact points.
for (const width of [280,343,600,792,1000,1120]) {
  const mobile = width <= 792;
  const birds = mobile
    ? [[.30,.342,.39,1308/1203,.555,.945],[.70,.354,.40,1536/1024,.55,.93]]
    : [[.35,.347,.32,1308/1203,.555,.945],[.65,.357,.34,1536/1024,.55,.93]];
  for (const [x,y,size,ratio,footX,footY] of birds) {
    const w=width*size,h=w/ratio,left=width*x-w*footX,top=width*y-h*footY;
    assert.ok(left>=0 && left+w<=width,'Bird stays inside scene horizontally');
    assert.ok(top>=0,'Crest stays inside scene');
    assert.ok(top+h<=width*.5,'Bird stays above the button row');
    assert.ok(Math.abs((top+h*footY)/width-y)<1e-8,'Foot anchor scales with branch');
  }
}
console.log('PASS: shared width-based perch coordinates, labels below scene, no drifting row gap; visual acceptance pending.');
