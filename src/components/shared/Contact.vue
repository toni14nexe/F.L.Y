<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import FacebookIcon from '../icons/FacebookIcon.vue'
import InstagramIcon from '../icons/InstagramIcon.vue'

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
    <div class="contact-container scroll-fade" :ref="setSectionRefs">
      <h1>{{ t('aboutUs.contact.title') }}</h1>
      <p>{{ t('aboutUs.contact.text') }}</p>
      <p>
        {{ t('aboutUs.contact.phone') }}
        <a href="tel:+385959181045">+385 95 9181 045</a>
      </p>
      <p>
        {{ t('aboutUs.contact.email') }}
        <a href="mailto:ivanakovacevplc@gmail.com">ivanakovacevplc@gmail.com</a>
      </p>
      <p>{{ t('aboutUs.contact.location') }}</p>
      <p>
        <ElRow align="middle">
          <ElIcon :size="22">
            <InstagramIcon color="#833AB4" class="facebook-icon" />
          </ElIcon>
          <a
            href="https://www.instagram.com/kovacev.i"
            target="_blank"
            class="facebook-link"
          >
            {{ t('aboutUs.contact.instagram') }}
          </a>
        </ElRow>
      </p>
      <p>
        <ElRow align="middle">
          <ElIcon :size="22">
            <FacebookIcon color="#1877F2" class="facebook-icon" />
          </ElIcon>
          <a
            href="https://web.facebook.com/ivana.kovacev.18"
            target="_blank"
            class="facebook-link"
          >
            {{ t('aboutUs.contact.facebook') }}
          </a>
        </ElRow>
      </p>
    </div>
  </main>
</template>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: rgba(0,0,0,0.95);
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
.facebook-link {
  margin-left: 8px;
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
a {
  color: white;
}

@media only screen and (max-width: 768px) {
  .contact-container {
    padding: 5%;
  }
}

@media only screen and (max-width: 991px) {
  .facebook-icon {
    width: 18px;
    height: 18px;
  }
  .facebook-link {
    margin-left: 4px;
  }
  h1 {
    font-size: 24px;
  }
  p {
    font-size: 14px;
  }
}
</style>
