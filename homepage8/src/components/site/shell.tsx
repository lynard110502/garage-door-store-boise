import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Facebook, Instagram, MapPin, MessageCircleQuestion, Phone, X } from "lucide-react";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK,
  GOOGLE_REVIEWS,
  INSTAGRAM,
  MAPS_URL,
  ORIGIN,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: `${ORIGIN}/about-us/`, label: "About" },
  { href: "/#reviews", label: "Reviews" },
];

const answers = [
  {
    q: "How do I reach a technician?",
    a: `Call ${PHONE_DISPLAY}. The phone line to a technician is advertised 24/7. The shop is open Monday–Friday 7am–7pm and Saturday 7am–noon.`,
  },
  {
    q: "Where is the shop?",
    a: `${ADDRESS}. That pin is the Hackamore Drive shop.`,
  },
  {
    q: "Which towns do you cover?",
    a: "Boise, Meridian, Eagle, Nampa, Star, Caldwell, Middleton, Kuna, Homedale, Melba, Bowmont, and Garden City.",
  },
  {
    q: "How do I get a price?",
    a: "Ask for the free in-home consult. 10% off is advertised with that visit. No price is quoted from this panel.",
  },
];

function AskDock() {
  const [open, setOpen] = useState(false);
  const [which, setWhich] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dock = (
    <div className="ask-dock">
      {open ? (
        <div className="ask-panel" role="dialog" aria-label="Ask and answer">
          <div className="ask-head">
            <strong>Ask and answer</strong>
            <button type="button" className="ask-x" onClick={() => setOpen(false)} aria-label="Close">
              <X size={16} />
            </button>
          </div>
          <div className="ask-qs">
            {answers.map((item, i) => (
              <button
                key={item.q}
                type="button"
                aria-expanded={which === i}
                onClick={() => setWhich(i)}
              >
                {item.q}
              </button>
            ))}
          </div>
          <p className="ask-a">{answers[which]?.a}</p>
          <div className="ask-actions">
            <a className="btn btn-red" href={PHONE_TEL}>
              Call now
            </a>
            <a className="btn btn-line" href="/#quote" onClick={() => setOpen(false)}>
              Free estimate
            </a>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="ask-btn"
        aria-expanded={open}
        aria-label={open ? "Close ask and answer" : "Ask a question"}
        onClick={() => setOpen((v) => !v)}
      >
        <MessageCircleQuestion size={22} aria-hidden="true" />
      </button>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(dock, document.body);
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="pad-mobile">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={stuck ? "site-header is-stuck" : "site-header"}>
        <div className="util">
          <div className="wrap util-row">
            <span>
              <MapPin size={14} aria-hidden="true" /> Boise, Idaho
            </span>
            <a href={PHONE_TEL}>
              <Phone size={14} aria-hidden="true" /> Call now {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="wrap nav-row">
          <a className="brand" href="/" aria-label="Garage Door Store Boise home">
            <img src="/media/logo.png" alt="Garage Door Store Boise" />
          </a>
          <nav id="site-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Primary">
            {links.map((item) => (
              <a key={item.href} href={item.href} onClick={close}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="btn btn-red" href="/#quote">
              Get a free estimate
            </a>
          </div>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-flag" aria-hidden="true">
          <img src="/media/footer-wave.svg?v=4" alt="" />
        </div>
        <div className="wrap fgrid">
          <div>
            <img className="foot-logo" src="/media/logo.png" alt="" />
            <p className="mt-3">
              Family-owned garage door repair, installation, and service for Boise and the Treasure Valley. Built for
              Boise. Engineered to perform.
            </p>
            <div className="socials">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li>
                <a href={`${ORIGIN}/garage-door-repair/`}>Garage door repair</a>
              </li>
              <li>
                <a href={`${ORIGIN}/garage-door-installation/`}>Garage door installation</a>
              </li>
              <li>
                <a href={`${ORIGIN}/garage-openers-remotes/`}>Garage door openers</a>
              </li>
              <li>
                <a href={`${ORIGIN}/garage-door-spring-replacement/`}>Garage door springs</a>
              </li>
              <li>
                <a href="/#maintenance">Garage door maintenance</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <a href={`${ORIGIN}/about-us/`}>About</a>
              </li>
              <li>
                <a href="/#reviews">Reviews</a>
              </li>
              <li>
                <a href="/#area">Service areas</a>
              </li>
              <li>
                <a href="/#quote">Contact</a>
              </li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noreferrer">
                  {ADDRESS}
                </a>
              </li>
              <li>Mon–Fri 7:00 AM–7:00 PM</li>
              <li>Sat 7:00 AM–12:00 PM · Sun closed</li>
              <li>Technician line advertised 24/7</li>
              <li>
                <a href={GOOGLE_REVIEWS} target="_blank" rel="noreferrer">
                  Google reviews
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap legal">
          <span>© {new Date().getFullYear()} Garage Door Store Boise. Photos and logo belong to the business.</span>
          <a href={ORIGIN}>Existing site</a>
        </div>
      </footer>
      <AskDock />
      <div className="mobile-bar">
        <a className="btn btn-ghost" href={PHONE_TEL}>
          Call now
        </a>
        <a className="btn btn-red" href="/#quote">
          Get estimate
        </a>
      </div>
    </div>
  );
}
