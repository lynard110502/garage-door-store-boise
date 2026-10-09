export const PHONE_DISPLAY = "208-514-2871";
export const PHONE_TEL = "tel:208-514-2871";
export const EMAIL = "boisedoors@gmail.com";
export const ADDRESS = "9075 W Hackamore Dr, Boise, ID 83709";
export const MAP_SRC =
  "https://maps.google.com/maps?q=9075+W+Hackamore+Dr,+Boise,+ID+83709&z=15&output=embed";

export const cities = [
  "Boise",
  "Garden City",
  "Meridian",
  "Eagle",
  "Nampa",
  "Star",
  "Caldwell",
  "Middleton",
  "Kuna",
  "Homedale",
  "Bowmont",
  "Melba",
] as const;

export const services = [
  {
    id: "repair",
    title: "Repair",
    kicker: "Residential & commercial",
    blurb:
      "Off-track doors, panels, cables, sensors, and openers that quit. We cover automatic, commercial, and panel repairs — jobs big and small.",
    image: "/media/team.webp",
    alt: "Garage Door Store Boise technicians with red service trucks",
  },
  {
    id: "springs",
    title: "Springs",
    kicker: "Same-day when you call",
    blurb:
      "A snapped spring is dangerous to run. Dual spring changes are $350 with tax, labor, and a 10-year warranty. Torque tubes are $450.",
    image: "/media/g5.webp",
    alt: "Walnut carriage-style garage door",
  },
  {
    id: "doors",
    title: "New doors",
    kicker: "Carriage, wood, steel",
    blurb:
      "Custom carriage, wood, steel, standard, and commercial doors from Wayne Dalton, Clopay, and more. Installed with a full safety check.",
    image: "/media/g1.webp",
    alt: "Carriage garage doors with iron scroll windows in Kuna",
  },
  {
    id: "openers",
    title: "Openers",
    kicker: "Genie & LiftMaster",
    blurb:
      "Wall-mount and overhead belt or chain drives sized for the door. A 7' Genie 2028 belt drive with two remotes and a keypad is $700.",
    image: "/media/g10.webp",
    alt: "Contemporary black glass garage doors",
  },
] as const;

export const coupons = [
  {
    id: "tune",
    price: "$125",
    title: "Garage door tune-up",
    detail: "Includes tax & labor. Full tune-up.",
    service: "Tune-up",
  },
  {
    id: "spring",
    price: "$350",
    title: "Dual spring change",
    detail: "Tax & labor included. 10-year warranty. Torque tubes $450.",
    service: "Spring replacement",
  },
  {
    id: "motor",
    price: "$700",
    title: "Garage door motor",
    detail: "7' Genie 2028 belt drive, 2 remotes, and a keypad.",
    service: "Opener replacement",
  },
] as const;

export const doors = [
  {
    src: "/media/g1.webp",
    title: "Iron-scroll carriage",
    place: "Kuna",
    style: "Carriage",
    alt: "Double carriage doors with decorative iron windows on a brick home in Kuna",
  },
  {
    src: "/media/g7.webp",
    title: "Cedar plank, three bay",
    place: "Spring Mountain",
    style: "Modern",
    alt: "Three modern wood plank garage doors with frosted lights",
  },
  {
    src: "/media/photo5.webp",
    title: "Stone-framed carriage",
    place: "Treasure Valley",
    style: "Carriage",
    alt: "Warm wood carriage door set in a stacked-stone wall",
  },
  {
    src: "/media/g8.webp",
    title: "Mid-century plank",
    place: "Foothills",
    style: "Modern",
    alt: "Horizontal wood garage door on a gray mid-century house",
  },
  {
    src: "/media/steel.webp",
    title: "White raised-panel steel",
    place: "Boise",
    style: "Steel",
    alt: "Pair of white steel garage doors with arched windows",
  },
  {
    src: "/media/g3.webp",
    title: "Cabin carriage",
    place: "Mountain",
    style: "Carriage",
    alt: "Wood carriage door on a snowy cabin",
  },
  {
    src: "/media/g10.webp",
    title: "Black glass modern",
    place: "Boise",
    style: "Modern",
    alt: "Black aluminum and glass garage doors on a modern barn",
  },
  {
    src: "/media/photo4.webp",
    title: "Navy house pair",
    place: "Boise",
    style: "Wood",
    alt: "Two wood-look garage doors on a navy blue house",
  },
  {
    src: "/media/g2.webp",
    title: "Gray modern with lights",
    place: "Boise",
    style: "Modern",
    alt: "Gray wood-grain modern door with a column of windows",
  },
  {
    src: "/media/g5.webp",
    title: "Walnut carriage",
    place: "Treasure Valley",
    style: "Carriage",
    alt: "Walnut carriage garage door with black hardware",
  },
  {
    src: "/media/g12.webp",
    title: "Classic window grid",
    place: "Boise",
    style: "Steel",
    alt: "Gray insulated steel door with a grid of windows",
  },
  {
    src: "/media/g4.webp",
    title: "Matched carriage pair",
    place: "Treasure Valley",
    style: "Carriage",
    alt: "Two matching brown carriage doors with window tops",
  },
] as const;

export const reviews = [
  {
    name: "Matt Roll",
    text: "Fast service and great price!!",
  },
  {
    name: "Bill Hutchinson",
    text: "The best!",
  },
  {
    name: "Tod Jenkins",
    text: "Was very fast and efficient. Like how they text you when the technician is on their way and also a picture of the technician is included in the text.",
  },
  {
    name: "Jonathan Young",
    text: "They responded very quickly when our garage door needed emergency replacement. They had a new door in place just a few days later.",
  },
  {
    name: "Micheal Adcox",
    text: "Quick and easy to schedule and very fairly priced.",
  },
  {
    name: "Don Massey",
    text: "Corbin came and assessed what was needed to replace our broken spring. He had the garage door repaired within an hour. He was prompt and efficient.",
  },
  {
    name: "Teresa Hamblin",
    text: "Corbin was polite, professional, and efficient. We replaced our motor and sensors. Pricing was fair. I would not search anywhere else for help with garage issues.",
  },
  {
    name: "Gary",
    place: "Eagle",
    text: "Had a door fail on the day of my marriage with my car inside. Kevin was booked but found a way to get to my problem the same day. Personalized service!",
  },
  {
    name: "Jan Shipman",
    text: "The Garage Door Store team were efficient, courteous, and quick. I could not ask for better communication with Jay. He and his crew were amazing.",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Call for a set price",
    text: "Tell us what’s wrong. We quote by phone — set pricing, no surprise add-ons — and book the visit.",
  },
  {
    n: "02",
    title: "We text on the way",
    text: "You get a text when the technician leaves, with a photo of who’s coming to the house.",
  },
  {
    n: "03",
    title: "Same-day when it counts",
    text: "Springs, openers, off-track doors, and tune-ups are often finished the day you call. A tech is on the line 24/7.",
  },
  {
    n: "04",
    title: "Door checked, job done",
    text: "We balance, test safety eyes, and walk the door with you. Dual spring work carries a 10-year warranty.",
  },
] as const;

export const faqs = [
  {
    q: "When should I replace the door instead of repairing it?",
    a: "Replace it if it hasn’t run right for a while, it’s old, you’ve had a break-in, it lacks child-safety features, or the door is severely damaged. Don’t force a broken door — call a trained tech.",
  },
  {
    q: "Can I install a garage door myself?",
    a: "No. Installation needs the right tools and training. A bad install can damage a new door and compromise the safety of the home. We install carriage, wood, steel, standard, and commercial doors, then run a safety check.",
  },
  {
    q: "What is a tune-up?",
    a: "A $125 full tune-up (tax and labor included) is the cheapest way to keep the door quiet, aligned, and safer — and to avoid a bigger repair later.",
  },
  {
    q: "Why did my door stop?",
    a: "Common causes: blocked photo eyes, a dead remote battery, a broken torsion spring, limits that need adjusting, something in the path, or a track that’s out of line. If a spring or cable snapped, stop using the door and call.",
  },
  {
    q: "How fast can you get to my house?",
    a: "Spring changes, opener replacement, doors off track, and tune-ups can be done the same day you call. If you need technical help first, a technician answers 24/7.",
  },
  {
    q: "What happens before the technician leaves?",
    a: "We text when the tech is on the way, and the text includes a photo of who’s coming. You approve the set price before work starts.",
  },
] as const;

export const reasons = [
  "Licensed, bonded & insured",
  "Free in-home estimate",
  "Family owned in Boise",
  "Over 30 years",
  "Set pricing, no add-ons",
  "Technicians 24/7",
] as const;

export const brands = [
  { src: "/media/wayne.webp", alt: "Wayne Dalton" },
  { src: "/media/clopay.webp", alt: "Clopay" },
  { src: "/media/genie.webp", alt: "Genie" },
  { src: "/media/liftmaster.webp", alt: "LiftMaster" },
] as const;

export const symptoms = [
  { n: "01", label: "Door will not open", service: "Repair" },
  { n: "02", label: "Door will not close", service: "Repair" },
  { n: "03", label: "Loud bang, then stuck", service: "Spring replacement" },
  { n: "04", label: "Crooked or off track", service: "Repair" },
  { n: "05", label: "Grinding or squealing", service: "Tune-up" },
  { n: "06", label: "Opener will not respond", service: "Opener replacement" },
  { n: "07", label: "I hit it with the car", service: "Repair" },
  { n: "08", label: "Need a new garage door", service: "New door" },
] as const;

export const slides = [
  {
    label: "Garage Door Repair",
    title: "Find the fault. Quote it. Then fix it.",
    text: "Springs, cables, rollers, tracks, and panels. You see the problem and the set price before a wrench comes out.",
    image: "/media/svc-repair.jpg",
    alt: "A garage door with a cracked panel and a spring that needs repair",
    service: "Repair",
  },
  {
    label: "Garage Door Installation",
    title: "A door that fits the house.",
    text: "Carriage, wood, steel, and commercial doors, set level and safety-checked before we leave.",
    image: "/media/svc-install.jpg",
    alt: "Newly installed wood carriage garage doors on a house",
    service: "New door",
  },
  {
    label: "Garage Door Openers",
    title: "A quieter, safer opener.",
    text: "Genie and LiftMaster belt or chain drives. A 7' Genie 2028 with two remotes and a keypad is $700.",
    image: "/media/svc-opener.jpg",
    alt: "A belt-drive garage door opener on a garage ceiling",
    service: "Opener replacement",
  },
  {
    label: "Emergency Help",
    title: "When the door quits today.",
    text: "Springs, off-track doors, and dead openers are often finished the day you call. A technician answers 24 hours.",
    image: "/media/svc-emergency.jpg",
    alt: "A garage door stuck halfway open at dusk",
    service: "Spring replacement",
  },
] as const;

/** Published Treasure Valley ZIPs we can confirm. Unknown ZIPs get a call, not a hard no. */
export const zips: Record<string, (typeof cities)[number]> = {
  "83701": "Boise",
  "83702": "Boise",
  "83703": "Boise",
  "83704": "Boise",
  "83705": "Boise",
  "83706": "Boise",
  "83709": "Boise",
  "83712": "Boise",
  "83713": "Boise",
  "83714": "Garden City",
  "83716": "Boise",
  "83642": "Meridian",
  "83646": "Meridian",
  "83616": "Eagle",
  "83651": "Nampa",
  "83686": "Nampa",
  "83687": "Nampa",
  "83605": "Caldwell",
  "83607": "Caldwell",
  "83634": "Kuna",
  "83669": "Star",
  "83644": "Middleton",
  "83628": "Homedale",
  "83641": "Melba",
};

export const serviceOptions = [
  "Repair",
  "Spring replacement",
  "New door",
  "Opener replacement",
  "Tune-up",
  "Not sure",
] as const;
