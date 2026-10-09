export const PHONE_DISPLAY = "(208) 514-2871";
export const PHONE_TEL = "tel:2085142871";
export const EMAIL = "boisedoors@gmail.com";
export const ADDRESS = "9075 W Hackamore Dr, Boise, ID 83709";
export const MAPS_URL = "https://maps.app.goo.gl/etDP5sgoajZEjkiAA";
export const GOOGLE_REVIEWS = "https://share.google/HfhMwmGjn87lEebDp";
export const ORIGIN = "https://garagedoorstoreboise.com";
export const INSTAGRAM = "https://www.instagram.com/gdsboise/";
export const FACEBOOK = "https://www.facebook.com/garagedoorstoreboise/";

export const cities = [
  { name: "Boise", href: `${ORIGIN}/` },
  { name: "Meridian", href: `${ORIGIN}/meridian-id-garage-doors/` },
  { name: "Eagle", href: `${ORIGIN}/eagle-id-garage-doors/` },
  { name: "Nampa", href: `${ORIGIN}/nampa-id-garage-doors/` },
  { name: "Star", href: `${ORIGIN}/star-id-garage-doors/` },
  { name: "Caldwell", href: `${ORIGIN}/caldwell-id-garage-doors/` },
  { name: "Middleton", href: `${ORIGIN}/middleton-id-garage-doors/` },
  { name: "Kuna", href: `${ORIGIN}/kuna-id-garage-doors/` },
  { name: "Homedale", href: `${ORIGIN}/homedale-id-garage-doors/` },
  { name: "Melba", href: `${ORIGIN}/melba-id-garage-doors/` },
  { name: "Bowmont", href: `${ORIGIN}/bowmont-id-garage-doors/` },
  { name: "Garden City", href: `${ORIGIN}/about-us/` },
] as const;

export const services = [
  {
    id: "repair",
    num: "01",
    title: "Garage Door Repair",
    kicker: "Garage door repair Boise",
    copy: "Off-track doors, cables, rollers, panels, and openers that quit. Residential and commercial. The shop says springs, off-track doors, and maintenance can be handled the same day you call.",
    href: `${ORIGIN}/garage-door-repair/`,
    image: "/media/team.webp",
    alt: "Garage Door Store Boise technicians and red trucks on a Treasure Valley job",
  },
  {
    id: "doors",
    num: "02",
    title: "Garage Door Installation",
    kicker: "Garage door installation Boise",
    copy: "Steel, standard, carriage, wood, and commercial overhead doors. Installed and checked so the house stays secure and the door actually cycles.",
    href: `${ORIGIN}/garage-door-installation/`,
    image: "/media/door1.webp",
    alt: "Three white garage doors installed on a Treasure Valley home",
  },
  {
    id: "openers",
    num: "03",
    title: "Garage Door Openers",
    kicker: "Garage door openers Boise",
    copy: "Belt and chain drives, including the published 7-foot Genie 2028 package with two remotes and a keypad. The opener page lists a lifetime motor and belt warranty on the TriloG Pro series.",
    href: `${ORIGIN}/garage-openers-remotes/`,
    image: "/media/door5.webp",
    alt: "Genie garage door opener",
  },
  {
    id: "springs",
    num: "04",
    title: "Spring & Hardware Service",
    kicker: "Garage door springs Boise",
    copy: "A broken torsion spring is why many doors stop dead. Dual spring change is published at $350 with tax, labor, and a 10-year warranty on that coupon. Torque tubes are listed at $450.",
    href: `${ORIGIN}/garage-door-spring-replacement/`,
    image: "/media/hero-bg.webp",
    alt: "Close view of a wood-grain garage door",
  },
  {
    id: "maintenance",
    num: "05",
    title: "Garage Door Maintenance",
    kicker: "Garage door service Boise",
    copy: "The published tune-up is $125, tax and labor included. A full service visit to keep the door cycling before a small issue becomes a stranded car.",
    href: `${ORIGIN}/garage-door-repair/`,
    image: "/media/steel.webp",
    alt: "Pair of white carriage-style garage doors",
  },
] as const;

export const projects = [
  {
    id: "p1",
    cat: "Garage door installation",
    title: "Three-bay steel",
    place: "Treasure Valley",
    copy: "A clean three-car install. Standard panels, matched trim, set into a newer Boise-area front.",
    image: "/media/door1.webp",
    alt: "Three white garage doors on a modern home",
  },
  {
    id: "p2",
    cat: "Garage door replacement",
    title: "Wood in stone",
    place: "Boise area",
    copy: "A wood door reset in a stone surround, with lighting kept on the slab instead of the hardware.",
    image: "/media/door4.webp",
    alt: "Wood garage door set in a stone wall at dusk",
  },
  {
    id: "p3",
    cat: "Opener installation",
    title: "Belt-drive head",
    place: "Shop package",
    copy: "Genie hardware the shop stocks and installs, including remotes and a keypad on the published motor package.",
    image: "/media/door5.webp",
    alt: "Genie garage door opener motor",
  },
  {
    id: "p4",
    cat: "Carriage doors",
    title: "Hardware and glass",
    place: "Treasure Valley",
    copy: "Carriage-style door with windows and strap hardware, installed as one system.",
    image: "/media/door3.webp",
    alt: "Beige carriage garage door with windows and black hardware",
  },
  {
    id: "p5",
    cat: "Wood doors",
    title: "Paired bays",
    place: "Boise area",
    copy: "Two wood doors on a painted house. Same profile, same reveal, both sides of the driveway.",
    image: "/media/house.webp",
    alt: "Two wood garage doors on a blue house",
  },
] as const;

export const reviews = [
  {
    quote:
      "Corbin came and assessed what was needed to replace our broken spring. He had the garage door repaired within an hour. He was prompt and efficient.",
    name: "Don Massey",
    place: "Posted on Google",
  },
  {
    quote:
      "Had a door fail on the day of my marriage with my car inside. Kevin was booked but found a way to get to my problem the same day. Personalized service! They always do a great job and are professional in their dealings. Highly recommend THE GARAGE STORE.",
    name: "Gary",
    place: "Eagle · Posted on Google",
  },
  {
    quote:
      "The Garage Door Store team were efficient, courteous, and quick. I could not ask for better communication with Jay. He understood my needs from start to finish. He and his crew were Amazing!",
    name: "Jan Shipman",
    place: "Posted on Google",
  },
  {
    quote:
      "Was very fast and efficient. Like how they text you when the technician is on their way and also a picture of the technician is included in the text.",
    name: "Tod Jenkins",
    place: "Posted on Google",
  },
  {
    quote:
      "They responded very quickly when our garage door needed emergency replacement. They had a new door in place just a few days later.",
    name: "Jonathan Young",
    place: "Posted on Google",
  },
  {
    quote:
      "Most recent use: Corbin was polite, professional, and efficient. We replaced our motor, sensors for our garage-door opener. Pricing was fair. Appointment was prompt. I would not search anywhere else for help with garage issues. Prior use: Rob was knowledgeable, friendly, competent, and a good educator. I was able to get an appointment in a timely manner. Recommend this company.",
    name: "Teresa Hamblin",
    place: "Posted on Google",
  },
  {
    quote: "Quick and easy to schedule and very fairly priced.",
    name: "Micheal Adcox",
    place: "Posted on Google",
  },
  {
    quote: "Fast service and great price!!",
    name: "Matt Roll",
    place: "Posted on Google",
  },
  {
    quote: "The best!",
    name: "Bill Hutchinson",
    place: "Posted on Google",
  },
] as const;

export const ours = [
  "Professional service",
  "Straightforward recommendations",
  "Quality workmanship",
  "Local expertise",
  "Customer-focused experience",
] as const;

export const typical = [
  "Generic service",
  "Unclear recommendations",
  "Inconsistent workmanship",
  "Impersonal experience",
  "One-size-fits-all approach",
] as const;
