import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthLayout } from "@/components/auth/auth-layout";

function ForgotPasswordPage() {
  return (
    <AuthLayout imageUrl="https://shadboard.vercel.app/images/illustrations/scenes/scene-01.svg">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
