const particles = [
  { left: "8%", delay: "0s", duration: "14s" },
  { left: "19%", delay: "2s", duration: "11s" },
  { left: "32%", delay: "1s", duration: "15s" },
  { left: "51%", delay: "3s", duration: "13s" },
  { left: "66%", delay: "2.5s", duration: "16s" },
  { left: "82%", delay: "1.2s", duration: "12s" },
];

export function HeroAtmosphereLayer() {
  return (
    <div data-hero-atmosphere className="hero-layer pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-haze" data-drift="haze" />
      <div className="hero-dust-field" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            // Controlled placeholder particles for atmosphere only.
            key={`dust-${index}`}
            className="hero-dust-particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
