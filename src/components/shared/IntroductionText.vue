<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  title: string
  text?: string
  text2?: string
  buttonText?: string
  buttonSrc?: string
}>()

const { locale } = useI18n()
</script>

<template>
  <ElRow align="middle" class="introduction-text-container">
    <ElRow style="row-gap: 16px">
      <ElCol v-motion-slide-left :duration="1000" :delay="250" :xs="24" :lg="14">
        <h1>{{ title }}</h1>
      </ElCol>
      <ElCol :xs="0" :lg="10" />
      <ElCol v-if="text || text2" :xs="24" :lg="14">
        <p v-if="text" v-motion-slide-right :duration="1000" :delay="500">
          {{ text }}
        </p>
        <p v-if="text2" v-motion-slide-left :duration="1000" :delay="500" style="margin-top: 16px">
          {{ text2 }}
        </p>
      </ElCol>
      <ElCol :xs="0" :lg="10" />
      <ElCol
        v-if="buttonSrc && buttonText"
        v-motion-slide-bottom
        :xs="24"
        :lg="14"
        :duration="1000"
        :delay="750"
      >
        <RouterLink :to="`/${locale}${buttonSrc}`">
          <ElButton size="large" plain>{{ buttonText }}</ElButton>
        </RouterLink>
      </ElCol>
      <ElCol :xs="0" :lg="10" />
    </ElRow>
  </ElRow>
</template>

<style scoped>
.introduction-text-container {
  padding: 120px;
  height: calc(100dvh - 60px);
}
h1 {
  color: goldenrod;
}
p {
  color: white;
}
button {
  font-size: large;
}

@media (max-width: 992px) {
  .introduction-text-container {
    padding: 16px;
  }
}
</style>
