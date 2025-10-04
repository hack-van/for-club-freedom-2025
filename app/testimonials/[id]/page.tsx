import TestimonialDetail from "@/components/testimonial-detail";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/dist/client/link";

export default async function TestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="max-w-screen-lg mx-auto py-24 px-8 space-y-4">
      <div>
        <Button asChild>
          <Link href="/">Make new record</Link>
        </Button>
      </div>
      <TestimonialDetail id={id as Id<"testimonials">} />
    </div>
  );
}
