import { createFileRoute, Link } from "@tanstack/react-router";
import { DoorDetail } from "@/components/pages";
import { doorStyles } from "@/data/site";

export const Route = createFileRoute("/doors/$slug")({
  head: ({ params }) => {
    const style = doorStyles.find((s) => s.slug === params.slug);
    return {
      meta: [{ title: style ? `${style.title} — Garage Door Store Boise` : "Door style" }],
    };
  },
  component: DoorRoute,
});

function DoorRoute() {
  const { slug } = Route.useParams();
  const style = doorStyles.find((s) => s.slug === slug);
  if (!style) {
    return (
      <main className="page-main">
        <h1 className="display" style={{ fontSize: "3rem" }}>
          That style is not in the gallery.
        </h1>
        <Link to="/doors">Back to the collection</Link>
      </main>
    );
  }
  return <DoorDetail style={style} />;
}
