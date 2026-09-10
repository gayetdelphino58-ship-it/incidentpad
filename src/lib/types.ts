export type IncidentType =
  | "Delay"
  | "Breakdown"
  | "Cargo damage"
  | "Safety/near-miss"
  | "Other";

export type Severity = "low" | "med" | "high";

export type NotifyTarget = "dispatcher" | "shipper" | "both";

export interface Checklist {
  truckStoppedSafely: boolean;
  photosNoted: boolean;
  policeContacted: boolean;
}

export interface Incident {
  id: string;
  type: IncidentType;
  tripLoadId: string;
  location: string;
  time: string;
  description: string;
  severity: Severity;
  notify: NotifyTarget;
  checklist: Checklist;
  createdAt: string;
}

export interface IncidentDraft {
  type: IncidentType | "";
  tripLoadId: string;
  location: string;
  time: string;
  description: string;
  severity: Severity;
  notify: NotifyTarget;
  checklist: Checklist;
}

export const INCIDENT_TYPES: IncidentType[] = [
  "Delay",
  "Breakdown",
  "Cargo damage",
  "Safety/near-miss",
  "Other",
];

export const SEVERITY_LABELS: Record<Severity, string> = {
  low: "Low",
  med: "Medium",
  high: "High",
};

export const NOTIFY_LABELS: Record<NotifyTarget, string> = {
  dispatcher: "Dispatcher",
  shipper: "Shipper",
  both: "Dispatcher & Shipper",
};

export const STORAGE_KEY = "incidentpad_reports_v1";
export const SEEDED_KEY = "incidentpad_seeded_v1";
