"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { Spinner } from "@/components/ui/spinner";

type Props = {
  id: Id<"testimonials">;
};

export default function TestimonialDetail({ id }: Props) {
  const testimonial = useQuery(api.testimonials.getTestimonialById, { id });

  if (!testimonial) {
    return <div>Loading testimonial...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{testimonial.name}'s Testimonial</h1>
      {testimonial.mediaUrl && testimonial.media_type == "audio" && <audio className="w-full" controls src={testimonial.mediaUrl} />}
      {testimonial.mediaUrl && testimonial.media_type == "video" && <video className="w-full" controls src={testimonial.mediaUrl} />}
      <div className="flex gap-2">
        {testimonial.mediaUrl && (testimonial.media_type == "video" || testimonial.media_type == "audio") && <Button>Download Media</Button>}
        <Button className="media-button-margin">
          {testimonial.media_id ? "Download Transcription" : "Download Testimonial"}
        </Button>
      </div>
      <div className="space-y-1">
        <h3 className="font-bold">Posted by {testimonial.name}</h3>
        <p className="font-mono text-muted-foreground">
          {testimonial.createdAt ? formatDistance(testimonial.createdAt, Date.now(), { addSuffix: true })
            : "Date not available"}
        </p>
      </div>
      <div className="space-y-0">
        <h3 className="font-bold flex items-center gap-1.5">Summary{!testimonial.summary && <Spinner></Spinner>}
        </h3>


        {testimonial.summary
          ? <p>{testimonial.summary}</p>
          : <p className="text-muted-foreground">Summary will be available soon.</p>}


      </div>
      <div>
        <h3 className="font-bold flex items-center gap-1.5">
          {testimonial.media_id ? "Transcription" : "Testimonial"}
          {!testimonial.testimonialText && <Spinner></Spinner>}
        </h3>


        {testimonial.testimonialText
          ? <p>{testimonial.testimonialText}</p>
          : <p className="text-muted-foreground">Transcription will be available soon.</p>}

      </div>
    </div>
  );
}
