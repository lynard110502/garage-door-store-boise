import { createFileRoute } from "@tanstack/react-router";
import { DoorsPage } from "@/components/pages";

export const Route = createFileRoute("/doors/")({
  head: () => ({
    meta: [
      { title: "Garage Door Styles — Garage Door Store Boise" },
      {
        name: "description",
        content:
          "Wood grain, planked, modern, glass, carriage, traditional, custom, and commercial doors from the Boise gallery.",
      },
    ],
  }),
  component: DoorsPage,
});
