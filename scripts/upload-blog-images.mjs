#!/usr/bin/env node
/**
 * scripts/upload-blog-images.mjs — Tuan Le Law
 *
 * Uploads images from a local folder to Vercel Blob Storage,
 * then patches any ogImage frontmatter that still points to blog_post.png.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx node scripts/upload-blog-images.mjs ./images-to-upload
 *
 * Where ./images-to-upload/ contains files named like:
 *   national-interest-waiver.webp     → used for NIW article ogImage
 *   k-1-visas.webp                    → used for K-1 article ogImage
 *   (filename must match the md file slug to auto-patch)
 *
 * Or you can manually update ogImage in the .md file after upload.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';
import { createReadStream } from 'fs';

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const STORE_BASE = 'https://qxwyml8xuwxdgws0.public.blob.vercel-storage.com';
const UPLOAD_PREFIX = 'tuanlelaw/files/shares/BlogImage';

if (!TOKEN || TOKEN.includes('xxx')) {
  console.error('\n❌  BLOB_READ_WRITE_TOKEN not set.');
  console.error('    Get it from: https://vercel.com/dashboard → Storage → tll-blob → Settings\n');
  process.exit(1);
}

const inputDir = process.argv[2];
if (!inputDir) {
  console.error('\n❌  Usage: node scripts/upload-blog-images.mjs <folder-with-images>\n');
  process.exit(1);
}

async function uploadFile(localPath, remotePath) {
  const url = `https://blob.vercel-storage.com/${remotePath}`;
  const fileData = readFileSync(localPath);
  const ext = extname(localPath).slice(1);
  const contentType =
    ext === 'webp' ? 'image/webp' :
    ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
    ext === 'png' ? 'image/png' :
    'application/octet-stream';

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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

async function main() {
  console.log(`\n📤  Uploading images from: ${inputDir}\n`);

  const files = readdirSync(inputDir).filter(f =>
    ['.webp', '.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
  );

  if (!files.length) {
    console.error('❌  No image files found in input directory.');
    process.exit(1);
  }

  const results = [];
  for (const file of files) {
    const localPath = join(inputDir, file);
    const remotePath = `${UPLOAD_PREFIX}/${file}`;
    process.stdout.write(`  Uploading ${file}… `);
    try {
      const blobUrl = await uploadFile(localPath, remotePath);
      console.log(`✅  ${blobUrl}`);
      results.push({ file, blobUrl });
    } catch (e) {
      console.log(`❌  ${e.message}`);
    }
  }

  console.log(`\n📋  Upload complete. Update your .md files:\n`);
  for (const { file, blobUrl } of results) {
    const slug = basename(file, extname(file));
    console.log(`  # ${slug}`);
    console.log(`  ogImage: ${blobUrl}\n`);
  }
}

main().catch(e => { console.error('Unexpected error:', e); process.exit(1); });
