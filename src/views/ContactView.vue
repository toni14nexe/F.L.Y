<script setup>
import PageTitle from '@/components/shared/PageTitle.vue'
import TextWithSideImage from '@/components/shared/TextWithSideImage.vue'
import Contact from '@/components/shared/Contact.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main>
    <PageTitle :title="t('contact.title')" />
    <TextWithSideImage
      :title="t('contact.introductionTitle')"
      :text="t('contact.introductionText')"
      src="/background.jpg"
    />
    <Contact style="margin-top: 100px" />
  </main>
</template>

<style scoped></style>
