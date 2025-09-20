// scripts/build-manifests.mjs
import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd(), OUT = path.join(root,'public','_data'), CONTENT = path.join(root,'content')
const LOCALES = ['en','es-MX','fr'], IMG_RE = /\.(png|jpe?g|webp|avif)$/i, TXT_RE = /\.(md|txt)$/i
const rd = f => fs.existsSync(f) ? fs.readFileSync(f,'utf8') : ''
const ls = d => fs.existsSync(d) ? fs.readdirSync(d) : []
const wj = (p,d)=>{ const o=path.join(OUT,p); fs.mkdirSync(path.dirname(o),{recursive:true}); fs.writeFileSync(o,JSON.stringify(d,null,2)); }

(function build(){
  fs.mkdirSync(OUT,{recursive:true})

  // Screenshots
  for(const l of LOCALES){
    const dir = path.join(CONTENT,'screenshots',l)
    const items = ls(dir).filter(f=>IMG_RE.test(f)).map(f=>({file:`/content/screenshots/${l}/${f}`,alt:`${l} screenshot: ${f.replace(/\.[^.]+$/, '')}`}))
    wj(`screenshots.${l}.json`, items)
  }

  // Legal
  for(const n of ['privacy','terms']){
    for(const l of LOCALES){
      const md = path.join(CONTENT,'legal',`${n}.${l}.md`), txt = path.join(CONTENT,'legal',`${n}.${l}.txt`)
      wj(`${n}.${l}.json`, { body: rd(fs.existsSync(md)? md : txt) })
    }
  }

  // Appcopy
  const ac = path.join(CONTENT,'appcopy'); const files = ls(ac).filter(f=>TXT_RE.test(f))
  const buckets = Object.fromEntries(LOCALES.map(l=>[l, {}]))
  for(const f of files){
    const m = f.match(/^(.+)\.(en|es-MX|fr)\.(md|txt)$/); if(!m) continue; const [,key,l] = m
    buckets[l][key] = { body: rd(path.join(ac,f)) }
  }
  for(const l of LOCALES){ wj(`appcopy.${l}.json`, buckets[l]) }

  console.log('[build-manifests] OK → public/_data')
})()
