<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '@/types/skill'

interface DisplaySkill extends Skill {
  normalizedLevel: number
  percentage: number
}

interface AxisLabel {
  label: string
  position: number
}

const props = withDefaults(
  defineProps<{
    skillsData: Skill[]
    title?: string
    sectionId?: string
  }>(),
  {
    title: '',
    sectionId: undefined,
  },
)

const maximumLevel = 10

const axisLabels: AxisLabel[] = [
  {
    label: 'Basis',
    position: 0,
  },
  {
    label: 'Mittel',
    position: 50,
  },
  {
    label: 'Hoch',
    position: 100,
  },
]

const skills = computed<DisplaySkill[]>(() =>
  props.skillsData.map((skill) => {
    const normalizedLevel = Math.min(
      maximumLevel,
      Math.max(0, skill.level),
    )

    return {
      ...skill,
      normalizedLevel,
      percentage: (normalizedLevel / maximumLevel) * 100,
    }
  }),
)
</script>

<template>
  <section
    :id="sectionId"
    class="skills-section"
    :aria-label="title || 'Skills'"
  >
    <div class="skills-section__content">
      <h3
        v-if="title"
        class="general-list__title small-heading font-press-start"
      >
        {{ title }}
      </h3>

      <div class="skills-table">
        <!-- Beschriftungszeile -->
<!--        <div class="skills-header">-->
<!--          <span class="skills-header__title font-press-start">-->
<!--            Fähigkeit-->
<!--          </span>-->

<!--          <div-->
<!--            class="skills-header__axis font-press-start"-->
<!--            aria-hidden="true"-->
<!--          >-->
<!--            <span-->
<!--              v-for="axisLabel in axisLabels"-->
<!--              :key="axisLabel.label"-->
<!--              class="skills-header__axis-label"-->
<!--              :class="{-->
<!--                'skills-header__axis-label&#45;&#45;first':-->
<!--                  axisLabel.position === 0,-->
<!--                'skills-header__axis-label&#45;&#45;last':-->
<!--                  axisLabel.position === 100,-->
<!--              }"-->
<!--              :style="{-->
<!--                left: `${axisLabel.position}%`,-->
<!--              }"-->
<!--            >-->
<!--              {{ axisLabel.label }}-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->

        <!-- Skillzeilen -->
        <div class="skills-list">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="skill medium-text"
          >
            <span class="skill__name">
              {{ skill.name }}
            </span>

            <div
              class="skill__bar"
              role="progressbar"
              :aria-label="`${skill.name}: ${skill.normalizedLevel} von ${maximumLevel}`"
              :aria-valuenow="skill.normalizedLevel"
              aria-valuemin="0"
              :aria-valuemax="maximumLevel"
            >
              <div
                class="skill__bar-fill"
                :style="{
                  width: `${skill.percentage}%`,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  width: 100%;
  padding: 26px max(24px, calc((100vw - 1200px) / 2)) 96px;
}

.skills-section__content {
  width: 100%;
}

.skills-table {
  width: min(100%, 920px);
  margin-inline: auto;
}

/*
  Kopfzeile und Skillzeilen verwenden dieselben Spalten.
  Dadurch stehen Achse und Balken exakt übereinander.
*/
.skills-header,
.skill {
  display: grid;
  grid-template-columns:
    minmax(220px, 1fr)
    minmax(360px, 430px);
  gap: 40px;
  align-items: center;
}

/* Kopfzeile */

.skills-header {
  align-items: end;
  padding-bottom: 18px;
  border-bottom: 4px solid rgb(var(--v-theme-on-background));
}

/* Achsenbeschriftung */

.skills-header__axis {
  position: relative;
  height: 1.2em;

  color: rgb(var(--v-theme-on-background));
  font-size: clamp(0.65rem, 1.1vw, 0.85rem);
  line-height: 1.2;
  white-space: nowrap;
}

.skills-header__axis-label {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
}

.skills-header__axis-label--first {
  transform: none;
}

.skills-header__axis-label--last {
  transform: translateX(-100%);
}

/* Skillliste */

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 30px;
}

.skill__name {
  color: rgb(var(--v-theme-on-background));
  line-height: 1.5;
}

/* Skillbalken */

.skill__bar {
  width: 100%;
  height: 20px;
  overflow: hidden;
  background-color: rgba(var(--v-theme-on-background), 0.1);
}

.skill__bar-fill {
  height: 100%;
  background-color: rgb(var(--v-theme-secondary));
  transition: width 500ms ease;
}

/* Tablet und Smartphone */

@media (max-width: 700px) {
  .skills-section {
    padding: 64px 16px;
  }

  .skills-section__title {
    margin-bottom: 48px;
  }

  .skills-header {
    gap: 20px;
    padding-bottom: 18px;
  }

  .skills-header__axis {
    width: 100%;
    font-size: clamp(0.55rem, 2.5vw, 0.7rem);
  }

  .skills-list {
    gap: 30px;
  }

  .skill {
    gap: 10px;
  }

  .skill__name {
    overflow-wrap: anywhere;
  }

  .skill__bar {
    height: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill__bar-fill {
    transition: none;
  }
}
</style>
