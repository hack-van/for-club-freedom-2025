"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

type Props = {
  id: Id<"testimonials">;
};

export default function TestimonialDetail({ id }: Props) {
  const testimonial = useQuery(api.testimonials.getTestimonialById, { id });

  if (!testimonial) {
    return <div>Loading testimonial...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {testimonial.name}'s Testimonial
      </h2>
      <p className="font-mono text-muted-foreground">{testimonial.email}</p>
      {testimonial.audioUrl && <audio controls src={testimonial.audioUrl} />}
      <div>
        <h3 className="font-bold">Summary</h3>
        <p>
          {testimonial.summary ? testimonial.summary : "No summary available."}
        </p>
      </div>
      <div>
        <h3 className="font-bold">Transcription</h3>
        <p>
          {testimonial.testimonialText
            ? testimonial.testimonialText
            : "No transcription available."}
        </p>
      </div>
    </div>
  );
}
