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
  },
  handler: async (ctx, { name, email, audio }) => {
    const id = await ctx.db.insert("testimonials", {
      name,
      email,
      audio,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const getTestimonialById = query({
  args: { id: v.id("testimonials") },
  handler: async (ctx, { id }) => {
    const testimonial = await ctx.db.get(id);
    if (!testimonial) {
      return null;
    }
    return {
      ...testimonial,
      audioUrl: await ctx.storage.getUrl(testimonial.audio),
    };
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
