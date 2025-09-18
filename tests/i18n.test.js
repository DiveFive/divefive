import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { createTestEnvironment, resetTestEnvironment } from './helpers/environment.js'
import { initI18n, i18n } from '../src/i18n/i18n.js'

beforeEach(() => {
  createTestEnvironment({ locale: 'en' })
})

afterEach(() => {
  resetTestEnvironment()
})

test('initialises with English resources by default', () => {
  initI18n()
  assert.equal(i18n.language, 'en')
  assert.equal(i18n.t('hero.heading'), 'DiveFive keeps every descent accountable.')
})

test('switches between locales with fallback support', () => {
  initI18n()
  i18n.changeLanguage('fr')
  assert.equal(i18n.language, 'fr')
  assert.equal(i18n.t('hero.heading'), 'DiveFive garantit chaque descente.')

  i18n.changeLanguage('es-MX')
  assert.equal(i18n.t('hero.secondaryCta'), 'Leer informe de seguridad')
})

test('returns key when translation is missing', () => {
  initI18n()
  assert.equal(i18n.t('unknown.key'), 'unknown.key')
})
