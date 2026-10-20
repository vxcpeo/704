// Illustrative event fixtures and the derived shard field.
//
// Every figure here is interface sample data. Nothing is read from a market
// program, an oracle or an RPC node, and no prediction-market program is
// deployed. The shard field is a deterministic derivation of the selected
// event so the board always matches the row it belongs to.
import { TOKEN_SYMBOL } from '../config'

/** Readings rendered per event by ForgeStage. The brand line promises six. */
export const SHARD_COUNT = 6

/**
 * The sample board. This is the whole dataset the interface renders: a frozen
 * snapshot of illustrative scenarios, dense enough that the table, the rail,
 * the hero trace and the digest band all resolve to a real row.
 */
export const markets = [
  {
    id: 'weekly-sol',
    name: `${TOKEN_SYMBOL} / SOL`,
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Solana closes above the weekly target',
    probability: 68.4,
    depth: 2.84,
    volume: 184.2,
    change24h: 1.8,
    traders: 1240,
    openInterest: 6.4,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'indigo',
    symbols: [TOKEN_SYMBOL.slice(0, 1), 'S'],
    model: 'Balanced outcome market',
    reference: 'SHD-01',
  },
  {
    id: 'sol-usdc',
    name: 'SOL / USDC',
    token: 'SOL',
    profile: 'Stable',
    event: 'Dollar stability holds through the session',
    probability: 59.8,
    depth: 14.2,
    volume: 902.6,
    change24h: -0.6,
    traders: 3410,
    openInterest: 38.1,
    tenor: 'Daily',
    closesAt: '2026-10-12T00:00:00.000Z',
    color: 'mint',
    symbols: ['S', '$'],
    model: 'Stable outcome market',
    reference: 'SHD-02',
  },
  {
    id: 'index-usdc',
    name: `${TOKEN_SYMBOL} / USDC`,
    token: TOKEN_SYMBOL,
    profile: 'Experimental',
    event: 'Outcome index settles higher this week',
    probability: 71.6,
    depth: 0.92,
    volume: 74.8,
    change24h: 4.2,
    traders: 415,
    openInterest: 1.7,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'ember',
    symbols: [TOKEN_SYMBOL.slice(0, 1), '$'],
    model: 'Variable outcome market',
    reference: 'SHD-03',
  },
  {
    id: 'sol-200',
    name: 'SOL / USDC',
    token: 'SOL',
    profile: 'Core',
    event: 'Solana trades above $200 at the weekly close',
    probability: 54.2,
    depth: 9.6,
    volume: 612.4,
    change24h: 2.4,
    traders: 2870,
    openInterest: 24.8,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'indigo',
    symbols: ['S', '$'],
    model: 'Balanced outcome market',
    reference: 'SHD-04',
  },
  {
    id: 'tps-5k',
    name: 'NETWORK / TPS',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Network sustains 5,000 TPS for a full day',
    probability: 44.9,
    depth: 1.32,
    volume: 96.4,
    change24h: 0.9,
    traders: 690,
    openInterest: 2.9,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['N', 'T'],
    model: 'Balanced outcome market',
    reference: 'SHD-05',
  },
  {
    id: 'validator-2k',
    name: 'NETWORK / VALIDATORS',
    token: TOKEN_SYMBOL,
    profile: 'Experimental',
    event: 'Active validator count passes 2,000',
    probability: 22.7,
    depth: 0.44,
    volume: 28.6,
    change24h: -1.4,
    traders: 240,
    openInterest: 0.8,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['N', 'V'],
    model: 'Long-horizon outcome market',
    reference: 'SHD-06',
  },
  {
    id: 'fee-1m',
    name: 'NETWORK / FEES',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Daily network fees stay under 1,000 SOL',
    probability: 63.1,
    depth: 3.18,
    volume: 158.9,
    change24h: 1.1,
    traders: 980,
    openInterest: 4.6,
    tenor: 'Daily',
    closesAt: '2026-10-12T00:00:00.000Z',
    color: 'indigo',
    symbols: ['N', 'F'],
    model: 'Balanced outcome market',
    reference: 'SHD-07',
  },
  {
    id: 'sol-drawdown',
    name: 'SOL / USDC',
    token: 'SOL',
    profile: 'Stable',
    event: 'SOL drawdown stays inside 8% this week',
    probability: 76.3,
    depth: 6.42,
    volume: 388.2,
    change24h: -0.3,
    traders: 1620,
    openInterest: 12.3,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'mint',
    symbols: ['S', '$'],
    model: 'Stable outcome market',
    reference: 'SHD-08',
  },
  {
    id: 'raised-150',
    name: `${TOKEN_SYMBOL} / USDC`,
    token: TOKEN_SYMBOL,
    profile: 'Long shot',
    event: 'SOL trades above $250 before the end of the quarter',
    probability: 26.4,
    depth: 0.61,
    volume: 41.7,
    change24h: 6.8,
    traders: 355,
    openInterest: 1.9,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: [TOKEN_SYMBOL.slice(0, 1), '$'],
    model: 'Long-horizon outcome market',
    reference: 'SHD-09',
  },
  {
    id: 'vol-under-40',
    name: 'SOL / VOL',
    token: 'SOL',
    profile: 'Stable',
    event: 'Realised volatility closes under 40% this month',
    probability: 57.7,
    depth: 4.05,
    volume: 212.6,
    change24h: 0.4,
    traders: 1120,
    openInterest: 7.8,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'mint',
    symbols: ['S', 'V'],
    model: 'Stable outcome market',
    reference: 'SHD-10',
  },
  {
    id: 'etf-decision',
    name: 'SOL / ETF',
    token: 'SOL',
    profile: 'Experimental',
    event: 'A spot SOL ETF is approved this quarter',
    probability: 31.5,
    depth: 1.88,
    volume: 268.4,
    change24h: 3.6,
    traders: 2140,
    openInterest: 9.4,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['E', 'T'],
    model: 'Variable outcome market',
    reference: 'SHD-11',
  },
  {
    id: 'tvl-20b',
    name: 'DEFI / TVL',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Solana DeFi TVL holds above $20B',
    probability: 52.9,
    depth: 7.14,
    volume: 296.8,
    change24h: -0.8,
    traders: 1780,
    openInterest: 11.6,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['D', 'T'],
    model: 'Balanced outcome market',
    reference: 'SHD-12',
  },
  {
    id: 'stable-peg',
    name: 'USDC / USD',
    token: 'USDC',
    profile: 'Stable',
    event: 'USDC holds its peg inside 10 basis points',
    probability: 93.2,
    depth: 21.6,
    volume: 1408.5,
    change24h: 0.1,
    traders: 5240,
    openInterest: 62.4,
    tenor: 'Daily',
    closesAt: '2026-10-12T00:00:00.000Z',
    color: 'mint',
    symbols: ['U', '$'],
    model: 'Stable outcome market',
    reference: 'SHD-13',
  },
  {
    id: 'stake-yield',
    name: 'SOL / STAKING',
    token: 'SOL',
    profile: 'Stable',
    event: 'Staking yield stays above 6% annualised',
    probability: 81.4,
    depth: 11.3,
    volume: 524.1,
    change24h: -0.2,
    traders: 2480,
    openInterest: 18.9,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'mint',
    symbols: ['S', 'Y'],
    model: 'Stable outcome market',
    reference: 'SHD-14',
  },
  {
    id: 'liquid-stake',
    name: 'SOL / LST',
    token: 'SOL',
    profile: 'Core',
    event: 'Liquid staking share passes 12% of supply',
    probability: 47.6,
    depth: 2.42,
    volume: 168.3,
    change24h: 1.6,
    traders: 1040,
    openInterest: 5.2,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['S', 'L'],
    model: 'Balanced outcome market',
    reference: 'SHD-15',
  },
  {
    id: 'dex-share',
    name: 'DEX / SHARE',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Solana DEX volume leads all chains this week',
    probability: 61.8,
    depth: 5.36,
    volume: 402.7,
    change24h: 2.9,
    traders: 1960,
    openInterest: 8.7,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'indigo',
    symbols: ['D', 'S'],
    model: 'Balanced outcome market',
    reference: 'SHD-16',
  },
  {
    id: 'uptime-100',
    name: 'NETWORK / UPTIME',
    token: TOKEN_SYMBOL,
    profile: 'Stable',
    event: 'Cluster uptime holds at 100% for the month',
    probability: 88.7,
    depth: 8.91,
    volume: 344.9,
    change24h: 0.0,
    traders: 1520,
    openInterest: 10.4,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'mint',
    symbols: ['N', 'U'],
    model: 'Stable outcome market',
    reference: 'SHD-17',
  },
  {
    id: 'blob-fees',
    name: 'NETWORK / BLOBS',
    token: TOKEN_SYMBOL,
    profile: 'Experimental',
    event: 'Compressed-NFT mints pass one million in a day',
    probability: 18.3,
    depth: 0.28,
    volume: 19.4,
    change24h: 5.4,
    traders: 165,
    openInterest: 0.5,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['N', 'B'],
    model: 'Long-horizon outcome market',
    reference: 'SHD-18',
  },
  {
    id: 'mcap-top3',
    name: 'SOL / RANK',
    token: 'SOL',
    profile: 'Experimental',
    event: 'SOL market cap holds a top-three rank',
    probability: 39.2,
    depth: 1.14,
    volume: 88.6,
    change24h: -2.1,
    traders: 720,
    openInterest: 2.6,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['S', 'R'],
    model: 'Variable outcome market',
    reference: 'SHD-19',
  },
  {
    id: 'gas-under',
    name: 'NETWORK / FEE',
    token: TOKEN_SYMBOL,
    profile: 'Stable',
    event: 'Median transaction fee stays under $0.01',
    probability: 90.4,
    depth: 16.2,
    volume: 742.3,
    change24h: 0.2,
    traders: 3180,
    openInterest: 27.5,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'mint',
    symbols: ['N', 'F'],
    model: 'Stable outcome market',
    reference: 'SHD-20',
  },
  {
    id: 'spread-tight',
    name: 'SOL / USDC',
    token: 'SOL',
    profile: 'Stable',
    event: 'Top-of-book spread holds under 5 basis points',
    probability: 74.8,
    depth: 12.7,
    volume: 618.9,
    change24h: -0.5,
    traders: 2240,
    openInterest: 16.8,
    tenor: 'Daily',
    closesAt: '2026-10-12T00:00:00.000Z',
    color: 'mint',
    symbols: ['S', '$'],
    model: 'Stable outcome market',
    reference: 'SHD-21',
  },
  {
    id: 'new-high',
    name: 'SOL / USDC',
    token: 'SOL',
    profile: 'Long shot',
    event: 'SOL prints a new all-time high this year',
    probability: 14.6,
    depth: 0.38,
    volume: 52.1,
    change24h: 7.2,
    traders: 480,
    openInterest: 1.4,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['S', '$'],
    model: 'Long-horizon outcome market',
    reference: 'SHD-22',
  },
  {
    id: 'fee-market',
    name: 'NETWORK / PRIORITY',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Priority fees stay below 50% of total fees',
    probability: 66.2,
    depth: 4.28,
    volume: 246.7,
    change24h: 1.3,
    traders: 1340,
    openInterest: 6.1,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['N', 'P'],
    model: 'Balanced outcome market',
    reference: 'SHD-23',
  },
  {
    id: 'yield-curve',
    name: 'RATES / CURVE',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'The policy rate is cut at the next meeting',
    probability: 58.4,
    depth: 6.88,
    volume: 466.2,
    change24h: -1.1,
    traders: 2360,
    openInterest: 14.2,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['R', 'C'],
    model: 'Balanced outcome market',
    reference: 'SHD-24',
  },
  {
    id: 'cpi-print',
    name: 'MACRO / CPI',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Headline CPI prints under 3% year on year',
    probability: 49.7,
    depth: 8.36,
    volume: 588.4,
    change24h: 0.7,
    traders: 3120,
    openInterest: 19.6,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['M', 'C'],
    model: 'Balanced outcome market',
    reference: 'SHD-25',
  },
  {
    id: 'equity-green',
    name: 'INDEX / CLOSE',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'The index closes the week in the green',
    probability: 55.3,
    depth: 10.4,
    volume: 712.8,
    change24h: 0.9,
    traders: 3680,
    openInterest: 23.4,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'indigo',
    symbols: ['I', 'C'],
    model: 'Balanced outcome market',
    reference: 'SHD-26',
  },
  {
    id: 'payroll-beat',
    name: 'MACRO / JOBS',
    token: TOKEN_SYMBOL,
    profile: 'Core',
    event: 'Non-farm payrolls beat the consensus print',
    probability: 42.6,
    depth: 3.72,
    volume: 318.5,
    change24h: -1.7,
    traders: 1940,
    openInterest: 8.2,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'indigo',
    symbols: ['M', 'J'],
    model: 'Balanced outcome market',
    reference: 'SHD-27',
  },
  {
    id: 'oil-cap',
    name: 'ENERGY / CRUDE',
    token: TOKEN_SYMBOL,
    profile: 'Experimental',
    event: 'Crude holds above $85 a barrel for the month',
    probability: 29.8,
    depth: 1.06,
    volume: 104.2,
    change24h: 4.8,
    traders: 610,
    openInterest: 2.3,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['E', 'C'],
    model: 'Variable outcome market',
    reference: 'SHD-28',
  },
  {
    id: 'treasury-4',
    name: 'RATES / 10Y',
    token: TOKEN_SYMBOL,
    profile: 'Stable',
    event: 'The 10-year yield stays below 4.5%',
    probability: 72.9,
    depth: 9.15,
    volume: 534.6,
    change24h: -0.4,
    traders: 2620,
    openInterest: 15.7,
    tenor: 'Monthly',
    closesAt: '2026-11-01T00:00:00.000Z',
    color: 'mint',
    symbols: ['R', '1'],
    model: 'Stable outcome market',
    reference: 'SHD-29',
  },
  {
    id: 'dollar-range',
    name: 'DXY / BAND',
    token: TOKEN_SYMBOL,
    profile: 'Stable',
    event: 'The dollar index holds inside its 2% band',
    probability: 69.5,
    depth: 7.62,
    volume: 428.1,
    change24h: 0.3,
    traders: 2080,
    openInterest: 12.9,
    tenor: 'Weekly',
    closesAt: '2026-10-17T00:00:00.000Z',
    color: 'mint',
    symbols: ['D', 'B'],
    model: 'Stable outcome market',
    reference: 'SHD-30',
  },
  {
    id: 'halving-meme',
    name: 'MEME / INDEX',
    token: TOKEN_SYMBOL,
    profile: 'Long shot',
    event: 'A Solana meme index doubles inside the quarter',
    probability: 12.4,
    depth: 0.22,
    volume: 24.8,
    change24h: 9.1,
    traders: 290,
    openInterest: 0.6,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['M', 'I'],
    model: 'Long-horizon outcome market',
    reference: 'SHD-31',
  },
  {
    id: 'quantum-shard',
    name: 'RESEARCH / SHARD',
    token: TOKEN_SYMBOL,
    profile: 'Long shot',
    event: 'A research shard posts a verifiable result this year',
    probability: 8.9,
    depth: 0.16,
    volume: 12.4,
    change24h: -3.2,
    traders: 140,
    openInterest: 0.3,
    tenor: 'Quarterly',
    closesAt: '2027-01-01T00:00:00.000Z',
    color: 'ember',
    symbols: ['R', 'S'],
    model: 'Long-horizon outcome market',
    reference: 'SHD-32',
  },
]

export const filterOptions = [
  { value: 'All markets', label: 'All events' },
  { value: 'Core', label: 'Macro' },
  { value: 'Stable', label: 'Stable' },
  { value: 'Experimental', label: 'Long shot' },
]

/**
 * Profiles that share a visible filter label. "Long shot" is the display name
 * for the Experimental profile, so either value selects the same rows.
 */
const PROFILE_ALIASES = {
  Experimental: ['Experimental', 'Long shot'],
  'Long shot': ['Experimental', 'Long shot'],
}

/** True when a row belongs to the selected profile filter. */
export function matchesProfile(market, selected) {
  if (!selected || selected === 'All markets') return true
  return (PROFILE_ALIASES[selected] || [selected]).includes(market?.profile)
}

export function eventName(market) {
  return market?.event || 'Market event'
}

/** Full event line including the outcome pair, for sheet headings. */
export function eventHeadline(market) {
  return `${eventName(market)} · YES / NO`
}

export function categoryLabel(category) {
  return ({
    Core: 'Macro',
    Stable: 'Stable',
    Experimental: 'Long shot',
  })[category] || category
}

/**
 * Six deterministic readings derived from the selected event's illustrative
 * probability, depth and 24h move. The offset is scaled by the room available
 * around the reading, so a long shot fans out by a few points instead of
 * pinning against the 4% floor, and the field always shows a lead reading, a
 * lagging reading and a non-zero spread.
 */
export function shardField(market) {
  const probability = market?.probability ?? 0
  const depth = market?.depth ?? 0
  const move = market?.change24h ?? 0
  // The fan is scaled by the room on the tighter side of the reading, so a 9%
  // long shot and a 92% stable both show a readable spread instead of a wall
  // or a single point.
  const headroom = Math.min(probability - 4, 96 - probability)
  const unit = Math.min(3.4, Math.max(1.05, Math.sqrt(Math.max(1, headroom)) * 0.34))
  const tilt = Math.max(-3, Math.min(3, move * 0.5))
  return Array.from({ length: SHARD_COUNT }, (_, index) => {
    const spread = unit * (index - (SHARD_COUNT - 1) / 2) + depth * 0.11 + tilt
    // The offset is spent out of the remaining headroom, so a reading is never
    // pushed through the clamp. The floor keeps an extreme event from collapsing
    // into a flat wall of identical readings.
    const available = Math.max(0, spread >= 0 ? 96 - probability : probability - 4) / 100
    const value = probability + spread * Math.min(1, Math.max(0.34, available))
    return Math.round(Math.min(96, Math.max(4, value)) * 10) / 10
  })
}

export function fieldLevel(readings) {
  return Math.round(readings.reduce((total, value) => total + value, 0) / readings.length * 10) / 10
}

export function fieldSpread(readings) {
  return Math.round((Math.max(...readings) - Math.min(...readings)) * 10) / 10
}

export function leadShard(readings) {
  return readings.indexOf(Math.max(...readings))
}

export function defaultAllocation(market) {
  if (!market) return 50
  const probability = Number(market.probability)
  if (!Number.isFinite(probability)) return 50
  return Math.min(90, Math.max(10, Math.round(probability / 5) * 5))
}

function hashSeed(seed) {
  const text = String(seed ?? '')
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Deterministic bar heights for the hero trace of any event or snapshot. */
export function chartSeries(seed, count = 26) {
  const base = Number.isFinite(Number(seed)) ? Number(seed) : hashSeed(seed) % 100
  return Array.from({ length: count }, (_, index) => (
    18 + ((index * 19 + Math.round(base) * 4) % 72)
  ))
}

/**
 * The illustrative opening probability for an event. Derived from its
 * reference so the session trace always starts away from the current reading.
 */
export function openProbability(market) {
  const current = Number(market?.probability) || 0
  const drift = ((hashSeed(market?.reference || market?.id || '') % 13) - 6) * 0.7
  const drift2 = ((hashSeed(`${market?.reference || market?.id || ''}::open`) % 7) - 3) * 0.45
  const raw = current + drift + drift2
  const clamped = Math.min(95, Math.max(5, raw))
  return Math.round(Math.abs(clamped - current) < 0.4 ? current - 1.2 : clamped) * 10 / 10
}

/**
 * Session-style trace for one event: a deterministic walk seeded by the event
 * reference, drifting from its opening probability toward the current one.
 */
export function trendSeries(market, count = 24) {
  const target = Number(market?.probability) || 0
  const open = openProbability(market)
  const seed = hashSeed(`${market?.reference || market?.id || 'shardra'}::trace`)
  const swing = 1.6 + ((seed % 7) / 10)
  const raw = Array.from({ length: count }, (_, index) => {
    const progress = index / (count - 1)
    const wobble = Math.sin((seed % 31) + index * 0.62) * swing * (1 - progress * 0.45)
    return open + (target - open) * progress + wobble
  })
  const smoothed = raw.map((value, index) => (
    index === 0 ? value : (raw[index - 1] + value * 2) / 3
  ))
  return smoothed.map((value) => Math.round(Math.min(97, Math.max(3, value)) * 10) / 10)
}

/** Board-level digest used by the strip, the hero stats and the digest band. */
export function boardStats(rows = markets) {
  const list = Array.isArray(rows) && rows.length ? rows : markets
  const levels = list.map((market) => fieldLevel(shardField(market)))
  const sum = (pick) => list.reduce((total, market) => total + (Number(pick(market)) || 0), 0)
  const mean = (pick) => Math.round(sum(pick) / list.length * 10) / 10
  return {
    events: list.length,
    readings: list.length * SHARD_COUNT,
    shards: SHARD_COUNT,
    meanProbability: mean((market) => market.probability),
    meanFieldLevel: Math.round(levels.reduce((total, value) => total + value, 0) / levels.length * 10) / 10,
    highestFieldLevel: Math.max(...levels),
    highestField: list[levels.indexOf(Math.max(...levels))],
    lowestFieldLevel: Math.min(...levels),
    totalDepth: Math.round(sum((market) => market.depth) * 100) / 100,
    totalVolume: Math.round(sum((market) => market.volume) * 10) / 10,
    totalOpenInterest: Math.round(sum((market) => market.openInterest) * 10) / 10,
    totalTraders: sum((market) => market.traders),
    rising: list.filter((market) => (market.change24h ?? 0) > 0).length,
    falling: list.filter((market) => (market.change24h ?? 0) < 0).length,
  }
}

/**
 * Per-profile totals for the digest band and any filter summary. Rows are
 * grouped by visible label, so the Experimental and Long shot profiles that
 * share the "Long shot" chip report as one line rather than two.
 */
export function profileBreakdown(rows = markets) {
  const list = Array.isArray(rows) ? rows : markets
  const labels = [...new Set(list.map((market) => categoryLabel(market.profile)))]
  return labels.map((label) => {
    const subset = list.filter((market) => categoryLabel(market.profile) === label)
    return {
      profile: subset[0].profile,
      label,
      events: subset.length,
      share: Math.round(subset.length / (list.length || 1) * 1000) / 10,
      volume: Math.round(subset.reduce((total, market) => total + market.volume, 0) * 10) / 10,
      meanProbability: Math.round(subset.reduce((total, market) => total + market.probability, 0) / subset.length * 10) / 10,
    }
  })
}

/** The biggest illustrative moves on the board, largest absolute change first. */
export function topMovers(rows = markets, count = 5) {
  const list = Array.isArray(rows) ? rows : markets
  return [...list]
    .sort((a, b) => Math.abs(b.change24h ?? 0) - Math.abs(a.change24h ?? 0))
    .slice(0, count)
}

/** The deepest sample events, used as a "most traded" style roll-up. */
export function deepestMarkets(rows = markets, count = 5) {
  const list = Array.isArray(rows) ? rows : markets
  return [...list].sort((a, b) => b.depth - a.depth).slice(0, count)
}
