#!/usr/bin/env node
/**
 * scripts/upload-og-images.mjs — Tuan Le Law
 *
 * Uploads all page-specific OG images to Vercel Blob Storage.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx node scripts/upload-og-images.mjs
 */

import { readFileSync } from 'fs';

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const BRAIN_DIR = '/Users/alihusayni/.gemini/antigravity/brain/61611a72-cdc1-49ff-b6ac-db80ec7b19d6';

if (!TOKEN || TOKEN.includes('xxx') || TOKEN === '') {
  console.error('\n❌  BLOB_READ_WRITE_TOKEN not set.');
  console.error('    Get it from: https://vercel.com/dashboard → Storage → tll-blob → Settings\n');
  process.exit(1);
}

const IMAGES = [
  {
    localFile: `${BRAIN_DIR}/tll_og_home_1782912268593.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-home.jpg',
    label: 'Home page OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_faq_1782912287075.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-faq.jpg',
    label: 'FAQ page OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_testimonials_1782912294370.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-testimonials.jpg',
    label: 'Testimonials page OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_resources_1782912301196.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-resources.jpg',
    label: 'Resources/Blog page OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_asylum_1782912326167.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-category-asylum-humanitarian-relief.jpg',
    label: 'Asylum & Humanitarian Relief category OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_citizenship_1782912331911.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-category-citizenship-naturalization.jpg',
    label: 'Citizenship & Naturalization category OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_deportation_v2_1782912375644.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-category-deportation-defense.jpg',
    label: 'Deportation Defense category OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_immigrant_visas_1782912346265.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-category-us-immigrant-visas.jpg',
    label: 'U.S. Immigrant Visas category OG image',
  },
  {
    localFile: `${BRAIN_DIR}/tll_og_nonimmigrant_visas_1782912353328.jpg`,
    remotePath: 'tuanlelaw/assets/og/og-category-us-nonimmigrant-visas.jpg',
    label: 'U.S. Nonimmigrant Visas category OG image',
  },
];

async function uploadFile(localPath, remotePath) {
  const url = `https://blob.vercel-storage.com/${remotePath}`;
  const fileData = readFileSync(localPath);

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'image/jpeg',
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

async function main() {
  console.log('\n📤  Uploading OG images for Tuan Le Law pages...\n');

  const results = [];
  for (const { localFile, remotePath, label } of IMAGES) {
    process.stdout.write(`  ${label}… `);
    try {
      const blobUrl = await uploadFile(localFile, remotePath);
      console.log(`✅  ${blobUrl}`);
      results.push({ label, remotePath, blobUrl });
    } catch (e) {
      console.log(`❌  ${e.message}`);
    }
  }

  console.log('\n\n📋  Upload complete. Blob URLs:\n');
  for (const { label, blobUrl } of results) {
    console.log(`  # ${label}`);
    console.log(`  ${blobUrl}\n`);
  }
}

main().catch(e => { console.error('Unexpected error:', e); process.exit(1); });
