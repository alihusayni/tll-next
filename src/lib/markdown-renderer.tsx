import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import { visit } from 'unist-util-visit';
import type { Root, Parent } from 'mdast';
import CtaWrapper from './cta-wrapper';

// Remark plugin to handle [[cta]] syntax
function remarkCta() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: any, index: number | undefined, parent: Parent | undefined) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (index !== undefined && parent) {
        const textContent = node.children
          .filter((child: any) => child.type === 'text') // eslint-disable-line @typescript-eslint/no-explicit-any
          .map((child: any) => child.value) // eslint-disable-line @typescript-eslint/no-explicit-any
          .join('');
        
        if (textContent.includes('[[cta]]')) {
          // Replace the entire paragraph with CTA component to avoid div-in-p issue
          parent.children[index] = {
            type: 'html',
            value: '<div data-cta="true"></div>'
          };
        }
      }
    });
  };
}

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkCta]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
      ]}
      components={{
        h1: ({ children, id, ...props }) => (
          <h1
            id={id}
            className="text-[62px] font-semibold mb-6 text-[#091C32] leading-[72px] font-inter-tight"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, id, ...props }) => (
          <h2
            id={id}
            className="text-[52px] font-semibold mb-4 mt-8 text-[#091C32] leading-[60px] font-inter-tight !scroll-mt-30"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, id, ...props }) => (
          <h3
            id={id}
            className="text-[40px] font-semibold mb-3 mt-6 text-[#091C32] leading-[50px] font-inter-tight"
            {...props}
          >
            {children}
          </h3>
        ),
        h4: ({ children, id, ...props }) => (
          <h4
            id={id}
            className="text-[32px] font-semibold mb-2 mt-4 text-[#091C32] leading-[38px] font-inter-tight"
            {...props}
          >
            {children}
          </h4>
        ),
        h5: ({ children, id, ...props }) => (
          <h5
            id={id}
            className="text-[24px] font-semibold mb-2 mt-3 text-[#091C32] leading-[32px] font-inter-tight"
            {...props}
          >
            {children}
          </h5>
        ),
        h6: ({ children, id, ...props }) => (
          <h6
            id={id}
            className="text-[20px] font-semibold mb-2 mt-2 text-[#091C32] leading-[24px] font-inter-tight"
            {...props}
          >
            {children}
          </h6>
        ),
        p: ({ children, ...props }) => {
           // Check if children contain block elements and handle them properly
           const hasBlockElement = React.Children.toArray(children).some((child: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
             React.isValidElement(child) && (
               child.type === 'div' ||
               child.type === 'table' ||
               child.type === 'ul' ||
               child.type === 'ol' ||
               child.type === 'blockquote' ||
               child.type === 'pre' ||
               child.type === 'h1' ||
               child.type === 'h2' ||
               child.type === 'h3' ||
               child.type === 'h4' ||
               child.type === 'h5' ||
               child.type === 'h6'
             )
           );

           if (hasBlockElement) {
             // If paragraph contains block element, render as div to avoid invalid HTML
             return (
               <div className="text-[18px] leading-[24px] mb-4 text-[#071C32] font-inter-tight" {...props}>
                 {children}
               </div>
             );
           }

           return (
             <p className="text-[18px] leading-[24px] mb-4 text-[#071C32] font-inter-tight" {...props}>
               {children}
             </p>
           );
         },
        blockquote: ({ children, ...props }) => (
          <blockquote 
            className="border-l-4 border-[#E6EAF0] pl-4 italic my-6 text-[#071C32] bg-[#F5F7FA] py-2 font-inter-tight"
            {...props}
          >
            {children}
          </blockquote>
        ),
        ul: ({ children, ...props }) => (
          <ul className="list-disc list-inside mb-4 space-y-2 text-[#071C32] font-inter-tight" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-[#071C32] font-inter-tight" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="text-[#071C32] font-inter-tight" {...props}>
            {children}
          </li>
        ),
        strong: ({ children, ...props }) => (
          <strong className="font-semibold text-[#091C32] font-inter-tight" {...props}>
            {children}
          </strong>
        ),
        em: ({ children, ...props }) => (
          <em className="italic text-[#071C32] font-inter-tight" {...props}>
            {children}
          </em>
        ),
        code: ({ children, className, ...props }) => {
          const isInline = !className?.includes('language-');
          if (isInline) {
            return (
              <code className="bg-[#F5F7FA] px-2 py-1 rounded text-sm text-[#091C32] font-inter-tight" {...props}>
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-[#F5F7FA] p-4 rounded-lg overflow-x-auto text-sm text-[#091C32] font-inter-tight" {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children, ...props }) => (
          <pre className="bg-[#F5F7FA] p-4 rounded-lg overflow-x-auto mb-4 font-inter-tight" {...props}>
            {children}
          </pre>
        ),
        a: ({ children, href, ...props }) => (
          <a 
            href={href} 
            className="text-[#091C32] hover:text-[#071C32] underline transition-colors font-inter-tight"
            {...props}
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => {
           if (!src || typeof src !== 'string') return null;

           return (
             <img src={src} alt={alt || ''} className="my-6" />
           );
         },
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-[#E6EAF0]" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-[#F5F7FA]" {...props}>
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th className="border border-[#E6EAF0] px-4 py-2 text-left font-semibold text-[#091C32] font-['Inter_Tight']" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="border border-[#E6EAF0] px-4 py-2 text-[#071C32] font-['Inter']" {...props}>
            {children}
          </td>
        ),
        hr: () => (
          <hr className="my-8 border-[#E6EAF0]" />
        ),
div: ({ children, ...props }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((props as any)['data-cta'] === 'true') {
            return <CtaWrapper />;
          }
          return <div {...props}>{children}</div>;
        },
        
      }}
    >
      {content}
    </ReactMarkdown>
  );
}