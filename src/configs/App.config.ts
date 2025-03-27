import type { LangConstant } from "../constant";

export abstract class AppConfig {
  static lang: LangConstant = "en";
  static API_POKE_URL = import.meta.env.VITE_POKE_URL;
  static API_ADD_URL = import.meta.env.VITE_ADD_URL;
}