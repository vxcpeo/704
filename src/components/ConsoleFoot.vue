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
  <nav class="st-footnav" aria-label="Section navigation">
    <a
      v-for="page in pages"
      :key="page"
      :href="'#' + page.toLowerCase()"
      :class="{ 'is-current': activePage === page }"
      :aria-current="activePage === page ? 'page' : undefined"
      @click.prevent="emit('go', page)"
    >
      <Glyph :name="icons[page]" />
      <span class="st-footnav-word">{{ labels[page] }}</span>
      <i v-if="page === 'Positions' && positionCount">{{ positionCount }}</i>
    </a>
  </nav>
</template>
