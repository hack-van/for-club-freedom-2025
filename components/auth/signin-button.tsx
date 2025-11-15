"use client"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
 
export function SignInButton() {
  const router = useRouter();
  
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await authClient.signIn.email(
          {
            email,
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
        <Input name="email" placeholder="Email" type="text" />
        <Input name="password" placeholder="Password" type="password" />
        <Input name="flow" type="hidden" value={"signIn"} />
        <Button type="submit" className="cursor-pointer">Sign in</Button>
      </div>
    </form>
  );
}