// scripts/build-manifests.mjs
import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const OUT = path.join(root, 'public', '_data')
const CONTENT = path.join(root, 'content')
const LOCALES = ['en', 'es-MX', 'fr']
const IMG_RE = /\.(png|jpe?g|webp|avif)$/i
const TXT_RE = /\.(md|txt)$/i
const DEFAULT_APP_STORE_URL =
  'https://apps.apple.com/mx/app/divefive-be-a-better-diver/id6749786184?l=en-GB'

const rd = (file) => (fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '')
const ls = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir) : [])
const wj = (relative, data) => {
  const output = path.join(OUT, relative)
  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, JSON.stringify(data, null, 2))
}

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const paragraphize = (value = '') => {
  const lines = value.split(/\r?\n/)
  const blocks = []
  let listBuffer = []

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(`<ul>${listBuffer.join('')}</ul>`)
      listBuffer = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      continue
    }

    if (line.startsWith('- ')) {
      listBuffer.push(`<li>${escapeHtml(line.slice(2).trim())}</li>`)
      continue
    }

    flushList()

    const headingMatch = line.match(/^#{1,6}\s+(.*)$/)
    if (headingMatch) {
      blocks.push(`<h3>${escapeHtml(headingMatch[1].trim())}</h3>`)
      continue
    }

    blocks.push(`<p>${escapeHtml(line)}</p>`)
  }

  flushList()

  return blocks.join('')
}

const parseFeatureFile = (filePath, fileName) => {
  const raw = rd(filePath).trim()
  if (!raw) return null

  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|txt)$/)
  const id = match ? `${match[1]}-${match[2]}` : fileName.replace(/\.(md|txt)$/i, '')
  const date = match ? match[1] : undefined

  const lines = raw.split(/\r?\n/)
  let title = ''
  let bodyLines = [...lines]

  if (bodyLines.length) {
    const first = bodyLines[0].trim()
    if (/^#{1,6}\s+/.test(first)) {
      title = first.replace(/^#{1,6}\s+/, '').trim()
      bodyLines = bodyLines.slice(1)
    }
  }

  if (!title) {
    const firstContentIndex = bodyLines.findIndex((line) => line.trim().length > 0)
    if (firstContentIndex >= 0) {
      title = bodyLines[firstContentIndex].trim()
      bodyLines = bodyLines.slice(firstContentIndex + 1)
    }
  }

  const html = paragraphize(bodyLines.join('\n').trim())

  if (!title && !html) return null

  return {
    id,
    ...(title ? { title } : {}),
    ...(date ? { date } : {}),
    body: html,
  }
}

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

  // Features (New Features section)
  for (const locale of LOCALES) {
    const dir = path.join(CONTENT, 'features', locale)
    const files = ls(dir).filter((file) => TXT_RE.test(file))
    const items = files
      .map((file) => parseFeatureFile(path.join(dir, file), file))
      .filter(Boolean)
      .map((item) => item)

    items.sort((a, b) => {
      if (a.date && b.date && a.date !== b.date) {
        return b.date.localeCompare(a.date)
      }
      return b.id.localeCompare(a.id)
    })

    wj(`features.${locale}.json`, items)
  }

  // App Store links
  for (const locale of LOCALES) {
    const file = path.join(CONTENT, 'brand', `appStoreLink.${locale}.txt`)
    const url = rd(file).trim() || DEFAULT_APP_STORE_URL
    wj(`appstore.${locale}.json`, { url })
  }

  console.log('[build-manifests] OK → public/_data')
})()
