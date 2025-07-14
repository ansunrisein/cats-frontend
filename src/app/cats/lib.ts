import { ReadonlyURLSearchParams } from "next/navigation";
import { CatsFilters } from "./model";

export const parseFiltersFromQueryString = (
  searchParams: ReadonlyURLSearchParams | Partial<Record<string, string>>,
): CatsFilters => {
  if (searchParams instanceof URLSearchParams) {
    const breed = searchParams.get("breed") ?? null;

    return { breed };
  } else {
    return {
      breed: searchParams.breed ?? null,
    };
  }
};

export const composeFiltersQueryString = (filters: CatsFilters) => {
  const newParams = new URLSearchParams();

  if (filters.breed) {
    newParams.set("breed", filters.breed);
  }

  return newParams.toString();
};
