<template>
  <main class="bg-content w-full h-auto p-2 min-h-[600px] text-slate-200">
    <!-- loading skeleton -->
    <section class="w-full flex items-center justify-between h-20">
      <div v-if="props.loading" class="skeleton !bg-slate-400 w-48 h-5"></div>
      <div v-else class="text-md md:text-2xl font-bold text-slate-800">
        Total <span class="text-sky-600">{{ props.total }}</span> results
      </div>
      <!-- <div class="">
        <div v-if="props.loading" class="skeleton bg-slate-400 w-72 h-12"></div>
        <select
          v-else-if="props.search_documents.length > 0"
          class="select select-ghost bg-slate-200 text-slate-800 font-bold w-[200px] md:w-[400px] max-w-[800px]"
        >
          <option disabled selected>short by</option>
          <option class="text-black">option 1</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
        </select>
      </div> -->
    </section>
    <!-- end loading skeleton -->

    <!-- start contents -->
    <section v-if="props.loading" class="mt-6 capitalize">
      <div
        v-for="(item, idx) in [1, 2, 3, 4]"
        v-bind:key="idx"
        class="!grid !grid-cols-1"
      >
        <div class="w-full block md:flex items-center border-b py-5">
          <div
            class="text-lg w-5/5 md:w-3/5 text-wrap __default_color !text-slate-400"
          >
            <div class="skeleton !bg-slate-400 w-full h-5"></div>
            <div class="skeleton !bg-slate-400 w-40 h-5 mt-2"></div>
          </div>
          <div
            class="w-[0.5px] h-full hidden md:block dark:text-slate-400 bg-gray-300 mx-6"
          ></div>
          <div class="flex w-5/5 md:2/5 justify-between mt-2 md:mt-0">
            <div
              class="flex w-full flex-col justify-between text-sm dark:text-slate-400 text-slate-400"
            >
              <div class="skeleton !bg-slate-400 w-72 h-5"></div>
              <div class="h-4"></div>
              <div class="skeleton !bg-slate-400 w-64 h-5"></div>
            </div>
            <div class="h-full pl-2 md:pl-4 flex flex-col justify-between">
              <button
                class="btn btn-sm btn-success my-1 tooltip tooltip-left"
                data-tip="view details"
              >
                <font-awesome-icon
                  icon="file-alt"
                  class="text-xl text-slate-200"
                />
              </button>
              <button
                class="btn btn-sm btn-info my-1 tooltip tooltip-left"
                data-tip="download"
              >
                <font-awesome-icon
                  icon="download"
                  class="text-xl text-slate-200"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- id data -->
    <section v-else class="mt-6 capitalize">
      <div
        v-for="(item, idx) in props.search_documents"
        v-bind:key="idx"
        class="!grid !grid-cols-1"
      >
        <ItemCard :item="item" :idx="idx" />
      </div>
    </section>

    <!-- show not fund -->
    <section
      class="h-screen w-full flex items-start justify-center text-2xl py-5 text-slate-500"
      v-if="props.search_documents?.length === 0 && props.loading === false"
    >
      <div class="flex items-center justify-center flex-col">
        <img
          src="../assets/images/document-data-file-not-found-con.png"
          class="object-contain w-[500px] mt-10 md:mt-20"
        />
        <h1
          class="text-xl md:text-3xl text-center font-bold mt-4 text-slate-500"
        >
          Results Not Found!
        </h1>
      </div>
    </section>
    <!-- end -->
  </main>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useGlobalDocument } from "../store/document";
const ItemCard = defineAsyncComponent(
  () => import("../components/ItemCard.vue")
);
const modalDownload = ref<any>(0);
const props = useGlobalDocument();
const route = useRoute();

const openModal = (idx: number) => {
  const modal: any = document.getElementById("modal" + idx);
  if (modal) {
    modal.showModal();
  }
};
const closeModal = (idx: number) => {
  const modal: any = document.getElementById("modal" + idx);
  if (modal) {
    modal.close();
  }
};

const searchDocument = () => {
  props.SearchDocumentContent(route.query);
};

searchDocument();

const handleClickDetail = (id: any) => {
  window.location.pathname = `document/${id}`;
};

const formatDate = (timestamp: any) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: any = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
</script>

<style>
.bg-content {
  font-family: "Noto Sans Khmer", sans-serif;
}
</style>