"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { api } from "@/convex/_generated/api";
import { isModOrAdmin } from "@/convex/lib/permissions";
import Logo from "./logo";

export default function Navbar() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <header className="border-b px-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Logo />
        {isModOrAdmin(user?.role) && (
          <Authenticated>
            <div className="flex items-center gap-4">
              <Button className="cursor-pointer" asChild>
                <Link href="/testimonials">Testimonials</Link>
              </Button>
            </div>
          </Authenticated>
        )}
      </div>
      <Unauthenticated>
        <Link href="/sign-in" className="ml-4">
          <Button>Sign in</Button>
        </Link>
      </Unauthenticated>
      <Authenticated>
        <div className="flex items-center gap-4">
          Hello, {user?.email} ({user?.role})
          <Link href="/sign-out" className="ml-4">
            <SignOutButton />
          </Link>
        </div>
      </Authenticated>
    </header>
  );
}
