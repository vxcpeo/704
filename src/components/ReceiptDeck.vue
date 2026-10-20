<script setup>
import FlowIcon from './FlowIcon.vue'
import { categoryLabel, eventName } from '../data/fixtures'

defineProps({
  positions: { type: Array, required: true },
  marketFor: { type: Function, required: true },
  amountFor: { type: Function, required: true },
  dateFor: { type: Function, required: true },
  yesLabel: { type: String, required: true },
})

const emit = defineEmits(['remove', 'browse'])
</script>

<template>
  <div v-if="!positions.length" class="orb-empty">
    <span class="orb-empty-mark"><FlowIcon name="ticket" /></span>
    <h2>No saved models</h2>
    <p>Choose an event, set an amount and save it for this session only.</p>
    <button class="orb-btn orb-btn-solid" @click="emit('browse')">Open events <FlowIcon name="arrow" /></button>
  </div>

  <ol v-else class="orb-deck">
    <li v-for="(position, index) in positions" :key="position.id" class="orb-receipt">
      <div class="orb-receipt-head">
        <span class="orb-receipt-index">R{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="orb-receipt-title">
          <strong>{{ eventName(marketFor(position)) }}</strong>
          <small>{{ categoryLabel(marketFor(position).profile) }} · {{ dateFor(position.createdAt) }}</small>
        </div>
        <span class="orb-receipt-state"><i></i>PREVIEW</span>
      </div>
      <dl class="orb-receipt-facts">
        <div><dt>Practice amount</dt><dd>{{ amountFor(position.amount) }} <small>{{ yesLabel }}</small></dd></div>
        <div><dt>YES / NO split</dt><dd>{{ position.allocation || 50 }} / {{ 100 - (position.allocation || 50) }}</dd></div>
        <div><dt>Reference</dt><dd>{{ marketFor(position).reference }}</dd></div>
        <div><dt>Settlement</dt><dd>None</dd></div>
      </dl>
      <div class="orb-receipt-foot">
        <span>Stored in this browser tab only.</span>
        <button class="orb-iconbtn" :aria-label="'Remove ' + eventName(marketFor(position)) + ' preview'" title="Remove preview" @click="emit('remove', position)">
          <FlowIcon name="trash" />
        </button>
      </div>
    </li>
  </ol>
</template>
