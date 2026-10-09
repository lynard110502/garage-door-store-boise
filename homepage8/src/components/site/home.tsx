import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUpRight, ChevronsRight, Clock, Handshake, MapPin, Phone, Shield, Wrench } from "lucide-react";
import { SiteChrome } from "@/components/site/shell";
import {
  ADDRESS,
  cities,
  EMAIL,
  GOOGLE_REVIEWS,
  ORIGIN,
  ours,
  PHONE_DISPLAY,
  PHONE_TEL,
  reviews,
  services,
  typical,
} from "@/data/site";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      name: "Garage Door Store Boise",
      telephone: "+1-208-514-2871",
      email: EMAIL,
      image: "/media/door4.webp",
      url: ORIGIN,
      address: {
        "@type": "PostalAddress",
        streetAddress: "9075 W Hackamore Dr",
        addressLocality: "Boise",
        addressRegion: "ID",
        postalCode: "83709",
        addressCountry: "US",
      },
      areaServed: cities.map((c) => c.name),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "19:00",
        },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "07:00", closes: "12:00" },
      ],
    },
    ...services.map((s) => ({
      "@type": "Service",
      name: s.title,
      serviceType: s.kicker,
      areaServed: "Boise, Idaho",
      provider: { "@type": "HomeAndConstructionBusiness", name: "Garage Door Store Boise" },
      url: s.href,
    })),
  ],
};

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          entry.target.classList.remove("is-armed");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    sections.forEach((node) => {
      if (node.classList.contains("hero")) return;
      node.classList.add("section-fade");
      if (node.getBoundingClientRect().top < window.innerHeight * 0.88) {
        node.classList.add("is-in");
        return;
      }
      node.classList.add("is-armed");
      io.observe(node);
    });
    return () => io.disconnect();
  }, []);
}

function HeroFlag() {
  const cols = 46;
  const cell = 24;
  const amp = 18;
  const rows = 2;
  const width = cols * cell;
  const height = amp + rows * cell;
  const tiles = [];
  const wave = (x: number) => Math.sin((x / width) * Math.PI * 2 * 1.15) * amp;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x0 = i * cell;
      const x1 = x0 + cell + 0.5;
      const y0 = amp + wave(x0) + j * cell;
      const y1 = amp + wave(x1) + j * cell;
      const b0 = j === rows - 1 ? height : y0 + cell;
      const b1 = j === rows - 1 ? height : y1 + cell;
      tiles.push(
        <polygon
          key={`${i}-${j}`}
          points={`${x0},${y0} ${x1},${y1} ${x1},${b1} ${x0},${b0}`}
          fill={(i + j) % 2 === 0 ? "#ef2430" : "#111214"}
        />,
      );
    }
  }
  return (
    <svg className="hero-flag" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {tiles}
    </svg>
  );
}

function FlagRibbon({ edge }: { edge: "top" | "bottom" }) {
  const cols = 56;
  const cell = 20;
  const amp = 11;
  const rows = 2;
  const width = cols * cell;
  const height = amp * 2 + rows * cell;
  const tiles = [];
  const phase = edge === "bottom" ? Math.PI : 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x0 = i * cell;
      const x1 = x0 + cell + 0.5;
      const wave = (x: number) => Math.sin((x / width) * Math.PI * 2 * 1.35 + phase) * amp;
      const y0 = amp + wave(x0) + j * cell;
      const y1 = amp + wave(x1) + j * cell;
      tiles.push(
        <polygon
          key={`${edge}-${i}-${j}`}
          points={`${x0},${y0} ${x1},${y1} ${x1},${y1 + cell} ${x0},${y0 + cell}`}
          fill={(i + j) % 2 === 0 ? "#111214" : "#f7f7f8"}
        />,
      );
    }
  }
  return (
    <svg
      className={`why-flag ${edge}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {tiles}
    </svg>
  );
}

function BoiseFilm() {
  const hold = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState("");

  useEffect(() => {
    const el = hold.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const play = reduce ? "0" : "1";
    const url = `https://www.youtube-nocookie.com/embed/bSldLJXGTGU?autoplay=${play}&mute=1&loop=1&playlist=bSldLJXGTGU&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3`;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setSrc(url);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="boise-stage" ref={hold}>
      <div className="boise-frame">
        <img src="/media/door1.webp" alt="" />
        {src ? (
          <iframe
            src={src}
            title="Garage Door Store Boise film"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}
      </div>
      <span className="boise-chip" aria-hidden="true">
        <span className="boise-chip-flag" />
        On track
      </span>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function GoogleMark() {
  return (
    <svg className="gmark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.7.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.7 1.4 5.5l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1C6.3 6.8 8.9 4.8 12 4.8z" />
    </svg>
  );
}

function GoogleWord() {
  return (
    <span className="gword" aria-hidden="true">
      <b>G</b>
      <b>o</b>
      <b>o</b>
      <b>g</b>
      <b>l</b>
      <b>e</b>
    </span>
  );
}

const avatarTones = ["#ef2430", "#121214", "#3a3d42", "#c3121d", "#1c1d21", "#ef2430", "#2a2c31", "#121214", "#c3121d"];

function ReviewIndex() {
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  const next = () => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".gcard");
    const step = (card?.offsetWidth ?? 280) + 12;
    const max = el.scrollWidth - el.clientWidth - 8;
    if (el.scrollLeft >= max) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: step, behavior: "smooth" });
  };

  return (
    <div className="gindex">
      <div className="gindex-bar">
        <div>
          <p className="gindex-title">Top Rated in Boise</p>
          <div className="gindex-score">
            <GoogleWord />
            <span className="gindex-stars" aria-label="5.0 star Google rating">
              ★★★★★
            </span>
            <strong className="gindex-num">5.0</strong>
            <span className="gindex-verify">
              verified by Trustindex
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 11v6M12 7.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
        <a className="btn btn-red" href={GOOGLE_REVIEWS} target="_blank" rel="noreferrer">
          Write a review
        </a>
      </div>
      <div className="gindex-row">
        <div className="gindex-track" ref={track} tabIndex={0} aria-label="Google reviews">
          <article className="gcard gsummary">
            <div className="gsum-top">
              <span className="gsum-faces" aria-hidden="true">
                {reviews.slice(0, 3).map((r, i) => (
                  <span key={r.name} className="gavatar" style={{ background: avatarTones[i] }}>
                    {initials(r.name)}
                  </span>
                ))}
              </span>
              <div>
                <strong>Review summary</strong>
                <span>Based on 1,000+ Google reviews</span>
              </div>
            </div>
            <p>
              Homeowners mention fast scheduling, fair prices, and crews who text before they arrive. Springs, openers,
              and same-day door problems come up again and again.
            </p>
          </article>
          {reviews.map((r, i) => {
            const expanded = open === r.name;
            return (
              <article className="gcard" key={r.name}>
                <div className="gcard-top">
                  <span
                    className="gavatar"
                    style={{ background: avatarTones[i % avatarTones.length] }}
                    role="img"
                    aria-label={`${r.name} profile`}
                  >
                    {initials(r.name)}
                  </span>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.place}</span>
                  </div>
                  <GoogleMark />
                </div>
                <div className="gstar-row">
                  <span className="gindex-stars" aria-label="5 stars">
                    ★★★★★
                  </span>
                  <span className="gcheck" aria-hidden="true">
                    ✓
                  </span>
                </div>
                <p className={expanded ? "" : "clamp"}>{r.quote}</p>
                <button type="button" className="gmore" onClick={() => setOpen(expanded ? null : r.name)}>
                  {expanded ? "Show less" : "Read more"}
                </button>
              </article>
            );
          })}
        </div>
        <button type="button" className="gindex-next" aria-label="Next reviews" onClick={next}>
          <ChevronsRight size={28} />
        </button>
      </div>
    </div>
  );
}

function PitLane() {
  const stops = [
    { n: "01", title: "Contact", copy: `Tell us what is happening. Call ${PHONE_DISPLAY}.`, art: "/media/crew-contact.png" },
    { n: "02", title: "Inspect", copy: "We identify the issue on the door, not over the phone alone.", art: "/media/crew-inspect.png" },
    { n: "03", title: "Recommend", copy: "We explain the fix. Published jobs already have a number.", art: "/media/crew-recommend.png" },
    { n: "04", title: "Repair / install", copy: "The crew does the work. Springs are not a ladder project.", art: "/media/crew-repair.png" },
    { n: "05", title: "Test", copy: "The door is cycled before anyone leaves the driveway.", art: "/media/crew-test.png" },
  ];
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setLive(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!live || paused) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % stops.length), 2400);
    return () => window.clearInterval(id);
  }, [live, paused, stops.length]);

  return (
    <div
      className={live ? "pit-lane pit-live" : "pit-lane"}
      style={{ "--pit": active } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pit-track" aria-hidden="true">
        <span className="pit-rail" />
        <span className="pit-puck">
          <img key={stops[active].art} src={stops[active].art} alt="" />
        </span>
      </div>
      <div className="steps">
        {stops.map((stop, i) => (
          <div
            className={i === active ? "step is-hot" : "step"}
            key={stop.n}
            aria-current={i === active ? "step" : undefined}
            style={i === active ? ({ "--crew": `url(${stop.art})` } as CSSProperties) : undefined}
          >
            <b>{stop.n}</b>
            <strong>{stop.title}</strong>
            <p>{stop.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountNum({ value }: { value: string }) {
  const [text, setText] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Number(value);
    if (reduce || Number.isNaN(target)) {
      setText(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started) return;
        started = true;
        const t0 = performance.now();
        const run = (now: number) => {
          const p = Math.min(1, (now - t0) / 700);
          setText(String(Math.round(target * p)).padStart(2, "0"));
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="giant" ref={ref}>
      {text}
    </div>
  );
}

export function HomePage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState(0);
  useReveal();
  const picked = cities[city] ?? cities[0];
  const mapQuery = picked.name === "Boise" ? "9075 W Hackamore Dr, Boise, ID 83709" : `${picked.name}, Idaho`;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=12&output=embed`;

  function onQuote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const place = String(data.get("city") ?? "");
    const job = String(data.get("job") ?? "").trim();
    if (name.length < 2) {
      setError("Add your name.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Add a phone number.");
      return;
    }
    const body = `Name: ${name}\nPhone: ${phone}\nCity: ${place}\nJob: ${job || "Not specified"}\n\nRequesting the advertised 10% off and a free in-home consultation.`;
    setError("");
    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Free estimate — Garage Door Store Boise")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <SiteChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main id="main">
        <section className="hero">
          <div className="hero-stage">
            <img
              className="hero-photo"
              src="/media/team.webp"
              alt="Garage Door Store Boise crew and red service trucks"
            />
            <div className="hero-fade" />
          </div>
          <div className="wrap hero-copy-wrap">
            <div className="hero-copy">
              <p className="kicker">Garage Door Store Boise</p>
              <h1>
                <span>Built for Boise.</span>
                <span className="accent">Engineered to run.</span>
              </h1>
              <p className="lede">
                Family-owned garage door repair and installation for Boise and the Treasure Valley. On time, done
                carefully, no runaround.
              </p>
              <div className="hero-proof">
                <a className="hero-rating" href="#reviews" aria-label="5.0 stars from 1,000 plus Google reviews">
                  <span className="hero-stars" aria-hidden="true">
                    ★★★★★
                  </span>
                  <strong>5.0</strong>
                  <span>1,000+ reviews</span>
                </a>
                <a className="hero-phone" href={PHONE_TEL}>
                  <Phone size={15} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="hero-actions">
                <a className="btn btn-red hero-cta" href="#quote">
                  <ChevronsRight size={18} aria-hidden="true" /> Get a free estimate
                </a>
              </div>
            </div>
          </div>
          <div className="track" aria-hidden="true">
            <HeroFlag />
          </div>
        </section>

        <section className="perf" aria-label="How the shop works">
          <div className="perf-row">
            <div className="perf-item">
              <MapPin size={18} aria-hidden="true" /> Local Boise service
            </div>
            <div className="perf-item">
              <Shield size={18} aria-hidden="true" /> Quality workmanship
            </div>
            <div className="perf-item">
              <Wrench size={18} aria-hidden="true" /> Experienced technicians
            </div>
            <div className="perf-item">
              <Handshake size={18} aria-hidden="true" /> Customer-first service
            </div>
          </div>
        </section>

        <section className="section story" id="difference">
          <div className="wrap">
            <div className="story-grid">
              <div className="story-visual" data-reveal>
                <div className="story-plate" aria-hidden="true">
                  <img src="/media/kevin-plate.webp" alt="" />
                </div>
                <img
                  className="story-cut"
                  src="/media/kevin-full.png"
                  alt="Kevin Bocchini, owner of Garage Door Store Boise"
                />
              </div>
              <div className="story-copy" data-reveal>
                <div className="story-main">
                  <p className="kicker">The difference</p>
                  <h2>
                    Your garage door should do more than just <span>open.</span>
                  </h2>
                  <p className="lede">
                    It should work reliably, look right on the house, and perform when you need it. Garage door repair
                    in Boise is treated here like mechanical work: set prices on the jobs they publish, a phone estimate
                    before the truck rolls, and no add-on surprises.
                  </p>
                  <p className="lede">
                    Over 30 years servicing doors. Licensed, bonded, and insured. Wayne Dalton, LiftMaster, Clopay, and
                    Genie on the rack.
                  </p>
                </div>
                <div className="story-sign">
                  <hr className="story-rule" />
                  <p className="story-name">Kevin Bocchini</p>
                  <p className="story-role">Owner · Garage Door Store Boise</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section light svc-section" id="services">
          <div className="wrap">
            <div className="stack" data-reveal>
              <p className="kicker">Services</p>
              <h2>What we do</h2>
              <p className="lede">Professional garage door solutions for Boise-area homeowners.</p>
            </div>
            <div className="svc">
              {services.map((item) => (
                <article key={item.id} id={item.id} className="svc-row">
                  <div className="svc-photo">
                    <img src={item.image} alt={item.alt} />
                    <span className="svc-badge">{item.num}</span>
                  </div>
                  <div className="svc-copy">
                    <h3>{item.title}</h3>
                    <p className="lede">{item.copy}</p>
                    <p>
                      <a className="btn btn-line" href={item.href}>
                        Learn more <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section band why" id="why">
          <FlagRibbon edge="top" />
          <FlagRibbon edge="bottom" />
          <div className="wrap">
            <div data-reveal>
              <p className="kicker">Performance</p>
              <h2>Why Boise homeowners choose us.</h2>
            </div>
            <div className="principles mt-8">
              <article className="principle" data-reveal>
                <span className="principle-icon" aria-hidden="true">
                  <Clock size={22} strokeWidth={2.4} />
                </span>
                <CountNum value="01" />
                <h3>Show up ready</h3>
                <p>Respect the customer’s time and arrive prepared to solve the problem.</p>
              </article>
              <article className="principle" data-reveal>
                <span className="principle-icon" aria-hidden="true">
                  <Handshake size={22} strokeWidth={2.4} />
                </span>
                <CountNum value="02" />
                <h3>Keep it honest</h3>
                <p>Clear recommendations and straightforward service without unnecessary pressure.</p>
              </article>
              <article className="principle" data-reveal>
                <span className="principle-icon" aria-hidden="true">
                  <Wrench size={22} strokeWidth={2.4} />
                </span>
                <CountNum value="03" />
                <h3>Do it right</h3>
                <p>Quality parts, careful installation, and workmanship you can depend on.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="compare" style={{ background: "var(--color-bay)" }}>
          <div className="wrap">
            <div data-reveal>
              <p className="kicker">The difference</p>
              <h2>The difference is in the details.</h2>
              <p className="lede mt-3">
                How this shop says it works. Not a ranking, not a speed claim — the standard they publish against a
                generic approach.
              </p>
            </div>
            <div className="compare mt-8">
              <div className="col us">
                <h3>Garage Door Store Boise</h3>
                <ul>
                  {ours.map((item) => (
                    <li key={item}>
                      <span className="mark" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <h3 className="dim">Typical garage door company</h3>
                <ul>
                  {typical.map((item) => (
                    <li key={item} className="dim">
                      <span aria-hidden="true">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section band" id="boise">
          <div className="wrap boise-grid">
            <BoiseFilm />
            <div className="stack" data-reveal>
              <p className="kicker">Boise, Idaho</p>
              <h2>Made for Boise.</h2>
              <p className="lede">
                Garage doors have to perform through Idaho’s changing seasons. Garage Door Store Boise helps
                Treasure Valley homeowners keep garages secure, functional, and looking like they belong on the
                house.
              </p>
              <p className="lede">
                The shop is at {ADDRESS}. Published hours are Monday–Friday 7am–7pm and Saturday 7am–noon. The
                phone line to a technician is advertised 24/7.
              </p>
            </div>
          </div>
        </section>

        <section className="section light" id="reviews">
          <div className="wrap">
            <div className="reviews-head" data-reveal>
              <p className="kicker">Reviews</p>
              <h2 className="spoken">
                <span>Boise homeowners</span>
                <span>have spoken.</span>
              </h2>
              <p className="lede spoken-dek">
                <span>Google-sourced quotes from the Garage Door Store site, shown in full.</span>
                <span>Every card shows the reviewer and the full text. Open the live index first.</span>
              </p>
            </div>
            <ReviewIndex />
          </div>
        </section>

        <section className="section band process" id="process">
          <div className="wrap">
            <div data-reveal>
              <p className="kicker">Process</p>
              <h2>From problem to solution.</h2>
            </div>
            <PitLane />
          </div>
        </section>

        <section className="section light area-section" id="area">
          <div className="wrap area-grid">
            <div className="area-copy">
              <p className="kicker">Service area</p>
              <h2>Proudly serving Boise and the Treasure Valley.</h2>
              <p className="lede mt-3">
                Garage door service from Hackamore Drive across Boise, Meridian, Eagle, Nampa, and the towns around
                them. Pick a community and the map moves to it.
              </p>
              <div className="cities">
                {cities.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-pressed={i === city}
                    onClick={() => setCity(i)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <p className="mt-4">
                <a
                  className="btn btn-line"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={16} aria-hidden="true" /> Open the map pin
                </a>
              </p>
            </div>
            <div className="map-stage">
              <iframe
                key={mapQuery}
                className="map-frame"
                title={`Map of ${picked.name}, Idaho`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              />
            </div>
          </div>
        </section>

        <section className="finale" id="quote">
          <img className="bg" src="/media/door2.webp" alt="" />
          <div className="shade" />
          <div className="wrap finale-grid">
            <div className="finale-copy">
              <p className="kicker">Estimate</p>
              <h2>
                Ready to get your garage door back on track?
              </h2>
              <p className="lede mt-3">Let’s get your garage door working the way it should.</p>
              <p className="mt-4 flex flex-wrap gap-3">
                <a className="btn btn-red" href={PHONE_TEL}>
                  <Phone size={16} aria-hidden="true" /> Call now {PHONE_DISPLAY}
                </a>
              </p>
              <p className="trust-line mt-4">
                <Clock size={14} aria-hidden="true" /> 10% off and a free in-home consult, as advertised.
              </p>
            </div>
            {sent ? (
              <div className="form">
                <p>Email draft started. If it did not open, call the shop.</p>
                <a className="btn btn-red" href={PHONE_TEL}>
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            ) : (
              <form className="form" onSubmit={onQuote}>
                <label htmlFor="name">Name</label>
                <input className="field" id="name" name="name" autoComplete="name" required />
                <label htmlFor="phone">Phone</label>
                <input className="field" id="phone" name="phone" type="tel" autoComplete="tel" required />
                <label htmlFor="city">City</label>
                <select className="field" id="city" name="city" defaultValue="Boise">
                  {cities.map((c) => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                  <option>Other Treasure Valley</option>
                </select>
                <label htmlFor="job">What do you need</label>
                <textarea className="field" id="job" name="job" rows={3} placeholder="Repair, new door, opener, springs…" />
                {error ? <p className="form-error">{error}</p> : null}
                <button className="btn btn-red" type="submit">
                  Get a free estimate
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
