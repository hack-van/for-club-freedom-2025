import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
// import { ResendOTP } from "./ResendOTP";
import { VALID_ROLES } from "./lib/permissions";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, args) {
      if (args.existingUserId) return;
      await ctx.db.patch(args.userId, {
        role: VALID_ROLES.USER,
      });
    }
  }
});