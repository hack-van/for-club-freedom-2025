import AuthLayout from "@/components/layouts/auth-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Unauthenticated } from "convex/react";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
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
