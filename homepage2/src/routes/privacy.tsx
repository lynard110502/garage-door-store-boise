import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/pages";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy — Garage Door Store Boise" }],
  }),
  component: PrivacyPage,
});
