<script setup lang="ts">
import footerTransitionImage from '@/images/icons/NewGradient.svg'

const githubUrl = 'https://github.com/SteiningerTobi'
const linkedInUrl = 'https://linkedin.com/in/tobias-steininger'
const emailAddress = 'tobias.steininger@gmx.at'

const cvUrl =
  `${import.meta.env.BASE_URL}Lebenslauf_Tobias_Steininger.pdf`
</script>

<template>
  <footer class="app-footer">
    <!-- Dekorativer Farbübergang -->
    <img
      :src="footerTransitionImage"
      class="app-footer__transition"
      alt=""
      aria-hidden="true"
      draggable="false"
    />

    <div class="app-footer__surface">
      <div class="app-footer__content">
        <!-- Lebenslauf -->
        <div class="app-footer__cv-row">
          <a
            :href="cvUrl"
            class="app-footer__cv-link site-link font-press-start"
            download
          >
            <v-icon
              icon="mdi-download"
              size="25"
              aria-hidden="true"
            />

            <span>Lebenslauf herunterladen</span>
          </a>
        </div>

        <!-- Kontaktlinks -->
        <nav
          class="app-footer__links"
          aria-label="Kontakt und soziale Netzwerke"
        >
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

            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  margin-top: 96px;
  overflow: hidden;
}

/*
  Die Höhe ergibt sich automatisch aus dem Seitenverhältnis
  des SVGs. Dadurch entsteht kein leerer Bereich im Bildrahmen.
*/
.app-footer__transition {
  display: block;
  width: 100%;
  height: auto;
}

.app-footer__surface {
  --site-link-color: rgb(var(--v-theme-on-primary_accent));
  --site-link-hover-color: rgb(var(--v-theme-surface));

  margin-top: -1px;
  color: rgb(var(--v-theme-on-primary_accent));
  background-color: #37a749;
}

.app-footer__content {
  width: min(100% - 48px, 1200px);
  min-height: 260px;
  margin-inline: auto;
  padding: 40px 0 48px;
}

/* Lebenslauf mittig über die gesamte Zeile */

.app-footer__cv-row {
  display: flex;
  justify-content: center;
  width: 100%;
}

.app-footer__cv-link {
  flex: 0 0 auto;
}

/* Kontaktlinks */

.app-footer__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  margin-top: 52px;
}

.app-footer__link {
  justify-content: center;
}

.app-footer__link:first-child {
  justify-self: start;
}

.app-footer__link:nth-child(2) {
  justify-self: center;
}

.app-footer__link:last-child {
  justify-self: end;
}

@media (max-width: 700px) {
  .app-footer {
    margin-top: 64px;
  }

  .app-footer__content {
    width: min(100% - 32px, 1200px);
    min-height: auto;
    padding: 36px 0 40px;
  }

  .app-footer__cv-link {
    text-align: center;
  }

  .app-footer__links {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 44px;
  }

  .app-footer__link,
  .app-footer__link:first-child,
  .app-footer__link:nth-child(2),
  .app-footer__link:last-child {
    justify-self: center;
  }
}
</style>
