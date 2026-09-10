import type { Severity } from "@/lib/types";
import { SEVERITY_LABELS } from "@/lib/types";

const styles: Record<Severity, string> = {
  low: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
  med: "bg-amber-100 text-amber-900 ring-amber-600/20",
  high: "bg-rose-100 text-rose-800 ring-rose-600/20",
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[severity]}`}
    >
      {SEVERITY_LABELS[severity]}
    </span>
  );
}
