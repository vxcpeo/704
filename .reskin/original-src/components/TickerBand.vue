<script setup>
import { BRAND_DOMAIN, BRAND_SLUG, CLUSTER_LABEL, TOKEN_MINT, TOKEN_SYMBOL } from '../config'

defineProps({
  events: { type: Number, default: 0 },
  readings: { type: Number, default: 0 },
  fieldLevel: { type: Number, default: 0 },
  saved: { type: Number, default: 0 },
  volume: { type: Number, default: 0 },
  depth: { type: Number, default: 0 },
  movers: { type: Number, default: 0 },
})
</script>

<template>
  <div class="brd-ribbon" aria-label="Illustrative desk summary" tabindex="0">
    <span class="brd-ribbon-item brd-ribbon-tag"><b>{{ BRAND_SLUG.toUpperCase() }}</b> / {{ BRAND_DOMAIN }}</span>
    <span class="brd-ribbon-item">EVENTS <b>{{ events }}</b></span>
    <span class="brd-ribbon-item">READINGS <b>{{ readings }}</b></span>
    <span class="brd-ribbon-item">FIELD <b>{{ fieldLevel }}%</b></span>
    <span class="brd-ribbon-item">VOLUME <b>${{ volume }}M</b></span>
    <span class="brd-ribbon-item">DEPTH <b>${{ depth }}M</b></span>
    <span class="brd-ribbon-item">24H MOVERS <b>{{ movers }}</b></span>
    <span class="brd-ribbon-item">SAVED <b>{{ saved }}</b></span>
    <span class="brd-ribbon-item brd-ribbon-end">{{ TOKEN_SYMBOL }} · {{ TOKEN_MINT ? 'MINT CONFIGURED' : 'NO MINT' }} · {{ CLUSTER_LABEL.toUpperCase() }}</span>
  </div>
</template>
