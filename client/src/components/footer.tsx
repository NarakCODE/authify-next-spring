"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/locale";
import { translate } from "@/lib/translations";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Authify. {translate(locale, "footer.copyright")}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{translate(locale, "footer.builtWith")}</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>{translate(locale, "footer.by")}</span>
            <a
              href="https://github.com/narakcode"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              NarakCODE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
