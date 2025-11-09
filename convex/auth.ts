import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { emailSchema } from "@/lib/schema";
import { ConvexError } from "convex/values";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({
    profile(params) {
      const { error, data } = emailSchema.safeParse(params);
      if (error) {
        throw new ConvexError(error.message);
      }
      return { email: data.email };
    },
  })],
});