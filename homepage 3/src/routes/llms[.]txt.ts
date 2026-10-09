import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = `# Garage Door Store Boise

> Family-owned garage door repair and installation in Boise, Idaho. Over 30 years. Free in-home consultation and 10% off.

This file describes the redesign homepage. The shop’s current site is https://garagedoorstoreboise.com/.

## Business

- Name: Garage Door Store Boise, Inc.
- Phone: +1-208-514-2871
- Email: boisedoors@gmail.com
- Address: 9075 W Hackamore Dr, Boise, ID 83709
- Map: https://www.google.com/maps/place/Garage+Door+Store+Boise/@43.5945155,-116.2951392,15z
- Phone line: the shop says a technician answers 24/7. A weekly hour chart is not printed on their site.
- Licensed and insured. No license number is published.
- Brands: Wayne Dalton, LiftMaster, Clopay, Genie

## Pages on this redesign

- [Home](${origin}/): Garage door repair in Boise, posted prices, service area, reviews, and questions.
- [Privacy](${origin}/privacy): How the redesign form handles what you type.
- [Terms](${origin}/terms): Terms for this redesign preview.

## Posted prices

- Garage door tune-up: $125, tax and labor, full tune-up
- Dual spring change: $350, tax and labor, 10-year warranty
- Torque tubes: $450
- Garage door motor: $700, 7-foot Genie 2028 belt drive, 2 remotes, and a keypad

## Service area

Boise, Garden City, Meridian, Eagle, Nampa, Star, Caldwell, Middleton, Homedale, Kuna, Bowmont, and Melba.
`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
