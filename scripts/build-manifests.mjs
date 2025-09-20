import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const contentRoot = path.join(projectRoot, 'content')
const outputRoot = path.join(projectRoot, 'public', '_data')

const MARKDOWN_EXT = '.md'
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg'])

await fs.mkdir(outputRoot, { recursive: true })

function toKey(segment) {
  return segment
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part, index) => (index === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()))
    .join('')
}

function parseFileName(fileName) {
  const [base, locale] = fileName.split('.')
  if (!base || !locale) return null
  return { slug: toKey(base), locale }
}

function markdownToBlocks(content) {
  return content
    .replace(/\r\n?/g, '\n')
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}

function ensureNested(target, segments) {
  return segments.reduce((acc, segment) => {
    const key = toKey(segment)
    if (!acc[key]) acc[key] = {}
    return acc[key]
  }, target)
}

async function collectMarkdown(relativeDir) {
  const dirPath = path.join(contentRoot, relativeDir)
  const result = {}

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const nested = await collectMarkdown(path.join(relativeDir, entry.name))
        if (Object.keys(nested).length > 0) {
          result[toKey(entry.name)] = nested
        }
      } else if (entry.isFile() && entry.name.endsWith(MARKDOWN_EXT)) {
        const info = parseFileName(path.parse(entry.name).name)
        if (!info) continue
        const filePath = path.join(dirPath, entry.name)
        const text = await fs.readFile(filePath, 'utf8')
        const blocks = markdownToBlocks(text)
        const target = ensureNested(result, [])
        target[info.slug] ??= {}
        target[info.slug][info.locale] = blocks
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  return result
}

async function collectAppCopy() {
  const dirPath = path.join(contentRoot, 'appcopy')
  const result = {}

  async function walk(currentDir, segments = []) {
    let entries
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true })
    } catch (error) {
      if (error.code === 'ENOENT') return
      throw error
    }

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        await walk(entryPath, [...segments, entry.name])
        continue
      }

      if (!entry.isFile() || !entry.name.endsWith(MARKDOWN_EXT)) continue
      const info = parseFileName(path.parse(entry.name).name)
      if (!info) continue
      const text = await fs.readFile(entryPath, 'utf8')
      const blocks = markdownToBlocks(text)
      const container = ensureNested(result, segments)
      container[info.slug] ??= {}
      container[info.slug][info.locale] = blocks
    }
  }

  await walk(dirPath)
  return result
}

async function collectScreenshots() {
  const dirPath = path.join(contentRoot, 'screenshots')
  const manifest = {}

  let locales
  try {
    locales = await fs.readdir(dirPath, { withFileTypes: true })
  } catch (error) {
    if (error.code === 'ENOENT') return manifest
    throw error
  }

  for (const localeDir of locales) {
    if (!localeDir.isDirectory()) continue
    const locale = localeDir.name
    const localePath = path.join(dirPath, locale)
    const entries = await fs.readdir(localePath, { withFileTypes: true })
    const items = []

    for (const entry of entries) {
      const entryPath = path.join(localePath, entry.name)
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (ext === '.json') {
          const data = JSON.parse(await fs.readFile(entryPath, 'utf8'))
          if (Array.isArray(data)) {
            items.push(...data)
          }
        } else if (IMAGE_EXTENSIONS.has(ext)) {
          items.push({ src: `/content/screenshots/${locale}/${entry.name}` })
        }
      }
    }

    manifest[locale] = items
  }

  return manifest
}

const legal = await collectMarkdown('legal')
const appcopy = await collectAppCopy()
const screenshots = await collectScreenshots()

await fs.writeFile(path.join(outputRoot, 'legal.json'), JSON.stringify(legal, null, 2))
await fs.writeFile(path.join(outputRoot, 'appcopy.json'), JSON.stringify(appcopy, null, 2))
await fs.writeFile(path.join(outputRoot, 'screenshots.json'), JSON.stringify(screenshots, null, 2))

console.log('Generated manifests in public/_data')
