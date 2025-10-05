"use client";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatDistanceToNow } from "date-fns";

type Props = {
  testimonial: Doc<"testimonials"> & { mediaUrl?: string | null };
};

export function TestimonialCard({ testimonial }: Props) {
  const date = new Date(testimonial._creationTime);
  console.log(date);
  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle>{testimonial.name}</CardTitle>
        <CardDescription>
          {formatDistanceToNow(date, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold">Title</h3>
        {testimonial.mediaUrl && testimonial.media_type == "audio" && (
          <audio className="w-full" controls src={testimonial.mediaUrl} />
        )}
        {testimonial.mediaUrl && testimonial.media_type == "video" && (
          <video className="w-full" controls src={testimonial.mediaUrl} />
        )}
        <div></div>
      </CardContent>
    </Card>
  );
}
