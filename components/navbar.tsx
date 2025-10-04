export default function Navbar() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-center gap-4">
        <div className="flex items-center">
          <a href="/" className="text-primary hover:text-primary/90">
            Club Freedom
          </a>
        </div>
      </div>
    </header>
  );
}
