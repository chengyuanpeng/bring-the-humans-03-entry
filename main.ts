// bring-the-humans-03 entry program.
// The whole entry is the TikTok video; this program hands the house its
// address by copying VIDEO.json from the repository root into the output
// directory the grader points us at (MAKEFUN_OUTPUT_DIR, else /output).
//
// Before copying, the address is validated: the competition only accepts a
// full canonical TikTok video address (https://www.tiktok.com/@<handle>/
// video/<id>) — short links (vt.tiktok.com) and the starter's placeholder
// are refused by the site, so the program fails loudly on those instead of
// silently handing over an address that would get the entry rejected.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "VIDEO.json");

function fail(message: string): never {
  console.error(`main: ${message}`);
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(readFileSync(source, "utf8"));
} catch {
  fail("VIDEO.json is missing or is not valid JSON");
}

const url = (data as { url?: unknown })?.url;
if (typeof url !== "string" || url.length === 0) {
  fail('VIDEO.json must carry a non-empty "url" string');
}

const match = /^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)$/.exec(url);
if (!match) {
  fail(
    `VIDEO.json url is not a full TikTok video address: ${url} ` +
      "(short links and placeholders are not accepted)",
  );
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "VIDEO.json"));
console.log(`main: handed over TikTok video ${match[1]} (${url})`);
