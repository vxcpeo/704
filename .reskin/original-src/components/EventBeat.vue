<script setup>
import FlowIcon from './FlowIcon.vue'
import ShardField from './FieldBeat.vue'
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
  <div class="brd-event">
    <section class="brd-event-body" aria-labelledby="brd-event-title">
      <div class="brd-event-head">
        <span class="brd-kicker">SELECTED EVENT</span>
        <button class="brd-iconbtn" aria-label="Open the full event list" title="Full event list" @click="emit('open-markets')">
          <FlowIcon name="expand" />
        </button>
      </div>

      <h2 id="brd-event-title">{{ eventHeadline(market) }}</h2>

      <p class="brd-event-meta">
        <i class="brd-tag" :class="'brd-tag--' + market.color">{{ categoryLabel(market.profile) }}</i>
        <span>{{ market.reference }}</span>
        <span>{{ market.name }}</span>
      </p>

      <div class="brd-split">
        <div class="brd-split-head">
          <label for="allocation-range">Outcome split</label>
          <strong>{{ allocationLabel }}</strong>
        </div>
        <input
          id="allocation-range"
          class="brd-range"
          :value="allocation"
          aria-label="Outcome split"
          type="range"
          min="10"
          max="90"
          step="5"
          @input="emit('update:allocation', Number($event.target.value))"
        >
        <div class="brd-legend">
          <span><i class="brd-dot brd-dot--yes"></i>{{ yesLabel }} <b>{{ allocation }}%</b></span>
          <span><i class="brd-dot brd-dot--no"></i>{{ noLabel }} <b>{{ 100 - allocation }}%</b></span>
        </div>
        <div class="brd-split-bar" :style="{ '--split': allocation + '%' }"><i></i></div>
      </div>

      <div class="brd-facts">
        <span><small>Illustrative probability</small><b>{{ market.probability }}%</b></span>
        <span><small>Market depth</small><b>${{ market.depth }}M</b></span>
        <span><small>24h volume</small><b>${{ market.volume }}M</b></span>
        <span><small>Data state</small><b>Illustrative</b></span>
      </div>

      <button class="brd-btn brd-btn--solid" @click="emit('model')">Model a position <FlowIcon name="arrow" /></button>
      <p class="brd-note"><FlowIcon name="shield" /> Preview only. No order is placed and no funds move.</p>
    </section>

    <div class="brd-event-visual">
      <ShardField
        :readings="readings"
        :level="level"
        :spread="spread"
        :lead="lead"
      />
    </div>
  </div>
</template>
