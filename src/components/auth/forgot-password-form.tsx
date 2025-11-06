"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/schemas/forgot-password-schema";
import { z } from "zod";
import { useSendResetOtp } from "@/hooks/use-send-reset-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LocaleLink } from "@/components/locale-link";

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const { mutate: sendResetOtp, isPending } = useSendResetOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    sendResetOtp(data, {
      onSuccess: () => {
        toast.success("OTP sent successfully!", {
          description: "Please check your email for the reset code.",
        });
        // Store email in session storage for reset password page
        if (typeof window !== "undefined") {
          sessionStorage.setItem("resetEmail", data.email);
        }
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      },
      onError: (error) => {
        toast.error("Failed to send OTP", {
          description: error.message || "Please try again.",
        });
      },
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email address and we&apos;ll send you a code to reset
            your password
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            disabled={isPending}
          />
          {errors.email && (
            <FieldDescription className="text-destructive">
              {errors.email.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Code"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Remember your password?{" "}
            <LocaleLink
              href="/sign-in"
              className="text-primary hover:underline"
            >
              Sign in
            </LocaleLink>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
