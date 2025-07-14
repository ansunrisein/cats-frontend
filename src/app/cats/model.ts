import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/shared/api/trpc";
import { CatsApiParams } from "@/server/api/routers";
import { CATS_LIMIT } from "./config";
import { composeFiltersQueryString, parseFiltersFromQueryString } from "./lib";

export type CatsFilters = Omit<CatsApiParams, "limit">;

export const useCatsFilterByBreed = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = parseFiltersFromQueryString(searchParams);

  const { data, isLoading, error } = trpc.cats.list.useQuery({
    ...filters,
    limit: CATS_LIMIT,
  });

  const handleFiltersChange = (filters: CatsFilters) => {
    router.push(`?${composeFiltersQueryString(filters)}`);
  };

  return {
    filters,
    data,
    isLoading,
    handleFiltersChange,
    error: error?.message,
  };
};
