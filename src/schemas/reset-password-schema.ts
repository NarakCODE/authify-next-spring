import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }).toLowerCase().trim(),
    otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
    newPassword: z.string().min(8, {
      message: "Password must contain at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must contain at least 8 characters",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
