import { Testimonials } from "@/components/testimonials";

export default function TestimonialsPage() {
  return (
    <main className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 py-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            What Our Volunteers Say
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
            Don't just take our word for it. Here's what real volunteers have to
            say about their experience.
          </p>
        </div>
      </div>
      <div className="w-full space-y-4 max-w-lg mx-auto">
        <Testimonials />
      </div>
    </main>
  );
}
