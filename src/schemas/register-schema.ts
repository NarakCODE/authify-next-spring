import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .trim()
    .min(3, { message: "Username must contain at least 3 characters." })
    .max(50, { message: "Username must contain at most 50 characters." }),
  email: z.email({ message: "Invalid email address" }).toLowerCase().trim(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(250, {
      message: "Password must contain at most 250 characters",
    })
    .regex(/(?=.*[a-zA-Z])/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/(?=.*[0-9])/, {
      message: "Password must contain at least one number.",
    }),
});
