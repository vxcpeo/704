<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import ChainPanel from './components/ChainPanel.vue'
import EventGrid from './components/EventGrid.vue'
import EventInspector from './components/EventInspector.vue'
import ShardMeter from './components/ShardMeter.vue'
import Glyph from './components/Glyph.vue'
import CrestBar from './components/CrestBar.vue'
import ReceiptList from './components/ReceiptList.vue'
import CommandNav from './components/CommandNav.vue'
import ConsoleFoot from './components/ConsoleFoot.vue'
import SignalToast from './components/SignalToast.vue'
import {
  BRAND_DOMAIN,
  BRAND_NAME,
  BRAND_SLUG,
  BRAND_TAGLINE,
  CLUSTER_LABEL,
  TOKEN_MINT,
} from './config'
import {
  boardStats,
  categoryLabel,
  chartSeries,
  defaultAllocation,
  deepestMarkets,
  eventHeadline,
  eventName,
  fieldLevel,
  fieldSpread,
  filterOptions,
  leadShard,
  markets,
  matchesProfile,
  openProbability,
  profileBreakdown,
  shardField,
  SHARD_COUNT,
  topMovers,
  trendSeries,
} from './data/fixtures'
import { useWallet } from './composables/useWallet'

const {
  connected,
  account,
  shortAccount,
  balance,
  tokenBalance,
  walletCluster,
  correctNetwork,
  isConnecting,
  isRefreshing,
  walletError,
  tokenError,
  tokenNotice,
  tokenConfigured,
  connectWallet,
  disconnect,
  refreshBalances,
} = useWallet()

const pages = ['Overview', 'Markets', 'Positions', 'Governance']
const labels = { Overview: 'Ledger', Markets: 'Events', Positions: 'Receipts', Governance: 'Chain' }
const icons = { Overview: 'ledger', Markets: 'grid', Positions: 'ticket', Governance: 'globe' }
const YES_LABEL = 'YES'
const NO_LABEL = 'NO'
const HERO_HEADLINE = 'One line, struck from six readings.'

const activePage = ref('Overview')
const search = ref('')
const filter = ref('All markets')
const sort = ref('featured')

const filteredMarkets = computed(() => {
  const query = search.value.trim().toLowerCase()
  const rows = markets.filter((market) => (
    matchesProfile(market, filter.value)
    && `${market.name} ${market.profile} ${categoryLabel(market.profile)} ${eventName(market)} ${market.reference}`
      .toLowerCase()
      .includes(query)
  ))
  if (sort.value === 'probability') rows.sort((a, b) => b.probability - a.probability)
  if (sort.value === 'depth') rows.sort((a, b) => b.depth - a.depth)
  if (sort.value === 'volume') rows.sort((a, b) => b.volume - a.volume)
  if (sort.value === 'move') rows.sort((a, b) => Math.abs(b.change24h ?? 0) - Math.abs(a.change24h ?? 0))
  if (sort.value === 'closing') rows.sort((a, b) => new Date(a.closesAt ?? 0) - new Date(b.closesAt ?? 0))
  return rows
})

/** Board-wide digest: the strip, the hero stats and the digest band read this. */
const board = computed(() => boardStats(markets))
const profiles = computed(() => profileBreakdown(markets))
const movers = computed(() => topMovers(markets, 5))
const deepest = computed(() => deepestMarkets(markets, 5))

const showFilters = computed(() => activePage.value === 'Overview' || activePage.value === 'Markets')
const showDetail = computed(() => activePage.value === 'Overview' || activePage.value === 'Markets')

const fieldsByMarket = computed(() => Object.fromEntries(markets.map((market) => {
  const readings = shardField(market)
  return [market.id, {
    readings,
    level: fieldLevel(readings),
    spread: fieldSpread(readings),
    lead: leadShard(readings),
  }]
})))

const selectedMarketId = ref(markets[0].id)
const selectedMarket = computed(() => markets.find((market) => market.id === selectedMarketId.value) || markets[0])
const selectedField = computed(() => fieldsByMarket.value[selectedMarket.value.id])
const heroSeries = computed(() => chartSeries(selectedMarket.value.probability))
const heroTrace = computed(() => trendSeries(selectedMarket.value))

const allocation = ref(50)
const allocationLabel = computed(() => `${allocation.value}% ${displayToken(selectedMarket.value.token)} / ${100 - allocation.value}% ${NO_LABEL}`)

const positions = ref([])
// Kept from the previous build so a browser tab that already holds saved
// previews keeps them across this reskin.
const storageKey = 'solana.preview-positions.v1'

const modal = ref('')
const previewStep = ref(1)
const previewAmount = ref('')
const reviewedAmount = ref('')
const amountError = ref('')
const acknowledged = ref(false)
const dialog = ref(null)
const previewInput = ref(null)
const toast = ref('')
let previousFocus = null
let toastTimer

const walletStatus = computed(() => {
  if (!connected.value) return 'Local previews work without a wallet.'
  if (correctNetwork.value === false) return `Wallet reports Solana ${walletCluster.value}; reads are paused.`
  return `Wallet reports Solana ${walletCluster.value}; balances are read-only.`
})

function notify(value) {
  clearTimeout(toastTimer)
  toast.value = value
  toastTimer = setTimeout(() => { toast.value = '' }, 4200)
}

function readRoute() {
  const hash = window.location.hash.slice(1).toLowerCase()
  activePage.value = hash === 'staking'
    ? 'Positions'
    : hash === 'pools' ? 'Markets' : pages.find((page) => page.toLowerCase() === hash) || 'Overview'
  document.title = `${labels[activePage.value]} | ${BRAND_NAME}`
}

function goTo(page) {
  closeModal()
  activePage.value = page
  window.location.hash = page.toLowerCase()
  window.scrollTo({ top: 0, behavior: 'instant' })
  nextTick(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
}

function openModal(type) {
  if (modal.value) return
  previousFocus = document.activeElement
  modal.value = type
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    dialog.value?.showModal()
    if (type === 'market') previewInput.value?.focus()
  })
}

function closeModal() {
  if (dialog.value?.open) dialog.value.close()
  else modal.value = ''
}

function onSheetClose() {
  document.body.style.overflow = ''
  modal.value = ''
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
}

function onBackdrop(event) {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeModal()
}

function selectMarket(market) {
  selectedMarketId.value = market.id
  allocation.value = defaultAllocation(market)
}

function openMarket(market) {
  if (selectedMarketId.value !== market.id) selectMarket(market)
  previewStep.value = 1
  previewAmount.value = ''
  reviewedAmount.value = ''
  amountError.value = ''
  acknowledged.value = false
  openModal('market')
}

function validAmount(value) {
  return typeof value === 'string'
    && /^(?:\d+(?:\.\d{1,6})?|\.\d{1,6})$/.test(value.trim())
    && Number(value) > 0
    && Number(value) <= 1000000
}

function reviewPreview() {
  if (!validAmount(previewAmount.value)) {
    amountError.value = 'Enter an amount above 0 with up to 6 decimal places.'
    previewInput.value?.focus()
    return
  }
  amountError.value = ''
  reviewedAmount.value = String(Number(previewAmount.value))
  previewStep.value = 2
}

function loadPositions() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '[]')
    if (Array.isArray(saved)) {
      positions.value = saved
        .map((position) => position && position.marketId ? position : { ...position, marketId: position?.poolId })
        .filter((position) => position && markets.some((market) => market.id === position.marketId) && validAmount(String(position.amount)))
        .slice(0, 100)
    }
  } catch {
    positions.value = []
  }
}

function persistPositions() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(positions.value))
  } catch {
    notify('Session storage is unavailable; this preview lasts until refresh.')
  }
}

function savePreview() {
  if (!acknowledged.value) return
  positions.value.unshift({
    id: crypto.randomUUID?.() || `preview-${Date.now()}`,
    marketId: selectedMarket.value.id,
    amount: reviewedAmount.value,
    allocation: allocation.value,
    createdAt: Date.now(),
  })
  persistPositions()
  goTo('Positions')
  notify('Preview saved locally. No transaction was sent.')
}

function removePosition(item) {
  positions.value = positions.value.filter((position) => position.id !== item.id)
  persistPositions()
  notify('Preview removed from this session.')
}

function marketFor(item) {
  return markets.find((market) => market.id === (item.marketId || item.poolId)) || markets[0]
}

function displayDate(value) {
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Signed percentage for the illustrative 24h move, with a real minus sign. */
function signedPercent(value) {
  const number = Number(value) || 0
  return `${number > 0 ? '+' : number < 0 ? '−' : ''}${Math.abs(number).toFixed(1)}%`
}

function moveTone(value) {
  const number = Number(value) || 0
  return number > 0 ? 'up' : number < 0 ? 'down' : 'flat'
}

function toneFor(profile) {
  if (profile === 'Stable') return 'mint'
  if (profile === 'Experimental' || profile === 'Long shot') return 'ember'
  return 'indigo'
}

/** The Model action always writes a YES-denominated receipt. */
function displayToken() {
  return YES_LABEL
}

function displayAmount(value) {
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: 6 })
}

function resetFilters() {
  filter.value = 'All markets'
  search.value = ''
  sort.value = 'featured'
}

async function connect() {
  if (await connectWallet()) notify('Solana wallet connected.')
}

async function copyAddress() {
  if (!account.value) return
  try {
    await navigator.clipboard.writeText(account.value)
    notify('Wallet address copied.')
  } catch {
    notify('Copy failed. Select the address and copy it manually.')
  }
}

onMounted(() => {
  readRoute()
  loadPositions()
  window.addEventListener('hashchange', readRoute)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', readRoute)
  clearTimeout(toastTimer)
})
</script>

<template>
  <div class="bx-page" :data-brand="BRAND_SLUG">
    <a class="bx-skip" href="#main-content" @click.prevent="document.getElementById('main-content')?.focus()">
      Skip to content
    </a>

    <div class="bx-crest" role="banner">
      <CrestBar
        :events="board.events"
        :readings="SHARD_COUNT"
        :field-level="selectedField.level"
        :saved="positions.length"
        :volume="board.totalVolume"
        :depth="board.totalDepth"
        :movers="board.rising + board.falling"
        :connected="connected"
        :short-account="shortAccount"
        @go="goTo"
        @wallet="openModal('wallet')"
      />
    </div>

    <section class="bx-stage" aria-labelledby="bx-statement">
      <div class="bx-orbit">
        <div class="bx-aura" aria-hidden="true">
          <i class="bx-ring bx-ring--outer"></i>
          <i class="bx-ring bx-ring--mid"></i>
          <i class="bx-ring bx-ring--inner"></i>
          <i class="bx-orb bx-orb--one"></i>
          <i class="bx-orb bx-orb--two"></i>
          <i class="bx-orb bx-orb--three"></i>
        </div>

        <CommandNav
          class="bx-spokes"
          :pages="pages"
          :labels="labels"
          :icons="icons"
          :active-page="activePage"
          :position-count="positions.length"
          @go="goTo"
        />

        <div class="bx-core">
          <span class="bx-core-eyebrow">{{ BRAND_NAME.toUpperCase() }} / {{ CLUSTER_LABEL.toUpperCase() }}</span>
          <span class="bx-core-tag">SHARD TRACE / {{ selectedMarket.reference }}</span>
          <span class="bx-core-session">SESSION TRACE · {{ selectedMarket.tenor.toUpperCase() }}</span>
          <b class="bx-core-figure">{{ selectedField.level }}%</b>
          <div class="bx-bars" aria-hidden="true">
            <i v-for="(height, index) in heroSeries" :key="index" :style="{ '--bar': height + '%', '--i': index }"></i>
          </div>
          <small class="bx-core-caption">field level · {{ selectedField.spread }} pt spread · {{ signedPercent(selectedMarket.change24h) }} 24h</small>
          <span class="bx-core-spark" aria-hidden="true">
            <i v-for="(point, index) in heroTrace" :key="index" :style="{ height: point + '%' }"></i>
          </span>
          <small class="bx-core-note">opens {{ openProbability(selectedMarket) }}% · now {{ selectedMarket.probability }}% · closes {{ displayDate(selectedMarket.closesAt) }}</small>
        </div>
      </div>

      <div class="bx-hero">
        <h1 id="bx-statement" class="bx-statement">{{ HERO_HEADLINE }}</h1>
        <p class="bx-lede">{{ BRAND_TAGLINE }} Compare illustrative Solana prediction-market scenarios, tune a sample YES / NO split, and keep every preview inside this browser tab.</p>
        <div class="bx-actions">
          <button class="bx-button bx-button--solid" @click="goTo('Markets')">Open events <Glyph name="arrow" /></button>
          <button class="bx-button bx-button--quiet" @click="openModal('docs')"><Glyph name="book" /> Read the guide</button>
          <span class="bx-flag"><i></i>ILLUSTRATIVE DATA</span>
        </div>
      </div>

      <dl class="bx-arc">
        <div class="bx-arc-cell"><dt>Tracked events</dt><dd>{{ board.events }}</dd></div>
        <div class="bx-arc-cell"><dt>Readings / event</dt><dd>{{ SHARD_COUNT }}</dd></div>
        <div class="bx-arc-cell"><dt>Highest field</dt><dd>{{ board.highestFieldLevel }}%</dd></div>
        <div class="bx-arc-cell"><dt>Board volume</dt><dd>${{ board.totalVolume }}M</dd></div>
      </dl>
    </section>

    <main id="main-content" class="bx-deck" tabindex="-1">
      <template v-if="showFilters">
        <div class="bx-tools">
          <template v-if="activePage === 'Overview'">
            <div class="bx-pills" role="group" aria-label="Filter events by profile">
              <button
                v-for="option in filterOptions"
                :key="option.value"
                type="button"
                :class="{ 'is-lit': filter === option.value }"
                :aria-pressed="filter === option.value"
                @click="filter = option.value"
              >{{ option.label }}</button>
            </div>
            <label class="bx-search">
              <Glyph name="search" />
              <input v-model="search" type="search" placeholder="Search events" aria-label="Search events">
            </label>
          </template>
          <template v-else>
            <div class="bx-pills" role="group" aria-label="Filter events by profile">
              <button
                v-for="option in filterOptions"
                :key="option.value"
                type="button"
                :class="{ 'is-lit': filter === option.value }"
                :aria-pressed="filter === option.value"
                @click="filter = option.value"
              >{{ option.label }}</button>
            </div>
            <label class="bx-search">
              <Glyph name="search" />
              <input v-model="search" type="search" placeholder="Search events" aria-label="Search events">
            </label>
            <label class="bx-sort">
              <span>Sort</span>
              <select v-model="sort" aria-label="Sort events">
                <option value="featured">Featured</option>
                <option value="probability">Illustrative probability</option>
                <option value="depth">Market depth</option>
                <option value="volume">24h volume</option>
                <option value="move">Biggest move</option>
                <option value="closing">Closing soonest</option>
              </select>
            </label>
          </template>
        </div>
      </template>

      <!-- ------------------------------------------------------------------ overview -->
      <template v-if="activePage === 'Overview'">
        <section class="bx-lens" aria-labelledby="bx-lens-title">
          <EventInspector
            :market="selectedMarket"
            :readings="selectedField.readings"
            :level="selectedField.level"
            :spread="selectedField.spread"
            :lead="selectedField.lead"
            :allocation="allocation"
            :allocation-label="allocationLabel"
            :yes-label="YES_LABEL"
            :no-label="NO_LABEL"
            @update:allocation="allocation = $event"
            @model="openMarket(selectedMarket)"
            @open-markets="goTo('Markets')"
          />
        </section>

        <section class="bx-panel bx-panel--ledger" aria-labelledby="bx-events-title">
          <header class="bx-panel-head">
            <span class="bx-eyebrow">EVENT LEDGER</span>
            <h2 id="bx-events-title" class="bx-panel-title">Sample events</h2>
          </header>

          <EventGrid
            v-if="filteredMarkets.length"
            :markets="filteredMarkets"
            :selected-id="selectedMarket.id"
            :fields="fieldsByMarket"
            @select="selectMarket"
            @model="openMarket"
          />
          <div v-else class="bx-empty">
            <span class="bx-empty-mark"><Glyph name="search" /></span>
            <h2>No matching events</h2>
            <p>Try another profile or clear the search field.</p>
            <button class="bx-button bx-button--quiet" @click="resetFilters">Reset filters</button>
          </div>

          <p class="bx-note"><Glyph name="info" /> Every probability, field level, depth and volume figure on this page is interface sample data for a simulated prediction-market workflow, not live market data. Wallet access is optional and reads only native SOL plus outcome shares from {{ CLUSTER_LABEL }}. The candidate destination {{ BRAND_DOMAIN }} is unregistered.</p>
        </section>

        <section class="bx-panel bx-panel--digest" aria-labelledby="bx-digest-title">
          <header class="bx-panel-head">
            <span class="bx-eyebrow">BOARD DIGEST</span>
            <h2 id="bx-digest-title" class="bx-panel-title">What the sample board holds</h2>
            <span class="bx-flag bx-flag--calm">SNAPSHOT {{ displayDate('2026-10-11T00:00:00.000Z').toUpperCase() }}</span>
          </header>
          <p class="bx-lede">{{ board.events }} illustrative events across {{ profiles.length }} profiles, {{ board.readings }} shard readings and ${{ board.totalOpenInterest }}M of sample open interest.</p>

          <div class="bx-digest">
            <article class="bx-card">
              <p class="bx-card-label">PROFILE COVERAGE</p>
              <ul class="bx-profiles">
                <li v-for="row in profiles" :key="row.profile">
                  <button class="bx-profile" type="button" @click="filter = row.profile; goTo('Markets')">
                    <i class="bx-chip" :class="'bx-chip--' + toneFor(row.profile)">{{ row.label }}</i>
                    <b>{{ row.events }}</b>
                    <span class="bx-meter" aria-hidden="true"><em :class="'bx-fill-' + toneFor(row.profile)" :style="{ width: row.share + '%' }"></em></span>
                    <small>{{ row.share }}% · mean {{ row.meanProbability }}% · ${{ row.volume }}M</small>
                  </button>
                </li>
              </ul>
            </article>

            <article class="bx-card">
              <p class="bx-card-label">BIGGEST SAMPLE MOVES</p>
              <ol class="bx-list">
                <li v-for="market in movers" :key="market.id">
                  <button class="bx-list-row" type="button" @click="selectMarket(market); goTo('Markets')">
                    <span class="bx-list-ref">{{ market.reference }}</span>
                    <span>
                      <strong>{{ eventName(market) }}</strong>
                      <small>{{ market.name }} · {{ categoryLabel(market.profile) }} · {{ market.tenor }}</small>
                    </span>
                    <span class="bx-delta" :class="'bx-delta--' + moveTone(market.change24h)">{{ signedPercent(market.change24h) }}</span>
                  </button>
                </li>
              </ol>
            </article>

            <article class="bx-card">
              <p class="bx-card-label">DEEPEST SAMPLE BOOKS</p>
              <ol class="bx-list">
                <li v-for="market in deepest" :key="market.id">
                  <button class="bx-list-row bx-list-row--depth" type="button" @click="selectMarket(market); goTo('Markets')">
                    <span class="bx-list-body">
                      <strong>{{ eventName(market) }}</strong>
                      <small>{{ market.reference }} · ${{ market.volume }}M 24h · {{ market.traders.toLocaleString('en-US') }} sample traders</small>
                    </span>
                    <span class="bx-delta">${{ market.depth }}M</span>
                    <span class="bx-depth" aria-hidden="true"><i :class="'bx-fill-' + toneFor(market.profile)" :style="{ width: Math.min(100, market.depth * 4) + '%' }"></i></span>
                  </button>
                </li>
              </ol>
            </article>
          </div>

          <p class="bx-note"><Glyph name="info" /> Digest totals are sums of the illustrative fixtures above: {{ board.rising }} events carry a positive sample move and {{ board.falling }} a negative one. No figure is read from a market program, an oracle or an RPC node.</p>
        </section>
      </template>

      <!-- ------------------------------------------------------------------- markets -->
      <template v-else-if="activePage === 'Markets'">
        <section class="bx-panel bx-panel--events" aria-labelledby="bx-markets-title">
          <header class="bx-panel-head">
            <span class="bx-eyebrow">EVENT COMPARISON</span>
            <h2 id="bx-markets-title" class="bx-panel-title">Events</h2>
            <span class="bx-flag">{{ filteredMarkets.length }} of {{ board.events }}</span>
          </header>
          <p class="bx-lede">Sort and filter the sample prediction-market board, then open an event to read its shard field in detail.</p>

          <EventGrid
            v-if="filteredMarkets.length"
            :markets="filteredMarkets"
            :selected-id="selectedMarket.id"
            :fields="fieldsByMarket"
            layout="wall"
            @select="selectMarket"
            @model="openMarket"
          />
          <div v-else class="bx-empty">
            <span class="bx-empty-mark"><Glyph name="search" /></span>
            <h2>No matching events</h2>
            <p>Try another profile or clear the search field.</p>
            <button class="bx-button bx-button--quiet" @click="resetFilters">Reset filters</button>
          </div>

          <p class="bx-note"><Glyph name="info" /> All figures on this screen are illustrative interface fixtures. No market program, oracle or settlement path is deployed.</p>
        </section>
      </template>

      <!-- ----------------------------------------------------------------- positions -->
      <template v-else-if="activePage === 'Positions'">
        <section class="bx-panel bx-panel--receipts" aria-labelledby="bx-receipts-title">
          <header class="bx-panel-head">
            <span class="bx-eyebrow">RECEIPT STACK</span>
            <h2 id="bx-receipts-title" class="bx-panel-title">Saved previews</h2>
            <button class="bx-button bx-button--solid" @click="goTo('Markets')"><Glyph name="plus" /> New model</button>
          </header>
          <p class="bx-lede">Each row is a local model. Nothing was submitted, matched or settled.</p>

          <ReceiptList
            :positions="positions"
            :market-for="marketFor"
            :amount-for="displayAmount"
            :date-for="displayDate"
            :yes-label="displayToken(selectedMarket.token)"
            @remove="removePosition"
            @browse="goTo('Markets')"
          />

          <p class="bx-note"><Glyph name="shield" /> Simulation only: no orders, no settlement and no accrued returns. Receipts live in this browser tab.</p>
        </section>
      </template>

      <!-- ------------------------------------------------------------------- chain -->
      <template v-else>
        <section class="bx-panel bx-panel--chain" aria-labelledby="bx-chain-title">
          <header class="bx-panel-head">
            <span class="bx-eyebrow">CHAIN SURFACE</span>
            <h2 id="bx-chain-title" class="bx-panel-title">Chain</h2>
            <span class="bx-flag bx-flag--calm">{{ tokenConfigured ? 'MINT CONFIGURED' : 'NO MINT' }} · {{ TOKEN_MINT ? 'PROGRAMS PENDING' : 'NOTHING DEPLOYED' }}</span>
          </header>
          <p class="bx-lede">What this workspace can and cannot do on the configured cluster.</p>

          <article class="bx-chain-headline">
            <span class="bx-eyebrow">POSITION IN ONE LINE</span>
            <h3>{{ tokenConfigured ? 'The outcome mint exists. The market does not.' : 'Nothing is deployed yet.' }}</h3>
            <p>{{ tokenConfigured ? `A classic SPL outcome mint is configured on ${CLUSTER_LABEL} with 9 decimals and zero supply. No market, oracle, faucet or settlement program is deployed, so every event and position here stays illustrative.` : 'No outcome mint, market program or oracle is configured for this workspace.' }}</p>
            <span class="bx-flag" :class="tokenConfigured ? 'bx-flag--ok' : 'bx-flag--off'"><i></i>{{ tokenConfigured ? 'MINT READABLE' : 'AWAITING DEPLOYMENT' }}</span>
          </article>

          <ChainPanel :token-configured="tokenConfigured" @go="goTo" @wallet="openModal('wallet')" />
        </section>
      </template>
    </main>

    <footer class="bx-rim">
      <div class="bx-colophon">
        <span><strong>{{ BRAND_NAME }}</strong> / {{ BRAND_TAGLINE }}</span>
        <span>{{ CLUSTER_LABEL }} · read-only workspace · {{ BRAND_DOMAIN }} is an unregistered candidate destination</span>
      </div>
      <ConsoleFoot
        :pages="pages"
        :labels="labels"
        :icons="icons"
        :active-page="activePage"
        :position-count="positions.length"
        @go="goTo"
      />
    </footer>

    <dialog
      ref="dialog"
      class="bx-sheet"
      :aria-labelledby="modal === 'market' ? (previewStep === 1 ? 'preview-title' : 'review-title') : modal === 'wallet' ? 'wallet-title' : 'guide-title'"
      @close="onSheetClose"
      @click="onBackdrop"
    >
      <div v-if="modal === 'market'" class="bx-sheet-body">
        <button class="bx-icon-button bx-sheet-close" aria-label="Close preview" title="Close preview" @click="closeModal"><Glyph name="close" /></button>
        <div class="bx-sheet-kicker"><span class="bx-flag">LOCAL PREVIEW</span><span>STEP {{ previewStep }} / 2</span></div>
        <template v-if="previewStep === 1">
          <h2 id="preview-title">Model a position in {{ eventHeadline(selectedMarket) }}</h2>
          <p class="bx-sheet-lead">No wallet signature and no asset movement is possible here.</p>
          <label class="bx-field-label" for="preview-amount">Practice amount</label>
          <div class="bx-amount">
            <input id="preview-amount" ref="previewInput" v-model="previewAmount" inputmode="decimal" placeholder="0.00" @keydown.enter.prevent="reviewPreview">
            <span>{{ displayToken(selectedMarket.token) }}</span>
          </div>
          <p v-if="amountError" class="bx-form-error" role="alert">{{ amountError }}</p>
          <div class="bx-quick">
            <button v-for="amount in ['25', '100', '250']" :key="amount" type="button" @click="previewAmount = amount">{{ amount }} {{ displayToken(selectedMarket.token) }}</button>
          </div>
          <dl class="bx-summary">
            <div><dt>Event</dt><dd>{{ eventHeadline(selectedMarket) }}</dd></div>
            <div><dt>YES / NO mix</dt><dd>{{ allocationLabel }}</dd></div>
            <div><dt>Field level</dt><dd class="bx-positive">{{ selectedField.level }}%</dd></div>
          </dl>
          <button class="bx-button bx-button--solid bx-button--wide" @click="reviewPreview">Review position <Glyph name="arrow" /></button>
        </template>
        <template v-else>
          <h2 id="review-title">Review before saving</h2>
          <p class="bx-sheet-lead">The receipt is written to this browser tab only.</p>
          <div class="bx-review"><small>Practice amount</small><strong>{{ displayAmount(reviewedAmount) }} {{ displayToken(selectedMarket.token) }}</strong></div>
          <dl class="bx-summary">
            <div><dt>Event</dt><dd>{{ eventHeadline(selectedMarket) }}</dd></div>
            <div><dt>YES / NO split</dt><dd>{{ allocationLabel }}</dd></div>
            <div><dt>State</dt><dd>Simulation</dd></div>
          </dl>
          <label class="bx-check">
            <input v-model="acknowledged" type="checkbox">
            <span>I understand this model places no order and settles no contract.</span>
          </label>
          <button class="bx-button bx-button--solid bx-button--wide" :disabled="!acknowledged" @click="savePreview">Save local receipt <Glyph name="check" /></button>
          <button class="bx-back" @click="previewStep = 1">Back to amount</button>
        </template>
      </div>

      <div v-else-if="modal === 'wallet'" class="bx-sheet-body">
        <button class="bx-icon-button bx-sheet-close" aria-label="Close wallet panel" title="Close wallet panel" @click="closeModal"><Glyph name="close" /></button>
        <div class="bx-sheet-kicker"><span class="bx-flag">WALLET READER</span><span>{{ CLUSTER_LABEL }}</span></div>
        <h2 id="wallet-title">{{ connected ? 'Wallet connected' : 'Connect to read balances' }}</h2>
        <p class="bx-sheet-lead">{{ BRAND_NAME }} reads balances from an injected Solana wallet and never requests a signature in this workspace.</p>
        <div class="bx-wallet-row">
          <Glyph name="wallet" />
          <div><strong>{{ connected ? shortAccount : 'No wallet connected' }}</strong><small>{{ walletStatus }}</small></div>
          <i :class="{ on: connected }"></i>
        </div>
        <button v-if="connected" class="bx-wallet-address" :aria-label="'Copy wallet address ' + account" @click="copyAddress">{{ account }}</button>
        <dl v-if="connected" class="bx-balance">
          <div><dt>SOL balance</dt><dd>{{ isRefreshing ? 'Refreshing…' : balance ?? '—' }}</dd></div>
          <div><dt>Outcome shares</dt><dd>{{ tokenBalance ?? '—' }}</dd></div>
        </dl>
        <p v-if="walletError" class="bx-form-error" role="alert">{{ walletError }}</p>
        <p v-if="tokenError || tokenNotice" class="bx-sheet-note" role="status">{{ tokenError || tokenNotice }}</p>
        <div class="bx-sheet-actions">
          <button v-if="!connected" class="bx-button bx-button--solid bx-button--wide" :disabled="isConnecting" @click="connect">{{ isConnecting ? 'Connecting…' : 'Connect wallet' }} <Glyph name="wallet" /></button>
          <template v-else>
            <button class="bx-button bx-button--quiet" :disabled="isRefreshing" @click="refreshBalances"><Glyph name="refresh" /> {{ isRefreshing ? 'Refreshing…' : 'Refresh' }}</button>
            <button class="bx-button bx-button--quiet" @click="disconnect">Disconnect</button>
          </template>
        </div>
        <div v-if="tokenConfigured" class="bx-mint">
          <strong>Configured outcome mint</strong>
          <small>{{ TOKEN_MINT }}</small>
          <a :href="`https://explorer.solana.com/address/${TOKEN_MINT}?cluster=testnet`" target="_blank" rel="noopener noreferrer">Open Explorer <Glyph name="external" /></a>
        </div>
      </div>

      <div v-else class="bx-sheet-body">
        <button class="bx-icon-button bx-sheet-close" aria-label="Close guide" title="Close guide" @click="closeModal"><Glyph name="close" /></button>
        <div class="bx-sheet-kicker"><span class="bx-flag">QUICK GUIDE</span><span>01 / 03</span></div>
        <h2 id="guide-title">Reading the shard field</h2>
        <p class="bx-sheet-lead">{{ BRAND_NAME }} is a {{ CLUSTER_LABEL }} prediction-market desk for comparing sample event scenarios and keeping local receipts.</p>
        <ol class="bx-guide">
          <li><b>01</b><p><strong>Pick an event.</strong> Field levels and shard readings are illustrative fixtures derived from the selected row.</p></li>
          <li><b>02</b><p><strong>Set the split.</strong> Enter a practice amount and review the YES / NO outcome split.</p></li>
          <li><b>03</b><p><strong>Save locally.</strong> No order, settlement or consensus program is available here.</p></li>
        </ol>
        <button class="bx-button bx-button--solid bx-button--wide" @click="closeModal">Close guide <Glyph name="check" /></button>
      </div>
    </dialog>

    <SignalToast :message="toast" />
  </div>
</template>
