"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { TestimonialCard } from "./testimonial-card";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

export function Testimonials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // ⏳ Debounce logic: wait 400ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400); // adjust delay (300–500ms is typical)

    return () => {
      clearTimeout(handler); // cleanup on every re-render
    };
  }, [searchQuery]);

  // 👇 Use the debounced value in your Convex query
  const testimonials = useQuery(api.testimonials.getTestimonials, { searchQuery: debouncedQuery });

  return (
    <>
      <Input
        placeholder="Search testimonials..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {testimonials?.map((testimonial) => (
        <TestimonialCard key={testimonial._id} testimonial={testimonial} />
      ))}
    </>
  );
}
