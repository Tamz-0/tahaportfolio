const GITHUB_USER        = "Tamz-0";
const WRITING_REPO       = "taha-writing";        // public repo with /blogs folder
const WRITING_BRANCH     = "master";
const PORTFOLIO_TOPIC    = "portfolio";            // tag repos with this topic
const CACHE_TTL          = 10 * 60 * 1000;        // 10 min localStorage cache



async function ghFetch(url) {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
  return res.json();
}

// Fetch other projects from GitHub repos tagged with "portfolio" topic.
// Featured section always uses featured.json — not touched here.
async function loadOtherProjects() {
  const key = `gh_other_${GITHUB_USER}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const repos = await ghFetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
  );

  const portfolio = repos.filter(r =>
    (r.topics || []).includes(PORTFOLIO_TOPIC) && !(r.topics || []).includes("featured")
  );

  const projects = portfolio
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .map(repo => {
      const topics = (repo.topics || []).filter(t =>
        !["portfolio","featured","project"].includes(t)
      );
      const tech = topics.length > 0
        ? topics.map(t => t.charAt(0).toUpperCase() + t.slice(1))
        : repo.language ? [repo.language] : [];

      return {
        id: repo.name,
        title: repo.name.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        tagline: repo.description || "No description provided.",
        metrics: [
          { label: "Stars", value: String(repo.stargazers_count || 0) },
          { label: "Language", value: repo.language || "N/A" },
        ],
        status: repo.archived ? "Archived" : "Active",
        tech,
        github: repo.html_url,
        // homepage field in GitHub repo settings = live link
        livePreview: (repo.homepage && repo.homepage.trim() !== "") ? repo.homepage : null,
      };
    });

  cacheSet(key, projects);
  return projects;
}

// Fetch featured projects from public/featured.json in the portfolio repo.
// Falls back to STATIC_FEATURED if fetch fails.
async function loadFeatured() {
  const key = "portfolio_featured";
  const cached = cacheGet(key);
  if (cached) return cached;

  const res = await fetch("/featured.json");
  if (!res.ok) throw new Error(`featured.json fetch failed: ${res.status}`);
  const data = await res.json();
  cacheSet(key, data);
  return data;
}

async function loadBlogs() {
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

