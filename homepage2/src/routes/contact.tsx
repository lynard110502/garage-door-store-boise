import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Garage Door Store Boise" },
      { name: "description", content: "Call 208-514-2871 or email an estimate request to Garage Door Store Boise." },
    ],
  }),
  component: ContactPage,
});
