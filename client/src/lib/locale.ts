import { LocaleType } from "@/types";

export function getLocaleFromPathname(pathname: string): LocaleType {
  const locale = pathname.split("/")[1] as LocaleType;
  return locale;
}

export function createLocalePath(locale: LocaleType, path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}
