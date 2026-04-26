import { CHILI_SPECTRUM } from "@/lib/menu-ui";
import PepperIcon from "./PepperIcon";

type Props = {
  vegetarian: string;
  spiceIndicator: string;
  priceNote: string;
};

export default function MenuLegendRow({ vegetarian, spiceIndicator, priceNote }: Props) {
  return (
    <div className="border-b border-line/70 bg-surface/40">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-2.5 lg:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-muted sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border-[1.6px]"
              style={{ borderColor: "#3f8a3a" }}
            >
              <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#3f8a3a" }} />
            </span>
            {vegetarian}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5">
              {CHILI_SPECTRUM.map((s, i) => (
                <PepperIcon key={i} color={s.c} className="h-3.5 w-3.5" />
              ))}
            </span>
            {spiceIndicator}
          </span>
        </div>
        <p className="shrink-0 text-[0.7rem] italic leading-relaxed text-ink-muted/90 sm:max-w-[20rem] sm:text-right sm:text-xs">
          {priceNote}
        </p>
      </div>
    </div>
  );
}
