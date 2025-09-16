<script setup>
import { truncateText } from '@/utils/truncate'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import FacebookIcon from '../icons/FacebookIcon.vue'

defineProps(['title', 'text', 'src', 'buttonText', 'apartmentPage', 'rentlioLink', 'facebookLink'])
const emits = defineEmits(['buttonClick'])

const { t, locale } = useI18n()
const containerRef = ref(null)
const isVisible = ref(false)

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
  <div ref="containerRef" :class="{ 'fade-in': isVisible }" class="fade-container main-container">
    <ElRow>
      <ElCol
        :xs="24"
        :sm="11"
        class="text-container"
        :class="{ 'without-top-radius': apartmentPage }"
      >
        <h1>{{ title }}</h1>
        <p v-if="text">{{ truncateText(text, 300) }}</p>
        <ElButton v-if="buttonText" size="large" type="primary" plain @click="emits('buttonClick')">
          {{ buttonText }}
        </ElButton>
        <ElRow v-if="apartmentPage" justify="center" style="gap: 12px; height: 25%" align="bottom">
          <ElCol :xs="24" :sm="24" :md="5" align="center">
            <RouterLink :to="`/${locale}/contact`">
              <ElButton size="large" plain>
                {{ t('apartment.reservation.contact') }}
              </ElButton>
            </RouterLink>
          </ElCol>
          <ElCol :span="2" class="hidden-xs-only" />
          <ElCol v-if="rentlioLink" :xs="24" :sm="24" :md="5" align="center">
            <a :href="rentlioLink" target="_blank">
              <ElButton size="large" plain>
                {{ t('apartment.reservation.book') }}
              </ElButton>
            </a>
          </ElCol>
          <ElCol v-if="facebookLink" :xs="24" :sm="24" :md="5" align="center">
            <a :href="facebookLink" target="_blank">
              <ElButton size="large" plain>
                <ElIcon :size="22" style="margin-right: 8px">
                  <FacebookIcon style="color: #1877f2" />
                </ElIcon>
                Facebook
              </ElButton>
            </a>
          </ElCol>
        </ElRow>
      </ElCol>
      <ElCol :xs="24" :sm="13" class="image-container" :style="`background-image: url(${src})`" />
    </ElRow>
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
  height: 75dvh;
  opacity: 0.85;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.without-top-radius {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.image-container {
  min-height: calc(75dvh + 160px);
  margin-top: -80px;
  background-color: rgba(0, 0, 0, 0.95);
  border-top: 20px solid rgba(0, 0, 0, 0.95);
  border-left: 20px solid rgba(0, 0, 0, 0.95);
  border-bottom: 20px solid rgba(0, 0, 0, 0.95);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
h1 {
  color: goldenrod;
  margin: 80px 20%;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 2px;
}
p {
  margin: 80px 20%;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.75px;
  color: white;
  text-align: justify;
}
button {
  margin-left: 20%;
}

@media (max-width: 768px) {
  .main-container {
    margin-bottom: 180px;
  }
  .text-container {
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0;
  }
  .image-container {
    width: 100%;
    height: 600px;
    margin: 0;
    background-color: transparent;
    border-top: none;
    border-left: 8px solid rgba(0, 0, 0, 0.95);
    border-bottom: 8px solid rgba(0, 0, 0, 0.95);
    border-right: 8px solid rgba(0, 0, 0, 0.95);
    border-top-left-radius: 0;
    border-bottom-right-radius: 8px;
  }
}

@media only screen and (max-width: 991px) {
  .text-container {
    height: max-content;
    padding-bottom: 50px;
  }
  .image-container {
    min-height: fit-content;
    margin-bottom: -80px;
  }
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
