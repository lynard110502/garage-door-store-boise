import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const links = [
  { href: "/#services", label: "Repair" },
  { href: "/#prices", label: "Prices" },
  { href: "/#about", label: "The shop" },
  { href: "/#area", label: "Service area" },
  { href: "/#reviews", label: "Reviews" },
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
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry?.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-sheet min-h-screen bg-[#f7f4ef] pb-16 text-[#1c1f24] lg:pb-0">
      <div ref={sentinel} className="h-px w-full" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 text-white">
        <div className={`border-b-4 transition-colors duration-300 ${scrolled || open ? "border-[#1c1f24] bg-[#ed1c24]" : "border-transparent bg-transparent"}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2.5">
            <a href="/" className="flex shrink-0 items-center rounded-lg bg-[#1c1f24] px-2.5 py-1 transition-all duration-300" onClick={() => setOpen(false)}>
              <img src="/images/logo.png" alt="Garage Door Store Boise" width={578} height={165} className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-16"}`} />
            </a>
            <nav className="hidden items-center rounded-full bg-[#1c1f24] p-1 lg:flex" aria-label="Primary">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-bold text-white hover:bg-[#ed1c24]">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a href="/#quote" className="btn-ticket btn-ticket-ink hidden items-center justify-center gap-3 rounded-full py-2 pr-4 pl-4 text-sm font-bold text-white lg:inline-flex">Get free estimate <span aria-hidden="true">→</span></a>
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
            <nav className="flex flex-col border-t border-[#1c1f24]/20 px-5 py-2 lg:hidden" aria-label="Mobile">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="py-3 text-lg font-semibold" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="tel:2085142871" className="py-3 font-bold">208.514.2871</a>
            </nav>
          ) : null}
        </div>
      </header>
      {children}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 lg:hidden">
        <a href="tel:2085142871" className="bg-[#ed1c24] py-3.5 text-center text-sm font-bold text-white">Call now</a>
        <a href="/#quote" className="bg-[#1c1f24] py-3.5 text-center text-sm font-bold text-[#ed1c24]">Free estimate</a>
      </div>
      <footer className="bg-[#1c1f24] text-white">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 lg:grid-cols-12 lg:gap-8">
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
              <a href="tel:2085142871" className="btn-ticket inline-flex items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold text-white">Call us now <span aria-hidden="true">→</span></a>
              <a href="/#quote" className="btn-ticket inline-flex items-center justify-center gap-4 rounded-full py-3 pr-5 pl-6 text-sm font-bold text-white">Get free estimate <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-white/55">
            <p>Garage Door Store Boise, Inc. · 9075 W Hackamore Dr, Boise, ID 83709</p>
            <p className="flex items-center gap-3">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
