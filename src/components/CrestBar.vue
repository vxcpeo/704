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
  <div class="bx-crest-inner">
    <a class="bx-brand" href="#overview" :aria-label="`${BRAND_NAME} home`" @click.prevent="emit('go', 'Overview')">
      <span class="bx-brand-halo" aria-hidden="true"></span>
      <img class="bx-brand-mark" :src="BRAND_MARK_URL" alt="" width="30" height="30">
      <span class="bx-brand-copy">
        <strong class="bx-brand-name">{{ BRAND_NAME }}</strong>
        <small class="bx-brand-cluster">{{ CLUSTER_LABEL }}</small>
      </span>
    </a>

    <div class="bx-ribbon" aria-label="Illustrative desk summary" tabindex="0">
      <span class="bx-ribbon-item bx-ribbon-brand"><b>{{ BRAND_SLUG.toUpperCase() }}</b> / {{ BRAND_DOMAIN }}</span>
      <span class="bx-ribbon-item">EVENTS <b>{{ events }}</b></span>
      <span class="bx-ribbon-item">READINGS <b>{{ readings }}</b></span>
      <span class="bx-ribbon-item">FIELD <b>{{ fieldLevel }}%</b></span>
      <span class="bx-ribbon-item">VOLUME <b>${{ volume }}M</b></span>
      <span class="bx-ribbon-item">DEPTH <b>${{ depth }}M</b></span>
      <span class="bx-ribbon-item">24H MOVERS <b>{{ movers }}</b></span>
      <span class="bx-ribbon-item">SAVED <b>{{ saved }}</b></span>
      <span class="bx-ribbon-item bx-ribbon-tail">{{ TOKEN_SYMBOL }} · {{ TOKEN_MINT ? 'MINT CONFIGURED' : 'NO MINT' }} · {{ CLUSTER_LABEL.toUpperCase() }}</span>
    </div>

    <div class="bx-crest-tools">
      <span class="bx-net"><i aria-hidden="true"></i>{{ CLUSTER_LABEL }}</span>
      <a v-if="SOCIAL_URL" class="bx-social" :href="SOCIAL_URL" target="_blank" rel="noopener noreferrer" aria-label="Follow on X">
        <Glyph name="external" />
      </a>
      <button class="bx-wallet-button" type="button" @click="emit('wallet')">
        <Glyph name="wallet" />
        <span>{{ connected ? shortAccount : 'Connect' }}</span>
      </button>
    </div>
  </div>
</template>
