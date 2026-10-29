<script setup>
import { computed } from 'vue'
import Glyph from './Glyph.vue'

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
  <section class="bx-readings" aria-labelledby="bx-readings-title">
    <div class="bx-readings-head">
      <div>
        <span class="bx-eyebrow">SHARD FIELD</span>
        <h3 id="bx-readings-title">{{ readings.length }} readings · {{ spread }} pt spread</h3>
      </div>
      <span class="bx-badge"><i aria-hidden="true"></i>ILLUSTRATIVE</span>
    </div>

    <div class="bx-axis" aria-hidden="true">
      <span>4%</span>
      <span class="bx-axis-rule"><i :style="{ left: mean + '%' }"></i></span>
      <span>96%</span>
    </div>

    <ol class="bx-shards">
      <li
        v-for="(value, index) in readings"
        :key="index"
        class="bx-shard"
        :class="{ 'is-lead': index === lead }"
        :style="{ '--value': value + '%' }"
      >
        <span class="bx-shard-id">S{{ index + 1 }}</span>
        <span class="bx-shard-orbit"><i></i></span>
        <span class="bx-shard-value">{{ value }}%</span>
        <span class="bx-shard-note">{{ value >= level ? 'above field' : 'below field' }}</span>
      </li>
    </ol>

    <div class="bx-readings-foot">
      <div><small>Field level</small><b>{{ level }}%</b></div>
      <div><small>Dispersion</small><b>{{ spread }} pt</b></div>
      <div><small>Lead reading</small><b>S{{ lead + 1 }}</b></div>
      <p><Glyph name="info" /> Derived from the selected event's sample probability and depth.</p>
    </div>
  </section>
</template>
