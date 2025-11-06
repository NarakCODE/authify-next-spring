import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Suspense } from "react";

function ResetPasswordPage() {
  return (
    <AuthLayout imageUrl="https://doodleipsum.com/600?bg=ceebff">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
