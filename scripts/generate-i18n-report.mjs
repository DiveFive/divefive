import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const srcRoot = path.join(projectRoot, 'src')
const localesRoot = path.join(srcRoot, 'locales')
const reportPath = path.join(__dirname, 'i18n-report.json')

const USED_KEY_PATTERN = /\b(t|tm)\(\s*['\"]([^'\"`]+)['\"]/g

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(fullPath, files)
    } else if (/\.(vue|js|ts)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

async function collectUsedKeys() {
  const files = await walk(srcRoot)
  const keys = new Set()
  const objectKeys = new Set()
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    let match
    while ((match = USED_KEY_PATTERN.exec(content)) !== null) {
      const [, method, key] = match
      keys.add(key)
      if (method === 'tm') {
        objectKeys.add(key)
      }
    }
  }
  return { keys: Array.from(keys).sort(), objectKeys }
}

function flattenMessages(messages, prefix = '') {
  const result = {}
  for (const [key, value] of Object.entries(messages)) {
    const nextKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[nextKey] = '__object__'
      Object.assign(result, flattenMessages(value, nextKey))
    } else {
      result[nextKey] = value
    }
  }
  return result
}

async function loadLocales() {
  const entries = await fs.readdir(localesRoot, { withFileTypes: true })
  const locales = {}
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    const locale = path.basename(entry.name, '.json')
    const content = JSON.parse(await fs.readFile(path.join(localesRoot, entry.name), 'utf8'))
    locales[locale] = flattenMessages(content)
  }
  return locales
}

const { keys: usedKeys, objectKeys } = await collectUsedKeys()
const locales = await loadLocales()

const coverage = {}
const orphanKeys = {}

for (const [locale, messages] of Object.entries(locales)) {
  const missing = usedKeys.filter((key) => !(key in messages))
  const unused = Object.keys(messages).filter((key) => {
    if (messages[key] === '__object__') return false
    if (usedKeys.includes(key)) return false
    for (const objectKey of objectKeys) {
      if (key.startsWith(`${objectKey}.`)) {
        return false
      }
    }
    return true
  })
  coverage[locale] = {
    total: usedKeys.length,
    translated: usedKeys.length - missing.length,
    missing,
    coverage: usedKeys.length === 0 ? 1 : Number(((usedKeys.length - missing.length) / usedKeys.length).toFixed(3))
  }
  orphanKeys[locale] = unused.sort()
}

const report = {
  generatedAt: new Date().toISOString(),
  usedKeys,
  coverage,
  orphanKeys
}

await fs.writeFile(reportPath, JSON.stringify(report, null, 2))
console.log(`i18n report saved to ${reportPath}`)
