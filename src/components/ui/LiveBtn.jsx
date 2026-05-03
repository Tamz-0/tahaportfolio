// src/components/ui/LiveBtn.jsx
import { IconExtLink } from "../icons";

export function LiveBtn({ href, label = "Live Preview", className = "btn btn-ghost btn-sm" }) {
  if (!href || href === "#" || href === null) return null;
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      <IconExtLink /> {label}
    </a>
  );
}