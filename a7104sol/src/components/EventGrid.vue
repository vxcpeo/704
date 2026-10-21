<script setup>
import Glyph from './Glyph.vue'
import { categoryLabel, eventName } from '../data/fixtures'

defineProps({
  markets: { type: Array, required: true },
  selectedId: { type: String, default: '' },
  fields: { type: Object, default: () => ({}) },
  layout: { type: String, default: 'rail' },
})

const emit = defineEmits(['select', 'model'])
</script>

<template>
  <div class="st-ledger">
    <div class="st-ledger-spec" aria-hidden="true">
      <span>Ref</span>
      <span>Event</span>
      <span>Profile</span>
      <span>Field level</span>
      <span>Spread</span>
      <span>Depth</span>
      <span>24h volume</span>
      <span>Model</span>
    </div>

    <ul class="st-ledger-rows" :class="{ 'st-ledger-rows--wall': layout === 'wall' }" aria-label="Illustrative prediction events" tabindex="0">
      <li
        v-for="market in markets"
        :key="market.id"
        class="st-ledger-row"
        :class="{ 'is-current': selectedId === market.id }"
      >
        <span class="st-ledger-ref">{{ market.reference }}</span>
        <div
          class="st-ledger-hit"
          role="button"
          tabindex="0"
          :aria-pressed="selectedId === market.id"
          :aria-label="`Read the shard field for ${eventName(market)}`"
          @click="emit('select', market)"
          @keydown.enter.prevent="emit('select', market)"
          @keydown.space.prevent="emit('select', market)"
        >
          <span class="st-ledger-title">
            <strong>{{ eventName(market) }}</strong>
            <small>{{ market.name }} · {{ market.model }} · YES / NO</small>
          </span>
          <span class="st-ledger-profile"><i class="st-chip" :class="'st-chip--' + market.color">{{ categoryLabel(market.profile) }}</i></span>
          <span class="st-ledger-level">
            <b>{{ fields[market.id]?.level ?? market.probability }}%</b>
            <i class="st-meter"><em :style="{ width: (fields[market.id]?.level ?? market.probability) + '%' }"></em></i>
            <small class="st-ledger-levelnote">Field level</small>
          </span>
          <span class="st-ledger-facts">
            <span>{{ fields[market.id]?.spread ?? '—' }} pt</span>
            <span>${{ market.depth }}M</span>
            <span>${{ market.volume }}M</span>
          </span>
        </div>
        <button class="st-ledger-act" type="button" @click.stop="emit('model', market)">Model <Glyph name="arrow" /></button>
      </li>
    </ul>
  </div>
</template>
