const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'../home-motion.js'),'utf8');
function run(reduce=false, supported=true) {
  const events={},winEvents={},props={},attrs={},observers=[],frames=[];
  let cancelled=0,played=0;
  const image={dataset:{},animate(){played++;return {cancel(){cancelled++},addEventListener(){},pause(){},play(){}}}};
  const control={setAttribute(k,v){attrs[k]=v},addEventListener(k,v){events[k]=v}};
  const heading={append(node){assert.equal(node,control)}};
  const entry={querySelector(){return heading},getBoundingClientRect(){return {top:400}}};
  const home={dataset:{},style:{setProperty(k,v){props[k]=v}},querySelector(){return entry},querySelectorAll(){return [image]},getClientRects(){return [1]}};
  const preference={matches:reduce,addEventListener(k,v){events.preference=v}};
  const window={innerHeight:800,matchMedia(){return preference},addEventListener(k,v){winEvents[k]=v}};
  class Observer {constructor(fn){this.fn=fn;observers.push(this)} observe(){} unobserve(){}}
  if(supported)window.IntersectionObserver=Observer;
  vm.runInNewContext(source,{window,document:{hidden:false,querySelector(){return home},createElement(){return control},addEventListener(){}},IntersectionObserver:Observer,requestAnimationFrame(fn){frames.push(fn);return frames.length}});
  frames.shift()();
  assert.equal(home.dataset.motion,reduce?'paused':'playing');
  assert.equal(attrs['aria-pressed'],String(reduce));
  if(supported)observers[0].fn([{target:image,isIntersecting:true}]);
  assert.equal(played,!reduce&&supported?1:0);
  if(!reduce){events.click();assert.equal(home.dataset.motion,'paused');assert.equal(props['--cloud-arrival'],'1');assert.equal(cancelled,supported?1:0)}
  preference.matches=true;events.preference();assert.equal(home.dataset.motion,'paused');
  assert.ok(winEvents.hashchange && winEvents.resize && winEvents.scroll);
}
run();run(true);run(false,false);
assert.ok(!source.includes('preventDefault'));
console.log('PASS: motion toggle, reduced motion, animation cancellation, observer fallback and native scrolling. Rendered acceptance pending.');
