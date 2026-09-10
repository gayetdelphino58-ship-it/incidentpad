"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SeverityBadge from "@/components/SeverityBadge";
import TypeIcon from "@/components/TypeIcon";
import { ensureSeeded, resetDemo } from "@/lib/storage";
import type { Incident } from "@/lib/types";

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default function ReportsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [ready, setReady] = useState(false);

  const load = useCallback(() => {
    setIncidents(ensureSeeded());
    setReady(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleReset() {
    if (
      !confirm(
        "Reset demo data? This replaces all local reports with the 5 seed incidents."
      )
    ) {
      return;
    }
    setIncidents(resetDemo());
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reports
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Stored locally in this browser.{" "}
            {ready ? `${incidents.length} incident${incidents.length === 1 ? "" : "s"}.` : "Loading…"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset demo
          </button>
          <Link href="/new" className="btn-primary">
            New incident
          </Link>
        </div>
      </div>

      {!ready ? (
        <div className="card p-8 text-center text-sm text-slate-500">
          Loading reports…
        </div>
      ) : incidents.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-sm text-slate-600">No incidents yet.</p>
          <Link href="/new" className="btn-primary mt-4 inline-flex">
            File the first one
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {incidents.map((inc) => (
            <li key={inc.id}>
              <Link
                href={`/incidents/${inc.id}`}
                className="card flex gap-3 p-4 transition hover:border-sky-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <TypeIcon type={inc.type} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">
                      {inc.type}
                    </span>
                    <SeverityBadge severity={inc.severity} />
                  </div>
                  <p className="mt-0.5 truncate text-sm text-slate-600">
                    {inc.location || "No location"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatWhen(inc.time)}
                    {inc.tripLoadId ? ` · ${inc.tripLoadId}` : ""}
                  </p>
                </div>
                <span className="self-center text-slate-400" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
