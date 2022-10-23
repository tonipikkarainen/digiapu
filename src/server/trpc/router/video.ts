import { router, publicProcedure, protectedProcedure } from "../trpc";
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
  addVideo: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        categoryId: z.string(),
        url: z.string().min(1),
        userId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.prisma.video.create({
        data: {
          name: input.name,
          url: input.url,
          user: {
            connect: {
              id: input.userId,
            },
          },
          subCategory: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
      return video;
    }),
  deleteVideo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const video = ctx.prisma.video.delete({
        where: {
          id: input.id,
        },
      });

      return video;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.video.findMany();
  }),
});
