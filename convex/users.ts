import { query } from "./_generated/server";
import { createAccount, getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { roles_schema } from "./lib/permissions";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

/**
 * Retrieves the internal user role for a given user ID.
 */
// async function getInternalUserRole(ctx: QueryCtx, userId: Id<"users">) {
//   const user = await ctx.db.get(userId);
//   const userRole = await ctx.db
//     .query("users")
//     .filter((q) => q.eq(q.field("_id"), user?._id))
//     .unique();

//   return { role: userRole?.role ?? "user" };
// }

/**
 * Admin creates a new user account with specified email, password, and role.
 * @param args - The arguments for creating a user, including:
 *   - email: The email of the new user.
 *   - password: The password for the new user.
 *   - role: Optional ID for the user's role.
 * @returns The newly created user account.
 */
export const adminCreateUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    role: roles_schema,
  },
  handler: async (
    ctx: any,
    args: { password: string; email: string; role?: string }
  ) => {
    //The code below will be useful later if admins want to create users through a UI. Otherwise, we can leave it commented.
    // const userId = await getAuthUserId(ctx);
    // if (!userId) throw new ConvexError("Not authenticated");

    // const userRole = await getInternalUserRole(ctx, userId);
    // if (userRole?.role !== "admin") {
    //   throw new ConvexError("Not authorized");
    // }

    const providerId = "password";
    const secret = args.password;
    const account = {
      id: args.email,
      secret: secret,
    };
    const profile = {
      email: args.email,
      role: args.role ?? "admin",
    };
    const newUser = await createAccount(ctx, {
      provider: providerId,
      account: account,
      profile: profile,
      shouldLinkViaEmail: false,
      shouldLinkViaPhone: false,
    });
    return newUser;
  },
});