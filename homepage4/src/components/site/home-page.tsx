import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type TransitionEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Mail,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Phone,
  Plus,
  ShieldCheck,
  Star,
  UserRound,
  X,
} from "lucide-react";
import {
  ADDRESS,
  brands,
  cities,
  coupons,
  doors,
  EMAIL,
  faqs,
  MAP_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  reviews,
  serviceOptions,
  slides,
  symptoms,
  zips,
} from "@/data/site";

type FormState = {
  name: string;
  phone: string;
  city: string;
  service: string;
  notes: string;
  discount: boolean;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  city: "Boise",
  service: "Repair",
  notes: "",
  discount: true,
};

const trust = [
  { title: "A closer look.", text: "On-site door assessment" },
  { title: "Local people.", text: "Family owned and operated" },
  { title: "A clear plan.", text: "Set price confirmed before work starts" },
  { title: "Your say. Always.", text: "You approve the price before any work starts" },
];

function lookupPlace(raw: string): { status: "yes" | "maybe" | "empty"; city?: string; message: string } {
  const q = raw.trim();
  if (!q) return { status: "empty", message: "Enter a city or ZIP." };
  const digits = q.replace(/\D/g, "");
  if (digits.length === 5 && zips[digits]) {
    return { status: "yes", city: zips[digits], message: `Yes. We serve ${zips[digits]} (${digits}).` };
  }
  const exact = cities.find((city) => city.toLowerCase() === q.toLowerCase());
  if (exact) return { status: "yes", city: exact, message: `Yes. We serve ${exact}.` };
  if (digits.length === 5) {
    return {
      status: "maybe",
      message: "That ZIP isn’t on the published list. Call and we’ll confirm the address.",
    };
  }
  return {
    status: "maybe",
    message: "We cover Boise and the Treasure Valley. Call and we’ll check the address.",
  };
}

const asks = [
  {
    q: "My ZIP?",
    a: "We cover Boise, Meridian, Eagle, Nampa, and the rest of the Treasure Valley list.",
  },
  {
    q: "Spring price?",
    a: "Dual spring changes are $350 with tax, labor, and a 10-year warranty.",
  },
  {
    q: "How soon?",
    a: "We quote a set price on the phone and book the visit. Same-day when the schedule allows.",
  },
  {
    q: "Before you arrive?",
    a: "You get a text with a photo of who’s coming. Nothing starts until you say yes.",
  },
];

function ReviewGrid({
  items,
  half,
}: {
  items: readonly { name: string; text: string; place?: string }[];
  half?: boolean;
}) {
  return (
    <ul className={`grid items-stretch gap-4 md:grid-cols-3 ${half ? "w-1/2 shrink-0" : "w-full"}`}>
      {items.map((review) => (
        <li
          key={review.name}
          className="flex min-h-56 flex-col rounded-2xl border-2 border-red bg-cream p-5 text-fg shadow-[6px_6px_0_0_var(--color-red)]"
        >
          <p className="flex gap-1 text-red" aria-label="5 star Google review">
            {Array.from({ length: 5 }, (_, star) => (
              <Star key={star} className="size-4 fill-red" aria-hidden />
            ))}
          </p>
          <p className="mt-3 flex-1">{review.text}</p>
          <p className="mt-6 flex items-end justify-between gap-3 text-sm">
            <span className="font-semibold">
              {review.name}
              {review.place ? ` · ${review.place}` : ""}
            </span>
            <span className="text-muted">Google</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function HomePage() {
  const [menu, setMenu] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [place, setPlace] = useState("");
  const [placeResult, setPlaceResult] = useState<ReturnType<typeof lookupPlace> | null>(null);
  const [symptom, setSymptom] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [showFaqs, setShowFaqs] = useState(false);
  const [doorFilter, setDoorFilter] = useState<(typeof doors)[number]["style"] | "All">("All");
  const [doorIndex, setDoorIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mapCity, setMapCity] = useState("Boise");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<FormState | null>(null);
  const [askOpen, setAskOpen] = useState(false);
  const [askId, setAskId] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const [reviewPerPage, setReviewPerPage] = useState(3);
  const [reviewDir, setReviewDir] = useState<1 | -1>(1);
  const [reviewShift, setReviewShift] = useState<"idle" | "prep" | "run">("idle");
  const reviewHold = useRef(false);
  const reviewBusy = useRef(false);
  const crewVideo = useRef<HTMLIFrameElement>(null);

  const filtered = useMemo(
    () => (doorFilter === "All" ? [...doors] : doors.filter((door) => door.style === doorFilter)),
    [doorFilter],
  );
  const activeDoor = filtered[Math.min(doorIndex, Math.max(filtered.length - 1, 0))] ?? doors[0];
  const reviewPages = Math.max(1, Math.ceil(reviews.length / reviewPerPage));
  const reviewSlice = reviews.slice(reviewPage * reviewPerPage, reviewPage * reviewPerPage + reviewPerPage);
  const reviewNeighbor = reviews.slice(
    ((reviewPage + reviewDir + reviewPages) % reviewPages) * reviewPerPage,
    ((reviewPage + reviewDir + reviewPages) % reviewPages) * reviewPerPage + reviewPerPage,
  );
  const current = slides[slide];
  const mapSrc =
    mapCity === "Boise"
      ? MAP_SRC
      : `https://maps.google.com/maps?q=${encodeURIComponent(`${mapCity}, Idaho`)}&z=12&output=embed`;

  function goEstimate(next: Partial<FormState>) {
    setForm((currentForm) => ({ ...currentForm, ...next, discount: true }));
    setSent(null);
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
  }

  function checkPlace(event: FormEvent) {
    event.preventDefault();
    const result = lookupPlace(place);
    setPlaceResult(result);
    if (result.city) {
      setForm((currentForm) => ({ ...currentForm, city: result.city as string }));
      setMapCity(result.city);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (form.name.trim().length < 2 || form.phone.replace(/\D/g, "").length < 7) {
      setError("Add your name and a real phone number so a technician can call you back.");
      return;
    }
    const next = { ...form, name: form.name.trim(), phone: form.phone.trim(), notes: form.notes.trim() };
    localStorage.setItem("gds-estimate", JSON.stringify(next));
    setError("");
    setSent(next);
  }

  const mailto = sent
    ? `mailto:${EMAIL}?subject=${encodeURIComponent("Free estimate — Garage Door Store Boise")}&body=${encodeURIComponent(
        `Name: ${sent.name}\nPhone: ${sent.phone}\nCity: ${sent.city}\nNeed: ${sent.service}\n10% off: ${sent.discount ? "yes" : "no"}\nNotes: ${sent.notes || "—"}`,
      )}`
    : `mailto:${EMAIL}`;

  useLayoutEffect(() => {
    const nodes = document.querySelectorAll("main > section:not(:first-child), footer");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nodes.forEach((node) => {
      node.classList.add("reveal");
      if (reduce || node.getBoundingClientRect().top < window.innerHeight * 0.9) {
        node.classList.add("is-in");
      }
    });
    if (reduce) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => {
      if (!node.classList.contains("is-in")) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      setReviewPerPage(media.matches ? 1 : 3);
      setReviewPage(0);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setInterval(() => {
      if (reduce || reviewHold.current || reviewBusy.current) return;
      reviewBusy.current = true;
      setReviewDir(1);
      setReviewShift("run");
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    if (reviewShift !== "prep") return;
    const frame = window.requestAnimationFrame(() => setReviewShift("run"));
    return () => window.cancelAnimationFrame(frame);
  }, [reviewShift]);

  useEffect(() => {
    const frame = crewVideo.current;
    if (!frame) return;
    const send = (func: "playVideo" | "pauseVideo") => {
      frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
    };
    const observer = new IntersectionObserver(
      ([entry]) => send(entry.isIntersecting ? "playVideo" : "pauseVideo"),
      { threshold: 0.55 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  function moveReviews(direction: number) {
    if (reviewBusy.current) return;
    reviewBusy.current = true;
    reviewHold.current = true;
    const dir = direction < 0 ? -1 : 1;
    setReviewDir(dir);
    setReviewShift(dir === -1 ? "prep" : "run");
    window.setTimeout(() => {
      reviewHold.current = false;
    }, 8000);
  }

  function finishReviewSlide(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || reviewShift !== "run") return;
    setReviewPage((page) => (page + reviewDir + reviewPages) % reviewPages);
    setReviewShift("idle");
    reviewBusy.current = false;
  }

  return (
    <div className="bg-paper text-fg">
      <header className="sticky top-0 z-40">
        <div className="bg-red text-ink">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <a href="#top" className="shrink-0" aria-label="Garage Door Store Boise, home">
              <img src="/media/logo.png" alt="" className="h-12 w-auto lg:h-14" />
            </a>
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <nav className="flex items-center gap-2" aria-label="Primary">
                <a href="#help" className="nav-pill shine">
                  Repair Services
                </a>
                <a href="#doors" className="nav-pill shine">
                  Garage Doors
                </a>
                <a href="#family" className="nav-pill shine">
                  Why Boise
                </a>
                <button
                  type="button"
                  className="nav-pill shine inline-flex items-center gap-1"
                  aria-expanded={areaOpen}
                  onClick={() => setAreaOpen((open) => !open)}
                >
                  Service Area <ChevronDown className="size-4" aria-hidden />
                </button>
              </nav>
              <a href={PHONE_TEL} className="nav-cta shine press inline-flex items-center gap-2">
                <Phone className="size-4 text-red" aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <a href="#estimate" className="nav-cta shine press">
                Book Online
              </a>
            </div>
            <button
              type="button"
              className="press ml-auto inline-flex size-11 items-center justify-center rounded-full border-2 border-ink lg:hidden"
              aria-expanded={menu}
              onClick={() => setMenu((open) => !open)}
            >
              {menu ? <X aria-hidden /> : <Menu aria-hidden />}
              <span className="sr-only">{menu ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
        {areaOpen && (
          <div className="border-t border-line-dark bg-ink text-cream">
            <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
              {cities.map((city) => (
                <li key={city}>
                  <a
                    href="#areas"
                    className="block rounded-lg px-3 py-2 hover:bg-panel"
                    onClick={() => {
                      setMapCity(city);
                      setAreaOpen(false);
                      setForm((currentForm) => ({ ...currentForm, city }));
                    }}
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {menu && (
          <nav className="space-y-2 border-t border-red-deep bg-red px-4 py-3 text-ink lg:hidden" aria-label="Mobile">
            {[
              ["Repair Services", "#help"],
              ["Garage Doors", "#doors"],
              ["Why Boise", "#family"],
              ["Service Area", "#areas"],
              ["Reviews", "#reviews"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="block rounded-full border-2 border-ink px-4 py-2.5 font-semibold"
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a href={PHONE_TEL} className="mt-2 block rounded-full bg-ink px-4 py-2.5 text-center font-semibold text-cream">
              {PHONE_DISPLAY}
            </a>
          </nav>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 bg-ink px-4 py-2.5 text-sm font-semibold text-cream">
          <button
            type="button"
            className="inline-flex items-center gap-1"
            aria-expanded={areaOpen}
            onClick={() => setAreaOpen((open) => !open)}
          >
            Choose Your Service Area
            <ChevronDown className={`size-4 transition ${areaOpen ? "rotate-180" : ""}`} aria-hidden />
          </button>
          <p className="font-medium text-cream/80">Serving Boise, Meridian, Eagle, Nampa & the Treasure Valley</p>
        </div>
      </header>

      <main id="top">
        <section className="mill-grid-dark bg-ink text-cream">
          <div className="mill-stripe is-bar" aria-hidden />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
            <div className="accent-bar">
              <p
                className="burst shine inline-flex max-w-full rounded-full bg-red px-4 py-2 text-center text-xs font-bold tracking-wide text-cream uppercase sm:text-sm"
                style={{ animationDelay: "40ms" }}
              >
                Same-day service call with repair
              </p>
              <p
                className="burst mt-6 flex flex-wrap items-center gap-3 text-xs font-extrabold tracking-[0.12em] text-red uppercase sm:text-sm sm:tracking-[0.18em]"
                style={{ animationDelay: "110ms" }}
              >
                <span className="h-0.5 w-8 bg-red" aria-hidden />
                Local garage door repair & installation
              </p>
              <h1 className="display mt-4 text-4xl leading-[0.88] text-cream uppercase sm:text-6xl lg:text-[5.2rem]">
                <span className="burst block" style={{ animationDelay: "160ms" }}>
                  Garage door
                </span>
                <span className="burst block" style={{ animationDelay: "230ms" }}>
                  trouble?
                </span>
                <span className="burst block text-red" style={{ animationDelay: "310ms" }}>
                  Call the store.
                </span>
              </h1>
              <p className="burst mt-5 max-w-lg text-lg leading-8 text-cream/80" style={{ animationDelay: "400ms" }}>
                Family-owned garage door repair across Boise and the Treasure Valley. Real local
                techs your neighbors know by name, and a set price you approve before any work starts.
              </p>
              <div className="burst mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: "480ms" }}>
                <a
                  href="#estimate"
                  className="press shine inline-flex items-center justify-center gap-3 rounded-full bg-red py-2 pr-2 pl-5 font-semibold text-cream hover:bg-red-deep"
                >
                  Request a Free Estimate Visit
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-cream/50">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </a>
                <a
                  href={PHONE_TEL}
                  className="press shine inline-flex items-center justify-center rounded-full border-2 border-red px-6 py-3 text-center font-semibold"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
              <a
                href="#reviews"
                className="burst mt-5 inline-block text-sm font-semibold text-cream/80 underline decoration-red underline-offset-4"
                style={{ animationDelay: "560ms" }}
              >
                Read our customer reviews
              </a>
            </div>
            <figure
              className="burst overflow-hidden rounded-[1.7rem] border-2 border-red bg-ink shadow-[10px_10px_0_0_var(--color-red)]"
              style={{ animationDelay: "220ms" }}
            >
              <img
                src="/media/team.webp"
                alt="The Garage Door Store Boise crew lined up with red service trucks"
                className="aspect-[16/11] w-full object-cover"
              />
              <div className="flex items-end justify-between gap-4 border-t-2 border-red px-5 py-4">
                <span>
                  <span className="block text-xs font-extrabold tracking-[0.16em] text-red uppercase">The crew</span>
                  <span className="mt-1 block font-extrabold tracking-wide uppercase">Real people. Local service.</span>
                  <a href="#family" className="mt-1 inline-block text-sm text-cream/75 underline decoration-red underline-offset-4">
                    Meet the crew behind the trucks
                  </a>
                </span>
                <img src="/media/badge-30.webp" alt="30 years experience" className="h-16 w-16" />
              </div>
            </figure>
          </div>
        </section>

        <section className="border-b border-line bg-cream">
          <ul className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="peri mt-0.5">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="text-sm text-muted">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-ink text-cream">
          <form onSubmit={checkPlace} className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="sm:min-w-52">
              <p className="font-display text-xl font-extrabold text-red">Do we serve your ZIP?</p>
              <p className="text-sm text-cream/70">City or ZIP. We’ll match the Treasure Valley list.</p>
            </div>
            <label className="sr-only" htmlFor="place">
              City or ZIP
            </label>
            <input
              id="place"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="Boise or 83709"
              className="zip-field w-full rounded-full bg-cream px-5 py-3 text-fg outline-none sm:min-w-52 sm:flex-1"
            />
            <button type="submit" className="press shine zip-go w-full rounded-full bg-red px-6 py-3 font-semibold text-cream sm:w-auto">
              Check my ZIP
            </button>
            {placeResult && (
              <p className="w-full text-sm" role="status">
                {placeResult.message}{" "}
                {placeResult.status === "yes" && (
                  <button type="button" className="underline" onClick={() => goEstimate({ city: placeResult.city })}>
                    Request the visit
                  </button>
                )}
              </p>
            )}
          </form>
        </section>

        <section className="bg-paper">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-red">Start with the symptom</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">What is your door doing?</h2>
              <p className="mt-3 max-w-sm text-muted">
                Choose what you notice. We’ll set the estimate to the right job, and a technician
                confirms the cause in person.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-8">
              {symptoms.map((item) => {
                const active = symptom === item.label;
                return (
                  <button
                    key={item.n}
                    type="button"
                    aria-pressed={active}
                    className={`play-card press flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left ${
                      active ? "is-on" : ""
                    }`}
                    onClick={() => {
                      setSymptom(item.label);
                      goEstimate({ service: item.service, notes: item.label });
                    }}
                  >
                    <span>
                      <span className="mr-2 text-sm font-extrabold text-red">{item.n}</span>
                      <span className="font-semibold">{item.label}</span>
                    </span>
                    <span className="peri">
                      <Plus className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="play-bay relative overflow-hidden border-y border-line py-14">
          <div className="play-dot" aria-hidden />
          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red">
                  What to expect when you call
                </p>
                <h2 className="display mt-3 text-4xl leading-[1.02] md:text-5xl">Here is how it goes.</h2>
                <p className="mt-4 max-w-md text-base leading-7 text-muted">
                  We quote a set price on the phone. Your tech texts before they arrive. Nothing
                  starts until you say yes.
                </p>
              </div>
              <div className="offset-card flex flex-wrap items-center gap-3 justify-self-start rounded-full bg-cream px-4 py-3 lg:justify-self-end">
                <a href={PHONE_TEL} className="nav-cta shine press inline-flex items-center gap-2">
                  <Phone className="size-4 text-red" aria-hidden />
                  {PHONE_DISPLAY}
                </a>
                <button type="button" className="nav-cta shine press" onClick={() => goEstimate({})}>
                  Book now
                </button>
              </div>
            </div>
            <div className="mt-8 grid items-center gap-5 md:grid-cols-2">
              <article className="offset-card rounded-3xl bg-cream p-6">
                <div className="flex items-center gap-3">
                  <span className="peri">
                    <Phone className="size-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold tracking-wide text-red">01</p>
                    <p className="font-display text-xl font-extrabold leading-tight">Tell us what happened</p>
                  </div>
                </div>
                <p className="mt-3 text-muted">
                  Call {PHONE_DISPLAY} or send the estimate. We quote a set price on the phone — no
                  add-ons — and book the visit.
                </p>
              </article>
              <img
                className="step-crew"
                src="/media/step-crew-cartoon.png"
                alt="Garage Door Store technicians, one holding a spring"
              />
            </div>
            <div className="elbow" aria-hidden>
              <svg viewBox="0 0 800 64" className="hidden h-16 w-full md:block">
                <path d="M210 4 V28 H590 V60" markerEnd="url(#elbow-a)" />
                <defs>
                  <marker id="elbow-a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" />
                  </marker>
                </defs>
              </svg>
              <svg viewBox="0 0 24 40" className="mx-auto h-10 w-6 md:hidden">
                <path d="M12 2 V36" markerEnd="url(#elbow-a-sm)" />
                <defs>
                  <marker id="elbow-a-sm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="grid items-center gap-5 md:grid-cols-2">
              <img
                className="step-visual md:order-1"
                src="/media/team.webp"
                alt="Garage Door Store Boise crew with their red service trucks"
              />
              <article className="offset-card rounded-3xl bg-cream p-6 md:order-2">
                <div className="flex items-center gap-3">
                  <span className="peri">
                    <UserRound className="size-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold tracking-wide text-red">02</p>
                    <p className="font-display text-xl font-extrabold leading-tight">Meet your tech</p>
                  </div>
                </div>
                <p className="mt-3 text-muted">
                  You get a text when the technician is on the way, with a photo of who’s coming.
                  They assess the door, explain the options, and wait for your yes.
                </p>
              </article>
            </div>
            <div className="elbow is-back" aria-hidden>
              <svg viewBox="0 0 800 64" className="hidden h-16 w-full md:block">
                <path d="M590 4 V28 H210 V60" markerEnd="url(#elbow-b)" />
                <defs>
                  <marker id="elbow-b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" />
                  </marker>
                </defs>
              </svg>
              <svg viewBox="0 0 24 40" className="mx-auto h-10 w-6 md:hidden">
                <path d="M12 2 V36" markerEnd="url(#elbow-b-sm)" />
                <defs>
                  <marker id="elbow-b-sm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0 0 L8 4 L0 8 Z" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="grid items-center gap-5 md:grid-cols-2">
              <article className="offset-card rounded-3xl bg-cream p-6">
                <div className="flex items-center gap-3">
                  <span className="peri">
                    <CircleCheck className="size-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold tracking-wide text-red">03</p>
                    <p className="font-display text-xl font-extrabold leading-tight">Check it together</p>
                  </div>
                </div>
                <p className="mt-3 text-muted">
                  We fix it, test the safety eyes, run the door, and walk you through the result.
                  Dual spring changes include a 10-year warranty.
                </p>
              </article>
              <div className="roll-scene" aria-hidden>
                <div className="roll-frame">
                  <div className="roll-panes">
                    {Array.from({ length: 12 }, (_, index) => (
                      <span key={index} />
                    ))}
                  </div>
                </div>
                <div className="roll-stripe" />
                <div className="roll-rig">
                  <div className="roll-smoke" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                  <img className="roll-truck" src="/media/truck.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="help" className="bg-ink py-16 text-cream">
          <div className="mx-auto max-w-7xl px-4">
            <p className="eyebrow text-red">Services we offer</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">The right help for your door.</h2>
            <p className="mt-3 max-w-xl text-cream/70">
              Repair, a new door, an opener, or a same-day fix. Pick the job. We quote it before any work starts.
            </p>
            <div className="help-panel mt-8 overflow-hidden rounded-[1.75rem] border-[3px] border-red bg-ink">
              <div className="grid items-stretch lg:grid-cols-[16.5rem_minmax(0,1.2fr)_minmax(0,1fr)]">
                <div className="flex gap-3 overflow-x-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:justify-center lg:p-5">
                  {slides.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      className={`help-tab press shrink-0 lg:shrink ${index === slide ? "is-on" : ""}`}
                      onClick={() => setSlide(index)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
                <img
                  key={current.image}
                  src={current.image}
                  alt={current.alt}
                  className="help-photo help-fade"
                />
                <div key={current.title} className="help-fade flex flex-col justify-center px-7 py-8 lg:px-8 lg:py-10">
                  <p className="text-sm tracking-wide text-cream/55">
                    {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-3 text-4xl leading-[1.02]">{current.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-cream/80">{current.text}</p>
                  <button
                    type="button"
                    className="press shine mt-6 inline-flex w-fit rounded-full bg-red px-5 py-3 text-sm font-bold"
                    onClick={() => goEstimate({ service: current.service })}
                  >
                    Explore {current.label}
                  </button>
                  <a
                    href={PHONE_TEL}
                    className="press shine mt-3 inline-flex w-fit rounded-full border border-cream/50 px-5 py-2.5 text-sm font-semibold"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 bg-red py-3.5 text-sm font-bold text-ink">
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-cream"
                  aria-label="Previous service"
                  onClick={() => setSlide((n) => (n - 1 + slides.length) % slides.length)}
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                {slide + 1} of {slides.length}
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-cream"
                  aria-label="Next service"
                  onClick={() => setSlide((n) => (n + 1) % slides.length)}
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="family" className="bg-paper py-16 text-fg">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
            <div>
              <p className="eyebrow text-red">Meet the crew</p>
              <h2 className="display mt-3 text-5xl">A family company.</h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-muted">
                Family owned in Boise, with more than 30 years on Treasure Valley doors. People
                still ask for Corbin, Kevin, and Jay by name.
              </p>
              <a href="#reviews" className="press shine mt-6 inline-flex rounded-full bg-ink px-5 py-3 font-semibold text-cream">
                Read the reviews
              </a>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                <li className="rounded-2xl bg-cream p-3">
                  <UserRound className="size-5 text-red" aria-hidden />
                  <p className="mt-2 font-semibold">On site</p>
                  <p className="text-sm text-muted">The tech looks at the door with you.</p>
                </li>
                <li className="rounded-2xl bg-cream p-3">
                  <CircleCheck className="size-5 text-red" aria-hidden />
                  <p className="mt-2 font-semibold">Your options</p>
                  <p className="text-sm text-muted">Explained before you decide.</p>
                </li>
                <li className="rounded-2xl bg-cream p-3">
                  <ShieldCheck className="size-5 text-red" aria-hidden />
                  <p className="mt-2 font-semibold">Set price</p>
                  <p className="text-sm text-muted">Approved before any work starts.</p>
                </li>
              </ul>
            </div>
            <figure className="offset-card overflow-hidden rounded-3xl bg-cream">
              <div className="aspect-video bg-ink">
                <iframe
                  ref={crewVideo}
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/bSldLJXGTGU?enablejsapi=1&mute=1&playsinline=1&rel=0"
                  title="Garage Door Store Boise"
                  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={() => {
                    crewVideo.current?.contentWindow?.postMessage(
                      JSON.stringify({ event: "listening", id: "crew" }),
                      "*",
                    );
                  }}
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-muted">
                <span>Licensed, bonded, and insured. Shop at {ADDRESS}.</span>
                <img src="/media/badge-2026.png" alt="Best of 2026, Garage Door Store Boise" className="h-14 w-auto" />
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="reviews" className="bg-ink py-16 text-cream">
          <div className="mx-auto max-w-7xl px-4">
            <p className="eyebrow text-red">Verified customer stories</p>
            <h2 className="display mt-3 text-4xl uppercase md:text-5xl">The reviews name names.</h2>
            <p className="mt-2 text-cream/70">Google reviews from real Garage Door Store customers.</p>
            <div
              className="mt-8 overflow-hidden"
              onMouseEnter={() => {
                reviewHold.current = true;
              }}
              onMouseLeave={() => {
                reviewHold.current = false;
              }}
            >
              <div
                className={reviewShift === "idle" ? "w-full" : "flex w-[200%]"}
                style={{
                  transform:
                    reviewShift === "idle"
                      ? undefined
                      : reviewDir === 1
                        ? reviewShift === "run"
                          ? "translateX(-50%)"
                          : "translateX(0)"
                        : reviewShift === "prep"
                          ? "translateX(-50%)"
                          : "translateX(0)",
                  transition: reviewShift === "run" ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                }}
                onTransitionEnd={finishReviewSlide}
              >
                {reviewShift !== "idle" && reviewDir === -1 ? <ReviewGrid items={reviewNeighbor} half /> : null}
                <ReviewGrid items={reviewSlice} half={reviewShift !== "idle"} />
                {reviewShift !== "idle" && reviewDir === 1 ? <ReviewGrid items={reviewNeighbor} half /> : null}
              </div>
            </div>
            <div className="relative mt-6 flex items-center justify-center">
              <button
                type="button"
                className="absolute left-0 inline-flex size-11 items-center justify-center rounded-full bg-red text-cream"
                aria-label="Previous reviews"
                onClick={() => moveReviews(-1)}
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <p className="font-bold">
                {reviewPage + 1} of {reviewPages}
              </p>
              <button
                type="button"
                className="absolute right-0 inline-flex size-11 items-center justify-center rounded-full bg-red text-cream"
                aria-label="Next reviews"
                onClick={() => moveReviews(1)}
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
            <a
              href="https://share.google/AHL6mYpQ2qQBcf3Tw"
              className="mt-3 inline-block text-sm font-semibold text-red underline decoration-red underline-offset-4"
            >
              Read all reviews
            </a>
          </div>
        </section>

        <section className="mill-grid bg-paper py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-6 rounded-3xl bg-red p-6 text-cream shadow-[8px_8px_0_0_var(--color-ink)] md:grid-cols-2 md:p-8">
            <div>
              <p className="eyebrow text-cream">Free estimate & 10% off</p>
              <h3 className="display mt-2 text-4xl">A new door. A number first.</h3>
            </div>
            <div>
              <p className="text-cream/90">
                Carriage, wood, steel, standard, and commercial doors from Wayne Dalton, Clopay,
                Genie, and LiftMaster. The in-home consultation is free, and the 10% offer is
                marked on the request.
              </p>
              <button
                type="button"
                className="press shine mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-cream"
                onClick={() => goEstimate({ service: "New door" })}
              >
                Request the estimate <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          <div id="doors" className="mx-auto mt-12 max-w-7xl px-4">
            <div className="mill-stripe mb-5 w-40" aria-hidden />
            <div className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red">Portfolio · The valley</p>
                <h3 className="display mt-2 text-4xl uppercase md:text-5xl">Doors on real houses.</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["All", "Carriage", "Modern", "Wood", "Steel"] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    className={`press rounded-full border-2 px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${
                      doorFilter === style ? "border-red bg-red text-cream" : "border-ink bg-cream"
                    }`}
                    onClick={() => {
                      setDoorFilter(style);
                      setDoorIndex(0);
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid overflow-hidden rounded-3xl border-2 border-ink bg-ink shadow-[8px_8px_0_0_var(--color-red)] lg:grid-cols-[1.35fr_0.75fr]">
              <button type="button" className="relative block" onClick={() => setLightbox(doorIndex)}>
                <img
                  key={activeDoor.src}
                  src={activeDoor.src}
                  alt={activeDoor.alt}
                  className="help-fade aspect-[4/3] w-full object-cover object-[center_62%] lg:aspect-auto lg:h-full lg:min-h-[18rem] lg:max-h-[24rem]"
                />
              </button>
              <div className="flex flex-col justify-between p-6 text-cream">
                <div>
                  <p className="font-display text-6xl font-extrabold leading-none text-red">
                    {String(doorIndex + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-red">{activeDoor.style}</p>
                  <h4 className="display mt-2 text-3xl uppercase leading-none">{activeDoor.title}</h4>
                  <p className="mt-3 text-sm uppercase tracking-wide text-cream/70">{activeDoor.place}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t-2 border-cream/25 pt-4">
                  <span className="text-sm font-extrabold tracking-wide">
                    {String(doorIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-full border-2 border-cream bg-cream text-ink"
                      aria-label="Previous door"
                      onClick={() => setDoorIndex((index) => (index - 1 + filtered.length) % filtered.length)}
                    >
                      <ChevronLeft className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-full border-2 border-red bg-red text-cream"
                      aria-label="Next door"
                      onClick={() => setDoorIndex((index) => (index + 1) % filtered.length)}
                    >
                      <ChevronRight className="size-4" aria-hidden />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {filtered.map((door, index) => (
                <li key={door.src}>
                  <button
                    type="button"
                    className={`block aspect-square w-full overflow-hidden rounded-2xl border-2 ${
                      activeDoor.src === door.src ? "border-red shadow-[4px_4px_0_0_var(--color-red)]" : "border-ink"
                    }`}
                    onClick={() => setDoorIndex(index)}
                    aria-label={door.title}
                  >
                    <img src={door.src} alt="" className="h-full w-full object-cover object-[center_62%]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-6 flex w-[min(80rem,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-ink bg-red px-5 py-3 text-cream shadow-[8px_8px_0_0_var(--color-ink)] sm:rounded-full">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em]">Brands installed by the store</p>
            <ul className="flex flex-wrap items-center gap-2">
              {brands.map((brand) => (
                <li key={brand.alt} className="rounded-full border-2 border-ink bg-cream px-3 py-1">
                  <img src={brand.src} alt={brand.alt} className="h-7 w-auto" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mill-grid-red bg-red py-16 text-ink">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mill-stripe-light mb-6 w-48" aria-hidden />
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-ink">Here for the next chapter, too</p>
                <h2 className="display mt-3 text-5xl text-cream">
                  Keep your door.
                  <span className="block">Keep your day moving.</span>
                </h2>
              </div>
              <p className="max-w-sm text-cream/90">
                A repair gets you moving today. The tune-up keeps the moving parts and safety features in check.
              </p>
            </div>
            <div className="mt-8 grid gap-5 text-left md:grid-cols-2">
              <article className="rounded-3xl border-2 border-ink bg-ink p-6 text-cream shadow-[8px_8px_0_0_var(--color-ink)]">
                <p className="font-display text-5xl font-extrabold leading-none text-red">01</p>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-red">A plan for the long run</p>
                <h3 className="display mt-2 text-3xl">Set pricing. 10-year springs.</h3>
                <p className="mt-3 text-cream/75">
                  Dual spring changes are $350 with tax, labor, and a 10-year warranty. Torque tubes
                  are $450. No surprise add-ons after the truck arrives.
                </p>
                <button
                  type="button"
                  className="press shine mt-5 rounded-full bg-cream px-5 py-3 font-semibold text-ink"
                  onClick={() => goEstimate({ service: "Spring replacement" })}
                >
                  Price a spring change
                </button>
              </article>
              <article className="rounded-3xl border-2 border-ink bg-cream p-6 shadow-[8px_8px_0_0_var(--color-ink)]">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-5xl font-extrabold leading-none text-red">02</p>
                  <p className="display text-5xl text-red">{coupons[0].price}</p>
                </div>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-red">Current tune-up offer</p>
                <h3 className="display mt-2 text-3xl">A little attention. A better-running door.</h3>
                <p className="mt-3 text-muted">{coupons[0].detail} The posted full tune-up.</p>
                <button
                  type="button"
                  className="press shine mt-5 rounded-full border-2 border-ink px-5 py-3 font-semibold"
                  onClick={() => goEstimate({ service: "Tune-up" })}
                >
                  Claim the $125 tune-up
                </button>
              </article>
            </div>
            <div className="mt-5 flex flex-col gap-4 rounded-3xl border-2 border-ink bg-cream p-5 text-left shadow-[8px_8px_0_0_var(--color-ink)] md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red">Already a Garage Door Store customer?</p>
                <h3 className="display mt-2 text-3xl">A question after your visit?</h3>
                <p className="mt-2 text-muted">
                  Call or write {EMAIL}. Have the service address handy so we can find the right job.
                </p>
              </div>
              <div className="flex gap-3 md:shrink-0">
                <a href={PHONE_TEL} className="press shine rounded-full bg-ink px-5 py-3 font-semibold text-cream">
                  Call the team
                </a>
                <a href={`mailto:${EMAIL}`} className="press shine rounded-full bg-red px-5 py-3 font-semibold text-cream">
                  Contact the store
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="estimate" className="mill-grid mx-auto grid max-w-7xl items-stretch gap-10 px-4 py-16 md:grid-cols-2">
          <div className="accent-bar">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red">Free in-home consultation</p>
            <h2 className="display mt-3 text-5xl">10% off, and a real callback.</h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              This page keeps the request on your device and can email {EMAIL}. Or call {PHONE_DISPLAY}. A technician answers 24/7.
            </p>
            <ul className="mt-6 space-y-3">
              {coupons.map((coupon) => (
                <li key={coupon.id}>
                  <button
                    type="button"
                    className="w-full rounded-2xl border-2 border-ink bg-cream p-4 text-left shadow-[5px_5px_0_0_var(--color-red)]"
                    onClick={() => goEstimate({ service: coupon.service })}
                  >
                    <span className="display text-2xl text-red">{coupon.price}</span>
                    <span className="mt-1 block font-extrabold">{coupon.title}</span>
                    <span className="mt-1 block text-sm text-muted">{coupon.detail}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {sent ? (
            <div className="flex h-full flex-col rounded-3xl bg-ink p-6 text-cream" role="status">
              <p className="eyebrow text-red">Request ready</p>
              <h3 className="display mt-2 text-4xl">We’ll take it from here, {sent.name.split(" ")[0]}.</h3>
              <p className="mt-3 text-cream/80">
                {sent.service} in {sent.city}. {sent.discount ? "10% off is marked on the note." : ""}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PHONE_TEL} className="press shine rounded-full bg-red px-5 py-3 font-semibold">
                  Call {PHONE_DISPLAY}
                </a>
                <a href={mailto} className="press shine rounded-full border border-cream/40 px-5 py-3 font-semibold">
                  Email the shop
                </a>
                <button type="button" className="px-3 py-3 text-cream/70" onClick={() => setSent(null)}>
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex h-full flex-col gap-3 rounded-3xl border-2 border-ink bg-cream p-5 shadow-[8px_8px_0_0_var(--color-red)]" noValidate>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  Name
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-red"
                    autoComplete="name"
                  />
                </label>
                <label className="text-sm">
                  Phone
                  <input
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-red"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  City
                  <select
                    value={form.city}
                    onChange={(event) => setForm({ ...form, city: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3"
                  >
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm">
                  What do you need?
                  <select
                    value={form.service}
                    onChange={(event) => setForm({ ...form, service: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="flex min-h-0 flex-1 flex-col text-sm">
                What’s going on with the door?
                <textarea
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                  className="mt-1 min-h-28 w-full flex-1 resize-none rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-red"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.discount}
                  onChange={(event) => setForm({ ...form, discount: event.target.checked })}
                  className="size-4 accent-red"
                />
                Claim 10% off with the free estimate
              </label>
              {error && (
                <p className="text-sm text-red" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="press shine rounded-full bg-red px-5 py-3 font-semibold text-cream">
                Hold my estimate
              </button>
            </form>
          )}
        </section>

        <section id="areas" className="mill-grid-dark bg-ink py-16 text-cream">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
            <div className="accent-bar">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red">Before your visit</p>
              <h2 className="display mt-3 text-5xl">Quick answers.</h2>
              <div className="mt-6 space-y-3">
                {(showFaqs ? faqs : faqs.slice(0, 4)).map((faq, index) => {
                  const open = faqOpen === index;
                  return (
                    <div key={faq.q} className={`rounded-2xl border-2 px-4 ${open ? "border-red bg-ink" : "border-cream/20"}`}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                        aria-expanded={open}
                        onClick={() => setFaqOpen(open ? -1 : index)}
                      >
                        <span className="font-semibold">{faq.q}</span>
                        <ChevronDown className={`size-4 shrink-0 ${open ? "rotate-180" : ""}`} aria-hidden />
                      </button>
                      {open && <p className="pb-4 text-sm text-cream/75">{faq.a}</p>}
                    </div>
                  );
                })}
              </div>
              {!showFaqs && (
                <button
                  type="button"
                  className="press shine mt-4 rounded-full bg-red px-4 py-2 text-sm font-semibold"
                  onClick={() => setShowFaqs(true)}
                >
                  Read all FAQs
                </button>
              )}
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red">Garage Door Store Boise</p>
              <h2 className="display mt-3 text-5xl">Garage door service near you.</h2>
              <label className="mt-4 block text-xs font-extrabold uppercase tracking-[0.16em] text-cream/70">
                Choose your service area
                <select
                  value={mapCity}
                  onChange={(event) => setMapCity(event.target.value)}
                  className="mt-2 w-full rounded-full border-2 border-cream/20 bg-panel px-4 py-3 text-base font-semibold normal-case tracking-normal text-cream"
                >
                  {cities.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </label>
              <div className="mt-4 overflow-hidden rounded-3xl border-2 border-cream/20 shadow-[8px_8px_0_0_var(--color-red)]">
                <iframe
                  title={`Map of Garage Door Store service near ${mapCity}`}
                  src={mapSrc}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-4 flex items-start gap-2 text-sm text-cream/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
                Shop: {ADDRESS}
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-7xl px-4">
            <div className="overflow-hidden rounded-[2rem] border-2 border-ink bg-cream text-ink shadow-[10px_10px_0_0_var(--color-red)]">
              <div className="grid items-center gap-6 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-8">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red">The visit is free</p>
                  <h2 className="display mt-3 text-4xl leading-[0.92] md:text-6xl">
                    Let’s get your garage door back to normal.
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-muted">
                    A technician answers 24/7. You hear the price before any work starts.
                  </p>
                </div>
                <div className="rounded-3xl bg-red p-5 text-cream shadow-[6px_6px_0_0_var(--color-ink)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em]">Call the store</p>
                  <a href={PHONE_TEL} className="display mt-2 block text-3xl leading-none sm:text-4xl">
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href="#estimate"
                    className="press shine mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-cream"
                  >
                    Request a free estimate visit <ArrowRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mill-grid-dark bg-ink pb-24 text-cream md:pb-10">
        <div className="mill-stripe is-bar" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-cream/15 pb-8">
            <div className="min-w-0">
              <img src="/media/logo.png" alt="Garage Door Store Boise" className="h-20 w-auto" />
              <p className="mt-4 max-w-xl text-balance text-base text-cream/80 md:text-lg">
                Local crews, upfront pricing, and the exact cost before any work starts.
              </p>
            </div>
            <a href={PHONE_TEL} className="press shine inline-flex items-center gap-3 rounded-full bg-red px-6 py-4 text-xl font-extrabold">
              <Phone className="size-6" aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div className="accent-bar">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-red">Priority services</p>
              <ul className="mt-5 space-y-3 text-lg font-semibold">
                {slides.map((item) => (
                  <li key={item.label}>
                    <button type="button" className="hover:text-red" onClick={() => goEstimate({ service: item.service })}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="accent-bar">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-red">Service area</p>
              <ul className="mt-5 grid grid-cols-2 gap-y-3 text-lg font-semibold">
                {cities.map((city) => (
                  <li key={city}>
                    <a href="#areas" className="hover:text-red" onClick={() => setMapCity(city)}>
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="accent-bar">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-red">Help & company</p>
              <ul className="mt-5 space-y-3 text-lg font-semibold">
                <li><a href="#family" className="hover:text-red">Why Boise</a></li>
                <li><a href="#reviews" className="hover:text-red">Reviews</a></li>
                <li><a href="#doors" className="hover:text-red">Garage doors</a></li>
                <li><a href="#estimate" className="hover:text-red">Free estimate</a></li>
                <li>
                  <a href="https://www.facebook.com/garagedoorstoreboise" className="hover:text-red">Facebook</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-3xl border-2 border-cream/20 px-5 py-4 text-base sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:text-lg">
            <span className="inline-flex items-center gap-3">
              <MapPin className="size-6 shrink-0 text-red" aria-hidden />
              {ADDRESS}
            </span>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 font-semibold">
              <Mail className="size-6 text-red" aria-hidden /> {EMAIL}
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-3xl px-2 text-center text-sm leading-relaxed text-pretty text-cream/70">
            © 2026 The Garage Door Template. All Rights Reserved. Lic# XXXXXXXX. Website design by Garage Door Marketing Lab
          </p>
        </div>
      </footer>

      <div className="fixed right-4 bottom-20 z-50 flex flex-col items-end md:bottom-6">
        {askOpen && (
          <div className="mb-3 w-80 max-w-[calc(100vw-2rem)] rounded-3xl border border-line bg-cream p-4 text-fg shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)]">
            <p className="font-display text-lg font-extrabold">Ask us</p>
            <p className="mt-1 text-sm text-muted">Quick answers. A person still calls you back.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {asks.map((item, index) => (
                <button
                  key={item.q}
                  type="button"
                  className={`press rounded-full border px-3 py-1 text-left text-xs font-semibold ${
                    askId === index ? "border-red bg-red text-cream" : "border-line"
                  }`}
                  onClick={() => setAskId(index)}
                >
                  {item.q}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm">{asks[askId].a}</p>
            <a href={PHONE_TEL} className="press shine mt-4 inline-flex items-center gap-2 rounded-full bg-red px-4 py-2 text-sm font-semibold text-cream">
              <Phone className="size-4" aria-hidden /> Call {PHONE_DISPLAY}
            </a>
          </div>
        )}
        <button
          type="button"
          className="ask-fab press shine ml-auto flex size-14 items-center justify-center rounded-full bg-red text-cream"
          aria-expanded={askOpen}
          aria-label={askOpen ? "Close questions" : "Ask a question"}
          onClick={() => setAskOpen((open) => !open)}
        >
          {askOpen ? <X aria-hidden /> : <MessageCircleQuestion aria-hidden />}
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line-dark bg-ink md:hidden">
        <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 py-3 font-semibold">
          <Phone className="size-4 text-red" aria-hidden /> Call
        </a>
        <a href="#estimate" className="inline-flex items-center justify-center bg-red py-3 font-semibold">
          Estimate
        </a>
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightbox].title}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center"
            aria-label="Close photo"
            onClick={() => setLightbox(null)}
          >
            <X aria-hidden />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-h-[80svh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
