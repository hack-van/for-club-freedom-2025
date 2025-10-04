import {Testimonials} from "@/components/testimonials";
export default function TestimonialsPage() {
  return (
    <main className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="pt-4 text-4xl font-bold">
          Testimonials
        </h1>
      </div>
    <Testimonials />
    </main>
  );
}
