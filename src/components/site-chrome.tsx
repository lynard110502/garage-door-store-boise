import { Menu, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const links = [
  { href: "/#services", label: "Repair" },
  { href: "/#prices", label: "Prices" },
  { href: "/#projects", label: "Doors" },
  { href: "/#area", label: "Areas" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#quote", label: "Contact" },
] as const;

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/garagedoorstoreboise",
    path: "M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.2c0-.5.2-.8.8-.8H16V8z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gdsboise/",
    path: "M8 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm8 1.6H8A2.4 2.4 0 0 0 5.6 8v8A2.4 2.4 0 0 0 8 18.4h8a2.4 2.4 0 0 0 2.4-2.4V8A2.4 2.4 0 0 0 16 5.6zM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.2 7.1a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z",
  },
  {
    label: "X",
    href: "https://x.com/Garagedoorchain",
    path: "M5 5.5h3.1l3.2 4.4L15.2 5.5H19l-5.2 6.3L19.4 18.5h-3.1l-3.6-4.9-4.2 4.9H5l5.6-6.6L5 5.5z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/garagedoorstoreboise",
    path: "M22 8.2a3 3 0 0 0-2.1-2.1C18.2 5.7 12 5.7 12 5.7s-6.2 0-7.9.4A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12a31 31 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.7.4 7.9.4 7.9.4s6.2 0 7.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8zM10.2 15.1V8.9L15.4 12z",
  },
] as const;

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper pb-16 text-ink lg:pb-0">
      <div className="bg-signal text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-5">
          <a href="tel:2085142871" className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold hover:text-white/80">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-signal">
              <Phone size={14} />
            </span>
            <span className="hidden sm:inline text-white/85">Free in-home estimate</span>
            <span className="truncate font-bold tracking-wide">208.514.2871</span>
          </a>
          <ul className="flex items-center gap-1.5">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid size-8 place-items-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-signal"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden="true" fill="currentColor">
                    <path d={item.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <header className="mill-bar sticky top-0 z-50 border-b border-white/10 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src="/images/logo.png" alt="Garage Door Store Boise" width={578} height={165} className="h-10 w-auto sm:h-14" />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-[15px] font-semibold text-white hover:text-signal">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
              <a href="tel:2085142871" className="hidden font-display text-xl font-bold tracking-wide text-white lg:inline">
              Call us now
            </a>
            <a href="/#quote" className="btn hidden bg-signal px-4 py-2.5 text-sm font-bold text-white hover:bg-signal-hover lg:inline-block">
              Get free estimate
            </a>
            <button
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="flex flex-col border-t border-white/10 bg-black px-5 py-2 text-white lg:hidden" aria-label="Mobile">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="py-3 text-lg font-semibold" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="tel:2085142871" className="py-3 font-semibold text-white">
              208.514.2871
            </a>
          </nav>
        ) : null}
      </header>
      {children}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] lg:hidden">
        <a href="tel:2085142871" className="btn call-live bg-signal py-3.5 text-center text-sm font-bold text-white hover:bg-signal-hover">
          Call us now
        </a>
        <a href="/#quote" className="bg-ink py-3.5 text-center text-sm font-semibold text-white">
          Get free estimate
        </a>
      </div>
      <footer className="border-t-4 border-signal bg-graphite text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <img src="/images/logo.png" alt="Garage Door Store Boise" width={578} height={165} className="h-16 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Family-owned garage door repair and installation. Serving Treasure Valley for over 30 years.
            </p>
            <p className="mt-4 text-sm font-semibold leading-relaxed">
              9075 W Hackamore Dr
              <br />
              Boise, ID 83709
            </p>
            <ul className="mt-4 flex gap-2">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-signal hover:text-signal"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
                      <path d={item.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-[0.16em] text-signal uppercase">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li><a href="/#services" className="hover:text-white">Garage door repair</a></li>
              <li><a href="/#services" className="hover:text-white">Door installation</a></li>
              <li><a href="/#services" className="hover:text-white">Springs and openers</a></li>
              <li><a href="/#prices" className="hover:text-white">Tune-up, $125</a></li>
              <li><a href="/#faq" className="hover:text-white">Repair questions</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-[0.16em] text-signal uppercase">Service area</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/75">
              {["Boise", "Garden City", "Meridian", "Eagle", "Nampa", "Star", "Caldwell", "Middleton", "Homedale", "Kuna", "Bowmont", "Melba"].map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-[0.16em] text-signal uppercase">Call the shop</p>
            <a href="tel:2085142871" className="mt-4 block font-display text-4xl font-bold tracking-wide hover:text-signal">208.514.2871</a>
            <p className="mt-2 text-sm text-white/70">Call any time and talk to a technician. The line is 24/7.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="tel:2085142871" className="btn bg-signal px-5 py-2.5 text-sm font-semibold text-white hover:bg-signal-hover">Call us now</a>
              <a href="/#quote" className="btn border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Get free estimate</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 text-xs text-white/55">
            <p className="max-w-3xl text-sm leading-relaxed text-pretty text-white/70">© 2026 The Garage Door Template. All Rights Reserved. Lic# XXXXXXXX. Website design by Garage Door Marketing Lab</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>Garage Door Store Boise, Inc. · 9075 W Hackamore Dr, Boise, ID 83709</p>
              <p className="flex items-center gap-3">
                <Link to="/privacy" className="hover:text-white">Privacy</Link>
                <Link to="/terms" className="hover:text-white">Terms</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
