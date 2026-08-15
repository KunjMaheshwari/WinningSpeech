type HeroTypographyProps = {
  title: string;
  subtitle: string;
};

export function HeroTypography({ title, subtitle }: HeroTypographyProps) {
  return (
    <div className="w-full max-w-[min(94vw,1500px)] space-y-5">
      <p className="text-(length:--text-ui-sm) uppercase tracking-[0.18em] text-muted">
        Visual Album Portal
      </p>

      <h1
        data-hero-title
        data-parallax-layer="typography"
        className="hero-display max-w-[12.2ch] uppercase text-foreground"
      >
        {title}
      </h1>

      <p data-hero-gurmukhi className="font-(--font-gurmukhi) text-[clamp(1.2rem,2.4vw,2.35rem)] tracking-[0.06em] text-[#dbc39e]">
        ਕਰਣ ਔਜਲਾ
      </p>

      <p className="max-w-[58ch] text-(length:--text-hero-sub) tracking-[0.08em] text-muted">
        {subtitle}
      </p>
    </div>
  );
}
