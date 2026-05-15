import { RegionPicker } from "./region-picker";

export function Hero({
  region,
  onRegionChange,
}: {
  region: string;
  onRegionChange: (slug: string) => void;
}) {
  return (
    <header className="space-y-4">
      <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
          Homeless Aid Finder
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
          Fast access to shelter, food, hygiene, Wi‑Fi, and supplies.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          Built for low bandwidth, mobile use, and privacy. No login. No tracking. Just nearby help.
        </p>
        <a
          href="/submit"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          + Submit a resource
        </a>
      </div>
      <RegionPicker value={region} onChange={onRegionChange} />
    </header>
  );
}
