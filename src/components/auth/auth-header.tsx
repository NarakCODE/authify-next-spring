import { Fingerprint } from "lucide-react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";

export function AuthHeader() {
  return (
    <div className="flex gap-2 justify-between">
      <a href="#" className="flex items-center gap-2 font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <Fingerprint className="size-4" />
        </div>
        Authify
      </a>

      <div className="space-x-3 items-center flex">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </div>
  );
}
