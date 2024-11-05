<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
const SignIn = defineAsyncComponent(() => import("../auth/SignIn.vue"));
const SignUp = defineAsyncComponent(() => import("../auth/SignUp.vue"));
import { computed } from "vue";
import { useGlobalDocument } from "../store/document";
const props = useGlobalDocument();
const search = ref<string>("");

let searchQuery = localStorage.getItem("search") || "";
if (!window.location.pathname.includes("result")) {
  localStorage.removeItem("search");
  searchQuery = "";
}
props.getAllCategories();
if (searchQuery) {
  search.value = searchQuery;
}

const checkedNames = ref([]);
props.filters = checkedNames;

const handleSearch = () => {
  localStorage.setItem("search", search.value);
  window.location.href = `/result?search=${search.value}&all=true&category=${props.filters}`;
};


const isShowSearch = () => {
  const is = window.location.pathname
  const no = is.split('/')
  if(no[1] === 'document'){
    return true
  }
  return false
  
}

isShowSearch()
//
const getLang = localStorage.getItem("lang") || null;

//
const toggleLanguage = (lang: string) => {
  window.location.reload();
  localStorage.setItem("lang", lang);
};
</script>
<template>
  <header
    class="justify-between md:flex-col lg:flex-row bg_color items-center p-10 py-1 shadow-lg sticky top-0 z-50 md:flex hidden">
    <a href="/">
      <div class="flex items-center">
        <img src="../assets/images/cropped-logo.png" class="w-[90px]" />
        <div class="site-title-wrap ml-2">
          <p class="site-title text-sm xl:text-xl text-white">
            ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
          </p>
          <p class="site-description text-sm xl:text-xl text-white">
            Ministry of Land Management, Urban Planning and Construction
          </p>
        </div>
      </div>
    </a>
    <div class="w-[400px] xl:w-[600px]">
      <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
      <div class="my-4">
        <div class="relative flex w-full flex-wrap items-stretch">
          <input type="text" size="medium"
            class="relative m-0 placeholder:text-black -mr-0.5 block min-w-0 flex-auto rounded-l border-2 border-blue-900 bg-transparent bg-clip-padding px-3 py-[0.7rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-900 focus:text-black focus:outline-none dark:border-blue-900 dark:text-slate-200 dark:placeholder:text-black dark:focus:border-blue-900"
            :placeholder="$t('search')" aria-label="Search" v-model="search" @keyup.enter="handleSearch"
            aria-describedby="button-addon1" />

          <!--Search button-->
          <!-- <router-link :to="{ name: 'result', params: { search: search } }"> -->
          <button
            class="relative z-[2] flex items-center rounded-r dark:bg-blue-900 !bg-blue-900 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-900 hover:shadow-lg focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg"
            type="button" id="button-addon1" data-te-ripple-init data-te-ripple-color="light" @click="handleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
              <path fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
            <!-- {{ $t("search") }} -->
          </button>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <!-- <div class="flex items-center">
      <div class="dropdown mt-2 dropdown-bottom dropdown-end mr-6">
        <div v-if="getLang === 'km'" tabindex="0" class="">
          <div class="avatar cursor-pointer">
            <div class="w-10 rounded-full">
              <img src="../assets//cambodia.svg" />
            </div>
          </div>
        </div>
        <div v-else tabindex="0" class="">
          <div class="avatar cursor-pointer">
            <div class="w-10 rounded-full">
              <img src="../assets/united-kingdom.svg" class="w-10" />
            </div>
          </div>
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow !bg-white rounded-box w-52">
          <li @click="toggleLanguage('km')">
            <div class="avatar cursor-pointer">
              <div class="w-8 rounded-full">
                <img src="../assets/cambodia.svg" class="w-8" />
              </div>
              <span>ភាសាខ្មែរ</span>
            </div>
          </li>
          <li @click="toggleLanguage('en')">
            <div class="avatar cursor-pointer">
              <div class="w-8 rounded-full">
                <img src="../assets/united-kingdom.svg" class="w-8" />
              </div>
              <span>English</span>
            </div>
          </li>
        </ul>
      </div> -->

    <!-- <div
        class="avatar flex items-end justify-end placeholder"
        onclick="my_modal_1.showModal()"
      >
        <div
          class="w-14 bg-slate-200 dark:bg-neutral rounded-full outline hover:outline-sky-500 cursor-pointer text-2xl font-bold"
        >
          GS
        </div>
      </div> -->
    <!-- </div> -->
  </header>
  <header class="md:hidden">
    <div class="navbar bg_color">
      <div class="navbar-center">
        <a href="/" class="!text-xl text-white font-bold">
          <div class="flex items-center">
            <img src="../assets//images/cropped-logo.png" class="w-[60px]" />
            <div class="site-title-wrap ml-0">
              <p class="site-title text-[11px] text-white">
                ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
              </p>
              <p class="site-description text-[9px] text-white">
                Ministry of Land Management, Urban Planning and Construction
              </p>
            </div>
          </div>
        </a>
      </div>
      <!-- <div class="navbar-end">
        <button class="btn btn-ghost btn-circle text-white" onclick="my_modal_search.showModal()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <dialog id="my_modal_search" class="modal">
          <div class="modal-box !bg-white min-h-[90vh] py-10">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <label class="input input-bordered !bg-white flex items-center gap-2 mt-4">
                <input type="text" class="grow" placeholder="Search" aria-label="Search" v-model="search"
                  @keyup.enter="handleSearch" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd" />
                </svg>
              </label>
            </div>
          </div>
        </dialog>
      </div> -->
    </div>
    <div class="flex p-2" v-show="isShowSearch() === false">
      <div class="my-4 w-full">
        <div class="relative flex w-full items-stretch">
          <input type="text" size="medium"
            class="relative m-0 placeholder:text-black -mr-0.5 block min-w-0 flex-auto rounded-l border border-blue-900 bg-transparent bg-clip-padding px-3 py-[0.25rem] font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-900 focus:text-black focus:outline-none dark:border-blue-900 dark:text-black dark:placeholder:text-black dark:focus:border-blue-900"
            :placeholder="$t('search')" aria-label="Search" v-model="search" @keyup.enter="handleSearch"
            aria-describedby="button-addon1" />
          <button
            class="relative z-[2] flex items-center rounded-r dark:bg-blue-900 !bg-blue-900 px-3 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-900 hover:shadow-lg focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg"
            type="button" id="button-addon1" data-te-ripple-init data-te-ripple-color="light" @click="handleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
              <path fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div class="drawer drawer-end !w-[50px] flex justify-center items-center z-[999999]">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content w-[20px] float-right">
          <!-- Page content here -->
          <label for="my-drawer-4" class="drawer-button">
            <font-awesome-icon :icon="['fas', 'filter']"
              class="text-2xl !text-[#2f2f85] cursor-pointer !hover:text-red-500" />
          </label>
        </div>
        <div class="drawer-side z-[999999] !text-black">
          <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>

          <div class="z-[999999] p-4 w-80 min-h-full bg-white !text-blue-800">
            <div class="navbar-center mb-5">
              <a href="/" class="!text-xl text-white font-bold">
                <div class="flex items-center justify-center flex-col">
                  <img src="../assets//images/cropped-logo.png" class="w-[80px]" />
                  <div class="site-title-wrap text-center ml-0">
                    <p class="site-title text-[12px] text-black">
                      ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
                    </p>
                    <p class="site-description text-[9px] text-black">
                      Ministry of Land Management, Urban Planning and Construction
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div class="font-bold text-xl">ស្វែងរក</div>
            <div class="flex">
              <div>
                <label class="label cursor-pointer">
                  <input type="radio" name="radio-10" class="radio radio-info" checked />
                  <span class="label-text ml-2 !text-blue-800 font-bold">តែចំណងជើង</span>
                </label>
              </div>
              <div class="">
                <label class="label cursor-pointer">
                  <input type="radio" name="radio-10" checked class="radio radio-info" />
                  <span class="label-text ml-2 !text-blue-800 font-bold w-full">{{
                    $t("all_of_contents")
                    }}</span>
                </label>
              </div>
            </div>
            <div class="font-bold text-xl">ប្រភេទឯកសារ</div>
            <div class="grid grid-cols-2 md:grid-cols-4">
              <div v-for="(item, idx) in props.all_categories" v-bind:key="idx" class="">
                <label class="cursor-pointer label mx-1">
                  <input type="checkbox" v-model="checkedNames" :value="item.id" class="checkbox checkbox-info" />
                  <span class="label-text !text-md ml-2 w-full !text-blue-800">{{ item.name }}</span>
                </label>
              </div>
            </div>
            <!-- <div class="font-bold text-xl">ប្ដូរភាសារ</div>
            <div class="dropdown mt-2 dropdown-bottom !bg-white mr-6">
              <div v-if="getLang === 'km'" tabindex="0" class="">
                <div class="avatar cursor-pointer flex items-center">
                  <div class="w-10 rounded-full">
                    <img src="../assets//cambodia.svg" />
                  </div>
                  <span class="ml-3 text-xl">ភាសាខ្មែរ</span>
                </div>
              </div>
              <div v-else tabindex="0" class="">
                <div class="avatar cursor-pointer">
                  <div class="w-10 rounded-full">
                    <img src="../assets/united-kingdom.svg" class="w-10" />
                  </div>
                  <span class="ml-3 text-xl">English</span>
                </div>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                <li @click="toggleLanguage('km')">
                  <div class="avatar cursor-pointer">
                    <div class="w-8 rounded-full">
                      <img src="../assets/cambodia.svg" class="w-8" />
                    </div>
                    <span>ភាសាខ្មែរ</span>
                  </div>
                </li>
                <li @click="toggleLanguage('en')">
                  <div class="avatar cursor-pointer">
                    <div class="w-8 rounded-full">
                      <img src="../assets/united-kingdom.svg" class="w-8" />
                    </div>
                    <span>English</span>
                  </div>
                </li>
              </ul>
            </div> -->
            <div class="w-full flex justify-end">
              <button class="btn btn-info !text-white w-full mt-4">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <SignIn />
  <SignUp />
</template>

<style>
@font-face {
  font-family: Moulpali-Regular;
  src: url("../assets/fonts/Moulpali-Regular.ttf");
}

.site-title {
  font-family: Moulpali-Regular;
}

.bg_color {
  background-color: #86C6E0;
}

@media only screen and (max-width: 990px) {

}
</style>