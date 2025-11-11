import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tuanlelaw.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tuanlelaw.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
    async redirects() {
        return [
            {
                source: '/us-immigration-policy-2025',
                destination: '/immigration-solutions/us-immigration-policy-2025',
                permanent: true,
            },
            {
                source: '/7-important-tips-for-immigration-to-california',
                destination: '/immigration-solutions/7-important-tips-for-immigration-to-california',
                permanent: true,
            },
            {
                source: '/about-us',
                destination: '/',
                permanent: true,
            },
            {
                source: '/an-ultimate-guide-to-apply-for-the-b2-visa-by-yourself',
                destination: '/employment-based-immigration/eb-2/an-ultimate-guide-to-apply-for-the-b2-visa-by-yourself',
                permanent: true,
            },
            {
                source: '/application-for-asylum-in-the-usa',
                destination: '/asylum-humanitarian-relief/asylum/application-for-asylum-in-the-usa',
                permanent: true,
            },
            {
                source: '/application-for-employment-authorization-how-to-file-form-i-765',
                destination: '/immigration-solutions/application-for-employment-authorization-how-to-file-form-i-765',
                permanent: true,
            },
            {
                source: '/asylum-seekers-legal-rights-and-challenges-faced-in-the-u-s',
                destination: '/asylum-humanitarian-relief/asylum/asylum-seekers-legal-rights-and-challenges-faced-in-the-u-s',
                permanent: true,
            },
            {
                source: '/b-1-visa-permitted-activities-understanding-the-restrictions',
                destination: '/employment-based-immigration/eb-1/b-1-visa-permitted-activities-understanding-the-restrictions',
                permanent: true,
            },
            {
                source: '/bankruptcy-and-immigration-status',
                destination: '/',
                permanent: true,
            },
            {
                source: '/bankruptcy-reform',
                destination: '/',
                permanent: true,
            },
            {
                source: '/become-u-s-citizen-explained-citizenship-lawyer',
                destination: '/citizenship-naturalization/become-u-s-citizen-explained-citizenship-lawyer',
                permanent: true,
            },
            {
                source: '/blog',
                destination: '/',
                permanent: true,
            },
            {
                source: '/common-immigration-questions-answered-immigration-lawyer',
                destination: '/',
                permanent: true,
            },
            {
                source: '/consular-processing-to-get-your-green-card',
                destination: '/us-visas/us-immigrant-visas/consular-processing-to-get-your-green-card',
                permanent: true,
            },
            {
                source: '/contact-us',
                destination: '/',
                permanent: true,
            },
            {
                source: '/deportation-defense-strategies-to-fight-removal-proceedings',
                destination: '/deportation-defense/deportation-defense-strategies-to-fight-removal-proceedings',
                permanent: true,
            },
            {
                source: '/eb-1-visas-requirements-eligibility-and-application',
                destination: '/employment-based-immigration/eb-1/eb-1-visas-requirements-eligibility-and-application',
                permanent: true,
            },
            {
                source: '/eb-2-employment-based-visas-whatever-you-need-to-know',
                destination: '/employment-based-immigration/eb-2-employment-based-visas-whatever-you-need-to-know',
                permanent: true,
            },
            {
                source: '/estate-planning-attorney',
                destination: '/',
                permanent: true,
            },
            {
                source: '/expedite-uscis-case-expert-tips-from-an-immigration-lawyer',
                destination: '/immigration-solutions/expedite-uscis-case-expert-tips-from-an-immigration-lawyer',
                permanent: true,
            },
            {
                source: '/f-1-student-visa-application-and-embassy-interview',
                destination: '/us-visas/us-nonimmigrant-visas/student-visas/f-1-student-visa-application-and-embassy-interview',
                permanent: true,
            },
            {
                source: '/faq',
                destination: '/',
                permanent: true,
            },
            {
                source: '/green-card-through-marriage',
                destination: '/family-based-immigration/marriage-visas/green-card-through-marriage',
                permanent: true,
            },
            {
                source: '/guide-naturalization-process-filing-form-n-400-and-other-steps',
                destination: '/citizenship-naturalization/guide-naturalization-process-filing-form-n-400-and-other-steps',
                permanent: true,
            },
            {
                source: '/guide-to-h1b-visa-requirements-and-application-by-an-immigration-lawyer',
                destination: '/employment-based-immigration/h-1b/guide-to-h1b-visa-requirements-and-application-by-an-immigration-lawyer',
                permanent: true,
            },
            {
                source: '/how-to-avoid-immigration-application-errors',
                destination: '/immigration-solutions/how-to-avoid-immigration-application-errors',
                permanent: true,
            },
            {
                source: '/how-to-prepare-strong-immigration-application-tips',
                destination: '/immigration-solutions/how-to-prepare-strong-immigration-application-tips',
                permanent: true,
            },
            {
                source: '/immigration-court-defense-strategies-immigration-lawyer',
                destination: '/deportation-defense/immigration-court-defense-strategies-immigration-lawyer',
                permanent: true,
            },
            {
                source: '/immigration-lawyer-assistance-us-immigration',
                destination: '/immigration-solutions/immigration-lawyer-assistance-us-immigration',
                permanent: true,
            },
            {
                source: '/immigration-status-and-child-custody-legal-considerations',
                destination: '/family-based-immigration/immigration-status-and-child-custody-legal-considerations',
                permanent: true,
            },
            {
                source: '/k-1-visa-step-by-step-guide',
                destination: '/family-based-immigration/fiance-visas/k-1-visa-step-by-step-guide',
                permanent: true,
            },
            {
                source: '/national-interest-waiver-everything-you-should-know-in-simple-words',
                destination: '/employment-based-immigration/eb-2/national-interest-waiver-everything-you-should-know-in-simple-words',
                permanent: true,
            },
            {
                source: '/new-u-s-immigration-policies-in-2022',
                destination: '/',
                permanent: true,
            },
            {
                source: '/speed-up-immigration-case-with-USCIS',
                destination: '/immigration-solutions/speed-up-immigration-case-with-USCIS',
                permanent: true,
            },
            {
                source: '/tips-successful-diversity-visa-application',
                destination: '/us-visas/tips-successful-diversity-visa-application',
                permanent: true,
            },
            {
                source: '/types-of-bankruptcy',
                destination: '/',
                permanent: true,
            },
            {
                source: '/undocumented-immigrants-u-s-immigration-challenges',
                destination: '/asylum-humanitarian-relief/undocumented-immigrants-u-s-immigration-challenges',
                permanent: true,
            },
            {
                source: '/us-h1b-and-canada-pr-options-for-laid-off-h1b-visa-holders',
                destination: '/employment-based-immigration/h-1b/us-h1b-and-canada-pr-options-for-laid-off-h1b-visa-holders',
                permanent: true,
            },
            {
                source: '/us-immigrant-visas-guide-permanent-residency',
                destination: '/us-visas/us-immigrant-visas/us-immigrant-visas-guide-permanent-residency',
                permanent: true,
            },
            {
                source: '/us-nonimmigrant-visas-guide',
                destination: '/us-visas/us-nonimmigrant-visas-guide',
                permanent: true,
            },
            {
                source: '/blog/page/2',
                destination: '/',
                permanent: true,
            },
            {
                source: '/blog/page/3',
                destination: '/',
                permanent: true,
            },
        ];
    },

};

export default nextConfig;
