// bring-the-humans-03 entry program.
// The whole entry is the TikTok video; this program's only job is to hand the
// house its address by copying VIDEO.json from the repository root into the
// output directory the grader points us at (MAKEFUN_OUTPUT_DIR, else /output).
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "VIDEO.json"), join(outDir, "VIDEO.json"));
