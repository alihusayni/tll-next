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
        additionalSitemaps: [
            'https://www.tuanlelaw.com/sitemap.xml',
        ],
    },
}
