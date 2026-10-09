import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getSiteOrigin } from "@/lib/site-origin";

const TITLE = "Garage Door Repair Services | Installation - Boise, ID";
const DESCRIPTION =
  "Garage door repair and installation in Boise, Meridian, Eagle, Nampa, and the Treasure Valley. Family owned 30+ years. Same-day springs and tune-ups. Call 208-514-2871, 24/7.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: "/images/hero-day.jpg" },
    ],
  }),
  component: Home,
});

const cities = [
  "Boise",
  "Garden City",
  "Meridian",
  "Eagle",
  "Nampa",
  "Star",
  "Caldwell",
  "Middleton",
  "Homedale",
  "Kuna",
  "Bowmont",
  "Melba",
];

const reviews = [
  ["Don Massey", "Corbin came and assessed what was needed to replace our broken spring. He had the garage door repaired within an hour. He was prompt and efficient."],
  ["Tod Jenkins", "Was very fast and efficient. Like how they text you when the technician is on their way and also a picture of the technician is included in the text."],
  ["Teresa Hamblin", "Corbin was polite, professional, and efficient. We replaced our motor, sensors for our garage-door opener. Pricing was fair. Appointment was prompt."],
  ["Jonathan Young", "They responded very quickly when our garage door needed emergency replacement. They had a new door in place just a few days later."],
] as const;

function GoogleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.6 7.2l6.3 5.3C37.4 38.4 44 33 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

function ReviewStars() {
  return (
    <span className="inline-flex gap-0.5 text-[#FBBC04]" aria-label="5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path fill="currentColor" d="M10 1.5l2.4 5.2 5.6.7-4.1 3.8 1.1 5.6L10 14.2 4.9 16.8l1.1-5.6L2 7.4l5.6-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

const faqs = [
  ["When should I replace a garage door with a new one?", "You need to replace your garage door if it hasn’t run properly for a while, if it is too old, you have had a break-in, the door lacks child safety features, or the door is severely damaged. Do not try to fix it on your own. Call 208-514-2871."],
  ["How do I choose a good company for garage door repair in Boise?", "Ask for a reference and call the team to find out what they offer. Read the testimonials and check that the company is licensed. Garage Door Store Boise is family owned and operated, and the site says the company is fully licensed and insured."],
  ["Can I install the garage door myself?", "No. The shop says installation needs special tools and training. A bad install can damage the door and the security of the house. Call 208-514-2871 for a free installation quote."],
  ["What is a garage door tune-up?", "The shop lists a garage door tune-up at $125. It includes tax and labor, and it is a full tune-up."],
  ["Why did my garage door stop working?", "The site lists a blocked photo eye, a remote problem, broken torsion springs, a limit that needs adjusting, dead transmitter batteries, something in the door’s path, or a track that is not aligned. Call a technician rather than forcing the door."],
  ["Do you come the same day?", "Spring changes, opener replacement, doors off track, or general maintenance can be done the same day you call."],
  ["Can I get a price over the phone?", "Yes. The shop says it has set pricing, and you can call for a phone estimate."],
  ["What brands do you install?", "Wayne Dalton, LiftMaster, Clopay, and Genie, including the Genie 2028 belt-drive opener."],
  ["Where is the shop, and where do you drive?", "9075 W Hackamore Dr, Boise, ID 83709, from the contact page. The site also lists Garden City, Meridian, Eagle, Nampa, Star, Caldwell, Middleton, Homedale, Kuna, Bowmont, Melba, and surrounding areas."],
  ["Is someone available after hours?", "Yes. The site says to call 208-514-2871 any time, 24/7, and talk to a technician."],
] as const;

const services = [
  {
    src: "/images/jobs/steel.jpg",
    alt: "White steel garage doors on a home serviced by Garage Door Store Boise",
    title: "Garage door repair",
    copy: "Garage Door Store Inc Boise repairs the door you have: springs, openers, doors off the track, and general maintenance.",
    points: ["Spring changes", "Opener replacement", "Doors off the track", "General maintenance"],
    note: "These can be done the same day you call.",
    place: "Same-day repair",
  },
  {
    src: "/images/jobs/install.jpg",
    alt: "Carriage-style garage door installed on a stone and siding home",
    title: "Garage door installation",
    copy: "We install many garage door styles, including standard and carriage-style overhead doors, with a free in-home consultation.",
    points: ["Standard doors", "Carriage-style doors", "Wayne Dalton, LiftMaster, Clopay, Genie", "Free in-home consultation"],
    note: "The staff helps you pick the door for the house. Call for the free visit.",
    place: "In-home consultation",
  },
  {
    src: "/images/jobs/genie-2028.jpg",
    alt: "Genie model 2028 belt-drive garage door opener from the shop’s opener page",
    title: "Springs and openers",
    copy: "When the springs are not working properly, that can be a sign of bad or broken springs. Dual spring change is $350, with tax, labor, and a 10-year warranty. The Genie 2028 package is $700.",
    points: ["Dual springs, 10-year warranty", "Torque tubes", "Genie 2028 belt drive", "Two remotes and a keypad"],
    note: "Dual spring change is $350. Torque tubes are $450. The 7-foot Genie 2028 package is $700, with two remotes and a keypad.",
    place: "Posted packages",
  },
  {
    src: "/images/jobs/standard.jpg",
    alt: "Three white residential garage doors on a Boise-area house",
    title: "Garage door tune-up",
    copy: "A full tune-up is listed at $125, including tax and labor.",
    points: ["Full tune-up", "Tax and labor included", "Listed at $125", "Call 208-514-2871"],
    note: "General maintenance can be done the same day you call.",
    place: "Listed at $125",
  },
];

const reasons = [
  { sketch: "/images/sketches/crew.png", alt: "Sketch of two technicians in front of a garage", title: "Family owned", copy: "Garage Door Store Boise, Inc. Local shop. More than 30 years." },
  { sketch: "/images/sketches/springs.png", alt: "Sketch of a garage door spring and a clock", title: "Same-day calls", copy: "Springs, openers, off-track doors, and general maintenance." },
  { sketch: "/images/sketches/driveway.png", alt: "Sketch of a service van in a home driveway", title: "In-home estimate", copy: "Free in-home consultation, and 10% off with the estimate." },
  { sketch: "/images/sketches/valley.png", alt: "Sketch map of a valley with houses and a road", title: "Treasure Valley", copy: "Boise, Garden City, Meridian, Eagle, Nampa, and the towns listed on the site." },
  { sketch: "/images/sketches/quote.png", alt: "Sketch of a clipboard with a garage door drawing", title: "Set pricing", copy: "Set pricing. Call for a phone estimate. Their site says not to get ripped off by overcharges and add-ons." },
  { sketch: "/images/sketches/repair.png", alt: "Sketch of a garage door panel, a torsion spring, and a wrench", title: "Licensed and insured", copy: "The shop states it is fully licensed and insured." },
];

function SectionBreak({ kind }: { kind: "panels" | "track" | "spring" }) {
  if (kind === "panels") {
    return (
      <div aria-hidden="true" className="relative z-30 bg-[#1c1f24] px-4 py-3">
        <div className="mx-auto flex max-w-5xl gap-1.5">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="relative h-11 flex-1 rounded-[3px] bg-[#2a3038] shadow-[inset_0_-7px_0_#ed1c24,inset_0_1px_0_rgba(255,255,255,0.2)]">
              <span className="absolute top-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#ed1c24]" />
              <span className="absolute top-1.5 left-2 size-1.5 rounded-full bg-white/25" />
              <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-white/25" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "track") {
    return (
      <div aria-hidden="true" className="relative z-30 h-16 overflow-hidden bg-[#1c1f24]">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-[#ed1c24]" />
        <div className="absolute inset-x-0 top-[calc(50%+7px)] h-px bg-white/25" />
        <div className="roller-run absolute top-1/2 flex w-[200%] -translate-y-1/2">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className="mx-10 grid size-7 shrink-0 place-items-center rounded-full border-4 border-[#d4cdc3] bg-[#1c1f24] shadow-[0_0_0_3px_#ed1c24]">
              <span className="size-1.5 rounded-full bg-[#ed1c24]" />
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="relative z-30 flex items-center justify-between gap-2 overflow-hidden bg-[#f7f4ef] px-4 py-3">
      {Array.from({ length: 6 }, (_, i) => (
        <svg key={i} viewBox="0 0 140 40" className="h-9 w-36 shrink-0 text-[#ed1c24]" aria-hidden="true">
          <path d="M2 20h18M120 20h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 20c0-12 10-12 10 0s10 12 10 0 10-12 10 0 10 12 10 0 10-12 10 0 10 12 10 0 10-12 10 0 10 12 10 0" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="8" cy="20" r="3" fill="#1c1f24" />
          <circle cx="132" cy="20" r="3" fill="#1c1f24" />
        </svg>
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="kicker">{children}</p>;
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="kicker">{kicker}</p>
      <h2 className="mt-3 max-w-3xl text-4xl md:text-6xl">{title}</h2>
    </div>
  );
}

function Fade({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}: {
  as?: "div" | "li" | "article" | "a" | "details";
  className?: string;
  delay?: number;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      {...rest}
      className={`card-in reveal ${on ? "on" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

const COUPONS = [
  {
    title: "Garage door tune-up",
    price: "$125",
    lines: ["Includes tax & labor", "Full tune-up"],
  },
  {
    title: "Dual spring change",
    price: "$350",
    lines: ["Includes tax & labor", "10-year warranty", "Torque tubes $450"],
  },
  {
    title: "Garage door motor",
    price: "$700",
    lines: ["7' Genie 2028 belt drive", "2 remotes and a keypad"],
  },
];

function CouponBoard() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = document.getElementById("coupons");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="coupons" className="coupon-wood">
      <div className="mx-auto max-w-5xl px-5">
        <div className={`coupon-row ${live ? "is-live" : ""}`}>
          {COUPONS.map((coupon) => (
            <article key={coupon.title} className="coupon">
              <h2 className="font-display text-xl">{coupon.title}</h2>
              <p className="font-display mt-3 text-6xl leading-none text-signal">{coupon.price}</p>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {coupon.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="no-print mt-8 flex justify-center">
          <button type="button" className="btn-ticket inline-flex items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold text-white" onClick={() => window.print()}>
            Print coupons
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [service, setService] = useState(0);
  const [cardsIn, setCardsIn] = useState(false);
  const cardsRef = useRef<HTMLOListElement>(null);
  const linesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const [aboutIn, setAboutIn] = useState(false);

  useEffect(() => {
    const node = linesRef.current;
    if (!node) return;
    let scroller: HTMLElement | Window = window;
    let parent = node.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      if (/(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight + 8) {
        scroller = parent;
        break;
      }
      parent = parent.parentElement;
    }
    const shift = () => {
      const top = scroller === window ? window.scrollY : (scroller as HTMLElement).scrollTop;
      node.style.backgroundPosition = `${-top * 0.85}px 0px`;
    };
    shift();
    scroller.addEventListener("scroll", shift, { passive: true });
    return () => scroller.removeEventListener("scroll", shift);
  }, []);

  useEffect(() => {
    const node = cardsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCardsIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = aboutRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAboutIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".page-enter");
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const slides = [
    { n: "01", label: "Garage door repair", item: services[0], lines: services[0].points, extra: services[0].note },
    { n: "02", label: "Installation", item: services[1], lines: services[1].points, extra: services[1].note },
    { n: "03", label: "Springs and openers", item: services[2], lines: ["Dual springs · $350", "Torque tubes · $450", "Genie 2028 · $700"], extra: "Wayne Dalton, LiftMaster, Clopay, and Genie." },
    { n: "04", label: "Tune-up", item: services[3], lines: services[3].points, extra: services[3].note },
  ] as const;
  const slide = slides[service];

  return (
    <main id="top" className="bg-[#f7f4ef] text-[#1c1f24]">
      <LocalSchema />

      <section className="relative z-0 overflow-hidden bg-[#1c1f24] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_55%_at_28%_48%,rgba(255,249,236,0.14),transparent_70%),radial-gradient(90%_70%_at_0%_0%,rgba(237,28,36,0.28)_0%,transparent_40%),radial-gradient(120%_90%_at_50%_40%,transparent_40%,rgba(0,0,0,0.55)_100%),linear-gradient(160deg,#1c1f24_0%,#121418_100%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-stretch gap-12 px-6 pt-24 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28 lg:pb-20">
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <p className="hero-in inline-flex w-fit rounded-full bg-[#ed1c24] px-4 py-2 text-[11px] font-bold tracking-wide text-white uppercase">Free in-home estimate · 10% off</p>
            <div className="hero-in hero-in-2">
              <p className="mt-8 flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Local garage door repair and installation</p>
              <h1 className="my-5 font-display text-[2.75rem] leading-[0.88] text-[#FFF9EC] uppercase sm:text-6xl lg:text-[4.6rem]">
                Garage door<br />repair.
              </h1>
              <p className="max-w-md text-base leading-relaxed text-white/80">
                We service and repair your existing garage door, or replace it with something modern and reliable. Family owned for over 30 years in Boise, Meridian, Eagle, Nampa, and the Treasure Valley. Spring changes, opener replacement, doors off track, or general maintenance can be done the same day you call. Call 208-514-2871, 24/7, and talk to a technician.
              </p>
            </div>
            <div className="hero-in hero-in-3 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#quote" className="btn-ticket inline-flex items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold text-white">
                Request a free estimate visit
                <span aria-hidden="true">→</span>
              </a>
              <a href="tel:2085142871" className="rounded-full border-2 border-[#ed1c24] px-6 py-3.5 text-center text-sm font-bold text-[#FFF9EC]">Call 208.514.2871</a>
            </div>
          </div>
          <figure className="group relative flex h-full min-h-[28rem] flex-col lg:min-h-[36rem]">
            <div className="hero-frame flex min-h-0 flex-1 flex-col">
              <span className="absolute top-4 right-0 bottom-0 left-4 rounded-[1.4rem] bg-[#ed1c24] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:top-6 group-hover:left-6" />
              <div className="relative mr-4 mb-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] border border-[#1c1f24] bg-[#16191e] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-2 group-hover:-translate-y-2">
                <img src="/images/shop-photo.webp" alt="Garage Door Store Boise crew and service trucks" width={1400} height={588} className="min-h-0 w-full flex-1 object-cover transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]" />
                <figcaption className="px-5 py-5 text-sm">
                  <p className="text-xs font-bold tracking-[0.16em] text-[#ed1c24] uppercase">Real people. Local service.</p>
                  <p className="mt-1 text-white/85">The crew and the trucks. Family owned, 30+ years in Boise.</p>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <div className="relative z-30 -mt-16 h-16" aria-hidden="true">
        <div className="truck-rail absolute inset-x-0 bottom-0" />
        <div className="truck-loop absolute bottom-0 left-0 h-16 w-[10.57rem]">
          <img src="/images/truck-side.png" alt="" className="absolute inset-0 h-full w-full object-contain object-bottom" />
          <span className="truck-wheel truck-wheel-front" />
          <span className="truck-wheel truck-wheel-rear" />
        </div>
      </div>
      <section id="symptom" className="slant scroll-mt-24 bg-[#f7f4ef]">
        <div className="page-enter mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 lg:py-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Start with the symptom</p>
            <h2 className="mt-4 font-display text-5xl leading-[0.9] uppercase md:text-6xl">What is your door doing?</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6b7280]">Choose what you notice. A technician confirms the cause at the house. Do not force the door.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {(
              [
                "Door will not open",
                "Door will not close",
                "Broken spring",
                "Crooked or off track",
                "Needs a tune-up",
                "Opener will not respond",
                "Remote or keypad",
                "Need a new garage door",
              ] as const
            ).map((label, i) => (
              <li key={label}>
                <a href="tel:2085142871" className="group flex items-center justify-between rounded-2xl border border-[#ece7e0] bg-white px-4 py-4 shadow-[0_8px_22px_rgba(28,31,36,0.05)] transition hover:-translate-y-0.5 hover:border-[#ed1c24]/30">
                  <span className="flex items-center gap-3 text-sm font-semibold">
                    <span className="font-display text-xl text-[#ed1c24]">0{i + 1}</span>
                    {label}
                  </span>
                  <span className="grid size-7 place-items-center rounded-full border border-[#1c1f24]/15 text-sm text-[#1c1f24]/40 transition group-hover:border-[#ed1c24] group-hover:bg-[#ed1c24] group-hover:text-white">+</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="slant-flip relative overflow-hidden bg-[#1c1f24] text-white">
        <img src="/images/services-bg.jpg" alt="" className="absolute inset-0 h-full w-full scale-105 object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#101216]/92 via-[#101216]/45 to-[#101216]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(16,18,22,0.55)_100%)]" />
        <div className="page-enter relative mx-auto max-w-5xl px-5 py-16 lg:py-20">
          <div className="text-center">
            <p className="inline-block bg-[#ed1c24] px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase">Services we offer</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.9] md:text-6xl">Garage door services in Boise.</h2>
          </div>
          <ol ref={cardsRef} className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              { src: "/images/jobs/steel.jpg", alt: "White steel garage doors on a home serviced by Garage Door Store Boise", title: "Garage door repair", copy: "Repair on the door you have, including springs, openers, doors off the track, and general maintenance.", icon: "/images/icons/repair.jpg" },
              { src: "/images/jobs/install.jpg", alt: "Carriage-style garage door installed on a stone and siding home", title: "Garage door installation", copy: "Custom installation of standard and carriage-style doors, with a free in-home consultation.", icon: "/images/icons/install.jpg" },
              { src: "/images/jobs/genie-2028.jpg", alt: "Genie model 2028 belt-drive garage door opener", title: "Springs and openers", copy: "Dual spring change is $350. The Genie 2028 package is $700, with two remotes and a keypad.", icon: "/images/icons/springs.jpg" },
              { src: "/images/jobs/standard.jpg", alt: "Three white residential garage doors on a Boise-area house", title: "Garage door tune-up", copy: "A full tune-up is listed at $125, including tax and labor.", icon: "/images/icons/tuneup.jpg" },
            ].map(({ src, alt, title, copy, icon }) => (
              <li key={title} className={`card-offset group relative h-full${cardsIn ? " is-in" : ""}`}>
                <span className="absolute top-3 right-0 bottom-0 left-3 rounded-[1.4rem] bg-[#ed1c24] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:top-5 group-hover:left-5" />
                <div className="relative mr-3 mb-3 flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-white text-[#1c1f24] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5">
                  <img src={src} alt={alt} className="h-52 w-full object-cover sm:h-56" />
                  <div className="relative flex flex-1 flex-col px-6 pt-10 pb-7">
                    <span className="absolute -top-8 left-6 grid size-16 place-items-center overflow-hidden rounded-full bg-[#ed1c24] shadow-[0_6px_16px_rgba(0,0,0,0.25)] ring-4 ring-white">
                      <img src={icon} alt="" className="svc-icon size-full object-cover" />
                    </span>
                    <h3 className="font-display text-2xl uppercase leading-none">{title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#4b5563]">{copy}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="services" ref={linesRef} className="slant svc-lines scroll-mt-24 text-[#1c1f24]">
        <div className="page-enter mx-auto max-w-5xl px-5 py-16 lg:py-16">
          <p className="flex items-center gap-3 font-bold tracking-[0.16em] text-[#ed1c24] uppercase">
            <span className="h-1 w-10 rounded-full bg-[#ed1c24]" />
            Services we offer
          </p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.9] normal-case md:text-6xl">Boise garage door services.</h2>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border-2 border-[#ed1c24] bg-[#14171c] text-white">
            <div className="grid lg:h-[34rem] lg:grid-cols-[16rem_1.2fr_0.95fr]">
              <div className="flex gap-3 overflow-auto p-4 lg:flex-col lg:p-5">
                {slides.map((item, index) => {
                  const on = index === service;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setService(index)}
                      className={`flex min-w-44 shrink-0 items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold lg:min-w-0 ${on ? "bg-[#ed1c24] text-white" : "border border-white/20 bg-[#1c1f24] text-white"}`}
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold ${on ? "bg-[#1c1f24] text-white" : "border border-white/35 text-white"}`}>{item.n}</span>
                      <span className="leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <img key={slide.item.src} src={slide.item.src} alt={slide.item.alt} className="h-72 w-full object-cover lg:h-full lg:min-h-0" />
              <div key={slide.n} className="svc-copy flex flex-col justify-center overflow-auto px-6 py-8 lg:px-8">
                <p className="text-sm font-semibold tracking-wide text-white/55">{slide.n} / 04</p>
                <h3 className="mt-3 font-display text-4xl leading-[0.95] normal-case lg:text-5xl">{slide.item.title}</h3>
                <p className="mt-4 max-w-sm text-white/80">{slide.item.copy}</p>
                <a href="#quote" className="btn-ticket mt-6 inline-flex w-fit items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 font-bold text-white">Request a free estimate <span aria-hidden="true">→</span></a>
                <a href="tel:2085142871" className="mt-3 inline-flex w-fit rounded-full border border-white/70 px-5 py-3 font-bold text-white">Call 208.514.2871</a>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 bg-[#ed1c24] py-3.5">
              <button type="button" aria-label="Previous service" onClick={() => setService((n) => (n + slides.length - 1) % slides.length)} className="grid size-11 place-items-center rounded-full bg-white text-lg font-bold text-[#1c1f24]">←</button>
              <span className="min-w-14 text-center font-bold text-white">{service + 1} of {slides.length}</span>
              <button type="button" aria-label="Next service" onClick={() => setService((n) => (n + 1) % slides.length)} className="grid size-11 place-items-center rounded-full bg-white text-lg font-bold text-[#1c1f24]">→</button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="slant-flip about-band relative scroll-mt-24 overflow-hidden bg-[#ed1c24] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(520px 280px at 0% 0%, rgba(255,255,255,0.16), transparent 70%), radial-gradient(640px 380px at 100% 100%, rgba(28,31,36,0.22), transparent 72%), repeating-linear-gradient(115deg, transparent 0 18px, rgba(255,255,255,0.08) 18px 19px)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:items-stretch lg:py-16">
          <div className={`about-copy${aboutIn ? " is-in" : ""}`}>
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-white uppercase before:h-px before:w-8 before:bg-white">The shop and the crew</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] text-white md:text-6xl">A family company.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/85">Garage Door Store Boise is a family owned and operated local business, providing garage door service for over 30 years. The shop is at 9075 W Hackamore Dr, Boise, ID 83709. A working door is part of the security and convenience of the house. The crew handles minor adjustments and larger repairs, and replaces a door only when it is time.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["01", "On site", "A technician looks at the door"],
                ["02", "Your options", "Repair it, or replace it"],
                ["03", "Set price", "Call for a phone estimate"],
              ].map(([n, title, note]) => (
                <li key={title} className="group relative">
                  <span className="absolute top-2 right-0 bottom-0 left-2 rounded-2xl bg-[#1c1f24] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:top-3 group-hover:left-3" />
                  <div className="relative mr-2 mb-2 rounded-2xl bg-white px-4 py-4 transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-1 group-hover:-translate-y-1">
                    <div className="font-display text-3xl leading-none text-[#ed1c24]">{n}</div>
                    <h3 className="mt-3 font-display text-xl uppercase leading-none text-[#1c1f24]">{title}</h3>
                    <p className="mt-2 text-[#4b5563]">{note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#quote" className="btn-ticket btn-ticket-ink mt-8 inline-flex w-fit items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold text-white">Request a free estimate <span aria-hidden="true">→</span></a>
          </div>
          <figure className={`about-frame group relative flex h-full flex-col${aboutIn ? " is-in" : ""}`}>
            <span className="absolute top-4 right-0 bottom-0 left-4 rounded-[1.4rem] bg-[#1c1f24] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:top-6 group-hover:left-6" />
            <div className="relative mr-4 mb-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] bg-[#1c1f24] text-white transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5">
              <img src="/images/shop-photo.webp" alt="Garage Door Store Boise crew and red service trucks" className="aspect-video w-full object-cover lg:aspect-auto lg:min-h-0 lg:flex-1" />
              <figcaption className="px-6 py-5">
                <p className="shop-kicker font-bold tracking-[0.16em] text-[#ed1c24] uppercase">The Boise crew</p>
                <p className="shop-caption mt-2 text-white">Technicians from Garage Door Store Boise, with the red service trucks. The number on the door is 208.514.2871.</p>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section id="reviews" className="slant scroll-mt-24 bg-[#1c1f24] text-white" style={{ backgroundImage: "linear-gradient(rgba(237,28,36,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(237,28,36,0.16) 1px, transparent 1px)", backgroundSize: "72px 72px" }}>
        <div className="page-enter mx-auto max-w-5xl px-5 py-16 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Verified customer stories</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] md:text-6xl">The reviews name names.</h2>
              <p className="mt-3 text-white/60">Quotes from garagedoorstoreboise.com</p>
            </div>
            <a href="https://www.google.com/maps/place/Garage+Door+Store+Boise/@43.5945155,-116.2951392,15z" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-[#1c1f24]">
              <GoogleMark /> Write a review
            </a>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {reviews.map(([who, quote]) => (
              <li key={who} className="flex flex-col rounded-xl bg-white p-5 text-[#1c1f24] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ed1c24] text-sm font-bold text-white">{who.slice(0, 1)}</span>
                    <span>
                      <span className="block text-sm font-bold">{who}</span>
                      <ReviewStars />
                    </span>
                  </div>
                  <GoogleMark className="size-5 shrink-0" />
                </div>
                <p className="mt-4 flex-1 text-[#3c4043]">“{quote}”</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="slant-flip bg-[#f7f4ef] px-4">
        <div className="mx-auto flex max-w-5xl items-stretch gap-4 py-16">
          <div className="min-w-0 flex-1">
            <div className="page-enter mx-auto grid max-w-5xl overflow-hidden rounded-[1.6rem] bg-[#1c1f24] text-white lg:grid-cols-2">
          <img src="/images/jobs/steel.jpg" alt="White steel garage doors on a home serviced by Garage Door Store Boise" className="h-72 w-full object-cover lg:h-full lg:min-h-[24rem]" />
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Repair or replace</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] md:text-5xl">Fix it or replace it? Straight answer.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">Repair the door you have. Replace it when it has not run properly, it is too old, or it is severely damaged. Free in-home consultation, and 10% off with that estimate.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="tel:2085142871" className="btn-ticket inline-flex shrink-0 items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold whitespace-nowrap text-white">Call 208.514.2871 <span aria-hidden="true">→</span></a>
              <a href="#quote" className="btn-ticket inline-flex shrink-0 items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold whitespace-nowrap text-white">Get free estimate <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-[#ed1c24] px-4 py-3 text-white">
          <p className="flex items-center gap-3 pl-2 font-bold tracking-[0.2em] text-white uppercase">
            <span className="h-px w-6 bg-white" />
            Brands installed
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            {[
              ["/images/brands/liftmaster.png", "LiftMaster", "h-5"],
              ["/images/brands/genie.png", "Genie", "h-6"],
              ["/images/brands/clopay.png", "Clopay", "h-6"],
              ["/images/brands/wayne-dalton.png", "Wayne Dalton", "h-6"],
            ].map(([src, name, height]) => (
              <li key={name} className="grid h-11 place-items-center rounded-full bg-white px-4">
                <img src={src} alt={name} className={`${height} w-auto`} />
              </li>
            ))}
          </ul>
        </div>
          </div>
          <div className="relative hidden w-48 shrink-0 self-stretch lg:block" aria-hidden="true">
            <span className="absolute top-3 right-0 bottom-0 left-3 rounded-[1.4rem] bg-[#ed1c24]" />
            <div className="strip-col absolute top-0 right-3 bottom-3 left-0 overflow-hidden rounded-[1.4rem] bg-[#1c1f24] p-2">
              <div className="strip-up">
                {["/images/jobs/steel.jpg", "/images/jobs/install.jpg", "/images/jobs/standard.jpg", "/images/jobs/carriage.jpg", "/images/jobs/wood.jpg", "/images/jobs/steel.jpg", "/images/jobs/install.jpg", "/images/jobs/standard.jpg", "/images/jobs/carriage.jpg", "/images/jobs/wood.jpg"].map((src, i) => (
                  <img key={`${src}-${i}`} src={src} alt="" className="mb-2 h-40 w-full rounded-xl object-cover" />
                ))}
              </div>
              <span className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#1c1f24] to-transparent" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1c1f24] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section id="prices" className="slant price-bg scroll-mt-24 text-white">
        <div className="page-enter mx-auto max-w-5xl px-5 py-16 lg:py-20">
          <p className="text-center font-bold tracking-[0.2em] text-white uppercase">Posted prices from the shop</p>
          <h2 className="mt-4 text-center font-display text-6xl uppercase leading-[0.92] md:text-7xl">Keep your door.<br />Keep your day moving.</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-white/90">These are the prices posted on the shop site. Tax and labor are included where the listing says so.</p>
          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {[
              ["10%", "With the free estimate", "Free in-home consultation, and 10% off with that estimate.", "#quote", "Get free estimate"],
              ["$125", "Garage door tune-up", "Includes tax and labor. Full tune-up.", "#quote", "Get free estimate"],
              ["$350", "Dual spring change", "Includes tax and labor. 10-year warranty.", "#quote", "Get free estimate"],
              ["$700", "Garage door motor", "7-foot Genie 2028 belt drive. Two remotes and a keypad.", "#quote", "Get free estimate"],
            ].map(([price, title, note, href, cta]) => (
              <li key={price} className="group relative flex overflow-hidden rounded-[1.3rem] bg-white text-[#1c1f24] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_32px_rgba(28,31,36,0.22)]">
                <div className="grid w-32 shrink-0 place-items-center bg-[#c8171e] px-2 text-center transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:bg-[#ed1c24] sm:w-40">
                  <p className="ticket-price">{price}</p>
                </div>
                <span className="absolute top-0 left-32 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ed1c24] sm:left-40" />
                <span className="absolute bottom-0 left-32 size-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#ed1c24] sm:left-40" />
                <div className="flex flex-1 flex-col border-l border-dashed border-[#ed1c24]/50 p-5">
                  <p className="ticket-title">{title}</p>
                  <p className="mt-2 flex-1 text-[#4b5563]">{note}</p>
                  <a href={href} className="btn-ticket mt-4 inline-flex w-fit items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold whitespace-nowrap text-white">{cta} <span aria-hidden="true">→</span></a>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-[1.3rem] bg-[#1c1f24] px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-bold tracking-[0.14em] text-[#ed1c24] uppercase">Already called the shop?</p>
              <p className="mt-1 text-white/80">Call 208-514-2871 or email boisedoors@gmail.com. 9075 W Hackamore Dr.</p>
            </div>
            <a href="tel:2085142871" className="btn-ticket inline-flex shrink-0 items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold text-white">Call the shop <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section id="faq" className="slant-flip faq-bg scroll-mt-24 text-white">
        <div className="page-enter mx-auto max-w-5xl px-5 py-16 lg:py-16">
          <div>
            <p className="flex items-center gap-3 font-bold tracking-[0.18em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Before you visit</p>
            <h2 className="mt-4 font-display text-5xl uppercase">Quick answers.</h2>
            <div className="mt-8 space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 open:bg-white/[0.07]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                    {question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#ed1c24] text-lg leading-none text-white transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-lg text-white/75">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="area" className="slant scroll-mt-24 bg-[#f7f4ef] text-[#1c1f24]">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="flex items-center gap-3 font-bold tracking-[0.18em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Garage Door Store Boise</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92]">Garage door service near you.</h2>
            <p className="mt-4 max-w-sm text-[#4b5563]">Boise, Meridian, Eagle, Nampa, and the Treasure Valley. The shop also lists these towns.</p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <li key={city} className="rounded-full border border-[#d4cdc3] bg-white px-4 py-2.5 font-semibold">{city}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <span className="absolute top-3 right-0 bottom-0 left-3 rounded-[1.4rem] bg-[#ed1c24]" />
            <iframe
              title="Map of Boise, Idaho"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-116.42%2C43.54%2C-116.16%2C43.68&layer=mapnik&marker=43.615%2C-116.202"
              className="relative mb-3 mr-3 h-80 w-[calc(100%-0.75rem)] rounded-[1.4rem] border-0 lg:h-[28rem]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Quote />
    </main>
  );
}

function LocalSchema() {
  const origin = getSiteOrigin();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: "Garage Door Store Boise",
        url: `${origin}/`,
        telephone: "+1-208-514-2871",
        email: "boisedoors@gmail.com",
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${origin}/#localbusiness`,
        name: "Garage Door Store Boise",
        parentOrganization: { "@id": `${origin}/#organization` },
        url: `${origin}/`,
        telephone: "+1-208-514-2871",
        email: "boisedoors@gmail.com",
        priceRange: "$$",
        image: `${origin}/images/hero.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "9075 W Hackamore Dr",
          addressLocality: "Boise",
          addressRegion: "ID",
          postalCode: "83709",
          addressCountry: "US",
        },
        geo: { "@type": "GeoCoordinates", latitude: 43.5945155, longitude: -116.2951392 },
        hasMap: "https://www.google.com/maps/place/Garage+Door+Store+Boise/@43.5945155,-116.2951392,15z",
        sameAs: ["https://www.google.com/maps/place/Garage+Door+Store+Boise/@43.5945155,-116.2951392,15z"],
        areaServed: cities.map((name) => ({ "@type": "City", name })),
        review: reviews.map(([name, reviewBody]) => ({
          "@type": "Review",
          author: { "@type": "Person", name },
          reviewBody,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "Garage Door Store Boise",
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${origin}/#webpage`,
        url: `${origin}/`,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#localbusiness` },
        inLanguage: "en-US",
      },
      ...[
        ["Garage door repair", "Same-day repair for springs, openers, doors off the track, and maintenance in Boise."],
        ["Garage door installation", "Steel, carriage, wood, standard, and commercial doors from Wayne Dalton, Clopay, LiftMaster, and Genie."],
        ["Spring replacement", "Dual spring change listed at $350, including tax, labor, and a 10-year warranty."],
      ].map(([name, description]) => ({
        "@type": "Service",
        "@id": `${origin}/#${name.toLowerCase().replaceAll(" ", "-")}`,
        name,
        description,
        serviceType: name,
        url: `${origin}/#services`,
        provider: { "@id": `${origin}/#localbusiness` },
        areaServed: { "@type": "City", name: "Boise" },
      })),
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };

  return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}

function Quote() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  return (
    <section id="quote" className="mx-auto grid w-full max-w-5xl scroll-mt-24 items-start lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-[#1c1f24] px-6 py-16 text-white lg:px-14 lg:py-20">
        <p className="flex items-center gap-3 font-bold tracking-[0.18em] text-[#ed1c24] uppercase before:h-px before:w-8 before:bg-[#ed1c24]">Free in-home consultation</p>
        <h2 className="mt-4 max-w-lg font-display text-5xl uppercase leading-[0.92] md:text-6xl">Request a garage door repair quote in Boise</h2>
        <p className="mt-4 max-w-md text-white/75">Tell us the city and what’s wrong. For a stuck door, that line is answered 24/7.</p>
        <a href="tel:2085142871" className="mt-6 font-display text-5xl text-white">208.514.2871</a>
        <ul className="mt-8 max-w-md divide-y divide-white/15">
          {[
            ["01", "City", "Boise, Meridian, Eagle, Nampa, or another valley town."],
            ["02", "Opening", "Single or double. Steel, carriage, or wood."],
            ["03", "What failed", "Spring, off the track, opener, or a door to replace."],
          ].map(([n, label, detail]) => (
            <li key={n} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
              <p className="font-display text-xl text-[#ed1c24]">{n}</p>
              <div>
                <p className="font-bold tracking-[0.14em] text-white uppercase">{label}</p>
                <p className="mt-1 text-white/70">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-white/80">
          <a href="mailto:boisedoors@gmail.com" className="font-bold text-white">Email the shop</a>
          <span className="px-2 text-white/40">·</span>
          9075 W Hackamore Dr, Boise, ID 83709
        </p>
      </div>
      {sent ? (
        <div className="flex flex-col justify-center bg-[#f7f4ef] px-6 py-16 lg:px-14 lg:py-20">
          <h2 className="font-display text-4xl uppercase">Thanks{name ? `, ${name}` : ""}.</h2>
          <p className="mt-3 max-w-md text-[#4b5563]">This preview form does not send the message. Call 208.514.2871 or email boisedoors@gmail.com.</p>
          <button type="button" className="mt-6 w-fit font-bold text-[#1c1f24]" onClick={() => setSent(false)}>Edit the request</button>
        </div>
      ) : (
        <div className="bg-[#f7f4ef] p-5 lg:p-8">
          <div className="relative">
            <span className="absolute top-3 right-0 bottom-0 left-3 rounded-[1.4rem] bg-[#ed1c24]" />
            <form
              className="relative mr-3 mb-3 grid gap-5 rounded-[1.4rem] bg-white p-6 sm:grid-cols-2 lg:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                setName(String(data.get("name") ?? "").trim());
                setSent(true);
              }}
            >
              <div className="grid gap-5 sm:col-span-2 sm:grid-cols-2">
                <div>
                  <label className="font-bold text-[#1c1f24]" htmlFor="name">Name</label>
                  <input id="name" name="name" required placeholder="Your name" className="field mt-2 w-full rounded-xl border border-[#d4cdc3] px-4 py-3.5 outline-none" />
                </div>
                <div>
                  <label className="font-bold text-[#1c1f24]" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" required type="tel" placeholder="Best number" className="field mt-2 w-full rounded-xl border border-[#d4cdc3] px-4 py-3.5 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-[#1c1f24]" htmlFor="email">Email</label>
                  <input id="email" name="email" required type="email" placeholder="you@email.com" autoComplete="email" className="field mt-2 w-full rounded-xl border border-[#d4cdc3] px-4 py-3.5 outline-none" />
                </div>
                <div>
                  <label className="font-bold text-[#1c1f24]" htmlFor="city">City</label>
                  <select id="city" name="city" required defaultValue="" className="field mt-2 w-full rounded-xl border border-[#d4cdc3] px-4 py-3.5 pr-10 outline-none">
                    <option value="" disabled>City</option>
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#1c1f24]" htmlFor="service">Service</label>
                  <select id="service" name="service" required defaultValue="" className="field mt-2 w-full rounded-xl border border-[#d4cdc3] px-4 py-3.5 pr-10 outline-none">
                    <option value="" disabled>Choose</option>
                    <option>Garage door repair</option>
                    <option>New door installation</option>
                    <option>Opener</option>
                    <option>Spring replacement</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-[#1c1f24]" htmlFor="notes">What’s wrong</label>
                  <textarea id="notes" name="notes" rows={4} placeholder="Spring, off track, opener, or a new door" className="field mt-2 w-full resize-none rounded-xl border border-[#d4cdc3] px-4 py-3.5 outline-none" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-ticket inline-flex w-fit items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold whitespace-nowrap text-white">
                  Send request
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
