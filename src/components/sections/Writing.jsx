// src/components/sections/Writing.jsx
import { useState, useEffect, useCallback } from "react";
import { useFadeIn } from "../../hooks/useFadeIn";
import { BlogModal } from "../ui/BlogModal";
import { loadBlogs } from "../../lib/blogs";
import { STATIC_BLOGS } from "../../data/staticBlogs";

export function Writing() {
  const ref = useFadeIn();
  const [blogs, setBlogs]         = useState(STATIC_BLOGS);
  const [activeBlog, setActive]   = useState(null);
  const [visible, setVisible]     = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadBlogs()
      .then(fetched => { if (!cancelled && fetched.length > 0) setBlogs(fetched); })
      .catch(() => {/* silently use static fallback */});
    return () => { cancelled = true; };
  }, []);

  const open = useCallback(blog => {
    setActive(blog);
    setTimeout(() => setVisible(true), 16);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setActive(null), 300);
  }, []);

  useEffect(() => {
    if (!activeBlog) return;
    document.body.style.overflow = "hidden";
    const onKey = e => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [activeBlog, close]);

  return (
    <div ref={ref} id="writing">
      <div className="section-wrap">
        <div className="section">
          <p className="section-eyebrow fade-in">Writing</p>
          <h2 className="section-headline fade-in">Technical writing, not tutorials.</h2>
          <div className="blog-list fade-in" style={{ marginTop:48 }}>
            {blogs.map(b => (
              <div className="blog-item" key={b.id} onClick={() => open(b)}>
                <div className="blog-item-inner">
                  <div>
                    <p className="blog-title">{b.title}</p>
                    <p className="blog-summary">{b.summary}</p>
                    <p className="blog-preview">{b.preview}</p>
                    <div className="blog-meta">
                      <span className="blog-date">{b.date}</span>
                      <span className="blog-read-time">{b.readTime} read</span>
                      {(b.tags || []).map(t => <span className="blog-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                  <span className="blog-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
          <p className="blog-wip-note fade-in">
            These posts are in progress — drafts being refined before publication. If a topic interests you, reach out and I can share working notes directly.
          </p>
        </div>
      </div>
      {activeBlog && <BlogModal blog={activeBlog} visible={visible} onClose={close}/>}
    </div>
  );
}