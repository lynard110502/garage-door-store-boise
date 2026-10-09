import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Garage Door Store of Boise, Idaho" },
      {
        name: "description",
        content: "Privacy policy for this Garage Door Store Boise redesign. The quote form stays in your browser and is not sent to the shop at 9075 W Hackamore Dr.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="kicker">Garage Door Store · Boise</p>
      <h1 className="mt-3 text-4xl font-bold">Privacy policy</h1>
      <p className="mt-4 text-muted">
        This page covers the redesign of Garage Door Store Boise. The quote form does not send your note to the shop and does not store it. To reach the shop, call 208-514-2871 or use the email link in the footer.
      </p>
      <h2 className="mt-8 text-2xl font-bold">What you can enter</h2>
      <p className="mt-3 text-muted">
        The form asks for a name, a phone number, a city, a service, and a short note. Those fields stay in the browser long enough to show a thank-you message. Refreshing the page clears them.
      </p>
      <h2 className="mt-8 text-2xl font-bold">The real shop</h2>
      <p className="mt-3 text-muted">
        Garage Door Store Boise, Inc. publishes its shop at 9075 W Hackamore Dr, Boise, ID 83709. This preview does not add an account, a newsletter, or an analytics tag.
      </p>
      <p className="mt-6">
        <Link to="/" className="font-semibold text-ink">
          Back to garage door repair in Boise
        </Link>
      </p>
    </main>
  );
}
