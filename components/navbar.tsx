import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <header className="border-b px-4 md:px-6">
      <Link to="/" className="flex h-16 items-center justify-center">
        <img
          className="h-10"
          src="/city_reach_logo.svg"
          alt="city-reach-logo"
        ></img>
      </Link>
    </header>
  );
}
