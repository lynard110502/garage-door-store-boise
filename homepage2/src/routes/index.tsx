import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garage Door Store Boise — Repair & New Doors" },
      {
        name: "description",
        content:
          "Garage door repair, new doors, and installation for Boise and the Treasure Valley. Family-owned Garage Door Store Boise. Call 208-514-2871.",
      },
    ],
  }),
  component: HomePage,
});
