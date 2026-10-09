import { createFileRoute } from "@tanstack/react-router";
import { RepairPage } from "@/components/pages";

export const Route = createFileRoute("/repair")({
  head: () => ({
    meta: [
      { title: "Garage Door Repair — Boise" },
      { name: "description", content: "Garage door repair, spring replacement, openers, and tune-ups from Garage Door Store Boise. Call 208-514-2871." },
    ],
  }),
  component: RepairPage,
});
