<template>
  <section class="mt-6 capitalize d_font">
    <div class="w-full block md:flex items-center justify-between border-b py-2">
      <div class="text-lg w-full text-wrap __default_color dark:text-slate-800 flex justify-between flex-col">
        <div class="w-auto !text-slate-200 flex">
          <div v-for="(cat, cat_idx) in item.item?.categories" v-bind:key="cat_idx">
            <div class="badge badge-info !text-slate-200 py-3 px-5 mb-2 mr-1">
              {{ cat?.name ? cat?.name : "undefined" }}
            </div>
          </div>
          <div v-if="item.item.categories?.length === 0"
            class="badge !text-slate-200 py-3 px-5 mb-2 mx-1 !bg-slate-500 !border-slate-500">
            no category
          </div>
        </div>
        <a @click="handleClickDetail(item.item.id)" class="link link-hover font-bold __default_color !text-xl">
          {{ item.item.name }}
          <!-- {{ item.item.name }} -->
        </a>
        <div class="text-slate-600 w-auto">សភាពការណ៍រួមរបស់<span class="text-black font-bold">កសិករ</span>កម្ពុជា...
        </div>
        <div class="text-slate-400 text-sm flex mt-4">
          <div class="mr-2">
            {{ $t("post_date") }} {{ formatDate(item.item.date) }}
          </div>
          <div>
            <font-awesome-icon class="__default_color text-sm" :icon="['fas', 'eye']" />
            <span class="text-blue-500 text-sm ml-1">{{
              item.item.views || 0
              }}</span>
          </div>
          <div class="ml-4">
            <font-awesome-icon icon="download" class="__default_color" />
            <span class="text-blue-500 ml-1">{{
              item.item.downloads || 0
              }}</span>
          </div>
        </div>
      </div>
      <div class="w-[0.5px] h-full hidden md:block dark:text-slate-800 bg-gray-300 mx-6"></div>
      <div class="flex w-5/5 md:w-[450px] justify-between mt-2 md:mt-0">
        <div class="flex w-full flex-col justify-center text-sm dark:text-slate-500 text-slate-500">
          <div>
            <!-- {{ $t("last_updated_at") }}:
            {{ formatDate(item.item.date) }} -->
          </div>
          <!-- <div class="h-4"></div> -->
          <!-- <div>Enforcement date: {{ formatDate(item.item.date) }}</div> -->
        </div>
        <div class="h-full float-right pl-2 md:pl-4 flex flex-col justify-between">
          <!-- modal download -->
          <!-- You can open the modal using ID.showModal() method -->
          <div class="flex">
            <!--  -->
            <button class="btn btn-md mr-2 btn-success my-1 tooltip tooltip-left" :data-tip="$t('view_details')"
              @click="openDetailModal(idx)">
              <font-awesome-icon icon="file-alt" class="text-xl text-slate-200" />
            </button>
            <button class="btn btn-md btn-info bg-blue-600 border-blue-600 my-1 tooltip tooltip-left"
              :data-tip="$t('download')" @click="openModal(idx)">
              <font-awesome-icon icon="download" class="text-md text-slate-200" />
            </button>
          </div>
          <!-- modal download  -->
          <dialog ref="modalDownload" :id="'modal' + idx" class="modal top-0 right-0">
            <div class="modal-box !bg-slate-200 text-slate-800">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-red-600"
                  @click="closeModal(idx)">
                  ✕
                </button>
              </form>
              <h3 class="font-bold text-lg">Available Downloads {{ 2 }}</h3>
              <div class="!grid !grid-cols-4 gap-2 my-2">
                <div
                  class="flex items-center justify-center flex-col bg-white shadow-lg cursor-pointer h-24 outline outline-1 outline-red-600 rounded-lg transition-all transform hover:scale-105">
                  <img src="../assets/images/icons8-adobe-acrobat-reader.gif" alt="img-pdf-download" />
                  <p class="text-sm">10kb</p>
                </div>
                <div
                  class="flex items-center justify-center flex-col bg-white shadow-lg cursor-pointer h-24 outline outline-1 outline-red-600 rounded-lg transition-all transform hover:scale-105">
                  <img src="../assets/images/icons8-document.gif" alt="img-pdf-download" />
                  <p class="text-sm">10kb</p>
                </div>
                <!-- <div
                  class="flex items-center justify-center flex-col bg-white shadow-lg cursor-pointer h-24 outline outline-1 outline-red-600 rounded-lg transition-all transform hover:scale-105"
                >
                  <img
                    src="../assets/images/icons8-html.gif"
                    alt="img-pdf-download"
                  />
                  <p class="text-sm">10kb</p>
                </div>
                <div
                  class="flex items-center justify-center flex-col bg-white shadow-lg cursor-pointer h-24 outline outline-1 outline-red-600 rounded-lg transition-all transform hover:scale-105"
                >
                  <img
                    src="../assets/images/icons8-xml.png"
                    alt="img-pdf-download"
                  />
                  <p class="text-sm">10kb</p>
                </div> -->
              </div>
            </div>
          </dialog>
          <!-- end modal download  -->
          <!-- modal detail  -->
          <dialog ref="modalDetail" :id="'detail_modal' + idx" class="modal top-0 right-0">
            <div class="modal-box !bg-slate-200 text-slate-800">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-red-600"
                  @click="closeDetailModal(idx)">
                  ✕
                </button>
              </form>
              <h3 class="font-bold text-lg">Document Details</h3>
              <div class="!grid !grid-cols-1 gap-2 my-2 w-full">
                <div class="text-wrap break-words">title: {{ item.item.name }}</div>
                <div class="flex">
                  <div>Category Type:</div>
                  <div class="w-auto !text-slate-200 flex  flex-wrap">
                    <div v-for="(cat, cat_idx) in item.item?.categories" v-bind:key="cat_idx">
                      <div class="badge badge-info !text-slate-200 py-3 px-5 mb-2 mr-1">
                        {{ cat?.name ? cat?.name : "undefined" }}
                      </div>
                    </div>
                    <div v-if="item.item.categories?.length === 0"
                      class="badge !text-slate-200 py-3 px-5 mb-2 mx-1 !bg-slate-500 !border-slate-500">
                      no category
                    </div>
                  </div>
                </div>
                <div>post date: {{ formatDate(item.item.date) }}</div>
              </div>
            </div>
          </dialog>
          <!-- end modal detail  -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import axios from "axios";
import { computed, onBeforeUnmount, ref } from "vue";
import { useGlobalDocument } from "../store/document";
import { onBeforeMount, onMounted } from "vue";
const item: any = defineProps(["item", "idx"]);
const modalDownload = ref<any>(0);
const modalDetail = ref<any>(0);
// const props = useGlobalDocument();
const openModal = (idx: any) => {
  const modal: any = document.getElementById("modal" + idx);
  if (modal) {
    modal.showModal();
  }
};
const closeModal = (idx: any) => {
  const modal: any = document.getElementById("modal" + idx);
  if (modal) {
    modal.close();
  }
};

const openDetailModal = (idx: any) => {
  const modal: any = document.getElementById("detail_modal" + idx);
  if (modal) {
    modal.showModal();
  }
};
const closeDetailModal = (idx: any) => {
  const modal: any = document.getElementById("detail_modal" + idx);
  if (modal) {
    modal.close();
  }
};

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
@font-face {
  font-family: Battambang;
  src: url('./fonts/Battambang.ttf');
}

.d_font{
  font-family: Battambang;
}
</style>

