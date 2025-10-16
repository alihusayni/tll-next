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
  title: string;
  description: string;
  date: string;
  readTime: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Content {
  meta: ContentMeta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // Serialized MDX source
  headings: Heading[];
}