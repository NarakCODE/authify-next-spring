import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocaleLink } from "@/components/locale-link";
import { Button } from "@/components/ui/button";
import { LocaleType } from "@/types";
import { translate } from "@/lib/translations";
import { ArrowRight, Shield, Zap, Lock, Fingerprint } from "lucide-react";
import { Footer } from "@/components/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Fingerprint className="size-4" />
            </div>
            Authify
          </a>
          <LocaleSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {translate(locale, "home.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {translate(locale, "home.subtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="min-w-[200px]">
                <LocaleLink href="/sign-in">
                  {translate(locale, "home.signIn")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </LocaleLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[200px]"
              >
                <LocaleLink href="/register">
                  {translate(locale, "home.createAccount")}
                </LocaleLink>
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {translate(locale, "home.features.secure.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {translate(locale, "home.features.secure.description")}
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {translate(locale, "home.features.fast.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {translate(locale, "home.features.fast.description")}
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {translate(locale, "home.features.recovery.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {translate(locale, "home.features.recovery.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
