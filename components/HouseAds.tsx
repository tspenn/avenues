import Image from "next/image";
import { HOUSE_ADS } from "@/lib/houseAds";

export function HouseAds() {
  return (
    <aside
      aria-label="House notices"
      className="w-full shrink-0 border-t border-ink/15 pt-10 lg:w-56 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-8"
    >
      <p className="font-sans text-xs tracking-wide text-ink/55">Notices</p>
      <ul className="mt-5 space-y-7">
        {HOUSE_ADS.map((ad) => (
          <li key={ad.id}>
            <a
              href={ad.href}
              className="group block text-ink"
              rel="noopener noreferrer"
            >
              {ad.image ? (
                <Image
                  src={ad.image}
                  alt=""
                  width={448}
                  height={252}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : null}
              <p className={`font-sans text-[11px] tracking-wide text-ink/55 ${ad.image ? "mt-2" : ""}`}>
                {ad.source}
              </p>
              <p className="mt-1 font-serif text-base leading-snug group-hover:underline group-hover:underline-offset-4">
                {ad.title}
              </p>
              <p className="mt-1 font-sans text-sm text-ink/80">{ad.line}</p>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
