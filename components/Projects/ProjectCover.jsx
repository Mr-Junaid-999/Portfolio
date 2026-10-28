export default function ProjectCover({ title, label, variant = "forest" }) {
  const variants = {
    forest: "bg-[#173f35] text-white",
    ivory: "bg-[#f7f5ef] text-[#252923] border border-[#d8d4c7]",
    charcoal: "bg-[#252923] text-white",
    sage: "bg-[#d9e4d9] text-[#173f35]",
    copper: "bg-[#c58b55] text-[#252923]",
  };

  return (
    <div
      className={`relative isolate flex h-48 w-full items-end overflow-hidden p-6 ${variants[variant] || variants.forest}`}
      role="img"
      aria-label={`${title} — ${label}`}
    >
      <div className="absolute right-0 top-0 h-full w-[38%] border-l border-current opacity-15" />
      <div className="absolute right-6 top-6 h-14 w-14 border border-current opacity-30" />
      <div className="relative z-10 max-w-[88%]">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">{label}</p>
        <p className="font-[family-name:var(--font-manrope)] text-xl font-bold leading-tight sm:text-2xl">{title}</p>
      </div>
    </div>
  );
}
