import { createI18n } from "vue-i18n";
import { enLang } from "./en";
import { idLang } from "./id";

const messages = {
  en: {...enLang},
  id: {...idLang}
};

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
})