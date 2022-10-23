import { router, publicProcedure, protectedProcedure } from "../trpc";
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
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subCategory.findMany();
  }),
  addCategory: protectedProcedure
    .input(z.object({ name: z.string().min(1), categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const subcat = await ctx.prisma.subCategory.create({
        data: {
          name: input.name,
          category: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
      return subcat;
    }),
  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const subCat = ctx.prisma.subCategory.delete({
        where: {
          id: input.id,
        },
      });

      return subCat;
    }),
});
