import './assets/main.css'
import 'element-plus/theme-chalk/display.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { MotionPlugin } from '@vueuse/motion'
import { i18n } from './i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(ElementPlus)
app.use(MotionPlugin)

router.afterEach((to) => {
  const lang = to.path.startsWith('/en')
    ? 'en'
    : to.path.startsWith('/de')
      ? 'de'
      : to.path.startsWith('/it')
        ? 'it'
        : 'hr'
  document.documentElement.lang = lang
})

app.mount('#app')
