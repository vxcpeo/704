<script setup>
import FlowIcon from './FlowIcon.vue'
import { BRAND_MARK_URL, BRAND_NAME, CLUSTER_LABEL, SOCIAL_URL } from '../config'

defineProps({
  pages: { type: Array, required: true },
  labels: { type: Object, required: true },
  icons: { type: Object, required: true },
  activePage: { type: String, required: true },
  connected: { type: Boolean, default: false },
  shortAccount: { type: String, default: '' },
  positionCount: { type: Number, default: 0 },
})

const emit = defineEmits(['go', 'wallet'])
</script>

<template>
  <a class="orb-signature" href="#overview" :aria-label="`${BRAND_NAME} home`" @click.prevent="emit('go', 'Overview')">
    <img :src="BRAND_MARK_URL" alt="" width="38" height="38">
    <span class="orb-signature-word">
      <strong>{{ BRAND_NAME }}</strong>
      <small>{{ CLUSTER_LABEL }}</small>
    </span>
  </a>

  <nav class="orb-dock" aria-label="Primary navigation">
    <div class="orb-dock-routes">
      <a
        v-for="page in pages"
        :key="page"
        :href="'#' + page.toLowerCase()"
        :class="{ 'is-current': activePage === page }"
        :aria-current="activePage === page ? 'page' : undefined"
        @click.prevent="emit('go', page)"
      >
        <FlowIcon :name="icons[page]" />
        <span>{{ labels[page] }}</span>
        <i v-if="page === 'Positions' && positionCount">{{ positionCount }}</i>
      </a>
    </div>

    <span class="orb-dock-seam" aria-hidden="true"></span>

    <div class="orb-dock-tools">
      <span class="orb-dock-cluster"><i></i>{{ CLUSTER_LABEL }}</span>
      <a v-if="SOCIAL_URL" class="orb-dock-social" :href="SOCIAL_URL" target="_blank" rel="noopener noreferrer" aria-label="Follow on X">
        <FlowIcon name="external" />
      </a>
      <button class="orb-dock-wallet" type="button" @click="emit('wallet')">
        <FlowIcon name="wallet" />
        <span>{{ connected ? shortAccount : 'Connect' }}</span>
      </button>
    </div>
  </nav>
</template>
