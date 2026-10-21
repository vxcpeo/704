<script setup>
import Glyph from './Glyph.vue'
import { BRAND_DOMAIN, BRAND_MARK_URL, BRAND_NAME, BRAND_SLUG, CLUSTER_LABEL, SOCIAL_URL, TOKEN_MINT, TOKEN_SYMBOL } from '../config'

defineProps({
  events: { type: Number, default: 0 },
  readings: { type: Number, default: 0 },
  fieldLevel: { type: Number, default: 0 },
  saved: { type: Number, default: 0 },
  volume: { type: Number, default: 0 },
  depth: { type: Number, default: 0 },
  movers: { type: Number, default: 0 },
  connected: { type: Boolean, default: false },
  shortAccount: { type: String, default: '' },
})

const emit = defineEmits(['go', 'wallet'])
</script>

<template>
  <header class="st-bar">
    <a class="st-brand" href="#overview" :aria-label="`${BRAND_NAME} home`" @click.prevent="emit('go', 'Overview')">
      <img class="st-brand-mark" :src="BRAND_MARK_URL" alt="" width="22" height="22">
      <span class="st-brand-type">
        <strong class="st-brand-name">{{ BRAND_NAME }}</strong>
        <small class="st-brand-cluster">{{ CLUSTER_LABEL }}</small>
      </span>
    </a>

    <div class="st-telemetry" aria-label="Illustrative desk summary" tabindex="0">
      <span class="st-telemetry-item st-telemetry-brand"><b>{{ BRAND_SLUG.toUpperCase() }}</b> / {{ BRAND_DOMAIN }}</span>
      <span class="st-telemetry-item">EVENTS <b>{{ events }}</b></span>
      <span class="st-telemetry-item">READINGS <b>{{ readings }}</b></span>
      <span class="st-telemetry-item">FIELD <b>{{ fieldLevel }}%</b></span>
      <span class="st-telemetry-item">VOLUME <b>${{ volume }}M</b></span>
      <span class="st-telemetry-item">DEPTH <b>${{ depth }}M</b></span>
      <span class="st-telemetry-item">24H MOVERS <b>{{ movers }}</b></span>
      <span class="st-telemetry-item">SAVED <b>{{ saved }}</b></span>
      <span class="st-telemetry-item st-telemetry-tail">{{ TOKEN_SYMBOL }} · {{ TOKEN_MINT ? 'MINT CONFIGURED' : 'NO MINT' }} · {{ CLUSTER_LABEL.toUpperCase() }}</span>
    </div>

    <div class="st-tools">
      <span class="st-net"><i aria-hidden="true"></i>{{ CLUSTER_LABEL }}</span>
      <a v-if="SOCIAL_URL" class="st-x" :href="SOCIAL_URL" target="_blank" rel="noopener noreferrer" aria-label="Follow on X">
        <Glyph name="external" />
      </a>
      <button class="st-wallet" type="button" @click="emit('wallet')">
        <Glyph name="wallet" />
        <span>{{ connected ? shortAccount : 'Connect' }}</span>
      </button>
    </div>
  </header>
</template>
