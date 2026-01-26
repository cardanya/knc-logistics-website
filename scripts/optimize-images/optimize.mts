#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface OptimizationConfig {
  maxWidth: number;
  targetMaxSize: number; // in bytes
  minQuality: number;
  maxQuality: number;
  initialQuality: number;
}

interface ImageTarget {
  input: string;
  output: string;
  originalSize: number;
}

const config: OptimizationConfig = {
  maxWidth: 2400,
  targetMaxSize: 1.5 * 1024 * 1024, // 1.5 MB
  minQuality: 75,
  maxQuality: 90,
  initialQuality: 82,
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getAdaptiveQuality = (originalSize: number): number => {
  // Larger files need lower quality to reach target size
  const sizeMB = originalSize / (1024 * 1024);

  if (sizeMB > 7) return 78;
  if (sizeMB > 5) return 80;
  if (sizeMB > 3) return 82;
  if (sizeMB > 2) return 84;
  if (sizeMB > 1.5) return 86;
  return 88;
};

const optimizeImage = async (
  input: string,
  output: string,
  originalSize: number,
  dryRun: boolean
): Promise<{ success: boolean; outputSize?: number; quality?: number }> => {
  try {
    let quality = getAdaptiveQuality(originalSize);

    if (dryRun) {
      console.log(`  [DRY RUN] Would optimize: ${basename(input)}`);
      console.log(`    Original size: ${formatBytes(originalSize)}`);
      console.log(`    Target quality: ${quality}%`);
      console.log(`    Output: ${basename(output)}`);
      return { success: true };
    }

    // First attempt with adaptive quality
    let buffer = await sharp(input)
      .resize({ width: config.maxWidth, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    let outputSize = buffer.length;

    // If still too large, reduce quality iteratively
    let attempts = 0;
    while (outputSize > config.targetMaxSize && quality > config.minQuality && attempts < 5) {
      quality -= 3;
      attempts++;

      buffer = await sharp(input)
        .resize({ width: config.maxWidth, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toBuffer();

      outputSize = buffer.length;
    }

    // Write the optimized file
    await sharp(buffer).toFile(output);

    return { success: true, outputSize, quality };
  } catch (error) {
    console.error(`  ✗ Error optimizing ${basename(input)}:`, error);
    return { success: false };
  }
};

const findImages = async (dir: string, extensions: string[]): Promise<ImageTarget[]> => {
  const targets: ImageTarget[] = [];

  try {
    const entries = await readdir(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isFile()) {
        const ext = extname(entry).toLowerCase();
        if (extensions.includes(ext)) {
          const outputPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          targets.push({
            input: fullPath,
            output: outputPath,
            originalSize: stats.size,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return targets;
};

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('🖼️  Image Optimization Script\n');
  console.log('Configuration:');
  console.log(`  Max width: ${config.maxWidth}px`);
  console.log(`  Target max size: ${formatBytes(config.targetMaxSize)}`);
  console.log(`  Quality range: ${config.minQuality}-${config.maxQuality}%`);
  console.log(`  Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}\n`);

  const projectRoot = join(__dirname, '../../');
  const publicDir = join(projectRoot, 'public');
  const videosDir = join(publicDir, 'videos');

  // Find all images
  const publicImages = await findImages(publicDir, ['.jpg', '.jpeg', '.png']);
  const videoImages = await findImages(videosDir, ['.jpg', '.jpeg', '.png']);
  const allImages = [...publicImages, ...videoImages];

  // Filter out the logo (too small to optimize)
  const imagesToOptimize = allImages.filter(img => !img.input.includes('kc_logo'));

  if (imagesToOptimize.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${imagesToOptimize.length} images to optimize:\n`);

  const totalOriginalSize = imagesToOptimize.reduce((sum, img) => sum + img.originalSize, 0);
  let totalOutputSize = 0;
  let successCount = 0;

  for (const [index, target] of imagesToOptimize.entries()) {
    console.log(`[${index + 1}/${imagesToOptimize.length}] ${basename(target.input)}`);
    console.log(`  Original: ${formatBytes(target.originalSize)}`);

    const result = await optimizeImage(
      target.input,
      target.output,
      target.originalSize,
      dryRun
    );

    if (result.success) {
      successCount++;
      if (!dryRun && result.outputSize) {
        totalOutputSize += result.outputSize;
        const reduction = ((1 - result.outputSize / target.originalSize) * 100).toFixed(1);
        console.log(`  ✓ Optimized: ${formatBytes(result.outputSize)} (${reduction}% reduction)`);
        console.log(`    Quality: ${result.quality}%`);
      }
    }
    console.log('');
  }

  // Summary
  console.log('─'.repeat(60));
  console.log(`\n📊 Summary:\n`);
  console.log(`  Images processed: ${successCount}/${imagesToOptimize.length}`);
  console.log(`  Total original size: ${formatBytes(totalOriginalSize)}`);

  if (!dryRun) {
    console.log(`  Total optimized size: ${formatBytes(totalOutputSize)}`);
    const totalReduction = ((1 - totalOutputSize / totalOriginalSize) * 100).toFixed(1);
    const savedSize = totalOriginalSize - totalOutputSize;
    console.log(`  Total reduction: ${formatBytes(savedSize)} (${totalReduction}%)`);
    console.log(`\n✓ Optimization complete! WebP files created alongside originals.`);
    console.log(`  Next.js will automatically serve WebP to supported browsers.`);
  } else {
    console.log(`\n  Run without --dry-run to perform optimization.`);
  }
};

main().catch(console.error);
