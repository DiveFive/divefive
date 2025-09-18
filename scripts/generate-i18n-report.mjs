#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..')
const SRC_ROOT = path.join(ROOT, 'src')
const REPORT_PATH = path.join(ROOT, 'scripts', 'i18n-report.json')
const TARGET_EXTENSIONS = new Set(['.ts', '.js', '.tsx', '.jsx', '.vue'])

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

function extractKeys(filePath, content) {
  const lines = content.split(/\r?\n/)
  const matches = []
  const pattern = /(?<![A-Za-z0-9_])(i18n\.)?t\(\s*(['"`])([^'"`]+)\2/g
  lines.forEach((line, index) => {
    let match
    while ((match = pattern.exec(line))) {
      matches.push({ key: match[3], line: index + 1 })
    }
  })
  return matches
}

async function buildReport() {
  const files = await walk(SRC_ROOT)
  const report = {
    generatedAt: new Date().toISOString(),
    filesScanned: files.length,
    keys: {},
  }

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8')
    const matches = extractKeys(file, content)
    const relativePath = path.relative(ROOT, file)
    for (const match of matches) {
      if (!report.keys[match.key]) {
        report.keys[match.key] = []
      }
      report.keys[match.key].push({ file: relativePath, line: match.line })
    }
  }

  report.totalKeys = Object.keys(report.keys).length
  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8')
  console.log(`i18n report generated with ${report.totalKeys} keys.`)
}

buildReport().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
