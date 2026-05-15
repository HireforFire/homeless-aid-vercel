"use client";

import { useEffect, useRef } from "react";
import type { Resource } from "@/lib/types";

function directionsUrl(r: Resource): string {
  const addr = [r.address, r.city, r.state, r.zip].filter(Boolean).join(", ");
  if (addr) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`;
}

export function ResourceDetail({
  resource,
  onClose,
}: {
  resource: Resource;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    el.showModal();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      if (e.target === el) onClose();
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [onClose]);

  return (
    <dialog
      ref={dialog}
      className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-0 shadow-soft backdrop:bg-black/40"
      onClick={(e) => { if (e.target === dialog.current) onClose(); }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {resource.category}
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{resource.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-200"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{resource.description}</p>

        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <p className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-slate-400">📍</span>
            <span>{resource.address}, {resource.city}, {resource.state} {resource.zip}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="shrink-0 text-slate-400">🕐</span>
            <span>{resource.hours}</span>
          </p>
          {resource.phone ? (
            <p className="flex items-center gap-2">
              <span className="shrink-0 text-slate-400">📞</span>
              <a href={`tel:${resource.phone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-2 hover:text-slate-900">
                {resource.phone}
              </a>
            </p>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-400">Last updated {resource.lastUpdated}</p>

        <div className="mt-5 flex gap-3">
          <a
            href={directionsUrl(resource)}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
          {resource.phone ? (
            <a
              href={`tel:${resource.phone.replace(/[^\d+]/g, "")}`}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900"
            >
              Call
            </a>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
