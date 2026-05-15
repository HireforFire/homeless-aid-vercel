"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { categories } from "@/lib/types";
import { ResourceCard } from "./resource-card";
import { ResourceDetail } from "./resource-detail";
import { getRegion } from "@/lib/regions";
import type { Resource } from "@/lib/types";

const MapView = dynamic(() => import("./map-view").then((m) => ({ default: m.MapView })), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500 md:h-96">
      Loading map...
    </div>
  ),
});

export function ResourceBrowser({ region }: { region: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [showMap, setShowMap] = useState(false);
  const [selected, setSelected] = useState<Resource | null>(null);
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setAllResources([]);
    fetch(`/api/resources?region=${encodeURIComponent(region)}`)
      .then((r) => r.json())
      .then((data) => {
        setAllResources(data.resources || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [region]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allResources.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (!q) return true;
      const haystack = [item.name, item.category, item.description, item.address, item.city, item.state, item.zip, item.hours, ...item.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, allResources]);

  const regionInfo = useMemo(() => getRegion(region), [region]);

  return (
    <section className="space-y-4">
      <div className="rounded-3xl bg-white p-4 shadow-soft">
        <label className="sr-only" htmlFor="search">
          Search resources
        </label>
        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shelter, food, showers, Wi‑Fi..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={buttonClass(category === "All")}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={buttonClass(category === item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setShowMap((v) => !v)}
            className={buttonClass(showMap, true)}
          >
            {showMap ? "Hide Map" : "Show Map"}
          </button>
        </div>
      </div>

      {showMap ? (
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <MapView resources={results} region={regionInfo} onSelect={setSelected} />
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center py-12 text-slate-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <span className="ml-3">Loading resources...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} onSelect={setSelected} />
          ))}
        </div>
      )}

      {!loading && results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
          No resources match that search.
        </div>
      ) : null}

      {selected ? (
        <ResourceDetail resource={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}

function buttonClass(active: boolean, alt = false) {
  const base = "rounded-full px-4 py-2 text-sm font-semibold transition";
  if (active) {
    return alt
      ? `${base} bg-slate-700 text-white`
      : `${base} bg-slate-900 text-white`;
  }
  return `${base} bg-slate-100 text-slate-700 hover:bg-slate-200`;
}
