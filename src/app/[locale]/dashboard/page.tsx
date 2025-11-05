import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocaleLink } from "@/components/locale-link";
import { LocaleType } from "@/types";
import { translate } from "@/lib/translations";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">{translate(locale, "common.welcome")}</p>
      <LocaleSwitcher />
      <div className="mt-4">
        <LocaleLink href="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </LocaleLink>
      </div>
    </div>
  );
}
