
<!-- BEGIN:image-optimization-rules -->
# Image & Video Assets

Before adding, modifying, or deploying any image or video asset, you MUST read
and follow the rules in IMAGE_OPTIMIZATION.md at the project root.

Key checks (non-negotiable):
- **Never** use raw `<img>` tags or CSS `background-image` — always use `<Image>` from `next/image` (or the project wrapper if one exists, e.g. `@/atoms/img`)
- **Always** set the `sizes` prop to match actual rendered dimensions (without it, next/image downloads a 1920px image for a 55px avatar)
- **Only one** image per page gets `priority` + `fetchPriority="high"` — the LCP element (largest above-fold image). All others lazy-load by default
- **Always** use `quality={100}` — never lower image quality below 100 for any image type (photos, screenshots, UI, logos, heroes). This is a global rule across all projects
- **Never** use `dynamic(() => import("next/image"))` — it kills the SSR preload signal for priority images; only `ReactPlayer`, `Lottie`, and similar heavy client-only libs should be dynamically imported
- If adding images from a new S3 bucket, add its hostname to `remotePatterns` in `next.config.ts` first
<!-- END:image-optimization-rules -->

<!-- BEGIN:asset-storage-rules -->
# Asset Storage — All Assets Must Live on S3

**Never** commit image, video, audio, font, PDF, or any binary asset file to the Git repository. All assets must be uploaded to the project S3 bucket and referenced by URL or proxy path.

Rules:
- Upload all images, videos, fonts, and binary files to the project S3 bucket before referencing them in code
- Reference assets via the project S3 URL or its configured proxy path (e.g. `/sw-img/` for StealthWatch, the `S3` constant for TOL)
- **Never** store large assets in `public/` — only tiny files like favicons and `robots.txt` (<10 KB) may live there
- **Never** commit `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg` (large), `.mp4`, `.mov`, `.pdf`, `.woff`, `.woff2`, or `.ttf` files to git
- After uploading to a new S3 bucket, add the hostname to `remotePatterns` in `next.config.ts` before referencing it in `<Image>`
- All S3 assets must go through `next/image` for delivery — never link to raw S3 URLs in `<img>` or `<video>` tags
<!-- END:asset-storage-rules -->

<!-- BEGIN:optimization-playbook -->
# Performance Optimization Playbook

When the user mentions "optimization file", "optimization playbook", "performance playbook", or asks to optimize a site for PageSpeed/Lighthouse, read and follow the playbook at:

`/Users/alihusayni/.gemini/config/optimization-playbook.md`

This contains the proven workflow for achieving 99/100 PageSpeed scores across all projects.
<!-- END:optimization-playbook -->

<!-- BEGIN:analytics-playbook -->
# Google Analytics & GSC Audit Playbook

When the user mentions "analytics", "GA4", "Google Analytics", "Search Console", "GSC", "no traffic", "tracking", or asks to set up / audit / debug analytics on any project, read and follow the playbook at:

`/Users/alihusayni/.gemini/config/analytics-playbook.md`

This contains:
- Full GA4 setup steps for new projects (Parts 1–2)
- A 10-point deploy audit checklist to run after every production deploy (Part 2)
- Debug scripts to run in browser DevTools (Part 4)
- Common failure patterns and their fixes (Part 3)
<!-- END:analytics-playbook -->

<!-- BEGIN:optimization-playbook -->
# Performance Optimization Playbook

When the user mentions "optimization file", "optimization playbook", "performance playbook", or asks to optimize a site for PageSpeed/Lighthouse, read and follow the playbook at:

`/Users/alihusayni/.gemini/config/optimization-playbook.md`

This contains the proven workflow for achieving 99/100 PageSpeed scores across all projects.
<!-- END:optimization-playbook -->
