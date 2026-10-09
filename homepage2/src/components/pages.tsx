import { Link } from "@tanstack/react-router";
import { EstimateForm } from "@/components/estimate-form";
import { GalleryBrowser } from "@/components/gallery-browser";
import {
  brands,
  doorStyles,
  EMAIL,
  MAPS_DIRECTIONS,
  MAPS_EMBED,
  offers,
  PHONE_DISPLAY,
  PHONE_TEL,
  reviews,
  services,
  teamNames,
  type DoorStyle,
} from "@/data/site";

export function PageHero({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <header className="page-hero">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="lede" style={{ color: "var(--color-concrete)", marginTop: "1rem" }}>
        {lede}
      </p>
    </header>
  );
}

export function DoorsPage() {
  return (
    <main>
      <PageHero
        kicker="The collection"
        title="Every door is a facade decision."
        lede="Styles as the company sorts them in its gallery. Open a style for more photographs. Nothing here is a live preview of your house."
      />
      <div className="page-main">
        <div className="collage">
          {doorStyles.map((style) => (
            <Link key={style.slug} to="/doors/$slug" params={{ slug: style.slug }} className="tile">
              <img src={style.images[0].src} alt={style.images[0].alt} />
              <span className="num-tag">{style.number}</span>
              <span className="cap">
                <span className="kicker">{style.kicker}</span>
                <h3>{style.title}</h3>
                <span>{style.summary}</span>
                <span className="more">Explore style</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export function DoorDetail({ style }: { style: DoorStyle }) {
  const others = doorStyles.filter((s) => s.slug !== style.slug).slice(0, 3);
  return (
    <main>
      <PageHero kicker={`${style.number} — ${style.kicker}`} title={style.title} lede={style.summary} />
      <div className="page-main">
        <div className="page-grid two">
          <div className="film">
            {style.images.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} />
            ))}
          </div>
          <div className="stack">
            <div className="prose">
              <p>{style.body}</p>
              <p>
                Photographs come from the Garage Door Store Boise gallery. The company does not publish the street, the material spec, or the price with each image. A free in-home consultation is how they ask you to match a look to an opening.
              </p>
            </div>
            <div className="row-actions">
              <Link to="/contact" className="btn btn-signal">
                Ask about this style
              </Link>
              <a className="btn btn-ghost" href={PHONE_TEL}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
            <hr className="rule" />
            <p className="small">Also in the gallery</p>
            <div className="stack">
              {others.map((other) => (
                <Link key={other.slug} to="/doors/$slug" params={{ slug: other.slug }}>
                  {other.number} — {other.title}
                </Link>
              ))}
              <Link to="/doors">All styles</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function RepairPage() {
  const repair = services.find((s) => s.id === "repair")!;
  const springs = services.find((s) => s.id === "springs")!;
  const openers = services.find((s) => s.id === "openers")!;
  const tune = services.find((s) => s.id === "maintenance")!;
  return (
    <main>
      <PageHero
        kicker="Garage Door Repair Boise"
        title="Garage door repair in Boise."
        lede="Repair, springs, openers, and tune-ups — using the company’s own descriptions and published prices."
      />
      <div className="page-main">
        <article className="page-grid two" id="repair">
          <img src={repair.image} alt={repair.imageAlt} />
          <div className="prose">
            <p className="kicker">01</p>
            <h2>Garage door repair</h2>
            <p>{repair.detail}</p>
            <p>
              Their repair page also says technicians are available 24 hours a day, 7 days a week, and that the company is licensed, bonded, insured, and a BBB member in good standing. “Record time” is their phrase for emergency calls — they do not publish a minute guarantee, so this site will not invent one.
            </p>
          </div>
        </article>
        <article className="page-grid two" id="springs">
          <div className="prose">
            <p className="kicker">02 — Springs</p>
            <h2>Spring replacement</h2>
            <p>{springs.detail}</p>
            <p className="caution">
              Do not operate a door with a broken spring if you can avoid it, and do not wind, loosen, or disconnect springs or cables. They are under high tension.
            </p>
          </div>
          <img src="/media/steel.webp" alt="Steel garage door photograph from the company site" />
        </article>
        <article className="page-grid two" id="openers">
          <img src={openers.image} alt={openers.imageAlt} />
          <div className="prose">
            <p className="kicker">03 — Operators</p>
            <h2>Openers and remotes</h2>
            <p>{openers.detail}</p>
            <p>
              The existing openers page shows Genie and LiftMaster models. Packages change. The $700 Genie 2028 listing is what the homepage currently prints — confirm it covers your door height.
            </p>
          </div>
        </article>
        <article id="maintenance" className="prose">
          <p className="kicker">04 — Maintenance</p>
          <h2>Tune-ups</h2>
          <p>{tune.detail}</p>
          <table className="spec">
            <thead>
              <tr>
                <th>Listed service</th>
                <th>Price</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.name}>
                  <td>{offer.name}</td>
                  <td>{offer.price}</td>
                  <td>{offer.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <div className="row-actions">
          <Link to="/contact" className="btn btn-signal">
            Request a repair estimate
          </Link>
          <a className="btn btn-ghost" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}

export function InstallationPage() {
  return (
    <main>
      <PageHero
        kicker="Garage Door Installation Boise"
        title="Garage door installation."
        lede="New residential doors, including standard and carriage styles, with the opener and springs considered together."
      />
      <div className="page-main">
        <div className="page-grid two">
          <img src="/media/hero-blue-house.webp" alt="Wood-tone garage doors on a blue home from the company gallery" />
          <div className="prose">
            <p>
              Garage Door Store Boise says it installs many styles and does custom installation of standard and carriage-style doors. The brands named on the site are Wayne Dalton, LiftMaster, Clopay, and Genie.
            </p>
            <p>
              A free in-home consultation is the offer: someone looks at the opening, the header, and how you use the door, then helps you pick. The site also says most spring, opener, off-track, and maintenance work can be done the same day you call. A full door replacement is a different job — ask for the timeline when you get the estimate.
            </p>
            <p>
              Wood can mean solid wood, an overlay, or a wood-look steel door. Those are not interchangeable. The company’s own writing flags weight, insulation, and upkeep as the tradeoffs.
            </p>
          </div>
        </div>
        <div id="styles">
          <p className="kicker">Styles they show</p>
          <ul className="city-index">
            {doorStyles
              .filter((style) => style.slug !== "commercial")
              .map((style) => (
              <li key={style.slug}>
                <Link to="/doors/$slug" params={{ slug: style.slug }}>
                  {style.title}
                </Link>
                <span className="small">{style.number}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="brands">
          {brands.map((b) => (
            <img key={b.name} src={b.src} alt={b.name} />
          ))}
        </div>
        <Link to="/contact" className="btn btn-signal">
          Request an installation estimate
        </Link>
      </div>
    </main>
  );
}

export function CommercialPage() {
  const commercial = services.find((s) => s.id === "commercial")!;
  return (
    <main>
      <PageHero
        kicker="Commercial Garage Doors Boise"
        title="Commercial garage doors."
        lede="Insulated and non-insulated commercial doors, taller openings, and operators built for cycle count."
      />
      <div className="page-main">
        <div className="page-grid two">
          <div className="film">
            {doorStyles
              .find((s) => s.slug === "commercial")!
              .images.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} />
              ))}
          </div>
          <div className="prose">
            <p>{commercial.detail}</p>
            <p>
              Residential package prices — the $125 tune-up, the $350 dual spring, the $700 Genie motor — are published as residential listings. Do not assume they cover a commercial bay. Ask for an estimate.
            </p>
            <div className="row-actions">
              <Link to="/contact" className="btn btn-signal">
                Request a commercial estimate
              </Link>
              <a className="btn btn-ghost" href={PHONE_TEL}>
                Call {PHONE_DISPLAY}
              </a>
              <Link to="/doors/$slug" params={{ slug: "commercial" }} className="btn btn-ghost">
                Commercial gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function WorkPage() {
  return (
    <main>
      <PageHero
        kicker="Gallery"
        title="Gallery"
        lede="Photographs grouped the way the shop already sorts them: wood grain, planked, modern, glass, carriage, traditional, custom, and commercial. Recent projects use these same pictures. Addresses are not published, so they are not shown."
      />
      <div className="page-main" id="recent">
        <GalleryBrowser />
      </div>
    </main>
  );
}

export function AboutPage() {
  return (
    <main>
      <PageHero
        kicker="About Us"
        title="About Garage Door Store Boise, Inc."
        lede="Family-owned, locally operated, and on garage doors for over 30 years — the claims the company publishes about itself."
      />
      <div className="page-main">
        <div className="about-grid">
          <img src="/media/team.webp" alt="Garage Door Store Boise team photograph. The company does not label individuals in this photo." />
          <div className="prose">
            <p className="pull">Garage Door Store Boise is a family-owned and operated local business. Servicing garage doors for over 30 years.</p>
            <p>
              They tell customers not to accept surprise add-ons, that they keep set pricing, and that a phone estimate is the way to start. The lineup they name is Wayne Dalton, LiftMaster, Clopay, and Genie. Service includes installation and repair, plus custom installation of standard and carriage-style doors.
            </p>
            <p>
              The repair page adds that technicians are available 24/7 and that the company is licensed, bonded, insured, and a BBB member in good standing. The Our Team page lists six names and no biographies. The group photo shows the crew; faces are not matched to names here.
            </p>
            <ul className="roster" id="team">
              {teamNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p className="muted">Names as published. Roles are not listed on the team page, so none are assigned.</p>
          </div>
        </div>
        <img src="/media/truck.webp" alt="Garage Door Store Boise service truck" />
        <div className="page-grid two">
          <div className="prose">
            <h2>A video from the current site</h2>
            <p>This is the film embedded on garagedoorstoreboise.com. It is theirs, played from YouTube.</p>
          </div>
          <div className="map-frame">
            <iframe
              title="Garage Door Store Boise video"
              src="https://www.youtube.com/embed/bSldLJXGTGU"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="row-actions">
          <a className="btn btn-ghost" href="https://garagedoorstoreboise.com/about-us/">
            About page on the current site
          </a>
          <a className="btn btn-ghost" href="https://garagedoorstoreboise.com/our-team/">
            Team page
          </a>
          <Link to="/contact" className="btn btn-signal">
            Get a free estimate
          </Link>
        </div>
      </div>
    </main>
  );
}

export function ContactPage() {
  return (
    <main>
      <PageHero
        kicker="Contact"
        title="Contact"
        lede="208-514-2871 is the published number. The form opens a draft to the mailbox printed on their site. It does not pretend a job is booked."
      />
      <div className="page-main">
        <div className="page-grid two">
          <EstimateForm />
          <div className="stack">
            <p>
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              <br />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p>
              9075 W Hackamore Dr
              <br />
              Boise, ID 83709
            </p>
            <p className="muted">
              That address is the pin in the Google Map embedded on the company’s site. The company says you can call 24/7 and talk to a technician. Some public listings show weekday hours; confirm the visit when you call.
            </p>
            <a href={MAPS_DIRECTIONS}>Get directions</a>
            <div className="map-frame">
              <iframe title="Map of Garage Door Store Boise" src={MAPS_EMBED} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function BlogPage() {
  const posts = [
    {
      title: "DIY or Professional? Should You Fix Your Garage Door Yourself?",
      href: "https://garagedoorstoreboise.com/diy-or-professional-should-you-fix-your-garage-door-yourself/",
      text: "Garage door repairs are a common necessity for homeowners. Deciding whether to tackle these repairs yourself or hire a professional is crucial for both your safety and the longevity of your garage door. The article looks at the risks of DIY Boise garage door repair.",
    },
    {
      title: "Custom Wood Garage Doors in Eagle, Idaho: Style, Durability, and Smart Upgrades for Year-Round Performance",
      href: "https://garagedoorstoreboise.com/custom-wood-garage-doors-in-eagle-idaho-style-durability-and-smart-upgrades-for-year-round-performance/",
      text: "A custom wood garage door can change the look of a home in Eagle, especially on craftsman, farmhouse, ranch, and modern-rustic houses. The shop’s post says wood doors are not a set-it-and-forget-it choice, and that they have to be built and maintained correctly.",
    },
    {
      title: "Garage Door Repair in Caldwell, ID: A Homeowner’s Guide to Safer, Quieter, More Reliable Doors",
      href: "https://garagedoorstoreboise.com/garage-door-repair-in-caldwell-id-a-homeowners-guide-to-safer-quieter-more-reliable-doors-2/",
      text: "The post calls the garage door the largest moving part of the home, and says doors in Caldwell work harder than people expect. It is written as a guide to what is normal and what is a warning sign.",
    },
    {
      title: "Garage Door Openers in Boise: How to Choose the Right One (and Avoid Costly Repairs)",
      href: "https://garagedoorstoreboise.com/garage-door-openers-in-boise-how-to-choose-the-right-one-and-avoid-costly-repairs/",
      text: "In Boise, the opener is described as a daily-use machine that has to work through temperature swings, dusty summers, and winter cold. The post is about choosing an opener that stays quiet and reliable.",
    },
    {
      title: "Choosing Garage Door Openers in Meridian, ID: Quiet Operation, Smart Features, and Safety Must-Haves",
      href: "https://garagedoorstoreboise.com/choosing-garage-door-openers-in-meridian-id-quiet-operation-smart-features-and-safety-must-haves/",
      text: "A Meridian guide from the shop’s blog about quiet operation, smart features, and the safety items they want on an opener.",
    },
    {
      title: "Garage Door Openers in Caldwell, Idaho: A Practical Guide to Choosing the Right Opener (and Keeping It Reliable)",
      href: "https://garagedoorstoreboise.com/garage-door-openers-in-caldwell-idaho-a-practical-guide-to-choosing-the-right-opener-and-keeping-it-reliable/",
      text: "A Caldwell guide from the same blog: how to choose an opener and keep it reliable.",
    },
  ];
  return (
    <main>
      <PageHero
        kicker="Blog"
        title="From the shop’s blog."
        lede="These are the posts published on garagedoorstoreboise.com. Each link opens the original article."
      />
      <div className="page-main">
        <div className="stack">
          {posts.map((post) => (
            <article key={post.href} className="prose">
              <h2>{post.title}</h2>
              <p>{post.text}</p>
              <a href={post.href}>Read the full post</a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export function TestimonialsPage() {
  return (
    <main>
      <PageHero
        kicker="Testimonials"
        title="Testimonials"
        lede="Reviews the shop publishes, including the Google and Housecall Pro comments already shown on this site. The old testimonials page points readers to those same sources."
      />
      <div className="page-main">
        <div className="stack">
          {reviews.map((review) => (
            <blockquote key={review.name} className="prose">
              <p>{review.text}</p>
              <p>
                <strong>{review.name}</strong>
                {"place" in review && review.place ? ` · ${review.place}` : ""} · {review.stars} stars
              </p>
            </blockquote>
          ))}
        </div>
        <div className="row-actions">
          <a className="btn btn-ghost" href="https://garagedoorstoreboise.com/testimonials/">
            Testimonials on the current site
          </a>
          <a className="btn btn-ghost" href="https://client.housecallpro.com/reviews/Garage-Door-Store-Boise/0a5ec8c7-7320-4741-8cd3-adc1e67e97a0/">
            Housecall Pro reviews
          </a>
        </div>
      </div>
    </main>
  );
}

export function PrivacyPage() {
  return (
    <main>
      <PageHero
        kicker="Privacy"
        title="What this page does with what you type."
        lede="Short version: the estimate form never leaves your browser except as an email you choose to send."
      />
      <div className="page-main prose">
        <p>
          Garage Door Store Boise’s estimate form on this site does not post to a server, CRM, or booking system. Choosing “Email this request” builds a mailto link to {EMAIL}. Choosing “Copy request” copies the same text to your clipboard, if your browser allows it.
        </p>
        <p>
          Phone links only start a call on your device. The map is Google’s embed, so loading the contact or home page can set Google cookies under Google’s policy. Review links go to Google and Housecall Pro. The company video plays from YouTube.
        </p>
        <p>
          Photographs and review text are reproduced from garagedoorstoreboise.com for this redesign. Customer addresses are not listed because the gallery does not publish them.
        </p>
        <p>
          Their testimonials disclosure lives on the current site:{" "}
          <a href="https://garagedoorstoreboise.com/testimonials-disclosure/">testimonials disclosure</a>.
        </p>
      </div>
    </main>
  );
}
