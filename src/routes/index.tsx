import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getSiteOrigin } from "@/lib/site-origin";

const TITLE = "Garage Door Repair Boise, Idaho | Garage Door Store Inc";
const DESCRIPTION =
  "Garage door repair in Boise by Garage Door Store. Family-owned for 30+ years. Free in-home estimate and 10% off. Call 208-514-2871 for same-day help.";

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
  ["What is a garage door tune-up?", "The shop lists a full tune-up at $125, including tax and labor, as a way to keep the door working and avoid a larger repair later."],
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
    copy: "Repair on the door you have, including springs, openers, doors off the track, and general maintenance.",
    points: ["Spring changes", "Opener replacement", "Doors off the track", "General maintenance"],
    note: "These can be done the same day you call.",
    place: "Same-day repair",
  },
  {
    src: "/images/jobs/install.jpg",
    alt: "Carriage-style garage door installed on a stone and siding home",
    title: "Garage door installation",
    copy: "Custom installation of standard and carriage-style doors, with a free in-home consultation.",
    points: ["Standard doors", "Carriage-style doors", "Wayne Dalton, LiftMaster, Clopay, Genie", "Free in-home consultation"],
    note: "The staff helps you pick the door for the house. Call for the free visit.",
    place: "In-home consultation",
  },
  {
    src: "/images/jobs/genie-2028.jpg",
    alt: "Genie model 2028 belt-drive garage door opener from the shop’s opener page",
    title: "Springs and openers",
    copy: "Posted packages, with tax and labor where the shop lists them.",
    points: ["Dual springs, 10-year warranty", "Torque tubes", "Genie 2028 belt drive", "Two remotes and a keypad"],
    note: "Dual spring change is listed at $350. The Genie 2028 package is listed at $700.",
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
  { sketch: "/images/sketches/quote.png", alt: "Sketch of a clipboard with a garage door drawing", title: "Set pricing", copy: "Call for a phone estimate. The site says no add-ons and upcharges." },
  { sketch: "/images/sketches/repair.png", alt: "Sketch of a garage door panel, a torsion spring, and a wrench", title: "Licensed and insured", copy: "The shop states it is fully licensed and insured." },
];

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
      <div className="mx-auto max-w-6xl px-5">
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
          <button type="button" className="btn bg-signal px-6 py-3 text-sm font-semibold tracking-[0.08em] text-white uppercase hover:bg-signal-hover" onClick={() => window.print()}>
            Print coupons
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <main id="top">
      <LocalSchema />
      <section className="grid bg-paper text-ink lg:grid-cols-[0.9fr_1.1fr] min-[1600px]:mx-auto min-[1600px]:w-full min-[1600px]:max-w-[1440px]">
        <div className="order-2 flex items-center bg-paper px-5 py-16 lg:order-1 lg:px-16 lg:py-24">
          <div className="rise-in max-w-xl">
            <p className="kicker">Family owned · Boise, Idaho</p>
            <h1 className="stamp mt-5 text-4xl sm:text-5xl md:text-7xl">Garage door repair in Boise</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Garage Door Store Boise is a family-owned shop at 9075 W Hackamore Dr. We repair and install doors across Treasure Valley. Call for a free in-home consultation, and 10% off with that estimate. Call 24/7 and talk to a technician.
            </p>
            <a href="tel:2085142871" className="phone-pop mt-7 inline-flex max-w-full items-center gap-3 font-display text-4xl font-bold tracking-tight text-ink transition-transform hover:translate-x-1 sm:text-5xl">
              <Phone size={28} className="text-signal" />
              208.514.2871
            </a>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="tel:2085142871" className="btn call-live bg-signal px-7 py-3 text-center text-sm font-bold text-white hover:bg-signal-hover sm:w-auto">
                Call us now
              </a>
              <a href="#quote" className="btn border border-line bg-white px-7 py-3 text-center text-sm font-semibold text-ink hover:bg-stone sm:w-auto">
                Get free estimate
              </a>
            </div>
            <ul className="mt-10 grid border-t border-line sm:grid-cols-3">
              {[
                ["Free estimate", "In-home consultation"],
                ["10% off", "With that free estimate"],
                ["24/7 line", "Talk to a technician"],
              ].map(([title, note], i) => (
                <Fade as="li" key={title} delay={i * 80} className="border-line py-4 sm:border-l sm:px-4 sm:first:border-l-0 sm:first:pl-0">
                  <p className="text-sm font-bold text-ink">{title}</p>
                  <p className="text-sm text-muted">{note}</p>
                </Fade>
              ))}
            </ul>
          </div>
        </div>
        <div className="steel-frame relative z-10 order-1 min-h-[240px] overflow-hidden sm:min-h-[320px] lg:order-2 lg:-ml-12 lg:min-h-[760px]">
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-day.jpg"
            aria-label="A residential garage door rolling open in daytime"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <img src="/images/hero-day.jpg" alt="" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />
          <p className="absolute top-4 right-4 bg-graphite/80 px-4 py-2 text-xs font-bold tracking-[0.18em] text-white uppercase">Boise, Idaho</p>
        </div>
      </section>
      <div className="border-y border-line bg-paper">
        <p className="sr-only">Brands installed by Garage Door Store Boise: LiftMaster, Genie, Clopay, and Wayne Dalton.</p>
        <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-5 px-6 py-5 sm:hidden">
          {[
            ["/images/brands/liftmaster.png", "LiftMaster"],
            ["/images/brands/genie.png", "Genie"],
            ["/images/brands/clopay.png", "Clopay"],
            ["/images/brands/wayne-dalton.png", "Wayne Dalton"],
          ].map(([src, name]) => (
            <li key={name} className="flex justify-center">
              <img src={src} alt={name} width={360} height={80} className="h-8 w-auto max-w-full object-contain" />
            </li>
          ))}
        </ul>
        <div className="marquee hidden overflow-hidden py-6 sm:block">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex items-center gap-16 pr-16" aria-hidden={copy === 1}>
                {[
                  ["/images/brands/liftmaster.png", "LiftMaster"],
                  ["/images/brands/genie.png", "Genie"],
                  ["/images/brands/clopay.png", "Clopay"],
                  ["/images/brands/wayne-dalton.png", "Wayne Dalton"],
                ].map(([src, name]) => (
                  <li key={`${name}-${copy}`} className="flex items-center">
                    <img src={src} alt={name} width={360} height={80} className={`block w-auto ${name === "LiftMaster" ? "h-8 md:h-9" : "h-11 md:h-12"}`} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-graphite text-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {[
            ["30+", "Years in the valley", "Family-owned shop on Hackamore"],
            ["24/7", "Technician line", "Call and talk to a technician"],
            ["$125", "Posted tune-up", "Tax and labor included"],
            ["10%", "Off with the estimate", "Free visit at the house"],
          ].map(([value, label, note], i) => (
            <Fade as="li" key={label} delay={i * 70} className={`border-white/10 px-4 py-5 sm:px-6 sm:py-8 lg:border-l lg:first:border-l-0 ${i % 2 === 0 ? "border-r lg:border-r-0" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}>
              <p className="font-display text-4xl leading-none sm:text-5xl lg:text-6xl">{value}</p>
              <p className="mt-2 text-sm font-bold sm:mt-3">{label}</p>
              <p className="mt-1 text-sm text-white/60">{note}</p>
            </Fade>
          ))}
        </ul>
      </section>

      <section id="about" className="scroll-mt-24">
        <div className="relative min-h-[28rem] md:min-h-[46rem] min-[1600px]:mx-auto min-[1600px]:max-h-[52rem] min-[1600px]:max-w-[1440px]">
          <img src="/images/shop-photo.webp" alt="Garage Door Store Boise crew and service trucks" width={1400} height={588} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <p className="absolute top-5 left-5 z-10 bg-graphite px-4 py-2 text-xs font-bold tracking-[0.16em] text-white uppercase">The crew</p>
          <div className="relative z-10 flex min-h-[28rem] items-end p-4 md:min-h-[46rem] md:p-10">
            <Fade className="card-in w-full max-w-xl bg-paper p-6 md:p-8">
              <p className="kicker">Family owned</p>
              <h2 className="mt-3 text-4xl md:text-5xl">A family-owned Boise garage door company</h2>
              <p className="mt-4 font-display text-2xl leading-snug">Repair the door you have. Replace it only when it is time.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Garage Door Store, Boise is family owned and has been servicing garage doors for over 30 years. We have set pricing, and you can call for a phone estimate. Don’t get ripped off by overcharges and add-ons.
              </p>
              <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                {[
                  ["30+ years", "Servicing Treasure Valley doors"],
                  ["Shop", "9075 W Hackamore Dr, Boise, ID 83709"],
                  ["Line", "208.514.2871 · answered 24/7"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3">
                    <dt className="text-xs font-bold tracking-[0.12em] text-muted uppercase">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </Fade>
          </div>
        </div>
      </section>

      <section id="services" className="svc-field scroll-mt-24 overflow-hidden py-16 lg:py-20">
        <img src="/images/sketches/torsion-spring.png" alt="" aria-hidden="true" className="pointer-events-none absolute top-6 right-0 hidden h-40 w-auto max-w-[42%] translate-x-1/2 object-contain object-right opacity-25 md:block lg:h-52" />
        <img src="/images/sketches/roller.png" alt="" aria-hidden="true" className="pointer-events-none absolute bottom-2 left-0 hidden h-36 w-auto max-w-[32%] object-contain object-left opacity-25 md:block lg:h-44" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="mt-5 max-w-xl">
            <SectionHead kicker="Repair, install, springs, tune-up" title="Garage door repair services in Boise" />
            <p className="mt-4 text-muted">Spring changes, opener replacement, doors off the track, or general maintenance can be done the same day you call.</p>
          </div>
          <div className="svc-row mt-10">
            {[
              { n: "01", short: "Repair", item: services[0], lines: services[0].points, extra: services[0].note },
              { n: "02", short: "Installation", item: services[1], lines: services[1].points, extra: services[1].note },
              {
                n: "03",
                short: "Springs",
                item: services[2],
                lines: ["Dual springs · $350", "Torque tubes · $450", "Genie 2028 · $700"],
                extra: "Wayne Dalton, LiftMaster, Clopay, and Genie.",
              },
              { n: "04", short: "Tune-up", item: services[3], lines: services[3].points, extra: services[3].note },
            ].map(({ n, short, item, lines, extra }) => (
              <Fade as="article" key={item.title} className="svc-card">
                <img src={item.src} alt={item.alt} width={1792} height={1008} loading="lazy" />
                <p className="svc-short font-display">{short}</p>
                <div className="svc-face">
                  <p className="svc-num font-display text-2xl leading-none text-signal">{n}</p>
                  <h3 className="svc-title mt-1.5 overflow-hidden text-2xl transition-all duration-300">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-muted uppercase">{item.place}</p>
                  <div className="svc-more">
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{item.copy}</p>
                    <ul className="mt-3 max-w-md text-sm font-semibold">
                      {lines.map((line) => (
                        <li key={line} className="border-t border-line py-1.5">{line}</li>
                      ))}
                    </ul>
                    <p className="mt-2 max-w-md text-sm text-muted">{extra}</p>
                    <a href="tel:2085142871" className="more mt-3 inline-flex text-sm font-bold">Call 208.514.2871</a>
                  </div>
                </div>
                <div className="svc-panel">
                  <p className="font-display text-2xl leading-none text-signal">{n}</p>
                  <h3 className="mt-2 text-3xl leading-none">{item.title}</h3>
                  <p className="mt-2 text-xs font-semibold tracking-wide text-muted uppercase">{item.place}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
                  <ul className="mt-3 text-sm font-semibold">
                    {lines.map((line) => (
                      <li key={line} className="border-t border-line py-1.5">{line}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-muted">{extra}</p>
                  <a href="tel:2085142871" className="more mt-3 inline-flex text-sm font-bold">Call 208.514.2871</a>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-graphite text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-signal uppercase">24/7 technician line</p>
            <p className="mt-2 max-w-xl text-balance font-display text-[clamp(1.35rem,2.6vw,2.75rem)] leading-none">Call now. Free in-home estimate, and 10% off.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:2085142871" className="btn bg-signal px-6 py-3 text-sm font-semibold text-white hover:bg-signal-hover">Call us now</a>
            <a href="#quote" className="btn border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Get free estimate</a>
          </div>
        </div>
      </div>

      <section id="prices" className="scroll-mt-24 bg-stone py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="kicker">Posted specials</p>
              <h2 className="mt-3 max-w-xl text-4xl md:text-5xl">Set prices from the Boise shop</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">Printed on garagedoorstoreboise.com. Tax and labor are included where noted. Call if the door is a different size.</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <CouponBoard />
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-6 bg-graphite px-6 py-8 text-white md:flex-row md:items-center">
          <h2 className="text-4xl leading-none md:text-5xl">
            <span className="block">Free in-home estimate,</span>
            <span className="block">and 10% off.</span>
          </h2>
          <a href="#quote" className="btn bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-hover">Get free estimate</a>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 bg-stone py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead kicker="Why this shop" title="Why Boise calls Garage Door Store" />
          <ul className="why-row mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item, index) => (
              <Fade as="li" key={item.title} className="why-card flex h-full flex-col border border-ink/15 bg-paper p-6">
                <div className="flex items-start justify-between gap-4">
                  <img src={item.sketch} alt={item.alt} width={1408} height={1408} loading="lazy" className="h-16 w-16 object-contain" />
                  <p className="font-display text-3xl leading-none text-signal">0{index + 1}</p>
                </div>
                <h3 className="mt-6 text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.copy}</p>
              </Fade>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" className="svc-field scroll-mt-24 overflow-hidden py-16 lg:py-20">
        <img src="/images/sketches/track.png" alt="" aria-hidden="true" className="pointer-events-none absolute top-6 right-0 hidden h-40 w-auto max-w-[40%] translate-x-1/2 object-contain object-right opacity-25 md:block lg:h-52" />
        <img src="/images/sketches/opener.png" alt="" aria-hidden="true" className="pointer-events-none absolute bottom-2 left-0 hidden h-32 w-auto max-w-[34%] object-contain object-left opacity-25 md:block lg:h-40" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead kicker="Door styles" title="Garage door work around Treasure Valley" />
            <p className="max-w-sm text-sm leading-relaxed text-muted">Standard and carriage-style doors, plus Wayne Dalton, LiftMaster, Clopay, and Genie products to choose from.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {(
              [
                ["/images/jobs/standard.jpg", "Standard", "Custom installation of standard doors.", "object-cover object-[center_36%]"],
                ["/images/jobs/carriage.jpg", "Carriage", "Custom installation of carriage-style doors.", "object-cover object-[center_32%]"],
                ["/images/jobs/wood.jpg", "Wood", "The shop has written about custom wood doors for homes in Meridian.", "object-cover object-[center_42%]"],
                ["/images/jobs/genie-2028.jpg", "Openers", "Posted package: 7-foot Genie 2028 belt drive, 2 remotes, and a keypad.", "object-contain bg-[#eceae6] p-8"],
              ] as const
            ).map(([src, kind, note, fit], i) => (
              <Fade as="a" href="#quote" key={kind} className="group relative block aspect-[5/4] overflow-hidden bg-graphite">
                <img src={src} alt={`${kind} garage door style`} width={1792} height={1008} loading="lazy" className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${fit}`} />
                <div className="absolute inset-x-3 bottom-3 border border-white/80 bg-paper/95 px-4 py-3 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-3xl leading-none">{kind}</p>
                      <p className="mt-1.5 text-sm leading-snug text-muted">{note}</p>
                    </div>
                    <p className="font-display text-3xl leading-none text-signal">0{i + 1}</p>
                  </div>
                  <span className="mt-3 block h-0.5 w-8 bg-signal transition-all duration-300 group-hover:w-16" />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 bg-stone py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <GoogleMark className="size-11" />
              <div>
                <p className="text-lg font-bold">Customer reviews</p>
                <p className="mt-1 text-sm text-muted">Quotes from garagedoorstoreboise.com</p>
              </div>
            </div>
            <a href="https://www.google.com/maps/place/Garage+Door+Store+Boise/@43.5945155,-116.2951392,15z" className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold shadow-sm hover:border-ink/30">
              <GoogleMark className="size-4" />
              Write a review
            </a>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {reviews.map(([who, quote], i) => (
              <Fade as="li" key={who} delay={i * 60} className="flex h-full flex-col rounded-lg border border-line bg-paper p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-graphite text-sm font-bold text-white">{who.slice(0, 1)}</span>
                    <p className="font-bold">{who}</p>
                  </div>
                  <GoogleMark />
                </div>
                <p className="mt-3 text-sm leading-relaxed">{quote}</p>
              </Fade>
            ))}
          </ul>
        </div>
      </section>

      <section id="area" className="svc-field scroll-mt-24 overflow-hidden py-16 lg:py-20">
        <img src="/images/sketches/pin.png" alt="" aria-hidden="true" className="pointer-events-none absolute top-10 left-0 hidden h-56 w-auto -translate-x-1/3 opacity-[0.14] md:block" />
        <div className="relative mx-auto grid max-w-6xl items-stretch gap-10 px-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col">
            <SectionHead kicker="Where we drive" title="Garage door repair areas we cover" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">The shop is at 9075 W Hackamore Dr, Boise, ID 83709. Boise is the main area. The other towns are the rest of the drive.</p>
            <div className="mt-8 border-t-2 border-ink pt-4">
              <p className="text-[11px] font-bold tracking-[0.16em] text-signal uppercase">Main area</p>
              <p className="mt-1 font-display text-5xl leading-none md:text-6xl">Boise</p>
            </div>
            <ul className="mt-6 grid flex-1 grid-cols-2 content-start border-t border-line">
              {cities.slice(1).map((city) => (
                <li key={city} className="border-b border-line py-3.5 pr-4 text-lg font-semibold">{city}</li>
              ))}
            </ul>
          </div>
          <div className="min-h-[18rem] overflow-hidden border border-line bg-stone sm:min-h-[24rem] lg:min-h-[32rem]">
            <iframe
              title="Map of the Boise shop at 9075 W Hackamore Dr"
              src="https://maps.google.com/maps?q=9075%20W%20Hackamore%20Dr%2C%20Boise%2C%20ID%2083709&z=12&output=embed"
              className="h-full min-h-[18rem] w-full border-0 sm:min-h-[24rem] lg:min-h-[32rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-paper py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead kicker="Questions" title="Garage door repair questions" />
          <div className="mt-8 border-b border-line">
            {faqs.map(([question, answer], i) => (
              <Fade as="details" key={question} delay={i * 40} className="faq group border-t border-line py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="text-xl sm:text-2xl transition-colors group-hover:text-signal">{question}</h3>
                  <span className="faq-mark text-2xl leading-none text-signal" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{answer}</p>
              </Fade>
            ))}
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
    <section id="quote" className="scroll-mt-24 grid w-full lg:grid-cols-2 min-[1600px]:mx-auto min-[1600px]:max-w-[1440px]">
      <Fade className="bg-graphite px-6 py-16 text-white lg:px-14 lg:py-20">
          <p className="text-xs font-bold tracking-[0.16em] text-white/60 uppercase">Free in-home consultation</p>
          <h2 className="mt-3 text-4xl md:text-6xl">Request a garage door repair quote in Boise</h2>
          <p className="mt-4 max-w-md text-white/70">
            Tell us the city and what’s wrong. For a stuck door, call 208-514-2871. That line is answered 24/7. The form on this redesign preview does not send the note to the shop. Use the email link. That address is the one on their contact page.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["City", "Boise, Meridian, Eagle, Nampa, or another valley town."],
              ["Opening", "Single or double, and whether it is steel, carriage, or wood."],
              ["What failed", "Spring, off the track, opener, or a door to replace."],
            ].map(([label, detail]) => (
              <li key={label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-line pt-3">
                <span className="text-xs font-bold tracking-[0.14em] text-signal uppercase">{label}</span>
                <span className="text-white/70">{detail}</span>
              </li>
            ))}
          </ul>
          <a href="tel:2085142871" className="btn mt-8 inline-flex bg-signal px-6 py-3.5 text-sm font-semibold text-white hover:bg-signal-hover">Call us now</a>
          <p className="mt-4 text-sm font-semibold">
            <a href="mailto:boisedoors@gmail.com" className="text-white">Email the shop</a>
            <span className="px-2 text-white/40">·</span>
            9075 W Hackamore Dr, Boise, ID 83709
          </p>
        </Fade>
        {sent ? (
          <div className="bg-paper p-8 lg:p-14">
            <p className="text-2xl font-bold">Thanks{name ? `, ${name}` : ""}. We got the note.</p>
            <p className="mt-2 text-muted">
              This preview form does not send the message. Call 208.514.2871 or use Email the shop. That phone number is the one on garagedoorstoreboise.com.
            </p>
            <button type="button" className="mt-4 text-sm font-semibold text-ink" onClick={() => setSent(false)}>
              Edit the request
            </button>
          </div>
        ) : (
          <form
            className="grid content-start gap-5 bg-paper px-6 py-16 sm:grid-cols-2 lg:px-14 lg:py-20"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              setName(String(data.get("name") ?? "").trim());
              setSent(true);
            }}
          >
            <div>
              <label className="text-sm font-semibold" htmlFor="name">Name</label>
              <input id="name" name="name" required placeholder="Your name" suppressHydrationWarning className="field mt-1 w-full min-w-0 border-b border-line bg-transparent px-4 py-3.5 outline-none focus:border-signal" />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" required type="tel" placeholder="Best number" suppressHydrationWarning className="field mt-1 w-full min-w-0 border-b border-line bg-transparent px-4 py-3.5 outline-none focus:border-signal" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold" htmlFor="email">Email</label>
              <input id="email" name="email" required type="email" placeholder="you@email.com" autoComplete="email" suppressHydrationWarning className="field mt-1 w-full min-w-0 border-b border-line bg-transparent px-4 py-3.5 outline-none focus:border-signal" />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="city">City</label>
              <select id="city" name="city" required defaultValue="" className="field mt-1 w-full min-w-0 border-b border-line bg-transparent px-4 py-3.5 outline-none focus:border-signal">
                <option value="" disabled>Select a city</option>
                {cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="service">Service</label>
              <select id="service" name="service" required defaultValue="" className="field mt-1 w-full min-w-0 border-b border-line bg-transparent px-4 py-3.5 outline-none focus:border-signal">
                <option value="" disabled>What do you need?</option>
                <option>Garage door repair</option>
                <option>New door installation</option>
                <option>Opener</option>
                <option>Commercial services</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold" htmlFor="notes">What’s wrong</label>
              <textarea id="notes" name="notes" rows={4} placeholder="Spring, off track, opener, or a new door" suppressHydrationWarning className="field mt-1 w-full min-w-0 border-b border-line bg-transparent px-4 py-3.5 outline-none focus:border-signal" />
            </div>
            <button type="submit" className="btn w-fit bg-signal px-6 py-3 text-sm font-bold text-white hover:bg-signal-hover">
              Send request
            </button>
          </form>
        )}
    </section>
  );
}
