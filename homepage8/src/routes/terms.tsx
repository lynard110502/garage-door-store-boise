import { createFileRoute, Link } from "@tanstack/react-router";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms · Garage Door Store Boise" },
      {
        name: "description",
        content: "How a quote request works with Garage Door Store Boise. A request is not a contract until the shop confirms it.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="band cream" id="main">
      <div className="wrap" style={{ display: "grid", gap: "0.9rem", maxWidth: "40rem" }}>
        <p className="kicker">Terms</p>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)" }}>A quote is not the job.</h1>
        <p className="dek">
          Asking for a free quote, or mentioning the advertised 10% off, does not book the work. The shop confirms
          the price, the door, and the appointment before anything is installed or repaired.
        </p>
        <p className="dek">
          Published prices on this page — the $125 tune-up, the $350 dual spring change, the $450 torque tubes, and
          the $700 Genie 2028 package — come from the shop’s own site. Ask them to confirm the current coupon
          before you count on it.
        </p>
        <p className="dek">
          The door preview is a look, not a measured order. Color, windows, and hardware on screen are not a
          promise of stock. Photos of installs belong to Garage Door Store Boise.
        </p>
        <p>
          <a className="btn btn-red" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
        </p>
        <p>
          <Link to="/">Back to the door</Link>
        </p>
      </div>
    </main>
  );
}
