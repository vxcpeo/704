/** Functional click-through: sheets, preview flow, filters, route hash changes. */
import fs from 'node:fs/promises'
import path from 'node:path'
import net from 'node:net'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const projectRoot = process.cwd()
const SKILL = 'C:/Users/Administrator/.dsh/skills/reskin/scripts'
const { capturePages } = await import(pathToFileURL(path.resolve(SKILL, 'lib/browser.mjs')).href) // ensure playwright provisioned
const req = createRequire(path.resolve(projectRoot, '.reskin/tools/package.json'))
const { chromium } = req('playwright-core')
const axePath = req.resolve('axe-core/axe.min.js')

let exe = null
for (const c of [`${process.env.PROGRAMFILES || 'C:\\Program Files'}\\Google\\Chrome\\Application\\chrome.exe`, 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe']) {
  try { await fs.access(c); exe = exe || c } catch { /* next */ }
}

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

const port = await freePort(4500)
const child = spawn(process.execPath, [path.join(projectRoot, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: projectRoot, stdio: 'ignore', windowsHide: true })
const baseUrl = `http://127.0.0.1:${port}/`
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 40; i += 1) { try { const r = await fetch(baseUrl); if (r.status < 500) break } catch { /* wait */ } await sleep(400) }

await fs.mkdir('.reskin/scratch', { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--no-sandbox', '--hide-scrollbars'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push(String(e)))

async function axeCheck(label) {
  await page.addScriptTag({ path: axePath })
  const res = await page.evaluate(async () => {
    const out = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] })
    return out.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }))
  })
  const serious = res.filter((v) => ['serious', 'critical'].includes(v.impact))
  console.log(`axe ${label}: ${res.length} violations (serious ${serious.length})`, JSON.stringify(res))
}

await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)

// 1. filter to empty state
await page.fill('input[type="search"]', 'zzzz')
await page.waitForTimeout(250)
console.log('empty state visible:', await page.locator('.orb-empty h2', { hasText: 'No matching events' }).count())
await page.screenshot({ path: '.reskin/scratch/state-empty.png' })
await page.click('button:has-text("Reset filters")')
await page.waitForTimeout(200)
console.log('plates after reset:', await page.locator('.orb-plate').count())

// 2. select a plate
await page.locator('.orb-plate-hit').nth(3).click()
await page.waitForTimeout(200)
console.log('current plate count:', await page.locator('.orb-plate.is-current').count())
console.log('chamber heading:', (await page.locator('.orb-chamber h2').innerText()).slice(0, 80))

// 3. open the model sheet from the plate action
await page.locator('.orb-plate-act').nth(3).click()
await page.waitForTimeout(400)
console.log('sheet open:', await page.locator('dialog.orb-sheet[open]').count(), 'title:', await page.locator('#preview-title').innerText())
await page.screenshot({ path: '.reskin/scratch/sheet-preview.png' })
await axeCheck('sheet preview')

// 4. validate amount error
await page.click('button:has-text("Review position")')
await page.waitForTimeout(200)
console.log('amount error:', await page.locator('.orb-form-error').innerText())
await page.fill('#preview-amount', '100')
await page.click('button:has-text("Review position")')
await page.waitForTimeout(300)
console.log('review title:', await page.locator('#review-title').innerText())
await page.screenshot({ path: '.reskin/scratch/sheet-review.png' })
await page.check('.orb-check input')
await page.click('button:has-text("Save local receipt")')
await page.waitForTimeout(500)
console.log('hash after save:', await page.evaluate(() => window.location.hash), 'title:', await page.title())
console.log('receipts:', await page.locator('.orb-receipt').count())
await page.screenshot({ path: '.reskin/scratch/state-positions.png' })
await axeCheck('positions with receipt')

// 5. wallet sheet
await page.goto(`${baseUrl}#overview`, { waitUntil: 'networkidle' })
await page.waitForTimeout(300)
await page.click('.orb-dock-wallet')
await page.waitForTimeout(400)
console.log('wallet sheet:', await page.locator('#wallet-title').innerText())
await page.screenshot({ path: '.reskin/scratch/sheet-wallet.png' })
await axeCheck('wallet sheet')
await page.keyboard.press('Escape')
await page.waitForTimeout(300)

// 6. guide sheet
await page.click('button:has-text("Read the guide")')
await page.waitForTimeout(400)
console.log('guide sheet:', await page.locator('#guide-title').innerText())
await page.screenshot({ path: '.reskin/scratch/sheet-guide.png' })
await axeCheck('guide sheet')
await page.keyboard.press('Escape')
await page.waitForTimeout(300)

// 7. route changes via the dock
for (const label of ['Events', 'Receipts', 'Chain', 'Ledger']) {
  await page.click(`.orb-dock-routes a:has-text("${label}")`)
  await page.waitForTimeout(350)
  console.log('dock', label, '->', await page.evaluate(() => window.location.hash), await page.title(), 'h1:', await page.locator('h1').innerText())
}

// 8. mobile sheet
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(300)
await page.locator('.orb-plate-act').first().click()
await page.waitForTimeout(400)
await page.screenshot({ path: '.reskin/scratch/sheet-preview-mobile.png' })
await axeCheck('mobile sheet')

console.log('console errors:', JSON.stringify(errors))
await browser.close()
await new Promise((resolve) => {
  const k = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true })
  k.on('exit', resolve)
})
