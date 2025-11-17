"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { emailSchema } from "@/lib/schema";
import Link from "next/link";
 
export function SignInForm() {
  const router = useRouter();
  
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string
        const parsed = emailSchema.safeParse(email);
        if (!parsed.success) {
          toast.error("Please provide a valid email.");
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
      <div className="flex flex-col gap-4 items-center">
        <Input name="email" placeholder="Email" type="text" />
        <Input name="password" placeholder="Password" type="password" />
        <Input name="flow" type="hidden" value="signIn" />
        <Button type="submit" className="cursor-pointer">Sign in</Button>
        <Link href="/request-password-reset">
          <Button className="cursor-pointer">Forgot your password?</Button>
        </Link>
      </div>
    </form>
  );
}