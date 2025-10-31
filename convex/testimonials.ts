import { v } from "convex/values";
import { action, query } from "./_generated/server";
import { mutation } from "./functions";
import { r2 } from "./r2";
import { api } from "./_generated/api";
import { createR2Client } from "@/lib/r2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { extension as getExtension } from "mime-types";

export const getTestimonials = query({
  args: { searchQuery: v.optional(v.string()) },
  handler: async (ctx, { searchQuery }) => {
    let testimonials: any[] = [];

    if (searchQuery && searchQuery.trim() !== "") {
      // Full-text search path (no filters before withSearchIndex)
      testimonials = await ctx.db
        .query("testimonials")
        .withSearchIndex("search_posts", (q) =>
          q.search("searchText", searchQuery)
        )
        .collect();

      // Optional JS-side filtering
      testimonials = testimonials.filter(
        (t) => t.title && t.summary && t.testimonialText
      );
    } else {
      // Normal query path with filters
      testimonials = await ctx.db
        .query("testimonials")
        .filter((q) => q.neq(q.field("title"), undefined))
        .filter((q) => q.neq(q.field("summary"), undefined))
        .filter((q) => q.neq(q.field("testimonialText"), undefined))
        .order("desc")
        .collect();
    }

    const testimonialsWithMedia = await Promise.all(
      testimonials.map(async (t) => {
        const mediaUrl = t.storageId ? await r2.getUrl(t.storageId) : undefined;
        return { ...t, mediaUrl };
      })
    );

    return testimonialsWithMedia;
  },
});

export const postTestimonial = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
    storageId: v.optional(v.string()),
    media_type: v.string(),
    text: v.string(),
  },
  handler: async (ctx, { name, email, storageId, media_type, text }) => {
    const id = await ctx.db.insert("testimonials", {
      name,
      email,
      storageId,
      media_type,
      testimonialText: text,
    });
    return id;
  },
});

export const getTestimonialById = query({
  args: { id: v.id("testimonials") },
  handler: async (ctx, { id }) => {
    const testimonial = await ctx.db.get(id);

    if (!testimonial) {
      return undefined;
    }

    const mediaUrl = testimonial.storageId
      ? await r2.getUrl(testimonial.storageId)
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

export const updateSummaryAndTitle = mutation({
  args: {
    id: v.id("testimonials"),
    summary: v.string(),
    title: v.string(),
  },
  handler: async (ctx, { id, summary, title }) => {
    await ctx.db.patch(id, { summary, title });
  },
});
