import AuthLayout from "@/components/layouts/auth-layout";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Unauthenticated } from "convex/react";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession();
    if (error) {
      throw redirect({
        to: "/",
      });
    }
    if (data?.user) {
      throw redirect({
        to: "/testimonials",
      });
    }
  },
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Unauthenticated>
        <Outlet />
      </Unauthenticated>
    </AuthLayout>
  );
}
