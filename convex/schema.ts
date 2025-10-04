import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  testimonials: defineTable({
    name: v.string(),
    email: v.string(),
    audio: v.id("_storage"), // Storage ID for the audio file
    summary: v.optional(v.string()), // Summary of the testimonial
    transcript: v.optional(v.string()), // Transcript of the testimonial
    createdAt: v.optional(v.number()), // Timestamp when testimonial was created
  }),
});
