"use client"
import { SignInForm } from "@/components/auth/signin-form";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function SignInPage() {
  const user = useQuery(api.auth.getCurrentUser);
  return (
    <>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold py-24 gap-y-12">
            Sign In
          </h1>
        </div>
        <div className="flex justify-center"><SignInForm /></div>
      </Unauthenticated>
      <Authenticated>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold py-24 gap-y-12">
            Signed in as {user?.email} as {user?.role}
          </h1>
        </div>
      </Authenticated>
    </>
  );
}
