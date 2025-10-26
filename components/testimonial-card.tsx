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
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import AudioPlayer from "./media/audio-player";
import VideoPlayer from "./media/video-player";

type Props = {
  testimonial: Doc<"testimonials"> & { mediaUrl?: string | null };
};

export function TestimonialCard({ testimonial }: Props) {
  const date = new Date(testimonial._creationTime);
  return (
    <Card className="w-full relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Link
            href={`/testimonials/${testimonial._id}`}
            className="hover:underline"
          >
            <CardTitle className="">{testimonial.title}</CardTitle>
          </Link>
          <p className="text-xs text-muted-foreground min-w-[150px] text-right">
            {formatDistanceToNow(date, { addSuffix: true })}
          </p>
        </div>
        <p className="text-sm">
          Posted by <strong>{testimonial.name}</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonial.mediaUrl && testimonial.media_type == "audio" && (
          <AudioPlayer src={testimonial.mediaUrl} />
        )}
        {testimonial.mediaUrl && testimonial.media_type == "video" && (
          <VideoPlayer src={testimonial.mediaUrl} />
        )}
        {!testimonial.mediaUrl && testimonial.testimonialText && (
          <TestimonialTextPreview content={testimonial.testimonialText} />
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

function TestimonialTextPreview({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-start">
      <p
        className={cn(
          "text-sm",
          isExpanded ? "line-clamp-none" : "line-clamp-5"
        )}
      >
        {content}
      </p>
      <Button
        variant="link"
        size="sm"
        className="p-0 ml-auto"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "view less" : "view more"}
      </Button>
    </div>
  );
}
