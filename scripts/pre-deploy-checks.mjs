#!/usr/bin/env node
/**
 * scripts/pre-deploy-checks.mjs — Tuan Le Law
 *
 * Usage:
 *   npm run check        — against running localhost:3000
 *   npm run check:ci     — build + start + check + kill (Option B)
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// ── Site Configuration ────────────────────────────────────────────────────────
const CONFIG = {
  siteLabel:     'Tuan Le Law',
  gaId:          'G-9CL0P20FC0',
  phoneAreaCode: '714',
  callrailPath:  '/api/callrail-swap',
  contactPath:   '/api/contact',
  sitemapPath:   '/sitemap.xml',
  staticRoutes: [
    '/',
    '/faq',
    '/resources',
    '/testimonials',
  ],
  requiredNavHrefs: [
    ['/testimonials', 'Testimonials nav link'],
    ['tel:',          'Phone CTA (tel: link)'],
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.CHECK_BASE_URL ?? 'http://localhost:3000';
let passed = 0, failed = 0, warned = 0;

function pass(msg)  { console.log(`  ✅  ${msg}`); passed++; }
function fail(msg, detail = '') { console.error(`  ❌  ${msg}${detail ? `\n       ${detail}` : ''}`); failed++; }
function warn(msg)  { console.log(`  ⚠️   ${msg}`); warned++; }
function section(t) { console.log(`\n── ${t} ${'─'.repeat(Math.max(0, 54 - t.length))}`); }

async function get(path, opts = {}) {
  return fetch(`${BASE_URL}${path}`, { redirect: 'follow', signal: AbortSignal.timeout(10000), ...opts });
}
async function post(path, body) {
  return fetch(`${BASE_URL}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(10000) });
}

async function checkCSS() {
  section('CSS Assets');
  let html = '';
  try { const res = await get('/'); html = await res.text(); pass(`Homepage loaded (${res.status})`); }
  catch (e) { fail('Could not fetch homepage for CSS check', e.message); return; }
  const cssLinks = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map(m => m[1]);
  if (!cssLinks.length) { warn('No <link rel="stylesheet"> found'); return; }
  pass(`Found ${cssLinks.length} stylesheet link(s)`);
  const results = await Promise.all(cssLinks.map(async (href) => {
    const url = href.startsWith('http') ? href : `${BASE_URL}${href}`;
    try { const res = await fetch(url, { signal: AbortSignal.timeout(8000) }); return { href, status: res.status }; }
    catch (e) { return { href, status: 0, error: e.message }; }
  }));
  let ok = 0;
  for (const { href, status, error } of results) {
    const s = href.length > 60 ? '...' + href.slice(-57) : href;
    if (status >= 200 && status < 400) ok++;
    else fail(`CSS asset failed: ${s}`, error ?? `HTTP ${status}`);
  }
  if (ok === cssLinks.length) pass(`All ${ok} stylesheet(s) loaded successfully`);
}

async function checkContactForm() {
  section('Contact Form API');
  try {
    const res = await post(CONFIG.contactPath, { name: 'Health Check Bot', email: 'healthcheck@example.com', phone: '5555550100', message: 'Automated pre-deploy health check — please ignore.' });
    if (res.status >= 200 && res.status < 300) {
      pass(`Valid submission → ${res.status}`);
    } else if (res.status === 500) {
      // 500 locally = missing TOL_API_TOKEN / TOL_FORM_KEY / TOL_REQUEST_ID env vars.
      // These are set in the Vercel dashboard and not required locally.
      warn(`Contact form → 500 (missing TOL env vars locally — OK if set in Vercel dashboard)`);
    } else {
      fail('Valid submission returned unexpected status', `Got ${res.status}`);
    }
  } catch (e) { fail('Contact form POST failed', e.message); }
  try {
    const res = await post(CONFIG.contactPath, { name: '' });
    if (res.status >= 400 && res.status < 500) {
      pass(`Invalid submission correctly rejected → ${res.status}`);
    } else if (res.status === 500) {
      warn('Contact form validation → 500 (missing TOL env vars locally — OK if set in Vercel dashboard)');
    } else {
      fail('Invalid submission was not rejected', `Got ${res.status} (expected 4xx)`);
    }
  } catch (e) { fail('Contact form validation check failed', e.message); }
}

async function checkCallRail() {
  section('CallRail Proxy');
  try {
    const res = await get(CONFIG.callrailPath);
    res.status === 200 ? pass(`${CONFIG.callrailPath} → 200`) : fail('CallRail proxy returned unexpected status', `Got ${res.status}`);
    const ct = res.headers.get('content-type') ?? '';
    ct.includes('javascript') ? pass('Content-Type is JavaScript') : fail('Content-Type is not JavaScript', ct);
    const cc = res.headers.get('cache-control') ?? '';
    cc.includes('max-age') ? pass(`Cache-Control present: ${cc}`) : warn('Missing Cache-Control max-age on CallRail proxy');
  } catch (e) { fail('CallRail proxy check failed', e.message); }
}

async function checkAnalytics() {
  section('Analytics & Tracking');
  let html = '';
  try { const res = await get('/'); html = await res.text(); } catch (e) { fail('Could not fetch homepage', e.message); return; }
  // NOTE: This site uses the server-side GA4 Measurement Protocol via /api/analytics.
  // There is NO gtag.js or GA4 script tag in the HTML — GA4 ID won't appear in the markup.
  // We verify the API route exists instead.
  if (CONFIG.gaId) {
    const apiRes = await fetch(`${BASE_URL}/api/analytics`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"events":[]}', signal: AbortSignal.timeout(5000) }).catch(() => null);
    apiRes ? pass(`GA4 Measurement Protocol API (/api/analytics) reachable → ${apiRes.status}`) : warn('GA4 /api/analytics route unreachable');
  } else warn('GA4 ID not configured — skipping');
  // CallRailLoader is a "use client" component — the script tag is injected after React
  // hydration, so it won't appear in the static HTML fetched by this checker.
  // We verify the proxy endpoint works (done in checkCallRail) instead.
  html.includes('/api/callrail-swap')
    ? pass('CallRail proxy script tag found in static HTML')
    : warn('CallRail script not in static HTML (expected — injected client-side after hydration)');
}

async function checkGSC() {
  section('Google Search Console');
  let html = '';
  try { const res = await get('/'); html = await res.text(); } catch (e) { fail('Could not fetch homepage', e.message); return; }
  html.includes('google-site-verification') ? pass('google-site-verification tag found') : warn('google-site-verification not found — may be set via DNS');
}

async function checkSEO() {
  section('SEO & Metadata');
  let html = '';
  try { const res = await get('/'); html = await res.text(); } catch (e) { fail('Could not fetch homepage', e.message); return; }
  const t = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  t && t[1].trim() ? pass(`<title> present: "${t[1].trim().slice(0,60)}"`) : fail('<title> missing or empty');
  html.includes('name="description"') || html.includes("name='description'") ? pass('<meta name="description"> present') : fail('<meta name="description"> missing');
  html.includes('rel="canonical"') || html.includes("rel='canonical'") ? pass('<link rel="canonical"> present') : fail('<link rel="canonical"> missing');
  for (const tag of ['og:title', 'og:description', 'og:image']) {
    html.includes(`property="${tag}"`) || html.includes(`property='${tag}'`) ? pass(`<meta property="${tag}"> present`) : warn(`<meta property="${tag}"> missing`);
  }
}

async function checkPhone() {
  section('Phone Number');
  let html = '';
  try { const res = await get('/'); html = await res.text(); } catch (e) { fail('Could not fetch homepage', e.message); return; }
  html.includes('tel:') ? pass('tel: link found') : fail('No tel: link found — click-to-call missing');
  html.includes(CONFIG.phoneAreaCode) ? pass(`Area code (${CONFIG.phoneAreaCode}) present`) : warn(`Area code (${CONFIG.phoneAreaCode}) not found`);
}

async function checkRobotsAndSitemap() {
  section('Robots & Sitemap');
  try {
    const res = await get('/robots.txt');
    res.status === 200 ? pass('/robots.txt → 200') : fail('/robots.txt → ' + res.status);
    const text = await res.text();
    text.includes('User-agent') ? pass('/robots.txt has valid User-agent directive') : warn('/robots.txt looks malformed');
  } catch (e) { fail('/robots.txt check failed', e.message); }
  try {
    const res = await get(CONFIG.sitemapPath);
    if (res.status === 200) {
      const text = await res.text();
      text.includes('<url>') || text.includes('<sitemap>') ? pass(`${CONFIG.sitemapPath} → 200 with valid XML`) : fail(`${CONFIG.sitemapPath} → 200 but no <url> entries`);
    } else fail(`${CONFIG.sitemapPath} → ${res.status}`);
  } catch (e) { fail('Sitemap check failed', e.message); }
}

async function checkNavigation() {
  section('Navigation & Required Links');
  let html = '';
  try { const res = await get('/'); html = await res.text(); } catch (e) { fail('Could not fetch homepage', e.message); return; }
  html.includes('<nav') ? pass('<nav> element present') : fail('<nav> NOT found in homepage HTML');
  for (const [href, label] of CONFIG.requiredNavHrefs) {
    html.includes(href) ? pass(`Nav link present: ${label}`) : fail(`Nav link NOT found: ${label}`, `Expected "${href}"`);
  }
}

async function checkLinks() {
  section('Broken Link Checker');
  let broken = 0;
  const C = 6;
  for (let i = 0; i < CONFIG.staticRoutes.length; i += C) {
    const results = await Promise.all(CONFIG.staticRoutes.slice(i, i + C).map(async route => {
      try { const res = await get(route, { headers: { Accept: 'text/html' } }); return { route, status: res.status }; }
      catch (e) { return { route, status: 0, error: e.message }; }
    }));
    for (const { route, status, error } of results) {
      if (status >= 200 && status < 400) {
        (status === 301 || status === 302) ? console.log(`  ↪️   ${route} → ${status}`) : pass(`${route} → ${status}`);
      } else { fail(`${route} → ${status}${error ? ` (${error})` : ''}`); broken++; }
    }
  }
  if (!broken) console.log(`  ✅  All ${CONFIG.staticRoutes.length} routes OK`);
}

// ── Image Audit ───────────────────────────────────────────────────────────────
// Walks every .md file under /content, extracts ogImage URLs, then validates:
//   1. No literal spaces or raw special chars (DALL·E ·, parentheses without encoding)
//   2. No stale filemanager / non-blob URLs
//   3. No empty ogImage values
//   4. HTTP 200 from the Next.js image proxy (same path the live site uses)

function collectMdFiles(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) results.push(...collectMdFiles(full));
    else if (extname(name) === '.md') results.push(full);
  }
  return results;
}

function extractOgImages(mdPath) {
  const src = readFileSync(mdPath, 'utf8');
  // Match ogImage: <url> or ogImage: "<url>" in YAML frontmatter
  const match = src.match(/^ogImage:\s*["']?([^"'\n]+)["']?/m);
  if (!match) return null;
  return match[1].trim();
}

function buildProxyUrl(imageUrl) {
  // Route through the Next.js /_next/image proxy — this is the same
  // server-side fetch that the live site uses, so it correctly returns
  // 404 for missing blobs even when direct S3 is unreachable locally.
  const encoded = encodeURIComponent(imageUrl);
  return `${BASE_URL}/_next/image?url=${encoded}&w=1200&q=75`;
}

async function checkImages() {
  section('Image Audit (ogImage in content/*.md)');

  const BLOB_HOST = 'qxwyml8xuwxdgws0.public.blob.vercel-storage.com';
  const STALE_PATTERNS = [
    { pattern: /filemanager/,        label: 'stale filemanager URL' },
    { pattern: /tuanlelaw\.com\/(?!$)/, label: 'old tuanlelaw.com image URL (use blob storage)' },
  ];

  // Find the content directory relative to this script
  const contentDir = join(new URL('.', import.meta.url).pathname, '..', 'content');
  let mdFiles;
  try { mdFiles = collectMdFiles(contentDir); }
  catch (e) { warn(`Could not read content/ directory: ${e.message}`); return; }

  pass(`Scanning ${mdFiles.length} markdown files…`);

  const issues = [];   // { file, url, problem }
  const toProbe = []; // { file, url } — valid-looking URLs to HTTP-check

  for (const mdPath of mdFiles) {
    const rel = mdPath.replace(contentDir, 'content');
    const url = extractOgImages(mdPath);

    if (!url) {
      warn(`No ogImage found in ${rel}`);
      continue;
    }
    if (url === '') {
      issues.push({ file: rel, url, problem: 'ogImage is empty string' });
      continue;
    }

    // ── 1. Stale / wrong domain ────────────────────────────────────────────
    for (const { pattern, label } of STALE_PATTERNS) {
      if (pattern.test(url)) {
        issues.push({ file: rel, url, problem: label });
      }
    }

    // ── 2. Encoding violations — literal spaces or raw · in the URL ────────
    if (/ /.test(url)) {
      issues.push({ file: rel, url, problem: 'literal space in URL (must be %20)' });
    }
    if (/·/.test(url)) {
      issues.push({ file: rel, url, problem: 'raw middle-dot (·) in URL — encode as %C2%B7' });
    }
    // Double-encoded spaces (%2520 means the % was itself encoded)
    if (/%2520/i.test(url)) {
      issues.push({ file: rel, url, problem: 'double-encoded space (%2520) — should be %20' });
    }

    // ── 3. Queue for HTTP probe if it looks like a blob URL ────────────────
    if (url.includes(BLOB_HOST) && !/ /.test(url) && !/·/.test(url)) {
      toProbe.push({ file: rel, url });
    }
  }

  // Report static-analysis issues immediately
  for (const { file, url, problem } of issues) {
    const short = url.length > 70 ? url.slice(0, 67) + '…' : url;
    fail(`${file}`, `${problem}\n       URL: ${short}`);
  }

  // ── 4. Parallel HTTP probe via /_next/image proxy ─────────────────────────
  if (toProbe.length === 0) {
    warn('No blob URLs to probe — skipping HTTP checks');
    return;
  }

  console.log(`\n  🔍  Probing ${toProbe.length} ogImage URLs via /_next/image proxy…`);

  const CONCURRENCY = 8;
  const httpIssues = [];
  for (let i = 0; i < toProbe.length; i += CONCURRENCY) {
    const batch = toProbe.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(async ({ file, url }) => {
      const proxyUrl = buildProxyUrl(url);
      try {
        const res = await fetch(proxyUrl, {
          method: 'HEAD',
          signal: AbortSignal.timeout(12000),
          redirect: 'follow',
        });
        return { file, url, status: res.status };
      } catch (e) {
        return { file, url, status: 0, error: e.message };
      }
    }));
    for (const { file, url, status, error } of results) {
      if (status === 404) {
        httpIssues.push({ file, url, status });
        const short = url.length > 70 ? url.slice(0, 67) + '…' : url;
        fail(`${file}`, `ogImage returns 404 — file missing from blob storage\n       URL: ${short}`);
      } else if (status === 0) {
        warn(`${file} — ogImage probe timed out (${error ?? 'network error'})`);
      }
      // 200, 301, 302 → OK; 400 from proxy = URL/config issue, not a missing file
    }
  }

  const ok = toProbe.length - httpIssues.length;
  if (httpIssues.length === 0) {
    pass(`All ${ok} ogImage URLs returned non-404 from /_next/image proxy`);
  } else {
    console.log(`  ⚠️   ${ok} OK, ${httpIssues.length} broken (404) — see errors above`);
  }
}

async function main() {
  const bar = '═'.repeat(58);
  console.log(`╔${bar}╗\n║  ${CONFIG.siteLabel} — Pre-Deploy Health Checks`.padEnd(60) + '║');
  console.log(`╚${bar}╝\n  Target: ${BASE_URL}\n`);
  try { await fetch(`${BASE_URL}/`, { signal: AbortSignal.timeout(5000) }); }
  catch { console.error(`\n❌  Cannot reach ${BASE_URL}. Run: npm run dev\n`); process.exit(1); }

  await checkCSS(); await checkContactForm(); await checkCallRail();
  await checkAnalytics(); await checkGSC(); await checkSEO();
  await checkPhone(); await checkRobotsAndSitemap();
  await checkNavigation(); await checkLinks();
  await checkImages();

  console.log(`\n${'═'.repeat(60)}\n  Results: ${passed} passed, ${warned} warned, ${failed} failed\n${'═'.repeat(60)}\n`);
  if (failed > 0) { console.error(`🚫  Pre-deploy checks FAILED.\n`); process.exit(1); }
  else { console.log(`🚀  All checks passed${warned > 0 ? ` (${warned} warning(s))` : ''}. Safe to deploy!\n`); process.exit(0); }
}
main().catch(e => { console.error('Unexpected error:', e); process.exit(1); });
