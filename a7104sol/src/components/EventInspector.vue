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
  <div class="st-inspect">
    <section class="st-selected" aria-labelledby="st-selected-title">
      <div class="st-selected-head">
        <span class="st-label">SELECTED EVENT</span>
        <button class="st-iconbtn" aria-label="Open the full event list" title="Full event list" @click="emit('open-markets')">
          <Glyph name="expand" />
        </button>
      </div>

      <h2 id="st-selected-title">{{ eventHeadline(market) }}</h2>

      <p class="st-selected-meta">
        <i class="st-chip" :class="'st-chip--' + market.color">{{ categoryLabel(market.profile) }}</i>
        <span>{{ market.reference }}</span>
        <span>{{ market.name }}</span>
      </p>

      <div class="st-split">
        <div class="st-split-head">
          <label for="allocation-range">Outcome split</label>
          <strong>{{ allocationLabel }}</strong>
        </div>
        <input
          id="allocation-range"
          class="st-range"
          :value="allocation"
          aria-label="Outcome split"
          type="range"
          min="10"
          max="90"
          step="5"
          @input="emit('update:allocation', Number($event.target.value))"
        >
        <div class="st-legend">
          <span><i class="st-dot st-dot--yes"></i>{{ yesLabel }} <b>{{ allocation }}%</b></span>
          <span><i class="st-dot st-dot--no"></i>{{ noLabel }} <b>{{ 100 - allocation }}%</b></span>
        </div>
        <div class="st-split-bar" :style="{ '--split': allocation + '%' }"><i></i></div>
      </div>

      <div class="st-facts">
        <span><small>Illustrative probability</small><b>{{ market.probability }}%</b></span>
        <span><small>Market depth</small><b>${{ market.depth }}M</b></span>
        <span><small>24h volume</small><b>${{ market.volume }}M</b></span>
        <span><small>Data state</small><b>Illustrative</b></span>
      </div>

      <button class="st-btn st-btn--solid st-btn--block" @click="emit('model')">Model a position <Glyph name="arrow" /></button>
      <p class="st-note"><Glyph name="shield" /> Preview only. No order is placed and no funds move.</p>
    </section>

    <ShardMeter
      :readings="readings"
      :level="level"
      :spread="spread"
      :lead="lead"
    />
  </div>
</template>
