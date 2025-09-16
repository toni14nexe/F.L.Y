<script setup>
import { shallowRef, onMounted, nextTick, computed } from 'vue'
import { truncateText } from '@/utils/truncate'
import { useI18n } from 'vue-i18n'

const props = defineProps(['hideRestaurant'])

const { t, locale } = useI18n()
const services = computed(() => {
  let baseServices = []
  baseServices = [
    ...baseServices,
    {
      name: t('offer.nin.title'),
      description: t('offer.nin.description'),
      url: 'apartments/nin',
      imageUrl: '/images/nin/main.jpg',
    },
    {
      name: t('offer.arena.title'),
      description: t('offer.arena.description'),
      url: 'apartments/arena',
      imageUrl: '/images/arena/main.jpg',
    },
  ]

  return baseServices
})

const wrappers = shallowRef([])
onMounted(async () => {
  wrappers.value = []
  await nextTick()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 },
  )

  wrappers.value.forEach((el) => {
    if (el) observer.observe(el)
  })
})

function setWrapperRef(el) {
  if (el) wrappers.value.push(el)
}
</script>

<template>
  <ElRow class="container" justify="center">
    <ElCol
      :xs="24"
      :sm="12"
      :md="8"
      v-for="service in services"
      :key="service.url"
      class="service-container"
    >
      <RouterLink :to="`/${locale}/${service.url}`">
        <div class="service-wrapper" :ref="setWrapperRef">
          <div
            class="service-image"
            :style="{
              backgroundImage: `url(${service.imageUrl})`,
            }"
          />
          <h3>{{ service.name }}</h3>
          <p class="text">{{ truncateText(service.description, 245) }}</p>
        </div>
      </RouterLink>
    </ElCol>
  </ElRow>
</template>

<style scoped>
.container {
  margin: 0 64px;
  row-gap: 32px;
}
.service-container {
  padding: 16px;
}
.service-wrapper {
  height: 420px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.75);
  opacity: 0;
  transform: translateY(40px) scale(1);
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;
}
.service-wrapper.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.service-wrapper.visible:hover {
  transform: translateY(0) scale(1.05);
}
.service-image {
  width: 100%;
  min-height: 200px;
  max-height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
a {
  text-decoration: none;
}
h3 {
  margin: 16px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: black;
}
p {
  margin: 0 16px 16px 16px;
  letter-spacing: 0.15px;
  color: #aaaaaa;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  line-clamp: 5;
}

@media only screen and (max-width: 768px) {
  .container {
    margin: 0 5%;
  }
}
</style>
