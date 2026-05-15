"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { ImpactStrip } from "@/components/impact-strip";
import { ResourceBrowser } from "@/components/resource-browser";

export default function Home() {
  const [region, setRegion] = useState("new-york");

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-8">
      <Hero region={region} onRegionChange={setRegion} />
      <ImpactStrip />
      <ResourceBrowser key={region} region={region} />
    </main>
  );
}
