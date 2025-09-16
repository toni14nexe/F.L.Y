<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FacebookIcon from './icons/FacebookIcon.vue'
import LogoIcon from './icons/LogoIcon.vue'
import { useI18n } from 'vue-i18n'
import LockIcon from './icons/LockIcon.vue'
import GraduationIcon from './icons/GraduationIcon.vue'
import UsersIcon from './icons/UsersIcon.vue'
import LeafIcon from './icons/LeafIcon.vue'
import InstagramIcon from './icons/InstagramIcon.vue'

const containerRef = ref(null)
const isVisible = ref(false)
const { t } = useI18n()
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
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
  if (containerRef.value && observer) {
    observer.unobserve(containerRef.value)
  }
})
</script>

<template>
  <footer ref="containerRef">
    <template v-if="isVisible">
      <ElRow>
        <ElCol
          :xs="24"
          :sm="12"
          :md="6"
          align="center"
          class="widget-wrapper"
          v-motion-slide-bottom
          :duration="1000"
        >
          <ElIcon class="icon-wrapper">
            <LockIcon class="icon" />
          </ElIcon>
          <p class="footer-text">{{ t('footer.iconText.icon1') }}</p>
        </ElCol>
        <ElCol
          :xs="24"
          :sm="12"
          :md="6"
          align="center"
          class="widget-wrapper"
          v-motion-slide-bottom
          :duration="1000"
          :delay="250"
        >
          <ElIcon class="icon-wrapper">
            <GraduationIcon class="icon" />
          </ElIcon>
          <p class="footer-text">{{ t('footer.iconText.icon2') }}</p>
        </ElCol>
        <ElCol
          :xs="24"
          :sm="12"
          :md="6"
          align="center"
          class="widget-wrapper"
          v-motion-slide-bottom
          :duration="1000"
          :delay="500"
        >
          <ElIcon class="icon-wrapper">
            <UsersIcon class="icon" />
          </ElIcon>
          <p class="footer-text">{{ t('footer.iconText.icon3') }}</p>
        </ElCol>
        <ElCol
          :xs="24"
          :sm="12"
          :md="6"
          align="center"
          class="widget-wrapper"
          v-motion-slide-bottom
          :duration="1000"
          :delay="750"
        >
          <ElIcon class="icon-wrapper">
            <LeafIcon class="icon" />
          </ElIcon>
          <p class="footer-text">{{ t('footer.iconText.icon4') }}</p>
        </ElCol>
      </ElRow>

      <ElRow style="margin-top: 32px" v-motion-slide-bottom :duration="1000" :delay="1000">
        <ElCol :xs="24" :sm="8">
          <ElRow class="footer-text details-wrapper-left">{{ t('title') }}</ElRow>
          <ElRow class="footer-text details-wrapper-left">{{ t('footer.location.text1') }}</ElRow>
        </ElCol>
        <ElCol :xs="24" :sm="8" align="center">
          <ElIcon class="logo-wrapper">
            <LogoIcon class="logo" />
          </ElIcon>
        </ElCol>
        <ElCol :xs="24" :sm="8">
          <ElRow class="footer-text details-wrapper-right">
            <a href="tel:+385959181045">+385 95 9181 045</a>
          </ElRow>
          <ElRow class="footer-text details-wrapper-right">
            <a href="mailto:ivanakovacevplc@gmail.com">ivanakovacevplc@gmail.com</a>
          </ElRow>
        </ElCol>
      </ElRow>

      <ElRow justify="center" v-motion-slide-top :duration="1000" :delay="1250">
        <a href="https://www.instagram.com/kovacev.i" target="_blank">
          <ElIcon class="media-icon-wrapper">
            <InstagramIcon class="media-icon" />
          </ElIcon>
        </a>
        <a href="https://web.facebook.com/ivana.kovacev.18" target="_blank">
          <ElIcon class="media-icon-wrapper">
            <FacebookIcon class="media-icon" />
          </ElIcon>
        </a>
      </ElRow>

      <ElRow justify="center" class="ending-line" v-motion-slide-top :duration="1000" :delay="1500">
        <p class="footer-text">
          Copyright {{ t('footer.bottomLine.text') }}
          <a href="https://innova-tech.hr/" target="_blank" style="font-weight: 600">{{
            t('footer.bottomLine.urlText')
          }}</a>
        </p>
      </ElRow>
    </template>
  </footer>
</template>

<style scoped>
footer {
  padding: 32px;
  background-color: black;
  opacity: 0.85;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.widget-wrapper {
  padding: 20px;
  color: goldenrod;
}
.icon-wrapper {
  background-color: goldenrod;
  border-radius: 100%;
  padding: 10px;
  width: 80px;
  height: 80px;
  transition: ease-in-out 0.3s;
}
.icon-wrapper:hover {
  background-color: black;
  color: goldenrod;
  transition: ease-in-out 0.3s;
}
svg {
  transition: ease-in-out 0.3s;
}
.icon-wrapper:hover svg {
  color: goldenrod;
  transition: ease-in-out 0.3s;
}
.icon {
  color: white;
  padding: 4px;
  width: 80px;
  height: 80px;
}
a {
  color: goldenrod;
}
.footer-text {
  font-size: 16px;
  letter-spacing: 0.3px;
  color: goldenrod;
}
.details-wrapper-left {
  justify-content: end;
}
.details-wrapper-right {
  justify-content: start;
}
.logo-wrapper {
  width: 180px;
  height: auto;
  color: goldenrod;
}
.logo {
  width: 180px;
  height: auto;
  color: goldenrod;
}
.media-icon-wrapper {
  margin: 8px 8px;
  width: 48px;
  height: 48px;
}
.media-icon {
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 100%;
  border: 2px solid goldenrod;
}
.media-icon:hover {
  background-color: goldenrod;
  color: black;
  transition: ease-in-out 0.3s;
}
svg {
  transition: ease-in-out 0.3s;
}
.media-icon:hover svg {
  transition: ease-in-out 0.3s;
}
.ending-line {
  margin-top: 16px;
  text-align: center;
}

@media (max-width: 768px) {
  .logo-wrapper {
    margin: 32px 0;
  }
  .details-wrapper-left {
    justify-content: center;
  }
  .details-wrapper-right {
    justify-content: center;
  }
}

@media only screen and (max-width: 991px) {
  footer {
    padding: 5%;
  }
}
</style>
