"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials() {
  const testimonials = useQuery(api.testimonials.getTestimonials);

  return testimonials?.map((testimonial) => (
    <TestimonialCard key={testimonial._id} testimonial={testimonial} />
  ));
}
