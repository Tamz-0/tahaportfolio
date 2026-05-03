import { IconSun, IconMoon, IconMenu } from "../icons";

export function Navbar({ dark, setDark, onMenuOpen }) {
  const links = [
    { label: "About",      href: "#about" },
    { label: "Projects",   href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Writing",    href: "#writing" },
    { label: "Contact",    href: "#contact" },
    { label: "DSA",        href: "https://tahadsa.pages.dev/", external: true },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top">Taha Zaman</a>
        <div className="nav-right">
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label="Toggle dark mode">
            {dark ? <IconSun /> : <IconMoon />}
          </button>
          <button className="nav-hamburger" onClick={onMenuOpen} aria-label="Open menu">
            <IconMenu />
          </button>
        </div>
      </div>
    </nav>
  );
}