import { ref, watch, onMounted } from 'vue'
import { useI18n } from '@/i18n/i18n'
import { loadContent } from '@/utils/contentLoader'

export function useContent(type, slug, fallback = 'en') {
  const { locale } = useI18n()
  const documentRef = ref(null)
  const loading = ref(true)
  const error = ref(null)

  async function fetchContent(currentLocale) {
    loading.value = true
    error.value = null
    try {
      documentRef.value = await loadContent(type, slug, currentLocale, fallback)
    } catch (err) {
      error.value = err
      documentRef.value = null
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchContent(locale.value)
  })

  watch(locale, (next) => {
    fetchContent(next)
  })

  return {
    document: documentRef,
    loading,
    error,
    refresh: () => fetchContent(locale.value),
  }
}
