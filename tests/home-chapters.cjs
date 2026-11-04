const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const nodes = [];
class Element {
  constructor(id='') {this.id=id;this.innerHTML='';this.dataset={};this.children=[];this.selectors={};this.classes=[];this.classList={add:name=>this.classes.push(name)};nodes.push(this);}
  querySelector(selector) {assert.ok(this.selectors[selector],`Unexpected selector ${selector}`);return this.selectors[selector];}
  querySelectorAll(selector) {return this.selectors[selector] || [];}
  detach() {if(this.parent)this.parent.children.splice(this.parent.children.indexOf(this),1);}
  append(node) {node.detach();this.children.push(node);node.parent=this;}
  before(node) {node.detach();const p=this.parent;p.children.splice(p.children.indexOf(this),0,node);node.parent=p;}
  after(node) {node.detach();const p=this.parent;p.children.splice(p.children.indexOf(this)+1,0,node);node.parent=p;}
  insertAdjacentHTML(position,html) {this.inserted={position,html};}
}
const home=new Element('home-view');
const hero=new Element('home'),ribbon=new Element('ribbon'),friends=new Element('friends'),stories=new Element('little-story'),today=new Element('today'),wonder=new Element('wonder'),products=new Element(),closing=new Element('closing');
for(const n of [hero,ribbon,friends,stories,today,wonder,products,closing]) home.append(n);
hero.innerHTML='EXISTING COVER AND CLOUDS';ribbon.innerHTML='EXISTING CURVED EDGE';
Object.assign(home.selectors,{'#today':today,'#friends':friends,'#wonder':wonder,'#little-story':stories,'.home-flow':[today,stories,products],'.closing':closing});
const friendCopies=[new Element(),new Element()];friends.selectors['.friend-copy']=friendCopies;
for(const copy of friendCopies)copy.selectors.button=new Element();
for(const selector of ['.wonder-intro h2','.wonder-intro .eyebrow'])wonder.selectors[selector]=new Element();
closing.selectors['.pill']=new Element();
const quizState={answered:true,score:2};wonder.quizState=quizState;
let school;
const document={querySelector:selector=>selector==='#home-view'?home:null,createElement:()=>{school=new Element();school.selectors['.school-journal']=new Element();return school;}};
const context=vm.createContext({document});vm.runInContext(read('home-chapters.js'),context);
assert.deepEqual(home.children.map(n=>n.id),['home','ribbon','today','friends','home-school','little-story','home-shop','closing']);
assert.equal(hero.innerHTML,'EXISTING COVER AND CLOUDS');assert.equal(ribbon.innerHTML,'EXISTING CURVED EDGE');
assert.equal(school.querySelector('.school-journal').children[0],wonder);
assert.equal(wonder.quizState,quizState,'Move live quiz without replacing state');
assert.ok(today.innerHTML.includes('Bird School')&&today.innerHTML.includes('Little Stories')&&today.innerHTML.includes('Birbest Shop'));
for(const name of ['school','stories','shop'])assert.ok(today.innerHTML.includes(`home-explore-${name}-20261019.webp`));
assert.ok(stories.innerHTML.includes('#/stories/millet-day')&&stories.innerHTML.includes('#/stories/sunny-song'));
assert.ok(products.innerHTML.includes('ไม่ใช่ภาพสินค้า'));
const markup=nodes.map(n=>n.innerHTML).join('');
const images=[...markup.matchAll(/<img[^>]*src="assets\/([^"]+)"/g)].map(m=>m[1]);
assert.equal(images.length,new Set(images).size,'New chapter images must be unique');
for(const image of images)assert.ok(fs.existsSync(path.join(root,'assets',image)),image);
const count=nodes.length;vm.runInContext(read('home-chapters.js'),context);assert.equal(nodes.length,count,'Composition is idempotent');
const css=read('home-chapters.css');
assert.match(css,/\.world-path img\{[^}]*object-fit:contain;[^}]*border-radius:0/);
assert.match(css,/#today\{background:#fff;/);
assert.ok(!css.includes('aspect-ratio:2/1'),'Mobile preserves the full scene too');
assert.ok(!/\.hero|\.layered-village|\.scene-spot/.test(css),'No cover artwork styling overrides');
assert.ok(css.includes('.welcome-ribbon{display:none}'),'Founder requested removal of the welcome ribbon');
assert.ok(css.includes('@media(max-width:700px)')&&css.includes('prefers-reduced-motion'));
assert.ok(read('index.html').includes('src="home-chapters.js"'));
console.log('PASS: chapter order, untouched cover/edge, live quiz retained, real story links, unique existing images, responsive rules. Browser layout not verified.');
