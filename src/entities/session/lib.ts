"use server";

import { redirect } from "next/navigation";
import { ServerSideTRPC } from "@/shared/api/trpc-server";
import {
  DEFAULT_PROTECTED_ROUTE,
  DEFAULT_PUBLIC_ROUTE,
} from "@/shared/config/routing";

export const guardProtected = async (client: ServerSideTRPC) => {
  const session = await client.auth.me.fetch();

  if (!session) {
    redirect(DEFAULT_PUBLIC_ROUTE);
  }
};

export const guardPublic = async (client: ServerSideTRPC) => {
  const session = await client.auth.me.fetch();

  if (session) {
    redirect(DEFAULT_PROTECTED_ROUTE);
  }
};
