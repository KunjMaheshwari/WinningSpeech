import { ArrowUpRight } from "lucide-react";

type PlatformLinkProps = {
  href: string;
  label: string;
  compact?: boolean;
};

export function PlatformLink({ href, label, compact = false }: PlatformLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={compact ? "inline-flex items-center gap-1 text-(--text-ui-sm) text-muted hover:text-accent" : "inline-flex items-center gap-1 text-(--text-ui-md) text-muted hover:text-accent"}
      aria-label={`Open ${label} in a new tab`}
    >
      <span>{label}</span>
      <ArrowUpRight size={compact ? 13 : 15} strokeWidth={1.9} />
    </a>
  );
}
