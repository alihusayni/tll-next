/**
 * src/lib/content.ts — refactored to read from a generated TypeScript data array
 * instead of parsing Markdown files at runtime with fs / gray-matter.
 *
 * Data source: src/data/generated-pages.ts  (run scripts/md-to-ts.mjs to refresh)
 *
 * All exported function signatures are identical to the original file so that
 * page.tsx, templates, and other consumers require zero changes.
 */

import { pages, type ContentPage } from '@/data/generated-pages';
import { slugify }                 from '@/utils/slugify';
import type { Content, ContentMeta, Heading } from '@/types/content';

// ─────────────────────────────────────────────────────────────────────────────
// Heading extraction (same logic as before — applied to serviceBody)
// ─────────────────────────────────────────────────────────────────────────────

export function extractHeadingsFromMarkdown(content: string): Heading[] {
  const headings: Heading[] = [];

  content.split('\n').forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level     = match[1].length;
      const text      = match[2].replace(/\{#([^}]+)\}$/, '').trim();
      const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&bull;/g, '')
        .trim();
      headings.push({ id: slugify(cleanText), text, level });
    }
  });

  return headings;
}

// ─────────────────────────────────────────────────────────────────────────────
// Adapter: ContentPage → Content (shape InternalTemplate / templates expect)
// ─────────────────────────────────────────────────────────────────────────────

function toContent(page: ContentPage): Content {
  const body     = page.serviceBody ?? '';
  const headings = extractHeadingsFromMarkdown(body);

  const meta: ContentMeta = {
    // Hero / H1
    h1:                 page.heroTitle ?? '',
    title:              page.heroTitle ?? '',
    summary:            page.heroDescription ?? '',
    description:        page.heroDescription ?? '',
    // SEO
    metaTitle:          page.metaTitle        ?? page.heroTitle        ?? '',
    metaDescription:    page.metaDescription  ?? page.heroDescription  ?? '',
    keywords:           page.keywords,
    robots:             page.robots           ?? 'index,follow',
    // Open Graph
    ogTitle:            page.ogTitle          ?? page.metaTitle        ?? '',
    ogDescription:      page.ogDescription    ?? page.metaDescription  ?? '',
    ogImage:            page.imageSrc         ?? '',
    // Authorship
    author:             page.author           ?? '',
    publishedTime:      page.publishedTime    ?? '',
    modifiedTime:       page.modifiedTime     ?? '',
    readTime:           page.readTime         ?? '',
    // Legacy compat fields used by templates
    date:               page.publishedTime    ?? '',
    imageSrc:           page.imageSrc         ?? '',
    imageAlt:           page.imageAlt         ?? '',
  };

  return { meta, content: body, headings, slug: page.slug };
}

// ─────────────────────────────────────────────────────────────────────────────
// Core lookup functions
// ─────────────────────────────────────────────────────────────────────────────

/** All known slugs (replaces fs directory scan). */
export function getContentPaths(): string[] {
  return pages.map(p => p.slug).sort();
}

/** Look up a page by slug. Returns null when not found. */
export function getContentBySlug(slug: string): Content | null {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug);
  const page    = pages.find(p => p.slug === decoded);
  return page ? toContent(page) : null;
}

/** All pages as Content objects. */
export function getAllContent(): Content[] {
  return pages.map(toContent);
}

/** generateStaticParams — aliased as generateContentPaths in page.tsx */
export function generateStaticParams() {
  return pages.map(p => ({ slug: p.slug.split('/') }));
}

export function generateBreadcrumbs(slug: string): Array<{ label: string; href: string }> {
  if (!slug || slug === 'index') return [];
  return slug.split('/').map((part, i, parts) => ({
    href:  '/' + parts.slice(0, i + 1).join('/'),
    label: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Resources / article helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getAllResourceArticles(): Content[] {
  return pages
    .filter(p => !!p.publishedTime)
    .sort((a, b) =>
      new Date(b.publishedTime!).getTime() - new Date(a.publishedTime!).getTime(),
    )
    .map(toContent);
}

export function getFeaturedArticles(): Content[] {
  return getAllResourceArticles()
    .filter(c => (c.meta as Record<string, unknown>).featured === true)
    .slice(0, 3);
}

export function getArticlesByCategory(category: string): Content[] {
  if (category === 'all-articles' || !category) return getAllResourceArticles();
  return getAllResourceArticles().filter(c => c.slug.split('/')[0] === category);
}

export function getContentCategories(): Array<{ id: string; label: string }> {
  const seen = new Set<string>();
  pages
    .filter(p => !!p.publishedTime)
    .forEach(p => seen.add(p.slug.split('/')[0]));

  const cats = Array.from(seen)
    .filter(cat => cat !== 'citizenship-naturalization')
    .map(cat => ({
      id:    cat,
      label: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [{ id: 'all-articles', label: 'All Articles' }, ...cats];
}

export function isValidCategory(category: string): boolean {
  return getContentCategories().some(c => c.id === category && c.id !== 'all-articles');
}

export function getCategoryArticles(category: string): Content[] {
  if (!category) return [];
  return getAllResourceArticles().filter(c => {
    const parts = c.slug.split('/');
    return parts[0] === category && parts.length > 1;
  });
}

export function getCategoryFeaturedArticles(category: string): Content[] {
  return getCategoryArticles(category)
    .filter(c => (c.meta as Record<string, unknown>).featured === true)
    .slice(0, 3);
}

export function getRelatedArticles(currentSlug: string, limit = 3): Content[] {
  const category = currentSlug.split('/')[0];
  if (!category) return [];
  return getCategoryArticles(category)
    .filter(c => c.slug !== currentSlug)
    .slice(0, limit);
}