import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import LangLayout from '../layouts/LangLayout.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const supportedLocales = ['en', 'hr', 'slo', 'de', 'it']

const routes = [
  {
    path: '/:locale',
    component: LangLayout,
    children: [
      {
        path: '/:locale',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/:locale/about',
        name: 'about',
        component: AboutView,
      },
      {
        path: '/:locale/contact',
        name: 'contact',
        component: ContactView,
      },
    ],
  },
  {
    path: '/',
    redirect: localStorage.getItem('locale') || '/en',
  },
  // Fallback for non existing paths inside locales
  {
    path: '/:locale/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
  // Fallback for completely unknown paths (without locale)
  {
    path: '/:pathMatch(.*)*',
    redirect: localStorage.getItem('locale') || '/en',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 200)
    })
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const savedLocale = localStorage.getItem('locale')
  const locale = savedLocale || to.params.locale || 'en'

  if (!supportedLocales.includes(to.params.locale)) {
    window.location.href = '/'
    localStorage.setItem('locale', 'en')
    return
  }

  if (!supportedLocales.includes(locale)) {
    window.location.href = '/'
    localStorage.setItem('locale', 'en')
    return
  }

  if (i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale
  }

  /* if (locale !== to.params.locale) {
    window.location.href = `/${locale}` + to.fullPath.slice(3)
  } */

  localStorage.setItem('locale', locale)
  next()
})

export default router
