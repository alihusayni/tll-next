#!/usr/bin/env node
/**
 * scripts/pre-deploy-checks.mjs — Tuan Le Law
 *
 * Usage:
 *   npm run check        — against running localhost:3000
 *   npm run check:ci     — build + start + check + kill (Option B)
 */

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
    res.status >= 200 && res.status < 300 ? pass(`Valid submission → ${res.status}`) : fail('Valid submission returned unexpected status', `Got ${res.status}`);
  } catch (e) { fail('Contact form POST failed', e.message); }
  try {
    const res = await post(CONFIG.contactPath, { name: '' });
    res.status >= 400 && res.status < 500 ? pass(`Invalid submission correctly rejected → ${res.status}`) : fail('Invalid submission was not rejected', `Got ${res.status} (expected 4xx)`);
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
  if (CONFIG.gaId) {
    html.includes(CONFIG.gaId) ? pass(`GA4 ID (${CONFIG.gaId}) found in HTML`) : fail(`GA4 ID (${CONFIG.gaId}) NOT found in homepage HTML`);
  } else warn('GA4 ID not configured — skipping');
  html.includes('googletagmanager') || html.includes('gtag') ? pass('gtag / GTM reference found') : warn('gtag / GTM not found');
  html.includes('/api/callrail-swap') ? pass('CallRail proxy script tag found') : fail('CallRail proxy script tag NOT found in homepage HTML');
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

  console.log(`\n${'═'.repeat(60)}\n  Results: ${passed} passed, ${warned} warned, ${failed} failed\n${'═'.repeat(60)}\n`);
  if (failed > 0) { console.error(`🚫  Pre-deploy checks FAILED.\n`); process.exit(1); }
  else { console.log(`🚀  All checks passed${warned > 0 ? ` (${warned} warning(s))` : ''}. Safe to deploy!\n`); process.exit(0); }
}
main().catch(e => { console.error('Unexpected error:', e); process.exit(1); });
