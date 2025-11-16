"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { emailSchema } from "@/lib/schema";
 
export function SignInForm() {
  const router = useRouter();
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
        // prefer the zod message (first issue)
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
      alert("Check your email for the reset password link!");
    } catch {
      alert("Failed to send reset password link. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };
  
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const parsed = emailSchema.safeParse(debouncedEmail);
        if (!parsed.success) {
          toast.error("Please provide a valid format");
          return;
        }
        const password = formData.get("password") as string;
        await authClient.signIn.email(
          {
            email: parsed.data,
            password,
          },
          {
            onSuccess: (ctx) => {
              router.push("/testimonials");
            },
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
          },
        );
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
        <Input name="password" placeholder="Password" type="password" />
        <Input name="flow" type="hidden" value={"signIn"} />
        <Button type="submit" className="cursor-pointer">Sign in</Button>
        <Button
          variant="link"
          size="sm"
          type="button"
          onClick={handleResetPassword}
          className="cursor-pointer"
          disabled={forgotLoading || isEmailValid}
        >
          {forgotLoading ? (
            <Loader2 size={14} className="animate-spin mr-1" />
          ) : null}
          Forgot your password? Fill in the email field, then click here.
        </Button>
      </div>
    </form>
  );
}