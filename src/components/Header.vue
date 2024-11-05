<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { computed } from "vue";
import { useGlobalDocument } from "../store/document";
import { useCategories } from "../store/categories"
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const props = useGlobalDocument();
const Categories = useCategories();

const search = ref<string>("");
const type = ref('all');
const query = ref<any>(null);
let searchQuery = "";
const checkedNames = ref<any>([]);

watchEffect(() => {
  props.filters = checkedNames;
})

const handleSearch = () => {
  localStorage.setItem("search", search.value);
  if (!search.value) {
    search.value = " "
    props.suggestions = []
  }
  window.location.href = `/result?search=${search.value}&type=${type.value}&categories=${props.filters}`;
};

const clickDocumentDetail = (id: any) => {
  window.location.href = `/document/${id}`;
}

const isShowSearch = () => {
// Access the current route object
  const no = route.path.split("/");
  return no[1] === "document" || no[1] === "news";
};

onMounted(() => {
  isShowSearch();
});


const selectAllOption = (mobile: boolean) => {
  checkedNames.value = Categories.all_categories.map(menu => menu.id);
};

const releaseAllOption = (mobile: boolean) => {
  checkedNames.value = []
};
const showDropdown = ref(false);

const handleFocus = () => {
  showDropdown.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 500);
};

const searchDocument = async () => {
  await props.SearchSuggestions({ search: search.value, type: type.value, categories: props.filters });
};

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

watch([search, checkedNames, type], debounce(async() => {
  await searchDocument();
}, 500));


watch(router.currentRoute, (to, from) => {
  if (to && to.query) {
    query.value = to.query;
  }
});

onMounted(async () => {
  await Categories.getAllCategories();
  if (!window.location.pathname.includes("result")) {
    localStorage.removeItem("search");
    searchQuery = "";
  }
  if (searchQuery) {
    search.value = searchQuery;
  }
  watchEffect(() => {
    // If current route is already available, set the query
    if (route.name == 'result' && route.query) {
      query.value = route.query;
      searchQuery = String(route.query.search)
      search.value = String(route.query.search)
      type.value = String(route.query.type)
      checkedNames.value = String(route.query.categories).split(',').map(Number).filter(Boolean);
    }
  });
});

const highlightText = (text: string, words: string[]) => {
  if (!words || words.length === 0) return text;

  const regex = new RegExp(words?.join('|'), 'gi');
  return text?.replace(regex, '<span class="highlight">$&</span>');
};

</script>
<template>
  <header class="md:block hidden">
    <div>
      <div
        class="justify-between md:flex-col lg:flex-row bg_color items-center p-10 py-1 shadow-lg sticky top-0 z-50 md:flex">
        <a href="/" class="w-full">
          <div class="flex items-center">
            <img src="../assets/images/cropped-logo.png" class="w-[90px]" />
            <div class="site-title-wrap ml-2">
              <p class="site-title text-sm md:text-xl text-white">
                ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
              </p>
              <p class="site-description text-sm xl:text-md text-white mt-2" style="font-size: 15px;">
                Ministry of Land Management, Urban Planning and Construction
              </p>
            </div>
          </div>
        </a>
        <div class="flex">
          <nav class="lg:flex text-[#051a53] gap-5 md:hidden">
            <a href="https://web.facebook.com/mlmupc.pressteam" target="_blank">
              <font-awesome-icon class="text-4xl" :icon="['fab', 'facebook']" />
            </a>
            <a href="https://www.youtube.com/@MLMUPC_KH" target="_blank">
              <font-awesome-icon class="text-4xl" :icon="['fab', 'youtube']" />
            </a>
            <a href="https://t.me/MLMUPCofCambodia" target="_blank">
              <font-awesome-icon class="text-4xl" :icon="['fab', 'telegram']" />
            </a>
            <a href="https://www.tiktok.com/@mlmupc_kh?is_from_webapp=1&sender_device=pc" target="_blank">
              <font-awesome-icon class="text-4xl" :icon="['fab', 'tiktok']" />
            </a>
          </nav>
        </div>
      </div>
      <div class="grid grid-flow-col">
        <div v-show="!isShowSearch()" class="text-xl col-span-2 text-center  py-3 text-[#051a53] pt-6 font-bold mr-2 ml-2 md:ml-10">
            <p class="text-md md:text-xl text-[#051a53]">បណ្ណាល័យច្បាប់ឌីជីថល</p>
          </div>
        <div v-show="!isShowSearch()" class="w-full flex col-span-11 flex-col justify-center items-left ">
          <div class="my-4 w-3/4 relative">
            <div class="relative flex w-full flex-wrap items-stretch">
              <input type="text" size="medium"
                class="relative m-0 placeholder:text-slate-500 -mr-0.5 block min-w-0 flex-auto rounded-l border-2 border-blue-900 bg-transparent bg-clip-padding px-3 py-[0.7rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-900 focus:text-black focus:outline-none dark:border-blue-900 dark:text-black dark:placeholder:text-slate-500 dark:focus:border-blue-900"
                :placeholder="$t('search')" aria-label="Search" v-model="search" @keyup.enter="handleSearch"
                @focus="handleFocus" @blur="handleBlur" aria-describedby="button-addon1" />

              <!--Search button-->
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
            </div>
            <div v-if="showDropdown"
              class="absolute top-[calc(100%+5px)] w-full max-h-[500px] overflow-y-auto overflow-hidden whitespace-nowrap overflow-ellipsis bg-white shadow-lg transform transition-all duration-500 text-white ">
              <ul class="menu text-black w-full p-0 [&_li>*]:rounded-none">
                <!-- <div class="text-xl font-bold text-sky-600">ការផ្ដល់យោបល់</div> -->
                <li v-show="props.suggestions.length > 0" v-for="(item, idx) in props.suggestions" :key="idx"
                  class=" transform transition-all duration-500 hover:bg-sky-300 border-b border-b-slate-200">
                  <a @click="clickDocumentDetail(item.id)" class="!block cursor-pointer">
                    <div class="font-bold text-lg" v-html="highlightText(item.name, item.words)"></div>
                    <!-- <div class="overflow-hidden whitespace-nowrap overflow-ellipsis w-[800px]"
                      v-html="highlightText(item.text, item.words)"></div> -->
                  </a>
                </li>
                <li v-show="props.suggestions.length == 0" class="border-b border-b-slate-200">
                  <a class="!block">
                    <div class="text-lg text-center">រកមិនឃើញ</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-wrap flex-col w-3/4">
            <div class="bg-[#E5EBF5] !flex !items-center py-2 gap-2 rounded-md">
              <label class="inline-flex items-center mx-2">
                <input type="radio" name="op1" value="all" v-model="type" class="radio radio-info" />
                <span class="ml-2 text-gray-700 font-bold">ពាក្យក្នុងអត្ថបទ</span>
              </label>
              <label class="inline-flex items-center mx-2 ml-8">
                <input type="radio" name="op1" value="name" v-model="type" class="radio radio-info" />
                <span class="ml-2 text-gray-700 font-bold">ពាក្យក្នុងឈ្មោះឯកសារ</span>
              </label>

            </div>
            <div class="bg-[#E5EBF5] p-2 rounded-md mt-2">
              <div class="grid grid-cols-4 lg:grid-cols-5 gap-2">
                <label class="inline-flex items-center mx-2" v-for="(menu, idx) in Categories.all_categories"
                  :key="idx">
                  <input type="checkbox" :value="menu.id" v-model="checkedNames"
                    class="checkbox large-screen !rounded-none checkbox-info ![--chkbg:#E5EBF5] ![--chkfg:#0EA5E9] !border-[#0EA5E9]" />
                  <span class="ml-2 text-gray-700">{{ menu.name }}</span>
                </label>
              </div>
              <div class="flex mt-2 ml-2 justify-start gap-5">
                <button class="text-blue-700 filter-button"
                  @click="() => selectAllOption(false)">ជ្រើសរើសទាំងអស់</button>
                <button class="text-blue-700 filter-button"
                  @click="() => releaseAllOption(false)">ដកការជ្រើសរើស</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <header class="md:hidden">
    <div class="navbar bg_color">
      <div class="navbar-center">
        <a href="/" class="!text-xl text-white font-bold">
          <div class="flex items-center">
            <img src="../assets//images/cropped-logo.png" class="w-[60px]" />
            <div class="site-title-wrap ml-0">
              <p class="site-title text-[12px] text-white">
                ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
              </p>
              <p class="site-description text-[9px] text-white">
                Ministry of Land Management, Urban Planning and Construction
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="flex p-2" v-show="isShowSearch() === false">
      <div class="w-full relative">
        <div class="relative flex w-full items-stretch">
          <input type="text" size="medium"
            class="relative m-0 placeholder:text-slate-500 -mr-0.5 block min-w-0 flex-auto rounded-l border border-blue-900 bg-transparent bg-clip-padding px-3 py-[0.25rem] font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-900 focus:text-black focus:outline-none dark:border-blue-900 dark:text-black dark:placeholder:text-slate-500 dark:focus:border-blue-900"
            :placeholder="$t('search')" aria-label="Search" v-model="search" @keyup.enter="handleSearch"
            @focus="handleFocus" @blur="handleBlur" aria-describedby="button-addon1" />
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
        <div v-if="showDropdown"
          class="absolute top-[calc(100%+5px)] w-full max-h-[500px] overflow-y-auto overflow-hidden overflow-ellipsis bg-white shadow-lg transform transition-all duration-500 text-white ">
          <ul class="menu text-black w-full p-0 [&_li>*]:rounded-none">
            <!-- <div class="text-xl font-bold text-sky-600">ការផ្ដល់យោបល់</div> -->
            <li v-show="props.suggestions.length > 0" v-for="(item, idx) in props.suggestions" :key="idx"
              class=" transform transition-all duration-500 hover:bg-sky-300 border-b border-b-slate-200">
              <a @click="clickDocumentDetail(item.id)" class="!block cursor-pointer">
                <div class="font-bold text-lg" v-html="highlightText(item.name, item.words)"></div>
                <!-- <div class="overflow-hidden text-sm whitespace-nowrap overflow-ellipsis w-full max-w-[380px]"
                  v-html="highlightText(item.text, item.words)"></div> -->
              </a>
            </li>
            <li v-show="props.suggestions.length == 0" class="border-b border-b-slate-200">
              <a class="!block">
                <div class="text-lg text-center">រកមិនឃើញ</div>
              </a>
            </li>
          </ul>
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

          <div class="z-[999999] w-screen min-h-full bg-white !text-blue-800 flex flex-col pb-4">
            <div class="navbar-center">
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
              <div class="absolute top-2 right-1">
                <label for="my-drawer-4" aria-label="close sidebar">
                  <svg class="transform transition-transform duration-500 hover:rotate-180"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28px" height="28px">
                    <path
                      d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" />
                  </svg>
                </label>
              </div>
            </div>
            <div class="flex">
              <div class="container mx-auto">
                <div class="flex flex-col gap-4">
                  <div class="relative flex w-full items-stretch p-2">
                    <input type="text" size="medium"
                      class="relative m-0 placeholder:text-black -mr-0.5 block min-w-0 flex-auto rounded-l border border-blue-900 bg-transparent bg-clip-padding px-3 py-[.75rem] font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-900 focus:text-black focus:outline-none dark:border-blue-900 dark:text-black dark:placeholder:text-black dark:focus:border-blue-900"
                      :placeholder="$t('search')" aria-label="Search" v-model="search" @keyup.enter="handleSearch"
                      @focus="handleFocus" @blur="handleBlur" aria-describedby="button-addon1" />
                    <div v-if="showDropdown"
                      class="absolute top-[calc(100%+5px)] w-full max-h-[500px] overflow-y-auto overflow-hidden overflow-ellipsis bg-white shadow-lg transform transition-all duration-500 text-white ">
                      <ul class="menu text-black w-full p-0 [&_li>*]:rounded-none">
                        <!-- <div class="text-xl font-bold text-sky-600">ការផ្ដល់យោបល់</div> -->
                        <li v-show="props.suggestions.length > 0" v-for="(item, idx) in props.suggestions" :key="idx"
                          class=" transform transition-all duration-500 hover:bg-sky-300 border-b border-b-slate-200">
                          <a @click="clickDocumentDetail(item.id)" class="!block cursor-pointer">
                            <div class="font-bold text-lg" v-html="highlightText(item.name, item.words)"></div>
                            <!-- <div class="overflow-hidden whitespace-nowrap overflow-ellipsis w-[400px]"
                              v-html="highlightText(item.text, item.words)"></div> -->
                          </a>
                        </li>
                        <li v-show="props.suggestions.length == 0" class="border-b border-b-slate-200">
                          <a class="!block">
                            <div class="text-lg text-center">រកមិនឃើញ</div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 w-4/4 m-1">
                    <div class="bg-[#E5EBF5] grid grid-cols-2 gap-1 py-4 px-1 rounded-md">
                      <label class="items-center flex">
                        <input type="radio" name="option1" value="all" v-model="type" class="radio radio-info" />
                        <span class=" text-gray-700 ml-2">ពាក្យក្នុងអត្ថបទ</span>
                      </label>
                      <label class="flex items-center">
                        <input type="radio" value="name" v-model="type" name="option1" class="radio radio-info" />
                        <span class=" text-gray-700 ml-2">ពាក្យក្នុងឈ្មោះឯកសារ</span>
                      </label>
                    </div>
                    <div class="bg-[#E5EBF5] p-2 rounded-md mt-2">
                      <div class="grid grid-cols-2 gap-2">
                        <label class="inline-flex items-center mx-2" v-for="(menu, idx) in Categories.all_categories"
                          :key="idx">
                          <input type="checkbox" :value="menu.id" v-model="checkedNames"
                            class="checkbox large-screen !rounded-none checkbox-info ![--chkbg:#E5EBF5] ![--chkfg:#0EA5E9] !border-[#0EA5E9]" />
                          <span class="ml-2 text-gray-700">{{ menu.name }}</span>
                        </label>
                      </div>
                      <div class="flex mt-2 ml-2 justify-start gap-5">
                        <button class="text-blue-700 filter-button"
                          @click="() => selectAllOption(false)">ជ្រើសរើសទាំងអស់</button>
                        <button class="text-blue-700 filter-button"
                          @click="() => releaseAllOption(false)">ដកការជ្រើសរើស</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full grid grid-cols-1 gap-2 text-white px-1 mt-4">
              <!-- <button class="btn btn-error !text-white !text-xl">លុប</button> -->
              <button class="btn !bg-blue-900 !text-white !text-xl" @click="handleSearch">
                <font-awesome-icon :icon="['fab', 'sistrix']" class="font-extrabold text-2xl" /> ស្វែងរក</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
@font-face {
  font-family: Moulpali-Regular;
  src: url("../assets/fonts/Moulpali-Regular.ttf");
}

::-webkit-scrollbar {
  width: 10px;
  height: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2a323c;
  border-radius: 10px;
}


/* Handle */
::-webkit-scrollbar-thumb {
  background: #2a323c;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00b3f0;
}

.site-title {
  font-family: Moulpali-Regular !important;
}

.web_title{
  font-family: Moulpali-Regular !important;
}

.bg_color {
  background-color: #86c6e0;
}

.filter-button:hover {
  border-bottom: 2px solid blue;
}

@media only screen and (max-width: 990px) {}

.highlight {
  color: #1E40AF !important;
  background-color: rgb(155 183 242) !important;
  /* Change the color to whatever you like */
}

.truncate {
  /* Apply Tailwind's text truncation classes */

}
</style>
