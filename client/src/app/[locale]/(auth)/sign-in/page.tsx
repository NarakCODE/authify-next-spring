import { SignInForm } from "@/components/auth/sign-in-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Suspense } from "react";

function SignInPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
}

export default SignInPage;
