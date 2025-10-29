// lib/validation/auth.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSchema = LoginSchema.extend({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .optional(),
  name: z.string().min(2, "Username must be at least 2 characters").optional(),
  //   confirmPassword: z.string().min(6, "Please confirm your password"),
  // }).superRefine((data, ctx) => {
  //   if (data.password !== data.confirmPassword) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       path: ["confirmPassword"],
  //       message: "Passwords do not match",
  //     });
  //   }
});
