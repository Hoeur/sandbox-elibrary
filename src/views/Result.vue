<template>
  <div ref="scrollContainer" class="bg-content w-full h-auto p-2 min-h-[50vh] text-slate-200 mt-0 md:mt-10">
    <!-- loading skeleton -->
    <section class="w-full flex items-center justify-between h-1 lg:h-20" v-if="props.loading">
      <div class="skeleton !bg-slate-400 w-48 h-5"></div>
    </section>
    <!-- end loading skeleton -->

    <!-- start contents -->
    <section v-if="props.loading" class="mt-6 capitalize">
      <div v-for="(item, idx) in [1, 2, 3, 4]" v-bind:key="idx" class="!grid !grid-cols-1">
        <div class="w-full block md:flex items-center border-b py-5">
          <div class="text-lg w-5/5 md:w-3/5 text-wrap __default_color dark:text-slate-500">
            <div class="skeleton !bg-slate-400 w-full h-5"></div>
            <div class="skeleton !bg-slate-400 w-40 h-5 mt-2"></div>
          </div>
          <div class="w-[0.5px] h-full hidden md:block dark:text-slate-400 bg-gray-300 mx-6"></div>
          <div class="flex w-5/5 md:2/5 justify-between mt-2 md:mt-0">
            <div class="flex w-full flex-col justify-between text-sm dark:text-slate-400 text-slate-400">
              <div class="skeleton !bg-slate-400 w-72 h-5"></div>
              <div class="h-4"></div>
              <div class="skeleton !bg-slate-400 w-64 h-5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="mt-1 capitalize">
      <hr />
      <div class="flex justify-between items-center py-4">
        <div class="text-slate-800 font-bold text-2xl px-2">
          សរុប <span class="font-bold">{{ props.total ? arabicToKhmer(props.total):0 }} </span> ឯកសារ
        </div>
      </div>
      <hr />
      <div class="flex flex-col lg:p-5">
        <!-- <div class="text-slate-700">បានធ្វើបច្ចុប្បន្នភាព : ថ្ងៃទី០៦ ខែឧសភា ឆ្នាំ​១៩៨៥ </div> -->
        <div v-if="props.loading" class="flex flex-col justify-between lg:flex-row py-5">
        </div>
        <div v-else class="flex flex-col gap-3">
          <LawItem v-for="(item, idx) in props.search_documents" v-bind:key="idx" :item="item" />
        </div>
      </div>
      <div v-if="props.load_more" class="w-full flex items-center justify-center py-3">
          <span class="loading loading-spinner !w-[2rem] text-sky-500"></span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { dummyDocumentStore } from "../store/dummyDocumentStore";
import { useGlobalDocument } from "../store/document";
import { defineAsyncComponent, onMounted, onBeforeUnmount, watchEffect, watch } from 'vue';
import LawItem from "../components/UpdateLaw/LawItem.vue";
import {arabicToKhmer} from '../helper/khmer_number'
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const props = useGlobalDocument();
const dummyDocuments = dummyDocumentStore();
const route = useRoute();

const searchDocument = async () => {
  await props.SearchDocumentContent(route.query);
};

onMounted(async() => {
  await searchDocument();
})


const scrollContainer = ref<any>(null);
const handleScroll = async () => {
  const container: any = scrollContainer.value;
  const bottomOffset = container.scrollHeight - container.clientHeight - container.scrollTop;
  if (bottomOffset < 100) {
    if (props.total == props.search_documents.length || props.load_more == true) {
      return;
    }
    await props.SearchLoadMore(route.query)
  }
}

// Debounce function
const debounce = (func: any, delay: any) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debouncedHandleScroll = debounce(handleScroll, 500); // 300ms debounce delay

onMounted(() => {
  window.addEventListener("scroll", debouncedHandleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", debouncedHandleScroll);
});
</script>

<style>
@font-face {
  font-family: Battambang;
  src: url("./fonts/Battambang.ttf");
}

.d_font {
  font-family: Battambang;
}

.bg-content {
  font-family: Battambang;
}

.highlight_text {
  color: #1E40AF !important;
  background-color: rgb(155 183 242) !important;
  /* Change the color to whatever you like */
}
</style>
