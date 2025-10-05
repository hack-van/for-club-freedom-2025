"use client";
import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  testimonial: Doc<"testimonials"> & { mediaUrl?: string | null };
};

export function TestimonialCard({ testimonial }: Props) {
  const date = new Date(testimonial._creationTime);
  console.log(date);
  return (
    <Card className="w-full relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Link href={`/testimonials/${testimonial._id}`} className="hover:underline">
            <CardTitle className="">{testimonial.title}</CardTitle>
          </Link>
          <p className="text-xs text-muted-foreground min-w-[150px] text-right">
            {formatDistanceToNow(date, { addSuffix: true })}
          </p>
        </div>
        <p className="text-sm ">
          Posted by <strong>{testimonial.name}</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonial.mediaUrl && testimonial.media_type == "audio" && (
          <audio className="w-full " controls src={testimonial.mediaUrl} />
        )}
        {testimonial.mediaUrl && testimonial.media_type == "video" && (
          <video className="w-full " controls src={testimonial.mediaUrl} />
        )}
        {!testimonial.mediaUrl && (
          <p className="text-sm ">{testimonial.testimonialText}</p>
        )}
        {testimonial.media_type !== "text" && (
          <CardDescription className="text-xs text-muted-foreground">
            {testimonial.summary}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
