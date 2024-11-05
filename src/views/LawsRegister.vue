<template>
  <div ref="scrollContainer" class="bg-content w-full h-auto p-2 min-h-[90vh] text-slate-200 mt-0 md:mt-10">
    <!-- loading skeleton -->
    <section class="w-full flex items-center justify-between h-1 lg:h-20" v-if="legal.loading">
      <div class="skeleton !bg-slate-400 w-48 h-5"></div>
    </section>
    <!-- end loading skeleton -->

    <!-- start contents -->
    <section v-if="legal.loading" class="mt-6 capitalize">
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
            <div class="h-full pl-2 md:pl-4 flex flex-col justify-between">
              <!-- <button class="btn btn-sm btn-success my-1 tooltip tooltip-left" data-tip="view details">
                <font-awesome-icon icon="file-alt" class="text-xl text-slate-200" />
              </button>
              <button class="btn btn-sm btn-info my-1 tooltip tooltip-left" data-tip="download">
                <font-awesome-icon icon="download" class="text-xl text-slate-200" />
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="mt-1 capitalize">
      <hr />
      <div class="flex justify-between items-center py-4">
        <div class="text-slate-800 font-bold text-xl md:text-2xl px-2">
          តារាងបញ្ជីលិខិតបទដ្ឋានគតិយុត្តដែលទើបបានធ្វើបច្ចុប្បន្នភាព
        </div>
      </div>
      <hr />
      <div class="flex flex-col lg:p-5">
        <div class="text-slate-800 font-bold text-md md:text-xl px-2 border-l-4 border-blue-500 mb-5">
          តារាងបញ្ជីលិខិតបទដ្ឋានគតិយុត្តសរុប
        </div>
        <div class="flex text-slate-700 overflow-x-auto">
          <table class="table-fixed overflow-scroll w-full border-collapse border border-slate-500">
            <thead>
              <tr class="bg-slate-100 text-xs md:text-md">
                <th class="border border-slate-500 text-center w-[40px] py-4">ល.រ</th>
                <th class="border border-slate-500 w-[400px]">ឈ្មោះផ្លូវការ</th>
                <th class="border border-slate-500 w-[200px] md:w-[120px]">លេខ និងកាលបរិច្ឆេទ</th>
                <th class="border border-slate-500 w-[100px]">ឈ្មោះហៅកាត់</th>
                <th class="border border-slate-500 w-[80px]">ផ្សេងៗ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(law, idx) in legal.update_legal" :key="idx">
                <td class="border border-slate-500 text-center">{{ arabicToKhmer(idx+1) }}</td>
                <td class="border border-slate-500 w-[400px] p-2">{{ law.officialName }}</td>
                <td class="border border-slate-500 text-center w-[120px] p-2">{{ law.numberAndDate }}</td>
                <td class="border border-slate-500 text-center w-[80px]">{{ law.abbreviatedName }}</td>
                <td class="border border-slate-500 text-center w-[80px]" v-html="law.additionalInformation"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
  <div v-if="legal.load_more" class="w-full flex items-center justify-center py-3">
        <span class="loading loading-spinner !w-[2rem] text-sky-500"></span>
  </div>
</template>

<script setup lang="ts">
import { dummyDocumentStore } from "../store/dummyDocumentStore";
import { useUpdateLegal } from "../store/updateLaw";
import { useGlobalDocument } from "../store/document";
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from "vue";
import {arabicToKhmer} from "../helper/khmer_number"
const props = useGlobalDocument();
const legal = useUpdateLegal();
const dummyDocuments = dummyDocumentStore();
const scrollContainer = ref<any>(null);
const handleScroll = async () => {
  const container: any = scrollContainer.value;
  const bottomOffset = container.scrollHeight - container.clientHeight - container.scrollTop;
  if (bottomOffset < 100) {
    if (legal.total == legal.update_legal.length || legal.load_more == true) {
      return;
    }
    await legal.loadMore()
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
onMounted(() => {
  legal.getAllUpdateLaw();
})

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
  font-family: Battambang,KhmerMoul;
  src: url("../fonts/Battambang.ttf");
}

@font-face {
  font-family: KhmerMoul;
  src: url("../assets/fonts/KhmerOSMoul.ttf");
}

tr th {
  font-family: KhmerMoul !important;
}
.d_font {
  font-family: Battambang;
}
.bg-content {
  font-family: Battambang;
}
table th, table td {
  /* text-align: center; */
}
</style>
