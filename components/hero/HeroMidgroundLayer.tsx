export function HeroMidgroundLayer() {
  return (
    <div
      data-hero-midground
      data-parallax-layer="midground"
      className="hero-layer absolute inset-0 overflow-hidden"
    >
      <div className="hero-midground-plane" />
      <div className="hero-mid-shape hero-mid-shape-a" />
      <div className="hero-mid-shape hero-mid-shape-b" />
      <div className="hero-pole" />
    </div>
  );
}
