"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
 
export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  return step === "signIn" ? (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn("resend-otp", formData).then(() =>
          setStep({ email: formData.get("email") as string })
        );
      }}
    >
      <input name="email" placeholder="Email" type="text" />
      <button type="submit">Send code</button>
    </form>
  ) : (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn("resend-otp", formData);
      }}
    >
      <input name="code" placeholder="Code" type="text" />
      <input name="email" value={step.email} type="hidden" />
      <button type="submit">Continue</button>
      <button type="button" onClick={() => setStep("signIn")}>
        Cancel
      </button>
    </form>
  );
}