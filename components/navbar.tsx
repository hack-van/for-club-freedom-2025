import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-primary hover:text-primary/90">
            Club Freedom
          </Link>
          <Link href="/testimonials" className="text-primary hover:text-primary/90">
            View Testimonials
          </Link>
        </div>
      </div>
    </header>
  );
}
