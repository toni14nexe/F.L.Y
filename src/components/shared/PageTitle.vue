<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps(['title'])

const containerRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 },
  )
  if (containerRef.value) observer.observe(containerRef.value)
})

onUnmounted(() => {
  if (containerRef.value) observer.unobserve(containerRef.value)
})
</script>

<template>
  <div class="title-container" :class="{ 'fade-in': isVisible }" ref="containerRef">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.title-container {
  height: 200px;
  padding: 0 64px;
  display: flex;
  justify-items: start;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}
.title-container.fade-in {
  opacity: 1;
  transform: translateY(0);
}
h1 {
  color: goldenrod;
  font-weight: 700;
  margin: auto 0;
  justify-self: start;
  font-size: 36px;
  letter-spacing: 2px;
}

@media only screen and (max-width: 991px) {
  .title-container {
    height: 150px;
    padding: 0 5%;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
