/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.tuanlelaw.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/_next/static/',
                    '/_next/image/',
                    '/api/',
                ],
            },
        ],
        // GSC fix: do NOT list sitemap.xml here. next-sitemap writes sitemap.xml as the index itself, and
        // adding it as an "additional sitemap" made the index list itself (self-referencing -> GSC error).
    },
}
