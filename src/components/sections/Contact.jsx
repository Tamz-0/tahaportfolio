// src/components/sections/Contact.jsx
import { useFadeIn } from "../../hooks/useFadeIn";

export function Contact({ showToast }) {
  const ref = useFadeIn();
  const links = [
    { label:"Email",    value:"tahazaman85@gmail.com",           href:"mailto:tahazaman85@gmail.com",          copy:true  },
    { label:"GitHub",   value:"github.com/Tamz-0",               href:"https://github.com/Tamz-0",             copy:false },
    { label:"LinkedIn", value:"linkedin.com/in/taha-0-zaman",    href:"https://www.linkedin.com/in/taha-0-zaman/", copy:false },
  ];
  const handleClick = (e, item) => {
    if (item.copy) {
      e.preventDefault();
      navigator.clipboard.writeText(item.value).then(() => showToast("Email copied"));
    }
  };
  return (
    <div ref={ref} id="contact">
      <div className="section-wrap">
        <div className="section">
          <div className="contact-grid fade-in">
            <div>
              <p className="section-eyebrow">Contact</p>
              <h2 className="contact-headline">Let's build something worth building.</h2>
              <p className="contact-sub">Open to full-time engineering roles, research collaborations, and high-impact projects. If you're working on something technically hard in blockchain, AI, or systems — I want to hear about it.</p>
              <a className="btn btn-primary" href="mailto:tahazaman85@gmail.com">Send a message →</a>
            </div>
            <div className="contact-links">
              {links.map(l => (
                <a className="contact-link-item" key={l.label} href={l.href}
                  target={l.copy ? undefined : "_blank"} rel="noopener noreferrer"
                  onClick={e => handleClick(e, l)}>
                  <div>
                    <p className="contact-link-label">{l.label}</p>
                    <p className="contact-link-value">{l.value}</p>
                  </div>
                  <span className="contact-link-arrow">{l.copy ? "⎘" : "↗"}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}