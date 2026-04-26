import type { SpiceLevel } from "@/data/menu";
import { SPICE_LEVEL_COLOR } from "@/lib/menu-ui";
import PepperIcon from "./PepperIcon";

type Props = {
  level: SpiceLevel;
  showLabel?: boolean;
  labels: Record<SpiceLevel, string>;
};

export default function SpiceIndicator({ level, showLabel = false, labels }: Props) {
  if (level === 0) return null;
  const color = SPICE_LEVEL_COLOR[level];

  return (
    <span className="inline-flex items-baseline gap-0.5" title={labels[level]} aria-label={labels[level]}>
      {Array.from({ length: level }).map((_, i) => (
        <PepperIcon key={i} color={color} className="h-3 w-3" />
      ))}
      {showLabel && (
        <span className="ml-1 font-body text-xs" style={{ color }}>
          {labels[level]}
        </span>
      )}
    </span>
  );
}
