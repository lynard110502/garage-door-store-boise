import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/pages";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Garage Door Store Boise" },
      { name: "description", content: "Gallery of wood grain, planked, modern, glass, carriage, traditional, custom, and commercial garage doors." },
    ],
  }),
  component: WorkPage,
});
