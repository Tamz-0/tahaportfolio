// src/components/layout/MobileSidebar.jsx
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { IconClose, IconSun, IconMoon } from "../icons";

export function MobileSidebar({ open, onClose, dark, setDark }) {
  const links = [
    { label: "About",      href: "#about" },
    { label: "Projects",   href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Writing",    href: "#writing" },
    { label: "Contact",    href: "#contact" },
    { label: "DSA",        href: "https://tahadsa.pages.dev/", external: true },
  ];

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const handleLink = useCallback((href, external) => {
    onClose();
    if (!external) {
      setTimeout(() => {
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [onClose]);

  return createPortal(
    <>
      <div className={`sidebar-overlay${open ? " open" : ""}`} onClick={onClose}/>
      <div className={`sidebar-drawer${open ? " open" : ""}`} aria-modal="true" role="dialog">
        <div className="sidebar-header">
          <span className="sidebar-logo">Taha Zaman</span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <IconClose />
          </button>
        </div>
        <div className="sidebar-links">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={`sidebar-link${l.external ? " accent" : ""}`}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              onClick={() => handleLink(l.href, l.external)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="sidebar-footer">
          <span className="sidebar-footer-note">Press T to toggle theme</span>
          <button className="theme-toggle" onClick={() => { setDark(d => !d); }} aria-label="Toggle theme">
            {dark ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
