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
  <div class="orb-gallery">
    <div class="orb-spec">
      <span class="orb-spec-cell">Ref</span>
      <span class="orb-spec-cell">Event</span>
      <span class="orb-spec-cell">Profile</span>
      <span class="orb-spec-cell">Field level</span>
      <span class="orb-spec-cell">Spread</span>
      <span class="orb-spec-cell">Depth</span>
      <span class="orb-spec-cell">24h volume</span>
      <span class="orb-spec-cell">Model</span>
    </div>

    <ul class="orb-rail" :class="{ 'orb-rail--wall': layout === 'wall' }" aria-label="Illustrative prediction events" tabindex="0">
      <li
        v-for="market in markets"
        :key="market.id"
        class="orb-plate"
        :class="['orb-tone-' + market.color, { 'is-current': selectedId === market.id }]"
      >
        <div
          class="orb-plate-hit"
          role="button"
          tabindex="0"
          :aria-pressed="selectedId === market.id"
          :aria-label="`Read the shard field for ${eventName(market)}`"
          @click="emit('select', market)"
          @keydown.enter.prevent="emit('select', market)"
          @keydown.space.prevent="emit('select', market)"
        >
          <span class="orb-plate-ref">{{ market.reference }}</span>
          <span class="orb-plate-head">
            <strong>{{ eventName(market) }}</strong>
            <small>{{ market.name }} · {{ market.model }} · YES / NO</small>
          </span>
          <span class="orb-plate-chip"><i class="orb-chip orb-chip--profile">{{ categoryLabel(market.profile) }}</i></span>
          <span class="orb-plate-field">
            <b>{{ fields[market.id]?.level ?? market.probability }}%</b>
            <i class="orb-plate-bar"><em :style="{ width: (fields[market.id]?.level ?? market.probability) + '%' }"></em></i>
            <small>Field level</small>
          </span>
          <span class="orb-plate-facts">
            <span>{{ fields[market.id]?.spread ?? '—' }} pt</span>
            <span>${{ market.depth }}M</span>
            <span>${{ market.volume }}M</span>
          </span>
        </div>
        <button class="orb-plate-act" type="button" @click.stop="emit('model', market)">Model <FlowIcon name="arrow" /></button>
      </li>
    </ul>
  </div>
</template>
