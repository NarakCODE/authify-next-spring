"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/configs/i18n";
import { LocaleType } from "@/types";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] as LocaleType;

  const handleLocaleChange = (newLocale: LocaleType) => {
    // Save locale preference to cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Replace current locale in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`px-3 py-1 rounded ${
            currentLocale === locale
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {i18n.localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
