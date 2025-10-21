export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface ContentMeta {
  // Basic content metadata
  h1?: string;
  summary?: string;
  
  // SEO metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  
  // Article metadata
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  
  // Legacy compatibility (for existing templates)
  title?: string;
  description?: string;
  date?: string;
  readTime?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface Content {
  meta: ContentMeta;
  content: string; // Raw markdown content
  headings: Heading[];
  slug: string;
}