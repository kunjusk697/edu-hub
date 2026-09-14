export function BrandMark({
  className = "brand-icon"
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 36 L40 8 L68 36"
        stroke="#FF6B00"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill="#FF6B00"
        d="M28 44 L44 36 V96 H58 V108 H22 V96 H36 V52 L28 56 Z"
      />
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
