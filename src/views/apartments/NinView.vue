<script setup>
import Apartment from '@/components/shared/Profile.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const srcList = [
  '/images/nin/main.jpg',
  '/images/nin/submain.jpg',
  '/images/nin/1.jpg',
  '/images/nin/2.jpg',
  '/images/nin/3.jpg',
  '/images/nin/4.jpg',
  '/images/nin/5.jpg',
  '/images/nin/6.jpg',
  '/images/nin/7.jpg',
  '/images/nin/8.jpg',
  '/images/nin/9.jpg',
  '/images/nin/10.jpg',
  '/images/nin/11.jpg',
  '/images/nin/12.jpg',
  '/images/nin/13.jpg',
  '/images/nin/14.jpg',
  '/images/nin/15.jpg',
  '/images/nin/16.jpg',
  '/images/nin/17.jpg',
  '/images/nin/18.jpg',
  '/images/nin/19.jpg',
  '/images/nin/20.jpg',
  '/images/nin/21.jpg',
]
const reviews = computed(() => {
  return [
    {
      name: 'Petra',
      country: t('apartment.reviews.nin.review1country'),
      message: t('apartment.reviews.nin.review1'),
    },
    {
      name: 'Iosif',
      country: t('apartment.reviews.nin.review2country'),
      message: t('apartment.reviews.nin.review2'),
    },
    {
      name: 'Marek',
      country: t('apartment.reviews.nin.review3country'),
      message: t('apartment.reviews.nin.review3'),
    },
    {
      name: 'Bence',
      country: t('apartment.reviews.nin.review4country'),
      message: t('apartment.reviews.nin.review4'),
    },
    {
      name: 'Marija',
      country: t('apartment.reviews.nin.review5country'),
      message: t('apartment.reviews.nin.review5'),
    },
  ]
})
</script>

<template>
  <main>
    <Apartment name="nin" :src-list="srcList" :reviews="reviews" />
  </main>
</template>
