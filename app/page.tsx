import TestonomialForm from "@/components/form/testinomial-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 gap-y-12 max-w-screen-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-secondary">Club Freedom</span> Testimonial
        </h1>
        <p className="mt-4 text-lg">Please share your testimonial with us!</p>
        <p className="mt-4 italic text-lg text-gray-600">
          "Let your light shine before others" – Matthew 5:16
        </p>
      </div>
      <TestonomialForm />
    </main>
  );
}
