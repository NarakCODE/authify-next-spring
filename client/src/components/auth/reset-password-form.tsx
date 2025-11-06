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
import { ResetPasswordSchema } from "@/schemas/reset-password-schema";
import { z } from "zod";
import { useResetPassword } from "@/hooks/use-reset-password";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LocaleLink } from "@/components/locale-link";
import { useEffect } from "react";

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    // Pre-fill email from URL or session storage
    const emailFromUrl = searchParams.get("email");
    const emailFromStorage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resetEmail")
        : null;
    const email = emailFromUrl || emailFromStorage;
    if (email) {
      setValue("email", email);
    }
  }, [searchParams, setValue]);

  const onSubmit = (data: ResetPasswordFormData) => {
    const { ...resetData } = data;
    resetPassword(resetData, {
      onSuccess: () => {
        toast.success("Password reset successfully!", {
          description: "You can now sign in with your new password.",
        });
        // Clear session storage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("resetEmail");
        }
        router.push("/sign-in");
      },
      onError: (error) => {
        toast.error("Password reset failed", {
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
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the code sent to your email and your new password
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
          <FieldLabel htmlFor="otp">Reset Code</FieldLabel>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            {...register("otp")}
            disabled={isPending}
          />
          {errors.otp && (
            <FieldDescription className="text-destructive">
              {errors.otp.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            disabled={isPending}
          />
          {errors.newPassword && (
            <FieldDescription className="text-destructive">
              {errors.newPassword.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            disabled={isPending}
          />
          {errors.confirmPassword && (
            <FieldDescription className="text-destructive">
              {errors.confirmPassword.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
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
