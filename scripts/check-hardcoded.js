import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCE_DIR = path.join(ROOT, 'src')
const allowedPatterns = [/^\s*$/, /{{/, /t\(/, /v-else/, /v-if/, /v-for/, /<\//, /^[‹›]+$/, /e\.target/]

const issues = []

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (/\.(vue|js|ts)$/.test(entry.name)) {
      inspectFile(full)
    }
  }
}

function inspectFile(file) {
  const content = fs.readFileSync(file, 'utf8')
  const templates = content.match(/<template>[\s\S]*?<\/template>/g)
  if (!templates) return

  for (const block of templates) {
    const textMatches = block.match(/>([^<]+)</g) || []
    for (const raw of textMatches) {
      const text = raw.slice(1, -1).trim()
      if (!text) continue
      if (allowedPatterns.some(pattern => pattern.test(text))) continue
      issues.push({ file, text })
    }
  }
}

walk(SOURCE_DIR)

if (issues.length) {
  console.error('Hardcoded strings detected:')
  for (const issue of issues) {
    console.error(`- ${issue.file}: "${issue.text}"`)
  }
  process.exitCode = 1
} else {
  console.log('No hardcoded template strings found.')
}
