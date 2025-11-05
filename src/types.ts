import { i18n } from "./configs/i18n";

export type LocaleType = (typeof i18n)["locales"][number];

export type SettingsType = {
  locale: LocaleType;
};
