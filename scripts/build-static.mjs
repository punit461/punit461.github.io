/**
 * Generates the static, non-SPA parts of the site into dist/ after `vite build`.
 *
 * Produces the blog index, one page per article, the legal pages, redirect stubs
 * for the old standalone pages, sitemap.xml and feed.xml.
 *
 * Article URLs are deliberately identical to the previous Jekyll site's URLs so
 * existing search rankings and inbound links keep working.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const CONTENT = join(ROOT, "src/content");

/** Shared stylesheet for every generated page; emitted below. */
const PAGE_CSS_HREF = "/assets/page.css";

const site = readJson(join(CONTENT, "site.json"));
const postsMeta = readJson(join(CONTENT, "blog.json")).sort((a, b) =>
  b.date.localeCompare(a.date)
);
const projects = readJson(join(CONTENT, "projects.json"));

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function write(relPath, contents) {
  const target = join(DIST, relPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents, "utf8");
  return relPath;
}

// ---------------------------------------------------------------- templates

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;

const ADSENSE = `<meta name="google-adsense-account" content="${site.adsenseClient}">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}" crossorigin="anonymous"></script>`;

function navBar(current) {
  const link = (href, label, key) =>
    `<li><a href="${href}"${current === key ? ' aria-current="page"' : ""}>${label}</a></li>`;

  return `<header class="nav">
    <div class="nav-inner">
      <a class="logo" href="/">Punit<span>.</span>Bharadwaj</a>
      <nav aria-label="Primary">
        <ul class="nav-links">
          ${link("/", "Home", "home")}
          ${link("/#about", "About", "about")}
          ${link("/#projects", "Work", "projects")}
          ${link("/blog.html", "Blog", "blog")}
          <li><a href="${site.toolzonexUrl}" target="_blank" rel="noopener noreferrer">ToolZoneX</a></li>
          ${link("/#contact", "Contact", "contact")}
        </ul>
      </nav>
    </div>
  </header>`;
}

function siteFooter() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-links">
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms &amp; Conditions</a>
        <a href="/#contact">Contact</a>
        <a href="/feed.xml">RSS</a>
      </div>
      <p class="copyright">&copy; ${new Date().getFullYear()} ${esc(site.name)}. All rights reserved.</p>
    </div>
  </footer>`;
}

function layout({ title, description, canonical, nav, body, jsonLd }) {
  return `<!DOCTYPE html>
<html lang="${site.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${site.url}${canonical}">
  <meta name="theme-color" content="#0a0a0b">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">

  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${site.url}${canonical}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">

  ${ADSENSE}

  ${FONTS}
  <link rel="stylesheet" href="${PAGE_CSS_HREF}">
${jsonLd ? `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n` : ""}</head>
<body>
  <div class="noise" aria-hidden="true"></div>
  ${nav}
  <main>
${body}
  </main>
  ${siteFooter()}
</body>
</html>
`;
}

// ------------------------------------------------------------------- pages

function relatedProjectBlock(post) {
  if (!post.relatedProject) return "";
  const project = projects.find((p) => p.id === post.relatedProject);
  if (!project) return "";

  const links = [
    project.github
      ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer">View on GitHub</a>`
      : "",
    project.live
      ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
      : "",
    `<a href="/#projects">All Projects</a>`,
  ]
    .filter(Boolean)
    .join("\n        ");

  return `    <aside class="related">
      <h2>Related Project</h2>
      <p><strong>${esc(project.title)}</strong> — ${esc(project.description)}</p>
      <div class="related-links">
        ${links}
      </div>
    </aside>
`;
}

function articlePage(post, index) {
  const body = readFileSync(join(CONTENT, "posts", `${post.slug}.html`), "utf8");
  const newer = postsMeta[index - 1];
  const older = postsMeta[index + 1];

  const footerNav = `    <nav class="article-footer" aria-label="More articles">
      ${older ? `<a class="btn" href="${older.url}">&larr; ${esc(older.title)}</a>` : `<a class="btn" href="/blog.html">&larr; All articles</a>`}
      ${newer ? `<a class="btn" href="${newer.url}">${esc(newer.title)} &rarr;</a>` : `<a class="btn btn-solid" href="/#contact">Get in touch &rarr;</a>`}
    </nav>
`;

  const content = `    <p class="eyebrow">${esc(post.tag)}</p>
    <h1>${esc(post.title)}</h1>
    <div class="article-meta">
      <time datetime="${post.date}">${esc(post.dateDisplay)}</time>
      <span>&bull;</span>
      <span>${esc(post.readTime)}</span>
      <span>&bull;</span>
      <span>${esc(site.name)}</span>
    </div>
${relatedProjectBlock(post)}    <article class="prose">
${body
  .split("\n")
  .map((l) => (l.trim() ? `      ${l}` : l))
  .join("\n")}
    </article>
${footerNav}`;

  return layout({
    title: `${post.title} — ${site.name}`,
    description: post.description,
    canonical: post.url,
    nav: navBar("blog"),
    body: content,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Person", name: site.name, url: site.url },
      publisher: { "@type": "Person", name: site.name },
      mainEntityOfPage: `${site.url}${post.url}`,
      keywords: post.tag,
    },
  });
}

function blogIndexPage() {
  const items = postsMeta
    .map(
      (post) => `        <li>
          <a href="${post.url}">
            <div class="post-meta">
              <span class="tag">${esc(post.tag)}</span>
              <time datetime="${post.date}">${esc(post.dateDisplay)}</time>
              <span>${esc(post.readTime)}</span>
            </div>
            <h2 class="post-title">${esc(post.title)}</h2>
            <p class="post-excerpt">${esc(post.excerpt)}</p>
          </a>
        </li>`
    )
    .join("\n");

  const body = `    <p class="eyebrow">Writing</p>
    <h1>Blog &amp; Articles</h1>
    <p class="lede">Deep dives, tutorials, and thoughts on AI/ML engineering, autonomous agents, and building scalable systems.</p>
    <ul class="post-list">
${items}
    </ul>
`;

  return layout({
    title: `Blog — ${site.name}`,
    description:
      "Articles on AI/ML engineering, autonomous agents, computer vision, and building scalable systems by Punit Bharadwaj.",
    canonical: "/blog.html",
    nav: navBar("blog"),
    body,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `Blog — ${site.name}`,
      url: `${site.url}/blog.html`,
      author: { "@type": "Person", name: site.name, url: site.url },
      blogPost: postsMeta.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        datePublished: p.date,
        url: `${site.url}${p.url}`,
      })),
    },
  });
}

function legalPage(slug, title) {
  const body = readFileSync(join(CONTENT, "legal", `${slug}.html`), "utf8");
  return layout({
    title: `${title} — ${site.name}`,
    description: `${title} for ${site.url}.`,
    canonical: `/${slug}.html`,
    nav: navBar(slug),
    body: `    <h1>${esc(title)}</h1>
    <div class="prose">
${body
  .split("\n")
  .map((l) => (l.trim() ? `      ${l}` : l))
  .join("\n")}
    </div>
`,
  });
}

/**
 * The old site had standalone about/projects/contact pages; those are now
 * sections of the single-page app. Keep the URLs alive with a canonical
 * redirect rather than letting them 404.
 */
function redirectPage(target, label) {
  return `<!DOCTYPE html>
<html lang="${site.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(label)} — ${esc(site.name)}</title>
  <link rel="canonical" href="${site.url}${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <meta name="robots" content="noindex, follow">
  <script>window.location.replace(${JSON.stringify(target)});</script>
</head>
<body style="background:#0a0a0b;color:#f2f1ed;font-family:Inter,Arial,sans-serif;padding:48px;">
  <p>This page has moved. <a href="${target}" style="color:#ff4e2d;">Continue to ${esc(label)}</a>.</p>
</body>
</html>
`;
}

function sitemap() {
  const urls = [
    { loc: "/", priority: "1.0" },
    { loc: "/blog.html", priority: "0.8" },
    ...postsMeta.map((p) => ({ loc: p.url, priority: "0.7", lastmod: p.date })),
    { loc: "/privacy.html", priority: "0.3" },
    { loc: "/terms.html", priority: "0.3" },
  ];

  const today = new Date().toISOString().slice(0, 10);
  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${site.url}${u.loc}</loc>
    <lastmod>${u.lastmod ?? today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function feed() {
  const items = postsMeta
    .map(
      (post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${site.url}${post.url}</link>
      <guid isPermaLink="true">${site.url}${post.url}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(post.tag)}</category>
      <description>${esc(post.excerpt)}</description>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Blog</title>
    <link>${site.url}/blog.html</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(site.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

// -------------------------------------------------------------------- run

const written = [];

written.push(write("assets/page.css", readFileSync(join(ROOT, "scripts/templates/page.css"), "utf8")));

postsMeta.forEach((post, i) => {
  written.push(write(post.url.replace(/^\//, ""), articlePage(post, i)));
});

written.push(write("blog.html", blogIndexPage()));
written.push(write("privacy.html", legalPage("privacy", "Privacy Policy")));
written.push(write("terms.html", legalPage("terms", "Terms & Conditions")));

written.push(write("about.html", redirectPage("/#about", "About")));
written.push(write("projects.html", redirectPage("/#projects", "Projects")));
written.push(write("contact.html", redirectPage("/#contact", "Contact")));

written.push(write("sitemap.xml", sitemap()));
written.push(write("feed.xml", feed()));

console.log(`\nbuild-static: wrote ${written.length} files to dist/`);
for (const f of written) console.log(`  ${f}`);
