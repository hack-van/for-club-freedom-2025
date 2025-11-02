"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
 
export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const router = useRouter();
  
  return step === "signIn" ? (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn("resend-otp", formData).then(() =>
          setStep({ email: formData.get("email") as string })
        )
        .catch((err) => {
          toast.error(String(err?.message ?? err ?? "Failed to send code"));
        });
      }}
    >
      <div className="flex gap-4">
        <Input name="email" placeholder="Email" type="text" />
        <Button type="submit">Send code</Button>
      </div>
      
    </form>
  ) : (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">
        Check your email
      </h2>
      <p className="text-muted-foreground text-sm">
        Enter the 8-digit code we sent to your email address.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          void signIn("resend-otp", formData).then(() => {
              router.push("/");
            })
            .catch((err) => {
              toast.error(String(err?.message ?? err ?? "Failed to sign in"));
            });
        }}
      >
        <div className="flex gap-4">
          <Input name="code" placeholder="Code" type="text" />
          <Input name="email" value={step.email} type="hidden" />
          <div className="flex gap-1">
            <Button type="submit">Continue</Button>
            <Button type="button" onClick={() => setStep("signIn")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}