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
                source: '/immigration-lawyer-assistance-us-immigration',
                destination: '/us-visas',
                permanent: true,
            },
            {
                source: '/us-nonimmigrant-visas-guide',
                destination: '/us-nonimmigrant-visas',
                permanent: true,
            },
            {
                source: '/f-1-student-visa-application-and-embassy-interview',
                destination: '/us-nonimmigrant-visas/student-visas/f-1-student-visa',
                permanent: true,
            },
            {
                source: '/us-immigrant-visas-guide-permanent-residency',
                destination: '/us-immigrant-visas',
                permanent: true,
            },
            {
                source: '/consular-processing-to-get-your-green-card',
                destination: '/us-immigrant-visas/consular-processing',
                permanent: true,
            },
            {
                source: '/tips-successful-diversity-visa-application',
                destination: '/us-immigrant-visas/diversity-visa-lottery/visa-application',
                permanent: true,
            },
            {
                source: '/eb-1-visas-requirements-eligibility-and-application',
                destination: '/us-immigrant-visas/employment-based-immigration/eb-1/eb-1-visas-requirements',
                permanent: true,
            },
            {
                source: '/b-1-visa-permitted-activities-understanding-the-restrictions',
                destination: '/us-immigrant-visas/employment-based-immigration/eb-1/b-1-visa-permitted-activities',
                permanent: true,
            },
            {
                source: '/an-ultimate-guide-to-apply-for-the-b2-visa-by-yourself',
                destination: '/us-immigrant-visas/employment-based-immigration/eb-2/apply-for-the-b2-visa-by-yourself',
                permanent: true,
            },
            {
                source: '/national-interest-waiver-everything-you-should-know-in-simple-words',
                destination: '/us-immigrant-visas/employment-based-immigration/eb-2/national-interest-waiver',
                permanent: true,
            },
            {
                source: '/guide-to-h1b-visa-requirements-and-application-by-an-immigration-lawyer',
                destination: '/us-immigrant-visas/employment-based-immigration/h-1b/h1-b-visa-requirements',
                permanent: true,
            },
            {
                source: '/us-h1b-and-canada-pr-options-for-laid-off-h1b-visa-holders',
                destination: '/us-immigrant-visas/employment-based-immigration/h-1b/us-h1b-and-canada-pr-options-for-laid-off-h1b-visa-holders',
                permanent: true,
            },
            {
                source: '/family-based-immigration',
                destination: '/us-immigrant-visas/family-based-immigration',
                permanent: true,
            },
            {
                source: '/green-card-through-marriage',
                destination: '/us-immigrant-visas/family-based-immigration/marriage-visas/green-card-through-marriage',
                permanent: true,
            },
            {
                source: '/k-1-visa-step-by-step-guide',
                destination: '/us-immigrant-visas/family-based-immigration/fiancé-visas/k-1-visas',
                permanent: true,
            },
            {
                source: '/immigration-status-and-child-custody-legal-considerations',
                destination: '/us-immigrant-visas/family-based-immigration/immigration-status-and-child-custody',
                permanent: true,
            },
            {
                source: '/guide-naturalization-process-filing-form-n-400-and-other-steps',
                destination: '/citizenship-naturalization/naturalization-filing-form-n-400',
                permanent: true,
            },
            {
                source: '/become-u-s-citizen-explained-citizenship-lawyer',
                destination: '/citizenship-naturalization/become-a-us-citizen',
                permanent: true,
            },
            {
                source: '/immigration-court-defense-strategies-immigration-lawyer',
                destination: '/deportation-defense/immigration-court-defense-strategies',
                permanent: true,
            },
            {
                source: '/full-representation-in-immigration-matters-for-individuals',
                destination: '/deportation-defense/removal-proceedings/',
                permanent: true,
            },
            {
                source: '/deportation-defense-strategies-to-fight-removal-proceedings',
                destination: '/deportation-defense/removal-proceedings/fighting-removal-proceedings',
                permanent: true,
            },
            {
                source: '/undocumented-immigrants-u-s-immigration-challenges',
                destination: '/asylum-humanitarian-relief',
                permanent: true,
            },
            {
                source: '/asylum-seekers-legal-rights-and-challenges-faced-in-the-u-s',
                destination: '/asylum-humanitarian-relief/asylum/asylum-seekers-rights-and-challenges',
                permanent: true,
            },
            {
                source: '/application-for-asylum-in-the-usa',
                destination: '/asylum-humanitarian-relief/asylum/application-for-asylum',
                permanent: true,
            },
            {
                source: '/common-immigration-questions-answered-immigration-lawyer',
                destination: '/resources/common-immigration-questions-answered-immigration-lawyer',
                permanent: true,
            },
            {
                source: '/us-immigration-policy-2025',
                destination: '/resources/us-immigration-policy-2025',
                permanent: true,
            },
            {
                source: '/application-for-employment-authorization-how-to-file-form-i-765',
                destination: '/resources/employment-authorization-how-to-file-form-i-765',
                permanent: true,
            },
            {
                source: '/news/biden-immigration-plans',
                destination: '/resources/biden-immigration-plans',
                permanent: true,
            },
            {
                source: '/eb-2-employment-based-visas-whatever-you-need-to-know',
                destination: '/us-immigrant-visas/employment-based-immigration/eb-2',
                permanent: true,
            },
            {
                source: '/expedite-uscis-case-expert-tips-from-an-immigration-lawyer',
                destination: '/resources/expedite-uscis-case',
                permanent: true,
            },
            {
                source: '/how-to-avoid-immigration-application-errors',
                destination: '/resources/how-to-avoid-immigration-application-errors',
                permanent: true,
            },
            {
                source: '/how-to-prepare-strong-immigration-application-tips',
                destination: '/resources/how-to-prepare-strong-immigration-application-tips',
                permanent: true,
            },
            {
                source: '/speed-up-immigration-case-with-USCIS',
                destination: '/resources/expedite-uscis-case',
                permanent: true,
            },
            {
                source: '/news/undocumented-immigrants-left-helpless',
                destination: '/resources/undocumented-immigrants-left-helpless',
                permanent: true,
            },
            {
                source: '/news/u-s-immigration-agency-to-bring-back-the-nation-of-immigrants-label',
                destination: '/resources/u-s-immigration-agency-to-bring-back-the-nation-of-immigrants-label',
                permanent: true,
            },
            {
                source: '/news/slow-immigration-causes-worker-shortages',
                destination: '/resources/slow-immigration-causes-worker-shortages',
                permanent: true,
            },
            {
                source: '/news/permanent-residents-evidence-of-status-extended',
                destination: '/resources/permanent-residents-evidence-of-status-extended',
                permanent: true,
            },
            {
                source: '/news/new-nominee-for-cbp',
                destination: '/resources/new-nominee-for-cbp',
                permanent: true,
            },
            {
                source: '/news/new-immigration-proposal-will-benefit-farmworkers-and-dreamers',
                destination: '/resources/new-immigration-proposal-will-benefit-farmworkers-and-dreamers',
                permanent: true,
            },
            {
                source: '/news/immigration-reform-in-social-spending-bill',
                destination: '/resources/immigration-reform-in-social-spending-bill',
                permanent: true,
            },
            {
                source: '/news/new-immigration-guidelines',
                destination: '/resources/new-immigration-guidelines',
                permanent: true,
            },
            {
                source: '/news/dhs-stops-releasing-migrants-without-court-date',
                destination: '/resources/dhs-stops-releasing-migrants-without-court-date',
                permanent: true,
            },
            {
                source: '/news/insurance-company-fined-for-immigration-related-discrimination',
                destination: '/resources/insurance-company-fined-for-immigration-related-discrimination',
                permanent: true,
            },
            {
                source: '/news/a-path-to-legalization-for-undocumented-immigrants',
                destination: '/resources/a-path-to-legalization-for-undocumented-immigrants',
                permanent: true,
            },
            {
                source: '/news/coronavirus-cases-increased-among-detained-immigrants',
                destination: '/resources/coronavirus-cases-increased-among-detained-immigrants',
                permanent: true,
            }
        ];
    },
    compress: true,
    poweredByHeader: false,
};

export default nextConfig;
