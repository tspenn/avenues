import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/file", label: "File" },
  { href: "/writers", label: "Writers" },
  { href: "/about", label: "About" },
  { href: "/subscribe", label: "Subscribe" },
];

export function SiteHeader() {
  return (
    <header className="bg-header text-accent">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-4 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="inline-block w-fit" aria-label="Avenues home">
          <Image
            src="/avenues-wordmark-tight.jpg"
            alt="Avenues"
            width={634}
            height={263}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm tracking-wide">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-accent underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
