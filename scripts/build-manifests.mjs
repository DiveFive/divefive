#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..')
const CONTENT_ROOT = path.join(ROOT, 'content')
const PUBLIC_ROOT = path.join(ROOT, 'public')
const DATA_ROOT = path.join(PUBLIC_ROOT, '_data')
const SCREENSHOT_PUBLIC = path.join(PUBLIC_ROOT, 'assets', 'screenshots')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function clearDirectory(dir) {
  await ensureDir(dir)
  const entries = await fs.readdir(dir)
  await Promise.all(entries.map((entry) => fs.rm(path.join(dir, entry), { recursive: true, force: true })))
}

function parseFrontMatter(raw) {
  if (!raw.startsWith('---')) {
    return { meta: {}, body: raw }
  }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) {
    return { meta: {}, body: raw }
  }
  const header = raw.slice(3, end).trim()
  const body = raw.slice(end + 4)
  const meta = {}
  for (const line of header.split(/\r?\n/)) {
    const [key, ...rest] = line.split(':')
    if (!key) continue
    meta[key.trim()] = rest.join(':').trim()
  }
  return { meta, body }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInline(text) {
  let result = escapeHtml(text)
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>')
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>')
  result = result.replace(/\[(.+?)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  return result
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/)
  const html = []
  let listBuffer = []
  let paragraph = []

  const flushParagraph = () => {
    if (paragraph.length) {
      const text = paragraph.join(' ')
      html.push(`<p>${renderInline(text)}</p>`)
      paragraph = []
    }
  }

  const flushList = () => {
    if (listBuffer.length) {
      const items = listBuffer.map((item) => `<li>${renderInline(item)}</li>`).join('')
      html.push(`<ul>${items}</ul>`)
      listBuffer = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    if (line.startsWith('#')) {
      const level = Math.min(6, line.match(/^#+/)[0].length)
      const content = line.slice(level).trim()
      flushParagraph()
      flushList()
      html.push(`<h${level}>${renderInline(content)}</h${level}>`)
      continue
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph()
      listBuffer.push(line.slice(2).trim())
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  flushList()

  return html.join('\n')
}

function parseContentFilename(filename) {
  const ext = path.extname(filename)
  const locale = path.extname(path.basename(filename, ext)).slice(1)
  const slug = path.basename(filename, `.${locale}${ext}`)
  return { slug, locale }
}

async function processMarkdownDirectory(subdir, type) {
  const directory = path.join(CONTENT_ROOT, subdir)
  let files = []
  try {
    files = await fs.readdir(directory)
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw error
  }

  await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const filepath = path.join(directory, file)
        const raw = await fs.readFile(filepath, 'utf-8')
        const { meta, body } = parseFrontMatter(raw)
        const { slug, locale } = parseContentFilename(file)
        const html = renderMarkdown(body.trim())
        const payload = {
          slug,
          locale,
          html,
          meta: {
            title: meta.title ?? '',
            description: meta.description ?? '',
            updated: meta.updated ?? '',
          },
        }
        const output = path.join(DATA_ROOT, `${type}.${slug}.${locale}.json`)
        await fs.writeFile(output, JSON.stringify(payload, null, 2), 'utf-8')
      }),
  )
}

async function processScreenshots() {
  const directory = path.join(CONTENT_ROOT, 'screenshots')
  let locales = []
  try {
    locales = await fs.readdir(directory)
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw error
  }

  for (const locale of locales) {
    const localeDir = path.join(directory, locale)
    const stat = await fs.stat(localeDir)
    if (!stat.isDirectory()) continue
    const targetDir = path.join(SCREENSHOT_PUBLIC, locale)
    await ensureDir(targetDir)
    const files = await fs.readdir(localeDir)
    const manifest = []
    for (const file of files) {
      const source = path.join(localeDir, file)
      const dest = path.join(targetDir, file)
      const fileStat = await fs.stat(source)
      if (fileStat.isDirectory()) continue
      await fs.copyFile(source, dest)
      manifest.push({
        filename: file,
        src: `assets/screenshots/${locale}/${file}`,
      })
    }
    const output = path.join(DATA_ROOT, `screenshots.${locale}.json`)
    await fs.writeFile(output, JSON.stringify({ locale, items: manifest }, null, 2), 'utf-8')
  }
}

async function main() {
  await ensureDir(PUBLIC_ROOT)
  await clearDirectory(DATA_ROOT)
  await clearDirectory(SCREENSHOT_PUBLIC)
  await processMarkdownDirectory('appcopy', 'appcopy')
  await processMarkdownDirectory('legal', 'legal')
  await processScreenshots()
  console.log('DiveFive content manifests generated.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
