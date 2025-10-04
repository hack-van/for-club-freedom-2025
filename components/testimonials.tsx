import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "This product has completely transformed how our team collaborates. The intuitive interface and powerful features have made our workflow so much more efficient.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "Outstanding service and support. The team went above and beyond to ensure our success. Highly recommend to anyone looking for a reliable solution.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Designer",
    company: "Creative Studio",
    content:
      "The attention to detail is remarkable. Every feature feels thoughtfully designed and the user experience is seamless. It's become an essential tool for our team.",
  },
]

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
              What Our Customers Say
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
              Don't just take our word for it. Here's what real customers have to say about their experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <CardContent className="flex flex-col gap-4 p-6">
                <p className="text-muted-foreground leading-relaxed text-pretty">"{testimonial.content}"</p>
                <div className="mt-auto flex flex-col">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
