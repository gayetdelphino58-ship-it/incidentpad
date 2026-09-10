import type { Incident } from "./types";

export const SEED_REPORTS: Incident[] = [
  {
    id: "seed-001",
    type: "Delay",
    tripLoadId: "LD-4821",
    location: "I-80 West, mile 214 — Near Cheyenne, WY",
    time: "2026-09-08T14:30:00.000Z",
    description:
      "Traffic accident ahead caused 90-minute slowdown. ETA pushed to 18:45 local. No damage to cargo.",
    severity: "low",
    notify: "dispatcher",
    checklist: {
      truckStoppedSafely: true,
      photosNoted: false,
      policeContacted: false,
    },
    createdAt: "2026-09-08T14:35:00.000Z",
  },
  {
    id: "seed-002",
    type: "Breakdown",
    tripLoadId: "LD-5102",
    location: "Pilot Travel Center, Exit 92 — Omaha, NE",
    time: "2026-09-07T09:15:00.000Z",
    description:
      "ABS warning light then loss of air pressure. Safely parked at Pilot. Waiting on roadside assistance. Reefer unit still running.",
    severity: "med",
    notify: "both",
    checklist: {
      truckStoppedSafely: true,
      photosNoted: true,
      policeContacted: false,
    },
    createdAt: "2026-09-07T09:22:00.000Z",
  },
  {
    id: "seed-003",
    type: "Cargo damage",
    tripLoadId: "LD-4990",
    location: "Receiving dock Bay 3 — Denver DC",
    time: "2026-09-06T16:45:00.000Z",
    description:
      "Two pallets shifted during unload. Corner crush on SKU boxes. Photos taken before and after. Dock supervisor notified.",
    severity: "med",
    notify: "shipper",
    checklist: {
      truckStoppedSafely: true,
      photosNoted: true,
      policeContacted: false,
    },
    createdAt: "2026-09-06T16:52:00.000Z",
  },
  {
    id: "seed-004",
    type: "Safety/near-miss",
    tripLoadId: "LD-5033",
    location: "US-30 / County Rd 12 — Rural IA",
    time: "2026-09-05T22:10:00.000Z",
    description:
      "Passenger vehicle cut across shoulder into lane with no lights. Hard brake applied. No contact. Pulled over to reset and check load straps.",
    severity: "high",
    notify: "dispatcher",
    checklist: {
      truckStoppedSafely: true,
      photosNoted: true,
      policeContacted: false,
    },
    createdAt: "2026-09-05T22:18:00.000Z",
  },
  {
    id: "seed-005",
    type: "Other",
    tripLoadId: "LD-4755",
    location: "Scale house — Kansas City Port of Entry",
    time: "2026-09-04T11:00:00.000Z",
    description:
      "Weight citation risk flagged at CAT scale (+420 lb steer). Redistributed trailer axle. Cleared second weigh. Documenting for fleet QA.",
    severity: "low",
    notify: "dispatcher",
    checklist: {
      truckStoppedSafely: true,
      photosNoted: false,
      policeContacted: false,
    },
    createdAt: "2026-09-04T11:12:00.000Z",
  },
];
