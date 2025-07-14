"use client";

import { getQueryClient, trpc, trpcClient } from "@/shared/api/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = getQueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
