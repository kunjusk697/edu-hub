export function BrandMark({
  className = "brand-icon"
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 30 L32 8 L54 30"
        stroke="#FF6B00"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M26 34 L34 30 V86 H46 V34 H38 L34 30 Z" fill="#FF6B00" />
      <path d="M22 86 H50" stroke="#FF6B00" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLogo({
  className = "brand-logo"
}: {
  className?: string;
}) {
  return (
    <img
      className={className}
      src="/logo.jpg"
      alt="Eduin Global Skill Club"
    />
  );
}
