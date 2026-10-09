import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Garage Door Store Boise" },
      { name: "description", content: "Family-owned Garage Door Store Boise. Over 30 years servicing garage doors in the Treasure Valley." },
    ],
  }),
  component: AboutPage,
});
