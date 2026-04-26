type Props = {
  vegetarian: boolean;
  size?: number;
  ariaLabel?: string;
};

export default function VegMark({ vegetarian, size = 14, ariaLabel }: Props) {
  const color = vegetarian ? "#3f8a3a" : "#b8261a";
  const label = ariaLabel ?? (vegetarian ? "Vegetarian" : "Non-vegetarian");
  const dot = size * 0.42;

  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex flex-shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        border: `1.6px solid ${color}`,
        borderRadius: 2,
        backgroundColor: "transparent",
      }}
    >
      <span
        style={{
          width: dot,
          height: dot,
          borderRadius: 999,
          backgroundColor: color,
          display: "block",
        }}
      />
    </span>
  );
}
