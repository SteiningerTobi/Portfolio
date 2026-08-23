<script setup lang="ts">
import expertiseAreasJson from '@/data/expertiseAreas.json'

import type { ExpertiseArea } from '@/types/expertiseArea'

const expertiseAreas = expertiseAreasJson as ExpertiseArea[]
</script>

<template>
  <section
    class="expertise"
    aria-labelledby="expertise-heading"
  >
    <h3
      id="expertise-heading"
      class="expertise__title font-press-start"
    >
      Weitere Kenntnisse
    </h3>

    <div class="expertise__grid">
      <article
        v-for="area in expertiseAreas"
        :key="area.name"
        class="expertise-card"
      >
        <v-icon
          :icon="area.icon"
          class="expertise-card__icon"
          size="42"
          aria-hidden="true"
        />

        <span class="expertise-card__name font-press-start">
          {{ area.name }}
        </span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.expertise {
  width: 100%;
}

.expertise__title {
  margin: 0 0 42px;

  color: rgb(var(--v-theme-on-background));
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  line-height: 1.3;
  text-align: center;
}

.expertise__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.expertise-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;

  min-height: 180px;
  padding: 28px 20px;

  color: rgb(var(--v-theme-on-surface));
  text-align: center;

  background-color: rgb(var(--v-theme-surface));
  border: 5px solid rgb(var(--v-theme-primary));

  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease;
}

.expertise-card__icon {
  color: rgb(var(--v-theme-primary_accent));
}

.expertise-card__name {
  font-size: clamp(0.65rem, 1.1vw, 0.85rem);
  line-height: 1.6;
  overflow-wrap: anywhere;
}

@media (max-width: 959px) {
  .expertise__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .expertise__title {
    margin-bottom: 32px;
  }

  .expertise__grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .expertise-card {
    flex-direction: row;
    justify-content: flex-start;

    min-height: 100px;
    padding: 22px 24px;
    text-align: left;
  }

  .expertise-card__icon {
    flex: 0 0 auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .expertise-card {
    transition: none;
  }

  .expertise-card:hover {
    transform: none;
  }
}
</style>
