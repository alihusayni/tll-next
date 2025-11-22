import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Content, ContentMeta, Heading } from '@/types/content';
import { slugify } from '@/utils/slugify';

const contentDirectory = path.join(process.cwd(), 'content');

// Static file extensions to filter out from routing
const staticFileExtensions = [
  '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '.less',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.tar', '.gz'
];

function isStaticFile(path: string): boolean {
  const ext = path.substring(path.lastIndexOf('.'));
  return staticFileExtensions.includes(ext);
}

export 

function extractHeadingsFromMarkdown(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\{#([^}]+)\}$/, '').trim(); // Remove explicit IDs
      // Clean text for ID generation (remove markdown formatting)
      const cleanText = text.replace(/\*\*/g, '').replace(/&nbsp;/g, ' ').replace(/&bull;/g, '').trim();
      const id = slugify(cleanText);

      headings.push({
        id,
        text,
        level
      });
    }
  });

  return headings;
}

export function getContentPaths(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const paths: string[] = [];
  
  function scanDirectory(dir: string, relativePath: string = ''): void {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const itemRelativePath = relativePath ? `${relativePath}/${item}` : item;
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, itemRelativePath);
      } else if (item.endsWith('.md')) {
        const slug = itemRelativePath.replace(/\.md$/, '');
        paths.push(slug);
      }
    }
  }
  
  scanDirectory(contentDirectory);
  return paths.sort();
}

export function getContentBySlug(slug: string): Content | null {
  if (!slug) return null;
  
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    // Extract headings from markdown content
    const headings = extractHeadingsFromMarkdown(content);
    
    // Build content meta with fallbacks for compatibility
    const meta: ContentMeta = {
      // New structured fields
      h1: frontmatter.h1 || frontmatter.title,
      summary: frontmatter.summary || frontmatter.description,
      metaTitle: frontmatter.metaTitle || frontmatter.title,
      metaDescription: frontmatter.metaDescription || frontmatter.description,
      keywords: frontmatter.keywords,
      ogTitle: frontmatter.ogTitle || frontmatter.title,
      ogDescription: frontmatter.ogDescription || frontmatter.description,
      ogImage: frontmatter.ogImage || frontmatter.imageSrc,
      robots: frontmatter.robots,
      author: frontmatter.author,
      publishedTime: frontmatter.publishedTime || frontmatter.date,
      modifiedTime: frontmatter.modifiedTime,
      
      // Legacy compatibility fields
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      readTime: frontmatter.readTime,
      imageSrc: frontmatter.imageSrc,
      imageAlt: frontmatter.imageAlt,
      
      // Include any additional frontmatter fields
      ...Object.fromEntries(
        Object.entries(frontmatter).filter(([key]) => 
          ![
            'h1', 'summary', 'metaTitle', 'metaDescription', 'keywords',
            'ogTitle', 'ogDescription', 'ogImage', 'robots', 'author',
            'publishedTime', 'modifiedTime', 'title', 'description',
            'date', 'readTime', 'imageSrc', 'imageAlt'
          ].includes(key)
        )
      )
    };
    
    return {
      meta,
      content,
      headings,
      slug
    };
  } catch (error) {
    console.error(`Error reading content for slug: ${slug}`, error);
    return null;
  }
}

export function getAllContent(): Content[] {
  const paths = getContentPaths();
  const allContent: Content[] = [];
  
  for (const slug of paths) {
    const content = getContentBySlug(slug);
    if (content) {
      allContent.push(content);
    }
  }
  
  return allContent;
}

export function generateStaticParams() {
  const paths = getContentPaths();
  return paths
    .filter(path => path !== 'index' && !isStaticFile(path))
    .map(path => ({ slug: path.split('/') }));
}

export function generateBreadcrumbs(slug: string): Array<{ label: string; href: string }> {
  if (!slug || slug === 'index') {
    return [];
  }
  
  const parts = slug.split('/');
  const breadcrumbs: Array<{ label: string; href: string }> = [];
  
  parts.forEach((part, index) => {
    const href = '/' + parts.slice(0, index + 1).join('/');
    const label = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    breadcrumbs.push({ label, href });
  });
  
  return breadcrumbs;
}

// Resources page specific functions

export function getAllResourceArticles(): Content[] {
  const allContent = getAllContent();
  
  // Filter out any content that doesn't have publishedTime (non-articles)
  return allContent
    .filter(content => content.meta.publishedTime)
    .sort((a, b) => {
      const dateA = new Date(a.meta.publishedTime || '');
      const dateB = new Date(b.meta.publishedTime || '');
      return dateB.getTime() - dateA.getTime();
    });
}

export function getFeaturedArticles(): Content[] {
  const allArticles = getAllResourceArticles();
  return allArticles.filter(article => article.meta.featured === true).slice(0, 3);
}

export function getArticlesByCategory(category: string): Content[] {
  if (category === 'all-articles' || !category) {
    return getAllResourceArticles();
  }
  
  const allArticles = getAllResourceArticles();
  return allArticles.filter(article => {
    // Get the top-level folder from the slug (e.g., "resources" from "resources/article-name")
    const topLevelFolder = article.slug.split('/')[0];
    return topLevelFolder === category;
  });
}

export function getContentCategories(): Array<{ id: string; label: string }> {
  const allContent = getAllContent();
  const categorySet = new Set<string>();
  
  allContent.forEach(content => {
    if (content.meta.publishedTime) {
      const topLevelFolder = content.slug.split('/')[0];
      categorySet.add(topLevelFolder);
    }
  });
  
  const categories = Array.from(categorySet).map(cat => ({
    id: cat,
    label: cat.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }));
  
  // Sort alphabetically by label
  categories.sort((a, b) => a.label.localeCompare(b.label));
  
  // Add "All Articles" at the beginning
  return [
    { id: 'all-articles', label: 'All Articles' },
    ...categories
  ];
}

// Category page specific functions

export function isValidCategory(category: string): boolean {
  const categories = getContentCategories();
  return categories.some(cat => cat.id === category && cat.id !== 'all-articles');
}

export function getCategoryArticles(category: string): Content[] {
  if (!category) {
    return [];
  }
  
  const allArticles = getAllResourceArticles();
  return allArticles.filter(article => {
    const slugParts = article.slug.split('/');
    const topLevelFolder = slugParts[0];
    // Include articles where the top-level folder matches the category
    // and the article is not just the category itself (must be in a subdirectory)
    return topLevelFolder === category && slugParts.length > 1;
  });
}

export function getCategoryFeaturedArticles(category: string): Content[] {
  const categoryArticles = getCategoryArticles(category);
  return categoryArticles
    .filter(article => article.meta.featured === true)
    .slice(0, 3);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Content[] {
  const slugParts = currentSlug.split('/');
  const category = slugParts[0];
  
  if (!category) {
    return [];
  }
  
  const categoryArticles = getCategoryArticles(category);
  
  // Filter out the current article and return random articles from the same category
  return categoryArticles
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit);
}