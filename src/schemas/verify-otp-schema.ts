import { z } from "zod";

export const VerifyOtpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
});
