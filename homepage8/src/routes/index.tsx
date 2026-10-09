import { createFileRoute } from "@tanstack/react-router";
import { BrandPage } from "@/components/brand/page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garage Doors Done Right | Garage Door Store Boise" },
      {
        name: "description",
        content:
          "Garage Door Store Boise. Garage doors, openers, repairs, and upgrades for Boise homes. Family-owned, 30+ years. Call (208) 514-2871 or request a free quote.",
      },
    ],
  }),
  component: BrandPage,
});
