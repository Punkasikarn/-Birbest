const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.join(__dirname,'..');
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const control = () => ({value:'',events:{},attributes:{},isConnected:true,addEventListener(k,fn){this.events[k]=fn;},setAttribute(k,v){this.attributes[k]=v;},focus(){this.focused=true;}});
const parts = Object.fromEntries(['[data-shop-query]','[data-shop-group]','.crochet-grid','.shop-count','.shop-empty','[data-shop-reset]'].map(k=>[k,control()]));
const host = {dataset:{},querySelector:s=>parts[s]};
let catalogHost=host, section=null, routeHandler;
const dialogParts = Object.fromEntries(['.product-full','.product-caption','.product-counter','[data-close]','[data-prev]','[data-next]'].map(k=>[k,control()]));
const dialog = {...control(),querySelector:s=>dialogParts[s],showModal(){this.open=true;},close(){this.open=false;this.events.close();}};
const context = {window:{addEventListener(k,fn){if(k==='hashchange')routeHandler=fn;}},document:{querySelector(s){return s==='#route-view .shop-catalog'?catalogHost:s==='#shop-crochet-gallery'?section:null;},createElement(){return dialog;},body:{append(){}}}};
vm.createContext(context);
vm.runInContext(read('crochet-data.js'),context);
vm.runInContext(read('crochet-catalog.js'),context);
const api = context.window.BirbestCrochet;
assert.equal(api.products.length,53);
assert.equal(new Set(api.products.map(p=>p.slug)).size,53);
assert.ok(api.find('cockatiel-crochet'));
assert.ok(api.find('sun-conure-crochet'));
let imageCount=0;
const alternateCovers = new Set(['cockatiel-crochet','sun-conure-crochet','budgie-blue','caique-black-head','cockatiel-yellow-grey','cockatoo-greater','cockatoo-mitchell','cockatoo-moluccan','eclectus-green','macaw-hyacinth','monk-blue','monk-green','ringneck-green']);
for(const p of api.products){
  assert.equal(p.coverIndex ?? 0,alternateCovers.has(p.slug)?1:0);
  assert.ok(api.card(p).includes('src="assets/'+p.shots[p.coverIndex ?? 0].file+'"'));
  assert.equal(p.price,299);
  assert.match(p.slug,/^[a-z0-9-]+$/);
  assert.equal((api.card(p).match(/<img /g)||[]).length,1);
  for(const shot of p.shots){
    const bytes=fs.readFileSync(path.join(root,'assets',shot.file));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),shot.sha256);
    assert.ok(shot.width>0 && shot.height>0);
    imageCount++;
  }
}
assert.equal(imageCount,210);
api.mountCatalog();
assert.equal((parts['.crochet-grid'].innerHTML.match(/class="shop-product"/g)||[]).length,54);
assert.ok(parts['.crochet-grid'].innerHTML.indexOf('shop/daily-pack') < parts['.crochet-grid'].innerHTML.indexOf('shop/cockatiel-crochet'));
parts['[data-shop-group]'].value='Cockatiel';parts['[data-shop-group]'].events.change();
assert.equal(parts['.shop-count'].textContent,'6 รายการ');
parts['[data-shop-query]'].value='no-such-product';parts['[data-shop-query]'].events.input();
assert.equal(parts['.shop-empty'].hidden,false);
parts['[data-shop-reset]'].events.click();
assert.equal(parts['.shop-count'].textContent,'54 รายการ');
assert.ok(parts['[data-shop-query]'].focused);
assert.ok(api.filterItems('ค็อกคาเทล','').length>=6);
assert.equal(api.filterItems('', 'Daily Pack').length,1);
assert.ok(api.card(api.filterItems('', 'Daily Pack')[0]).includes('src="assets/daily-mixed-sachet.jpg"'));
catalogHost=null;
vm.runInContext(read('home-products.js'),context);
for(const p of api.products){
  const controls=Object.fromEntries(['[data-main-photo]','[data-main-image]','[data-image-count]'].map(k=>[k,control()]));
  const thumbs=p.shots.map((_,i)=>({...control(),dataset:{thumbnail:String(i)}}));
  section={dataset:{product:p.slug},querySelector:s=>controls[s],querySelectorAll:s=>s==='[data-thumbnail]'?thumbs:[]};
  routeHandler();
  assert.ok(section.innerHTML.includes('299 บาท'));
  assert.ok(section.innerHTML.includes('https://birbest.etsy.com/'));
  assert.ok(section.innerHTML.includes('https://shopee.co.th/birbest.official'));
  assert.equal((section.innerHTML.match(/data-thumbnail=/g)||[]).length,p.shots.length);
  thumbs.forEach((t,i)=>{t.events.click();assert.equal(controls['[data-main-image]'].src,'assets/'+p.shots[i].file);});
  controls['[data-main-photo]'].events.click();
  assert.equal(dialog.open,true);
  assert.equal(dialogParts['.product-full'].src,'assets/'+p.shots.at(-1).file);
  dialogParts['[data-close]'].events.click();
  assert.equal(dialog.open,false);
}
assert.ok(read('flow.js').includes("window.BirbestCrochet?.find(route.slice(5))"));
const flow=read('flow.js');
const branch=flow.slice(flow.indexOf('    const crochetProduct ='),flow.indexOf("    if(parts[0]==='learn'&&learningSpecies?.status!=='available-draft')"));
for(const p of api.products){
  const routeContext={route:'shop/'+p.slug,window:{BirbestCrochet:api,scrollTo(){}},view:{focus(){}},document:{},heading:t=>'<h1>'+t+'</h1>',esc:s=>s};
  vm.runInNewContext('(function(){'+branch+'})()',routeContext);
  assert.ok(routeContext.view.innerHTML.includes('data-product="'+p.slug+'"'));
  assert.equal(routeContext.document.title,p.title+' Crochet | Birbest');
}
const html=read('index.html');
assert.ok(html.indexOf('src="crochet-data.js"')<html.indexOf('src="crochet-catalog.js"'));
assert.ok(html.indexOf('src="crochet-catalog.js"')<html.indexOf('src="flow.js'));
console.log('PASS: 53 products, 210 unchanged image copies, all detail galleries and channels, catalog search/filter/reset, legacy slugs. Rendered review pending.');
