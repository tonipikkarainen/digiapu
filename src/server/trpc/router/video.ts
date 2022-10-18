import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const videoRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.video.findMany({
        where: {
          subCategoryId: input.id,
        },
      });
    }),
});
