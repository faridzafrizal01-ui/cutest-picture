// cutest-picture-01 entry (Node 22, standard library only): the picture is
// entry.png beside this file — a tiny kitten in a basket — and the program
// copies it to /output/entry.png. Deterministic: the same bytes every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), outPath);
// Fail loudly instead of shipping an over-limit picture: the gate takes at
// most 1 MiB and 1024 by 1024 pixels.
const size = statSync(outPath).size;
if (size > 1048576) throw new Error(`entry.png is ${size} bytes, over the 1 MiB gate`);
