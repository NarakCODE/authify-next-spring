import { VerifyOtpForm } from "@/components/auth/verify-otp-form";
import Image from "next/image";

function VerifyOtpPage() {
  return (
    <div className="flex min-h-svh w-full">
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-xs">
          <VerifyOtpForm />
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
