import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Garage Door Store Boise, Idaho Site" },
      {
        name: "description",
        content: "Terms for this Garage Door Store Boise redesign. Using the page does not hire the shop or create a repair agreement. Call 208-514-2871 to book now.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="kicker">Garage Door Store · Boise</p>
      <h1 className="mt-3 text-4xl font-bold">Terms of use</h1>
      <p className="mt-4 text-muted">
        This website is a redesign of the homepage for Garage Door Store Boise. Reading it, or filling out the form, does not hire the shop and does not create a repair agreement.
      </p>
      <h2 className="mt-8 text-2xl font-bold">Quotes</h2>
      <p className="mt-3 text-muted">
        Posted prices are copied from garagedoorstoreboise.com: tune-up $125, dual spring change $350, torque tubes $450, and a Genie opener package at $700. A different door can cost something else. Call 208-514-2871 for a phone estimate.
      </p>
      <h2 className="mt-8 text-2xl font-bold">Service area</h2>
      <p className="mt-3 text-muted">
        The cities named here are the ones the shop lists: Boise, Garden City, Meridian, Eagle, Nampa, Star, Caldwell, Middleton, Homedale, Kuna, Bowmont, and Melba.
      </p>
      <p className="mt-6">
        <Link to="/" className="font-semibold text-ink">
          Back to garage door repair in Boise
        </Link>
      </p>
    </main>
  );
}
