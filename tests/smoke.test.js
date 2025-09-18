import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { createTestEnvironment, resetTestEnvironment } from './helpers/environment.js'
import { initI18n, i18n } from '../src/i18n/i18n.js'
import { initTheme, setThemeSelection } from '../src/composables/useTheme.js'

beforeEach(() => {
  createTestEnvironment({ locale: 'en', prefersDark: false })
})

afterEach(() => {
  resetTestEnvironment()
})

test('smoke test for localisation and theming flows', () => {
  initI18n()
  initTheme()

  const locales = [
    { code: 'en', expected: 'Features' },
    { code: 'es-MX', expected: 'Funcionalidades' },
    { code: 'fr', expected: 'Fonctionnalités' },
  ]

  for (const entry of locales) {
    i18n.changeLanguage(entry.code)
    assert.equal(document.documentElement.lang, entry.code)
    assert.equal(i18n.t('footer.links.features'), entry.expected)
  }

  setThemeSelection('dark')
  assert.equal(document.documentElement.getAttribute('data-theme'), 'dark')

  setThemeSelection('light')
  assert.equal(document.documentElement.getAttribute('data-theme'), 'light')
})
