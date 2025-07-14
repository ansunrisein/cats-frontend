"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/shared/api/trpc";
import { Button, Input } from "@/shared/ui";
import { DEFAULT_PROTECTED_ROUTE } from "@/shared/config/routing";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const LoginForm = () => {
  const { register, handleSubmit, watch } = useForm({ resolver });

  const router = useRouter();

  const login = trpc.auth.login.useMutation({
    onSuccess: () => {
      router.push(DEFAULT_PROTECTED_ROUTE);
    },
  });

  const onSubmit = ({ username, password }: LoginFormValues) => {
    login.mutate({
      username,
      password,
    });
  };

  useEffect(
    () =>
      watch(() => {
        if (login.isError) {
          login.reset();
        }
      }).unsubscribe,
    [login, watch],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Input {...register("username")} label="Name" />

      <Input
        {...register("password")}
        type="password"
        label="Password"
        className="mt-3 mb-4"
      />

      {login.isError ? (
        <span className="text-center text-red-500 text-xs">
          {login.error.message || "Error"}
        </span>
      ) : (
        <p className="text-center text-xs text-gray-400">use: admin / admin</p>
      )}

      <Button type="submit" className="mt-5">
        Login
      </Button>
    </form>
  );
};
