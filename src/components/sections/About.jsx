// src/components/sections/About.jsx
import { useFadeIn } from "../../hooks/useFadeIn";
import { SKILLS } from "../../data/skills";

export function About() {
  const ref = useFadeIn();
  return (
    <div ref={ref} id="about">
      <div className="section-wrap">
        <div className="section">
          <p className="section-eyebrow fade-in">About</p>
          <div className="about-grid fade-in">
            <div className="about-bio">
              <p>I'm <strong>Taha Murad Zaman</strong>, a computer science engineer who specializes in building systems at the intersection of <strong>blockchain infrastructure, AI/ML pipelines, and full-stack product development</strong>. Not prototypes — deployable products with real architectural decisions behind them.</p>
              <p>Currently on a <strong>Blockchain Technology internship at NIT Patna</strong>, where my AgriChain DApp — a multi-role Ethereum system with an AI-driven crop insurance module — is being prepared for IEEE publication. The work is production-targeted: real Solidity contracts, real ML models, real multi-party trust assumptions.</p>
              <p>My technical range covers Ethereum smart contracts (Solidity, Truffle, Web3.js), ML inference pipelines (TensorFlow, VGG19, Flask), and the React interfaces that make complex backend systems usable. I don't just integrate APIs — I design the data models, make the architectural tradeoffs, and ship the full stack.</p>
              <p>When I'm not building: GATE CSE prep, teaching secondary-level mathematics and computer science, and occasionally writing about the engineering decisions behind my projects.</p>
            </div>
            <div className="skills-col">
              {Object.entries(SKILLS).map(([group, items]) => (
                <div className="skills-group" key={group}>
                  <p className="skills-group-label">{group}</p>
                  <div className="skills-list">
                    {items.map(s => <span className="skill-tag" key={s}>{s}</span>)}
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