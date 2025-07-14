import { router } from "./trpc";
import { authRouter, breedsRouter, catsRouter } from "./routers";

export const appRouter = router({
  auth: authRouter,
  cats: catsRouter,
  breeds: breedsRouter,
});

export type AppRouter = typeof appRouter;
