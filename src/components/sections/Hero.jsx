// src/components/sections/Hero.jsx
import { IconDownload } from "../icons";

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <p className="hero-label">Full-Stack Engineer · Blockchain · AI/ML</p>
        <h1 className="hero-headline">
          Systems that<br />
          ship, <em>scale,</em><br />
          and matter.
        </h1>
        <div className="hero-bottom">
          <p className="hero-sub">
            I build <strong>end-to-end products</strong> at the intersection of decentralized infrastructure and intelligent automation — Ethereum DApps, ML inference pipelines, and the React interfaces that make them deployable.
            Currently interning in <strong>Blockchain Technology at NIT Patna</strong> and targeting an IEEE publication for AgriChain.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#projects">View Projects</a>
            <a className="btn btn-ghost" href="/TAHACV.pdf" download="TahaZaman_CV.pdf">
              <IconDownload /> Download CV
            </a>
          </div>
        </div>
        <div className="hero-metrics">
          {[["6","End-to-end systems built"],["91%","VGG19 crop disease accuracy"],["14+","Solidity contract functions"],["5","Blockchain user roles"]].map(([v,l]) => (
            <div key={l}>
              <div className="hero-metric-val">{v}</div>
              <div className="hero-metric-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
