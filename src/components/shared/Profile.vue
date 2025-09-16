<script setup>
import PageTitle from '@/components/shared/PageTitle.vue'
import TextWithSideImage from '@/components/shared/TextWithSideImage.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FacebookIcon from '../icons/FacebookIcon.vue'
import LogoIcon from '../icons/LogoIcon.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

const props = defineProps(['name', 'rentlioLink', 'facebookLink', 'srcList', 'reviews'])

const dialog = ref({ isOpen: false, imageUrl: '' })

function openDialog(imageUrl) {
  dialog.value = {
    isOpen: true,
    imageUrl,
  }
}

function switchToPrevImage() {
  const currentIndex = props.srcList.indexOf(dialog.value.imageUrl)
  const prevIndex = currentIndex === 0 ? props.srcList.length - 1 : currentIndex - 1
  dialog.value.imageUrl = props.srcList[prevIndex]
}

function switchToNextImage() {
  const currentIndex = props.srcList.indexOf(dialog.value.imageUrl)
  const nextIndex = currentIndex === props.srcList.length - 1 ? 0 : currentIndex + 1
  dialog.value.imageUrl = props.srcList[nextIndex]
}

const { t, locale } = useI18n()
const apartmentDescription = computed(() =>
  t(`apartment.accommodation.${props.name}`).replace(/\n/g, '<br>'),
)
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
  <PageTitle :title="t(`offer.${[name]}.title`)" />

  <div class="apartment-mobile-image-container apartment-scroll-fade" :ref="setSectionRefs">
    <img :src="`/images/${name}/main.jpg`" />
  </div>

  <TextWithSideImage
    :title="t('apartment.reservation.title')"
    :text="t('apartment.reservation.subtitle')"
    :rentlio-link="rentlioLink"
    :facebook-link="facebookLink"
    :src="`/images/${name}/submain.jpg`"
    :apartment-page="true"
  />

  <div style="display: flex" class="apartment-scroll-fade" :ref="setSectionRefs">
    <PageTitle
      :title="
        name === 'restaurant' ? t('home.whatWeOffer.bigTitle') : t('apartment.accommodation.title')
      "
    />
    <LogoIcon class="title-icon" color="white" />
  </div>

  <div class="apartment-container apartment-scroll-fade" :ref="setSectionRefs">
    <p v-html="apartmentDescription" />
    <ElRow justify="center" style="gap: 24px">
      <ElCol :xs="24" :sm="3" :md="2" align="center">
        <RouterLink :to="`/${locale}/contact`">
          <ElButton size="large" plain>
            {{ t('apartment.reservation.contact') }}
          </ElButton>
        </RouterLink>
      </ElCol>
      <ElCol :span="2" class="hidden-xs-only" />
      <ElCol v-if="rentlioLink" :xs="24" :sm="3" :md="2" align="center">
        <a :href="rentlioLink" target="_blank">
          <ElButton size="large" plain>
            {{ t('apartment.reservation.book') }}
          </ElButton>
        </a>
      </ElCol>
      <ElCol v-if="facebookLink" :xs="24" :sm="3" :md="2" align="center">
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
  </div>

  <PageTitle :title="t('apartment.gallery')" />
  <div>
    <ElRow :gutter="20" justify="center" class="gallery-container">
      <ElCol
        v-for="(src, index) in srcList"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        align="center"
      >
        <img :src="src" alt="Gallery image" class="gallery-image" @click="openDialog(src)" />
      </ElCol>
    </ElRow>
  </div>

  <div class="apartment-scroll-fade" :ref="setSectionRefs">
    <ElCarousel
      v-if="reviews && reviews.length"
      class="review-container"
      autoplay
      :interval="5000"
      :pause-on-hover="false"
      v-motion-fade
      :duration="1500"
      :motion-blur="true"
    >
      <ElCarouselItem v-for="review in reviews">
        <div class="review-item">
          <ElRow style="gap: 12px" align="bottom">
            <ElAvatar :size="50"> {{ review.name[0].toUpperCase() }} </ElAvatar>
            <div>
              <h1 style="margin-bottom: -10px">{{ review.name }}</h1>
              <span>{{ review.country }}</span>
            </div>
          </ElRow>
          <p style="margin-top: 12px">{{ review.message }}</p>
        </div>
      </ElCarouselItem>
    </ElCarousel>
  </div>

  <div class="bottom-icon-wrapper apartment-scroll-fade" :ref="setSectionRefs">
    <LogoIcon color="white" class="bottom-icon" />
  </div>

  <ElDialog
    v-model="dialog.isOpen"
    fullscreen
    @keyup.left="switchToPrevImage"
    @keyup.right="switchToNextImage"
  >
    <ElRow justify="center" align="middle" style="height: 92dvh">
      <ElCol :xs="0" :sm="1">
        <ElIcon class="gallery-arrow-wrapper" @click="switchToPrevImage">
          <ArrowLeftBold />
        </ElIcon>
      </ElCol>
      <ElCol :xs="24" :sm="22" align="center" style="display: flex">
        <ElIcon
          class="gallery-arrow-wrapper hidden-sm-and-up"
          @click="switchToPrevImage"
          style="left: 5px"
        >
          <ArrowLeftBold />
        </ElIcon>
        <img :src="dialog.imageUrl" alt="Gallery image" style="margin: 0 auto" />
        <ElIcon
          class="gallery-arrow-wrapper hidden-sm-and-up"
          @click="switchToNextImage"
          style="right: 5px"
        >
          <ArrowRightBold />
        </ElIcon>
      </ElCol>
      <ElCol :xs="0" :sm="1" align="end">
        <ElIcon class="gallery-arrow-wrapper" @click="switchToNextImage">
          <ArrowRightBold />
        </ElIcon>
      </ElCol>
    </ElRow>
  </ElDialog>
</template>
