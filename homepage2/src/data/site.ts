export const PHONE_DISPLAY = "208-514-2871";
export const PHONE_TEL = "tel:208-514-2871";
export const EMAIL = "boisedoors@gmail.com";

/** Location pinned by the Google Map embedded on garagedoorstoreboise.com. */
export const ADDRESS_LINE = "9075 W Hackamore Dr";
export const ADDRESS_CITY = "Boise, ID 83709";
export const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2159.734613209081!2d-116.29559673094404!3d43.594708731502365!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aeff362b60b503%3A0x4d030da379371086!2sGarage%20Door%20Store%20Boise!5e0!3m2!1sen!2sus!4v1703392276548!5m2!1sen!2sus";
export const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=9075+W+Hackamore+Dr,+Boise,+ID+83709";
export const MAPS_PLACE = "https://maps.app.goo.gl/ttKcnbTP1bXCW4y16";

export const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/garagedoorstoreboise" },
  { label: "YouTube", href: "https://www.youtube.com/user/garagedoorstoreboise/about" },
] as const;

export const REVIEW_LINKS = [
  {
    label: "Google reviews",
    href: "https://www.google.com/search?q=Garage+Door+Store+Boise+reviews",
  },
  {
    label: "Housecall Pro reviews",
    href: "https://client.housecallpro.com/reviews/Garage-Door-Store-Boise/0a5ec8c7-7320-4741-8cd3-adc1e67e97a0/",
  },
] as const;

export const ORIGIN = "https://garagedoorstoreboise.com";

export const serviceAreas = [
  "Boise",
  "Meridian",
  "Eagle",
  "Nampa",
  "Star",
  "Caldwell",
  "Middleton",
  "Kuna",
  "Garden City",
  "Homedale",
  "Melba",
  "Bowmont",
] as const;

export type DoorStyle = {
  slug: string;
  title: string;
  number: string;
  kicker: string;
  summary: string;
  body: string;
  images: { src: string; alt: string }[];
};

export const doorStyles: DoorStyle[] = [
  {
    slug: "wood-grain",
    title: "Wood Garage Doors",
    number: "01",
    kicker: "Texture",
    summary: "Grain, warmth, and a door that reads as part of the architecture.",
    body: "The gallery groups these as wood grain: stained sections, wood-look finishes, and custom wood doors. The company notes that real wood and wood-look builds are different — solid wood, wood overlay on an insulated base, or a steel door with a wood-grain finish — and the right one depends on how often the door cycles, how much insulation you want, and how much upkeep you want to take on.",
    images: [
      { src: "/media/wood-1.webp", alt: "Wood grain garage door from the Garage Door Store Boise gallery" },
      { src: "/media/wood-2.webp", alt: "Second wood grain garage door from the company gallery" },
      { src: "/media/wood-3.webp", alt: "Wood grain garage doors on a residence in the company gallery" },
      { src: "/media/wood-4.webp", alt: "Wood grain sectional garage door from the company gallery" },
    ],
  },
  {
    slug: "planked",
    title: "Planked Doors",
    number: "02",
    kicker: "Rhythm",
    summary: "Long planks that give the facade a crafted, directional line.",
    body: "Planked doors use horizontal or vertical boards as the visual structure. On the company’s gallery they sit on craftsman, farmhouse, and mountain-style homes around the Treasure Valley. Hardware, stain, and window rows change the character more than the plank itself.",
    images: [
      { src: "/media/plank-1.webp", alt: "Planked garage door from the Garage Door Store Boise gallery" },
      { src: "/media/plank-2.webp", alt: "Plank-style garage door on a home in the company gallery" },
      { src: "/media/plank-3.webp", alt: "Planked sectional garage door from the company gallery" },
      { src: "/media/plank-4.webp", alt: "Another planked garage door from the company gallery" },
    ],
  },
  {
    slug: "modern",
    title: "Modern Doors",
    number: "03",
    kicker: "Line",
    summary: "Clean sections, fewer ornaments, a quieter front to the house.",
    body: "Modern doors in this gallery favor flush or long horizontal panels, restrained windows, and finishes that sit close to the siding or brick. The company describes steel, aluminum, and glass as the materials that usually carry this look, including wood-grain steel when you want the texture without a solid-wood door.",
    images: [
      { src: "/media/modern-1.webp", alt: "Modern wood-tone garage doors with narrow windows, company gallery" },
      { src: "/media/modern-2.webp", alt: "Modern garage door from the Garage Door Store Boise gallery" },
      { src: "/media/modern-3.webp", alt: "Contemporary garage door on a residence in the company gallery" },
      { src: "/media/modern-4.webp", alt: "Modern sectional garage door from the company gallery" },
    ],
  },
  {
    slug: "glass",
    title: "Glass Doors",
    number: "04",
    kicker: "Light",
    summary: "Full-view aluminum and glass — the door as a window wall.",
    body: "Glass doors are the most architectural option in the collection: large lites, dark or matching frames, and a facade that changes with the light. The company points to aluminum and glass for modern homes. Frosted or tinted lites keep the glow without putting the whole garage on display. These photographs are installations from the gallery, not a digital mockup of your house.",
    images: [
      { src: "/media/glass-1.webp", alt: "Full-view frosted glass garage doors on a brick home, company gallery" },
      { src: "/media/glass-2.webp", alt: "Glass garage door from the Garage Door Store Boise gallery" },
      { src: "/media/glass-3.webp", alt: "Aluminum and glass garage doors from the company gallery" },
      { src: "/media/glass-4.webp", alt: "Another full-view garage door from the company gallery" },
    ],
  },
  {
    slug: "carriage",
    title: "Carriage Garage Doors",
    number: "05",
    kicker: "Heritage",
    summary: "The swing-door silhouette, built as a sectional that actually lifts.",
    body: "Carriage doors borrow the hinges, crossbucks, and window rows of old swinging doors, then operate overhead. Garage Door Store Boise states that it does custom installation of standard and carriage-style doors, with options such as decorative hardware and glass. A carriage face can be wood, steel with overlay, or a finished composite — ask which build you are looking at before you fall for a photograph.",
    images: [
      { src: "/media/carriage-1.webp", alt: "Carriage-style garage door from the company gallery" },
      { src: "/media/carriage-2.webp", alt: "Carriage garage door with decorative windows, company gallery" },
      { src: "/media/carriage-3.webp", alt: "Carriage-style residential garage door from the company gallery" },
      { src: "/media/carriage-4.webp", alt: "Another carriage garage door from the Garage Door Store Boise gallery" },
    ],
  },
  {
    slug: "traditional",
    title: "Traditional Doors",
    number: "06",
    kicker: "Classic",
    summary: "Raised panels and familiar proportions for classic elevations.",
    body: "Traditional doors are the raised-panel sections most houses were drawn around. The company installs them alongside carriage and custom work, in the brands it stocks: Wayne Dalton, Clopay, and others. Color and window inserts do most of the matching — to trim, to the front door, to the roof.",
    images: [
      { src: "/media/trad-1.webp", alt: "Traditional raised-panel garage door from the company gallery" },
      { src: "/media/trad-2.webp", alt: "Traditional garage door on a home in the company gallery" },
      { src: "/media/trad-3.webp", alt: "Classic sectional garage door from the company gallery" },
      { src: "/media/trad-4.webp", alt: "Traditional residential garage door from the company gallery" },
    ],
  },
  {
    slug: "custom",
    title: "Custom Setups",
    number: "07",
    kicker: "One-off",
    summary: "Projects that do not sit neatly in a single style family.",
    body: "Custom setups are the gallery’s catch-all for unusual widths, mixed materials, and doors built around an existing opening. The company says customization can include color, hardware, glass, and finish, and that a technician should look at the opening before anyone promises a match. No addresses or material specs are published with these photographs, so treat them as visual references.",
    images: [
      { src: "/media/custom-1.webp", alt: "Custom garage door setup from the company gallery" },
      { src: "/media/custom-2.webp", alt: "Custom residential garage door project from the company gallery" },
      { src: "/media/custom-3.webp", alt: "Another custom garage door from the company gallery" },
      { src: "/media/custom-4.webp", alt: "Custom garage door configuration from the company gallery" },
    ],
  },
  {
    slug: "steel",
    title: "Steel Garage Doors",
    number: "09",
    kicker: "Steel",
    summary: "Durable, insulated steel doors, with the price given up front.",
    body: "The steel doors page says a new door adds beauty and function, with a sleek look and more safety. Steel is described as a top choice because it is durable and can lower the energy bill. The shop says steel insulates well, runs smooth and quiet, and can be customized. Technicians are described as trained, with at least five years in the industry, and prices are given up front with no overcharge.",
    images: [
      { src: "/media/steel.webp", alt: "Garage door from the Garage Door Store Boise gallery" },
      { src: "/media/trad-2.webp", alt: "Another residential garage door from the company gallery" },
    ],
  },
  {
    slug: "standard",
    title: "Standard Garage Doors",
    number: "10",
    kicker: "Standard",
    summary: "Non-insulated, vinyl-backed, and double-steel options.",
    body: "The shop says it repairs, maintains, and installs standard garage doors. Those doors are offered as non-insulated, vinyl-backed, and double steel, so the look and the build can change without leaving the standard line. Their page says a new door is one of the higher returns on a house, and that the garage door is usually about half of the front. Prices are given up front, with no add-ons or up-charges.",
    images: [
      { src: "/media/trad-1.webp", alt: "Traditional raised-panel garage door from the company gallery" },
      { src: "/media/trad-4.webp", alt: "Traditional residential garage door from the company gallery" },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Garage Doors",
    number: "08",
    kicker: "Work",
    summary: "Sectional and rolling doors for shops, bays, and taller openings.",
    body: "The company builds and services commercial doors, including insulated and non-insulated options, and describes custom commercial doors up to 20 feet in height. Motor options it lists include high-cycle springs, trolley operators, and shaft-drive operators. The work covers design, installation, and regular servicing — not a single catalog model.",
    images: [
      { src: "/media/comm-1.webp", alt: "Commercial garage door from the Garage Door Store Boise gallery" },
      { src: "/media/comm-2.webp", alt: "Commercial bay door from the company gallery" },
      { src: "/media/comm-3.webp", alt: "Commercial sectional door from the company gallery" },
      { src: "/media/comm-4.webp", alt: "Another commercial door from the company gallery" },
    ],
  },
];

export const residentialStyles = doorStyles.filter((s) =>
  ["wood-grain", "planked", "modern", "glass", "carriage", "traditional"].includes(s.slug),
);

export type Service = {
  id: string;
  number: string;
  title: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  summary: string;
  detail: string;
};

export const services: Service[] = [
  {
    id: "repair",
    number: "01",
    title: "Garage Door Repair",
    href: "/repair",
    cta: "Explore repair services",
    image: "/media/repair-1.webp",
    imageAlt: "Garage door service photograph from Garage Door Store Boise",
    summary: "A complete range of repair on residential and commercial doors.",
    detail:
      "Garage Door Store Boise states that it repairs all types of doors — automatic, commercial, panel damage, and spring changes — and that it handles jobs big and small. The company says spring changes, opener replacement, doors off track, or general maintenance can be done the same day you call. That is their published claim, not a guaranteed arrival window.",
  },
  {
    id: "installation",
    number: "02",
    title: "Garage Door Installation",
    href: "/installation",
    cta: "Request an installation estimate",
    image: "/media/hero-blue-house.webp",
    imageAlt: "Wood-tone garage doors on a blue home from the company gallery",
    summary: "New doors chosen for the house, then installed to the opening you actually have.",
    detail:
      "The company installs many styles, including custom installation of standard and carriage-style doors. It stocks products from Wayne Dalton, LiftMaster, Clopay, and Genie. A free in-home consultation is how they ask you to start, so the door, the springs, and the opener are specified together.",
  },
  {
    id: "springs",
    number: "03",
    title: "Garage Door Spring Replacement",
    href: "/repair#springs",
    cta: "Ask about spring replacement",
    image: "/media/steel.webp",
    imageAlt: "White carriage-style garage doors from the company gallery",
    summary: "Broken or tired springs are a high-tension repair. Do not adjust them yourself.",
    detail:
      "The company describes a spring that is not working as a possible sign of a bad or broken spring. Its published dual-spring change is $350, including tax and labor, with a 10-year warranty on that service. Torque tubes are listed at $450. Confirm both figures — they can change. Springs and cables stay under tension even when the door is down. Leave them alone and call.",
  },
  {
    id: "openers",
    number: "04",
    title: "Garage Door Openers & Remotes",
    href: "/repair#openers",
    cta: "See opener options",
    image: "/media/opener-scene.webp",
    imageAlt: "Residential garage from the company gallery, where openers are serviced",
    summary: "Wall-mount, belt, and chain drives — plus the remotes and keypads that run them.",
    detail:
      "From wall-mounted units to overhead belt and chain drives, the company says it uses openers chosen for lifting power. A published package is $700 for a 7-foot Genie 2028 belt drive, two remotes, and a keypad. Confirm the current package before you book. Opener work is also listed among the jobs they say can often be done the same day you call.",
  },
  {
    id: "maintenance",
    number: "05",
    title: "Maintenance and Tune-Ups",
    href: "/repair#maintenance",
    cta: "Schedule a tune-up",
    image: "/media/truck.webp",
    imageAlt: "Garage Door Store Boise service truck",
    summary: "A full tune-up is their published low-cost way to keep a working door working.",
    detail:
      "The site lists a garage door tune-up at $125, including tax and labor, described as a full tune-up. Their copy says a tune-up is meant to keep the door operating and reduce the chance of a later repair or a safety problem. It is not a substitute for a broken spring or a door that is off its track.",
  },
  {
    id: "commercial",
    number: "06",
    title: "Commercial Garage Doors",
    href: "/commercial",
    cta: "Talk through a commercial door",
    image: "/media/comm-1.webp",
    imageAlt: "Commercial garage door from the company gallery",
    summary: "Taller openings, higher cycle counts, and operators built for a workday.",
    detail:
      "Commercial work on the current site includes insulated and non-insulated doors, custom doors described up to 20 feet high, and operators: high-cycle springs, trolley, and shaft drive. They design, install, and service. Pricing is by the opening — request an estimate rather than assuming a residential package price.",
  },
];

export type Symptom = {
  id: string;
  title: string;
  guidance: string;
  href: string;
  cta: string;
};

export const symptoms: Symptom[] = [
  {
    id: "wont-open",
    title: "The door will not open.",
    guidance:
      "A door that will not lift can be an opener, a spring, a lock, or something in the track. Do not keep triggering the opener if the door is stuck — you can burn the motor or pull hardware loose. This is not a diagnosis. A technician needs to see it.",
    href: "/repair",
    cta: "Repair services",
  },
  {
    id: "wont-close",
    title: "The door will not close.",
    guidance:
      "Doors that reverse or stop on the way down are often reacting to the photo eyes, the floor, or the close-force setting. Wipe the sensors and check for an obstruction, then stop experimenting. Forcing the close can damage the door or the opener.",
    href: "/repair",
    cta: "Repair services",
  },
  {
    id: "noise",
    title: "The door is making unusual noises.",
    guidance:
      "New grinding, popping, or a single loud bang is worth a call. A bang can be a spring letting go. Rollers and hinges also get loud as they dry out. A tune-up addresses wear; a bang or a door that suddenly feels twice as heavy needs a repair visit, not lubricant alone.",
    href: "/repair#maintenance",
    cta: "Tune-ups and repair",
  },
  {
    id: "crooked",
    title: "The door appears crooked or off track.",
    guidance:
      "Stop using it. An off-track door can jump the rollers, and running the opener makes that worse. Do not try to hammer the track back or lift the door by hand if a side looks unsupported. Call and describe which side dropped.",
    href: "/repair",
    cta: "Off-track repair",
  },
  {
    id: "opener",
    title: "The opener or remote is not working.",
    guidance:
      "Start with the simple checks: power, a tripped outlet, a dead remote battery, and the wall button. If the light and wall button are dead, or the trolley moves and the door does not, it is past a battery. The company services remotes, keypads, and full opener replacements.",
    href: "/repair#openers",
    cta: "Openers and remotes",
  },
  {
    id: "spring",
    title: "A spring or cable appears damaged.",
    guidance:
      "Do not operate the door, and do not attempt to adjust, wind, or disconnect springs or cables. They are under high tension and can cause serious injury. A gap in the spring, a cable off the drum, or a door that feels suddenly heavy are reasons to leave it parked and call.",
    href: "/repair#springs",
    cta: "Spring replacement",
  },
  {
    id: "impact",
    title: "The door has been hit or damaged.",
    guidance:
      "If a panel is bowed, a track is bent, or the door sits twisted in the opening, leave it down if it is stable and do not cycle it. An unstable door — one that is hanging, binding, or able to fall — should not be operated at all. The company repairs panels and replaces doors when a repair is not the right fix.",
    href: "/repair",
    cta: "Damage and repair",
  },
];

export const offers = [
  {
    name: "Garage door tune-up",
    price: "$125",
    includes: "Listed as including tax and labor. Described as a full tune-up.",
  },
  {
    name: "Dual spring change",
    price: "$350",
    includes: "Listed as including tax and labor, with a 10-year warranty on this service.",
  },
  {
    name: "Torque tubes",
    price: "$450",
    includes: "Published as a line item. Ask what the price covers for your door size.",
  },
  {
    name: "Garage door motor",
    price: "$700",
    includes: "Listed as a 7' Genie 2028 belt drive, 2 remotes, and a keypad.",
  },
] as const;

export const reviews = [
  {
    name: "Teresa Hamblin",
    stars: 5,
    text: "Most recent use: Corbin was polite, professional, and efficient. We replaced our motor, sensors for our garage-door opener. Pricing was fair. Appointment was prompt. I would not search anywhere else for help with garage issues. Prior use: Rob was knowledgeable, friendly, competent, and a good educator. I was able to get an appointment in a timely manner. Recommend this company.",
  },
  {
    name: "Gary",
    stars: 5,
    place: "Eagle",
    text: "Had a door fail on the day of my marriage with my car inside. Kevin was booked but found a way to get to my problem the same day. Personalized service! They always do a great job and are professional in their dealings. Highly recommend THE GARAGE STORE.",
  },
  {
    name: "Tod Jenkins",
    stars: 5,
    text: "Was very fast and efficient. Like how they text you when the technician is on their way and also a picture of the technician is included in the text.",
  },
  {
    name: "Don Massey",
    stars: 5,
    text: "Corbin came and assessed what was needed to replace our broken spring. He had the garage door repaired within an hour. He was prompt and efficient.",
  },
  {
    name: "Jan Shipman",
    stars: 5,
    text: "The Garage Door Store team were efficient, courteous, and quick. I could not ask for better communication with Jay. He understood my needs from start to finish. He and his crew were Amazing!",
  },
  {
    name: "Jonathan Young",
    stars: 5,
    text: "They responded very quickly when our garage door needed emergency replacement. They had a new door in place just a few days later.",
  },
  {
    name: "Micheal Adcox",
    stars: 5,
    text: "Quick and easy to schedule and very fairly priced.",
  },
  {
    name: "Matt Roll",
    stars: 5,
    text: "Fast service and great price!!",
  },
  {
    name: "Bill Hutchinson",
    stars: 5,
    text: "The best!",
  },
] as const;

/** Names published on the Our Team page. The group photo is unlabeled, so faces are not matched to names. */
export const teamNames = ["Kevin", "Rob", "Scott", "Brent", "Corbin", "Jay"] as const;

export const brands = [
  { name: "Clopay", src: "/media/brand-clopay.webp" },
  { name: "Genie", src: "/media/brand-genie.webp" },
  { name: "LiftMaster", src: "/media/brand-liftmaster.webp" },
  { name: "Wayne Dalton", src: "/media/brand-wayne.webp" },
] as const;

export type NavItem = {
  label: string;
  href: string;
  links?: { label: string; href: string; note?: string }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    links: [{ label: "Our Team", href: "/about#team" }],
  },
  {
    label: "Services",
    href: "/doors",
    links: [
      { label: "Steel Garage Doors", href: "/doors/steel" },
      { label: "Carriage Garage Doors", href: "/doors/carriage" },
      { label: "Wood Garage Doors", href: "/doors/wood-grain" },
      { label: "Standard Garage Doors", href: "/doors/standard" },
      { label: "Commercial Garage Doors", href: "/commercial" },
      { label: "Garage Door Installation", href: "/installation" },
      { label: "Garage Door Repair", href: "/repair" },
      { label: "Spring Replacement", href: "/repair#springs" },
      { label: "Garage Door Openers", href: "/repair#openers" },
    ],
  },
  {
    label: "Gallery",
    href: "/work",
    links: [{ label: "Recent Projects", href: "/work#recent" }],
  },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export function galleryItems() {
  return doorStyles.flatMap((style) =>
    style.images.map((img, index) => ({
      ...img,
      style: style.title,
      slug: style.slug,
      id: `${style.slug}-${index}`,
    })),
  );
}
