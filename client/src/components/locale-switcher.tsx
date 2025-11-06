"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/configs/i18n";
import { LocaleType } from "@/types";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] as LocaleType;

  const handleLocaleChange = (newLocale: LocaleType) => {
    // Save locale preference to cookie
    Cookies.set("NEXT_LOCALE", newLocale, { path: "/", expires: 365 });

    // Replace current locale in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    router.push(newPathname);
  };

  const flagIcon =
    currentLocale === "en" ? "/icons/en-flag.png" : "/icons/kh-flag.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Image
            width={40}
            height={40}
            className="w-6 h-6"
            src={flagIcon}
            alt={`${currentLocale} flag`}
          />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
          >
            <Image
              width={16}
              height={16}
              className="w-4 h-4 opacity-60"
              src={
                locale === "en" ? "/icons/en-flag.png" : "/icons/kh-flag.png"
              }
              alt={`${locale} flag`}
            />
            <span className={currentLocale === locale ? "font-semibold" : ""}>
              {i18n.localeNames[locale]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
