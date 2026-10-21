import fs from "node:fs/promises";
import path from "node:path";
import net from "node:net";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
const projectRoot = process.cwd();
const req = createRequire(path.resolve(".reskin/tools/package.json"));
const { chromium } = req("playwright-core");
let exe = null;
for (const c of [`${process.env.PROGRAMFILES||"C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`, "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"]) { try { await fs.access(c); exe = exe || c } catch {} }
async function freePort(start){ for(let p=start;p<start+30;p+=1){ const ok = await new Promise(r=>{const s=net.createServer(); s.once("error",()=>r(false)); s.once("listening",()=>s.close(()=>r(true))); s.listen(p,"127.0.0.1")}); if(ok) return p } throw new Error("no port") }
const port = await freePort(4560);
const child = spawn(process.execPath, [path.join(projectRoot,"node_modules/vite/bin/vite.js"),"preview","--host","127.0.0.1","--port",String(port),"--strictPort"], { cwd: projectRoot, stdio: "ignore", windowsHide: true });
const baseUrl = `http://127.0.0.1:${port}/`;
const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<40;i+=1){ try{const r=await fetch(baseUrl); if(r.status<500) break}catch{} await sleep(400) }
const browser = await chromium.launch({ headless: true, executablePath: exe, args:["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
// focus the model button of plate 2, open, escape, check focus return
const act = page.locator(".orb-plate-act").nth(1);
await act.focus();
const before = await page.evaluate(() => document.activeElement.className);
await act.press("Enter");
await page.waitForTimeout(400);
const openState = await page.evaluate(() => ({ open: document.querySelector("dialog").open, active: document.activeElement.id || document.activeElement.className }));
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const after = await page.evaluate(() => ({ open: document.querySelector("dialog").open, active: document.activeElement.className, text: (document.activeElement.innerText || "").trim().slice(0, 20) }));
console.log("opener:", before, "| opened:", JSON.stringify(openState), "| after escape:", JSON.stringify(after));
// keyboard activate a plate
const hit = page.locator(".orb-plate-hit").nth(5);
await hit.focus();
await hit.press("Enter");
await page.waitForTimeout(200);
console.log("plate via Enter -> chamber:", (await page.locator(".orb-chamber h2").innerText()).slice(0, 60));
await page.locator(".orb-plate-hit").nth(6).focus();
await page.locator(".orb-plate-hit").nth(6).press(" ");
await page.waitForTimeout(200);
console.log("plate via Space -> chamber:", (await page.locator(".orb-chamber h2").innerText()).slice(0, 60));
// visible focus ring sample
const ring = await page.evaluate(() => {
  const el = document.activeElement;
  const cs = getComputedStyle(el);
  return { tag: el.tagName, outline: cs.outlineStyle + " " + cs.outlineWidth + " " + cs.outlineColor };
});
console.log("focus ring:", JSON.stringify(ring));
await browser.close();
await new Promise((r)=>{ const k = spawn("taskkill",["/pid",String(child.pid),"/T","/F"],{stdio:"ignore",windowsHide:true}); k.on("exit",r) });
