const stats = [
  { label: "Needs covered", value: "5" },
  { label: "Offline ready", value: "Yes" },
  { label: "Login required", value: "No" },
];

export function ImpactStrip() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
