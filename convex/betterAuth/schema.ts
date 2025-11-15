import { defineSchema, defineTable } from "convex/server";
import { tables } from "./generatedSchema";
import { v } from "convex/values";
import { roles_schema } from "../lib/permissions";

// Don't add custom fields or change types to the generated schema
// here, use Better Auth's schema config for that:
// https://www.better-auth.com/docs/concepts/database#extending-core-schema
//
// Or, for tables that aren't supported for schema extension, you can track
// Better Auth tables with your own app tables using triggers:
// https://convex-better-auth.netlify.app/triggers
const schema = defineSchema({
  ...tables,
  user: defineTable({
      name: v.string(),
      email: v.string(),
      emailVerified: v.boolean(),
      image: v.optional(v.union(v.null(), v.string())),
      createdAt: v.number(),
      updatedAt: v.number(),
      userId: v.optional(v.union(v.null(), v.string())),
      role: roles_schema,
    })
      .index("email_name", ["email","name"])
      .index("name", ["name"])
      .index("userId", ["userId"]),
});

export default schema;