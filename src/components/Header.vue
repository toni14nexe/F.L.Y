<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LogoIcon from './icons/LogoIcon.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'
import { useI18n } from 'vue-i18n'

const languages = [
  { value: 'en', label: 'EN', flag: '/lang/en.svg' },
  { value: 'hr', label: 'HR', flag: '/lang/hr.svg' },
  { value: 'slo', label: 'SLO', flag: '/lang/slo.svg' },
  { value: 'de', label: 'DE', flag: '/lang/de.svg' },
  { value: 'it', label: 'IT', flag: '/lang/it.svg' },
]
const { t, locale } = useI18n()
const language = ref(localStorage.getItem('locale') || '/en')
const route = useRoute()
const router = useRouter()
const isMobileDrawerMenuOpen = ref(false)

watch(
  () => route.path,
  () => (isMobileDrawerMenuOpen.value = false),
)

function changeLanguage(value) {
  const currentPath = route.fullPath
  const segments = currentPath.split('/')

  segments[1] = value
  const newPath = segments.join('/')
  localStorage.setItem('locale', value)
  locale.value = value
  router.push(newPath)
}

function localizedPath(path) {
  return `/${locale.value}${path}`
}
</script>

<template>
  <!-- DESKTOP VERSION -->
  <header class="hidden-sm-and-down">
    <ElRow class="menu">
      <ElCol :span="11" class="menu-wrapper">
        <RouterLink
          :to="localizedPath('/')"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/' }"
          v-motion-slide-left
          :duration="1500"
          :delay="1200"
          >{{ t('header.home') }}</RouterLink
        >
        <RouterLink
          :to="localizedPath('/news')"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/news' }"
          v-motion-slide-left
          :duration="1500"
          :delay="900"
          >{{ t('header.news') }}</RouterLink
        >
        <RouterLink
          :to="localizedPath('/services')"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/services' }"
          v-motion-slide-left
          :duration="1500"
          :delay="600"
          >{{ t('header.services') }}</RouterLink
        >
      </ElCol>
      <ElCol :span="2" align="center" v-motion-fade :duration="1500" :delay="1200">
        <ElIcon class="logo-wrapper">
          <RouterLink :to="localizedPath('/')">
            <LogoIcon class="logo" />
          </RouterLink>
        </ElIcon>
      </ElCol>
      <ElCol :span="11" align="end" class="menu-wrapper">
        <RouterLink
          :to="localizedPath('/about')"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/about' }"
          v-motion-slide-right
          :duration="1500"
          :delay="1200"
          >{{ t('header.aboutUs') }}</RouterLink
        >
        <RouterLink
          :to="localizedPath('/contact')"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/contact' }"
          v-motion-slide-right
          :duration="1500"
          :delay="600"
          >{{ t('header.contact') }}</RouterLink
        >
        <ElSelect
          v-model="language"
          style="width: 90px"
          v-motion-slide-right
          :duration="1500"
          :delay="300"
          @change="changeLanguage"
        >
          <template #prefix>
            <img :key="locale" :src="`/lang/${locale}.svg`" class="flag-icon" />
          </template>
          <ElOption
            v-for="lang in languages"
            :key="lang.value"
            :label="lang.label"
            :value="lang.value"
          >
            <span style="display: flex; align-items: center">
              <img :src="lang.flag" alt="flag" class="flag-icon" style="margin-right: 8px" />
              {{ lang.label }}
            </span>
          </ElOption>
        </ElSelect>
      </ElCol>
    </ElRow>
  </header>

  <!-- MOBILE VERSION -->
  <header class="hidden-md-and-up" v-motion-slide-top :duration="1000">
    <ElRow class="mobile-header" justify="space-between" align="middle">
      <ElCol :span="8" v-motion-slide-top :duration="1000" :delay="500">
        <ElIcon size="28" class="hamburger-icon" @click="isMobileDrawerMenuOpen = true">
          <HamburgerIcon color="#777777" />
        </ElIcon>
      </ElCol>
      <ElCol :span="8" align="center" v-motion-slide-top :duration="1000" :delay="1000">
        <RouterLink :to="localizedPath('/')">
          <LogoIcon color="#777777" style="height: 40px; width: auto" />
        </RouterLink>
      </ElCol>
      <ElCol :span="8" align="end" v-motion-slide-top :duration="1000" :delay="1500">
        <ElDropdown placement="left" :key="locale">
          <ElButton style="height: 40px; padding: 0 !important">
            <img :src="`/lang/${locale}.svg`" class="mobile-flag-icon" />
          </ElButton>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem v-for="lang in languages" @click="changeLanguage(lang.value)">
                <span style="display: flex; align-items: center">
                  <img :src="lang.flag" alt="flag" class="flag-icon" />
                </span>
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </ElCol>
    </ElRow>
  </header>

  <!-- MOBILE DRAWER -->
  <ElDrawer v-model="isMobileDrawerMenuOpen" direction="ltr" size="100%">
    <template #header>
      <ElRow>
        <h3 class="drawer-title">{{ t('title') }}</h3>
      </ElRow>
    </template>

    <template #default>
      <div class="drawer-container">
        <RouterLink
          :to="localizedPath('/')"
          class="el-button drawer-button"
          :class="{
            'el-button--primary': 'index' === route.name,
          }"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            {{ t('header.home') }}
          </ElRow>
        </RouterLink>
        <RouterLink
          :to="localizedPath('/apartments')"
          class="el-button drawer-button"
          :class="{
            'el-button--primary': 'index' === route.name,
          }"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            {{ t('header.news') }}
          </ElRow>
        </RouterLink>
        <RouterLink
          :to="localizedPath('/services')"
          class="el-button drawer-button"
          :class="{
            'el-button--primary': 'services' === route.name,
          }"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            {{ t('header.services') }}
          </ElRow>
        </RouterLink>
        <RouterLink
          :to="localizedPath('/about')"
          class="el-button drawer-button"
          :class="{
            'el-button--primary': 'index' === route.name,
          }"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            {{ t('header.aboutUs') }}
          </ElRow>
        </RouterLink>
        <RouterLink
          :to="localizedPath('/contact')"
          class="el-button drawer-button"
          :class="{
            'el-button--primary': 'index' === route.name,
          }"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            {{ t('header.contact') }}
          </ElRow>
        </RouterLink>
      </div>
    </template>

    <template #footer>
      <ElRow justify="center" align="middle" class="">
        <ElButton
          class="w-100 drawer-button"
          type="primary"
          plain
          @click="isMobileDrawerMenuOpen = false"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            {{ t('header.close') }}
          </ElRow>
        </ElButton>
      </ElRow>
    </template>
  </ElDrawer>
</template>

<style scoped>
header {
  opacity: 0.85;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* DESKTOP VERSION */
.menu {
  height: 150px;
  padding: 0 24px;
}
.menu-wrapper {
  margin: auto 0 auto 0;
}
.big-link {
  position: relative;
  margin-right: 16px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  color: goldenrod;
  letter-spacing: 1.2px;
}
.big-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0;
  height: 2px;
  background-color: goldenrod;
  transition: width 200ms ease-in-out;
}
.big-link:hover::after {
  width: 100%;
}
.active-big-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background-color: goldenrod;
}
.logo-wrapper {
  margin-top: 10px;
  height: 120px;
  width: 100%;
  color: goldenrod;
}
.logo {
  width: auto;
  height: 85px;
  color: goldenrod;
}
.flag-icon {
  width: 30px;
  height: 22px;
}
svg {
  color: goldenrod;
}
button {
  background-color: transparent;
}

@media (max-width: 1350px) {
  .menu {
    height: 70px;
  }
  .big-link {
    font-size: 14px;
  }
  .logo-wrapper {
    height: 60px;
    width: 100%;
    color: goldenrod;
  }
  .logo {
    height: 55px;
    color: goldenrod;
  }
}

/* MOBILE VERSION */

.mobile-header {
  height: 60px;
  padding: 8px 16px;
}
.hamburger-icon {
  cursor: pointer;
}
.mobile-flag-icon {
  height: 40px;
}
.drawer-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.drawer-title {
  color: goldenrod;
  font-weight: 700;
}
.drawer-button {
  --el-color-primary: goldenrod;
  --el-button-hover-border-color: goldenrod;
  height: 45px;
  font-weight: 700;
  text-decoration: none;
  margin: 0 !important;
  border-radius: 8px;
  background-color: black;
  color: goldenrod;
}
.drawer-button:hover {
  background-color: black;
  color: goldenrod;
}
.drawer-button-text-wrapper {
  width: 100%;
  gap: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
