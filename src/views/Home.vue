<template>
  <!-- <TopFIlter v-if="props.all_categories?.length" /> -->
  <div class="bg-content w-full h-auto p-2 text-slate-200 mt-0 md:mt-10">

    <section class="mt-1 capitalize">
      <hr />
      <div class="flex justify-between items-center py-4">
        <div class="text-slate-800 font-bold text-2xl border-l-4 border-blue-500 px-2">
          សេចក្តីជូនដំណឹង
        </div>
        <span class="text-blue-600 font-bold text-lg"><font-awesome-icon :icon="['fas', 'list']" /><a href="/news" class="text-blue-600 font-bold text-lg link hover:text-blue-900 px-2">មើលបន្ថែម</a></span>
      </div>
      <hr />
      <!-- vue loop array -->
      <div v-if="Posts.loading" class="w-full flex flex-col items-center min-h-[400px]">
        <div class="my-6 w-3/4 relative flex items-end flex-col justify-end">
          <div class="skeleton bg-slate-400 w-full h-5"></div>
          <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
        </div>
        <div class="my-6 w-3/4 relative flex items-end flex-col justify-end">
          <div class="skeleton bg-slate-400 w-full h-5"></div>
          <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
        </div>
        <div class="my-6 w-3/4 relative flex items-end flex-col justify-end">
          <div class="skeleton bg-slate-400 w-full h-5"></div>
          <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
        </div>
      </div>
      <NoticeItem v-else-if="Posts.source_items.length > 0" v-for="(item, idx) in Posts.source_items" v-bind:key="idx" :item="item" />
    </section>
    <!-- end -->
    <section>
      <div class="flex flex-col lg:flex-row justify-between py-10 px-5 gap-5">
        <SourceItem :item="dummyDocuments.sources" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useGlobalDocument } from "../store/document";
import { usePost } from "../store/Post";
import { dummyDocumentStore } from "../store/dummyDocumentStore";
import { onMounted } from "vue";

import NoticeItem from "../components/NoticeItem.vue";

import SourceItem from "../components/Home/SourceItem.vue";

const props = useGlobalDocument();
const Posts = usePost();

const dummyDocuments = dummyDocumentStore();

onMounted(async() => {
  await Posts.getSourceItemPost();
})
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
</style>
