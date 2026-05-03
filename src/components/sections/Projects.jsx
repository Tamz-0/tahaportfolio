// src/components/sections/Projects.jsx
import { useState, useEffect } from "react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { FeaturedCard } from "../ui/FeaturedCard";
import { LiveBtn } from "../ui/LiveBtn";
import { IconGithub } from "../icons";
import { loadFeatured, loadOtherProjects } from "../../lib/github";
import { STATIC_FEATURED, STATIC_OTHER } from "../../data/staticProjects";

export function Projects() {
  const ref = useFadeIn();
  const [featured, setFeatured]   = useState(STATIC_FEATURED);
  const [other,    setOther]      = useState(STATIC_OTHER);
  const [loading,  setLoading]    = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Load featured.json (rich case study content) and GitHub other projects in parallel
    Promise.allSettled([loadFeatured(), loadOtherProjects()]).then(([featuredRes, otherRes]) => {
      if (cancelled) return;

      if (featuredRes.status === "fulfilled" && featuredRes.value?.length > 0) {
        setFeatured(featuredRes.value);
      }
      if (otherRes.status === "fulfilled" && otherRes.value?.length > 0) {
        setOther(otherRes.value);
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <div ref={ref} id="projects">
      <div className="section-wrap">
        <div className="section">
          <p className="section-eyebrow fade-in">Selected Work</p>
          <h2 className="section-headline fade-in">Systems, not side projects.</h2>

          <div style={{ marginTop: "48px" }} className="fade-in">
            <p className="projects-subsection-label">Featured — click to expand case study</p>
            {loading ? (
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:64 }}>
                {[1,2,3].map(i => <div key={i} className="skeleton skeleton-card"/>)}
              </div>
            ) : (
              <div className="featured-list">
                {featured.map(p => <FeaturedCard key={p.id} project={p} />)}
              </div>
            )}
          </div>

          <div className="fade-in">
            <p className="projects-subsection-label">Other Projects</p>
            {loading ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1 }}>
                {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height:180 }}/>)}
              </div>
            ) : (
              <div className="other-grid">
                {other.map(p => (
                  <div className="other-card" key={p.id}>
                    <h4 className="other-card-title">{p.title}</h4>
                    <p className="other-card-tagline">{p.tagline}</p>
                    <div className="other-card-bottom">
                      {(p.metrics || []).map(m => (
                        <p className="other-card-metric" key={m.label}>
                          <strong>{m.label}:</strong> {m.value}
                        </p>
                      ))}
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:4 }}>
                        <span className="status-badge">{p.status}</span>
                        {(p.tech || []).slice(0,3).map(t => <span className="tech-pill" key={t}>{t}</span>)}
                      </div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:4 }}>
                        <a className="btn btn-ghost btn-sm" href={p.github} target="_blank" rel="noopener noreferrer">
                          <IconGithub /> GitHub
                        </a>
                        <LiveBtn href={p.livePreview} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}