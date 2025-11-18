"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import { Unauthenticated, useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/testimonials");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <Unauthenticated>
      <AuthLayout>{children}</AuthLayout>
    </Unauthenticated>
  );
}
