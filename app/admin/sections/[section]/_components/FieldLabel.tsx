import { Label } from "@/components/ui/label";

export function FieldLabel({
  label,
  description,
  isDirty,
}: {
  label: string;
  description?: string;
  isDirty?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-1.5">
      <div>
        <Label className="text-zinc-300 text-xs uppercase tracking-wide">
          {label}
        </Label>
        {description && (
          <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      {isDirty && (
        <span
          className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0"
          title="Unpublished change"
          aria-label="Unpublished change"
        />
      )}
    </div>
  );
}
