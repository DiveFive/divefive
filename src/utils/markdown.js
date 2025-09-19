function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/\(/g, '&#40;').replace(/\)/g, '&#41;')
}

function formatInline(text) {
  const segments = []
  let lastIndex = 0
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(escapeHtml(text.slice(lastIndex, match.index)))
    }
    const label = escapeHtml(match[1])
    const url = escapeAttribute(match[2])
    segments.push(`<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push(escapeHtml(text.slice(lastIndex)))
  }

  const combined = segments.join('')

  return combined
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

export function markdownToHtml(markdown) {
  if (!markdown) return ''
  const lines = markdown.split(/\r?\n/)
  let html = ''
  let inList = false

  const closeList = () => {
    if (inList) {
      html += '</ul>'
      inList = false
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      closeList()
      continue
    }

    if (line.startsWith('### ')) {
      closeList()
      html += `<h3>${formatInline(line.slice(4))}</h3>`
      continue
    }

    if (line.startsWith('## ')) {
      closeList()
      html += `<h2>${formatInline(line.slice(3))}</h2>`
      continue
    }

    if (line.startsWith('# ')) {
      closeList()
      html += `<h1>${formatInline(line.slice(2))}</h1>`
      continue
    }

    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>'
        inList = true
      }
      html += `<li>${formatInline(line.slice(2))}</li>`
      continue
    }

    closeList()
    html += `<p>${formatInline(line)}</p>`
  }

  closeList()
  return html
}
