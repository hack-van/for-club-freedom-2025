import BackToTestimonialsLink from "@/components/back-to-testimonials";
import TestimonialDetail from "@/components/testimonial-detail";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { preloadQuery } from "convex/nextjs"

export default async function TestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();
  const preloadedUserQuery = await preloadQuery(
    api.auth.getCurrentUser,
    {},
    { token },
  );
  return (
    <div className="max-w-lg mx-auto py-12 px-8 space-y-4">
      <Button variant="link" className="!px-0" asChild>
        <BackToTestimonialsLink preloadedUserQuery={preloadedUserQuery} />
      </Button>
      <TestimonialDetail id={id as Id<"testimonials">} />
    </div>
  );
}
