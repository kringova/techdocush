import {cp,readFile,writeFile,mkdir,rm,readdir,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const root=fileURLToPath(new URL('../',import.meta.url)),source=path.join(root,'dist'),output=path.join(root,'build/yandex');
const {version}=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
const config=JSON.parse(await readFile(path.join(root,'yandex.config.json'),'utf8'));
const counterId=Number(process.env.YANDEX_METRICA_COUNTER??config.metricaCounterId);
if(!Number.isSafeInteger(counterId)||counterId<0)throw Error('Invalid Yandex Metrica counter id');
const sha=data=>createHash('sha256').update(data).digest('hex');
async function files(dir,prefix=''){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){const rel=path.join(prefix,entry.name);if(entry.isDirectory())out.push(...await files(path.join(dir,entry.name),rel));else out.push(rel);}return out.sort();}
const sourceFiles=await files(source),sourceHashes=Object.fromEntries(await Promise.all(sourceFiles.map(async name=>[name,sha(await readFile(path.join(source,name)))])));
const sharedHash=sha(JSON.stringify(sourceHashes));
await mkdir(output,{recursive:true});
for(const game of ['sudoku','nonogram','wordsearch']){
 const dir=path.join(output,game);await rm(dir,{recursive:true,force:true});await cp(source,dir,{recursive:true});
 let html=await readFile(path.join(dir,'index.html'),'utf8');
 html=html.replace('<html lang="ru">',`<html lang="ru" data-platform="yandex" data-game="${game}" data-metrica="${counterId}">`)
  .replace('<body>','<body data-platform="yandex">')
  .replace(/<title>.*?<\/title>/,`<title>Клеточки: ${game==='sudoku'?'Судоку с объяснениями':game==='wordsearch'?'Поиск слов':'Японские кроссворды'}</title>`)
  .replace('</head>',`<link rel="stylesheet" href="./platform/yandex.css?v=${version}"><script src="/sdk.js"></script></head>`)
  .replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,'');
 await writeFile(path.join(dir,'index.html'),html);
 let css=await readFile(path.join(dir,'style.css'),'utf8');
 css=css.replace(/^@import[^\n]*\n/,'');
 css=`@font-face{font-family:'Golos Text';src:url('./fonts/golos-text.ttf') format('truetype');font-weight:400 900;font-display:swap}\n@font-face{font-family:'Literata';src:url('./fonts/literata.ttf') format('truetype');font-weight:200 900;font-display:swap}\n@font-face{font-family:'Literata';src:url('./fonts/literata-italic.ttf') format('truetype');font-style:italic;font-weight:200 900;font-display:swap}\n`+css;
 await writeFile(path.join(dir,'style.css'),css);
 const names=await files(dir);let size=0;const hashes={};
 for(const name of names){if(!/^[a-zA-Z0-9_./-]+$/.test(name))throw Error(`Unsupported archive filename: ${name}`);const data=await readFile(path.join(dir,name));hashes[name]=sha(data);size+=data.byteLength;}
 if(size>100*1024*1024)throw Error('Yandex unpacked size exceeds 100 MB');
 if(/https?:\/\//.test(html.replace('http://www.w3.org/2000/svg','')))throw Error('External URL in game HTML');
 if(/fonts\.google|@import/.test(css))throw Error('Remote font dependency');
 const manifest={version,profile:`yandex-${game}`,sharedHash,sourceHashes,hashes,unpackedBytes:size,analytics:{counterId,enabled:counterId>0}};
 await writeFile(path.join(dir,'release.json'),JSON.stringify(manifest,null,2)+'\n');
 const archive=path.join(output,`kletochki-${game}-${version}.zip`);
 execFileSync('python3',['-c','import pathlib,sys,zipfile; root=pathlib.Path(sys.argv[1]); z=zipfile.ZipFile(sys.argv[2],"w",zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root).as_posix()) for p in sorted(root.rglob("*")) if p.is_file()]; z.close()',dir,archive]);
 console.log(`${game}: ${archive} (${(await stat(archive)).size} bytes), shared ${sharedHash.slice(0,12)}`);
}
