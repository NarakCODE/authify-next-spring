"use client";

import { LocaleType, SettingsType } from "@/types";
import { createContext, useState, useCallback, useEffect } from "react";
import { useCookie } from "react-use";

export const defaultSettings: SettingsType = {
  locale: "en",
};

export const SettingsContext = createContext<
  | {
      settings: SettingsType;
      updateSettings: (newSettings: SettingsType) => void;
      resetSettings: () => void;
    }
  | undefined
>(undefined);

export function SettingsProviders({
  locale,
  children,
}: {
  locale: LocaleType;
  children: React.ReactNode;
}) {
  const [storedSettings, setStoredSettings, deleteStoredSettings] =
    useCookie("settings");

  const [settings, setSettings] = useState<SettingsType>(() => {
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
    return { ...defaultSettings, locale };
  });

  const updateSettings = useCallback(
    (newSettings: SettingsType) => {
      setSettings(newSettings);
      setStoredSettings(JSON.stringify(newSettings));
    },
    [setStoredSettings]
  );

  const resetSettings = useCallback(() => {
    const reset = { ...defaultSettings, locale };
    setSettings(reset);
    deleteStoredSettings();
  }, [locale, deleteStoredSettings]);

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
