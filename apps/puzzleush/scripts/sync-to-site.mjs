import {mkdir,readdir,readFile,writeFile,cp,rm,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const source=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const index=process.argv.indexOf('--site-directory');
if(index<0||!process.argv[index+1])throw Error('Use --site-directory <techdocush checkout>');
const site=path.resolve(process.argv[index+1]);
await stat(path.join(site,'astro.config.mjs'));
const target=path.join(site,'static/play');
try{await stat(target);await readFile(path.join(target,'release.json'));await rm(target,{recursive:true});}catch(e){if(e.code!=='ENOENT')throw e;}
await mkdir(target,{recursive:true});await cp(source,target,{recursive:true});
const files={};
async function scan(dir,prefix=''){for(const f of await readdir(dir,{withFileTypes:true})){const rel=prefix+f.name;if(f.isSymbolicLink())throw Error('Symlinks are not release files');if(f.isDirectory())await scan(path.join(dir,f.name),rel+'/');else files[rel]=createHash('sha256').update(await readFile(path.join(dir,f.name))).digest('hex');}}
await scan(source);let commit='working-tree';
try{if(!execFileSync('git',['status','--porcelain','--untracked-files=normal','--',path.dirname(source)],{cwd:site,encoding:'utf8'}).trim())commit=execFileSync('git',['rev-parse','HEAD'],{cwd:site,encoding:'utf8'}).trim();}catch{}
const version=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8')).version;
await writeFile(path.join(target,'release.json'),JSON.stringify({app:'puzzleush',version,source_commit:commit,files},null,2)+'\n');
console.log(`Клеточки: ${Object.keys(files).length} файлов подготовлены для /play/`);
