import { watchEffect } from 'vue'
import { useI18n } from '@/i18n/i18n'

function updateMetaTag(attr, key, value) {
  if (typeof document === 'undefined') return
  let element = document.querySelector(`meta[${attr}='${key}']`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export function useDocumentMeta() {
  const { t } = useI18n()

  watchEffect(() => {
    const title = String(t('meta.title'))
    if (typeof document !== 'undefined') {
      document.title = title
    }
    updateMetaTag('name', 'description', String(t('meta.description')))
    updateMetaTag('property', 'og:title', String(t('meta.ogTitle')))
    updateMetaTag('property', 'og:description', String(t('meta.ogDescription')))
  })
}
