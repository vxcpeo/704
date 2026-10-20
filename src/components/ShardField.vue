<script setup>
import { computed } from 'vue'
import FlowIcon from './FlowIcon.vue'

const props = defineProps({
  readings: { type: Array, required: true },
  level: { type: Number, required: true },
  spread: { type: Number, required: true },
  lead: { type: Number, default: 0 },
  dense: { type: Boolean, default: false },
})

const mean = computed(() => Math.round(props.level))
</script>

<template>
  <section class="orb-field" :class="{ 'orb-field--dense': dense }" aria-labelledby="orb-field-title">
    <div class="orb-field-head">
      <div>
        <span class="orb-kicker">SHARD FIELD</span>
        <h3 id="orb-field-title">{{ readings.length }} readings · {{ spread }} pt spread</h3>
      </div>
      <span class="orb-badge"><i></i>ILLUSTRATIVE</span>
    </div>

    <div class="orb-field-axis" aria-hidden="true">
      <span>4%</span>
      <span class="orb-field-axis-line"><i :style="{ left: mean + '%' }"></i></span>
      <span>96%</span>
    </div>

    <ol class="orb-shards">
      <li
        v-for="(value, index) in readings"
        :key="index"
        class="orb-shard"
        :class="{ 'is-lead': index === lead }"
        :style="{ '--value': value + '%' }"
      >
        <span class="orb-shard-index">S{{ index + 1 }}</span>
        <span class="orb-shard-track"><i></i></span>
        <span class="orb-shard-value">{{ value }}%</span>
        <span class="orb-shard-note">{{ value >= level ? 'above field' : 'below field' }}</span>
      </li>
    </ol>

    <div class="orb-field-foot">
      <div><small>Field level</small><b>{{ level }}%</b></div>
      <div><small>Dispersion</small><b>{{ spread }} pt</b></div>
      <div><small>Lead reading</small><b>S{{ lead + 1 }}</b></div>
      <p><FlowIcon name="info" /> Derived from the selected event's sample probability and depth.</p>
    </div>
  </section>
</template>
