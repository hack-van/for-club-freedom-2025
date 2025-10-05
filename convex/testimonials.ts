import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTestimonials = query({
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});

export const postTestimonial = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    audio: v.optional(v.id("_storage")),
    text: v.string(),
  },
  handler: async (ctx, { name, email, audio, text }) => {
    const id = await ctx.db.insert("testimonials", {
      name,
      email,
      audio,
      testimonialText: text,
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

    const audioUrl = testimonial.audio
      ? await ctx.storage.getUrl(testimonial.audio)
      : undefined;
    return {
      ...testimonial,
      audioUrl,
    };
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
