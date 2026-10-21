<script setup>
import Glyph from './Glyph.vue'

defineProps({
  message: { type: String, default: '' },
})
</script>

<template>
  <div v-if="message" class="st-toast" role="status">
    <Glyph name="check" />
    <span>{{ message }}</span>
  </div>
</template>
