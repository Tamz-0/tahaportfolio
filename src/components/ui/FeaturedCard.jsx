// src/components/ui/FeaturedCard.jsx
import { useState } from "react";
import { IconGithub } from "../icons";
import { LiveBtn } from "./LiveBtn";

export function FeaturedCard({ project }) {
  const [open, setOpen] = useState(false);
  const cs = project.caseStudy;

  return (
    <div className="featured-card">
      <div className="featured-card-header" onClick={() => setOpen(o => !o)}>
        <div>
          <h3 className="featured-card-title">{project.title}</h3>
          <p className="featured-card-tagline">{project.tagline}</p>
          <div className="featured-card-meta">
            <span className="status-badge">{project.status}</span>
            {(project.tech || []).slice(0,4).map(t => <span className="tech-pill" key={t}>{t}</span>)}
          </div>
        </div>
        <div className="featured-card-right">
          <button className={`expand-btn${open ? " open" : ""}`} aria-label="Toggle case study">+</button>
          <div className="featured-card-metrics">
            {(project.metrics || []).map(m => (
              <div className="fc-metric" key={m.label}>
                <div className="fc-metric-val">{m.value}</div>
                <div className="fc-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`case-study${open ? " open" : ""}`}>
        <div className="case-study-inner">
          <div className="cs-col">
            <div>
              <p className="cs-block-label">Problem</p>
              <p className="cs-block-text">{cs.problem}</p>
            </div>
            <div>
              <p className="cs-block-label">Solution</p>
              <p className="cs-block-text">{cs.solution}</p>
            </div>
            <div>
              <p className="cs-block-label">Architecture</p>
              <div className="cs-arch-block">
                {cs.architecture.map((step, i) => (
                  <div className="cs-arch-step" key={i}>
                    <span className="cs-arch-num">{String(i+1).padStart(2,"0")}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="cs-col">
            <div>
              <p className="cs-block-label">Engineering Decisions</p>
              <ul className="cs-list">{cs.decisions.map((d,i) => <li key={i}>{d}</li>)}</ul>
            </div>
            <div>
              <p className="cs-block-label">Challenges</p>
              <ul className="cs-list">{cs.challenges.map((c,i) => <li key={i}>{c}</li>)}</ul>
            </div>
            <div>
              <p className="cs-block-label">Metrics & Performance</p>
              <p className="cs-block-text">{cs.metrics_detail}</p>
            </div>
            <div className="cs-actions">
              <a className="btn btn-ghost btn-sm" href={project.github} target="_blank" rel="noopener noreferrer">
                <IconGithub /> GitHub
              </a>
              <LiveBtn href={project.livePreview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}