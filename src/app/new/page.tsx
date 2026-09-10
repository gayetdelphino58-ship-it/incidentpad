"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  INCIDENT_TYPES,
  NOTIFY_LABELS,
  SEVERITY_LABELS,
  type Incident,
  type IncidentDraft,
  type IncidentType,
  type NotifyTarget,
  type Severity,
} from "@/lib/types";
import { addIncident, createId, ensureSeeded } from "@/lib/storage";
import TypeIcon from "@/components/TypeIcon";

const STEPS = ["Type", "Details", "Checklist", "Review"] as const;

const emptyDraft = (): IncidentDraft => ({
  type: "",
  tripLoadId: "",
  location: "",
  time: new Date().toISOString().slice(0, 16),
  description: "",
  severity: "med",
  notify: "dispatcher",
  checklist: {
    truckStoppedSafely: false,
    photosNoted: false,
    policeContacted: false,
  },
});

export default function NewIncidentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<IncidentDraft>(emptyDraft);
  const [submitting, setSubmitting] = useState(false);

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(draft.type);
    if (step === 1) {
      return (
        draft.location.trim().length > 0 &&
        draft.time.length > 0 &&
        draft.description.trim().length > 0
      );
    }
    return true;
  }, [step, draft]);

  function update<K extends keyof IncidentDraft>(key: K, value: IncidentDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleFakePhoto() {
    setDraft((d) => ({
      ...d,
      checklist: { ...d.checklist, photosNoted: true },
    }));
  }

  function handleSubmit() {
    if (!draft.type || submitting) return;
    setSubmitting(true);
    ensureSeeded();

    const timeIso = (() => {
      const d = new Date(draft.time);
      return Number.isNaN(d.getTime())
        ? new Date().toISOString()
        : d.toISOString();
    })();

    const incident: Incident = {
      id: createId(),
      type: draft.type as IncidentType,
      tripLoadId: draft.tripLoadId.trim(),
      location: draft.location.trim(),
      time: timeIso,
      description: draft.description.trim(),
      severity: draft.severity,
      notify: draft.notify,
      checklist: { ...draft.checklist },
      createdAt: new Date().toISOString(),
    };

    addIncident(incident);
    router.push(`/incidents/${incident.id}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          New incident
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Guided wizard — usually under two minutes.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={[
                "step-dot w-full max-w-[2rem]",
                i < step
                  ? "bg-sky-500 text-white"
                  : i === step
                    ? "bg-navy-900 text-white"
                    : "bg-slate-200 text-slate-500",
              ].join(" ")}
            >
              {i + 1}
            </div>
            <span
              className={[
                "hidden text-[10px] font-medium uppercase tracking-wide sm:block",
                i === step ? "text-navy-900" : "text-slate-400",
              ].join(" ")}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="card p-5 sm:p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              What happened?
            </h2>
            <div className="grid gap-2">
              {INCIDENT_TYPES.map((t) => {
                const selected = draft.type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update("type", t)}
                    className={[
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                      selected
                        ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/30"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <TypeIcon type={t} />
                    <span className="font-medium text-slate-900">{t}</span>
                    {selected && (
                      <span className="ml-auto text-xs font-semibold text-sky-700">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Details</h2>

            <div>
              <label className="field-label" htmlFor="tripLoadId">
                Trip / Load ID{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="tripLoadId"
                className="field-input"
                value={draft.tripLoadId}
                onChange={(e) => update("tripLoadId", e.target.value)}
                placeholder="e.g. LD-4821"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="location">
                Location <span className="text-rose-500">*</span>
              </label>
              <input
                id="location"
                className="field-input"
                value={draft.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Highway, mile marker, or facility"
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="time">
                Time <span className="text-rose-500">*</span>
              </label>
              <input
                id="time"
                type="datetime-local"
                className="field-input"
                value={draft.time}
                onChange={(e) => update("time", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="description">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                className="field-input min-h-[110px] resize-y"
                value={draft.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="What happened, impact on ETA/cargo, next steps…"
                required
              />
            </div>

            <div>
              <span className="field-label">Severity</span>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(SEVERITY_LABELS) as Severity[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update("severity", s)}
                    className={[
                      "rounded-xl border px-3 py-2.5 text-sm font-semibold transition",
                      draft.severity === s
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {SEVERITY_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="field-label">Notify</span>
              <div className="grid gap-2">
                {(Object.keys(NOTIFY_LABELS) as NotifyTarget[]).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update("notify", n)}
                    className={[
                      "rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition",
                      draft.notify === n
                        ? "border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-500/30"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {NOTIFY_LABELS[n]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Safety checklist
            </h2>
            <p className="text-sm text-slate-600">
              Confirm what you have already done. You can continue even if some
              items are unchecked.
            </p>

            {(
              [
                ["truckStoppedSafely", "Truck stopped safely"],
                ["photosNoted", "Photos noted / evidence captured"],
                ["policeContacted", "Police contacted (if needed)"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3"
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  checked={draft.checklist[key]}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      checklist: { ...d.checklist, [key]: e.target.checked },
                    }))
                  }
                />
                <span className="text-sm font-medium text-slate-800">
                  {label}
                </span>
              </label>
            ))}

            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
              <p className="text-sm font-medium text-slate-800">
                Attach photo (demo)
              </p>
              <p className="mt-1 text-xs text-slate-500">
                This demo does not upload files. Tapping marks “Photos noted”
                on the checklist.
              </p>
              <button
                type="button"
                onClick={handleFakePhoto}
                className="btn-secondary mt-3 w-full"
              >
                {draft.checklist.photosNoted
                  ? "✓ Photo noted"
                  : "Fake attach photo"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Review & submit
            </h2>
            <dl className="space-y-3 text-sm">
              <ReviewRow label="Type" value={draft.type || "—"} />
              <ReviewRow
                label="Trip / Load"
                value={draft.tripLoadId || "—"}
              />
              <ReviewRow label="Location" value={draft.location || "—"} />
              <ReviewRow
                label="Time"
                value={
                  draft.time
                    ? new Date(draft.time).toLocaleString()
                    : "—"
                }
              />
              <ReviewRow label="Severity" value={SEVERITY_LABELS[draft.severity]} />
              <ReviewRow label="Notify" value={NOTIFY_LABELS[draft.notify]} />
              <ReviewRow label="Description" value={draft.description || "—"} />
              <ReviewRow
                label="Checklist"
                value={[
                  draft.checklist.truckStoppedSafely ? "Stopped safely" : null,
                  draft.checklist.photosNoted ? "Photos noted" : null,
                  draft.checklist.policeContacted ? "Police contacted" : null,
                ]
                  .filter(Boolean)
                  .join(" · ") || "None checked"}
              />
            </dl>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          {step > 0 ? (
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => router.push("/reports")}
            >
              Cancel
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              className="btn-primary flex-1"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary flex-1"
              disabled={submitting || !draft.type}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting…" : "Submit incident"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0 sm:grid-cols-[140px_1fr]">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className="whitespace-pre-wrap text-slate-900">{value}</dd>
    </div>
  );
}
