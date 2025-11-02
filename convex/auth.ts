import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP } from "./ResendOTP";
import { VALID_ROLES } from "./lib/permissions";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ResendOTP],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, args) {
      if (args.existingUserId) return;
      await ctx.db.patch(args.userId, {
        role: VALID_ROLES.USER,
      });
    }
  }
});