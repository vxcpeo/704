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
const port = await freePort(4600);
const child = spawn(process.execPath, [path.join(projectRoot,"node_modules/vite/bin/vite.js"),"preview","--host","127.0.0.1","--port",String(port),"--strictPort"], { cwd: projectRoot, stdio: "ignore", windowsHide: true });
const baseUrl = `http://127.0.0.1:${port}/`;
const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<40;i+=1){ try{const r=await fetch(baseUrl); if(r.status<500) break}catch{} await sleep(400) }
const browser = await chromium.launch({ headless: true, executablePath: exe, args:["--no-sandbox","--hide-scrollbars"] });
const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
for (const [w,h] of [[1280,800],[1024,768],[820,1180],[375,812]]) {
  await page.setViewportSize({ width: w, height: h });
  for (const route of ["", "#markets", "#positions", "#governance"]) {
    await page.goto(baseUrl + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      dock: (() => { const d = document.querySelector(".orb-dock").getBoundingClientRect(); return [Math.round(d.left), Math.round(d.right), Math.round(d.width)] })(),
      h1: document.querySelector("h1")?.getBoundingClientRect().height,
    }));
    console.log(w + "x" + h, route || "/", JSON.stringify(info));
  }
  await page.setViewportSize({ width: w, height: h });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await page.screenshot({ path: `.reskin/scratch/width-${w}.png`, fullPage: w > 800 });
}
await browser.close();
await new Promise((r)=>{ const k = spawn("taskkill",["/pid",String(child.pid),"/T","/F"],{stdio:"ignore",windowsHide:true}); k.on("exit",r) });
