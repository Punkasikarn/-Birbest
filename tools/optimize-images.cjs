const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(require.resolve('sharp', {paths: [process.env.NODE_PATH || '', 'C:/Users/punka/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules']}));
const root = path.resolve(__dirname, '..');
const names = ['home-village-layer', 'mascot-udon', 'mascot-raptor', 'village-residents', 'hero-cloud', 'birbest-rainbow-original', 'about-care', 'learn-foraging', 'learn-trust', 'learn-cleaning', 'learn-food-types', 'home-cover'];

async function main() {
  const results = [];
  for (const name of names) {
    const input = path.join(root, 'assets', name + '.png');
    const output = path.join(root, 'assets', name + '.webp');
    await sharp(input).webp({lossless: true, effort: 6}).toFile(output);
    const before = await sharp(input).ensureAlpha().raw().toBuffer({resolveWithObject: true});
    const after = await sharp(output).ensureAlpha().raw().toBuffer({resolveWithObject: true});
    if (before.info.width !== after.info.width || before.info.height !== after.info.height) throw Error(name + ': dimensions changed');
    // Encoders may discard invisible RGB beneath fully transparent pixels.
    for (let i = 0; i < before.data.length; i += 4) {
      if (before.data[i + 3] !== after.data[i + 3]) throw Error(name + ': alpha changed');
      if (before.data[i + 3] && !before.data.subarray(i, i + 3).equals(after.data.subarray(i, i + 3))) throw Error(name + ': visible pixels changed');
    }
    const original = (await fs.stat(input)).size;
    const optimized = (await fs.stat(output)).size;
    if (optimized >= original) throw Error(name + ': no size improvement; do not switch references');
    results.push({name, original, optimized, savedPercent: Math.round((1 - optimized / original) * 100), width: before.info.width, height: before.info.height, visiblePixelsUnchanged: true});
  }
  await fs.writeFile(path.join(__dirname, 'image-optimization-results.json'), JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify(results, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
