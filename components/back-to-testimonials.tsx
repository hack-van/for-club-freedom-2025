"use client"
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { isModOrAdmin } from "@/convex/lib/permissions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BackToTestimonialsLink({
  preloadedUserQuery,
}: {
  preloadedUserQuery: Preloaded<typeof api.auth.getCurrentUser>;
}){
    const user = usePreloadedQuery(preloadedUserQuery);
    const isAdmin = isModOrAdmin(user?.role)
    if (!isAdmin) return null;
    return (
        <Link href="/testimonials">
            <ChevronLeft />
            Back
        </Link>
    );
}