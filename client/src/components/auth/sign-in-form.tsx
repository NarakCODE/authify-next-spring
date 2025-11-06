"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaType } from "@/schemas/sign-in-schema";
import { useSignIn } from "@/hooks/use-sign-in";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LocaleLink } from "@/components/locale-link";
import { authStorage } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { mutate: signIn, isPending } = useSignIn();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: SignInSchemaType) => {
    signIn(data, {
      onSuccess: (response) => {
        // Store token
        authStorage.setToken(response.token);

        // Invalidate auth query to refetch
        queryClient.invalidateQueries({ queryKey: ["auth", "check"] });

        toast.success(t("auth.loginSuccessful"), {
          description: `${t("auth.welcomeBack")}, ${response.email}`,
        });

        // Redirect to dashboard or redirect URL
        const redirect = searchParams.get("redirect") || "/dashboard";
        router.push(redirect);
      },
      onError: (error) => {
        toast.error(t("auth.loginFailed"), {
          description: error.message || t("auth.emailOrPasswordIncorrect"),
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
          <h1 className="text-2xl font-bold">{t("auth.login")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("auth.loginDescription")}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder={t("auth.emailPlaceholder")}
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
            <LocaleLink
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {t("auth.forgotPassword")}
            </LocaleLink>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              disabled={isPending}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isPending}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <FieldDescription className="text-destructive">
              {errors.password.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? t("auth.loggingIn") : t("auth.login")}
          </Button>
        </Field>
        <FieldSeparator>{t("auth.orContinueWith")}</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" disabled={isPending}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            {t("auth.loginWithGitHub")}
          </Button>
          <FieldDescription className="text-center">
            {t("auth.dontHaveAccount")}{" "}
            <LocaleLink
              href="/register"
              className="text-primary hover:underline"
            >
              {t("auth.signUp")}
            </LocaleLink>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
