import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { createServerSideTRPC } from "@/shared/api/trpc-server";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const helpers = await createServerSideTRPC();

  const session = await helpers.auth.me.fetch();

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
}
