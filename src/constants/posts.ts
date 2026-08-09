import raw from "../content/blog.json";
import type { BlogPost } from "../types";

/**
 * Article metadata. The same JSON drives the static page generator in
 * scripts/build-static.mjs, so the SPA and the published pages never disagree.
 */
export const posts: BlogPost[] = (raw as BlogPost[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostUrl(slug: string): string {
  return getPost(slug)?.url ?? "/blog.html";
}
