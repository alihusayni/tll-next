#!/usr/bin/env node
/**
 * scripts/fetch-pexels-images.mjs — Tuan Le Law
 *
 * Searches Pexels for appropriate images for each content page,
 * downloads them, uploads to Vercel Blob Storage, then patches ogImage frontmatter.
 *
 * Usage:
 *   PEXELS_API_KEY=xxx BLOB_READ_WRITE_TOKEN=yyy node scripts/fetch-pexels-images.mjs
 *
 * Or just update ogImage URLs to Pexels CDN (no blob upload needed):
 *   PEXELS_API_KEY=xxx node scripts/fetch-pexels-images.mjs --pexels-only
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const PEXELS_ONLY = process.argv.includes('--pexels-only');
const STORE_BASE = 'https://qxwyml8xuwxdgws0.public.blob.vercel-storage.com';
const UPLOAD_PREFIX = 'tuanlelaw/assets/articles';
const TMP_DIR = '/tmp/tll-images';

if (!PEXELS_API_KEY) {
  console.error('❌  PEXELS_API_KEY not set');
  process.exit(1);
}

if (!PEXELS_ONLY && !BLOB_READ_WRITE_TOKEN) {
  console.error('❌  BLOB_READ_WRITE_TOKEN not set. Use --pexels-only to skip blob upload.');
  process.exit(1);
}

const DEFAULT_IMAGE_URL = 'https://qxwyml8xuwxdgws0.public.blob.vercel-storage.com/tuanlelaw/assets/articles/default-Ymr17fTvRcljN3kl7uK0gyA3LE6PQI.jpg';

// Map each content file to its Pexels search query
const PAGE_QUERIES = {
  // Top-level pages
  'asylum-humanitarian-relief.md': {
    query: 'refugee asylum seeker legal help',
    alt: 'Asylum seeker receiving legal assistance',
  },
  'us-immigrant-visas.md': {
    query: 'us visa passport immigration office',
    alt: 'US visa and immigration documents',
  },
  'us-nonimmigrant-visas.md': {
    query: 'visa application travel documents passport',
    alt: 'Visa application documents and passport',
  },
  'us-visas.md': {
    query: 'immigration office visa application legal',
    alt: 'Immigration office and visa applications',
  },

  // Asylum
  'asylum-humanitarian-relief/asylum/asylum-seekers-rights-and-challenges.md': {
    query: 'refugee protection rights legal aid court',
    alt: 'Asylum seekers and their legal rights',
  },
  'asylum-humanitarian-relief/asylum/application-for-asylum.md': {
    query: 'asylum application form immigration documents',
    alt: 'Asylum application paperwork and documents',
  },

  // Citizenship
  'citizenship-naturalization/become-a-us-citizen.md': {
    query: 'us citizenship oath ceremony flag',
    alt: 'US citizenship naturalization ceremony',
  },
  'citizenship-naturalization/naturalization-filing-form-n-400.md': {
    query: 'naturalization form citizenship application paperwork',
    alt: 'N-400 naturalization form filing',
  },

  // Deportation defense
  'deportation-defense/removal-proceedings.md': {
    query: 'immigration court judge legal defense',
    alt: 'Immigration court proceedings and legal defense',
  },
  'deportation-defense/immigration-court-defense-strategies.md': {
    query: 'immigration lawyer court defense legal strategy',
    alt: 'Immigration lawyer in court defense strategies',
  },
  'deportation-defense/removal-proceedings/fighting-removal-proceedings.md': {
    query: 'immigration attorney legal fight court hearing',
    alt: 'Fighting removal proceedings in immigration court',
  },

  // Family-based immigration
  'us-immigrant-visas/family-based-immigration.md': {
    query: 'family immigration reunion visa green card',
    alt: 'Family reunification through immigration',
  },
  'us-immigrant-visas/family-based-immigration/fiance-visas/k-1-visas.md': {
    query: 'couple fiance visa engagement wedding immigration',
    alt: 'K-1 fiancé visa for engaged couples',
  },
  'us-immigrant-visas/family-based-immigration/marriage-visas/green-card-through-marriage.md': {
    query: 'marriage green card couple wedding immigration',
    alt: 'Green card through marriage immigration',
  },
  'us-immigrant-visas/family-based-immigration/immigration-status-and-child-custody.md': {
    query: 'child custody family court parents legal',
    alt: 'Child custody and immigration status legal issues',
  },

  // Employment-based immigration
  'us-immigrant-visas/employment-based-immigration/eb-2.md': {
    query: 'professional employment visa work permit office',
    alt: 'EB-2 employment based visa professional worker',
  },
  'us-immigrant-visas/employment-based-immigration/eb-1/eb-1-visas-requirements.md': {
    query: 'outstanding professional achievement visa immigration award',
    alt: 'EB-1 visa for extraordinary ability professionals',
  },
  'us-immigrant-visas/employment-based-immigration/eb-1/b-1-visa-permitted-activities.md': {
    query: 'business travel visa conference meeting professional',
    alt: 'B-1 visa business activities and travel',
  },
  'us-immigrant-visas/employment-based-immigration/eb-2/national-interest-waiver.md': {
    query: 'national interest waiver research scientist professional',
    alt: 'National Interest Waiver for skilled professionals',
  },
  'us-immigrant-visas/employment-based-immigration/eb-2/apply-for-the-b2-visa-by-yourself.md': {
    query: 'tourist visa travel passport application form',
    alt: 'Applying for a B-2 tourist visa independently',
  },
  'us-immigrant-visas/employment-based-immigration/h-1b/h1-b-visa-requirements.md': {
    query: 'tech worker professional h1b visa computer office',
    alt: 'H-1B visa requirements for tech professionals',
  },
  'us-immigrant-visas/employment-based-immigration/h-1b/us-h1b-and-canada-pr-options-for-laid-off-h1b-visa-holders.md': {
    query: 'laid off worker job loss career alternatives canada immigration',
    alt: 'Options for H-1B visa holders after layoffs',
  },

  // Diversity Visa
  'us-immigrant-visas/diversity-visa-lottery/visa-application.md': {
    query: 'diversity visa lottery global immigration opportunity',
    alt: 'Diversity visa lottery application process',
  },

  // Consular processing
  'us-immigrant-visas/consular-processing.md': {
    query: 'embassy consular visa interview appointment immigration',
    alt: 'Consular processing for US visa applications',
  },

  // Trump immigration rules
  'us-immigrant-visas/trump-new-immigration-rules.md': {
    query: 'immigration policy law change government border',
    alt: 'New immigration rules and policy changes',
  },

  // Student visas
  'us-nonimmigrant-visas/student-visas/f-1-student-visa.md': {
    query: 'international student university campus education visa',
    alt: 'F-1 student visa for international students',
  },

  // Resources
  'resources/slow-immigration-causes-worker-shortages.md': {
    query: 'worker shortage staffing employment business',
    alt: 'Worker shortage due to slow immigration processing',
  },
  'resources/immigration-reform-in-social-spending-bill.md': {
    query: 'congress legislation immigration reform bill vote',
    alt: 'Immigration reform in social spending legislation',
  },
  'resources/new-immigration-guidelines.md': {
    query: 'immigration policy guidelines government regulation',
    alt: 'New US immigration guidelines and regulations',
  },
  'resources/insurance-company-fined-for-immigration-related-discrimination.md': {
    query: 'insurance discrimination legal fine penalty court',
    alt: 'Insurance company fined for immigration discrimination',
  },
  'resources/new-immigration-proposal-will-benefit-farmworkers-and-dreamers.md': {
    query: 'farmworker agriculture field dreamer immigration',
    alt: 'Immigration proposal benefiting farmworkers and Dreamers',
  },
  'resources/dhs-stops-releasing-migrants-without-court-date.md': {
    query: 'border patrol immigration enforcement migrants detention',
    alt: 'DHS immigration enforcement and migrant detentions',
  },
  'resources/a-path-to-legalization-for-undocumented-immigrants.md': {
    query: 'immigration legalization undocumented path forward hope',
    alt: 'Path to legalization for undocumented immigrants',
  },
  'resources/undocumented-immigrants-left-helpless.md': {
    query: 'undocumented immigrant struggle family separation worry',
    alt: 'Undocumented immigrants facing challenges in the US',
  },
  'resources/new-nominee-for-cbp.md': {
    query: 'customs border protection government agency badge officer',
    alt: 'New nominee for Customs and Border Protection',
  },
  'resources/permanent-residents-evidence-of-status-extended.md': {
    query: 'green card permanent resident card extension immigration',
    alt: 'Permanent resident status extension documentation',
  },
  'resources/us-immigration-policy-2025.md': {
    query: 'immigration policy 2025 government reform executive',
    alt: 'US immigration policy updates for 2025',
  },
  'resources/u-s-immigration-agency-to-bring-back-the-nation-of-immigrants-label.md': {
    query: 'uscis immigration agency nation of immigrants diversity',
    alt: 'USCIS nation of immigrants diversity policy',
  },
  'resources/how-to-prepare-strong-immigration-application-tips.md': {
    query: 'immigration application tips preparation checklist documents',
    alt: 'Tips for preparing a strong immigration application',
  },
  'resources/expedite-uscis-case.md': {
    query: 'uscis case expedite fast processing immigration form',
    alt: 'How to expedite a USCIS immigration case',
  },
  'resources/employment-authorization-how-to-file-form-i-765.md': {
    query: 'employment authorization work permit form ead card',
    alt: 'Filing Form I-765 for employment authorization',
  },
  'resources/how-to-avoid-immigration-application-errors.md': {
    query: 'immigration application errors mistakes avoid careful documents',
    alt: 'Avoiding common immigration application errors',
  },
  'resources/common-immigration-questions-answered-immigration-lawyer.md': {
    query: 'immigration lawyer consultation questions answers legal advice',
    alt: 'Common immigration questions answered by a lawyer',
  },
  'resources/coronavirus-cases-increased-among-detained-immigrants.md': {
    query: 'pandemic health detention facility covid immigrants',
    alt: 'Coronavirus cases among detained immigrants',
  },
  'resources/biden-immigration-plans.md': {
    query: 'white house government immigration executive action reform',
    alt: 'Biden administration immigration plans and policies',
  },
};

async function searchPexels(query, page = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&size=large&page=${page}`;
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });
  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
  return res.json();
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const writer = createWriteStream(destPath);
  await pipeline(res.body, writer);
}

async function uploadToBlob(localPath, remoteName) {
  const url = `https://blob.vercel-storage.com/${UPLOAD_PREFIX}/${remoteName}`;
  const fileData = readFileSync(localPath);
  const ext = extname(localPath).slice(1).toLowerCase();
  const contentType = ext === 'webp' ? 'image/webp' :
    ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
    ext === 'png' ? 'image/png' : 'application/octet-stream';

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${BLOB_READ_WRITE_TOKEN}`,
      'Content-Type': contentType,
      'x-api-version': '7',
    },
    body: fileData,
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upload failed ${res.status}: ${txt}`);
  }
  const json = await res.json();
  return json.url;
}

function updateFrontmatter(filePath, newOgImageUrl) {
  const content = readFileSync(filePath, 'utf8');
  const updated = content.replace(
    /^ogImage:.*$/m,
    `ogImage: ${newOgImageUrl}`
  );
  if (updated === content) {
    console.warn(`  ⚠️  No ogImage field found in ${filePath}`);
    return false;
  }
  writeFileSync(filePath, updated, 'utf8');
  return true;
}

function findContentFile(slug) {
  const base = '/Users/alihusayni/tll-next/content';
  const fullPath = join(base, slug);
  if (existsSync(fullPath)) return fullPath;
  return null;
}

async function processPage(slug, config) {
  const contentPath = findContentFile(slug);
  if (!contentPath) {
    console.log(`  ⏭️  Skipping ${slug} (file not found)`);
    return null;
  }

  // Check if it already has a non-default image
  const content = readFileSync(contentPath, 'utf8');
  const ogImageMatch = content.match(/^ogImage:\s*(.+)$/m);
  const currentImage = ogImageMatch ? ogImageMatch[1].trim() : '';
  
  if (currentImage && currentImage !== DEFAULT_IMAGE_URL && !currentImage.includes('default-Ymr17fTvRcljN3kl7uK0gyA3LE6PQI')) {
    console.log(`  ✅  ${slug} already has a custom image, skipping`);
    return { slug, skipped: true, currentImage };
  }

  console.log(`\n📸  Processing: ${slug}`);
  console.log(`   Query: "${config.query}"`);

  try {
    // Search Pexels
    const result = await searchPexels(config.query);
    if (!result.photos || result.photos.length === 0) {
      console.log(`  ❌  No photos found for query: ${config.query}`);
      return null;
    }

    const photo = result.photos[0];
    const pexelsUrl = photo.src.large2x; // High quality landscape image
    const photographer = photo.photographer;

    console.log(`   Found: Photo #${photo.id} by ${photographer}`);
    console.log(`   Pexels URL: ${pexelsUrl}`);

    let finalUrl;

    if (PEXELS_ONLY) {
      // Use Pexels URL directly with width/height params for optimization
      // Use the landscape version which is 1200x627
      finalUrl = photo.src.landscape;
      console.log(`   Using Pexels CDN URL: ${finalUrl}`);
    } else {
      // Download and upload to Vercel Blob
      if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });
      
      const slugName = slug.replace(/\//g, '-').replace('.md', '');
      const tmpPath = join(TMP_DIR, `${slugName}.jpg`);
      
      process.stdout.write(`   Downloading... `);
      await downloadImage(pexelsUrl, tmpPath);
      console.log(`✓`);

      process.stdout.write(`   Uploading to blob... `);
      const remoteName = `${slugName}.jpg`;
      finalUrl = await uploadToBlob(tmpPath, remoteName);
      console.log(`✓`);
      console.log(`   Blob URL: ${finalUrl}`);
    }

    // Update the markdown file
    const updated = updateFrontmatter(contentPath, finalUrl);
    if (updated) {
      console.log(`   Updated frontmatter ✓`);
    }

    return { slug, finalUrl, photographer, photoId: photo.id };
  } catch (err) {
    console.error(`  ❌  Error processing ${slug}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`\n🚀  Fetching Pexels images for Tuan Le Law pages`);
  console.log(`   Mode: ${PEXELS_ONLY ? 'Pexels CDN URLs only' : 'Download + Upload to Vercel Blob'}\n`);

  const results = [];

  for (const [slug, config] of Object.entries(PAGE_QUERIES)) {
    const result = await processPage(slug, config);
    if (result) results.push(result);
    // Small delay to respect Pexels rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n\n📋  Summary:`);
  console.log(`   Processed: ${results.filter(r => !r?.skipped).length} pages`);
  console.log(`   Skipped (already custom): ${results.filter(r => r?.skipped).length} pages`);
  
  const failed = Object.keys(PAGE_QUERIES).length - results.length;
  if (failed > 0) console.log(`   Failed: ${failed} pages`);

  if (PEXELS_ONLY) {
    console.log(`\n✅  All files updated with Pexels CDN URLs`);
    console.log(`   Remember to add 'images.pexels.com' to remotePatterns in next.config.ts`);
  }
}

main().catch(e => { console.error('Unexpected error:', e); process.exit(1); });
