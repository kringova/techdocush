import {mkdir,cp,readFile,readdir,writeFile,stat,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const arg=process.argv.indexOf('--site-directory');if(arg<0||!process.argv[arg+1])throw Error('Expected --site-directory <site checkout>');
const site=path.resolve(process.argv[arg+1]),source=fileURLToPath(new URL('../dist/',import.meta.url)),target=path.join(site,'static/play/corio');
await stat(path.join(site,'astro.config.mjs'));
try{await stat(target);const release=JSON.parse(await readFile(path.join(target,'release.json'),'utf8'));if(release.app!=='corio')throw Error('Refusing to replace an unrecognised directory');await rm(target,{recursive:true});}catch(error){if(error.code!=='ENOENT')throw error;}
await mkdir(target,{recursive:true});await cp(source,target,{recursive:true});
const files={};
async function scan(dir,prefix=''){for(const entry of await readdir(dir,{withFileTypes:true})){const name=prefix+entry.name;if(entry.isSymbolicLink())throw Error('Release symlinks are not supported');if(entry.isDirectory())await scan(path.join(dir,entry.name),name+'/');else files[name]=createHash('sha256').update(await readFile(path.join(dir,entry.name))).digest('hex');}}
await scan(source);const version=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8')).version;
let sourceCommit=process.env.GITHUB_SHA||'working-tree';try{sourceCommit=process.env.GITHUB_SHA||execFileSync('git',['rev-parse','HEAD'],{cwd:site,encoding:'utf8'}).trim();}catch{}
await writeFile(path.join(target,'release.json'),JSON.stringify({app:'corio',version,source_commit:sourceCommit,files},null,2)+'\n');
console.log(`Corio: ${Object.keys(files).length} files prepared for /play/corio/`);
