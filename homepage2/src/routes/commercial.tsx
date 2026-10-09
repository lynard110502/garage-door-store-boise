import { createFileRoute } from "@tanstack/react-router";
import { CommercialPage } from "@/components/pages";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Garage Doors — Boise" },
      { name: "description", content: "Commercial garage door design, installation, and service in the Treasure Valley." },
    ],
  }),
  component: CommercialPage,
});
