# AGENT.md — World-Class Front-End Architecture & Implementation Guide

## Role and Mission
**Role:** You are a world-class Senior Front-End Architect and Performance Engineer with deep expertise in the latest web technologies.
**Mission:** To generate an exhaustive, step-by-step project plan and implementation guide for a developer tasked with building a meticulously planned, high-performance, and maintainable web application from a Figma design.

## Project Overview: Tuan Le Weblog
**Context:** A small, SEO-optimized weblog website for **Tuan Le**, a lawyer aiming to generate leads through a contact form.
**Scope:** This is a **frontend-only** project (no API integration) for the initial build.
**Design Source:** **Figma** (finalized and ready for implementation).

---

## Project Technology Stack
* **Framework:** Next.js 15 (latest stable version)
* **Library:** React 19
* **Styling:** Tailwind CSS 4
* **Language:** TypeScript (Enabled)
* **Image Optimization:** Next/Image
* **Fonts:** Custom Google Fonts (Inter or Playfair Display)
* **Version Control:** Git

---

## Core Requirements & Constraints

1.  **Pixel-Perfect Implementation:** The final web application must be an exact, pixel-for-pixel replica of the provided Figma design. All spacing, typography, colors, and layout details must match perfectly.
2.  **Aggressive Performance Optimization (Core Web Vitals):** The application must be aggressively optimized for Core Web Vitals (CWV). You must provide specific, actionable strategies to achieve the best possible scores for First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS) with a target of **Lighthouse >90** on mobile and desktop.
3.  **Clean & Maintainable Architecture:** The project must be structured using best practices, emphasizing reusable components and a clean, scalable folder structure based on **Atomic Design** principles.
4.  **Strict Non-Modification Clause:** Under no circumstances should the visual design or the content of the application be altered to achieve performance goals. The challenge is to optimize *within* the exact design constraints.
5.  **SEO Priority:** Semantic HTML, dynamic SEO meta-tags (Title, Description, Open Graph, Twitter), and Structured Data (JSON-LD) are mandatory.

---

## Architectural Guidelines: Atomic Design and SOLID

Follow **Atomic Design** principles:
* **Atoms:** buttons, headings, icons, inputs, images
* **Molecules:** forms, cards, navigation items, simple data groupings
* **Organisms:** sections, navbars, footers, complex UI blocks
* **Templates:** page layouts (e.g., Blog Layout, Article Layout)
* **Pages:** Home, Article, Contact (instances of templates)

**Development Principles:**
* Apply **SOLID** principles for reusable, maintainable code.
* Use **semantic, accessible HTML** (a11y checklist is required).
* Keep components **stateless** where possible.
* Consistent naming convention: **`kabab-case`** for files (as requested by prior context) or **`PascalCase`** for React components (standard best practice - choose one and be consistent). *Recommendation: PascalCase for components, snake_case for utility files.*
* Prefer **functional components** with hooks.
* Keep **props interfaces** documented with TypeScript types.
* Modular utility functions for SEO and performance.

---

## Project Plan: Figma to High-Performance Next.js 15 Application

### Phase 1: Project Setup and Configuration

* **Initialization:** Detail the precise `create-next-app` command with recommended flags (e.g., for TypeScript, Tailwind CSS, ESLint).
* **Tailwind CSS 4 Configuration:**
    * Explain how to set up the config file, ensuring **JIT mode** is active for minimal CSS.
    * Describe the process of extracting design tokens (colors, font sizes, spacing, breakpoints) from Figma and mapping them precisely into the `theme` object. Provide a code snippet example of a custom color definition.
* **Typography Setup:** Show the optimal way to configure `next/font` for loading the project's web fonts (Inter/Playfair Display), including variable fonts, to prevent layout shifts and optimize FCP. The configuration must eliminate font-swapping CLS.
* **Linting and Formatting:** Provide a sample configuration for ESLint and Prettier that enforces code quality and consistency (e.g., checking for accessibility rules, consistent imports).

### Phase 2: Design Analysis and Component Architecture

* **Figma Deconstruction Strategy (Source of Truth):** Describe a systematic process for analyzing the Figma file. How should a developer use the layer/frame names, auto-layout, and constraints to break down pages into the Atomic Design hierarchy (atoms, molecules, organisms, templates, pages)?
  * **Folder Structure:** Propose a clean, scalable folder structure, justifying your choices.
      ```
   
      ├── /app
      ├── /components
      │     ├── /atoms (Button.tsx, Input.tsx, Icon.tsx)
      │     ├── /molecules (ArticleCard.tsx, ContactForm.tsx)
      │     ├── /organisms (Header.tsx, Footer.tsx, HeroSection.tsx)
      │     └── /templates (BlogLayout.tsx)
      ├── /lib (Custom hooks, utility functions)
      ├── /styles
      └── /types (Global TS types)
      ```
* **Helper Utilities:** Define the necessary helper modules as stated in the context:
    * `/lib/seo_meta.ts` → handles meta title, description, and OG tags
    * `/lib/image_loader.ts` → wrapper for next/image with lazy load (optional, Next/Image handles most)
    * `/lib/date_formatter.ts` → for blog dates

### Phase 3: Component Development and Implementation

* **Component Building:** Provide a best-practice example of a reusable component (e.g., a Button atom) written in React 19 and styled with Tailwind CSS, including TypeScript props (`type` definitions) and an accessibility consideration (e.g., `aria-label`).
* **State Management:** Advise on state management strategies, leveraging React 19's new hooks (`use`, `useOptimistic`) where appropriate, to minimize external libraries. Local component state is preferred.
* **Layout Implementation:** Explain how to implement the main application layouts (e.g., `Template` components like `BlogLayout`) using Next.js 15's App Router conventions.
* **Pages to Implement:**
    * **Home Page:** Structure must be extracted dynamically from the Figma "Home Page" frame.
    * **Internal Article Page:** Structure must be extracted dynamically from the Figma "Article Page" frame.

### Phase 4: Aggressive Performance & SEO Optimization

#### LCP (Largest Contentful Paint) Optimization:
* Instruct on the correct usage of the `next/image` component for all images from the design.
* Specify when and why to use the `priority` prop for the LCP element (e.g., the Hero image) on each page.
* Explain how to correctly size images/specify `sizes` to avoid serving unnecessarily large files.

#### CLS (Cumulative Layout Shift) Prevention:
* Reiterate the importance of providing explicit `width` and `height` attributes (or layout configuration) for all images.
* Detail strategies for reserving space for any content that loads asynchronously (e.g., ads, contact form responses) ensuring no layout shift occurs.
* Confirm how the pre-configured `next/font` from Phase 1 is leveraged to prevent font-swapping CLS.

#### FCP (First Contentful Paint) Optimization:
* Explain how Next.js 15 and React 19's built-in streaming capabilities and **Server Components** improve FCP by minimizing the client-side JavaScript bundle size.
* Advise on using React `Suspense` to stream non-essential parts of the page, ensuring users see meaningful content faster without waiting for the entire page to be ready. Provide a simple code example using `Suspense`.
* Discuss the use of **Next.js prefetching** for better navigation performance.

#### SEO & Asset Optimization:
* **Semantic HTML:** Ensure the use of appropriate tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`).
* Every image must include descriptive `alt` text.
* Provide a checklist for optimizing other assets like SVGs (inlining) and custom scripts (lazy loading).

### Phase 5: Finalization and Best Practices

* **Code Quality:** Emphasize the importance of self-documenting code and adding comments for complex logic.
* **Accessibility (a11y):** Provide a checklist of key accessibility considerations that must be implemented (e.g., semantic HTML, ARIA attributes, keyboard navigation, color contrast).
* **Final Review Checklist (Deployment Ready):** Create a bullet-point list for a final review before deployment:
    * Pixel-perfect matching against Figma.
    * Lighthouse scores >90 on mobile and desktop.
    * Correct implementation of semantic HTML and ARIA attributes.
    * All images using `next/image` with correct `priority` and `alt` text.
    * Build output optimized (analyze with `next build --analyze`).
    * All code adheres to TypeScript, ESLint, and Prettier rules.
    * Pages generated using **Static Site Generation (SSG)** where applicable for better performance.

---
**Output Expectation:** The final output must be this multi-phase, detailed instruction manual, ready for a developer to execute.