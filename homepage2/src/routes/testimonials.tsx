import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsPage } from "@/components/pages";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Garage Door Store Boise" },
      { name: "description", content: "Customer reviews published for Garage Door Store Boise." },
    ],
  }),
  component: TestimonialsPage,
});
