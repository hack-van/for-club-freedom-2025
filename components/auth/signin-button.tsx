"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
 
export function SignInButton() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
          const result = await signIn("password", formData);
          // Some SDKs return an object on failure instead of rejecting.
          if (result && (result as any).error) {
            toast.error(String((result as any).error));
            return;
          }
          // success -> navigate to testimonials
          router.push("/testimonials");
        } catch (err: any) {
          toast.error(String(err?.message ?? err ?? "Failed to sign in"));
        }
      }}
    >
      <div className="flex flex-col gap-4">
        <Input name="email" placeholder="Email" type="text" />
        <Input name="password" placeholder="Password" type="password" />
        <Input name="flow" type="hidden" value={"signIn"} />
        <Button type="submit">Sign in</Button>
      </div>
    </form>
  );
}