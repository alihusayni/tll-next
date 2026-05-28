import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: {
      'next/dist/build/polyfills/polyfill-module': require('path').resolve(__dirname, 'lib/empty-polyfill.js'),
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const path = require("path");
      config.resolve.alias = {
        ...config.resolve.alias,
        "next/dist/build/polyfills/polyfill-module": require("path").resolve(__dirname, "lib/empty-polyfill.js"),
      };
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'qxwyml8xuwxdgws0.public.blob.vercel-storage.com',
          port: '',
          pathname: '/**',
        },
      {
        protocol: 'https',
        hostname: 'www.tuanlelaw.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Example: { source: '/old-path', destination: '/new-path', permanent: true },
      {
        source: '/b-1-visa-permitted-activities-understanding-the-restrictions',
        destination: '/',
        permanent: true,
      },
      { source: '/contact-us', destination: '/', permanent: true },
      { source: '/contact-us/', destination: '/', permanent: true },
      {
        source: '/7-important-tips-for-immigration-to-california',
        destination:
          '/resources/how-to-prepare-strong-immigration-application-tips',
        permanent: true,
      },
      {
        source: '/7-important-tips-for-immigration-to-california/',
        destination:
          '/resources/how-to-prepare-strong-immigration-application-tips',
        permanent: true,
      },
      {
        source: '/how-to-prepare-strong-immigration-application-tips',
        destination:
          '/resources/how-to-prepare-strong-immigration-application-tips',
        permanent: true,
      },
      {
        source: '/how-to-prepare-strong-immigration-application-tips/',
        destination:
          '/resources/how-to-prepare-strong-immigration-application-tips',
        permanent: true,
      },
      {
        source:
          '/guide-to-h1b-visa-requirements-and-application-by-an-immigration-lawyer',
        destination: '/us-nonimmigrant-visas',
        permanent: true,
      },
      {
        source: '/eb-1-visas-requirements-eligibility-and-application',
        destination: '/us-immigrant-visas/employment-based-immigration',
        permanent: true,
      },
      { source: '/estate-planning', destination: '/', permanent: true },
      { source: '/about-us', destination: '/', permanent: true },
      { source: '/about-us/', destination: '/', permanent: true },
      {
        source:
          '/national-interest-waiver-everything-you-should-know-in-simple-words',
        destination: '/us-immigrant-visas/employment-based-immigration',
        permanent: true,
      },
      {
        source: '/become-u-s-citizen-explained-citizenship-lawyer',
        destination: '/citizenship-naturalization/become-a-us-citizen',
        permanent: true,
      },
      {
        source: '/business-and-employment-immigration',
        destination: '/us-immigrant-visas/employment-based-immigration',
        permanent: true,
      },
      {
        source: '/business-and-employment-immigration/',
        destination: '/us-immigrant-visas/employment-based-immigration',
        permanent: true,
      },
      {
        source: '/immigration',
        destination: '/us-immigrant-visas',
        permanent: true,
      },
      {
        source: '/immigration/',
        destination: '/us-immigrant-visas',
        permanent: true,
      },
      { source: '/bankruptcy', destination: '/', permanent: true },
      { source: '/bankruptcy/', destination: '/', permanent: true },
      {
        source: '/us-immigrant-visas/employment-based-immigration/h-1b',
        destination: '/us-nonimmigrant-visas',
        permanent: true,
      },
      {
        source: '/us-h1b-and-canada-pr-options-for-laid-off-h1b-visa-holders',
        destination: '/us-nonimmigrant-visas',
        permanent: true,
      },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/', destination: '/', permanent: true },
      {
        source: '/an-ultimate-guide-to-apply-for-the-b2-visa-by-yourself',
        destination: '/us-nonimmigrant-visas',
        permanent: true,
      },
      {
        source: '/speed-up-immigration-case-with-USCIS',
        destination: '/resources/expedite-uscis-case',
        permanent: true,
      },
      {
        source: '/speed-up-immigration-case-with-USCIS/',
        destination: '/resources/expedite-uscis-case',
        permanent: true,
      },
      {
        source:
          '/guide-naturalization-process-filing-form-n-400-and-other-steps',
        destination:
          '/citizenship-naturalization/guide-naturalization-process-filing-form-n-400-and-other-steps',
        permanent: true,
      },
      {
        source:
          '/guide-naturalization-process-filing-form-n-400-and-other-steps/',
        destination:
          '/citizenship-naturalization/guide-naturalization-process-filing-form-n-400-and-other-steps',
        permanent: true,
      },
      {
        source: '/how-to-avoid-immigration-application-errors',
        destination: '/resources/how-to-avoid-immigration-application-errors',
        permanent: true,
      },
      {
        source: '/how-to-avoid-immigration-application-errors/',
        destination: '/resources/how-to-avoid-immigration-application-errors',
        permanent: true,
      },
      {
        source: '/asylum-seekers-legal-rights-and-challenges-faced-in-the-u-s',
        destination:
          '/asylum-humanitarian-relief/asylum/asylum-seekers-rights-and-challenges',
        permanent: true,
      },
      {
        source: '/asylum-seekers-legal-rights-and-challenges-faced-in-the-u-s/',
        destination:
          '/asylum-humanitarian-relief/asylum/asylum-seekers-rights-and-challenges',
        permanent: true,
      },
      {
        source: '/green-card-through-marriage',
        destination:
          '/us-immigrant-visas/family-based-immigration/marriage-visas/green-card-through-marriage',
        permanent: true,
      },
      {
        source: '/green-card-through-marriage/',
        destination:
          '/us-immigrant-visas/family-based-immigration/marriage-visas/green-card-through-marriage',
        permanent: true,
      },
      {
        source: '/tips-successful-diversity-visa-application',
        destination: '/us-immigrant-visas',
        permanent: true,
      },
      {
        source: '/tips-successful-diversity-visa-application/',
        destination: '/us-immigrant-visas',
        permanent: true,
      },
      {
        source: '/common-immigration-questions-answered-immigration-lawyer',
        destination:
          '/resources/common-immigration-questions-answered-immigration-lawyer',
        permanent: true,
      },
      {
        source: '/common-immigration-questions-answered-immigration-lawyer/',
        destination:
          '/resources/common-immigration-questions-answered-immigration-lawyer',
        permanent: true,
      },
      {
        source: '/expedite-uscis-case-expert-tips-from-an-immigration-lawyer',
        destination: '/resources/expedite-uscis-case',
        permanent: true,
      },
      {
        source: '/expedite-uscis-case-expert-tips-from-an-immigration-lawyer/',
        destination: '/resources/expedite-uscis-case',
        permanent: true,
      },
      { source: '/news', destination: '/resources', permanent: true },
      { source: '/news/', destination: '/resources', permanent: true },
      {
        source: '/category/citizenship',
        destination: '/citizenship-naturalization',
        permanent: true,
      },
      {
        source: '/category/citizenship/',
        destination: '/citizenship-naturalization',
        permanent: true,
      },
      { source: '/success-stories', destination: '/', permanent: true },
      { source: '/success-stories/', destination: '/', permanent: true },
      {
        source:
          '/immigration-solutions/immigration-lawyer-assistance-us-immigration',
        destination: '/us-immigrant-visas',
        permanent: true,
      },
      {
        source: '/category/h1b-visa',
        destination: '/us-nonimmigrant-visas',
        permanent: true,
      },
      {
        source: '/category/h1b-visa/',
        destination: '/us-nonimmigrant-visas',
        permanent: true,
      },
      {
        source:
          '/citizenship-naturalization/become-u-s-citizen-explained-citizenship-lawyer',
        destination: '/citizenship-naturalization/become-a-us-citizen',
        permanent: true,
      },
      {
        source: '/naturalization-and-citizenship-lawyer',
        destination: '/citizenship-naturalization',
        permanent: true,
      },
      {
        source: '/naturalization-and-citizenship-lawyer/',
        destination: '/citizenship-naturalization',
        permanent: true,
      },
      { source: '/types-of-bankruptcy', destination: '/', permanent: true },
      { source: '/types-of-bankruptcy/', destination: '/', permanent: true },
      {
        source: '/bankruptcy-and-immigration-status',
        destination: '/',
        permanent: true,
      },
      {
        source: '/bankruptcy-and-immigration-status/',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/citizenship-naturalization/guide-naturalization-process-filing-form-n-400-and-other-steps',
        destination:
          '/citizenship-naturalization/guide-naturalization-process-filing-form-n-400-and-other-steps',
        permanent: true,
      },
      {
        source:
          '/deportation-defense/deportation-defense-strategies-to-fight-removal-proceedings',
        destination:
          '/deportation-defense/immigration-court-defense-strategies',
        permanent: true,
      },
      {
        source:
          '/employment-based-immigration/eb-2-employment-based-visas-whatever-you-need-to-know',
        destination: '/us-immigrant-visas/employment-based-immigration',
        permanent: true,
      },
      {
        source: '/us-immigrant-visas/family-based-immigration/marriage-visas',
        destination:
          '/us-immigrant-visas/family-based-immigration/marriage-visas/green-card-through-marriage',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
