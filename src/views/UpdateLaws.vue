<script setup lang="ts">
import { defineAsyncComponent, onMounted, onBeforeUnmount, watch, watchEffect, onUnmounted } from 'vue';
import LawItem from "../components/UpdateLaw/LawItem.vue";
import { useGlobalDocument } from "../store/document";
import { useLastUpdate } from "../store/dateLastUpdate";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { formatDateToKhmer } from '../helper/khmerDateFormat';
import moment from 'moment';
const props = useGlobalDocument();
const LastUpdate = useLastUpdate();
const route = useRoute();
const query = ref<any|number>('');
const dateFilter = ref<any>('')
const DateNow:any = new Date()
onMounted(async() => {
  query.value = route.query
  await props.getAllDocuments(route?.query)
  await LastUpdate.getLastUpdateDate();
  if(query.value.date){
    const date = moment(query.value.date, "YYYY-MM-DD");
    let Datenow = moment(DateNow,'YYYY-MM-DD').unix()
    const timestamp = date.unix();
    if(timestamp){
      dateFilter.value = timestamp
      }else {
      dateFilter.value = Datenow
    }
  }
});

const lateUpdateDate = (date:any) => {
  let Date:any = moment.unix(date)
  Date.subtract(30,'days')
  return moment(Date).unix()
}

const scrollContainer = ref<any>(null);
const handleScroll = async () => {
  const container:any = scrollContainer.value;
  const bottomOffset = container.scrollHeight - container.clientHeight - container.scrollTop;
  if (bottomOffset < 100) {
    if(props.total == props.all_documents.length || props.load_more == true){
      return;
    }
    if(query.value.date){
      await props.loadMore(query.value)
    }else {
      await props.loadMore('')
    }
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
<template>
  <div ref="scrollContainer" class="bg-content w-full h-auto p-2 min-h-[50vh] text-slate-200 mt-0 md:mt-10">
    <!-- loading skeleton -->
    <section class="w-full flex items-center justify-between h-1 lg:h-20" v-if="props.loading">
      <div class="skeleton !bg-slate-400 w-48 h-5"></div>
    </section>
    <!-- end loading skeleton -->

    <!-- start contents -->
    <section v-if="props.loading || LastUpdate.loading" class="mt-6 capitalize">
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
          លិខិតបទដ្ឋានគតិយុត្តដែលទើបបានធ្វើបច្ចុប្បន្នភាព
        </div>
      </div>
      <hr />
      <div class="flex flex-col lg:p-5">
        <div class="text-slate-700" v-show="query != ''">
          <span v-if="query && ! query.date">បានធ្វើបច្ចុប្បន្នភាព១ខែចុងក្រោយ : </span>
          <span v-else>បានធ្វើបច្ចុប្បន្នភាព : </span>
          <span v-if="query && ! query.date">
            {{
              LastUpdate.last_update_date ? formatDateToKhmer(lateUpdateDate(LastUpdate.last_update_date)): '' 
            }}
            <span class="">ដល់</span>
            {{
              
              LastUpdate.last_update_date ? formatDateToKhmer(LastUpdate.last_update_date): '' 
            }}
          </span>
          <span v-else>
            {{ 
              formatDateToKhmer(dateFilter||123456789) 
            }}
          </span>
        </div>
        <div v-if="props.loading" class="flex flex-col justify-between lg:flex-row ">
          <div class="text-slate-700 text-2xl font-extrabold">{{props.search_documents.length}} items</div>
          <div class="flex items-center gap-3 text-slate-700 font-extrabold">
            <span>Bulk download of XML by update date</span>
            <font-awesome-icon :icon="['fas', 'download']" />
          </div>
        </div>
        <div v-if="props.all_documents.length > 0 && !props.loading" class="flex flex-col gap-3 py-5 text-sm">
          <LawItem v-for="(item, idx) in props.all_documents" v-bind:key="idx" :item="item" />
        </div>
      </div>
    </section>
    <div v-if="props.load_more" class="w-full flex items-center justify-center py-3">
      <span class="loading loading-spinner !w-[2rem] text-sky-500"></span>
    </div>
  </div>
</template>

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

.highlight {
  color: #1E40AF !important;
  background-color: rgb(155 183 242) !important;
  /* Change the color to whatever you like */
}
</style>
