
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Header from '@/components/Header.vue';

import axios from "axios";
import { useRoute } from "vue-router";
import { defineAsyncComponent, onBeforeUnmount } from "vue";

import { onBeforeMount, onMounted, ref } from "vue";
const scTimer = ref<any>(0);
const scY = ref<number>(0);
const route = useRoute();
const changeLayout = () => {
  const page = route
  if (page.name == 'document'){
    return false
    
  }
  return true;
}

const handleScroll = () => {
  if (scTimer.value) return;
  scTimer.value = setTimeout(() => {
    scY.value = window.scrollY;
    clearTimeout(scTimer.value);
    scTimer.value = 0;
  }, 100);
};

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => changeLayout)
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div v-if="changeLayout()" class="bg-white">
    <!-- header component -->
    <Header></Header>
    <!-- end header component -->
    <main class="w-full overflow-hidden min-h-[500px]">
      <!-- route content -->
      <RouterView />
      <!-- end route content -->
    </main>
    <!-- footer component -->
    <Footer></Footer>
    <!-- end footer component -->
    <transition name="fade">
      <div id="pagetop" class="fixed right-2 bottom-5 bg-sky-500 rounded-full p-2 cursor-pointer" v-show="scY > 300"
        @click="toTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
          stroke-width="2" stroke-linecap="square">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>
    </transition>
  </div>
  <div v-else class="bg-white min-h-[500px]">
    <RouterView />
    <transition name="fade">
      <div id="pagetop" class="fixed right-2 bottom-5 bg-sky-500 rounded-full p-2 cursor-pointer" v-show="scY > 300"
        @click="toTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
          stroke-width="2" stroke-linecap="square">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>
    </transition>
  </div>
</template>

<style scoped>
</style>
