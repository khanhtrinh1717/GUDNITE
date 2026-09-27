// Copy current, editable source files into an isolated public directory.
const fs=require('node:fs'),path=require('node:path');
const root=__dirname;
const out=path.resolve(root,'dist');
if(path.dirname(out)!==root||path.basename(out)!=='dist')throw Error('Invalid output directory');
if(fs.existsSync(out)&&fs.lstatSync(out).isSymbolicLink())throw Error('Output must not be a symlink');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
const files=['index.html','shop.html','product.html','checkout.html','site.js','checkout.js','theme.js','site.css','checkout.css','theme.css','brand.css'];
for(const file of files)fs.copyFileSync(path.join(root,file),path.join(out,file));
function copyImages(dir,dest){fs.mkdirSync(dest,{recursive:true});for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.isSymbolicLink())throw Error('Asset symlink not allowed');const source=path.join(dir,entry.name),target=path.join(dest,entry.name);if(entry.isDirectory())copyImages(source,target);else if(/\.(png|jpg|jpeg|webp|avif|svg|ico)$/i.test(entry.name))fs.copyFileSync(source,target);}}
copyImages(path.join(root,'assets'),path.join(out,'assets'));
console.log('Public website packaged in dist/; editable source left unchanged.');
