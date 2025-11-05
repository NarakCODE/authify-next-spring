"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyOtpSchema } from "@/schemas/verify-otp-schema";
import { z } from "zod";
import { useVerifyOtp } from "@/hooks/use-verify-otp";
import { useResendOtp } from "@/hooks/use-resend-otp";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { LocaleLink } from "@/components/locale-link";

type VerifyOtpFormData = z.infer<typeof VerifyOtpSchema>;

export function VerifyOtpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  useEffect(() => {
    // Get email from URL params or session storage
    const emailFromUrl = searchParams.get("email");
    const emailFromStorage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("verifyEmail")
        : null;

    const userEmail = emailFromUrl || emailFromStorage || "";
    setEmail(userEmail);

    if (!userEmail) {
      toast.error("Email not found", {
        description: "Please register again or provide your email.",
      });
    }
  }, [searchParams]);

  const onSubmit = (data: VerifyOtpFormData) => {
    if (!email) {
      toast.error("Email is required", {
        description: "Please provide your email address.",
      });
      return;
    }

    verifyOtp(
      { email, otp: data.otp },
      {
        onSuccess: (response) => {
          toast.success("Account verified!", {
            description: response.message || "You can now login.",
          });
          // Clear email from session storage
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("verifyEmail");
          }
          router.push("/sign-in");
        },
        onError: (error) => {
          toast.error("Verification failed", {
            description: error.message || "Invalid OTP. Please try again.",
          });
        },
      }
    );
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email is required", {
        description: "Please provide your email address.",
      });
      return;
    }

    resendOtp(
      { email },
      {
        onSuccess: (response) => {
          toast.success("OTP Resent!", {
            description:
              response.message || "A new code has been sent to your email.",
          });
        },
        onError: (error) => {
          toast.error("Failed to resend OTP", {
            description: error.message || "Please try again later.",
          });
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter verification code</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We sent a 6-digit code to{" "}
              {email && <span className="font-medium">{email}</span>}
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="otp" className="sr-only">
              Verification code
            </FieldLabel>
            <InputOTP
              maxLength={6}
              id="otp"
              value={otpValue}
              onChange={(value) => setValue("otp", value)}
              disabled={isPending}
            >
              <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {errors.otp && (
              <FieldDescription className="text-destructive text-center">
                {errors.otp.message}
              </FieldDescription>
            )}
            {!errors.otp && (
              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            )}
          </Field>
          <Button type="submit" disabled={isPending || otpValue.length !== 6}>
            {isPending ? "Verifying..." : "Verify"}
          </Button>
          <FieldDescription className="text-center">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isPending || isResending}
              className="text-primary hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </FieldDescription>
          <FieldDescription className="text-center">
            <LocaleLink
              href="/sign-in"
              className="text-primary hover:underline"
            >
              Back to Sign In
            </LocaleLink>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
