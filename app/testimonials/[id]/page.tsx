import TestimonialDetail from "@/components/testimonial-detail";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function TestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="max-w-lg mx-auto py-12 px-8 space-y-4">
      <Button variant="link" className="!px-0" asChild>
        <Link href="/testimonials">
          <ChevronLeft />
          Back
        </Link>
      </Button>
      <TestimonialDetail id={id as Id<"testimonials">} />
    </div>
  );
}
