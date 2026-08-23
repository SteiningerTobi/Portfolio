<script setup lang="ts">
import { ref } from 'vue'

import logoUrl from '@/images/Logo.svg'
import headerTransitionImage from '@/images/icons/NewGradient.svg'

const drawerOpen = ref(false)

interface NavigationItem {
  label: string
  target: string
  icon: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Über mich',
    target: '#about',
    icon: 'mdi-account-outline',
  },
  {
    label: 'Projekte',
    target: '#projects',
    icon: 'mdi-code-tags',
  },
  {
    label: 'Skills',
    target: '#skills',
    icon: 'mdi-tools',
  },
  {
    label: 'Erfahrung',
    target: '#experience',
    icon: 'mdi-briefcase-outline',
  },
]

function closeDrawer(): void {
  drawerOpen.value = false
}
</script>

<template>
  <v-app-bar
    class="portfolio-header"
    color="primary"
    elevation="0"
    height="72"
    extension-height="64"
  >
    <v-container class="header-container d-flex align-center">
      <a
        class="header-logo"
        href="#about"
        aria-label="Zur Startseite"
      >
        <img
          :src="logoUrl"
          alt="Tobias Steininger"
          class="header-logo__image"
        />
      </a>

      <v-spacer />

      <!-- Desktop-Navigation -->
      <nav
        class="app-header__navigation"
        aria-label="Hauptnavigation"
      >
        <a
          href="#about"
          class="site-link font-press-start"
        >
          Über mich
        </a>

        <a
          href="#projects"
          class="site-link font-press-start"
        >
          Projekte
        </a>

        <a
          href="#contact"
          class="site-link font-press-start"
        >
          Kontakt
        </a>
      </nav>

      <!-- Mobile-Menü-Button -->
      <v-btn
        class="d-md-none"
        icon="mdi-menu"
        variant="text"
        aria-label="Navigation öffnen"
        @click="drawerOpen = true"
      />
    </v-container>

    <!-- Gradient unter dem Header -->
    <template #extension>
      <img
        :src="headerTransitionImage"
        class="portfolio-header__transition"
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </template>
  </v-app-bar>

  <!-- Mobile Navigation -->
  <v-navigation-drawer
    v-model="drawerOpen"
    location="right"
    temporary
    color="primary"
    width="300"
  >
    <div class="drawer-header">
      <span class="drawer-title">Navigation</span>

      <v-btn
        icon="mdi-close"
        variant="text"
        aria-label="Navigation schließen"
        @click="drawerOpen = false"
      />
    </div>

    <v-divider />

    <v-list nav class="pa-4">
      <v-list-item
        v-for="item in navigationItems"
        :key="item.target"
        :href="item.target"
        :prepend-icon="item.icon"
        :title="item.label"
        rounded="lg"
        @click="closeDrawer"
      />

      <v-list-item
        href="#contact"
        prepend-icon="mdi-email-outline"
        title="Kontakt"
        rounded="lg"
        @click="closeDrawer"
      />
    </v-list>

    <template #append>
      <div class="drawer-footer">
        <v-btn
          href="https://github.com/DEIN-USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          prepend-icon="mdi-github"
          variant="outlined"
          block
        >
          GitHub
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.app-header__navigation {
  --site-link-color: rgb(var(--v-theme-on-primary));
  --site-link-hover-color: rgb(var(--v-theme-primary_accent));

  display: flex;
  align-items: center;
  gap: clamp(18px, 2.5vw, 34px);
}

.portfolio-header {
  backdrop-filter: blur(14px);
}

/* Entfernt mögliches Padding des Vuetify-Extension-Slots */
.portfolio-header :deep(.v-toolbar__extension) {
  width: 100%;
  padding: 0;
  align-items: stretch;
}

/*
  Das Footer-SVG verläuft Beige → Grün.
  Für den Header wird es vertikal gedreht:
  Grün → Beige.
*/
.portfolio-header__transition {
  display: block;
  width: 100vw;
  object-fit: cover;
  transform: scaleY(-1);
  pointer-events: none;
  user-select: none;
}

nav {
  padding-top: 10px;
}

.header-container {
  width: 100%;
  max-width: 1280px;
}

.header-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.header-logo__image {
  display: block;
  width: auto;
  height: 44px;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 0 16px 0 24px;
}

.drawer-title {
  font-size: 1.15rem;
  font-weight: 700;
}

.drawer-footer {
  padding: 16px;
}

@media (max-width: 959px) {
  .app-header__navigation {
    display: none;
  }
}
</style>
