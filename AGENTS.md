
<!-- BEGIN:image-optimization-rules -->
# Image & Video Assets

Before adding, modifying, or deploying any image or video asset, you MUST read
and follow the rules in IMAGE_OPTIMIZATION.md at the project root.

Key checks (non-negotiable):
- **Never** use raw `<img>` tags or CSS `background-image` — always use `<Image>` from `next/image` (or the project wrapper if one exists, e.g. `@/atoms/img`)
- **Always** set the `sizes` prop to match actual rendered dimensions (without it, next/image downloads a 1920px image for a 55px avatar)
- **Only one** image per page gets `priority` + `fetchPriority="high"` — the LCP element (largest above-fold image). All others lazy-load by default
- Default `quality={75}` is correct for photos — never set `quality={100}`; use `quality={90}` for screenshots/UI with sharp text
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
