<script setup lang="ts">
import ProjectHighlight from '@/components/ProjectHighlight.vue'
import projectsData from '@/data/projects.json'

import type { Project } from '@/types/project'

const projects = projectsData as Project[]
</script>

<template>
  <section
      id="projects"
      class="project-list"
  >
    <div class="project-list__items">
      <ProjectHighlight
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :project-number="index + 1"
      />
    </div>
  </section>
</template>

<style scoped>
.project-list {
  width: min(100% - 48px, 1400px);
  margin-inline: auto;
}

.project-list__header {
  margin-bottom: 48px;
}

.project-list__items {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

@media (max-width: 599px) {
  .project-list {
    width: min(100% - 32px, 1400px);
  }

  .project-list__items {
    gap: 48px;
  }
}
</style>
