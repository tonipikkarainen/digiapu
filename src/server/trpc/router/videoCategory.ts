import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { create } from "domain";
import { contextProps } from "@trpc/react/dist/internals/context";

export const videoCategoryRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hei ${input?.text ?? "kguykg"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.videoCategory.findMany();
  }),
  addCategory: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const cat = await ctx.prisma.videoCategory.create({
        data: {
          name: input.name,
        },
      });
      return cat;
    }),
  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // This can fail if there is videos in subcat
      const subCat = ctx.prisma.subCategory.deleteMany({
        where: {
          categoryId: input.id,
        },
      });
      const cat = ctx.prisma.videoCategory.delete({
        where: {
          id: input.id,
        },
      });
      const transaction = await ctx.prisma.$transaction([subCat, cat]);
      return transaction;
    }),
});
