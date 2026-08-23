<script setup lang="ts">
import { computed } from 'vue'

import type { ListItem } from '@/types/listItem'

const props = withDefaults(
  defineProps<{
    items: ListItem[]
    title?: string
    columns?: 1 | 2 | 3
  }>(),
  {
    title: '',
    columns: 2,
  },
)

const listStyle = computed(() => ({
  '--list-columns': props.columns,
}))
</script>

<template>
  <section
    class="general-list"
    :aria-label="title || 'Liste'"
  >
    <h3
      v-if="title"
      class="general-list__title small-heading font-press-start"
    >
      {{ title }}
    </h3>

    <ul
      class="general-list__items"
      :style="listStyle"
    >
      <li
        v-for="item in items"
        :key="item.name"
        class="general-list__item"
      >
        <v-icon
          v-if="item.icon"
          :icon="item.icon"
          class="general-list__icon"
          size="32"
          aria-hidden="true"
        />

        <div class="general-list__content">
          <span class="general-list__name medium-text">
            {{ item.name }}
          </span>

          <p
            v-if="item.description"
            class="general-list__description"
          >
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.general-list {
  width: min(100%, 920px);
  margin-inline: auto;
  margin-top: 0;
}

.general-list__title {
  margin-block-start: 0 !important;

  color: rgb(var(--v-theme-on-background));
  font-size: clamp(1rem, 2vw, 1.5rem);
  line-height: 1.4;
}

.small-heading{
  font-size: 20pt !important;
}

.general-list__items {
  display: grid;
  grid-template-columns: repeat(
    var(--list-columns),
    minmax(0, 1fr)
  );
  gap: 0 8px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.general-list__item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 20px;

  min-width: 0;
  padding: 0 0 20px;
}

.general-list__icon {
  margin-top: 1px;
  color: rgb(var(--v-theme-primary_accent));
}

.general-list__content {
  min-width: 0;
}

.general-list__name {
  display: block;

  color: rgb(var(--v-theme-on-background));
  font-size: clamp(0.75rem, 1.2vw, 0.95rem);
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.general-list__description {
  max-width: 48ch;
  margin: 10px 0 0;

  color: rgba(var(--v-theme-on-background), 0.72);
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 800px) {
  .general-list__items {
    grid-template-columns: 1fr;
  }
}


</style>
