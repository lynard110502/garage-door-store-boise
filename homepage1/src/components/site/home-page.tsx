import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Phone,
  Printer,
  Star,
  X,
} from "lucide-react";
import {
  ADDRESS,
  EMAIL,
  GOOGLE_RATING,
  MAP_EMBED,
  MAP_LINK,
  PHONE,
  PHONE_HREF,
  REVIEWS_LINK,
  VIDEO,
  areas,
  coupons,
  faqs,
  gallery,
  quoteServices,
  reviews,
  services,
  socials,
} from "@/data/site";

const issues = [
  { n: "01", title: "Door won't open", text: "Find why it stalled — spring, track, or opener." },
  { n: "02", title: "Opener issue", text: "Motor, sensors, remotes, and keypad." },
  { n: "03", title: "Broken spring", text: "Heavy door, or one that won't stay up." },
  { n: "04", title: "Door off track", text: "Bent track, cables, or a door that jumped." },
];

const reasons = [
  { title: "Clear guidance", text: "We explain the problem before anyone starts work." },
  { title: "Skilled technicians", text: "The same local crew, not a call center handoff." },
  { title: "Careful workmanship", text: "Balanced, quiet, and finished the day you call when we can." },
  { title: "Respect for your home", text: "A text when we're on the way, with a photo of the tech." },
];

const heroSlides = [
  { src: "/brand/hero/hero-01.jpg", alt: "Three-car garage on a Boise-area home" },
  { src: "/brand/hero/hero-02.jpg", alt: "Stone house with three wood garage doors" },
  { src: "/brand/hero/hero-03.jpg", alt: "Arched wood garage door set in stone" },
  { src: "/brand/hero/hero-04.jpg", alt: "Pair of wood garage doors under a gable" },
  { src: "/brand/hero/hero-05.jpg", alt: "Wood garage doors on a navy house" },
  { src: "/brand/hero/hero-06.jpg", alt: "White garage door with a row of windows" },
  { src: "/brand/hero/hero-07.jpg", alt: "Modern wood garage door on a metal building" },
  { src: "/brand/hero/hero-08.jpg", alt: "Carriage garage door with black hardware" },
];

function SocialIcon({ label }: { label: string }) {
  const common = "size-4 fill-current";
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.1C12.4 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.2v-9.8h2.2l.3-2.7h-2.5z" />
      </svg>
    );
  }
  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1-.1-.8-.2-2 0-2.8.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.8.7 2.4.1.1.1.2.1.3l-.3 1.1c0 .2-.2.3-.4.2-1.4-.6-2-2.2-2-4 0-3 2.5-6.6 7.5-6.6 4 0 6.6 2.9 6.6 6 0 4.1-2.3 7.2-5.6 7.2-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2.9-.9 2-1.3 2.7.9.3 1.9.4 2.9.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

function SketchIcon({ name, className = "size-9 shrink-0 text-white/90" }: { name: "years" | "clock" | "shield" | "truck" | "door" | "opener" | "spring" | "track" | "guide" | "tech" | "craft" | "home"; className?: string }) {
  const pen = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      {name === "years" ? <path {...pen} d="M8.4 7.2h19.2M10 7.4v5.1c.2 5.6 3.4 9.2 8 10.8 4.5-1.5 7.7-5 8-10.6V7.6L18 11.1 10 7.4z" /> : null}
      {name === "clock" ? (
        <>
          <path {...pen} d="M18 6.8c6.3.2 11 5.2 10.8 11.4S24.2 29.2 18 29.2 7 24.4 7.2 18.2 11.8 6.6 18 6.8z" />
          <path {...pen} d="M18 12.2v6.4l4.3 2.6" />
        </>
      ) : null}
      {name === "shield" ? <path {...pen} d="M18 6.4 28.2 10v7.6c-.2 6.2-4.2 10.2-10.2 12.2C12 27.8 8 23.8 7.8 17.6V10L18 6.4z" /> : null}
      {name === "truck" ? <path {...pen} d="M5.8 12.2h14.2v9.4H5.8zM20 15.4h5.2l3.6 3.4v2.8H20M10.2 24.2a2.2 2.2 0 1 1 0 .1M24.4 24.2a2.2 2.2 0 1 1 0 .1" /> : null}
      {name === "door" ? <path {...pen} d="M9 7.2h18v21.4H9zM9 13.4h18M15.2 13.4v15.2M21 13.4v15.2M16.6 20.6h2.6" /> : null}
      {name === "opener" ? <path {...pen} d="M11 13.2h14.2v11.4H11zM14.2 13.2V9.2h7.6v4M18 16.8v3.2" /> : null}
      {name === "spring" ? <path {...pen} d="M11 7.4c5.2.2 7.2 2.4 7.2 4.6S15.6 16 12 16.4s-6.2 2.4-4.2 5.2 6.4 3.2 10.6 2.6 7.2 2 6.4 4.6" /> : null}
      {name === "track" ? <path {...pen} d="M10 7.2v21.2M16.4 7.4v8.2l7.2 3.6v9.2M16.4 15.6h12.2" /> : null}
      {name === "guide" ? <path {...pen} d="M8 8.6h19.2v12.4H15.2L9.4 26v-5H8z" /> : null}
      {name === "tech" ? <path {...pen} d="M18 7.2a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4zM10.4 27.4c.8-5.2 3.6-7.6 7.6-7.6s6.8 2.4 7.6 7.6" /> : null}
      {name === "craft" ? <path {...pen} d="M13.2 22.6 8.4 27.2M14.6 14.2l8.8 8.6M22.2 8.4c2.4 2.2 2.2 5.4-.2 7.4l-2.2 2-5.2-5 2.2-2.2c2.2-2.2 5.4-2.4 7.4-.2z" /> : null}
      {name === "home" ? <path {...pen} d="M7.2 16.2 18 7.4l10.8 8.8V28H7.2zM15.2 28v-7.2h5.6V28" /> : null}
    </svg>
  );
}

function Pill({
  children,
  href,
  onClick,
  dark = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  dark?: boolean;
}) {
  const className = `tap inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 font-display text-base uppercase tracking-wider text-white ${dark ? "bg-ink hover:bg-ink-soft" : "bg-red hover:bg-red-deep"}`;
  const inner = (
    <>
      {children}
      <span className={`grid size-8 place-items-center rounded-full ${dark ? "bg-red text-white" : "bg-white text-ink"}`}>
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

function GoogleMark() {
  const letters = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span className="text-base font-medium tracking-tight" aria-label="Google">
      {letters.map(([letter, color]) => (
        <span key={letter + color} style={{ color }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function GoldStars() {
  return (
    <span className="flex text-[#fbbc04]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-[#fbbc04]" />
      ))}
    </span>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    let start: number | null = null;
    let frame = 0;
    const duration = 1400;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const done = window.setTimeout(() => setN(to), duration + 100);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [to]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export function HomePage() {
  const [menu, setMenu] = useState(false);
  const [pages, setPages] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faq, setFaq] = useState(0);
  const [shot, setShot] = useState<number | null>(null);
  const [quote, setQuote] = useState(false);
  const [service, setService] = useState("Garage Door Repair");
  const [sent, setSent] = useState(false);
  const [bannerSent, setBannerSent] = useState(false);
  const [error, setError] = useState("");
  const [bannerError, setBannerError] = useState("");
  const [ask, setAsk] = useState(false);
  const [askItem, setAskItem] = useState<number | null>(null);
  const [openReview, setOpenReview] = useState<string | null>(null);
  const [hero, setHero] = useState(0);
  const reviewRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll("main section, footer");
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in", entry.isIntersecting);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => {
      node.classList.add("fade-section");
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 40) node.classList.add("is-in");
      io.observe(node);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setHero((current) => (current + 1) % heroSlides.length), 5500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || quote || shot !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, quote, shot]);

  function openQuote(next?: string) {
    if (next) setService(next);
    setSent(false);
    setError("");
    setQuote(true);
    setMenu(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 7) {
      setError("Add your name and a phone number we can reach.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    event.currentTarget.reset();
  }

  function submitBanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 7) {
      setBannerError("Add your name and a phone number we can reach.");
      setBannerSent(false);
      return;
    }
    setBannerError("");
    setBannerSent(true);
    event.currentTarget.reset();
  }

  const pageLinks = [
    ["Pricing", "#coupons"],
    ["Reviews", "#reviews"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="site-frame">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-4 focus:py-2">
        Skip to content
      </a>

      <header className={`sticky top-0 z-40 bg-card/95 backdrop-blur ${scrolled ? "shadow-md" : ""}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5">
          <a href="#top" className="shrink-0" aria-label="Garage Door Store Boise home">
            <img src="/brand/logo.png" alt="Garage Door Store Boise" className="h-10 w-auto max-w-[9.5rem] object-contain object-left sm:h-14 sm:max-w-none" />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            <a href="#top" className="navlink text-base font-medium">Home</a>
            <a href="#about" className="navlink text-base font-medium">About</a>
            <a href="#services" className="navlink text-base font-medium">Services</a>
            <a href="#projects" className="navlink text-base font-medium">Projects</a>
            <div className="relative" onMouseEnter={() => setPages(true)} onMouseLeave={() => setPages(false)}>
              <button type="button" className="navlink inline-flex items-center gap-1 text-base font-medium" aria-expanded={pages} onClick={() => setPages((open) => !open)}>
                Pages
                <ChevronDown className="size-4" aria-hidden />
              </button>
              {pages ? (
                <div className="absolute left-0 top-full z-20 w-44 rounded-2xl border border-line bg-card p-2 shadow-xl">
                  {pageLinks.map(([label, href]) => (
                    <a key={label} href={href} className="block rounded-xl px-3 py-2 text-base hover:bg-paper" onClick={() => setPages(false)}>
                      {label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} className="tap hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 text-base font-medium sm:inline-flex">
              <Phone className="size-4 text-red" aria-hidden />
              {PHONE}
            </a>
            <div className="hidden sm:block">
              <Pill onClick={() => openQuote()}>Schedule now</Pill>
            </div>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={menu}
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((open) => !open)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {menu ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink text-white lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <img src="/brand/logo.png" alt="" className="h-12 w-auto rounded-lg bg-white px-2 py-1" />
            <button type="button" className="grid size-11 place-items-center rounded-full border border-white/20" aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
            {[
              ["Home", "#top"],
              ["About", "#about"],
              ["Services", "#services"],
              ["Projects", "#projects"],
              ...pageLinks,
            ].map(([label, href]) => (
              <a key={label} href={href} className="border-b border-white/10 py-4 font-display text-3xl uppercase" onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href={PHONE_HREF} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-red py-3 font-display uppercase tracking-wider">
              <Phone className="size-4" aria-hidden />
              {PHONE}
            </a>
          </nav>
        </div>
      ) : null}

      <main id="content">
        <section id="top" className="px-3 pt-3 sm:px-4">
          <div className="relative overflow-hidden rounded-[1.75rem] sm:min-h-[min(44rem,82svh)]">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full max-w-none object-cover object-center transition-opacity duration-1000 ${index === hero ? "opacity-100" : "opacity-0"} ${index === hero ? "kenburns" : ""}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45 sm:bg-gradient-to-r sm:from-ink sm:via-ink/75 sm:to-ink/15" />
            <div className="relative z-10 flex min-h-[34rem] flex-col justify-between p-5 sm:min-h-[min(44rem,82svh)] sm:p-10 lg:p-14">
              <div className="max-w-xl pt-2 lg:pt-8">
                <p className="mb-4 flex items-center gap-2 text-base text-white/85">
                  <span className="flex text-red" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-red" />
                    ))}
                  </span>
                  Reviewed on Google
                </p>
                <h1 className="font-display text-4xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                  Doors that
                  <br />
                  open. Crews
                  <br />
                  that show.
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
                  Broken springs, stuck doors, and openers — repaired or replaced the same day across Boise and the Treasure Valley.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center [&>*]:w-full sm:[&>*]:w-auto">
                  <Pill onClick={() => openQuote()}>Get free estimate</Pill>
                  <a href="#projects" className="tap inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-base font-medium text-white hover:bg-white hover:text-ink">
                    View projects
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/20 pt-6 sm:mt-10 lg:grid-cols-4 lg:gap-0">
                {(
                  [
                    ["years", <CountUp key="y" to={30} suffix="+" />, "Years of experience"],
                    ["clock", <CountUp key="c" to={24} suffix="/7" />, "Technicians on call"],
                    ["shield", <CountUp key="s" to={10} suffix=" yr" />, "Spring warranty"],
                    ["truck", "Same day", "When the door is stuck"],
                  ] as const
                ).map(([icon, value, label], index) => (
                  <div key={label} className={`flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 ${index ? "lg:border-l lg:border-white/20 lg:pl-6" : ""} ${index < 3 ? "lg:pr-6" : ""}`}>
                    <SketchIcon name={icon} className="size-7 shrink-0 text-white/90 sm:size-9" />
                    <div className="min-w-0">
                      <dt className="font-display text-2xl uppercase leading-none text-white sm:text-4xl">{value}</dt>
                      <dd className="mt-1 text-sm font-medium uppercase leading-snug tracking-wide text-white/80">{label}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl overflow-x-clip px-5 py-12 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Issues</p>
            <h2 className="mx-auto mt-3 max-w-4xl font-display text-3xl uppercase leading-[0.95] tracking-tight text-balance sm:text-4xl xl:text-5xl">What's happening with your garage door?</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">Choose the issue that sounds closest and we'll tell you what it usually takes to get the door moving.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {issues.map((item, index) => (
              <button
                key={item.n}
                type="button"
                onClick={() => openQuote(item.n === "03" ? "Spring Replacement" : "Garage Door Repair")}
                className={`tap order-1 flex h-full min-h-48 flex-col rounded-3xl border border-line bg-card p-6 text-left hover:border-ink ${["lg:order-none lg:col-start-1 lg:row-start-1", "order-2 lg:order-none lg:col-start-1 lg:row-start-2", "order-4 lg:order-none lg:col-start-3 lg:row-start-1", "order-5 lg:order-none lg:col-start-3 lg:row-start-2"][index]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-base text-red">{item.n}</p>
                  <SketchIcon name={(["door", "opener", "spring", "track"] as const)[index]} className="size-8 text-red" />
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase leading-none">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-base font-medium">
                  Get repair help <ArrowRight className="size-4" aria-hidden />
                </span>
              </button>
            ))}
            <img src="/brand/doorE.webp" alt="Garage Door Store Boise technicians with their service trucks" className="order-3 h-72 w-full rounded-3xl object-cover object-[center_40%] lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full" />
          </div>
        </section>

        <section id="services" className="bg-card py-12 lg:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Services</p>
                <h2 className="mt-3 max-w-xl font-display text-4xl uppercase leading-none sm:text-5xl">Solutions built to keep your garage door moving</h2>
              </div>
              <Pill dark onClick={() => openQuote()}>View all services</Pill>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item, index) => (
                <article key={item.title} className="card-zoom group relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4]">
                  <img src={item.image} alt="" className="h-full w-full max-w-none object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25" />
                  <p className="absolute left-5 top-5 rounded-full bg-red px-3 py-1 text-sm font-semibold uppercase tracking-[0.16em] text-white">Service {String(index + 1).padStart(2, "0")}</p>
                  <div className="absolute inset-x-5 bottom-5">
                    <h3 className="font-display text-2xl uppercase text-white drop-shadow-sm">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-base leading-relaxed text-white">{item.text}</p>
                    <button type="button" onClick={() => openQuote(item.quote)} className="mt-4 inline-flex min-h-11 items-center gap-1 rounded-full bg-red px-4 py-2 text-base font-semibold text-white">
                      Explore service <ArrowRight className="size-4" aria-hidden />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="coupons" className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Coupons</p>
              <h2 className="mt-2 font-display text-3xl uppercase sm:text-4xl">Popular jobs, in writing</h2>
            </div>
            <button type="button" onClick={() => window.print()} className="tap inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-base font-medium">
              <Printer className="size-4" aria-hidden />
              Print coupons
            </button>
          </div>
          <div className="relative mt-10 overflow-x-clip">
            <div className="coupon-splash" aria-hidden />
            <div className="coupon-splash coupon-splash-right" aria-hidden />
            <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coupons.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => openQuote(item.name)}
                  className={`coupon-ticket tap px-5 py-6 text-left md:rotate-[var(--tilt)] ${item.featured ? "is-featured" : ""}`}
                  style={{ ["--tilt" as string]: `${[-2.5, 1.6, -1.2, 2.2][index]}deg` }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red">Coupon</p>
                  <p className="mt-2 font-display text-5xl leading-none text-red">{item.price}</p>
                  <h3 className="mt-3 font-display text-xl uppercase leading-tight">{item.name}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{item.note}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full border-y border-ink/20 bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 lg:px-8 lg:py-16 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-stretch">
          <div className="contents xl:flex xl:h-0 xl:min-h-full xl:flex-col xl:justify-between xl:gap-3">
            <div className="order-1">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Why us</p>
              <h2 className="mt-2 font-display text-3xl uppercase leading-[0.92] sm:text-4xl xl:text-[2.6rem]">Clear answers before the work begins.</h2>
              <p className="mt-3 max-w-md text-base leading-snug text-muted">
                A stuck door can stop the whole day. We name the issue, price it, and fix it with the same local crew — family owned in Boise for more than 30 years.
              </p>
            </div>
            <div className="order-3">
            <div className="grid gap-2 sm:grid-cols-2">
              {reasons.map((item, index) => (
                <div key={item.title} className="relative rounded-2xl border border-line bg-paper p-3">
                  <SketchIcon name={(["guide", "tech", "craft", "home"] as const)[index]} className="absolute right-3 top-3 size-6 text-red" />
                  <h3 className="pr-8 font-display text-base uppercase leading-tight">{item.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted">{item.text}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-4 inline-flex min-h-11 items-center gap-2 text-base font-medium xl:mt-3">
              Why choose us <ArrowRight className="size-4" aria-hidden />
            </a>
            </div>
          </div>
          <div className="relative order-2 aspect-video w-full overflow-hidden rounded-[1.5rem] bg-ink xl:order-none">
            <iframe
              title="Garage Door Store Boise"
              src={`${VIDEO}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=bSldLJXGTGU`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          </div>
        </section>

        <section id="projects" className="w-full border-y border-ink/20 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Projects</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl uppercase leading-none sm:text-5xl">Work that changes how the whole home feels.</h2>
            </div>
            <a href="#gallery" className="tap inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5 font-display text-base uppercase tracking-wider text-white">
              View all projects
              <span className="grid size-8 place-items-center rounded-full bg-red text-white">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </a>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {gallery.slice(0, 3).map((item, index) => (
              <button key={item.src} type="button" onClick={() => setShot(index)} className="card-zoom group relative aspect-[4/3] overflow-hidden rounded-3xl text-left">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-ink px-4 py-2 font-display text-base uppercase tracking-wider text-white">{item.caption}</span>
              </button>
            ))}
          </div>
          <div id="gallery" className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-6">
            {gallery.slice(3).map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setShot(index + 3)}
                className={`card-zoom group relative aspect-[4/3] overflow-hidden rounded-3xl text-left ${index > 2 ? "md:col-span-3 md:aspect-[16/10]" : "md:col-span-2"}`}
              >
                <img src={item.src} alt={item.alt} className="h-full w-full max-w-none object-cover object-[center_65%]" />
                <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-ink px-3 py-1.5 font-display text-sm uppercase tracking-wider text-white">{item.caption}</span>
              </button>
            ))}
          </div>
          </div>
        </section>

        <section id="reviews" className="bg-paper py-12 lg:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#f4f4f4] px-5 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Testimonials</p>
                <h2 className="mt-2 font-display text-2xl uppercase leading-none sm:text-3xl">Top rated in Boise</h2>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-base text-ink">
                  <GoogleMark />
                  <GoldStars />
                  <span className="font-semibold">{GOOGLE_RATING}</span>
                  <a href={REVIEWS_LINK} target="_blank" rel="noreferrer" className="text-muted underline-offset-4 hover:underline">
                    Google reviews
                  </a>
                </p>
              </div>
              <a href={REVIEWS_LINK} target="_blank" rel="noreferrer" className="tap rounded-lg bg-red px-4 py-2.5 text-base font-medium text-white hover:bg-red-deep">
                Write a review
              </a>
            </div>
            <div className="relative mt-4">
              <div ref={reviewRow} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <article className="flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-gradient-to-br from-white to-[#fde8e6] p-5 sm:w-[46%] lg:w-[calc(33.333%-0.75rem)]">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-red font-display text-base text-white">G</span>
                    <span>
                      <span className="block font-semibold">Review summary</span>
                      <span className="text-base text-muted">From Google reviews</span>
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink">
                    Neighbors mention same-day spring repairs, fair prices, and a text before the technician arrives. Calls come back quickly, and the door is usually working again in one visit.
                  </p>
                </article>
                {reviews.map((item) => {
                  const open = openReview === item.name;
                  return (
                    <article key={item.name} className="hover-lift flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-[#f7f7f7] p-5 sm:w-[46%] lg:w-[calc(33.333%-0.75rem)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-11 place-items-center rounded-full bg-ink font-display text-base text-white" aria-hidden>
                            {item.name.slice(0, 1)}
                          </span>
                          <span>
                            <span className="block font-semibold">{item.name}</span>
                            <span className="text-base text-muted">{item.place}</span>
                          </span>
                        </div>
                        <GoogleMark />
                      </div>
                      <div className="mt-3">
                        <GoldStars />
                      </div>
                      <p className={`mt-3 text-base leading-relaxed text-ink ${open ? "" : "line-clamp-5"}`}>“{item.quote}”</p>
                      <button type="button" className="mt-3 w-fit text-base font-medium text-ink underline-offset-4 hover:underline" onClick={() => setOpenReview(open ? null : item.name)}>
                        {open ? "Show less" : "Read more"}
                      </button>
                    </article>
                  );
                })}
              </div>
              <button
                type="button"
                aria-label="Next reviews"
                className="tap absolute -right-1 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white shadow-md sm:grid"
                onClick={() => {
                  const row = reviewRow.current;
                  if (!row) return;
                  const card = row.querySelector("article");
                  const width = card ? card.getBoundingClientRect().width + 16 : 360;
                  const end = row.scrollLeft + width >= row.scrollWidth - row.clientWidth - 8;
                  row.scrollTo({ left: end ? 0 : row.scrollLeft + width, behavior: "smooth" });
                }}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full border-y border-ink/20 bg-white">
          <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
          <div className="flex h-full items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">FAQ</p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-[0.92] sm:text-5xl">
                Before you book
                <br />
                a service call.
              </h2>
              <div className="mt-5 h-1 w-14 bg-red" />
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Straight answers about repairs, replacements,
                <br className="hidden sm:block" />
                and what a tune-up includes.
              </p>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-3 text-ink">
                <span className="grid size-12 place-items-center rounded-full bg-red text-white">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm uppercase tracking-[0.18em] text-muted">Talk to a technician</span>
                  <span className="font-display text-2xl">{PHONE}</span>
                </span>
              </a>
              <div className="mt-6 flex gap-3 text-ink">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="grid size-11 place-items-center rounded-full border border-line hover:bg-card">
                    <SocialIcon label={item.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => {
              const open = faq === index;
              return (
                <div key={item.q} className={`overflow-hidden rounded-2xl ${open ? "bg-ink text-white" : "border border-line bg-paper"}`}>
                  <button type="button" className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left sm:px-5" aria-expanded={open} onClick={() => setFaq(open ? -1 : index)}>
                    <span className="font-medium">{item.q}</span>
                    <ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  <div className={`acc-panel ${open ? "open" : ""}`}>
                    <div>
                      <p className={`px-5 pb-5 text-base leading-relaxed ${open ? "text-white/80" : "text-muted"}`}>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </section>

        <section className="px-3 pb-4 sm:px-4">
          <div className="relative overflow-hidden rounded-[1.75rem] px-6 py-12 text-white sm:px-10 sm:py-16">
            <img src="/brand/doorC.webp" alt="" className="absolute inset-0 h-full w-full max-w-none object-cover object-center" />
            <div className="absolute inset-0 bg-ink/80" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Schedule</p>
                <h2 className="mt-3 font-display text-3xl uppercase leading-none sm:text-5xl lg:text-6xl">Garage door stuck or refusing to open?</h2>
                <p className="mt-4 max-w-md text-white/80">Request a free estimate, or call and talk to a technician now. Someone answers 24/7.</p>
                <a href={PHONE_HREF} className="tap mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-base text-white hover:bg-white hover:text-ink sm:mt-8 sm:w-auto">
                  <Phone className="size-4" aria-hidden />
                  Call {PHONE}
                </a>
              </div>
              <form onSubmit={submitBanner} noValidate className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6">
                {bannerSent ? (
                  <div>
                    <h3 className="font-display text-3xl uppercase">We'll call you shortly.</h3>
                    <p className="mt-2 text-base text-white/75">A technician follows up on this request. If the door is stuck right now, call {PHONE}.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-display text-2xl uppercase">Request a callback</p>
                    {bannerError ? <p className="text-base text-red">{bannerError}</p> : null}
                    <label className="block text-base">
                      Name
                      <input name="name" required autoComplete="name" className="mt-1 w-full rounded-xl border border-white/25 bg-white/10 px-3 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-white" />
                    </label>
                    <label className="block text-base">
                      Phone
                      <input name="phone" required type="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border border-white/25 bg-white/10 px-3 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-white" />
                    </label>
                    <label className="block text-base">
                      Service
                      <select name="service" value={service} onChange={(event) => setService(event.target.value)} className="mt-1 w-full rounded-xl border border-white/25 bg-ink/40 px-3 py-3 text-base text-white outline-none focus:border-white">
                        {quoteServices.map((item) => (
                          <option key={item} className="text-ink">{item}</option>
                        ))}
                      </select>
                    </label>
                    <button type="submit" className="tap w-full rounded-full bg-red py-3.5 font-display uppercase tracking-wider text-white hover:bg-red-deep">
                      Schedule service
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-card py-12 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red">Location</p>
              <h2 className="mt-2 font-display text-3xl uppercase leading-tight sm:text-5xl">9075 W Hackamore Dr</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">Boise, ID 83709. Free in-home estimates across the Treasure Valley. Call if the door is stuck — a technician answers.</p>
              <div className="mt-6 grid max-w-lg grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                <div className="rounded-2xl border border-line bg-paper p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">Phone</p>
                  <p className="mt-2 font-display text-2xl uppercase">24 / 7</p>
                  <p className="mt-1 text-base text-muted">Someone answers, day or night.</p>
                </div>
                <div className="rounded-2xl border border-line bg-paper p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">Visits</p>
                  <p className="mt-2 font-display text-2xl uppercase">Mon – Sun</p>
                  <p className="mt-1 text-base text-muted">Same day when the door is stuck.</p>
                </div>
                <div className="rounded-2xl border border-line bg-paper p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">Estimates</p>
                  <p className="mt-2 font-display text-2xl uppercase">Free</p>
                  <p className="mt-1 text-base text-muted">In home, across the Treasure Valley.</p>
                </div>
                <div className="rounded-2xl border border-line bg-paper p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">Shop</p>
                  <p className="mt-2 font-display text-2xl uppercase">Boise</p>
                  <p className="mt-1 text-base text-muted">9075 W Hackamore Dr</p>
                </div>
              </div>
              <a href={PHONE_HREF} className="mt-5 block font-display text-2xl text-red">{PHONE}</a>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-base font-medium">
                <MapPin className="size-4 text-red" aria-hidden />
                Open this pin in Google Maps
              </a>
              <div className="mt-6 w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
                <Pill onClick={() => openQuote()}>Get a free estimate</Pill>
              </div>
            </div>
            <iframe title="Map to Garage Door Store Boise" src={MAP_EMBED} className="h-full min-h-72 w-full rounded-[1.75rem] border-0 sm:min-h-80 lg:min-h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-red bg-paper px-5 pb-36 pt-12 text-ink lg:pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-8">
            <img src="/brand/logo.png" alt="Garage Door Store Boise" className="h-16 w-auto sm:h-20" />
            <p className="max-w-xs text-base leading-relaxed text-muted">Family-owned repair and installation in Boise. Licensed and insured. Over 30 years in the Treasure Valley.</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-5 py-3 text-base font-medium text-white">
                <Phone className="size-4" aria-hidden />
                {PHONE}
              </a>
              <button type="button" onClick={() => openQuote()} className="rounded-full border border-ink px-5 py-3 text-base font-medium">
                Free estimate
              </button>
            </div>
          </div>
          <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="font-display text-base uppercase tracking-[0.16em]">Quick links</h2>
              <ul className="mt-4 space-y-2 text-base text-muted">
                {[
                  ["About", "#about"],
                  ["Services", "#services"],
                  ["Projects", "#projects"],
                  ["Reviews", "#reviews"],
                  ["FAQ", "#faq"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-red">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base uppercase tracking-[0.16em]">Our services</h2>
              <ul className="mt-4 space-y-2 text-base text-muted">
                {services.map((item) => (
                  <li key={item.title}>
                    <button type="button" className="text-left hover:text-red" onClick={() => openQuote(item.quote)}>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base uppercase tracking-[0.16em]">Locations</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-base text-muted">
                {areas.slice(0, 8).map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
            <div id="visit">
              <h2 className="font-display text-base uppercase tracking-[0.16em]">Visit</h2>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="mt-4 flex items-start gap-2 text-base text-muted hover:text-red">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
                <span>
                  {ADDRESS[0]}
                  <br />
                  {ADDRESS[1]}
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} className="mt-3 flex items-center gap-2 text-base text-muted hover:text-red">
                <Mail className="size-4 text-red" aria-hidden />
                {EMAIL}
              </a>
              <p className="mt-3 flex items-center gap-2 text-base text-muted">
                <Check className="size-4 text-red" aria-hidden />
                Mon–Sun, technicians on call
              </p>
              <div className="mt-5 flex gap-3">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="grid size-9 place-items-center rounded-full border border-line hover:border-red hover:text-red">
                    <SocialIcon label={item.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-line pt-6 text-sm leading-relaxed text-muted sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <p className="max-w-3xl text-pretty">© 2026 The Garage Door Template. All Rights Reserved. Lic# XXXXXXXX. Website design by Garage Door Marketing Lab</p>
            <a href="#top" className="shrink-0 hover:text-red">Back to top</a>
          </div>
        </div>
      </footer>
      </div>

      <div className="ask-dock">
        {ask ? (
          <div className="mb-3 max-h-[min(24rem,60svh)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl border border-line bg-card p-4 shadow-2xl" role="dialog" aria-label="Ask a question">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl uppercase">Ask</p>
                <p className="text-base text-muted">Tap a question. A person still answers the phone.</p>
              </div>
              <button type="button" className="grid size-9 place-items-center rounded-full border border-line" aria-label="Close questions" onClick={() => setAsk(false)}>
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
              {faqs.map((item, index) => (
                <div key={item.q} className="rounded-xl bg-paper">
                  <button type="button" className="w-full px-3 py-2.5 text-left text-base font-medium" aria-expanded={askItem === index} onClick={() => setAskItem(askItem === index ? null : index)}>
                    {item.q}
                  </button>
                  {askItem === index ? <p className="px-3 pb-3 text-base leading-relaxed text-muted">{item.a}</p> : null}
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={PHONE_HREF} className="rounded-full bg-red py-2.5 text-center text-base font-medium text-white">Call</a>
              <button type="button" className="rounded-full bg-ink py-2.5 text-base font-medium text-white" onClick={() => { setAsk(false); openQuote(); }}>
                Estimate
              </button>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          className="tap grid size-14 place-items-center rounded-full bg-red text-white shadow-lg hover:bg-red-deep"
          aria-expanded={ask}
          aria-label={ask ? "Close ask" : "Ask a question"}
          onClick={() => setAsk((open) => !open)}
        >
          {ask ? <X className="size-6" /> : <MessageCircleQuestion className="size-7" />}
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px bg-line pb-[env(safe-area-inset-bottom)] lg:hidden">
        <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-red py-3.5 font-display text-base uppercase tracking-wider text-white">
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <button type="button" onClick={() => openQuote()} className="bg-ink py-3.5 font-display text-base uppercase tracking-wider text-white">
          Schedule
        </button>
      </div>

      {quote ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="quote-title">
          <div className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-medium uppercase tracking-[0.16em] text-red">Free estimate</p>
                <h2 id="quote-title" className="mt-1 font-display text-3xl uppercase">Schedule service</h2>
              </div>
              <button type="button" className="grid size-10 place-items-center rounded-full border border-line" aria-label="Close" onClick={() => setQuote(false)}>
                <X className="size-5" />
              </button>
            </div>
            {sent ? (
              <div className="mt-6">
                <h3 className="font-display text-2xl uppercase">We'll call you shortly.</h3>
                <p className="mt-2 text-base text-muted">A technician follows up on {service} requests. If the door is stuck right now, call {PHONE}.</p>
                <a href={PHONE_HREF} className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 font-display text-base uppercase tracking-wider text-white">
                  <Phone className="size-4" aria-hidden />
                  Call now
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-6 space-y-3">
                <p className="text-base text-muted">Tell us the door and the best number. A person calls you back — this form stays on your device.</p>
                {error ? <p className="text-base text-red">{error}</p> : null}
                <label className="block text-base">
                  Name
                  <input name="name" required autoComplete="name" className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink" />
                </label>
                <label className="block text-base">
                  Phone
                  <input name="phone" required type="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink" />
                </label>
                <label className="block text-base">
                  Email <span className="text-muted">(optional)</span>
                  <input name="email" type="email" autoComplete="email" className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink" />
                </label>
                <label className="block text-base">
                  Service
                  <select name="service" value={service} onChange={(event) => setService(event.target.value)} className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink">
                    {quoteServices.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-base">
                  What's going on
                  <textarea name="message" rows={3} className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink" placeholder="Spring snapped, door off track, want a new look…" />
                </label>
                <button type="submit" className="tap w-full rounded-full bg-red py-3.5 font-display uppercase tracking-wider text-white hover:bg-red-deep">
                  Get your free estimate
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}

      {shot !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" role="dialog" aria-modal="true" aria-label={gallery[shot]?.caption}>
          <button type="button" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-ink" aria-label="Close photo" onClick={() => setShot(null)}>
            <X className="size-5" />
          </button>
          <figure className="max-w-5xl">
            <img src={gallery[shot]?.src} alt={gallery[shot]?.alt} className="max-h-[80svh] w-auto max-w-[min(92vw,80rem)] rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center font-display uppercase tracking-wider text-white">{gallery[shot]?.caption}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
