const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const sharp = require('sharp');
const assets = path.resolve(__dirname, '../assets');

async function main() {
  const originals = (await fs.readdir(assets)).filter(name => /^sun-conure-.*-20261018\.png$/.test(name)).sort();
  assert.equal(originals.length, 19, 'Expected 15 lesson covers and four supporting illustrations');
  let before = 0, after = 0;
  for (const name of originals) {
    const source = path.join(assets, name);
    const target = source.replace(/\.png$/, '.webp');
    await sharp(source).webp({lossless:true, effort:6}).toFile(target);
    const original = await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    const optimized = await sharp(target).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    assert.deepEqual(optimized.info, original.info, name + ': dimensions/channels');
    assert.ok(optimized.data.equals(original.data), name + ': decoded pixels must remain identical');
    const a = (await fs.stat(source)).size, b = (await fs.stat(target)).size;
    assert.ok(b < a, name + ': optimized file must be smaller');
    before += a; after += b;
    console.log(`${name}: ${a} -> ${b} bytes; identical pixels`);
  }
  console.log(JSON.stringify({files:originals.length, originalBytes:before, webpBytes:after, savedPercent:Number((100*(1-after/before)).toFixed(2))}));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
