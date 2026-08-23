<script setup lang="ts">
import { ref } from 'vue'

import arrowIcon from '@/images/icons/Arrow.svg'

type Language = 'de' | 'en'

const lang = ref<Language>('de')

const githubUrl = 'https://github.com/SteiningerTobi'
const linkedInUrl = 'https://linkedin.com/in/tobias-steininger'
const emailAddress = 'tobias.steininger@gmx.at'

const deText = `
Hallo, ich bin Tobias! Ich bin Webentwickler und habe außerdem Erfahrung in den Bereichen Webdesign, Online Marketing, Web Accessibility sowie Bild- und Videobearbeitung. Ich interessiere mich besonders dafür, Technik und Gestaltung miteinander zu verbinden und digitale Inhalte so zu gestalten, dass sie nicht nur gut aussehen, sondern auch einfach und angenehm zu nutzen sind. Meinen Bachelorabschluss in Kommunikation, Wissen, Medien habe ich an der FH Oberösterreich, Campus Hagenberg, absolviert.`

const enText = `
Je suis un baguette. Mjam mjam mjam mjam mjam.
Hagen Dasz, Hagen Dasz, Wieeeha.
`
</script>

<template>
  <div>

    <p v-if="lang === 'de'" class="text">
      {{ deText }}
    </p>

  </div>

  <div class="flex-center">
    <a
      :href="`mailto:${emailAddress}`"
      class="app-footer__link site-link font-press-start"
    >
      <v-icon
        icon="mdi-email"
        size="24"
        aria-hidden="true"
      />

      <span>E-Mail</span>
    </a>

    <a
      :href="linkedInUrl"
      class="app-footer__link site-link font-press-start"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-icon
        icon="mdi-linkedin"
        size="24"
        aria-hidden="true"
      />

      <span>LinkedIn</span>
    </a>

    <a
      :href="githubUrl"
      class="app-footer__link site-link font-press-start"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-icon
        icon="mdi-github"
        size="24"
        aria-hidden="true"
      />

      <span>Github</span>
    </a>
  </div>

  <!-- Nach-unten-Button -->
  <div class="scroll-button-wrapper">
    <a
      href="/#projects"
      class="scroll-button"
      aria-label="Zu den Projekten scrollen"
    >
      <img
        :src="arrowIcon"
        class="scroll-button__icon"
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </a>
  </div>
</template>

<style scoped>
.text {
  white-space: pre-line;
}

/* =========================================================
   SCROLL BUTTON
   ========================================================= */

.scroll-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.scroll-button {
  display: grid;
  place-items: center;

  width: 56px;
  height: 56px;

  background-color: rgb(var(--v-theme-primary));

  text-decoration: none;

  animation: scroll-button-pulse 1.8s ease-in-out infinite;

  transition:
    background-color 180ms ease,
    transform 180ms ease;
}

.scroll-button__icon {
  display: block;

  width: 30px;
  height: 30px;

  object-fit: contain;

  /*
   * Arrow.svg zeigt standardmäßig nach links.
   * -90° dreht ihn nach unten.
   */
  transform: rotate(-90deg);
}

.scroll-button:hover {
  background-color: rgb(var(--v-theme-primary_accent));
  animation-play-state: paused;
  transform: translateY(4px);
}

.scroll-button:active {
  transform: translateY(6px) scale(0.9);
}

.scroll-button:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary_accent));
  outline-offset: 4px;
}

@keyframes scroll-button-pulse {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-button {
    animation: none;
  }
}
</style>
