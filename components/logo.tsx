import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex h-16 items-center justify-center">
      <img
        className="h-10"
        src="/city_reach_logo.svg"
        alt="city-reach-logo"
      ></img>
    </Link>
  );
}
