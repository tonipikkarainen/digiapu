import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const subCategoryRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.subCategory.findMany({
        where: {
          categoryId: input.id,
        },
      });
    }),
});
