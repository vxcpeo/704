import fs from "node:fs/promises"; import path from "node:path"; import net from "node:net"; import { spawn } from "node:child_process"; import { createRequire } from "node:module";
const projectRoot = process.cwd(); const req = createRequire(path.resolve(".reskin/tools/package.json")); const { chromium } = req("playwright-core");
let exe=null; for (const c of [`${process.env.PROGRAMFILES||"C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`]) { try { await fs.access(c); exe=c } catch {} }
async function freePort(s){for(let p=s;p<s+30;p+=1){const ok=await new Promise(r=>{const x=net.createServer();x.once("error",()=>r(false));x.once("listening",()=>x.close(()=>r(true)));x.listen(p,"127.0.0.1")});if(ok)return p}throw 0}
const port=await freePort(4700);
const child=spawn(process.execPath,[path.join(projectRoot,"node_modules/vite/bin/vite.js"),"preview","--host","127.0.0.1","--port",String(port),"--strictPort"],{cwd:projectRoot,stdio:"ignore",windowsHide:true});
const base=`http://127.0.0.1:${port}/`; const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<40;i+=1){try{const r=await fetch(base);if(r.status<500)break}catch{}await sleep(400)}
const browser=await chromium.launch({headless:true,executablePath:exe,args:["--no-sandbox","--hide-scrollbars"]});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto(base,{waitUntil:"networkidle"}); await page.waitForTimeout(500);
await page.screenshot({path:".reskin/scratch/hero-final.png", clip:{x:0,y:0,width:1440,height:910}});
await browser.close();
await new Promise(r=>{const k=spawn("taskkill",["/pid",String(child.pid),"/T","/F"],{stdio:"ignore",windowsHide:true});k.on("exit",r)});
