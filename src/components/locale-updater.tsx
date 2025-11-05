"use client";

import { useEffect } from "react";
import { useSettings } from "@/hooks/use-settings";
import { i18n } from "@/configs/i18n";

export function LocaleUpdater() {
  const { settings } = useSettings();

  useEffect(() => {
    // Update HTML attributes when locale changes
    document.documentElement.lang = settings.locale;
    document.documentElement.dir = i18n.localeDirection[settings.locale];
  }, [settings.locale]);

  return null;
}
