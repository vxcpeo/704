/**
 * Local iteration harness: full-detail diff of the reskinned site against the
 * frozen baseline. Mirrors verify.mjs gates but prints every mismatch so the
 * UI can be fixed before the official verification run.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import net from 'node:net'
import { spawn } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const SKILL = 'C:/Users/Administrator/.dsh/skills/reskin/scripts'
const { analyzeProject, contractDiff } = await import(pathToFileURL(path.resolve(SKILL, 'inventory.mjs')).href)
const { capturePages } = await import(pathToFileURL(path.resolve(SKILL, 'lib/browser.mjs')).href)
const compare = await import(pathToFileURL(path.resolve(SKILL, 'lib/compare.mjs')).href)

const projectRoot = process.cwd()
const outDir = path.resolve(projectRoot, '.reskin')
const THRESHOLDS = { maxStructureSimilarity: 0.5, maxLandmarkSimilarity: 0.68, maxClassOverlap: 0.1, minAccentDistance: 30 }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function findFreePort(start) {
  for (let port = start; port < start + 40; port += 1) {
    const free = await new Promise((resolve) => {
      const server = net.createServer()
      server.once('error', () => resolve(false))
      server.once('listening', () => server.close(() => resolve(true)))
      server.listen(port, '127.0.0.1')
    })
    if (free) return port
  }
  throw new Error('no free port')
}

async function killTree(pid) {
  if (!pid) return
  await new Promise((resolve) => {
    const child = spawn('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true })
    child.on('exit', resolve)
    child.on('error', resolve)
  })
}

const baselineInventory = JSON.parse(await fs.readFile(path.join(outDir, 'baseline', 'inventory.json'), 'utf8'))
const baselinePages = JSON.parse(await fs.readFile(path.join(outDir, 'baseline', 'pages.json'), 'utf8'))

console.log('== source contract ==')
const current = await analyzeProject(projectRoot)
const diff = contractDiff(baselineInventory.contentContract, current.contentContract, { allowAdditions: true })
const issues = [...diff.issues]
const warnings = [...diff.warnings]
for (let i = warnings.length - 1; i >= 0; i -= 1) {
  if (/^(visibleText|i18n|forms): (?:added|".*" count increased)/.test(warnings[i])) {
    issues.push(warnings.splice(i, 1)[0])
  }
}
console.log(`issues ${issues.length}`)
for (const issue of issues) console.log('  ISSUE', issue)
console.log(`warnings ${warnings.length}`)
for (const w of warnings) console.log('  warn ', w)
console.log('archetype', JSON.stringify(current.archetype))
const baseAccent = compare.anchorAccent(baselineInventory.palette || [], baselineInventory)
const curAccent = compare.anchorAccent(current.palette || [], current)
console.log('accent', baseAccent, '->', curAccent, 'dE', compare.deltaE(baseAccent, curAccent).toFixed(1))

console.log('\n== render ==')
const port = await findFreePort(4380)
const child = spawn(process.execPath, [path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: projectRoot,
  stdio: ['ignore', 'ignore', 'ignore'],
  windowsHide: true,
})
const baseUrl = `http://127.0.0.1:${port}/`
for (let i = 0; i < 40; i += 1) {
  try {
    const res = await fetch(baseUrl, { signal: AbortSignal.timeout(1500) })
    if (res.status < 500) break
  } catch { /* wait */ }
  await sleep(500)
}
let pages
try {
  pages = await capturePages({ projectRoot, outDir, baseUrl, routes: current.routes, label: 'scratch' })
} finally {
  await killTree(child.pid)
}

const base = baselinePages.pages['/']
const cur = pages.pages['/']

function words(entry) {
  return [entry.desktop, entry.mobile]
}

const bWords = compare.splitWords(base.desktop.words || [])
const cWords = compare.splitWords(cur.desktop.words || [])
const wordDiff = compare.multisetDiff(bWords.stable, cWords.stable, 'word')
console.log('words baseline/current:', base.desktop.words.length, cur.desktop.words.length)
console.log('word missing', wordDiff.missing.length)
for (const m of wordDiff.missing) console.log('  MISSING', m.key, m.expected, '->', m.actual)
console.log('word extra', wordDiff.extra.length)
for (const m of wordDiff.extra) console.log('  EXTRA  ', m.key, m.expected, '->', m.actual)

const bAttr = compare.multisetDiff(base.desktop.attrs, cur.desktop.attrs, 'key')
console.log('\nattr missing', bAttr.missing.length)
for (const m of bAttr.missing) console.log('  MISSING', m.key, m.expected, '->', m.actual)
console.log('attr extra', bAttr.extra.length)
for (const m of bAttr.extra) console.log('  EXTRA  ', m.key, m.expected, '->', m.actual)

const bForm = compare.multisetDiff(base.desktop.forms, cur.desktop.forms, 'key')
console.log('\nforms missing', JSON.stringify(bForm.missing), 'extra', JSON.stringify(bForm.extra))
console.log('title', JSON.stringify(base.desktop.meta.title), '->', JSON.stringify(cur.desktop.meta.title))

const fp = compare.jaccard(base.desktop.fingerprint, cur.desktop.fingerprint)
const lm = compare.lcsSimilarity(base.desktop.landmarks.map((l) => `${l.tag}:${l.role}`), cur.desktop.landmarks.map((l) => `${l.tag}:${l.role}`))
const cl = compare.classOverlap(base.desktop.classTokens, cur.desktop.classTokens)
console.log('\nfingerprint', fp.toFixed(3), 'landmark', lm.toFixed(3), 'classOverlap', cl.toFixed(3))
console.log('baseline landmarks', base.desktop.landmarks.map((l) => l.tag).join(','))
console.log('current landmarks ', cur.desktop.landmarks.map((l) => l.tag).join(','))
console.log('shared classes', base.desktop.classTokens.filter((t) => cur.desktop.classTokens.includes(t)).join(',') || '(none)')

for (const [label, entry] of [['desktop', cur.desktop], ['mobile', cur.mobile]]) {
  console.log(`\n${label}: overflow ${entry.overflow.documentOverflow} (${entry.meta.scrollWidth}/${entry.meta.clientWidth}) contrast ${entry.contrast.length}/${entry.contrastChecked} img ${entry.imageIssues.length} field ${entry.fieldIssues.length} interactive ${entry.interactiveIssues.length}`)
  for (const c of entry.contrast.slice(0, 12)) console.log('   contrast', c.ratio, c.required, c.fontSize, c.color, 'on', c.background, '|', c.selector, '|', c.text.slice(0, 40))
  for (const o of entry.overflow.offenders) console.log('   offender', o.selector, o.right, o.width)
  for (const f of entry.fieldIssues) console.log('   field', JSON.stringify(f))
  for (const f of entry.interactiveIssues) console.log('   interactive', JSON.stringify(f))
  for (const f of entry.imageIssues) console.log('   image', JSON.stringify(f))
}
console.log('\nheadings', cur.desktop.headings.map((h) => `${h.tag}:${h.text}`).join(' | '))
console.log('h1', cur.desktop.meta.h1Count)
console.log('console errors', JSON.stringify(cur.consoleErrors), JSON.stringify(cur.pageErrors))
console.log('axe', JSON.stringify(cur.axe.violations))
console.log('mobileNav', JSON.stringify(cur.mobileNav), 'focus', JSON.stringify(cur.focus?.passed))
console.log('baseline mobileNav', JSON.stringify(base.mobileNav))
