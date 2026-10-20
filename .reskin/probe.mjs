import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs/promises";
const req = createRequire(path.resolve(".reskin/tools/package.json"));
const { chromium } = req("playwright-core");
let exe = null;
const cands = [(process.env.PROGRAMFILES||"C:\\Program Files") + "\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"];
for (const c of cands) { try { await fs.access(c); exe = exe || c; } catch {} }
const dir = (process.env.LOCALAPPDATA || "") + "\\ms-playwright";
try { for (const e of await fs.readdir(dir)) { if (/^chromium-\d+$/.test(e)) { const p = dir + "\\" + e + "\\chrome-win64\\chrome.exe"; try { await fs.access(p); exe = exe || p; } catch {} } } } catch {}
console.log("exe", exe);
const browser = await chromium.launch({ headless: true, executablePath: exe });
const page = await browser.newPage();
await page.setContent(`<div id="a" style="text-transform:uppercase">Solana Testnet</div>
<div id="b" style="opacity:0;position:absolute">Hidden Words</div>
<div id="c" style="visibility:hidden">Invisible Words</div>
<span id="d" class="x">Parent Label</span>`);
console.log(await page.evaluate(() => ({
  upper: document.getElementById("a").innerText,
  opacity0: document.getElementById("b").innerText,
  visHidden: document.getElementById("c").innerText,
  rect: JSON.stringify(document.getElementById("b").getBoundingClientRect()),
})));
await browser.close();
