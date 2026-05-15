"use client";

import { useEffect, useRef } from "react";
import type { Resource, Region } from "@/lib/types";

let leaflet: typeof import("leaflet") | null = null;

export function MapView({
  resources,
  region,
  onSelect,
}: {
  resources: Resource[];
  region?: Region;
  onSelect?: (r: Resource) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instance = useRef<{ map: L.Map; markers: L.Marker[]; cleanup: () => void } | null>(null);

  useEffect(() => {
    if (!leaflet) {
      import("leaflet").then((L) => {
        leaflet = L;
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        initMap(L);
      });
    } else {
      initMap(leaflet);
    }

    function initMap(L: typeof import("leaflet")) {
      if (!mapRef.current) return;
      if (instance.current) {
        instance.current.cleanup();
      }

      const map = L.map(mapRef.current, { zoomControl: true });
      if (region) {
        map.setView([region.lat, region.lng], region.zoom);
      } else {
        map.setView([39.9603, -75.6055], 14);
      }

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; <a href=\"https://openstreetmap.org/copyright\">OpenStreetMap</a>",
      }).addTo(map);

      const markers: L.Marker[] = resources
        .filter((r) => r.lat !== 0 || r.lng !== 0)
        .map((r) => {
        const marker = L.marker([r.lat, r.lng]).addTo(map);
        marker.bindPopup(`<b>${r.name}</b><br/>${r.category}`);
        if (onSelect) {
          marker.on("click", () => onSelect(r));
        }
        return marker;
      });

      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
      }

      instance.current = {
        map,
        markers,
        cleanup: () => {
          map.remove();
          instance.current = null;
        },
      };
    }

    return () => {
      if (instance.current) {
        instance.current.cleanup();
      }
    };
  }, [resources, region, onSelect]);

  if (resources.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500">
        No resources to show on map.
      </div>
    );
  }

  return <div ref={mapRef} className="h-72 w-full rounded-2xl shadow-soft md:h-96" />;
}
