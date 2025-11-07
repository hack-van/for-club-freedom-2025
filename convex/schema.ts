import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { roles_schema } from "./lib/permissions";

export default defineSchema({
  ...authTables,
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    role: roles_schema, //Ensure this field matches VALID_ROLES and vice versa
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
  testimonials: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    media_id: v.optional(v.id("_storage")),
    media_type: v.string(),
    createdAt: v.optional(v.float64()),
    storageId: v.optional(v.string()),
    title: v.optional(v.string()),
    testimonialText: v.optional(v.string()),
    summary: v.optional(v.string()),
    searchText: v.optional(v.string()),
    approved: v.optional(v.boolean()), // Whether the testimonial is approved for display
  }).searchIndex("search_posts", {
    searchField: "searchText",
  }),
});
