import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const LOCALES = ['en', 'es-MX', 'fr']
const IMAGE_EXT_PATTERN = /\.(png|jpe?g|webp|avif)$/i

const paths = {
  content: (...segments) => path.join(root, 'content', ...segments),
  publicData: (...segments) => path.join(root, 'public', '_data', ...segments),
  publicContent: (...segments) => path.join(root, 'public', 'content', ...segments)
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function readFileSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
}

function toCamelSlug(filename) {
  const base = filename.replace(/\.[^/.]+$/, '')
  const sanitized = base.replace(/^\d+-/, '')
  return sanitized.replace(/[-_]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase())
}

function writeJson(target, data) {
  ensureDir(path.dirname(target))
  fs.writeFileSync(target, JSON.stringify(data, null, 2))
}

function copyScreenshots() {
  for (const locale of LOCALES) {
    const srcDir = paths.content('screenshots', locale)
    const destDir = paths.publicContent('screenshots', locale)
    ensureDir(destDir)
    const entries = fs.existsSync(srcDir) ? fs.readdirSync(srcDir) : []
    const items = []

    for (const file of entries) {
      const fullSrc = path.join(srcDir, file)
      const stat = fs.statSync(fullSrc)
      if (!stat.isFile()) continue
      if (!IMAGE_EXT_PATTERN.test(file)) continue
      const destFile = path.join(destDir, file)
      fs.copyFileSync(fullSrc, destFile)
      const slug = toCamelSlug(file)
      items.push({ file: `/content/screenshots/${locale}/${file}`, slug })
    }

    writeJson(paths.publicData(`screenshots.${locale}.json`), items)
  }
}

function buildLegalManifest(name) {
  for (const locale of LOCALES) {
    const file = paths.content('legal', `${name}.${locale}.md`)
    const body = readFileSafe(file)
    writeJson(paths.publicData(`${name}.${locale}.json`), { body })
  }
}

function buildAppcopyManifest() {
  const dir = paths.content('appcopy')
  if (!fs.existsSync(dir)) {
    for (const locale of LOCALES) {
      writeJson(paths.publicData(`appcopy.${locale}.json`), {})
    }
    return
  }

  const entries = fs.readdirSync(dir)
  const localeMap = new Map()

  for (const file of entries) {
    const match = file.match(/^(?<name>[^.]+)\.(?<locale>[^.]+)\.md$/)
    if (!match) continue
    const { name, locale } = match.groups
    if (!LOCALES.includes(locale)) continue
    const body = readFileSafe(path.join(dir, file))
    if (!localeMap.has(locale)) {
      localeMap.set(locale, {})
    }
    localeMap.get(locale)[name] = { body }
  }

  for (const locale of LOCALES) {
    const payload = localeMap.get(locale) || {}
    writeJson(paths.publicData(`appcopy.${locale}.json`), payload)
  }
}

function cleanOutput() {
  const dataDir = paths.publicData()
  if (fs.existsSync(dataDir)) {
    fs.rmSync(dataDir, { recursive: true, force: true })
  }
  ensureDir(dataDir)
  const contentDir = paths.publicContent()
  if (fs.existsSync(contentDir)) {
    fs.rmSync(contentDir, { recursive: true, force: true })
  }
  ensureDir(contentDir)
}

function run() {
  cleanOutput()
  copyScreenshots()
  buildLegalManifest('privacy')
  buildLegalManifest('terms')
  buildAppcopyManifest()
  console.log('[build-manifests] Generated content manifests')
}

run()
