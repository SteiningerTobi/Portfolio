<script setup lang="ts">
import Header from './components/Header.vue'
import AboutMe from "@/components/AboutMe.vue";
import ProjectList from "@/components/ProjectList.vue";
import AppFooter from "@/components/AppFooter.vue";
import Skills from '@/components/Skills.vue'

import type { ListItem } from '@/types/listItem'

import type { BulletListItem } from '@/types/bulletListItem'

</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <section id="about" class="page-section">
        <h1 class="font-press-start">Portfolio</h1>
        <p class="font-press-start text-center h4-fake no-border">Tobias Steininger</p>
        <AboutMe>
        </AboutMe>
      </section>

      <section id="projects" class="page-section">
        <h2 class="font-press-start">Projekte</h2>
          <ProjectList class="projectList"/>
      </section>
      <v-spacer>
      </v-spacer>
    </v-main>
    <AppFooter id="contact" />
  </v-app>
</template>

<style scoped>
.page-section {
  min-height: 80vh;
  padding: 46px max(24px, calc((100vw - 1200px) / 2));
  scroll-margin-top: 72px;
}

.skills-secondary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: clamp(40px, 5vw, 72px);

  width: 100%;
  margin-top: 72px;
}

.skills-secondary__component {
  width: 100%;
  min-width: 0;
}

.skills-secondary :deep(.skills-section) {
  padding: 0;
}

.skills-secondary :deep(.skills-table),
.skills-secondary :deep(.general-list) {
  width: 100%;
}

.skills-secondary :deep(.skills-section__title),
.skills-secondary :deep(.general-list__title) {
  width: 100%;
  margin: 0 0 32px;
  margin-top: 0 !important;

  font-size: clamp(1rem, 2vw, 1.5rem);
  line-height: 1.4;
  text-align: left;
}

.skills-secondary :deep(.skills-header),
.skills-secondary :deep(.skill) {
  grid-template-columns:
    minmax(120px, 0.8fr)
    minmax(180px, 1.2fr);

  gap: 20px;
}

@media (max-width: 900px) {
  .skills-secondary {
    grid-template-columns: 1fr;
    gap: 64px;
  }
}

.skills-main-row {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(40px, 5vw, 80px);
  width: 100%;
}

.skills-main-row__side {
  min-width: 0;
}

.skills-main-row :deep(.skills-section) {
  padding: 0;
}

@media (max-width: 1000px) {
  .skills-main-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  }
}

@media (max-width: 700px) {
  .skills-main-row {
    grid-template-columns: 1fr;
  }

  .skills-main-row__side {
    display: none;
  }
}

GeneralList, Skills{
  border: 5px black solid !important;
}

</style>
