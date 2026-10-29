<script setup>
import Glyph from './Glyph.vue'

defineProps({
  message: { type: String, default: '' },
})
</script>

<template>
  <div v-if="message" class="bx-toast" role="status">
    <Glyph name="check" />
    <span>{{ message }}</span>
  </div>
</template>
