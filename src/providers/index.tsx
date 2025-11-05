import { SettingsProviders } from "@/context/settings-context";
import { ThemeProvider } from "./theme-provider";
import { LocaleType } from "@/types";

export function Providers({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: LocaleType;
}>) {
  return (
    <SettingsProviders locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SettingsProviders>
  );
}
