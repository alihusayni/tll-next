interface BreadcrumbProps {
  path: string;
}

export default function Breadcrumb({ path }: BreadcrumbProps) {
  // Placeholder implementation
  return <div className="text-center text-base text-gray-600">{path}</div>;
}