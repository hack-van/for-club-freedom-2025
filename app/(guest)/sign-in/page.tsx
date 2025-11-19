"use client";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Unauthenticated } from "convex/react";

export default function SignInPage() {
  return (
    <Unauthenticated>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </Unauthenticated>
  );
}
