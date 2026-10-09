import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/components/pages";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Garage Door Store Boise" },
      { name: "description", content: "Posts from the Garage Door Store Boise blog on repair, wood doors, and openers." },
    ],
  }),
  component: BlogPage,
});
