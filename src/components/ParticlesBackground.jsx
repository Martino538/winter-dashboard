import { useEffect } from "react";

export default function ParticlesBackground() {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS.load("particles-js", "/particles.json");
    }
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: "absolute",
        inset: 0,
      }}
    />
  );
}
