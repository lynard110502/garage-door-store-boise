import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garage Door Repair Boise | Garage Door Store Boise" },
      {
        name: "description",
        content:
          "Garage Door Store Boise. Garage door repair, installation, openers, and springs for Boise, Idaho and the Treasure Valley. Call (208) 514-2871 for a free estimate.",
      },
    ],
  }),
  component: HomePage,
});
