import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK,
  GOOGLE_REVIEWS,
  INSTAGRAM,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  cities,
  reviews,
} from "@/data/site";

const troubles = [
  {
    id: "spring",
    title: "Broken spring",
    line: "Yeah… that's not supposed to happen.",
    copy: "Dual spring change, published at $350 with tax, labor, and a 10-year warranty on that coupon.",
    img: "/media/shop/truckshots-boise-copy.webp",
    alt: "Garage Door Store Boise technician with an open service truck",
  },
  {
    id: "stuck",
    title: "Won't open",
    line: "The car can wait. The door shouldn't.",
    copy: "Springs, off-track doors, and maintenance can be handled the same day you call.",
    img: "/media/shop/IMG_3603.webp",
    alt: "Wood-look garage door with an arched window row",
  },
  {
    id: "noise",
    title: "Weird noises",
    line: "A squeak is a hint. A bang is a stop sign.",
    copy: "Tune-up is published at $125, tax and labor included.",
    img: "/media/shop/IMG_0613.webp",
    alt: "Three wood carriage garage doors with black hardware",
  },
  {
    id: "opener",
    title: "Opener problems",
    line: "Press. Open. Easy.",
    copy: "Published motor package: 7-foot Genie 2028 belt drive, two remotes, and a keypad, $700.",
    img: "/media/shop/B0994238-2DF7-48FF-8460-5773511915CB.webp",
    alt: "Red Garage Door Store Boise trucks lined up with the crew",
  },
  {
    id: "track",
    title: "Off track",
    line: "Don't keep hitting the button.",
    copy: "Leave it. Forcing an off-track door usually bends more than the track.",
    img: "/media/shop/IMG_1868.webp",
    alt: "Carriage-style garage door with side barn doors open",
  },
  {
    id: "look",
    title: "Need a new look",
    line: "Let's make the neighbors look twice.",
    copy: "Steel, carriage, wood, standard, and commercial. Wayne Dalton, Clopay, LiftMaster, and Genie.",
    img: "/media/shop/IMG_9998.webp",
    alt: "Three wood-tone overhead doors on a gabled building",
  },
] as const;

const doors = [
  {
    name: "Wood",
    img: "/media/shop/IMG_0613.webp",
    alt: "Three wood carriage garage doors with black hardware",
    copy: "Grain, straps, and a real front.",
  },
  {
    name: "Carriage",
    img: "/media/shop/IMG_3603.webp",
    alt: "Arched wood-look garage door set in stone",
    copy: "Windows and hardware, one system.",
  },
  {
    name: "Steel",
    img: "/media/door1.webp",
    alt: "Three white garage doors on a Treasure Valley house",
    copy: "Clean steel, matched across the bays.",
  },
  {
    name: "Standard",
    img: "/media/steel.webp",
    alt: "Pair of white garage doors on a green house",
    copy: "The everyday door, set so both bays match.",
  },
] as const;

const colors = [
  { name: "Cream", hex: "#F5EBDD" },
  { name: "White", hex: "#F4F1EA" },
  { name: "Black", hex: "#171717" },
  { name: "Barn red", hex: "#D9362B" },
  { name: "Steel", hex: "#8A8A8A" },
  { name: "Teal", hex: "#4F7474" },
] as const;

const parts = [
  { id: "springs", title: "Springs", copy: "They carry the door. A break is a stop, not a weekend project." },
  { id: "rollers", title: "Rollers", copy: "They should glide. Grinding usually means the metal is done." },
  { id: "tracks", title: "Tracks", copy: "If the door jumps the track, leave it alone and call." },
  { id: "cables", title: "Cables", copy: "They share the load with the springs. A fray is a reason to stop." },
  { id: "opener", title: "Opener", copy: "Belt and chain drives. The published package is a Genie 2028." },
  { id: "slab", title: "Door", copy: "The part the street sees. Steel, carriage, wood, standard, commercial." },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Garage Door Store Boise",
  telephone: "+1-208-514-2871",
  email: EMAIL,
  image: "/art/hero.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9075 W Hackamore Dr",
    addressLocality: "Boise",
    addressRegion: "ID",
    postalCode: "83709",
    addressCountry: "US",
  },
  url: "https://garagedoorstoreboise.com/",
  areaServed: cities.map((c) => c.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Garage door services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garage door repair Boise" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garage door installation Boise" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garage door opener Boise" } },
    ],
  },
};

function useMotion() {
  const lift = useRef<HTMLElement>(null);
  const door = useRef<HTMLDivElement>(null);
  const opening = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const tick = () => {
      if (!mq.matches) {
        const section = lift.current;
        const pin = section?.querySelector<HTMLElement>(".lift-pin");
        const openEl = opening.current;
        const doorEl = door.current;
        if (section && pin && openEl && doorEl) {
          const room = openEl.clientHeight || 1;
          const nextH = `${pin.offsetHeight + room}px`;
          if (section.style.height !== nextH) section.style.height = nextH;
          const stuck = Math.max(0, pin.getBoundingClientRect().top - section.getBoundingClientRect().top);
          doorEl.style.transform = `translate3d(0, ${-Math.min(stuck, room)}px, 0)`;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { lift, door, opening };
}

const visitSlides = [
  { src: "/media/shop/IMG_9998.webp", alt: "Garage Door Store Boise shop with the doors open" },
  { src: "/media/shop/IMG_0613.webp", alt: "Three wood garage doors installed by the Boise crew" },
  { src: "/media/shop/IMG_3603.webp", alt: "Arched wood garage door on a Boise home" },
  { src: "/media/shop/IMG_1868.webp", alt: "Carriage-house garage door with black strap hardware" },
] as const;

const faqs = [
  {
    q: "How soon can you come?",
    a: "Same day when the schedule allows. The technician line is advertised 24/7.",
  },
  {
    q: "What are the published prices?",
    a: "Tune-up $125. Dual spring $350. Torque tubes $450. Genie 2028 motor package $700.",
  },
  {
    q: "Which towns do you cover?",
    a: "Boise, and the Valley towns named on the shop site.",
  },
  {
    q: "Which brands do you install?",
    a: "Wayne Dalton, LiftMaster, Clopay, and Genie, as the shop lists them.",
  },
  {
    q: "How do I get a quote?",
    a: "Use the form. It opens an email to the shop. Or call (208) 514-2871.",
  },
] as const;

function answerFor(question: string) {
  const text = question.toLowerCase();
  if (/price|cost|how much|tune|\$|spring|torque|motor|package/.test(text)) return faqs[1].a;
  if (/soon|same day|today|when|hour|schedule|fast|24/.test(text)) return faqs[0].a;
  if (/town|city|area|cover|meridian|eagle|nampa|kuna|boise|star|caldwell/.test(text)) return faqs[2].a;
  if (/brand|wayne|liftmaster|clopay|genie|install/.test(text)) return faqs[3].a;
  if (/address|hackamore|where are|located|shop/.test(text)) return `${ADDRESS}. Call ${PHONE_DISPLAY}.`;
  if (/quote|email|call|phone|contact/.test(text)) return faqs[4].a;
  return `Call ${PHONE_DISPLAY}, or use the quote form. The shop answers from there.`;
}

function AskWidget() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function ask(next = question) {
    const trimmed = next.trim();
    if (trimmed.length < 2) {
      setAnswer("Type a short question, or tap one below.");
      return;
    }
    setQuestion(trimmed);
    setAnswer(answerFor(trimmed));
  }

  return (
    <div className={`ask-widget ${open ? "open" : ""}`}>
      {open && (
        <form
          className="ask-panel"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            ask();
          }}
        >
          <p className="kicker">Fast ask</p>
          <strong>Ask. Get a straight answer.</strong>
          <label>
            Your question
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Springs, towns, hours…"
            />
          </label>
          <button className="btn btn-red" type="submit">
            Answer
          </button>
          {answer && <p className="ask-answer">{answer}</p>}
          <div className="ask-chips">
            {faqs.map((item) => (
              <button key={item.q} type="button" onClick={() => ask(item.q)}>
                {item.q}
              </button>
            ))}
          </div>
          <a href={PHONE_TEL}>Or call {PHONE_DISPLAY}</a>
        </form>
      )}
      <button
        className="ask-btn"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close questions" : "Ask a question"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M8 8l16 16M24 8L8 24" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 6.5h20v13.5H13.2L6 25.5z" />
            <path d="M16 11.2a2.3 2.3 0 0 1 2.35 2.25c0 1.7-2.35 1.85-2.35 3.35" />
            <circle cx="16" cy="19.4" r="1.05" />
          </svg>
        )}
      </button>
    </div>
  );
}

function nudgeReviews(el: HTMLDivElement | null, dir: number) {
  if (!el) return;
  const card = el.querySelector("article");
  const step = (card?.clientWidth ?? 280) + 14;
  el.scrollBy({ left: dir * step, behavior: "smooth" });
}

export function BrandPage() {
  const motion = useMotion();
  const [menu, setMenu] = useState(false);
  const [trouble, setTrouble] = useState<(typeof troubles)[number]["id"]>("spring");
  const [part, setPart] = useState(0);
  const [spot, setSpot] = useState(0);
  const [doorOn, setDoorOn] = useState(0);
  const [visitOn, setVisitOn] = useState(0);
  const [area, setArea] = useState("9075 W Hackamore Dr, Boise, ID 83709");
  const [faq, setFaq] = useState(0);
  const reviewTrack = useRef<HTMLDivElement>(null);
  const doorHold = useRef(false);
  const spotHold = useRef(false);
  const visitHold = useRef(false);
  const active = troubles.find((t) => t.id === trouble) ?? troubles[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => setPart((n) => (n + 1) % parts.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      if (!spotHold.current) setSpot((n) => (n + 1) % 6);
    }, 1700);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      if (!visitHold.current) setVisitOn((n) => (n + 1) % visitSlides.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      if (!doorHold.current) setDoorOn((n) => (n + 1) % doors.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const root = document.querySelector(".brand");
    if (!root) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...root.querySelectorAll("main > section, .foot")];
    const texts = [...root.querySelectorAll("main h1, main h2, main .kicker, main .dek")];
    const mark = (el: Element, cls: string) => {
      el.classList.add(cls);
      const box = el.getBoundingClientRect();
      if (mq.matches || (box.top < window.innerHeight * 0.92 && box.bottom > 0)) el.classList.add("in");
    };
    if (!mq.matches) root.classList.add("motion");
    sections.forEach((el) => mark(el, "reveal"));
    const seen = new Map<Element, number>();
    texts.forEach((el) => {
      const parent = el.closest("section") ?? el;
      const n = seen.get(parent) ?? 0;
      seen.set(parent, n + 1);
      (el as HTMLElement).style.setProperty("--d", `${Math.min(n, 4) * 120}ms`);
      mark(el, "reveal-text");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    [...sections, ...texts].forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="brand">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <a className="mark" href="#top">
          <img src="/media/logo.png" alt="Garage Door Store Boise" />
        </a>
        <div className="nav-end">
          <nav className={menu ? "links open" : "links"}>
            <a href="#troubles" onClick={() => setMenu(false)}>
              Repairs
            </a>
            <a href="#doors" onClick={() => setMenu(false)}>
              Doors
            </a>
            <a href="#look" onClick={() => setMenu(false)}>
              Your house
            </a>
            <a href="#reviews" onClick={() => setMenu(false)}>
              Reviews
            </a>
            <a href="#boise" onClick={() => setMenu(false)}>
              Boise
            </a>
            <a href={PHONE_TEL} onClick={() => setMenu(false)}>
              {PHONE_DISPLAY}
            </a>
          </nav>
          <a className="btn btn-red desktop-only" href="#quote">
            Get a free quote
          </a>
          <button type="button" className="menu-btn" aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            {menu ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="lift" id="top" ref={motion.lift}>
          <div className="lift-pin">
            <img className="lift-scene" src="/art/hero.jpg" alt="Illustrated Boise street, service truck, and technician beside an open garage" />
            <div className="lift-copy">
              <p className="badge">Boise's local garage door crew</p>
              <h1>
                Garage doors.
                <br />
                Done right.
              </h1>
              <p className="dek hero-line">Garage doors, openers, repairs, and upgrades for Boise homes.</p>
              <div className="cta-row">
                <a className="btn btn-red" href="#doors">
                  Shop garage doors →
                </a>
                <a className="btn btn-ghost" href="#quote">
                  Get a free quote
                </a>
              </div>
              <p className="rating">
                <a href={GOOGLE_REVIEWS}>5.0 on Google</a>
                <span className="stars" aria-label="5 stars">
                  ★★★★★
                </span>
                <span>1,055 reviews on the published listing.</span>
              </p>
            </div>
            <div className="bay" aria-hidden="true">
              <div className="bay-frame">
                <div className="bay-opening" ref={motion.opening}>
                  <div className="lift-door" ref={motion.door} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band cream" id="troubles">
          <div className="wrap trouble">
            <div className="trouble-copy">
              <p className="kicker">Repairs</p>
              <h2>Your door acting up?</h2>
              <p className="dek">Don't worry. We've dealt with worse.</p>
              <div className="trouble-picks" role="list">
                {troubles.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="listitem"
                    className={item.id === trouble ? "pick on" : "pick"}
                    aria-pressed={item.id === trouble}
                    onClick={() => setTrouble(item.id)}
                  >
                    <span>{item.title}</span>
                    <i aria-hidden="true">→</i>
                  </button>
                ))}
              </div>
            </div>
            <article className="trouble-card">
              <img className="trouble-shot" src={active.img} alt={active.alt} />
              <p className="scribble">{active.line}</p>
              <h3>{active.title}</h3>
              <p>{active.copy}</p>
              <a className="btn btn-red" href="#quote">
                Get a free quote →
              </a>
            </article>
          </div>
        </section>

        <section className="band ink" id="doors">
          <div className="wrap">
            <p className="kicker light">The collection</p>
            <h2>Meet the doors.</h2>
            <p className="dek pale">Real installs from the shop gallery. Not catalog renders.</p>
            <div
              className="door-row"
              onMouseEnter={() => {
                doorHold.current = true;
              }}
              onMouseLeave={() => {
                doorHold.current = false;
              }}
            >
              {doors.map((door, i) => (
                <article
                  className={i === doorOn ? "door-card on" : "door-card"}
                  key={door.name}
                  onMouseEnter={() => setDoorOn(i)}
                >
                  <img src={door.img} alt={door.alt} />
                  <div>
                    <h3>{door.name}</h3>
                    <p>{door.copy}</p>
                    <a href="#look">Explore this door →</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="fine pale">
              Steel, carriage, wood, standard, and commercial.{" "}
              <a href="https://garagedoorstoreboise.com/gallery/">Shop gallery</a>
            </p>
          </div>
        </section>

        <Configurator />

        <section className="band ink" id="why">
          <div className="wrap">
            <p className="kicker light">Why this shop</p>
            <h2>Good doors. Good people. Good work.</h2>
            <p className="dek pale">The crew, the trucks, and the doors all come from this Boise shop.</p>
            <div className="why">
              <div className="why-photo">
                <img src="/media/shop/groupshot-1-copy.webp" alt="Garage Door Store Boise crew in front of a red door" />
              </div>
              <ul className="stickers">
                {(
                  [
                    ["30+ years", "Over thirty years, as the shop publishes it."],
                    ["Family owned", "Local crew. Not a call center."],
                    ["Licensed", "Fully licensed and insured."],
                    ["Same day", "Springs, off-track doors, and maintenance."],
                    ["Boise local", "Hackamore Drive and the Valley towns they name."],
                    ["10% off", "Advertised discount, plus a free estimate."],
                  ] as const
                ).map(([title, copy], i) => (
                  <li
                    key={title}
                    className={i === spot ? "on" : ""}
                    onMouseEnter={() => {
                      spotHold.current = true;
                      setSpot(i);
                    }}
                    onMouseLeave={() => {
                      spotHold.current = false;
                    }}
                  >
                    <b>{title}</b>
                    <span>{copy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="band cream" id="reviews">
          <div className="wrap">
            <div className="reviews-align">
              <p className="kicker">Reviews</p>
              <h2>Boise has spoken.</h2>
              <p className="dek">These lines are copied from the published Google listing.</p>
              <div className="gindex">
              <div className="gindex-bar">
                <div>
                  <strong>Garage Door Store Boise</strong>
                  <p>
                    <span className="gword" aria-label="Google">
                      <span>G</span>
                      <span>o</span>
                      <span>o</span>
                      <span>g</span>
                      <span>l</span>
                      <span>e</span>
                    </span>
                    <span className="gstars" aria-label="5 stars">
                      ★★★★★
                    </span>
                    <b>5.0</b>
                    <span>1,055 reviews</span>
                  </p>
                </div>
                <a className="btn btn-red" href={GOOGLE_REVIEWS}>
                  Read on Google
                </a>
              </div>
              <div className="gindex-track" ref={reviewTrack}>
                  <article className="gcard gcard-lead">
                    <p className="kicker light">Published listing</p>
                    <h3>5.0 on Google.</h3>
                    <p>1,055 reviews. The quotes here are copied from that listing, not rewritten.</p>
                  </article>
                  {reviews.map((review) => (
                    <article className="gcard" key={review.name}>
                      <header>
                        <span className="gavatar" aria-hidden="true">
                          {review.name
                            .split(" ")
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                        </span>
                        <span>
                          <strong>{review.name}</strong>
                          <small>{review.place}</small>
                        </span>
                        <span className="gmark" aria-hidden="true">
                          G
                        </span>
                      </header>
                      <p className="gstars" aria-label="5 stars">
                        ★★★★★
                      </p>
                      <p>“{review.quote}”</p>
                    </article>
                  ))}
              </div>
              </div>
              <button type="button" className="gindex-prev" aria-label="Previous reviews" onClick={() => nudgeReviews(reviewTrack.current, -1)}>
                ←
              </button>
              <button type="button" className="gindex-next" aria-label="Next reviews" onClick={() => nudgeReviews(reviewTrack.current, 1)}>
                →
              </button>
            </div>
          </div>
        </section>

        <section className="band ink visit" aria-label="Call, arrive, fix, done">
          <div className="wrap">
            <p className="kicker light">The visit</p>
            <h2>Call. Arrive. Fix. Done.</h2>
            <ol className="visit-steps">
              {(
                [
                  ["01", "Call", "Same day when the schedule allows."],
                  ["02", "Arrive", "A Boise truck. Not a call center."],
                  ["03", "Fix", "Springs, openers, tracks, or a new door."],
                  ["04", "Done", "The door moves. The price is in writing."],
                ] as const
              ).map(([num, title, copy], i) => (
                <li
                  key={num}
                  className={i === visitOn ? "on" : ""}
                  onMouseEnter={() => {
                    visitHold.current = true;
                    setVisitOn(i);
                  }}
                  onMouseLeave={() => {
                    visitHold.current = false;
                  }}
                >
                  <b>{num}</b>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </li>
              ))}
            </ol>
            <div className="visit-show">
              {visitSlides.map((shot, i) => (
                <img key={shot.src} src={shot.src} alt={shot.alt} className={i === visitOn ? "on" : ""} />
              ))}
            </div>
          </div>
        </section>

        <section className="band cream" id="boise">
          <div className="wrap split service">
            <div className="service-copy">
              <div>
                <p className="kicker">Service areas</p>
                <h2>Boise is our backyard.</h2>
                <p className="dek">Neighborhoods here, and the Valley towns on the shop site.</p>
                <p className="address">{ADDRESS}</p>
              </div>
              <div className="city-row">
                {cities.map((city) => {
                  const query = city.name === "Boise" ? "9075 W Hackamore Dr, Boise, ID 83709" : `${city.name}, Idaho`;
                  return (
                    <button
                      key={city.name}
                      type="button"
                      className={area === query ? "on" : ""}
                      onClick={() => setArea(query)}
                    >
                      {city.name}
                    </button>
                  );
                })}
              </div>
              <div>
                <div className="cta-row">
                  <a className="btn btn-red" href={MAPS_URL}>
                    Get directions →
                  </a>
                  <a className="btn btn-ink" href="#quote">
                    Get a free quote →
                  </a>
                </div>
                <p className="fine">Mon–Fri 7–7 · Sat 7–noon · Sun closed. Technician line advertised 24/7.</p>
              </div>
            </div>
            <div className="map-stack">
              <div className="map-wrap">
                <iframe
                  key={area}
                  title={`Map of ${area}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(area)}&z=12&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="band ink" id="behind">
          <div className="wrap">
            <p className="kicker light">The hardware</p>
            <h2>
              We know what's behind
              <br />
              the door.
            </h2>
            <p className="dek pale">Springs, cables, tracks, rollers, and the opener are what actually move it.</p>
            <div className="mech">
              <div className="mech-shot">
                <img src="/art/mech.jpg" alt="Illustrated garage door springs, rollers, track, cables, and opener" />
              </div>
              <ol className="parts">
              {parts.map((item, i) => (
                <li key={item.id} className={i === part ? "on" : ""}>
                  <button type="button" onClick={() => setPart(i)}>
                    <b>0{i + 1}</b>
                    <span>
                      <strong>{item.title}</strong>
                      {item.copy}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            </div>
          </div>
        </section>

        <section className="band teal" id="quote">
          <div className="wrap quote-band">
            <div>
              <p className="kicker">Free quote</p>
              <h2>Ready to get that door moving?</h2>
              <p className="dek pale">Tell us the town and the trouble. The note opens in your email.</p>
              <a className="btn btn-ghost" href={PHONE_TEL}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <QuoteForm jobHint={active.title} />
          </div>
        </section>

        <section className="band cream" id="faq">
          <div className="wrap">
            <p className="kicker">Questions</p>
            <h2>Ask it straight.</h2>
            <p className="dek">Short answers from what the shop actually publishes.</p>
            <div className="faq-split">
              <ul className="faqs">
                {faqs.map((item, i) => (
                  <li key={item.q} className={i === faq ? "on" : ""}>
                    <button type="button" aria-expanded={i === faq} onClick={() => setFaq(i === faq ? -1 : i)}>
                      {item.q}
                    </button>
                    {i === faq && <p>{item.a}</p>}
                  </li>
                ))}
              </ul>
              <div className="faq-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/bSldLJXGTGU?autoplay=1&mute=1&loop=1&playlist=bSldLJXGTGU&rel=0&playsinline=1"
                  title="The Best Garage Door Repair Service in Boise"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <img className="foot-logo" src="/media/logo.png" alt="Garage Door Store Boise" />
              <p className="foot-tag">Keep your door moving.</p>
              <a className="btn btn-red" href={PHONE_TEL}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <h3>Visit</h3>
              <p>{ADDRESS}</p>
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <p className="foot-hours">Mon–Fri 7–7 · Sat 7–noon · Sun closed</p>
              <p className="foot-note">Technician line advertised 24/7</p>
            </div>
            <div>
              <h3>Work</h3>
              <a href="#troubles">Repairs</a>
              <a href="#doors">Doors</a>
              <a href="https://garagedoorstoreboise.com/garage-openers-remotes/">Openers</a>
              <a href="https://garagedoorstoreboise.com/garage-door-spring-replacement/">Springs</a>
            </div>
            <div>
              <h3>Around</h3>
              <a href={GOOGLE_REVIEWS}>Google reviews</a>
              <a href={MAPS_URL}>Google Maps</a>
              <a href={INSTAGRAM}>Instagram</a>
              <a href={FACEBOOK}>Facebook</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
          <p className="legal">
            <span>© {new Date().getFullYear()} Garage Door Store Boise</span>
            <span>Photos of installs belong to the shop. Illustrations on this page are original.</span>
          </p>
        </div>
      </footer>
      <div className="mobile-bar">
        <a href={PHONE_TEL}>Call now</a>
        <a href="#quote">Free quote</a>
      </div>
      <AskWidget />
    </div>
  );
}

function Configurator() {
  const [style, setStyle] = useState<"steel" | "carriage" | "wood" | "standard">("carriage");
  const [color, setColor] = useState("#F5EBDD");
  const [windows, setWindows] = useState<"none" | "row" | "arch">("row");
  const [hardware, setHardware] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [shift, setShift] = useState(52);

  return (
    <section className="band paper" id="look">
      <div className="wrap">
        <p className="kicker">On your house</p>
        <h2>
          What would your house
          <br />
          look like?
        </h2>
        <p className="dek">Let's find out. Preview colors are for play. The shop confirms the real finish.</p>
        <div className="config">
          <div className={`stage ${photo ? "has-photo" : ""}`} style={photo ? { backgroundImage: `url(${photo})` } : undefined}>
            {!photo && (
              <>
                <div className="house-sky" />
                <div className="roof" />
                <div className="facade" />
              </>
            )}
            <div className="door-slot" style={{ top: `${shift}%` }}>
              <div
                className={`fake-door style-${style} win-${windows} ${hardware ? "straps" : ""}`}
                style={{ background: color, color: color === "#171717" ? "#F5EBDD" : "#171717" }}
              >
                {Array.from({ length: style === "wood" ? 6 : 8 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            </div>
          </div>
          <form className="dials" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend>Door style</legend>
              {(["steel", "carriage", "wood", "standard"] as const).map((id) => (
                <button key={id} type="button" className={style === id ? "on" : ""} onClick={() => setStyle(id)}>
                  {id}
                </button>
              ))}
            </fieldset>
            <fieldset>
              <legend>Color</legend>
              <div className="swatches">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    className={color === c.hex ? "on" : ""}
                    style={{ background: c.hex }}
                    aria-label={c.name}
                    onClick={() => setColor(c.hex)}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Windows</legend>
              {(
                [
                  ["none", "None"],
                  ["row", "Top row"],
                  ["arch", "Arched"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" className={windows === id ? "on" : ""} onClick={() => setWindows(id)}>
                  {label}
                </button>
              ))}
            </fieldset>
            <fieldset>
              <legend>Hardware</legend>
              <button type="button" className={hardware ? "on" : ""} onClick={() => setHardware((v) => !v)}>
                {hardware ? "Straps on" : "Straps off"}
              </button>
            </fieldset>
            <label className="upload">
              Use a photo of your house
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (photo) URL.revokeObjectURL(photo);
                  setPhoto(URL.createObjectURL(file));
                }}
              />
            </label>
            <label className="shift">
              Nudge the door
              <input type="range" min={30} max={62} value={shift} onChange={(e) => setShift(Number(e.target.value))} />
            </label>
            <a className="btn btn-red" href="#quote">
              Design your door →
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

function QuoteForm({ jobHint }: { jobHint: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const place = String(data.get("city") ?? "");
    const job = String(data.get("job") ?? "");
    const email = String(data.get("email") ?? "").trim();
    const street = String(data.get("street") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    if (name.length < 2) {
      setError("Add your name.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Add a phone number.");
      return;
    }
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCity: ${place}\nAddress: ${street}\nJob: ${job}\nNote: ${note}\n\nRequesting the advertised 10% off and a free estimate.`;
    setError("");
    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Free quote — Garage Door Store Boise")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="quote" onSubmit={onSubmit}>
      <div className="quote-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          City
          <select name="city" defaultValue="Boise">
            {cities.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="wide">
          Street address
          <input name="street" autoComplete="street-address" />
        </label>
        <label>
          What's going on
          <select name="job" defaultValue={jobHint} key={jobHint}>
            {troubles.map((t) => (
              <option key={t.id}>{t.title}</option>
            ))}
            <option>New door</option>
          </select>
        </label>
        <label>
          Anything else
          <input name="note" />
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      {sent && <p className="scribble">Opening your email app with the note.</p>}
      <button className="btn btn-red" type="submit">
        Get my free quote →
      </button>
    </form>
  );
}
