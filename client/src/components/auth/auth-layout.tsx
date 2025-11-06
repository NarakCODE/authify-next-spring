import { PublicRoute } from "@/components/auth/public-route";
import { AuthHeader } from "@/components/auth/auth-header";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl?: string;
}

export function AuthLayout({
  children,
  imageUrl = "https://shadboard.vercel.app/images/illustrations/misc/welcome.svg",
}: AuthLayoutProps) {
  return (
    <PublicRoute>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <AuthHeader />
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">{children}</div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <Image
            src={imageUrl}
            alt="Authentication illustration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
            width={300}
            height={300}
          />
        </div>
      </div>
    </PublicRoute>
  );
}
