<script setup>
import Glyph from './Glyph.vue'

defineProps({
  pages: { type: Array, required: true },
  labels: { type: Object, required: true },
  icons: { type: Object, required: true },
  activePage: { type: String, required: true },
  positionCount: { type: Number, default: 0 },
})

const emit = defineEmits(['go'])
</script>

<template>
  <nav class="bx-spokes" aria-label="Primary navigation">
    <a
      v-for="(page, index) in pages"
      :key="page"
      class="bx-spoke"
      :style="{ '--spoke-index': index }"
      :href="'#' + page.toLowerCase()"
      :class="{ 'is-current': activePage === page }"
      :aria-current="activePage === page ? 'page' : undefined"
      @click.prevent="emit('go', page)"
    >
      <span class="bx-spoke-dot" aria-hidden="true"></span>
      <Glyph :name="icons[page]" />
      <span class="bx-spoke-label">{{ labels[page] }}</span>
      <i v-if="page === 'Positions' && positionCount" class="bx-spoke-pip">{{ positionCount }}</i>
    </a>
  </nav>
</template>
