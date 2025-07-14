import { Catalog } from "@/app/cats/client";
import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { createServerSideTRPC } from "@/shared/api/trpc-server";
import { guardProtected } from "@/entities/session/lib";
import { CATS_LIMIT } from "./config";
import { parseFiltersFromQueryString } from "./lib";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Partial<Record<string, string>>>;
}) {
  const helpers = await createServerSideTRPC();

  await guardProtected(helpers);

  await helpers.cats.list.prefetch({
    limit: CATS_LIMIT,
    ...parseFiltersFromQueryString(await searchParams),
  });

  const dehydratedState = dehydrate(helpers.queryClient);

  return (
    <main className="min-h-screen bg-gray-50">
      <HydrationBoundary state={dehydratedState}>
        <Catalog />
      </HydrationBoundary>
    </main>
  );
}
