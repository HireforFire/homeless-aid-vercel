"use client";

import { useState, type FormEvent } from "react";

const CATEGORIES = ["Shelter", "Food", "Hygiene", "Public Resources", "Clothing & Supplies"];

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      category: (form.elements.namedItem("category") as HTMLSelectElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      state: (form.elements.namedItem("state") as HTMLInputElement).value,
      zip: (form.elements.namedItem("zip") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      hours: (form.elements.namedItem("hours") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      source: (form.elements.namedItem("source") as HTMLSelectElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      agreed: (form.elements.namedItem("agreed") as HTMLInputElement).checked,
    };

    if (!data.agreed) {
      setError("You must accept the disclaimer to submit.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again later.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="text-4xl">✅</div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Thank you</h1>
          <p className="mt-3 text-slate-600">
            Your submission has been received. We&apos;ll review it and add it to the directory once verified.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Back to resources
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <header className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-soft md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
          Homeless Aid Finder
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
          Submit a resource
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-300">
          Know a shelter, food pantry, or other resource that should be listed? Let us know and
          we&apos;ll verify it before adding.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Resource name *
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">
              Street address
            </label>
            <input
              id="address"
              name="address"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              City *
            </label>
            <input
              id="city"
              name="city"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700">
              State *
            </label>
            <input
              id="state"
              name="state"
              required
              placeholder="e.g. CA"
              maxLength={2}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-slate-700">
              ZIP code
            </label>
            <input
              id="zip"
              name="zip"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="hours" className="block text-sm font-medium text-slate-700">
              Operating hours
            </label>
            <input
              id="hours"
              name="hours"
              placeholder="e.g. Mon-Fri 9:00 AM - 5:00 PM"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Short description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="source" className="block text-sm font-medium text-slate-700">
              How do you know about this resource? *
            </label>
            <select
              id="source"
              name="source"
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">Select one</option>
              <option value="use_it">I use this resource</option>
              <option value="work_there">I work or volunteer there</option>
              <option value="found_online">I found it online</option>
              <option value="recommended">Someone recommended it to me</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-slate-700">
              Website or source link
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          <p className="font-semibold">Disclaimer</p>
          <p className="mt-2">
            This resource has <strong>not been verified</strong> by Homeless Aid Finder. We provide
            this submission system as a way for the community to suggest resources — but we do not
            guarantee the accuracy, availability, or suitability of any submitted information.
          </p>
          <p className="mt-2">
            All submissions are reviewed manually before being added to the directory. Resources may
            be rejected or delayed at our discretion. We are not liable for any reliance you place
            on unverified submissions.
          </p>
          <label className="mt-3 flex items-start gap-3">
            <input
              type="checkbox"
              name="agreed"
              className="mt-0.5 shrink-0"
            />
            <span>
              I understand that this information will be reviewed before publishing, and I confirm
              that the details I&apos;m providing are accurate to the best of my knowledge.
              *
            </span>
          </label>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {sending ? "Submitting..." : "Submit for review"}
        </button>
      </form>
    </main>
  );
}
