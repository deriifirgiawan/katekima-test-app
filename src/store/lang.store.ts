import { defineStore } from "pinia";
import { i18n } from "../i18n";
import type { LangConstant } from "../constant";

export const useLangStore = defineStore('lang', {
  state: () => ({lang: "en" as LangConstant}),
  getters: {
    currentLang: (state) => state.lang
  },
  actions: {
    toggleLang() {
      this.lang = this.lang === "en" ? "id" : "en";
      i18n.global.locale = this.lang;
    },

    setLang(value: LangConstant) {
      this.lang = value;
      i18n.global.locale = value;
    }
  }
});