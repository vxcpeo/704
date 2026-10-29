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
  <div class="bx-events">
    <div class="bx-event-legend" aria-hidden="true">
      <span>Ref</span>
      <span>Event</span>
      <span>Profile</span>
      <span>Field level</span>
      <span>Spread</span>
      <span>Depth</span>
      <span>24h volume</span>
      <span>Model</span>
    </div>

    <ul class="bx-event-list" :class="{ 'bx-event-list--wall': layout === 'wall' }" aria-label="Illustrative prediction events" tabindex="0">
      <li
        v-for="market in markets"
        :key="market.id"
        class="bx-event"
        :class="{ 'is-current': selectedId === market.id }"
      >
        <span class="bx-event-ref">{{ market.reference }}</span>
        <div
          class="bx-event-hit"
          role="button"
          tabindex="0"
          :aria-pressed="selectedId === market.id"
          :aria-label="`Read the shard field for ${eventName(market)}`"
          @click="emit('select', market)"
          @keydown.enter.prevent="emit('select', market)"
          @keydown.space.prevent="emit('select', market)"
        >
          <span class="bx-event-title">
            <strong>{{ eventName(market) }}</strong>
            <small>{{ market.name }} · {{ market.model }} · YES / NO</small>
          </span>
          <span class="bx-event-profile"><i class="bx-chip" :class="'bx-chip--' + market.color">{{ categoryLabel(market.profile) }}</i></span>
          <span class="bx-event-level">
            <i
              class="bx-dial"
              aria-hidden="true"
              :style="{ '--level': (fields[market.id]?.level ?? market.probability) + '%' }"
            ><em></em></i>
            <b>{{ fields[market.id]?.level ?? market.probability }}%</b>
            <small class="bx-event-levelnote">Field level</small>
          </span>
          <span class="bx-event-facts">
            <span>{{ fields[market.id]?.spread ?? '—' }} pt</span>
            <span>${{ market.depth }}M</span>
            <span>${{ market.volume }}M</span>
          </span>
        </div>
        <button class="bx-event-action" type="button" @click.stop="emit('model', market)">Model <Glyph name="arrow" /></button>
      </li>
    </ul>
  </div>
</template>
