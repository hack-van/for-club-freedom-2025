"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { SignOutButton } from "@/components/auth/signout-button";
import { api } from "@/convex/_generated/api";
import { isModOrAdmin } from "@/convex/lib/permissions";

export default function Navbar() {
  const user = useQuery(api.auth.getCurrentUser);
  return (
    <header className="border-b px-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="flex h-16 items-center justify-center">
          <img
            className="h-10"
            src="/city_reach_logo.svg"
            alt="city-reach-logo"
          ></img>
        </Link>
        {isModOrAdmin(user?.role) && (
          <Authenticated>
            <div className="flex items-center gap-4">
              <Link href="/testimonials" className="ml-4">
                <Button className="cursor-pointer">Testimonials</Button>
              </Link>
            </div>
          </Authenticated>
        )}
      </div>
      <Unauthenticated>
        <Link href="/signin" className="ml-4">
          <Button>Sign in</Button>
        </Link>
      </Unauthenticated>
      <Authenticated>
        <div className="flex items-center gap-4">
          Hello, {user?.email} ({user?.role})
          <Link href="/signin" className="ml-4">
            <SignOutButton />
          </Link>
        </div>
      </Authenticated>
    </header>
  );
}
