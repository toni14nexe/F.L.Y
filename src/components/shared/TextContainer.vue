<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  title?: string
  text: string
  buttonText?: string
  buttonSrc?: string
}>()
const emits = defineEmits(['buttonClick'])

const { locale } = useI18n()
const containerRef = ref(null)
const isVisible = ref(false)
const formattedText = computed(() => props.text.replace(/\n/g, '<br>'))
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  if (containerRef.value) observer.observe(containerRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div style="min-height: 200px">
    <div ref="containerRef" :class="{ 'fade-in': isVisible }" class="fade-container">
      <ElRow class="text-container" justify="center">
        <ElCol :span="24" class="text-wrapper">
          <h1 v-if="title">{{ title }}</h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="text-wrapper" v-html="formattedText" />
          <RouterLink v-if="buttonSrc && buttonText" :to="`/${locale}${buttonSrc}`">
            <ElButton v-if="buttonText" size="large" type="primary" @click="emits('buttonClick')">
              {{ buttonText }}
            </ElButton>
          </RouterLink>
          <ElButton
            v-else-if="buttonText"
            size="large"
            type="primary"
            @click="emits('buttonClick')"
          >
            {{ buttonText }}
          </ElButton>
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>

<style scoped>
.fade-container {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 1s ease-out,
    transform 1s ease-out;
}
.fade-in {
  opacity: 1;
  transform: translateY(0);
}
.text-container {
  background-color: rgba(0, 0, 0, 0.95);
  height: fit-content;
  min-height: min-content;
  opacity: 0.85;
  border-radius: 8px;
}
.text-wrapper {
  max-width: 1280px;
  text-align: justify;
}
h1 {
  margin: 32px;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 2px;
}
p {
  margin: 32px;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.75px;
  color: white;
}
button {
  margin: 0 32px;
}

@media only screen and (max-width: 991px) {
  h1 {
    margin: 50px 10%;
    font-size: 24px;
  }
  p {
    margin: 50px 10%;
    font-size: 14px;
  }
  button {
    margin-left: 10%;
  }
}
</style>
