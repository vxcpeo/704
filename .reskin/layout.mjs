/** Measure layout boxes and dock overlaps for the built site. */
import fs from 'node:fs/promises'
import path from 'node:path'
import net from 'node:net'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const projectRoot = process.cwd()
const req = createRequire(path.resolve(projectRoot, '.reskin/tools/package.json'))
const { chromium } = req('playwright-core')
let exe = null
const cands = [`${process.env.PROGRAMFILES || 'C:\\Program Files'}\\Google\\Chrome\\Application\\chrome.exe`, 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe']
for (const c of cands) { try { await fs.access(c); exe = exe || c } catch { /* next */ } }

async function freePort(start) {
  for (let port = start; port < start + 30; port += 1) {
    const ok = await new Promise((resolve) => {
      const s = net.createServer()
      s.once('error', () => resolve(false))
      s.once('listening', () => s.close(() => resolve(true)))
      s.listen(port, '127.0.0.1')
    })
    if (ok) return port
  }
  throw new Error('no port')
}

const port = await freePort(4460)
const child = spawn(process.execPath, [path.join(projectRoot, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: projectRoot, stdio: 'ignore', windowsHide: true })
const baseUrl = `http://127.0.0.1:${port}/`
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 40; i += 1) { try { const r = await fetch(baseUrl); if (r.status < 500) break } catch { /* wait */ } await sleep(400) }

const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--no-sandbox', '--hide-scrollbars'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
await page.goto(baseUrl + '#overview', { waitUntil: 'networkidle' })
await page.waitForTimeout(400)

async function report(label) {
  const data = await page.evaluate(() => {
    const box = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { top: Math.round(r.top + window.scrollY), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }
    }
    const scenes = [...document.querySelectorAll('.orb-scene')].map((el) => {
      const r = el.getBoundingClientRect()
      return { top: Math.round(r.top + window.scrollY), h: Math.round(r.height), cls: el.className }
    })
    const dock = document.querySelector('.orb-dock').getBoundingClientRect()
    const dockBox = { top: Math.round(dock.top), left: Math.round(dock.left), w: Math.round(dock.width), h: Math.round(dock.height) }
    // elements intersecting the dock area in the first viewport
    const hits = []
    const vh = window.innerHeight
    for (const el of document.querySelectorAll('main *, footer *')) {
      const r = el.getBoundingClientRect()
      if (r.bottom < dock.top || r.top > dock.bottom) continue
      if (r.right < dock.left || r.left > dock.right) continue
      if (r.top > vh) continue
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40)
      if (!text) continue
      hits.push({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 40), text, top: Math.round(r.top), bottom: Math.round(r.bottom) })
    }
    return {
      vh,
      doc: { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight },
      scenes,
      boxes: {
        strip: box('.orb-strip'), prologue: box('.orb-prologue'), h1: box('h1'), orbit: box('.orb-orbit'),
        stats: box('.orb-hero-stats'), hall: box('.orb-scene--hall'), rail: box('.orb-rail'),
        disclosure: box('.orb-disclosure'), chamber: box('.orb-chamber'), digest: box('.orb-scene--digest'),
        colophon: box('.orb-colophon'),
      },
      dock: dockBox,
      hits: hits.slice(0, 12),
    }
  })
  console.log(`\n### ${label}`)
  console.log('doc', JSON.stringify(data.doc), 'vh', data.vh)
  console.log('dock', JSON.stringify(data.dock))
  for (const s of data.scenes) console.log('scene', s.top, s.h, s.cls)
  for (const [k, v] of Object.entries(data.boxes)) console.log(' box', k, JSON.stringify(v))
  for (const h of data.hits) console.log(' HIT', h.tag, h.cls, h.top, h.bottom, '|', h.text)
}

await report('desktop 1440x900')
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(300)
await report('mobile 390x844')
await page.setViewportSize({ width: 1440, height: 900 })
await page.waitForTimeout(200)

// per-route quick look
for (const route of ['#markets', '#positions', '#governance']) {
  await page.goto(baseUrl + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const info = await page.evaluate(() => ({
    title: document.title,
    scenes: [...document.querySelectorAll('.orb-scene')].map((el) => Math.round(el.getBoundingClientRect().height)),
    h1: document.querySelectorAll('h1').length,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    scrollW: document.documentElement.scrollWidth,
    consoleText: document.body.innerText.slice(0, 60),
  }))
  console.log('\nroute', route, JSON.stringify(info))
  await page.screenshot({ path: `.reskin/scratch/route${route.replace('#', '-')}-desktop.png`, fullPage: true })
}
await page.setViewportSize({ width: 390, height: 844 })
for (const route of ['#markets', '#positions', '#governance']) {
  await page.goto(baseUrl + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const info = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2, w: document.documentElement.scrollWidth }))
  console.log('route mobile', route, JSON.stringify(info))
  await page.screenshot({ path: `.reskin/scratch/route${route.replace('#', '-')}-mobile.png`, fullPage: true })
}

await browser.close()
spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true })
