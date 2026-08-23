<script setup lang="ts">
import type { BulletListItem } from '@/types/bulletListItem'

withDefaults(
  defineProps<{
    items: BulletListItem[]
    title?: string
  }>(),
  {
    title: '',
  },
)

function isExternalLink(href: string): boolean {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//')
  )
}
</script>

<template>
  <section
    class="bullet-list"
    :aria-label="title || 'Liste'"
  >
    <h3
      v-if="title"
      class="bullet-list__heading font-press-start"
    >
      {{ title }}
    </h3>

    <ul class="bullet-list__items">
      <li
        v-for="item in items"
        :key="item.title"
        class="bullet-list__item"
      >
        <div class="bullet-list__header">
          <h4 class="bullet-list__title font-press-start">
            {{ item.title }}
          </h4>
        </div>

        <span
          v-if="item.summary"
          class="bullet-list__summary"
        >
            {{ item.summary }}
        </span>

        <p class="bullet-list__description">
          {{ item.description }}
        </p>

        <a
          v-if="item.link"
          :href="item.link.href"
          class="bullet-list__link"
          :target="isExternalLink(item.link.href) ? '_blank' : undefined"
          :rel="
            isExternalLink(item.link.href)
              ? 'noopener noreferrer'
              : undefined
          "
        >
          <span>
            <v-icon
              icon="mdi-arrow-right"
              size="18"
              aria-hidden="true"
            />
            {{ item.link.label || 'Mehr erfahren' }}
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.bullet-list {
  width: min(100%, 920px);
  margin-inline: auto;
}

.bullet-list__heading {
  margin: 32px 0 0 0;

  color: rgb(var(--v-theme-on-background));
  font-size: clamp(1rem, 2vw, 1.5rem);
  line-height: 1.4;
}

.bullet-list__items {
  display: flex;
  flex-direction: column;
  gap: 0;

  margin: 0;
  padding: 0;

  list-style: none;
}

.bullet-list__item {
  position: relative;

  padding:
    30px
    0
    30px
    42px;

  border-bottom: 3px solid
  rgba(var(--v-theme-on-background), 0.16);
}

/* Pixeliger Bullet Point */
.bullet-list__item::before {
  content: '';

  position: absolute;
  top: 36px;
  left: 4px;

  width: 13px;
  height: 13px;

  background-color: rgb(var(--v-theme-primary));
  box-shadow:
    5px 5px 0
    rgb(var(--v-theme-primary_accent));
}

.bullet-list__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 18px;
}

.bullet-list__title {
  margin: 0;

  color: rgb(var(--v-theme-on-background));
  font-size: clamp(0.78rem, 1.35vw, 1.05rem);
  line-height: 1.5;
}

.bullet-list__summary {
  color: rgb(var(--v-theme-primary_accent));
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.5;
}

.bullet-list__description {
  max-width: 75ch;
  margin: 0;

  color: rgba(var(--v-theme-on-background), 0.76);
  font-size: 1.05rem;
  line-height: 1.7;
  white-space: pre-line;
}

.bullet-list__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  width: fit-content;
  margin-top: 16px;

  color: rgb(var(--v-theme-primary_accent));
  font-weight: 700;
  line-height: 1.4;
  text-decoration: none;
}

.bullet-list__link span {
  text-decoration-line: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;

  transition: text-underline-offset 160ms ease;
}

.bullet-list__link:hover span {
  text-underline-offset: 8px;
}

.bullet-list__link:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary_accent));
  outline-offset: 5px;
}

@media (max-width: 700px) {
  .bullet-list__item {
    padding:
      24px
      0
      24px
      34px;
  }

  .bullet-list__item::before {
    top: 30px;
    left: 2px;

    width: 11px;
    height: 11px;

    box-shadow:
      4px 4px 0
      rgb(var(--v-theme-primary_accent));
  }

  .bullet-list__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .bullet-list__description {
    font-size: 1rem;
  }
}
</style>
