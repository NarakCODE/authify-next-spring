import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocaleLink } from "@/components/locale-link";
import { Button } from "@/components/ui/button";
import { LocaleType } from "@/types";
import { translate } from "@/lib/translations";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        {translate(locale, "common.welcome")}
      </h1>
      <LocaleSwitcher />
      <div className="mt-4 space-y-2">
        <Button asChild>
          <LocaleLink href="/dashboard">Go to Dashboard</LocaleLink>
        </Button>
      </div>
    </div>
  );
}
