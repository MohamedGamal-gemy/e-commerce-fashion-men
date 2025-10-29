"use client";

import React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { apiPost } from "../lib/apiClient";
import { LoginSchema, RegisterSchema } from "../validation/auth";

type Mode = "login" | "register";

// أنواع منفصلة
type LoginValues = z.infer<typeof LoginSchema>;
type RegisterValues = z.infer<typeof RegisterSchema>;

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const isRegister = mode === "register";

  // ✅ استخدم النوع الصحيح بناءً على الـ mode
  const form = useForm<RegisterValues | LoginValues>({
    resolver: zodResolver(isRegister ? RegisterSchema : LoginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: RegisterValues | LoginValues) {
    try {
      const url =
        mode === "login"
          ? `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
          : `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;

      await apiPost(url, values);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  }

  // ✅ نستخدم type narrowing عشان TS يعرف أن errors ممكن تحتوي username
  const registerErrors = errors as FieldErrors<RegisterValues>;
  const loginErrors = errors as FieldErrors<LoginValues>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isRegister && (
        <FormField
          label="Username"
          error={registerErrors.username?.message}
        >
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              {...register("username" as keyof RegisterValues)}
              placeholder="John Doe"
              className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
            />
          </div>
        </FormField>
      )}

      <FormField label="Email" error={loginErrors.email?.message}>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            {...register("email")}
            placeholder="you@example.com"
            className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
          />
        </div>
      </FormField>

      <FormField label="Password" error={loginErrors.password?.message}>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
          />
        </div>
      </FormField>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600"
      >
        {isRegister ? "Create Account" : "Sign In"}
      </Button>
    </form>
  );
}
