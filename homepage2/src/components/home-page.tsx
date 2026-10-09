import { EstimateForm } from "@/components/estimate-form";
import { Link } from "@tanstack/react-router";
import { Ban, Building2, Clock3, Columns2, DoorClosed, DoorOpen, HelpCircle, Home, LayoutGrid, MapPin, Phone, Scan, ShieldCheck, Users, Warehouse, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ADDRESS_CITY,
  ADDRESS_LINE,
  offers,
  PHONE_DISPLAY,
  PHONE_TEL,
  residentialStyles,
  REVIEW_LINKS,
  reviews,
  serviceAreas,
  services,
} from "@/data/site";

const googleReviews = [
  {
    name: "Lauri T.",
    place: "Boise",
    stars: 5,
    text: "My garage door spring snapped late Thursday night. I called the next morning and my call was returned within the hour. I wasn’t able to be there Friday afternoon because of Dr. appointments, so they came out Saturday morning first thing. The team replaced the spring and added another spring on my double door. They were done in less than 30 minutes. Fast, efficient, courteous service.",
  },
  ...reviews,
];

function reviewInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const shots = [
  { src: "/media/wood-4.webp", alt: "Wood grain sectional garage door from the company gallery", label: "Wood and stone", group: "wood" },
  { src: "/media/carriage-2.webp", alt: "Carriage garage door with decorative windows, company gallery", label: "Carriage pair", group: "carriage" },
  { src: "/media/wood-3.webp", alt: "Wood grain garage doors on a residence in the company gallery", label: "Gallery wood", group: "wood" },
  { src: "/media/carriage-1.webp", alt: "Carriage-style garage door from the company gallery", label: "Carriage hardware", group: "carriage" },
  { src: "/media/steel.webp", alt: "White carriage-style garage doors from the company gallery", label: "Arched steel", group: "traditional" },
  { src: "/media/trad-1.webp", alt: "Traditional raised-panel garage door from the company gallery", label: "Matched pair", group: "traditional" },
  { src: "/media/wood-2.webp", alt: "Second wood grain garage door from the company gallery", label: "Winter wood", group: "wood" },
  { src: "/media/comm-1.webp", alt: "Commercial garage door from the Garage Door Store Boise gallery", label: "Commercial bay", group: "commercial" },
  { src: "/media/comm-2.webp", alt: "Commercial bay door from the company gallery", label: "Shop door", group: "commercial" },
];

const filters = [
  { id: "all", label: "All" },
  { id: "wood", label: "Wood" },
  { id: "carriage", label: "Carriage" },
  { id: "traditional", label: "Traditional" },
  { id: "commercial", label: "Commercial" },
] as const;

const faqs = [
  {
    q: "When should I replace it?",
    a: "Damaged panels, a twisted door, or a repair that will not hold. Start with a free estimate.",
    Icon: DoorOpen,
  },
  {
    q: "How do I choose a shop?",
    a: "Family-owned, licensed, bonded, and insured. Someone answers 24/7. Ask the price first.",
    Icon: ShieldCheck,
  },
  {
    q: "Can I install it myself?",
    a: "No. The shop installs it. Springs stay under tension even when the door is down.",
    Icon: Ban,
  },
  {
    q: "What is a tune-up?",
    a: "$125, tax and labor included. It keeps a working door working. Confirm before you book.",
    Icon: Wrench,
  },
  {
    q: "Why did it stop?",
    a: "Spring, opener, track, photo eyes, or a lock. A technician still has to see the door.",
    Icon: HelpCircle,
  },
];

const areaPills = ["Kuna", "Meridian", "Eagle", "Nampa", "Star", "Caldwell", "Middleton", "Homedale"];

export function HomePage() {
  return (
    <main className="home">
      <Hero />
      <Collection />
      <Services />
      <Shop />
      <Reviews />
      <Portfolio />
      <Area />
      <Prices />
      <Finale />
      <Questions />
    </main>
  );
}

const heroClips = [
  { src: "/media/hero-navy.mp4", label: "Carriage wood", Icon: DoorClosed },
  { src: "/media/hero-wood.mp4", label: "Wood and windows", Icon: LayoutGrid },
  { src: "/media/hero-angle.mp4", label: "Three-quarter view", Icon: Scan },
  { src: "/media/hero-carriage.mp4", label: "Carriage pair", Icon: Columns2 },
  { src: "/media/hero-bay.mp4", label: "Commercial bay", Icon: Warehouse },
];

function Hero() {
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const reel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPlay(!reduce);
  }, []);

  useEffect(() => {
    if (!play) return;
    const videos = reel.current?.querySelectorAll("video");
    if (!videos) return;
    videos.forEach((video, i) => {
      if (i === index) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index, play]);

  const clip = heroClips[play ? index : 0];
  const ClipIcon = clip.Icon;

  return (
    <section className="hm-hero" aria-label="Introduction">
      <div className="hm-hero-copy">
        <span className="hm-hero-mark" aria-hidden="true" />
        <p className="hm-kicker">Boise · Treasure Valley</p>
        <h1>
          Your home.
          <br />
          Your statement.
          <br />
          <em className="hm-line">Your garage door.</em>
        </h1>
        <p className="hm-lead">
          Thoughtfully selected garage doors, dependable repairs, and professional installation for Boise and the Treasure Valley.
        </p>
        <ul className="hm-hero-spec">
          <li>Family owned</li>
          <li>30+ years</li>
          <li>Homes and commercial</li>
        </ul>
        <div className="hm-actions">
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Get a free estimate
          </Link>
          <a className="hm-btn hm-btn-line" href="#collection">
            Explore the collection
          </a>
        </div>
      </div>
      <figure className="hm-hero-photo">
        <div className="hm-hero-reel" ref={reel}>
          {play ? (
            heroClips.map((clip, i) => (
              <video
                key={clip.src}
                className={i === index ? "is-on" : undefined}
                src={clip.src}
                muted
                playsInline
                aria-hidden="true"
                preload={i === 0 ? "auto" : "metadata"}
                poster="/media/hero-blue-house.webp"
                onEnded={() => setIndex((n) => (n + 1) % heroClips.length)}
              />
            ))
          ) : (
            <img src="/media/hero-blue-house.webp" alt="Wood-tone garage doors on a blue home from the company gallery" />
          )}
        </div>
        <figcaption>
          <span className="hm-hero-ico" aria-hidden="true">
            <ClipIcon size={16} />
          </span>
          <span>{clip.label}</span>
        </figcaption>
      </figure>
    </section>
  );
}

function Collection() {
  return (
    <section className="hm-band hm-paper" id="collection" aria-labelledby="collection-title">
      <div className="hm-collection-head">
        <p className="hm-kicker">The collection</p>
        <div className="hm-collection-row">
          <div className="hm-collection-copy">
            <h2 id="collection-title">Not just a door. The finishing touch.</h2>
            <p className="hm-note">
              Six looks from the shop’s own gallery. Tap a style to see the photographs and ask for that door.
            </p>
          </div>
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Get a free estimate
          </Link>
        </div>
      </div>
      <div className="hm-styles">
          {residentialStyles.map((style) => (
            <Link key={style.slug} to="/doors/$slug" params={{ slug: style.slug }} className="hm-style">
              <img src={style.images[0].src} alt={style.images[0].alt} />
              <span className="hm-style-no">{style.number}</span>
              <span className="hm-style-meta">
                <strong>
                  {style.slug === "wood-grain" ? "Wood grain" : style.slug === "carriage" ? "Carriage doors" : style.title}
                </strong>
                <span className="hm-style-desc">{style.summary}</span>
                <em>Explore style →</em>
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
}

function Services() {
  const [index, setIndex] = useState(0);
  const current = services[index];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % services.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [index]);

  return (
    <section className="hm-band hm-dark" id="services" aria-labelledby="services-title">
      <div className="hm-wrap hm-two hm-services">
        <div>
          <p className="hm-kicker">Services</p>
          <h2 id="services-title">When something’s wrong, we get to work.</h2>
          <div className="hm-slist" role="tablist" aria-label="Services">
            {services.map((service, i) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              >
                <span>{service.number}</span>
                {service.title}
              </button>
            ))}
          </div>
        </div>
        <figure className="hm-service-card">
          <div className="hm-service-slides" aria-hidden="true">
            {services.map((service, i) => (
              <img key={service.id} className={i === index ? "is-on" : undefined} src={service.image} alt="" />
            ))}
          </div>
          <figcaption>
            <p>{current.summary}</p>
            <a href={current.href} className="hm-btn hm-btn-signal">
              {current.id === "repair" ? "Request a repair visit" : current.cta} →
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function FactFigure({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      setN(Math.round((1 - (1 - t) ** 3) * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

function Shop() {
  const facts = [
    { strong: "30+", label: "Years in the Treasure Valley", Icon: Clock3, count: 30, suffix: "+" },
    { strong: "24/7", label: "A technician takes the call", Icon: Phone, count: 24, suffix: "/7" },
    { strong: "Free", label: "In-home estimate", Icon: Home },
    { strong: "Family", label: "Owned and operated in Boise", Icon: Users },
    { strong: "Homes", label: "And commercial openings", Icon: Building2 },
    { strong: "Boise", label: "Meridian, Eagle, Nampa, and the valley", Icon: MapPin },
  ];
  const list = useRef<HTMLUListElement>(null);
  const [counting, setCounting] = useState(false);
  useEffect(() => {
    const node = list.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="hm-band hm-paper" aria-labelledby="shop-title">
      <div className="hm-shop">
        <figure className="hm-shop-photo">
          <img src="/media/truck.webp" alt="Garage Door Store Boise service trucks and crew" />
          <figcaption>
            <p className="hm-kicker">The shop</p>
            <h2 id="shop-title">Local know-how. Over 30 years on the job.</h2>
            <p className="hm-note">
              Family-owned in Boise. Free in-home estimates for homes and commercial openings, from a crew you can call.
            </p>
          </figcaption>
        </figure>
        <ul className="hm-facts" ref={list}>
          {facts.map((fact) => (
            <li key={fact.strong}>
              <fact.Icon aria-hidden="true" strokeWidth={1.5} />
              <strong>
                {fact.count ? <FactFigure value={fact.count} suffix={fact.suffix} active={counting} /> : fact.strong}
              </strong>
              <span>{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);
  const average = (googleReviews.reduce((sum, review) => sum + review.stars, 0) / googleReviews.length).toFixed(1);
  function shift(direction: number) {
    const frame = scroller.current;
    const card = frame?.querySelector("article");
    if (!frame || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gap = 12;
    frame.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  }
  return (
    <section className="hm-band hm-paper" id="reviews" aria-labelledby="reviews-title">
      <div className="hm-greviews">
        <div className="hm-greviews-head">
          <p className="hm-kicker">Reviews</p>
          <h2 id="reviews-title">Neighbors, after the truck leaves.</h2>
          <p className="hm-note">
            Published reviews of the Boise shop. The score is the average of the notes shown here.
          </p>
        </div>
        <div className="hm-gindex">
          <header className="hm-gindex-bar">
            <p className="hm-gscore">
              <span className="hm-gword" aria-label="Google">
                <span>G</span>
                <span>o</span>
                <span>o</span>
                <span>g</span>
                <span>l</span>
                <span>e</span>
              </span>
              <span className="hm-gstars" aria-label={`${average} out of 5`}>
                ★★★★★
              </span>
              <strong>{average}</strong>
              <span>{googleReviews.length} published reviews</span>
            </p>
          </header>
          <div className="hm-gindex-row">
            <div className="hm-gcards" ref={scroller}>
              {googleReviews.map((review) => (
                <article key={review.name}>
                  <header>
                    <span aria-hidden="true">{reviewInitials(review.name)}</span>
                    <div>
                      <strong>{review.name}</strong>
                      {"place" in review && review.place ? <em>{review.place}</em> : null}
                    </div>
                  </header>
                  <p className="hm-gstars" aria-label={`${review.stars} out of 5`}>
                    {"★".repeat(review.stars)}
                  </p>
                  <p>{review.text}</p>
                </article>
              ))}
            </div>
            <button type="button" className="hm-gnext" aria-label="Next reviews" onClick={() => shift(1)}>
              →
            </button>
          </div>
        </div>
        <div className="hm-actions">
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Request an estimate
          </Link>
          <a className="hm-btn hm-btn-line" href={REVIEW_LINKS[0].href}>
            See on Google
          </a>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = shots.filter((shot) => filter === "all" || shot.group === filter);
  return (
    <section className="hm-band hm-paper" id="work" aria-labelledby="work-title">
      <div className="hm-wrap">
        <div className="hm-split-head">
          <div>
            <p className="hm-kicker">Portfolio</p>
            <h2 id="work-title">Built around your home.</h2>
            <p className="hm-note">Photographs from the shop gallery. Same frame on every look.</p>
          </div>
          <div className="hm-filters" role="tablist" aria-label="Gallery filters">
            {filters.map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="hm-folio hm-swap" key={filter}>
          {visible.map((shot, index) => (
            <figure key={shot.src} className="hm-shot">
              <div className="hm-shot-frame">
                <img src={shot.src} alt={shot.alt} />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{shot.label}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link to="/work" className="hm-quiet">
          See the full gallery
        </Link>
      </div>
    </section>
  );
}

function Area() {
  const shown = areaPills.filter((city) => (serviceAreas as readonly string[]).includes(city));
  const [from, setFrom] = useState<string | null>(null);
  const shop = "43.5945155,-116.2951392";
  const mapSrc = from
    ? `https://www.google.com/maps/embed?origin=mfe&pb=!1m8!4m6!4m1!2s${from.replace(/ /g, "+")},+Idaho!4m3!3m2!1d43.5945155!2d-116.2951392!5e1`
    : `https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1s${shop}!5e1!6i16`;
  return (
    <section className="hm-band hm-dark" aria-labelledby="area-title">
      <div className="hm-wrap hm-area">
        <div className="hm-area-copy">
          <p className="hm-kicker">Service area</p>
          <h2 id="area-title">Proud to serve the Treasure Valley.</h2>
          <p className="hm-note hm-note-light">
            {ADDRESS_LINE}, {ADDRESS_CITY}. Pick a town and the same map draws the drive to the shop.
          </p>
          <ul className="hm-pills">
            {shown.map((city) => (
              <li key={city}>
                <button type="button" aria-pressed={from === city} onClick={() => setFrom(city === from ? null : city)}>
                  {city}
                </button>
              </li>
            ))}
          </ul>
          <p className="hm-count">{from ? `From ${from} to the shop` : `${shown.length} directions`}</p>
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Ask if you live in the area
          </Link>
        </div>
        <div className="hm-map">
          <iframe
            key={from ?? "shop"}
            title={from ? `Satellite directions from ${from} to Garage Door Store Boise` : "Satellite map of Garage Door Store Boise"}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Prices() {
  const [front, setFront] = useState(0);
  const paused = useRef(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setFront((n) => (n + 1) % offers.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <section className="hm-band hm-paper" id="prices" aria-labelledby="prices-title">
      <div className="hm-wrap">
        <div className="hm-price-head">
          <div>
            <p className="hm-kicker">Published prices</p>
            <h2 id="prices-title">What the shop has in writing.</h2>
          </div>
          <p className="hm-note">
            These amounts are the ones published on the current site. Call to confirm before you book. Anything else is an estimate, not a price.
          </p>
        </div>
        <ul
          className="hm-prices"
          onMouseEnter={() => {
            paused.current = true;
          }}
          onMouseLeave={() => {
            paused.current = false;
          }}
        >
          {offers.map((offer, index) => (
            <li key={offer.name} className={index === front ? "hm-ticket is-front" : "hm-ticket"}>
              <p>Garage Door Store · Boise</p>
              <span>{offer.price}</span>
              <hr />
              <strong>{offer.name}</strong>
              <em>{offer.includes}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <section className="hm-finale" aria-labelledby="finale-title">
      <img src="/media/trad-1.webp" alt="" />
      <div className="hm-finale-panel">
        <div className="hm-finale-copy">
          <p className="hm-kicker">Free estimate</p>
          <h2 id="finale-title">Ready for a better garage door?</h2>
          <p>Send the details, or call the shop.</p>
          <a className="hm-btn hm-btn-ghost" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <EstimateForm id="home-estimate" compact />
      </div>
    </section>
  );
}

function Questions() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="hm-band hm-paper" id="questions" aria-labelledby="faq-title">
      <div className="hm-wrap">
        <div className="hm-faq">
          <div className="hm-faq-copy">
            <p className="hm-kicker">Questions</p>
            <h2 id="faq-title">Answered briefly.</h2>
            <p className="hm-note">
              Five short answers from what the shop already publishes. A technician still has to see the door before anyone names a price.
            </p>
            <Link to="/contact" className="hm-btn hm-btn-signal">
              Ask about your door
            </Link>
          </div>
          <div className="hm-faq-list">
            {faqs.map((item, i) => {
              const on = open === i;
              return (
                <div key={item.q} className={on ? "is-open" : undefined}>
                  <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)}>
                    <span className="hm-faq-icon">
                      <item.Icon size={16} aria-hidden="true" />
                    </span>
                    {item.q}
                  </button>
                  {on && <p>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
