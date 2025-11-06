import { LocaleType } from "@/types";
import enTranslations from "@/locales/en.json";
import khTranslations from "@/locales/kh.json";

const translations = {
  en: enTranslations,
  kh: khTranslations,
};

type TranslationValue = string | TranslationObject;
interface TranslationObject {
  [key: string]: TranslationValue;
}

export function getTranslations(locale: LocaleType): TranslationObject {
  return translations[locale] || translations.en;
}

export function translate(
  locale: LocaleType,
  key: string,
  fallback?: string
): string {
  const keys = key.split(".");
  let value: TranslationValue | undefined = getTranslations(locale);

  for (const k of keys) {
    if (typeof value === "object" && value !== null && k in value) {
      value = value[k];
    } else {
      value = undefined;
      break;
    }
  }

  return typeof value === "string" ? value : fallback ?? key;
}
