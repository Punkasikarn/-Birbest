const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..');
const context = {window:{location:{hash:''}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'marketplace-links.js'),'utf8'),context);
const source=fs.readFileSync(path.join(root,'home-products.js'),'utf8');
const catalogSource=fs.readFileSync(path.join(root,'crochet-catalog.js'),'utf8');
assert.ok(!source.includes('class="product-price"'));
assert.ok(!catalogSource.includes('class="product-price"'));
assert.ok(!source.includes('data-pack-price'));
assert.ok(!source.includes('<b>${pack.price}'));
assert.ok(source.includes('ราคา ค่าจัดส่ง และโปรโมชันเป็นไปตามแต่ละช่องทาง'));
vm.runInContext(source.slice(source.indexOf('  function detailMarkup'),source.indexOf('  function bindDetail')),context);
const links=context.window.BirbestMarketplaceLinks;
assert.equal(Object.keys(links).length,88);
for(const [slug,channels] of Object.entries(links)){
 context.window.location.hash='#/shop/'+slug;
 const html=context.detailMarkup([['x','x','x',1,1]],'x','x','','',true);
 assert.ok(html.includes(channels.shopee));
 assert.equal(html.includes('ซื้อบน Etsy'),Boolean(channels.etsy));
 if(channels.etsy)assert.ok(html.includes(channels.etsy));
}
assert.equal(links['sun-conure-keychain-as04'].etsy,undefined);
assert.equal(links['forpus'].shopee,'https://shopee.co.th/product/1289399006/27757727198');
console.log('88 product purchase mappings and Etsy visibility passed');
