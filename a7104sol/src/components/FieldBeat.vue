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
  <section class="brd-field" aria-labelledby="brd-field-title">
    <div class="brd-field-head">
      <div>
        <span class="brd-kicker">SHARD FIELD</span>
        <h3 id="brd-field-title">{{ readings.length }} readings · {{ spread }} pt spread</h3>
      </div>
      <span class="brd-stamp brd-stamp--quiet"><i></i>ILLUSTRATIVE</span>
    </div>

    <div class="brd-axis" aria-hidden="true">
      <span>4%</span>
      <span class="brd-axis-line"><i :style="{ left: mean + '%' }"></i></span>
      <span>96%</span>
    </div>

    <ol class="brd-readings">
      <li
        v-for="(value, index) in readings"
        :key="index"
        class="brd-reading"
        :class="{ 'is-lead': index === lead }"
        :style="{ '--value': value + '%' }"
      >
        <span class="brd-reading-index">S{{ index + 1 }}</span>
        <span class="brd-reading-track"><i></i></span>
        <span class="brd-reading-value">{{ value }}%</span>
        <span class="brd-reading-note">{{ value >= level ? 'above field' : 'below field' }}</span>
      </li>
    </ol>

    <div class="brd-field-foot">
      <div><small>Field level</small><b>{{ level }}%</b></div>
      <div><small>Dispersion</small><b>{{ spread }} pt</b></div>
      <div><small>Lead reading</small><b>S{{ lead + 1 }}</b></div>
      <p><FlowIcon name="info" /> Derived from the selected event's sample probability and depth.</p>
    </div>
  </section>
</template>
