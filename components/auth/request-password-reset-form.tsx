"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { emailSchema } from "@/lib/schema";
 
export function RequestPasswordResetForm() {
  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const val = email;
      setDebouncedEmail(val);

      const result = emailSchema.safeParse(val);
      if (result.success) {
        setIsEmailValid(true);
        setEmailError(null);
      } else {
        setIsEmailValid(false);
        setEmailError("Invalid email format");
      }
    }, 300);

    return () => clearTimeout(t);
  }, [email]);

  const handleResetPassword = async () => {
    const parsed = emailSchema.safeParse(debouncedEmail);
    if (!parsed.success) {
      toast.error("Invalid email format");
      return;
    }
    setForgotLoading(true);
    try {
      await authClient.requestPasswordReset({
        email: debouncedEmail,
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      });
      toast.message("Check your email for the reset password link!");
    } catch (err) {
      toast.error("Password reset request failed. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleResetPassword();
      }}
    >
      <div className="flex flex-col gap-4">
        <Input
          name="email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {debouncedEmail !== "" && emailError && (
          <p className="text-sm text-red-500">{emailError}</p>
        )}
        <Button disabled={forgotLoading || !isEmailValid} type="submit" className="cursor-pointer">Request password reset</Button>
      </div>
    </form>
  );
}