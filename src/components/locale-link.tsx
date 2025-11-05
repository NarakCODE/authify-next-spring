"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { getLocaleFromPathname } from "@/lib/locale";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  // Prepend locale to href if not already present
  const localizedHref = href.startsWith(`/${locale}`)
    ? href
    : `/${locale}${href.startsWith("/") ? href : `/${href}`}`;

  return <Link href={localizedHref} {...props} />;
}
