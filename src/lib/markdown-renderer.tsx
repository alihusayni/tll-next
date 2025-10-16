import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import CtaWrapper from './cta-wrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: any = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h2: (props: any) => <h2 className="text-3xl font-semibold mb-4 mt-8 text-gray-800" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: (props: any) => <h3 className="text-2xl font-medium mb-3 mt-6 text-gray-700" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h4: (props: any) => <h4 className="text-xl font-medium mb-2 mt-4 text-gray-700" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h5: (props: any) => <h5 className="text-lg font-medium mb-2 mt-3 text-gray-700" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h6: (props: any) => <h6 className="text-base font-medium mb-2 mt-2 text-gray-700" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: (props: any) => <p className="text-base leading-relaxed mb-4 text-gray-600" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700" {...props} />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-600" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  li: (props: any) => <li className="text-gray-600" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strong: (props: any) => <strong className="font-semibold text-gray-900" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  em: (props: any) => <em className="italic text-gray-700" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: (props: any) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: (props: any) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),
  CtaWrapper,
};

interface MarkdownRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
}

export default function MarkdownRenderer({ source }: MarkdownRendererProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}