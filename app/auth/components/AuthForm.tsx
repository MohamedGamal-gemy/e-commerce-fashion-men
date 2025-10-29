"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { apiPost } from "../lib/apiClient";
import { LoginSchema, RegisterSchema } from "../validation/auth";

type Mode = "login" | "register";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const schema = mode === "login" ? LoginSchema : RegisterSchema;
  type SchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({ resolver: zodResolver(schema) });

  async function onSubmit(values: SchemaType) {
    try {
      const url =
        mode === "login"
          ? `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
          : `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
      await apiPost(url, values);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {mode === "register" && (
        <FormField
          label="Username"
            error={errors.username?.message ?? errors.name?.message}

          // error={errors?.username?.message || errors?.name?.message}
        >
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              {...register("username")}
              placeholder="John Doe"
              className="pl-10 bg-slate-800 border-slate-700 text-slate-100"
            />
          </div>
        </FormField>
      )}

      <FormField label="Email" error={errors?.email?.message}>
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

      <FormField label="Password" error={errors?.password?.message}>
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
        {mode === "login" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
}
