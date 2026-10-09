import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { doorStyles, galleryItems } from "@/data/site";

const spans = ["s7", "s5", "s4", "s4", "s4", "s8", "s6", "s6", "s5", "s7", "s4", "s8"];

export function GalleryBrowser({ initial = "All" }: { initial?: string }) {
  const items = galleryItems();
  const filters = ["All", ...doorStyles.map((s) => s.title)];
  const [filter, setFilter] = useState(initial);
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = items.filter((item) => filter === "All" || item.style === filter);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open === null) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
  }, [open]);

  function move(dir: number) {
    if (open === null) return;
    const next = (open + dir + visible.length) % visible.length;
    setOpen(next);
  }

  const current = open === null ? null : visible[open];

  return (
    <div>
      <div className="filters" role="toolbar" aria-label="Filter projects">
        {filters.map((name) => (
          <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>
            {name}
          </button>
        ))}
      </div>
      <div className="work-grid">
        {visible.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`shot ${spans[i % spans.length]}`}
            onClick={() => setOpen(i)}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>{item.style}</span>
          </button>
        ))}
      </div>
      <dialog
        className="lightbox"
        ref={dialog}
        aria-label="Project photograph"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
      >
        {current && (
          <div className="lightbox-body">
            <img src={current.src} alt={current.alt} />
            <div className="lightbox-bar">
              <div>
                <p className="kicker">{current.style}</p>
                <p>{current.alt}</p>
              </div>
              <div className="row-actions">
                <button className="btn btn-ghost" type="button" onClick={() => move(-1)}>
                  Previous
                </button>
                <button className="btn btn-ghost" type="button" onClick={() => move(1)}>
                  Next
                </button>
                <Link className="btn btn-signal" to="/doors/$slug" params={{ slug: current.slug }}>
                  Style notes
                </Link>
                <button className="btn btn-ghost" type="button" onClick={() => setOpen(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
