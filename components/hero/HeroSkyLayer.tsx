export function HeroSkyLayer() {
  return (
    <div
      data-hero-sky
      data-parallax-layer="sky"
      className="hero-layer absolute inset-0 overflow-hidden"
    >
      <div className="hero-sky-plane" />
      <div className="hero-sky-light" data-drift="sky" />
      <div className="hero-vignette" />
    </div>
  );
}
