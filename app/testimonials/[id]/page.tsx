import TestimonialDetail from "@/components/testimonial-detail";
import { Id } from "@/convex/_generated/dataModel";

export default async function TestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="max-w-screen-lg mx-auto py-24 px-8">
      <TestimonialDetail id={id as Id<"testimonials">} />
    </div>
  );
}
