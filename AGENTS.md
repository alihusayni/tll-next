
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
