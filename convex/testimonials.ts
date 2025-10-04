import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTestimonials = query({
  handler: async (ctx) => {
    const testimonials = await ctx.db.query("testimonials").collect();

    // Get audio URLs for each testimonial
    return Promise.all(
      testimonials.map(async (testimonial) => ({
        ...testimonial,
        audioUrl: await ctx.storage.getUrl(testimonial.audio),
      }))
    );
  },
});

export const postTestimonial = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    audio: v.id("_storage"),
    summary: v.optional(v.string()),
    transcript: v.optional(v.string()),
  },
  handler: async (ctx, { name, email, audio, summary, transcript }) => {
    await ctx.db.insert("testimonials", {
      name,
      email,
      audio,
      summary,
      transcript,
      createdAt: Date.now(),
    });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
