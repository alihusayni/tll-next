# AGENT.md — Global Development Context for Tuan Le Website

## 🧭 Project Overview
A small, SEO-optimized weblog website for **Tuan Le**, a lawyer aiming to generate leads through a contact form.  
This is a **frontend-only** project (no API integration) built with **Next.js** and **Tailwind CSS**.  
Design source: **Figma** (finalized and ready for implementation).

---

## ⚙️ Tech Stack
- **Framework:** Next.js (latest stable version)
- **Styling:** Tailwind CSS
- **TypeScript:** Enabled
- **Image Optimization:** Next/Image
- **Fonts:** Custom Google Fonts (Inter or Playfair Display)
- **Architecture:** Atomic Design
- **Principles:** SOLID principles for scalability and reusability
- **Version Control:** Git

---

## 🧩 Architecture Guidelines
Follow **Atomic Design**:
atoms 
molecules
organisms
templates
pages

Each layer builds upon the smaller, reusable components.

**Examples:**
- Atoms → buttons, headings, icons, inputs
- Molecules → forms, cards, navigation items
- Organisms → sections, navbars, footers
- Templates → page layouts
- Pages → home, article, contact

---

## 🔍 SEO & Performance Requirements
- Semantic HTML structure
- Every image includes descriptive `alt` text
- Title and description dynamically handled via a global SEO config
- Open Graph and Twitter meta tags included
- Structured data / JSON-LD support
- **Core Web Vitals targets:**
    - LCP < 2.5s
    - FCP < 2.5s
    - Speed Index < 2.5s in 75%+ sessions
- Optimize with:
    - Lazy loading images
    - Next.js prefetching
    - Static generation (SSG)
    - Tailwind JIT mode for minimal CSS

---

## 🧱 Development Principles
- Apply **SOLID** principles for reusable, maintainable code
- Use **semantic, accessible HTML**
- Keep components **stateless** where possible
- Consistent naming convention → `snake_case`
- Prefer **functional components** with hooks
- Keep **props interfaces** documented with JSDoc or TS types
- Modular utility functions for SEO and performance

---

## 🎨 Styling Rules
- Use Tailwind for all utilities
- Extend theme in `tailwind.config.js` for colors, fonts, and spacing
- Maintain consistent typography scale
- Use CSS grid or flex layouts with responsive breakpoints
- Favor minimal, elegant, modern visual tone

---

## 🧰 Helper Utilities
Suggested helper modules:
- `/utils/seo_meta.ts` → handles meta title, description, and OG tags
- `/utils/image_loader.ts` → wrapper for next/image with lazy load
- `/utils/scroll.ts` → smooth scroll or intersection observer hooks
- `/utils/date_formatter.ts` → for blog dates

---
## 🧾 Pages to Implement
The project consists of two main pages: **Home Page** and **Internal Article Page**.

### 🔍 Source of Truth
All layouts, sections, and UI components must be inferred directly from the **Figma design file**.
The agent should connect to Figma using the **Figma MCP integration** or any available plugin interface to read:
- Frame names
- Section hierarchy
- Component naming conventions
- Auto-layout and spacing rules
- Font families, colors, and image references

### 🏠 Home Page
The exact section order (e.g., hero, about, latest articles, testimonials, contact) must be **extracted dynamically** from the main "Home Page" frame in Figma.  
For each detected section:
- Generate a reusable React component under `/organisms/`
- Use frame names and component instances in Figma to name files
- Infer responsive breakpoints from auto-layout and constraints
- Extract text, color, and typography tokens

### 📖 Internal Article Page
Similarly, inspect the “Article Page” frame in Figma to identify:
- Header and hero components
- Main content block (typography scale, line length, padding)
- Author card and related articles layout
- Social/share icons and footer

The agent should automatically map these visual sections to reusable component structures following the Atomic Design hierarchy.

### 🧩 Output Expectation
After analyzing the Figma file:
- Output a **section map** (list of sections, their hierarchy, and reusable components)
- Suggest naming for each component
- Indicate which sections can share molecules/atoms
- Define layout structure (`grid`, `flex`, or `container` system)

---

## 🚀 Performance & Deployment
- Optimize build output (analyze with `next build --analyze`)
- Use Next.js Image Optimization and dynamic imports
- Generate static pages for better performance
- Check Lighthouse scores >90 on mobile and desktop

---

## 🧩 Integration with Agents
This file serves as **persistent context** for OpenCode / Context7 / MCP-based agents.  
When developing new components or pages, the agent should:
1. Read this file for context.
2. Apply all principles, conventions, and requirements.
3. Generate modular, SEO-optimized code consistent with this document.

---