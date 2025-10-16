import ArticleTemplate from '@/templates/article-template';
import { Content } from '@/types/content';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
import type { Root, Text, Parent } from 'mdast';

// remarkCta plugin
function remarkCta() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (node.value.includes('[[cta]]') && index !== undefined && parent) {
        const parts = node.value.split('[[cta]]');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newChildren: any[] = [];

        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            newChildren.push({ type: 'text', value: parts[i] });
          }
          if (i < parts.length - 1) {
            newChildren.push({
              type: 'mdxJsxFlowElement',
              name: 'CtaWrapper',
              attributes: [],
              children: []
            });
          }
        }

        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  // Placeholder content - in Phase 11, this will be fetched based on slug
  const markdownContent = `
# How to Speed Up Your Immigration Case with USCIS: 6 Proven Tips

Applying for a U.S. visa, green card, or citizenship through the United States Citizenship and Immigration Services (USCIS) can feel like watching paint dry—especially when you're racing against time. Whether you're chasing a work visa deadline, reuniting with family, or securing permanent residency, delays can turn an already stressful process into a nightmare. Fortunately, you don't have to sit idly by. With the right strategies, you can learn how to speed up your immigration case and sidestep unnecessary holdups.

## Common Causes of USCIS Delays: What Slows Down Your Case?

Before we dive into how to speed up your immigration case, it's worth understanding why delays happen in the first place. The U.S. immigration system is complex, and processing times can stretch from weeks to years depending on a variety of factors. Knowing these obstacles upfront empowers you to anticipate issues, avoid pitfalls, and take proactive steps to keep your case on track.

### USCIS Backlogs

High application volumes often overwhelm USCIS, creating backlogs that stretch processing times.

> Tuan Le is an excellent immigration lawyer who helped me through the entire process.

### Case Complexity

If your application has missing information, errors, or unusual circumstances, USCIS may need more time.

Article content placeholder - full content will be implemented in Phase 11.

[[cta]]
  `;

  const mdxSource = await serialize(markdownContent, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkCta],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });

  const content: Content = {
    meta: {
      title: 'How to Speed Up Your Immigration Case with USCIS: 6 Proven Tips',
      description: 'Applying for a U.S. visa, green card, or citizenship through the United States Citizenship and Immigration Services (USCIS) can feel like watching paint dry—especially when you\'re racing against time.',
      imageSrc: '/assets/blog/blog_post.png',
      imageAlt: 'Blog post illustration',
      date: 'March 30, 2025',
      readTime: '12 min read',
    },
    content: mdxSource,
    headings: [
      { id: 'how-to-speed-up-your-immigration-case-with-uscis-6-proven-tips', text: 'How to Speed Up Your Immigration Case with USCIS: 6 Proven Tips', level: 1 },
      { id: 'common-causes-of-uscis-delays-what-slows-down-your-case', text: 'Common Causes of USCIS Delays: What Slows Down Your Case?', level: 2 },
      { id: 'uscis-backlogs', text: 'USCIS Backlogs', level: 3 },
      { id: 'case-complexity', text: 'Case Complexity', level: 3 },
    ],
  };

  return <ArticleTemplate content={content} slug={params.slug} />;
}