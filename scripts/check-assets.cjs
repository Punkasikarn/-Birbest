const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');const context={window:{}};let count=0;
for(const family of ['crochet','hat','sticker','keychain','shirt','bird-toy','pouch'])vm.runInNewContext(fs.readFileSync(path.join(root,family+'-data.js'),'utf8'),context);
for(const values of Object.values(context.window))if(Array.isArray(values))for(const product of values)for(const shot of product.shots||[]){const f=path.join(root,'assets',shot.file);if(!fs.existsSync(f))throw Error('Missing '+shot.file);count++;}
console.log(`${count} catalog photo references resolve to uploaded assets.`);
