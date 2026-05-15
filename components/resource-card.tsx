import type { Resource } from "@/lib/types";

export function ResourceCard({
  resource,
  onSelect,
}: {
  resource: Resource;
  onSelect?: (r: Resource) => void;
}) {
  return (
    <article
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:border-slate-300 hover:shadow-md"
      onClick={() => onSelect?.(resource)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(resource); } }}
      tabIndex={0}
      role="button"
      aria-label={`${resource.name} – ${resource.category}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {resource.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {resource.name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {resource.lastUpdated}
        </span>
      </div>

      {resource.description ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {resource.description}
        </p>
      ) : null}

      <div className="mt-4 space-y-1 text-sm text-slate-700">
        {resource.address ? <p>{resource.address}</p> : null}
        {resource.hours ? <p>{resource.hours}</p> : null}
        {resource.phone ? <p>{resource.phone}</p> : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
