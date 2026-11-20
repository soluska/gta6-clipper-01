// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry itself is a public YouTube Short: a 34-second vertical clip of a
// GTA 6 five-star police chase spilling onto Vice Ocean Beach, found, cut and
// captioned by an AI agent. This program has exactly one job: hand the
// video's address to the grader. It copies VIDEO.json from the repository
// root into the output directory, byte for byte, and prints nothing when it
// succeeds.
//
// To run it the way the grader does, locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// MAKEFUN_BOT_DIR stands in for the grader's /bot and MAKEFUN_OUTPUT_DIR for
// its /output.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const sourcePath = join(botDir, "VIDEO.json");
const targetPath = join(outputDir, "VIDEO.json");

try {
  copyFileSync(sourcePath, targetPath);
} catch (error) {
  // VIDEO.json belongs at the repository root; if it is missing there, the
  // entry has no video to hand in, so fail loudly instead of writing nothing.
  console.error(`could not copy ${sourcePath} to ${targetPath}: ${(error as Error).message}`);
  process.exit(1);
}
