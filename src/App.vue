<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="background-image" />
  <div class="content-wrapper">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin-top: 0;
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 0;
}
.content-wrapper {
  position: relative;
  z-index: 1;
  padding-top: 0;
  background-color: rgba(0, 0, 0, 0.65);
}
</style>
