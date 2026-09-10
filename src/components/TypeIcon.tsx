import type { IncidentType } from "@/lib/types";

const icons: Record<IncidentType, string> = {
  Delay: "⏱",
  Breakdown: "🔧",
  "Cargo damage": "📦",
  "Safety/near-miss": "⚠️",
  Other: "📋",
};

export default function TypeIcon({
  type,
  className = "",
}: {
  type: IncidentType;
  className?: string;
}) {
  return (
    <span className={`text-lg leading-none ${className}`} aria-hidden>
      {icons[type]}
    </span>
  );
}
