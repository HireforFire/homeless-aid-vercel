"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { getAllRegions } from "@/lib/regions";
import type { Region } from "@/lib/types";

export function RegionPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  const regions = useMemo(() => getAllRegions(), []);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = regions.find((r) => r.slug === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 shadow-soft"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-slate-400">📍</span>
        <span className="flex-1 truncate">{current?.name ?? "Select region"}</span>
        <span className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open ? (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-2xl border border-slate-200 bg-white shadow-soft"
          role="listbox"
        >
          {regions.map((r) => (
            <button
              key={r.slug}
              type="button"
              role="option"
              aria-selected={r.slug === value}
              onClick={() => {
                onChange(r.slug);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${
                r.slug === value
                  ? "bg-slate-900 font-semibold text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex-1">
                <span className="font-medium">{r.name}</span>
                <span className="ml-2 text-xs text-inherit opacity-60">
                  {r.resourceCount} resources
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
