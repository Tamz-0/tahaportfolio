function parseMarkdown(md) {
  if (!md) return "";
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const esc = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
      return `<pre class="bm-code-block"><code>${esc}</code></pre>`;
    })
    .replace(/^### (.+)$/gm,"<h3>$1</h3>")
    .replace(/^## (.+)$/gm,"<h2>$1</h2>")
    .replace(/^# (.+)$/gm,"<h1>$1</h1>")
    .replace(/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/\*(.+?)\*/g,"<em>$1</em>")
    .replace(/`([^`]+)`/g,"<code>$1</code>")
    .replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>")
    .replace(/^[-*] (.+)$/gm,"<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm,"<li>$1</li>")
    .replace(/^---$/gm,"<hr>")
    .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/((<li>.*<\/li>\n?)+)/g,"<ul>$1</ul>");
  const lines = html.split("\n");
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr)/.test(t)) { out.push(t); }
    else { out.push(`<p>${t}</p>`); }
  }
  return out.join("\n");
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data = {};
  m[1].split("\n").forEach(line => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val.slice(1,-1).split(",").map(v => v.trim());
    } else {
      data[key] = val.replace(/^["']|["']$/g,"");
    }
  });
  return { data, content: m[2] };
}
