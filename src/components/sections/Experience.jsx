import { useFadeIn } from "../../hooks/useFadeIn";
import { EXPERIENCE, CERTIFICATIONS } from "../../data/experience";
import { IconVerify } from "../icons";

export function Experience() {
  const ref = useFadeIn();
  return (
    <div ref={ref} id="experience">
      <div className="section-wrap">
        <div className="section">
          <p className="section-eyebrow fade-in">Experience & Credentials</p>
          <h2 className="section-headline fade-in">Proven in production.</h2>
          <div className="exp-list fade-in">
            {EXPERIENCE.map(item => (
              <div className="exp-item" key={item.id}>
                <div className="exp-left">
                  <p className="exp-period">{item.period}</p>
                  <span className="exp-type-badge">{item.type}</span>
                </div>
                <div className="exp-right">
                  <p className="exp-role">{item.role}</p>
                  <p className="exp-org">{item.orgFull}</p>
                  <p className="exp-desc">{item.desc}</p>
                  <div className="exp-highlights">
                    {item.highlights.map(h => <span className="exp-highlight-tag" key={h}>{h}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:64 }} className="fade-in">
            <p className="projects-subsection-label">Certifications</p>
            <div className="cert-list">
              {CERTIFICATIONS.map(cert => (
                <div className="cert-item" key={cert.id}>
                  <div>
                    <p className="cert-title">{cert.title}</p>
                    <p className="cert-org">{cert.org}</p>
                    <p className="cert-desc">{cert.desc}</p>
                    <div className="cert-skills">
                      {cert.skills.map(s => <span className="tech-pill" key={s}>{s}</span>)}
                    </div>
                  </div>
                  <div className="cert-right">
                    <span className="cert-period">{cert.period}</span>
                    <a className="btn btn-ghost btn-sm" href={cert.credential} target="_blank" rel="noopener noreferrer">
                      <IconVerify /> Verify
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}