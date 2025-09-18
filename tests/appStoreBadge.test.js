import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getAppStoreBadgePath } from '../src/utils/appStoreBadge.js'

function withBase(url, fn) {
  const original = globalThis.__APP_BASE__
  globalThis.__APP_BASE__ = url
  try {
    fn()
  } finally {
    if (original === undefined) {
      delete globalThis.__APP_BASE__
    } else {
      globalThis.__APP_BASE__ = original
    }
  }
}

test('resolves localized badge paths', () => {
  withBase('/DiveFive-webapp/', () => {
    assert.equal(
      getAppStoreBadgePath('es-MX', 'dark'),
      '/DiveFive-webapp/assets/badges/app-store/es-MX/dark.svg',
    )
    assert.equal(
      getAppStoreBadgePath('fr', 'light'),
      '/DiveFive-webapp/assets/badges/app-store/fr/light.svg',
    )
  })
})

test('falls back to English badge for unsupported locales', () => {
  withBase('/', () => {
    assert.equal(getAppStoreBadgePath('de', 'light'), '/assets/badges/app-store/en/light.svg')
  })
})
