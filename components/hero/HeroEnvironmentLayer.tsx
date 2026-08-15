export function HeroEnvironmentLayer() {
  return (
    <div
      data-hero-environment
      data-parallax-layer="environment"
      className="hero-layer absolute inset-0 overflow-hidden"
    >
      <div className="hero-environment-base" />
      <div className="hero-skyline hero-skyline-far" />
      <div className="hero-tree-band" />
    </div>
  );
}
