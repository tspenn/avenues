export type HouseAd = {
  id: string;
  source: string;
  title: string;
  line: string;
  href: string;
  image?: string;
};

export const HOUSE_ADS: HouseAd[] = [
  {
    id: "go-news",
    source: "Skyland Apps",
    title: "Go News",
    line: "Insights into all your world. Free.",
    href: "https://go-news.app/",
    image: "/gonews-day.jpg",
  },
  {
    id: "go-shop",
    source: "Skyland Apps",
    title: "Go Shop",
    line: "Lists, stock, and the next store run.",
    href: "https://www.my-go-shop.com/",
    image: "https://www.skylandapps.com/go-shop-hero.png",
  },
  {
    id: "my-support-agent",
    source: "Skyland Apps",
    title: "My Support Agent",
    line: "Every inbound message becomes a case.",
    href: "https://www.my-support-agent.com/",
    image: "https://www.skylandapps.com/my-support-agent-hero.png",
  },
  {
    id: "friday-canvas",
    source: "Skyland Apps",
    title: "FRIDAY Canvas",
    line: "One workspace for the work.",
    href: "https://fridaycanvas.com/",
    image: "https://www.skylandapps.com/friday-canvas-hero.png",
  },
  {
    id: "chkchk",
    source: "Skyland Apps",
    title: "ChkChk",
    line: "Assign. Track. Confirm.",
    href: "https://chkchk.app/",
    image: "https://www.skylandapps.com/chkchk-hero.png",
  },
  {
    id: "walking-by-faith",
    source: "Skyland Publishing",
    title: "Walking By Faith",
    line: "Read or listen to the Bible.",
    href: "https://go-bible.com/",
    image: "https://go-bible.com/ad-hero.png",
  },
  {
    id: "valencia",
    source: "Senses Marketplace",
    title: "Valencia / MonVie",
    line: "Florals, citrus, vanilla.",
    href: "https://senses.fineshoppes.com/valencia",
    image:
      "https://senses.fineshoppes.com/__l5e/assets-v1/9da96b89-aa94-4d99-9b09-a21644b3e675/oranges-1995079_1280.jpg",
  },
];
