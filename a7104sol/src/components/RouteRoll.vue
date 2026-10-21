<script setup>
import FlowIcon from './FlowIcon.vue'

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
  <nav class="brd-rollnav" aria-label="Section navigation">
    <a
      v-for="page in pages"
      :key="page"
      :href="'#' + page.toLowerCase()"
      :class="{ 'is-live': activePage === page }"
      :aria-current="activePage === page ? 'page' : undefined"
      @click.prevent="emit('go', page)"
    >
      <FlowIcon :name="icons[page]" />
      <span class="brd-roll-word">{{ labels[page] }}</span>
      <i v-if="page === 'Positions' && positionCount">{{ positionCount }}</i>
    </a>
  </nav>
</template>
