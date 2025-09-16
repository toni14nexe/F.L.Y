<script setup>
import Apartment from '@/components/shared/Profile.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const srcList = [
  '/images/arena/main.jpg',
  '/images/arena/submain.jpg',
  '/images/arena/1.jpg',
  '/images/arena/2.jpg',
  '/images/arena/3.jpg',
  '/images/arena/4.jpg',
  '/images/arena/5.jpg',
  '/images/arena/6.jpg',
  '/images/arena/7.jpg',
  '/images/arena/8.jpg',
  '/images/arena/9.jpg',
  '/images/arena/10.jpg',
  '/images/arena/11.jpg',
  '/images/arena/12.jpg',
  '/images/arena/13.jpg',
  '/images/arena/14.jpg',
  '/images/arena/15.jpg',
  '/images/arena/16.jpg',
  '/images/arena/17.jpg',
  '/images/arena/18.jpg',
  '/images/arena/19.jpg',
]
const reviews = computed(() => {
  return [
    {
      name: 'Prolić',
      country: t('apartment.reviews.arena.review1country'),
      message: t('apartment.reviews.arena.review1'),
    },
    {
      name: 'Alma',
      country: t('apartment.reviews.arena.review2country'),
      message: t('apartment.reviews.arena.review2'),
    },
    {
      name: 'Jakša',
      country: t('apartment.reviews.arena.review3country'),
      message: t('apartment.reviews.arena.review3'),
    },
    {
      name: 'Jelena',
      country: t('apartment.reviews.arena.review4country'),
      message: t('apartment.reviews.arena.review4'),
    },
    {
      name: 'Antun',
      country: t('apartment.reviews.arena.review5country'),
      message: t('apartment.reviews.arena.review5'),
    },
  ]
})
</script>

<template>
  <main>
    <Apartment name="arena" :src-list="srcList" :reviews="reviews" />
  </main>
</template>
