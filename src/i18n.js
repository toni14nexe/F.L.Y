import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import hr from './locales/hr.json'
import de from './locales/de.json'
import it from './locales/it.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'hr',
  fallbackLocale: 'hr',
  messages: { en, hr, de, it },
})
