import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  testimonials: defineTable({
    audio: v.string(),
    email: v.string(),
    name: v.string(),
  }),
});
