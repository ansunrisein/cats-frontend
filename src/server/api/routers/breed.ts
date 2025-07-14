import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { unstable_cache } from "next/cache";
import { getBreeds } from "@/server/services/breed";

export const breedsRouter = router({
  list: publicProcedure
    .input(z.void())
    .query(unstable_cache(getBreeds, undefined, { revalidate: 10 })),
});
