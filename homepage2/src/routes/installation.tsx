import { createFileRoute } from "@tanstack/react-router";
import { InstallationPage } from "@/components/pages";

export const Route = createFileRoute("/installation")({
  head: () => ({
    meta: [
      { title: "Garage Door Installation — Boise" },
      { name: "description", content: "Residential garage door installation in Boise and the Treasure Valley, including standard and carriage styles." },
    ],
  }),
  component: InstallationPage,
});
