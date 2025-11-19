"use client";
import { RequestPasswordResetForm } from "@/components/auth/request-password-reset-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function RequestPasswordResetPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RequestPasswordResetForm />
      </CardContent>
    </Card>
  );
}
