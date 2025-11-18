"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <Button className="cursor-pointer" onClick={() => void handleSignOut()}>
      Sign out
    </Button>
  );
}
