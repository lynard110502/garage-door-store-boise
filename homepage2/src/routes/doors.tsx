import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/doors")({
  component: () => <Outlet />,
});
