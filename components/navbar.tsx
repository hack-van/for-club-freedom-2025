"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { isModOrAdmin } from "@/convex/lib/permissions";
import Logo from "./logo";
import UserDropDown from "./user-dropdown";

export default function Navbar() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <header className="border-b px-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Logo />
        {isModOrAdmin(user?.role) && (
          <Authenticated>
            <div className="flex items-center gap-4">
              <Button variant="link" className="cursor-pointer" asChild>
                <Link href="/testimonials">Testimonials</Link>
              </Button>
            </div>
          </Authenticated>
        )}
      </div>
      <Unauthenticated>
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </Unauthenticated>
      <Authenticated>
        <UserDropDown />
      </Authenticated>
    </header>
  );
}
