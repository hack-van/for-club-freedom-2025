import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  testimonials: defineTable({
    name: v.string(),
    email: v.string(),
    audio: v.id("_storage"), // Storage ID for the audio file
    createdAt: v.optional(v.number()), // Timestamp when testimonial was created
    testimonialText: v.optional(v.string()), // Text version of the testimonial
    summary: v.optional(v.string()), // Summary of the testimonial
  }),
});
