import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const postTestimonial = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    audio: v.string(),
  },
  handler: async (ctx, { name, email, audio }) => {
    await ctx.db.insert("testimonials", {
      name,
      email,
      audio,
    });
  },
});
