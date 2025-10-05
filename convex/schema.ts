import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  testimonials: defineTable({
    name: v.string(),
    email: v.string(),
    media_id: v.optional(v.id("_storage")), // Storage ID for the media type
    media_type: v.string(),
    createdAt: v.optional(v.number()), // Timestamp when testimonial was created
    testimonialText: v.optional(v.string()), // Text version of the testimonial
    summary: v.optional(v.string()), // Summary of the testimonial
  }),
  transcription_jobs: defineTable({
    job_id: v.string(),
    testimonial_id: v.id("testimonials"),
  }),
});
