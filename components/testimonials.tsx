"use client"
import { Card, CardContent } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"

export function Testimonials() {
  const testimonials = useQuery(api.testimonials.getTestimonials)
  return (
    <>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
                What Our Volunteers Say
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
                Don't just take our word for it. Here's what real volunteers have to say about their experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-4 md:px-6">
        <div className="grid gap-6 py-12 lg:gap-8 w-full">
          {testimonials?.map((testimonial) => (
            <div key={testimonial._id} className="flex justify-between items-start">
              <Link
                key={testimonial._id}
                href={`/testimonials/${testimonial._id}`}
                className="cursor-pointer flex-1"
              >
                <Card className="grid grid-cols-2">
                  <div className="mx-4 place-content-center">
                    {testimonial.mediaUrl ? (
                      testimonial.media_type === "audio" ? (
                        <audio
                          controls
                          src={testimonial.mediaUrl}
                          className="w-full"
                        />
                      ) : testimonial.media_type === "video" ? (
                        <video
                          controls
                          src={testimonial.mediaUrl}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center bg-gray-200 w-full h-32">
                          <span className="text-sm text-gray-500">No media</span>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center bg-gray-200 w-full h-32">
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
                </Card>
              </Link>
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
            </div>
          ))}
        </div>
      </section>
    </>
  )
}