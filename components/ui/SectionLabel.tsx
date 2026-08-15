type SectionLabelProps = {
  children: string;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-(--text-ui-sm) uppercase tracking-[0.18em] text-muted">
      {children}
    </p>
  );
}
