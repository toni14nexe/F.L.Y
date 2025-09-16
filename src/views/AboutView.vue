<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PageTitle from '@/components/shared/PageTitle.vue'
import TextWithSideImage from '@/components/shared/TextWithSideImage.vue'
import Contact from '@/components/shared/Contact.vue'
import { useI18n } from 'vue-i18n'
import TextContainer from '@/components/shared/TextContainer.vue'

const { t } = useI18n()
const sectionRefs = ref([])
const setSectionRefs = (el) => {
  if (el && !sectionRefs.value.includes(el)) {
    sectionRefs.value.push(el)
  }
}
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 },
)

onMounted(() => {
  sectionRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  sectionRefs.value.forEach((el) => {
    if (el) observer.unobserve(el)
  })
})
</script>

<template>
  <main>
    <PageTitle :title="t('aboutUs.title')" />

    <TextWithSideImage
      :title="t('aboutUs.introductionTitle')"
      :text="t('aboutUs.introductionText')"
      src="/background.jpg"
    />

    <div class="about-us-container scroll-fade" :ref="setSectionRefs">
      <h1>{{ t('aboutUs.textTitle') }}</h1>
      <p>{{ t('aboutUs.text1') }}</p>
      <p>{{ t('aboutUs.text2') }}</p>
    </div>

    <Contact style="margin-top: 100px" />
  </main>
</template>

<style scoped>
.about-us-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: rgba(0, 0, 0, 0.95);
  margin-top: 100px;
  padding: 64px;
  opacity: 0.85;
  border-radius: 8px;
}
.scroll-fade {
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 1s ease,
    transform 1s ease;
  will-change: opacity, transform;
}
.scroll-fade.fade-in {
  opacity: 1;
  transform: translateY(0);
}
h1 {
  color: goldenrod;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 2px;
}
p {
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.75px;
  color: white;
}

@media only screen and (max-width: 768px) {
  .about-us-container {
    padding: 5%;
  }
}

@media only screen and (max-width: 991px) {
  h1 {
    font-size: 24px;
  }
  p {
    font-size: 14px;
  }
}
</style>
