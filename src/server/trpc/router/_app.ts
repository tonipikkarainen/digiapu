// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { videoCategoryRouter } from "./videoCategory";
import { authRouter } from "./auth";
import { subCategoryRouter } from "./subCategory";

export const appRouter = router({
  videoCategory: videoCategoryRouter,
  subCategory: subCategoryRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
