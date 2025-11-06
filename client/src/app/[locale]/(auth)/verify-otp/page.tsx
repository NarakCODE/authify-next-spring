import { VerifyOtpForm } from "@/components/auth/verify-otp-form";
import Image from "next/image";
import { Suspense } from "react";

function VerifyOtpPage() {
  return (
    <div className="flex min-h-svh w-full">
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-xs">
          <Suspense
            fallback={
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            }
          >
            <VerifyOtpForm />
          </Suspense>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://doodleipsum.com/600?bg=ceebff"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}

export default VerifyOtpPage;
