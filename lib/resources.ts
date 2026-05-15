import type { Resource } from "./types";
import { getResources } from "@/lib/data";

export function getResourcesByCategory(category?: string, regionSlug?: string) {
  const resources = regionSlug ? getResources(regionSlug) : [];
  if (!category || category === "All") return resources;
  return resources.filter((item) => item.category === category);
}

export function searchResources(query: string, category?: string, regionSlug?: string) {
  const q = query.trim().toLowerCase();
  return getResourcesByCategory(category, regionSlug).filter((item) => {
    const haystack = [
      item.name,
      item.category,
      item.description,
      item.address,
      item.city,
      item.state,
      item.zip,
      item.hours,
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase();
    return q.length === 0 || haystack.includes(q);
  });
}
