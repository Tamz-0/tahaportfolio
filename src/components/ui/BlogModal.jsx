// src/components/ui/BlogModal.jsx
import { createPortal } from "react-dom";
import { IconClose } from "../icons";

export function BlogModal({ blog, visible, onClose }) {
  return createPortal(
    <div className={`bm-overlay${visible ? " bm-visible" : ""}`} onClick={onClose}>
      <div className="bm-panel" onClick={e => e.stopPropagation()}>
        <div className="bm-header">
          <div className="bm-header-meta">
            <span className="blog-date">{blog.date}</span>
            <span className="bm-sep"/>
            <span className="blog-read-time">{blog.readTime} read</span>
            {(blog.tags || []).map(t => <span className="blog-tag" key={t}>{t}</span>)}
          </div>
          <button className="bm-close" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="bm-body">
          <h2 className="bm-title">{blog.title}</h2>
          <p className="bm-summary">{blog.summary}</p>
          {blog.preview && <blockquote className="bm-lede">{blog.preview}</blockquote>}
          {blog.content
            ? <div className="bm-content" dangerouslySetInnerHTML={{ __html: blog.content }}/>
            : (
              <div className="bm-draft">
                <div className="bm-draft-rule"/>
                <p className="bm-draft-text">
                  This piece is still being written. The argument is formed — the prose is being refined.
                  If this topic is relevant to your work, reach out and I'll share the working draft directly.
                </p>
              </div>
            )
          }
        </div>
      </div>
    </div>,
    document.body
  );
}