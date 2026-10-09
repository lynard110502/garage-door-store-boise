import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ADDRESS_CITY,
  ADDRESS_LINE,
  EMAIL,
  MAPS_DIRECTIONS,
  navItems,
  PHONE_DISPLAY,
  PHONE_TEL,
  serviceAreas,
  SOCIAL,
} from "@/data/site";

export function Shell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const home = path === "/";
  const [solid, setSolid] = useState(!home);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const root = document.getElementById("content");
    if (!root) return;
    const nodes = [...root.querySelectorAll<HTMLElement>(".hm-band, .hm-finale, .page-main")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = [...root.querySelectorAll<HTMLElement>(".hm-line")];
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-shown"));
      lines.forEach((node) => node.classList.add("is-drawn"));
      return;
    }
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-shown");
          seen.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    const draw = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-drawn", entry.isIntersecting);
        }
      },
      { threshold: 0.65 },
    );
    nodes.forEach((node) => seen.observe(node));
    lines.forEach((node) => draw.observe(node));
    return () => {
      seen.disconnect();
      draw.disconnect();
    };
  }, [path]);

  useEffect(() => {
    setMobile(false);
    setOpenMenu(null);
  }, [path]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setSolid(path !== "/");
      setScrolled(y > 24);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const menu = navItems;

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header
        className={
          home
            ? scrolled
              ? "site-header is-home is-scrolled"
              : "site-header is-home"
            : solid
              ? "site-header is-solid"
              : "site-header"
        }
      >
        <div className="header-progress" style={{ width: `${progress}%` }} />
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Garage Door Store Boise, home">
            <img src="/media/logo.png" alt="" width={210} height={62} />
            <span className="brand-type">
              <strong>Garage Door Store</strong>
              <span>Boise</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary">
            {menu.map((item) => (
              <div
                key={item.label}
                className={openMenu === item.label ? "nav-item is-open" : "nav-item"}
                onMouseEnter={() => item.links && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {item.links ? (
                  <a className="nav-parent" href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="nav-link"
                    aria-current={path === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                )}
                {item.links && (
                  <div className="mega" role="menu">
                    <a href={item.href} role="menuitem">
                      <small>All</small>
                      <span>{item.label}</span>
                    </a>
                    {item.links.map((link) => (
                      <a key={link.href + link.label} href={link.href} role="menuitem">
                        <small>{link.note ?? "→"}</small>
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <div className="header-cta">
              <Link to="/contact" className="btn btn-signal">
                Get a free estimate
              </Link>
              <a className="phone-link" href={PHONE_TEL}>
                {PHONE_DISPLAY}
              </a>
            </div>
            <a className="icon-call" href={PHONE_TEL} aria-label={`Call ${PHONE_DISPLAY}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 3.5h3L11 8l-2 1.5a12 12 0 0 0 5.5 5.5L16 13l4.5 1.5v3A2 2 0 0 1 18.5 19 15 15 0 0 1 5 5.5a2 2 0 0 1 1.5-2Z" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <button
              className="burger"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={mobile ? "nav-overlay open" : "nav-overlay"} hidden={!mobile}>
        <div className="overlay-actions">
          <a className="btn btn-signal" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
          <Link to="/contact" className="btn btn-ghost" onClick={() => setMobile(false)}>
            Get a free estimate
          </Link>
        </div>
        {menu.map((item, i) => (
          <div key={item.label} className="overlay-item" style={{ animationDelay: `${60 + i * 45}ms` }}>
            <a href={item.href} className="big" onClick={() => setMobile(false)}>
              {item.label}
            </a>
            {item.links && (
              <div className="sub">
                {item.links.map((link) => (
                  <a key={link.href + link.label} href={link.href} onClick={() => setMobile(false)}>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div id="content">{children}</div>

      <footer className="site-footer">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/media/logo.png" alt="Garage Door Store Boise" width={168} height={48} />
            <p>
              Family-owned repair and installation. Licensed and insured, as published by the shop. Over 30 years in the Treasure Valley.
            </p>
          </div>
          <div>
            <h3>Visit</h3>
            <ul>
              <li>
                <a href={MAPS_DIRECTIONS}>
                  {ADDRESS_LINE}, {ADDRESS_CITY}
                </a>
              </li>
              <li>
                <a className="foot-phone" href={PHONE_TEL}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li className="foot-quiet">Phone answered 24/7, as published.</li>
            </ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>
              <li><Link to="/doors">Door styles</Link></li>
              <li><Link to="/repair">Repair and installation</Link></li>
              <li><Link to="/work">Projects</Link></li>
              <li><Link to="/testimonials">Reviews</Link></li>
              <li><a href="/#prices">Published prices</a></li>
            </ul>
          </div>
          <div>
            <h3>Valley</h3>
            <p className="foot-cities">{serviceAreas.slice(0, 6).join(" · ")}</p>
            <div className="foot-social">
              {SOCIAL.map((s) => (
                <a key={s.href} href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} Garage Door Store Boise. Prices shown are the shop’s published figures and can change.</span>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </>
  );
}
