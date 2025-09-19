if (danger.git.created_files.includes('dangerfile.js')) {
  message('Danger guard activado para futuras PRs.')
} else {
  const touched = danger.git.modified_files.concat(danger.git.created_files)
  const blocked = touched.filter(p =>
    p.startsWith('src/pages/') ||
    p.startsWith('src/components/layout/') ||
    (p.startsWith('src/styles/') && !p.includes('tokens'))
  )
  if (blocked.length) {
    fail(`Este PR toca layout/estilos restringidos:
- ${blocked.join('\n- ')}
Se permiten SOLO i18n/temas/scripts.`)
  }
}
