"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
 
export function SignIn() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        void signIn("password", formData).catch((err) => {
          toast.error(String(err?.message ?? err ?? "Failed to sign in"));
        });
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