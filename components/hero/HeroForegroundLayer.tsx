export function HeroForegroundLayer() {
  return (
    <div
      data-hero-foreground
      data-parallax-layer="foreground"
      className="hero-layer absolute inset-0 overflow-hidden"
    >
      <div className="hero-foreground-plane" />
      <div className="hero-foreground-object hero-foreground-object-left" />
      <div className="hero-foreground-object hero-foreground-object-right" />
      <div className="hero-foreground-object hero-foreground-object-center" />
    </div>
  );
}
