import { createFileRoute, Link } from "@tanstack/react-router";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy · Garage Door Store Boise" },
      {
        name: "description",
        content: "How the Garage Door Store Boise quote form handles your name and phone number.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
    <main className="band cream" id="main">
      <div className="wrap" style={{ display: "grid", gap: "0.9rem", maxWidth: "40rem" }}>
        <p className="kicker">Privacy</p>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)" }}>What this page keeps.</h1>
        <p className="dek">
          The quote form does not store your name or phone on a server. Sending it opens an email to {EMAIL} in
          your mail app. If the draft does not open, call {PHONE_DISPLAY}.
        </p>
        <p className="dek">
          A quote request is not a contract until the shop confirms the work. The map is loaded from Google when
          you reach the Boise section. A house photo you add in the door preview stays on this device.
        </p>
        <p>
          <a className="btn btn-red" href={PHONE_TEL}>
            Call the shop
          </a>
        </p>
        <p>
          <Link to="/">Back to the door</Link>
        </p>
      </div>
    </main>
    <footer className="foot">
      <div className="wrap">
        <p className="template-sign">© 2026 The Garage Door Template. All Rights Reserved. Lic# XXXXXXXX. Website design by Garage Door Marketing Lab</p>
      </div>
    </footer>
    </>
  );
}
