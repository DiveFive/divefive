import fs from 'node:fs'
import path from 'node:path'

const localesDir = path.join(process.cwd(), 'src', 'i18n', 'locales')
const locales = ['en', 'es-MX', 'fr']

function readLocale(locale) {
  const file = path.join(localesDir, `${locale}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function flatten(obj, prefix = '') {
  const entries = []
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flatten(value, nextKey))
    } else {
      entries.push(nextKey)
    }
  }
  return entries
}

const localeMaps = {}
const report = { locales: {}, missing: {} }

for (const locale of locales) {
  const data = readLocale(locale)
  localeMaps[locale] = data
  report.locales[locale] = flatten(data)
}

const referenceKeys = new Set(report.locales.en)

for (const locale of locales) {
  const keys = new Set(report.locales[locale])
  const missing = [...referenceKeys].filter(key => !keys.has(key))
  if (missing.length) {
    report.missing[locale] = missing
  }
}

const output = path.join(process.cwd(), 'scripts', 'i18n-report.json')
fs.writeFileSync(output, JSON.stringify(report, null, 2))

if (Object.keys(report.missing).length) {
  console.error('[i18n] Missing keys detected:', report.missing)
  process.exitCode = 1
} else {
  console.log('[i18n] All locales contain the same keys')
}
