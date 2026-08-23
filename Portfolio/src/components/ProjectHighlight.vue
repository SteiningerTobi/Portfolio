<script setup lang="ts">
import { computed, ref } from 'vue'

import arrowIcon from '@/images/icons/Arrow.svg'
import crossIcon from '@/images/icons/Cross.svg'
import dotBlankIcon from '@/images/icons/DotBlank.svg'
import dotClickedIcon from '@/images/icons/DotClicked.svg'

import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
  projectNumber: number
}>()

const isEvenProject = computed(() => {
  return props.projectNumber % 2 === 0
})

const formattedProjectNumber = computed(() => {
  return String(props.projectNumber).padStart(2, '0')
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(imageIndex: number): void {
  lightboxIndex.value = imageIndex
  lightboxOpen.value = true
}

function closeLightbox(): void {
  lightboxOpen.value = false
}

function resolveImageUrl(path: string): string {
  const isExternalUrl =
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')

  if (isExternalUrl) {
    return path
  }

  const normalizedPath = path.replace(/^\/+/, '')

  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
</script>

<template>
  <article class="project-highlight">
    <v-row
      :class="[
        'project-highlight__row',
        {
          'project-highlight__row--reverse': isEvenProject,
        },
      ]"
      align="stretch"
      no-gutters
    >
      <!-- Bildspalte -->
      <v-col
        cols="12"
        md="6"
        class="project-highlight__media-column"
      >
        <div class="project-highlight__media">
          <!-- Carousel bei mehreren Bildern -->
          <v-carousel
            v-if="
              project.images.length > 1 &&
              project.images[0].src.trim() !== ''
            "
            class="project-highlight__carousel"
            height="100%"
            show-arrows="hover"
            hide-delimiter-background
          >
            <!-- Linker Pfeil -->
            <template #prev="{ props: arrowProps }">
              <button
                type="button"
                :class="[
                  'carousel-arrow',
                  'carousel-arrow--left',
                  arrowProps.class,
                ]"
                :aria-label="arrowProps['aria-label']"
                @click="arrowProps.onClick"
              >
                <img
                  :src="arrowIcon"
                  class="carousel-arrow__icon"
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                />
              </button>
            </template>

            <!-- Rechter Pfeil -->
            <template #next="{ props: arrowProps }">
              <button
                type="button"
                :class="[
                  'carousel-arrow',
                  'carousel-arrow--right',
                  arrowProps.class,
                ]"
                :aria-label="arrowProps['aria-label']"
                @click="arrowProps.onClick"
              >
                <img
                  :src="arrowIcon"
                  class="carousel-arrow__icon"
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                />
              </button>
            </template>

            <!-- Carousel-Punkte -->
            <template #item="{ props: dotProps }">
              <button
                type="button"
                :id="dotProps.id"
                :class="[
                  'carousel-dot',
                  dotProps.class,
                ]"
                :aria-label="dotProps['aria-label']"
                @click="dotProps.onClick"
                @keydown="dotProps.onKeydown"
              >
                <img
                  :src="dotBlankIcon"
                  class="carousel-dot__icon carousel-dot__icon--blank"
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                />

                <img
                  :src="dotClickedIcon"
                  class="carousel-dot__icon carousel-dot__icon--active"
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                />
              </button>
            </template>

            <!-- Projektbilder -->
            <v-carousel-item
              v-for="(image, imageIndex) in project.images"
              :key="`${image.src}-${imageIndex}`"
              class="project-highlight__carousel-item"
            >
              <button
                type="button"
                class="project-highlight__image-button"
                :aria-label="`${image.alt} vergrößern`"
                @click="openLightbox(imageIndex)"
              >
                <v-img
                  :src="resolveImageUrl(image.src)"
                  :alt="image.alt"
                  class="project-highlight__img"
                  color="background"
                  contain
                />
              </button>
            </v-carousel-item>
          </v-carousel>

          <!-- Einzelbild -->
          <button
            v-else-if="
              project.images.length === 1 &&
              project.images[0].src.trim() !== ''
            "
            type="button"
            class="project-highlight__image-button project-highlight__image"
            :aria-label="`${project.images[0].alt} vergrößern`"
            @click="openLightbox(0)"
          >
            <v-img
              :src="resolveImageUrl(project.images[0].src)"
              :alt="project.images[0].alt"
              class="project-highlight__img"
              color="background_accent"
              contain
            />
          </button>
        </div>
      </v-col>

      <!-- Textspalte -->
      <v-col
        cols="12"
        md="6"
        class="project-highlight__text-column"
      >
        <div class="project-highlight__content">
          <span class="project-highlight__number font-press-start">
            {{ formattedProjectNumber }}
          </span>

          <h3 class="project-highlight__title font-press-start">
            {{ project.title }}
          </h3>

          <div
            v-if="project.tags.length > 0"
            class="project-highlight__tags"
            aria-label="Verwendete Technologien"
          >
            <v-chip
              v-for="tag in project.tags"
              :key="tag"
              color="primary"
              variant="tonal"
              label
            >
              {{ tag }}
            </v-chip>
          </div>

          <p class="project-highlight__description">
            {{ project.description }}
          </p>

          <div
            v-if="project.links.length > 0"
            class="project-highlight__links"
          >
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              class="project-highlight__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon
                v-if="link.icon"
                :icon="link.icon"
                size="18"
                aria-hidden="true"
              />

              <span class="project-highlight__link-text">
                {{ link.text }}
              </span>
            </a>
          </div>
        </div>
      </v-col>
    </v-row>
  </article>

  <!-- Lightbox -->
  <v-dialog
    v-model="lightboxOpen"
    class="project-lightbox"
    width="96vw"
    max-width="1600"
  >
    <div class="project-lightbox__content">
      <!-- Schließen -->
      <button
        type="button"
        class="project-lightbox__close"
        aria-label="Bildansicht schließen"
        @click="closeLightbox"
        @dragstart.prevent
      >
        <img
          :src="crossIcon"
          class="project-lightbox__close-icon"
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      </button>

      <!-- Lightbox Carousel -->
      <v-carousel
        v-if="
          project.images.length > 1 &&
          project.images[0].src.trim() !== ''
        "
        v-model="lightboxIndex"
        class="project-lightbox__carousel"
        height="88vh"
        show-arrows="hover"
        hide-delimiter-background
      >
        <!-- Linker Pfeil -->
        <template #prev="{ props: arrowProps }">
          <button
            type="button"
            :class="[
              'carousel-arrow',
              'carousel-arrow--left',
              arrowProps.class,
            ]"
            :aria-label="arrowProps['aria-label']"
            @click="arrowProps.onClick"
            @dragstart.prevent
          >
            <img
              :src="arrowIcon"
              class="carousel-arrow__icon"
              alt=""
              aria-hidden="true"
              draggable="false"
            />
          </button>
        </template>

        <!-- Rechter Pfeil -->
        <template #next="{ props: arrowProps }">
          <button
            type="button"
            :class="[
              'carousel-arrow',
              'carousel-arrow--right',
              arrowProps.class,
            ]"
            :aria-label="arrowProps['aria-label']"
            @click="arrowProps.onClick"
            @dragstart.prevent
          >
            <img
              :src="arrowIcon"
              class="carousel-arrow__icon"
              alt=""
              aria-hidden="true"
              draggable="false"
            />
          </button>
        </template>

        <!-- Punkte -->
        <template #item="{ props: dotProps }">
          <button
            type="button"
            :id="dotProps.id"
            :class="[
              'carousel-dot',
              dotProps.class,
            ]"
            :aria-label="dotProps['aria-label']"
            @click="dotProps.onClick"
            @keydown="dotProps.onKeydown"
            @dragstart.prevent
          >
            <img
              :src="dotBlankIcon"
              class="carousel-dot__icon carousel-dot__icon--blank"
              alt=""
              aria-hidden="true"
              draggable="false"
            />

            <img
              :src="dotClickedIcon"
              class="carousel-dot__icon carousel-dot__icon--active"
              alt=""
              aria-hidden="true"
              draggable="false"
            />
          </button>
        </template>

        <!-- Lightbox-Bilder -->
        <v-carousel-item
          v-for="(image, imageIndex) in project.images"
          :key="`lightbox-${image.src}-${imageIndex}`"
          class="project-lightbox__carousel-item"
        >
          <v-img
            :src="resolveImageUrl(image.src)"
            :alt="image.alt"
            class="project-lightbox__img"
            height="88vh"
            contain
          />
        </v-carousel-item>
      </v-carousel>

      <!-- Einzelbild -->
      <v-img
        v-else-if="project.images.length === 1"
        :src="resolveImageUrl(project.images[0].src)"
        :alt="project.images[0].alt"
        class="project-lightbox__img"
        height="88vh"
        contain
      />
    </div>
  </v-dialog>
</template>

<style scoped>
.project-highlight {
  width: 100%;
  background-color: rgb(var(--v-theme-surface));
}

/* =========================================================
   ROW
   ========================================================= */

.project-highlight__row {
  width: 100%;
  min-height: 560px;
  align-items: stretch;
}

.project-highlight__media-column,
.project-highlight__text-column {
  display: flex;
  min-width: 0;
}

/* =========================================================
   BILDBEREICH
   ========================================================= */

.project-highlight__media {
  position: relative;
  width: 100%;
  height: 560px;
  min-height: 0;
  overflow: hidden;
}

.project-highlight__carousel {
  width: 100%;
  height: 100% !important;
}

.project-highlight__carousel-item {
  width: 100%;
  height: 100%;
}

.project-highlight__image-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;

  padding: 0;
  overflow: hidden;

  border: 0;
  background: transparent;

  cursor: zoom-in;
}

.project-highlight__img {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.project-highlight__img :deep(.v-responsive) {
  width: 100%;
  height: 100%;
}

.project-highlight__img :deep(.v-img__img) {
  object-fit: contain !important;
  transition: transform 250ms ease;
}

.project-highlight__image-button:hover
.project-highlight__img
:deep(.v-img__img) {
  transform: scale(1.025);
}

.project-highlight__image-button:focus-visible {
  outline: 4px solid rgb(var(--v-theme-primary_accent));
  outline-offset: -4px;
}

/* =========================================================
   CAROUSEL PFEILE
   ========================================================= */

.carousel-arrow {
  display: grid;
  place-items: center;

  width: 52px;
  height: 52px;

  padding: 11px;

  border: 0;
  border-radius: 0;

  background-color: rgb(var(--v-theme-primary));

  cursor: pointer;

  transition:
    background-color 180ms ease,
    transform 120ms ease;
}

.carousel-arrow__icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel-arrow--right .carousel-arrow__icon {
  transform: rotate(180deg);
}

.carousel-arrow:hover {
  background-color: rgb(var(--v-theme-primary_accent));
}

.carousel-arrow:active {
  transform: scale(0.88);
}

.carousel-arrow:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary_accent));
  outline-offset: 3px;
}

/* =========================================================
   CAROUSEL DOTS
   ========================================================= */

.carousel-dot {
  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;

  padding: 7px;

  border: 0;
  background: transparent;

  cursor: pointer;

  transition: transform 150ms ease;
}

.carousel-dot__icon {
  grid-area: 1 / 1;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
}

.carousel-dot__icon--blank {
  display: block;
}

.carousel-dot__icon--active {
  display: none;
}

.carousel-dot.v-btn--active
.carousel-dot__icon--blank {
  display: none;
}

.carousel-dot.v-btn--active
.carousel-dot__icon--active {
  display: block;
}

.carousel-dot:hover {
  transform: scale(1.18);
}

.carousel-dot:active {
  transform: scale(0.85);
}

.carousel-dot.v-btn--active {
  transform: scale(1.15);
}

.carousel-dot:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary_accent));
  outline-offset: 2px;
}

/* =========================================================
   TEXT
   ========================================================= */

.project-highlight__content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-width: 0;

  padding: clamp(2rem, 5vw, 5rem);

  overflow: visible;
}

.project-highlight__number {
  margin-bottom: 16px;

  color: rgb(var(--v-theme-primary));

  font-size: 0.9rem;
  font-weight: 700;

  letter-spacing: 0.12em;
}

.project-highlight__title {
  margin: 0;

  color: rgb(var(--v-theme-on-surface));

  font-size: clamp(1.5rem, 3.2vw, 2.5rem);
  font-weight: 700;

  line-height: 1.05;
  letter-spacing: -0.04em;
}

.project-highlight__tags {
  display: flex;
  flex-wrap: wrap;

  gap: 10px;
  margin-top: 15px;
}

.project-highlight__description {
  max-width: 60ch;

  margin: 24px 0 0;

  color: rgba(var(--v-theme-on-surface), 0.78);

  font-size: 1.05rem;
  line-height: 1.7;

  white-space: pre-line;
}

.project-highlight__links {
  display: flex;
  flex-wrap: wrap;

  gap: 12px 24px;
  margin-top: 28px;
}

.project-highlight__link {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  color: rgb(var(--v-theme-primary_accent));

  font-weight: 600;
  line-height: 1.4;

  text-decoration: none;

  transition:
    color 160ms ease,
    opacity 160ms ease;
}

.project-highlight__link-text {
  text-decoration-line: underline;
  text-decoration-color: currentColor;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;

  transition: text-underline-offset 160ms ease;
}

.project-highlight__link:hover {
  color: rgb(var(--v-theme-primary));
}

.project-highlight__link:hover
.project-highlight__link-text {
  text-underline-offset: 8px;
}

.project-highlight__link:active {
  opacity: 0.75;
}

.project-highlight__link:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary_accent));
  outline-offset: 4px;
}

/* =========================================================
   LIGHTBOX
   ========================================================= */

.project-lightbox__content {
  position: relative;

  width: 100%;

  overflow: hidden;

  background-color: rgba(0, 0, 0, 0);
}

.project-lightbox__carousel {
  width: 100%;
  height: 88vh !important;
}

.project-lightbox__carousel-item {
  width: 100%;
  height: 88vh;
}

.project-lightbox__close {
  position: absolute;

  top: 18px;
  right: 18px;

  z-index: 20;

  display: grid;
  place-items: center;

  width: 52px;
  height: 52px;

  padding: 0;
  border: 0;

  background-color: rgb(var(--v-theme-primary));

  cursor: pointer;

  transition:
    background-color 180ms ease,
    transform 120ms ease;
}

.project-lightbox__close:hover {
  background-color: rgb(var(--v-theme-primary_accent));
}

.project-lightbox__close:active {
  transform: scale(0.88);
}

.project-lightbox__close:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary_accent));
  outline-offset: 3px;
}

.project-lightbox__close-icon {
  display: block;

  width: 28px;
  height: 28px;

  object-fit: contain;

  pointer-events: none;
}

/* =========================================================
   DESKTOP
   ========================================================= */

@media (min-width: 960px) {
  .project-highlight__row--reverse {
    flex-direction: row-reverse;
  }
}

/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 959px) {
  .project-highlight__row {
    min-height: 0;
    align-items: stretch;
  }

  .project-highlight__media {
    height: 340px;
    min-height: 340px;
  }

  .project-highlight__content {
    padding: 36px 28px 44px;
  }
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 599px) {
  .project-highlight__media {
    height: 260px;
    min-height: 260px;
  }

  .project-highlight__content {
    padding: 30px 22px 36px;
  }

  .project-highlight__description {
    font-size: 1rem;
  }
}
</style>
