import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/shell";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy · Garage Door Store Boise" },
      {
        name: "description",
        content: "How this Garage Door Store Boise page handles the estimate form and contact details.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteChrome>
      <main id="main" className="section">
        <div className="wrap story-copy">
          <p className="kicker">Privacy</p>
          <h1 className="text-5xl">What this page keeps.</h1>
          <p className="lede">
            The estimate form does not store your name, phone, or job notes on a server. Submitting it opens an
            email to {EMAIL} in your own mail app. If that draft does not open, call {PHONE_DISPLAY}.
          </p>
          <p className="lede">
            The live open/closed badge uses your device clock and the shop’s published hours. It is not sent
            anywhere. Embedded Google Maps is loaded from Google when you reach the service-area section.
          </p>
          <p>
            <a className="btn btn-ink" href={PHONE_TEL}>
              Call the shop
            </a>
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
