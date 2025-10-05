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
        <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
          {testimonials?.map((testimonial) => (
            <Link
              key={testimonial._id}
              href={`/testimonials/${testimonial._id}`}
              className="cursor-pointer"
            >
              <Card className="flex flex-col">
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
                  <div className="mt-auto flex flex-col">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}