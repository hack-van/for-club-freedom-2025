import { v } from "convex/values";
import { query } from "./_generated/server";
import { mutation } from "./functions";

export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return url; // time-limited URL from Convex
  },
});
export const getMetadata = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.system.get(args.storageId);
  },
});
export const getTestimonials = query({
  handler: async (ctx) => {
    const testimonials = await ctx.db.query("testimonials").collect();

    const testimonialsWithMedia = await Promise.all(
      testimonials.map(async (testimonial) => {
        const mediaUrl = testimonial.media_id
          ? await ctx.storage.getUrl(testimonial.media_id)
          : undefined;
        return {
          ...testimonial,
          mediaUrl,
        };
      })
    );

    return testimonialsWithMedia;
  },
});

export const postTestimonial = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    media_id: v.optional(v.id("_storage")),
    media_type: v.string(),
    text: v.string(),
  },
  handler: async (ctx, { name, email, media_id, media_type, text }) => {
    const id = await ctx.db.insert("testimonials", {
      name,
      email,
      media_id,
      media_type,
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

    const mediaUrl = testimonial.media_id
      ? await ctx.storage.getUrl(testimonial.media_id)
      : undefined;
    return {
      ...testimonial,
      mediaUrl,
    };
  },
});

export const updateTranscription = mutation({
  args: {
    id: v.id("testimonials"),
    text: v.string(),
  },
  handler: async (ctx, { id, text }) => {
    await ctx.db.patch(id, { testimonialText: text });
  },
});

export const updateSummary = mutation({
  args: {
    id: v.id("testimonials"),
    summary: v.string(),
  },
  handler: async (ctx, { id, summary }) => {
    await ctx.db.patch(id, { summary });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
