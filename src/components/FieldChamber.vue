<script setup>
import FlowIcon from './FlowIcon.vue'
import ShardField from './ShardField.vue'
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
  <section class="orb-chamber" aria-labelledby="orb-chamber-title">
    <div class="orb-chamber-visual">
      <ShardField
        :readings="readings"
        :level="level"
        :spread="spread"
        :lead="lead"
      />
    </div>

    <div class="orb-chamber-body">
      <div class="orb-chamber-top">
        <span class="orb-kicker">SELECTED EVENT</span>
        <button class="orb-iconbtn" aria-label="Open the full event list" title="Full event list" @click="emit('open-markets')">
          <FlowIcon name="expand" />
        </button>
      </div>

      <h2 id="orb-chamber-title">{{ eventHeadline(market) }}</h2>

      <p class="orb-chamber-meta">
        <i class="orb-chip orb-chip--profile">{{ categoryLabel(market.profile) }}</i>
        <span>{{ market.reference }}</span>
        <span>{{ market.name }}</span>
      </p>

      <div class="orb-split">
        <div class="orb-split-head">
          <label for="allocation-range">Outcome split</label>
          <strong>{{ allocationLabel }}</strong>
        </div>
        <input
          id="allocation-range"
          :value="allocation"
          aria-label="Outcome split"
          type="range"
          min="10"
          max="90"
          step="5"
          @input="emit('update:allocation', Number($event.target.value))"
        >
        <div class="orb-split-legend">
          <span><i class="orb-dot orb-dot--yes"></i>{{ yesLabel }} <b>{{ allocation }}%</b></span>
          <span><i class="orb-dot orb-dot--no"></i>{{ noLabel }} <b>{{ 100 - allocation }}%</b></span>
        </div>
        <div class="orb-split-bar" :style="{ '--split': allocation + '%' }"><i></i></div>
      </div>

      <div class="orb-facts">
        <span><small>Illustrative probability</small><b>{{ market.probability }}%</b></span>
        <span><small>Market depth</small><b>${{ market.depth }}M</b></span>
        <span><small>24h volume</small><b>${{ market.volume }}M</b></span>
        <span><small>Data state</small><b>Illustrative</b></span>
      </div>

      <button class="orb-btn orb-btn-solid" @click="emit('model')">Model a position <FlowIcon name="arrow" /></button>
      <p class="orb-note"><FlowIcon name="shield" /> Preview only. No order is placed and no funds move.</p>
    </div>
  </section>
</template>
