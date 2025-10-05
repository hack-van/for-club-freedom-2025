"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {Doc} from "@/convex/_generated/dataModel"

type Props = {
    testimonial: Doc<"testimonials"> & { mediaUrl?: string | null} 
}

export function TestimonialCard({ testimonial }: Props) {
  return (
    <div key={testimonial._id} className="flex justify-between items-start">
        <Link
        key={testimonial._id}
        href={`/testimonials/${testimonial._id}`}
        className="cursor-pointer flex-1"
        >
            <Card className="grid">
                <div className="mx-4 place-content-center">
                    {testimonial.mediaUrl ? (
                        testimonial.media_type === "audio" ? (
                        <audio controls src={testimonial.mediaUrl} className="w-full" />
                        ) : testimonial.media_type === "video" ? (
                        <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                            <video
                            controls
                            src={testimonial.mediaUrl}
                            className="h-full w-full object-contain"
                            onClick={(e) => e.stopPropagation()} // so clicking controls doesn't trigger the Link
                            />
                        </div>
                        ) : (
                        <div className="flex items-center justify-center bg-gray-200 w-full aspect-video rounded-md">
                            <span className="text-sm text-gray-500">No media</span>
                        </div>
                        )
                    ) : (
                        <div className="flex items-center justify-center bg-gray-200 w-full aspect-video rounded-md">
                        <span className="text-sm text-gray-500">No media</span>
                        </div>
                    )}
                </div>
                    <CardContent className="flex flex-col gap-4 p-6">
                        <p
                            className="text-muted-foreground leading-relaxed text-pretty h-20 overflow-hidden"
                            style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            }}
                        >
                            "{testimonial.summary}"
                        </p>
                        <p className="text-sm font-semibold self-start">{testimonial.name}</p>
                    </CardContent>
                    <div className="ml-4   grid grid-rows-2 gap-2 self-stretch">
                        {testimonial.media_id && (
                            <a
                            href={`/api/files/download/${encodeURIComponent(testimonial.media_id)}`}
                            className="mt-2 flex items-center justify-center px-3 py-1 border rounded hover:bg-gray-100"
                            >
                            Download Media
                            </a>
                        )}
                        <button
                            onClick={(e) => {
                            // Prevent Link navigation when button is clicked.
                            e.preventDefault();
                            e.stopPropagation();
                            // Prepare the text content by combining summary and transcription.
                            const textContent = `Summary: ${testimonial.summary}\n\nTranscription: ${
                                testimonial.testimonialText || "No transcription available."
                            }`;
                            // Create a Blob with the text content.
                            const blob = new Blob([textContent], { type: "text/plain" });
                            const url = URL.createObjectURL(blob);
                            // Create a temporary link to trigger download.
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `testimonial-${testimonial._id}.txt`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                            }}
                            className="mt-2 px-3 py-1 border rounded hover:bg-gray-100"
                        >
                            Download Text
                        </button>
                    </div>
            </Card>
        </Link>
        
    </div>
  )
}