<script setup>
import FlowIcon from './FlowIcon.vue'
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
  <div class="brd-ledger">
    <p class="brd-spec" aria-hidden="true">
      <span>Ref</span>
      <span>Event</span>
      <span>Profile</span>
      <span>Field level</span>
      <span>Spread</span>
      <span>Depth</span>
      <span>24h volume</span>
      <span>Model</span>
    </p>

    <ul class="brd-rows" :class="{ 'brd-rows--wall': layout === 'wall' }" aria-label="Illustrative prediction events" tabindex="0">
      <li
        v-for="market in markets"
        :key="market.id"
        class="brd-row"
        :class="{ 'is-live': selectedId === market.id }"
      >
        <span class="brd-row-ref">{{ market.reference }}</span>
        <div
          class="brd-row-hit"
          role="button"
          tabindex="0"
          :aria-pressed="selectedId === market.id"
          :aria-label="`Read the shard field for ${eventName(market)}`"
          @click="emit('select', market)"
          @keydown.enter.prevent="emit('select', market)"
          @keydown.space.prevent="emit('select', market)"
        >
          <span class="brd-row-head">
            <strong>{{ eventName(market) }}</strong>
            <small>{{ market.name }} · {{ market.model }} · YES / NO</small>
          </span>
          <span class="brd-row-profile"><i class="brd-tag" :class="'brd-tag--' + market.color">{{ categoryLabel(market.profile) }}</i></span>
          <span class="brd-row-level">
            <b>{{ fields[market.id]?.level ?? market.probability }}%</b>
            <i class="brd-meter"><em :style="{ width: (fields[market.id]?.level ?? market.probability) + '%' }"></em></i>
            <small class="brd-row-level-note">Field level</small>
          </span>
          <span class="brd-row-facts">
            <span>{{ fields[market.id]?.spread ?? '—' }} pt</span>
            <span>${{ market.depth }}M</span>
            <span>${{ market.volume }}M</span>
          </span>
        </div>
        <button class="brd-row-act" type="button" @click.stop="emit('model', market)">Model <FlowIcon name="arrow" /></button>
      </li>
    </ul>
  </div>
</template>
