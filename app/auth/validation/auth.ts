import { z } from "zod";

// ✅ Login Schema
export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Register Schema (كل الحقول المطلوبة)
export const RegisterSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
