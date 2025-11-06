"use client";

import { usePathname } from "next/navigation";
import { translate } from "@/lib/translations";
import { getLocaleFromPathname } from "@/lib/locale";

export function useTranslation() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const t = (key: string, fallback?: string) => {
    return translate(locale, key, fallback);
  };

  return { t, locale };
}
