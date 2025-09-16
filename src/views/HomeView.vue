<script setup>
import { useI18n } from 'vue-i18n'
import IntroductionText from '@/components/shared/IntroductionText.vue'

const { t } = useI18n()
</script>

<template>
  <main>
    <IntroductionText
      :title="t('home.introduction.title')"
      :text="t('home.introduction.text1')"
      :text2="t('home.introduction.text2')"
    />
  </main>
</template>

<style scoped>
</style>
