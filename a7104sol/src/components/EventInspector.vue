<script setup>
import Glyph from './Glyph.vue'
import ShardMeter from './ShardMeter.vue'
import { categoryLabel, eventHeadline } from '../data/fixtures'

defineProps({
  market: { type: Object, required: true },
  readings: { type: Array, required: true },
  level: { type: Number, required: true },
  spread: { type: Number, required: true },
  lead: { type: Number, default: 0 },
  allocation: { type: Number, required: true },
  allocationLabel: { type: String, required: true },
  yesLabel: { type: String, required: true },
  noLabel: { type: String, required: true },
})

const emit = defineEmits(['update:allocation', 'model', 'open-markets'])
</script>

<template>
  <div class="bx-lens-grid">
    <section class="bx-lens-main" aria-labelledby="bx-lens-title">
      <div class="bx-lens-head">
        <span class="bx-eyebrow">SELECTED EVENT</span>
        <button class="bx-icon-button" aria-label="Open the full event list" title="Full event list" @click="emit('open-markets')">
          <Glyph name="expand" />
        </button>
      </div>

      <h2 id="bx-lens-title" class="bx-lens-title">{{ eventHeadline(market) }}</h2>

      <p class="bx-lens-meta">
        <i class="bx-chip" :class="'bx-chip--' + market.color">{{ categoryLabel(market.profile) }}</i>
        <span>{{ market.reference }}</span>
        <span>{{ market.name }}</span>
      </p>

      <div class="bx-split">
        <div class="bx-split-head">
          <label for="allocation-range">Outcome split</label>
          <strong>{{ allocationLabel }}</strong>
        </div>
        <input
          id="allocation-range"
          class="bx-range"
          :value="allocation"
          aria-label="Outcome split"
          type="range"
          min="10"
          max="90"
          step="5"
          @input="emit('update:allocation', Number($event.target.value))"
        >
        <div class="bx-legend">
          <span><i class="bx-dot bx-dot--yes"></i>{{ yesLabel }} <b>{{ allocation }}%</b></span>
          <span><i class="bx-dot bx-dot--no"></i>{{ noLabel }} <b>{{ 100 - allocation }}%</b></span>
        </div>
        <div class="bx-split-track" :style="{ '--split': allocation + '%' }"><i></i></div>
      </div>

      <div class="bx-facts">
        <span><small>Illustrative probability</small><b>{{ market.probability }}%</b></span>
        <span><small>Market depth</small><b>${{ market.depth }}M</b></span>
        <span><small>24h volume</small><b>${{ market.volume }}M</b></span>
        <span><small>Data state</small><b>Illustrative</b></span>
      </div>

      <button class="bx-button bx-button--solid bx-button--wide" @click="emit('model')">Model a position <Glyph name="arrow" /></button>
      <p class="bx-lens-note"><Glyph name="shield" /> Preview only. No order is placed and no funds move.</p>
    </section>

    <ShardMeter
      :readings="readings"
      :level="level"
      :spread="spread"
      :lead="lead"
    />
  </div>
</template>
