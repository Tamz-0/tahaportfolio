// src/lib/blogs.js
import { GITHUB_USER, WRITING_REPO, WRITING_BRANCH, ghFetch } from "./github";
import { cacheGet, cacheSet } from "./cache";
import { parseMarkdown, parseFrontmatter } from "./markdown";

export async function loadBlogs() {
  const key = `gh_blogs_${WRITING_REPO}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const files = await ghFetch(
    `https://api.github.com/repos/${GITHUB_USER}/${WRITING_REPO}/contents/blogs?ref=${WRITING_BRANCH}`
  );

  const mdFiles = files.filter(f => f.name.endsWith(".md"));
  const blogs = await Promise.all(
    mdFiles.map(async file => {
      try {
        const rawRes = await fetch(file.download_url);
        if (!rawRes.ok) throw new Error("raw fetch failed");
        const rawText = await rawRes.text();
        const { data, content } = parseFrontmatter(rawText);
        const slug = file.name.replace(/\.md$/, "");
        return {
          id: slug, slug,
          title: data.title || slug,
          summary: data.summary || data.description || "",
          tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
          readTime: data.readTime || data.read_time || "5 min",
          date: data.date || "",
          preview: data.preview || data.excerpt || "",
          content: content ? parseMarkdown(content) : null,
        };
      } catch (_) { return null; }
    })
  );

  const valid = blogs.filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  if (valid.length === 0) throw new Error("No valid blog files");
  cacheSet(key, valid);
  return valid;
}