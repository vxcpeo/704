<script setup>
import FlowIcon from './FlowIcon.vue'

defineProps({
  message: { type: String, default: '' },
})
</script>

<template>
  <div v-if="message" class="brd-toast" role="status">
    <FlowIcon name="check" />
    <span>{{ message }}</span>
  </div>
</template>
