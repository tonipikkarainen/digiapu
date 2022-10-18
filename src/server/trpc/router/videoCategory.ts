import { router, publicProcedure } from "../trpc";
import { z } from "zod";

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
});
