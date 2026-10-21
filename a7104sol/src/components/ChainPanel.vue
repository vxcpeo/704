<script setup>
import Glyph from './Glyph.vue'
import { CLUSTER_LABEL, TOKEN_EXPLORER_URL, TOKEN_MINT } from '../config'

defineProps({
  tokenConfigured: { type: Boolean, default: false },
})

const emit = defineEmits(['go', 'wallet'])

const rows = [
  { capability: 'Compare events and simulate splits', scope: 'Interface', status: 'AVAILABLE', tone: 'ok', note: 'Sample fixtures; no wallet required.' },
  { capability: 'Save a local preview receipt', scope: 'This browser tab', status: 'AVAILABLE', tone: 'ok', note: 'Session storage only; cleared on refresh.' },
  { capability: 'Read an injected Solana wallet', scope: 'Native SOL + outcome shares', status: 'OPTIONAL', tone: 'info', note: 'Read-only; no signature is ever requested.' },
  { capability: 'Place an order', scope: 'Market program', status: 'NOT DEPLOYED', tone: 'off', note: 'No order, fill or settlement path exists.' },
  { capability: 'Issue outcome shares', scope: 'Mint authority', status: 'NOT DEPLOYED', tone: 'off', note: 'Supply remains zero.' },
  { capability: 'Resolve an event', scope: 'Oracle + program', status: 'NOT DEPLOYED', tone: 'off', note: 'No verified data source is configured.' },
]
</script>

<template>
  <div class="st-chain">
    <section class="st-panel">
      <p class="st-panel-label">CHAIN FACTS</p>
      <dl class="st-factlist">
        <div><dt>Cluster</dt><dd>{{ CLUSTER_LABEL }}</dd></div>
        <div><dt>Outcome asset</dt><dd>YES / classic SPL</dd></div>
        <div><dt>Decimals / supply</dt><dd>9 / 0</dd></div>
        <div><dt>Mint authority</dt><dd>Retained</dd></div>
        <div><dt>Freeze authority</dt><dd>Disabled</dd></div>
        <div><dt>Configured mint</dt><dd class="st-mono">{{ TOKEN_MINT || 'Not configured' }}</dd></div>
      </dl>
      <p v-if="tokenConfigured" class="st-explorer">
        <a :href="TOKEN_EXPLORER_URL" target="_blank" rel="noopener noreferrer">Open the mint on Explorer <Glyph name="external" /></a>
      </p>
      <p v-else class="st-explorer">No mint address is configured for this cluster.</p>
    </section>

    <section class="st-panel">
      <p class="st-panel-label">CAPABILITY MATRIX</p>
      <table class="st-matrix">
        <caption class="sr-only">Program availability on the configured cluster</caption>
        <thead>
          <tr><th scope="col">Capability</th><th scope="col">Scope</th><th scope="col">Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.capability">
            <th scope="row">
              <strong>{{ row.capability }}</strong>
              <small>{{ row.note }}</small>
            </th>
            <td>{{ row.scope }}</td>
            <td>
              <span class="st-badge" :class="row.tone === 'ok' ? 'st-badge--ok' : row.tone === 'off' ? 'st-badge--off' : 'st-badge--info'">
                <i aria-hidden="true"></i>{{ row.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="st-matrix-actions">
        <button class="st-btn st-btn--ghost" @click="emit('go', 'Markets')">Open events <Glyph name="arrow" /></button>
        <button class="st-btn st-btn--ghost" @click="emit('wallet')">Manage wallet <Glyph name="wallet" /></button>
      </div>
    </section>
  </div>
</template>
