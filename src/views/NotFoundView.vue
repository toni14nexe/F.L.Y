<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="not-found">
    <h1>{{ t('errorPage.ops') }}</h1>
    <p>{{ t('errorPage.description') }}</p>
  </div>
</template>

<script setup></script>

<style scoped>
h1,
p {
  color: goldenrod;
}
button {
  margin-top: 24px;
}
.not-found {
  text-align: center;
  margin: 25dvh 0;
  padding: 5dvh 0;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
