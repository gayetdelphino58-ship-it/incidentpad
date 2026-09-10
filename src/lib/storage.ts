import type { Incident } from "./types";
import { STORAGE_KEY, SEEDED_KEY } from "./types";
import { SEED_REPORTS } from "./seed";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getIncidents(): Incident[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Incident[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveIncidents(incidents: Incident[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
}

export function ensureSeeded(): Incident[] {
  if (!isBrowser()) return [];
  const seeded = localStorage.getItem(SEEDED_KEY);
  let incidents = getIncidents();

  if (!seeded) {
    // First visit: merge seeds if empty, or keep existing + mark seeded
    if (incidents.length === 0) {
      incidents = [...SEED_REPORTS];
      saveIncidents(incidents);
    }
    localStorage.setItem(SEEDED_KEY, "1");
  }

  return incidents;
}

export function addIncident(incident: Incident): Incident[] {
  const current = getIncidents();
  const next = [incident, ...current];
  saveIncidents(next);
  return next;
}

export function getIncidentById(id: string): Incident | undefined {
  return getIncidents().find((i) => i.id === id);
}

export function resetDemo(): Incident[] {
  if (!isBrowser()) return [];
  saveIncidents([...SEED_REPORTS]);
  localStorage.setItem(SEEDED_KEY, "1");
  return [...SEED_REPORTS];
}

export function createId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `inc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
