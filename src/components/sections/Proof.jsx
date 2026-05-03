// src/components/sections/Proof.jsx
import { useFadeIn } from "../../hooks/useFadeIn";
import { PROOF } from "../../data/proof";

export function ProofSection() {
  const ref = useFadeIn();
  return (
    <div ref={ref}>
      <div className="section-wrap">
        <div className="section">
          <p className="section-eyebrow fade-in">Proof & Credentials</p>
          <h2 className="section-headline fade-in">Where the work stands.</h2>
          <div className="proof-grid fade-in">
            {PROOF.map(item => (
              <div className="proof-item" key={item.label}>
                <p className="proof-item-label">{item.label}</p>
                <p className="proof-item-value">{item.value}</p>
                <p className="proof-item-sub">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}