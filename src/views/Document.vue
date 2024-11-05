<template>
  <div class="min-h-screen">
    <Header></Header>
    <section v-if="props.loading || isFetching" class="flex h-full min-h-screen flex-col">
      <div class="w-full h-[400px] flex flex-col justify-center items-center">
        <div class="loading loading-spinner !w-[3rem] text-sky-500"></div>
        <div class="mt-4 text-slate-400">កំពុងទាញយកទិន្នន័យ...</div>
      </div>
    </section>
    <section v-else class="h-full min-h-screen mt-2" :style="props.document.css">
      <div v-if="props.document?.content != null || props.pdf">
        <!-- <button class="btn btn-info !rounded-full !w-14 !h-14 fixed bottom-[9rem] right-[20px] z-[99999] __print"
          @click="printContent">
          <font-awesome-icon icon="print" class="text-xl text-slate-200" />
        </button> -->
        <button class="btn btn-primary !rounded-full !w-14 !h-14 fixed bottom-[5rem] right-[20px] z-[99999] __print"
          @click="openModal(props.document.id)">
          <font-awesome-icon icon="download" class="text-xl text-slate-200" />
        </button>
      </div>
      <div class="breadcrumbs w-full text-sky-400 bg-slate-50 text-md">
        <ul class="w-[90%] m-auto">
          <li>
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24" fill="#00B3F0">
                <path
                  d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
              ទំព័រដើម
            </a>
          </li>
          <li>
            <a @click="goBack()">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24" fill="#00B3F0">
                <path
                  d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z" />
              </svg>
              ឯកសារ
            </a>
          </li>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24" fill="#00B3F0">
                <path
                  d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
              លម្អិត
            </a>
          </li>
        </ul>
      </div>
      <div class="w-full h-full block lg:flex justify-center mt-5">
        <div v-if="props.loading"></div>
        <div v-else class="block lg:flex">
          <div v-if="props.loading"></div>
          <div v-else-if="DisplayType == 0 && props.loading == false && props.document?.content"
            class="no-print w-[98vw] m-auto lg:m-0 lg:w-[350px] lg:mr-5 lg:sticky top-2 text-black shadow-md overflow-hidden overflow-y-auto h-auto lg:h-screen max-h-full mt-2 border border-t-0 border-slate-400 bg-[rgb(248,249,250)]">
            <div role="tablist" class="tabs grid md:grid-flow-col grid-cols-2 tabs-lifted w-full m-auto">
              <input type="radio" name="my_tabs_3" role="tab"
                class="tab flex-wrap !text-xl [--tab-bg:#1608d4] [--tab-border-color:#1608d4] !rounded-tl-none !rounded-tr-none"
                @click="pdfUrl = '', DisplayType = 0" aria-label="
                មាតិកា" checked />
              <div role="tabpanel" class="tab-content active w-full p-2 pt-4">
                <div class="folder-tree-wrapper">
                  <div v-if="props.loading"></div>
                  <ul v-else class="folder-tree" ref="folderTree">
                    <li v-for="(h1, index) in props.document?.heading" :key="index">
                      <div class="flex items-center flex-nowrap">
                        <input type="checkbox"
                          class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                          :name="h1.text" :checked="h1.state.selected" @click="h1.state.selected = !h1.state.selected"
                          v-on:change="
                            parentChange(
                              h1,
                              h1.state.selected,
                              h1.value,
                              h1.heading
                            )
                          " />
                        <div class="text-nowrap w-full pl-1">
                          <a :href="h1.href" class="text-md link !text-[#1608d4] text-wrap hover:font-bold ml-2"
                            :class="fragment === h1.href ? 'link-info' : ''">{{ h1.text }}</a>
                        </div>
                        <div v-show="h1.children?.length > 0" class="arrow px-1">
                          <font-awesome-icon :icon="['fas', 'angle-right']"
                            class="transform transition-transform duration-500 text-2xl text-[#1608d4]" :class="
                              h1.state.opened == false
                                ? 'rotate-90'
                                : 'rotate-180'
                            " @click="toggleFolder(h1)" />
                        </div>
                      </div>
                      <ul class="ml-2" v-show="
                          h1.state.opened == false && h1.children.length > 0
                        ">
                        <li v-for="(h2, h2Index) in h1?.children" :key="h2Index">
                          <div class="flex items-center">
                            <input type="checkbox"
                              class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                              :name="h2.text" :checked="h2.state.selected"
                              @click="h2.state.selected = !h2.state.selected" v-on:change="
                                parentChange(
                                  h2,
                                  h2.state.selected,
                                  h2.value,
                                  h2.heading
                                )
                              " />
                            <div class="pl-1">
                              <a :href="h2.href" class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2">{{
                                h2.text }}</a>
                            </div>
                            <div v-show="h2.children.length > 0" class="arrow px-1">
                              <font-awesome-icon :icon="['fas', 'angle-right']"
                                class="transform transition-transform duration-500 text-2xl text-[#1608d4]" :class="
                                  h2.state.opened == false
                                    ? 'rotate-90'
                                    : 'rotate-180'
                                " @click="toggleFolder(h2)" />
                            </div>
                          </div>
                          <ul class="ml-2" v-show="
                              h2.state.opened == false && h2.children.length > 0
                            ">
                            <li v-for="(h3, h3Index) in h2?.children" :key="h3Index">
                              <div class="flex items-center">
                                <input type="checkbox"
                                  class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                                  :name="h3.text" :checked="h3.state.selected" @click="
                                    h3.state.selected = !h3.state.selected
                                  " v-on:change="
                                    parentChange(
                                      h3,
                                      h3.state.selected,
                                      h3.value,
                                      h3.heading
                                    )
                                  " />
                                <div class="pl-1">
                                  <a :href="h3.href"
                                    class="text-md link !text-[#1608d4] hover:font-bold text-wrap ml-2">{{ h3.text
                                    }}</a>
                                </div>
                                <div v-show="h3.children.length > 0" class="arrow px-1">
                                  <font-awesome-icon :icon="['fas', 'angle-right']"
                                    class="transform transition-transform duration-500 text-2xl text-[#1608d4]" :class="
                                      h3.state.opened == false
                                        ? 'rotate-90'
                                        : 'rotate-180'
                                    " @click="toggleFolder(h3)" />
                                </div>
                              </div>
                              <ul class="ml-2" v-show="
                                  h3.state.opened == false &&
                                  h3.children.length > 0
                                ">
                                <!-- h4 -->
                                <li v-for="(h4, h4Index) in h3.children" :key="h4Index">
                                  <div class="flex items-center">
                                    <input type="checkbox"
                                      class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                                      :name="h4.text" :checked="h4.state.selected" @click="
                                        h4.state.selected = !h4.state.selected
                                      " v-on:change="
                                        parentChange(
                                          h4,
                                          h4.state.selected,
                                          h4.value,
                                          h4.heading
                                        )
                                      " />
                                    <div class="pl-1">
                                      <a :href="h4.href"
                                        class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2">{{ h4.text
                                        }}</a>
                                    </div>
                                    <div v-show="h4.children.length > 0" class="arrow px-1">
                                      <font-awesome-icon :icon="['fas', 'angle-right']"
                                        class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                                        :class="
                                          h4.state.opened == false
                                            ? 'rotate-90'
                                            : 'rotate-180'
                                        " @click="toggleFolder(h4)" />
                                    </div>
                                  </div>
                                  <ul class="ml-2" v-show="
                                      h4.state.opened == false &&
                                      h4.children.length > 0
                                    ">
                                    <!-- h5 -->
                                    <li v-for="(h5, h5Index) in h4.children" :key="h5Index">
                                      <div class="flex items-center">
                                        <input type="checkbox"
                                          class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                                          :name="h5.text" :checked="h5.state.selected" @click="
                                            h5.state.selected =
                                              !h5.state.selected
                                          " v-on:change="
                                            parentChange(
                                              h5,
                                              h5.state.selected,
                                              h5.value,
                                              h5.heading
                                            )
                                          " />
                                        <div class="pl-1">
                                          <a :href="h5.href"
                                            class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2">{{
                                            h5.text }}</a>
                                        </div>
                                        <div v-show="h5.children.length > 0" class="arrow px-1">
                                          <font-awesome-icon :icon="['fas', 'angle-right']"
                                            class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                                            :class="
                                              h5.state.opened == false
                                                ? 'rotate-90'
                                                : 'rotate-180'
                                            " @click="toggleFolder(h5)" />
                                        </div>
                                      </div>
                                      <ul class="ml-2" v-show="
                                          h5.state.opened == false &&
                                          h5.children.length > 0
                                        ">
                                        <!-- h6 -->
                                        <li v-for="(h6, h6Index) in h5.children" :key="h6Index">
                                          <div class="flex items-center">
                                            <input type="checkbox"
                                              class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                                              :name="h6.text" :checked="h6.state.selected" @click="
                                                h6.state.selected =
                                                  !h6.state.selected
                                              " v-on:change="
                                                parentChange(
                                                  h6,
                                                  h6.state.selected,
                                                  h6.value,
                                                  h6.heading
                                                )
                                              " />
                                            <div class="pl-1">
                                              <a :href="h6.href"
                                                class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2">{{
                                                h6.text }}</a>
                                            </div>
                                            <!-- If there are more levels of headings, continue nesting here -->
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <input type="radio" name="my_tabs_3" role="tab" @click="pdfUrl = '',DisplayType = 0"
                class="tab text-slate-800 !text-xl [--tab-bg:#1608d4] [--tab-border-color:#1608d4] !rounded-tl-none !rounded-tr-none"
                aria-label="លម្អិត" />
              <div role="tabpanel" class="tab-content pt-4 __details p-2">
                <div class="text-lg">
                  <div class="mt-2 font-bold text-sky-500">ចំណងជើង :</div>
                  <div class="mt-2 text-slate-700">
                    {{ props.document?.name }}
                  </div>
                  <div class="mt-2 font-bold text-sky-500">
                    កាលបរិច្ឆេទប្រកាសឲ្យប្រើ :
                  </div>
                  <span class="text-slate-700">
                    {{ getDateFormat() }}
                  </span>
                  <div class="mt-2 font-bold text-sky-500">
                    កាលបរិច្ឆេទបង្ហោះ :
                  </div>
                  <span class="text-slate-700">
                    {{props.document.date ? formatDateToKhmer(props.document?.date||123456789):'' }}
                  </span>
                </div>
              </div>
              <input type="radio" name="my_tabs_3" role="tab" @click="pdfTab()"
                class="tab text-slate-800 !text-xl [--tab-bg:#1608d4] [--tab-border-color:#1608d4] !rounded-tl-none !rounded-tr-none"
                aria-label="មើលជាទម្រង់PDF" />
              <div role="tabpanel" class="tab-content pt-4 __details p-2">
                <div v-if="isFetching || props.loading || pdfUrl == ''">
                  <div class="w-full text-center items-center justify-center">
                    <span class="loading loading-spinner w-[2rem] text-sky-500"></span>
                  </div>
                </div>
                <div v-else>
                  <!-- <VuePdfApp style="height: 100vh;width: 100%;" :pdf="pdfUrl"></VuePdfApp> -->
                </div>
              </div>
            </div>
          </div>
          <div v-if="isFetching || props.loading || pdfUrl == ''">
            <div class="w-full text-center items-center justify-center">
              <!-- <span class="loading loading-spinner w-[2rem] text-sky-500"></span> -->
            </div>
          </div>
          <div v-else-if="DisplayType == 1 && pdfUrl && !isFetching && !props.loading">
            <div class="__bg_content !w-screen !p-1">
              <!-- <button class="btn btn-sm bg-[#1608d4] hover:bg-[#1608d4] my-1 w-[200px] md:w-[100px] text-white text-xl" @click="backToOldForm"><font-awesome-icon :icon="['fas', 'arrow-left']" /></button> -->
              <VuePdfApp :config="config"
                style="height: 150vh;width: 100%" :pdf="'data:application/pdf;base64,'+pdfUrl" class="!text-white">
              </VuePdfApp>
            </div>
          </div>
          <template v-if="DisplayType == 0 && !props.loading && props.document?.content">
            <div class="" ref="printableContent" v-html="props.document.content"></div>
          </template>
          <template v-else-if="DisplayType === 0">
            <div class="w-full text-center items-center justify-center">
              <span class="loading loading-spinner w-[2rem] text-sky-500"></span>
            </div>
          </template>
        </div>
      </div>
      <!-- modal download  -->
      <dialog ref="modalDownload" :id="'modal' + props.document.id" class="modal top-0 right-0">
        <div class="modal-box !bg-slate-200 text-slate-800">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-red-600 !font-bold !text-2xl !bg-transparent"
              @click="closeModal(props.document.id)">
              ✕
            </button>
          </form>
          <div class="!grid grid-cols-2 md:grid-cols-3 gap-1 my-2">
            <div @click="clickDownload()"
              class="flex items-center justify-center flex-col cursor-pointer transition-all transform hover:scale-105">
              <img src="../assets/images/1200px-PDF_file_icon.png" alt="img-pdf-download" class="w-[40px]" />
              <p class="text-sm mt-2">ទាញយកជាទម្រង់ PDF</p>
            </div>
            <div @click="clickDownloadDocx()"
              class="flex items-center justify-center flex-col cursor-pointer transition-all transform hover:scale-105">
              <img src="../assets/images/icons8-microsoft-word-2019-240.png" alt="img-docx-download" class="w-[50px]" />
              <p class="text-sm mt-2">ទាញយកជាទម្រង់ WORD</p>
            </div>
          </div>
        </div>
      </dialog>
      <!-- end modal download  -->
    </section>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import {
  onBeforeUnmount,
  defineAsyncComponent,
  watchEffect,
  onUnmounted,
} from "vue";
import { useGlobalDocument } from "../store/document";
import { onBeforeMount, onMounted, computed, ref, watch } from "vue";
import Footer from "../components/Footer.vue";
import { formatDateToKhmer } from "../helper/khmerDateFormat";
// import PDFViewer from 'pdf-viewer-vue'
import VuePdfApp from "vue3-pdf-app";
// import this to use default icons for buttons
import "vue3-pdf-app/dist/icons/main.css";
import Header from "../components/Header.vue";
import { API } from "@/types/api";
const props = useGlobalDocument();
const pdfUrl = ref<any>("");
const route = useRoute();
const router = useRouter();
const goBack = () => {
  router.go(-1);
};

const fragment = window.location.hash.substring(1);
const DisplayType = ref<number>(1)
const isFetching = ref<boolean>(false)
const pdfObjectURL = ref<any>('');

const pdfTab = async () => {
  DisplayType.value = 1
  await openPdfFile()
}
// Function to update sidebarView to 0 for all file entries in the PDF.js history localStorage
function updateAllSidebarViewsToZero() {
    // Retrieve the current PDF.js history from localStorage
    let pdfHistory = JSON.parse(localStorage.getItem('pdfjs.history') as any) || { files: [] };

    // Update the sidebarView for all file entries
    pdfHistory.files.forEach((file:any) => {
        file.sidebarView = 0;
    });

    // Save the updated PDF.js history back to localStorage
    localStorage.setItem('pdfjs.history', JSON.stringify(pdfHistory));
}

// Usage example:
// Call this function to update the localStorage
const openPdfFile = async () => {
  isFetching.value = true;
  await props.DownloadDocument(props.document.name, route.params.id, 2);
  if(props){
    pdfUrl.value  = props.pdf;
    isFetching.value = false;
    updateAllSidebarViewsToZero();
  }
}


const config = {
  sidebar: {
    isSidebarHidden: true,  // Ensure that the sidebar is hidden by default
    viewThumbnail: true,
    viewOutline: true,
    viewAttachments: true,
  },
  secondaryToolbar: {
    secondaryPresentationMode: true,
    secondaryOpenFile: false,
    secondaryPrint: true,
    secondaryDownload: true,
    secondaryViewBookmark: false,
    firstPage: true,
    lastPage: true,
    pageRotateCw: true,
    pageRotateCcw: true,
    cursorSelectTool: true,
    cursorHandTool: true,
    scrollVertical: true,
    scrollHorizontal: true,
    scrollWrapped: true,
    spreadNone: true,
    spreadOdd: true,
    spreadEven: true,
    documentProperties: true,
  },
  toolbar: {
    isSidebarHidden:false,
    toolbarViewerLeft: {
      toggleSidebar:true,
      findbar: false,
      previous: false,
      next: false,
      pageNumber: true,
      isSidebarHidden:false,
    },
    toolbarViewerRight: {
      presentationMode: true,
      openFile: false,
      print: true,
      download: true,
      viewBookmark: false,
    },
    toolbarViewerMiddle: {
      zoomOut: true,
      zoomIn: true,
      scaleSelectContainer: true,
    },
  },
  errorWrapper: true,
};

const openModal = async (idx: any) => {
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


const formatDate = (timestamp: any) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: any = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const parentChange = (item: any, selected: any, id: any, type: any) => {
  const content: any = document.getElementById(id);
  if (selected) {
    content.classList.remove("__hide-content");
  } else {
    content.classList.add("__hide-content");
  }
  for (let child of item.children) {
    let content: any = document.getElementById(child.value);
    if (selected) {
      content.classList.remove("__hide-content");
    } else {
      content.classList.add("__hide-content");
    }
    child.state.selected = selected;
    if (child.children.length > 0) {
      for (let subChild of child.children) {
        let content: any = document.getElementById(subChild.value);
        if (selected) {
          content.classList.remove("__hide-content");
        } else {
          content.classList.add("__hide-content");
        }
        subChild.state.selected = selected;
      }
    }
  }
};

const getDateFormat = () => {
  let date = new Date();
  let newDate: any;
  if (
    props.document.attributes.length > 0 &&
    props.document.attributes[0] != null
  ) {
    props.document.attributes.forEach((itm: any) => {
      if (
        itm?.name == "កាលបរិច្ឆេទចេញផ្សាយ" &&
        itm?.name &&
        itm?.name != null
      ) {
        let DateFormat = new Date(itm.value);
        newDate = formatDateToKhmer(DateFormat, true);
        return newDate;
      }
    });
  }

  return newDate;
};

const clickDownload = async () => {
    // await props.DownloadDocumentPDF(props.document.name, route.params.id, 1)
    window.location.href = API+'download/'+route.params.id
};
const clickDownloadDocx = async () => {
    await props.DownloadDocumentDocx(props.document.name, route.params.id, 1);
};

onMounted(async() => {
  await props.getDocument(route.params.id);

  // applyStyle(props.document?.css);

  // const parser = new DOMParser();
  // const doc = parser.parseFromString(props.document.content, "text/html");
  // const elements = doc.querySelectorAll("span");

  // elements.forEach((el) => {
  //   el.childNodes.forEach((node:any) => {
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       if (screenWidth.value <= 990) {
  //         node.textContent = node.textContent.replace(/\s+/g, "").trim();
  //       } else {
  //         pdfUrl.value = ""
  //       }
  //     }
  //   });
  // });

  // props.document.content = doc.documentElement.innerHTML;
})

const backToOldForm = async () => {
  pdfUrl.value = "";
  DisplayType.value = 0
  await props.getDocument(route.params.id);

  applyStyle(props.document?.css);

  const parser = new DOMParser();
  const doc = parser.parseFromString(props.document.content, "text/html");
  const elements = doc.querySelectorAll("span");

  elements.forEach((el) => {
    el.childNodes.forEach((node:any) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (screenWidth.value <= 990) {
          node.textContent = node.textContent.replace(/\s+/g, "").trim();
        } else {
          pdfUrl.value = ""
        }
      }
    });
  });

  props.document.content = doc.documentElement.innerHTML;
}

onMounted(() => {openPdfFile()})

// // ViewDocumentContent();
const printableContent = ref<any>(null);
const printContent = () => {
  // window.open(pdfUrl.value,'__blank')
  // var printContents: any =
  //   document.getElementsByClassName("__bg_content")[0]?.innerHTML;

  // document.body.innerHTML = printContents;

  // window.print();
  // window.close();
  // window.document.close();
  // window.location.reload();
};

const applyStyle = (cssText: any) => {
  const styleTag = document.createElement("style");
  styleTag.textContent = cssText;
  document.head.appendChild(styleTag);
};

const toggleFolder = (folder: any) => {
  folder.state.opened = !folder.state.opened;
};

const scTimer = ref<any>(0);
const scY = ref<number>(0);

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
const screenWidth = ref(window.innerWidth);
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};


onMounted(async() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>
<style>
@media print {
  /* body {
    font-family: "Noto Sans Khmer", sans-serif;
  } */
  .no-print,
  .no-print * {
    visibility: hidden !important;
  }
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

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00b3f0;
}

.border-r-2 {
  border-right-width: 0;
}

@font-face {
  font-family: "Khmer OS Muol Light";
  src: url("../assets/fonts/KhmerOSMoul.ttf");
}

@font-face {
  font-family: "Khmer OS Siemreap";
  src: url("../assets/fonts/KhmerOsSiemreap.ttf");
}

/* * {
  font-family: "Battambang", sans-serif;
} */

@media print {
  .__sub_title {
    display: none !important;
  }
}

._sidebar {
  height: 100%;
}

@media only screen and (min-width: 1200px) {
  ._sidebar {
    height: calc(100vh - 250px);
  }
}

.h_screen {
  height: 100%;
  min-height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
}

.tab {
  --tab-color: #000000 !important;
  --tab-bg: #00b3f0 !important;
  --tab-border-color: #00b3f0 !important;
}

.tab:focus {
  --tab-color: #ffffff !important;
  --tab-bg: #00b3f0 !important;
  --tab-border-color: #00b3f0 !important;
}

.__sidebar-heading {
  /* background: red; */
  display: flex;
  align-items: flex-start;
}

.__sidebar-heading .checkbox {
  margin-top: 0px !important;
}

.__sidebar-heading input {
  margin-top: 10px;
}

.__bg_content {
  width: 8.27in;
  min-width: 8.27in;
  min-height: 29.7cm;
  padding: 1in;
  margin: 1in auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 25px 0;
  /* color: black !important; */
  /* width */
  max-width: 90vw;
  float: right;
  display: flex;
  margin: auto;
  /* justify-content: flex-start; */
  /* align-items: flex-start; */
  flex-direction: column;
  /* margin-top: 1cm !important; */
}

/* @apply style.value; */

.__bg_wrapper {
  display: flex;
  justify-content: space-between;
  /* height: 100vh; */
  /* overflow: hidden; */
}

.__header_title {
  /* Large devices (laptops/desktops, 992px and up) */
  /* position: fixed;
  top: 100px; */
  /* font-family: khmerOsMoul; */
}

._new_sidebar {
  width: 360px;
  padding: 10px;
  /* overflow: hidden; */
  min-height: 100px;
  height: 85vh;
  overflow-y: auto;
  /* z-index: 1; */
  /* font-size: 1rem; */
  font-weight: bold;
  color: #000000 !important;
  text-decoration: none !important;
  font-family: "Battambang", sans-serif;
  margin-top: 70px;
  position: fixed;
  background-color: #f8f9fa;
  border: 1px solid #60606090;
}

@media only screen and (min-width: 1900px) {
  ._new_sidebar {
    left: 13% !important;
  }
}

@media only screen and (min-width: 1240px) {
  ._new_sidebar {
    left: 11%;
  }
}

@media only screen and (max-width: 1200px) {
  ._new_sidebar {
    height: 590px;
    left: 4%;
  }

  .__bg_content {
    /* width: 19cm !important; */
    /* min-width: 19cm !important; */
  }
}

@media only screen and (min-width: 990px) {
  .__print {
    display: block !important;
  }
  ._new_sidebar {
    left: 7%;
  }

  .d_hide {
    display: none !important;
  }
}

table tr,
td {
  min-height: 20px;
}

.__sidebar {
  width: 320px;
  padding: 10px;
  /* overflow: hidden; */
  /* min-height: 100px; */
  /* height: 680px; */
  overflow-y: auto;
  /* z-index: 1; */
  /* font-size: 1rem; */
  font-weight: bold;
  /* display: none; */
  opacity: 0;
  z-index: -1;
  color: #000000 !important;
  text-decoration: none !important;
  font-family: "Battambang", sans-serif;
  height: 0px !important;
}

.__content span {
  /* font-size: 15px !important; */
  font-family: "Khmer OS Siemreap", sans-serif !important;
}

.__sidebar .checkbox {
  margin-right: 10px;
}

.__content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  /* color: #000000; */
}

.__sub_content {
  padding-left: 0px;
}

.__content img,
video {
  margin: auto !important;
}

table {
  border: 1px;
  border-style: solid;
}

.__content h1 h1 h3 h4 h5 h6 p span{
  color: #000000;
}

.__content h1,
h2,
h3 {
  font-weight: bold;
}
.__content h1 > span {
  font-weight: bold;
  /* font-size: 1rem !important; */
}

.__content h1 {
  font-size: 14pt;
}

.__content h2 {
  font-size: 12pt;
}

.__content h3 {
  font-size: 10pt;
}

.__content p {
  margin-left: 0px;
}

.__content p > span {
  line-height: 1.6rem !important;
  /* font-size: 16px !important; */
}

.__title {
  /* font-size: 20px; */
  color: black;
  font-weight: bold;
}

.__sub_title {
  margin-top: 5px;
  text-transform: initial;
  /* text-align: justify; */
  padding-left: 25px;
  /* font-size: 1.2rem; */
}

.__sidebar-subheading {
  margin-left: 35px;
}

.__bg_content .__content:not(:first-child):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) p {
  text-align: initial !important;
}


@media only screen and (min-width: 992px) {
  .__header_title {
    /* font-size: 20px; */
    font-family: "Battambang", sans-serif;
  }

  .__sidebar {
    position: fixed;
    height: 80vh;
    /* height: 200px !important; */
    /* overflow: hidden; */
    /* background-color: red; */
  }

  .__bg_content {
    margin-top: 20px;
  }
}

@media only screen and (max-width: 1240px) {
  .__header_title {
    /* font-size: 14px; */
  }

  .__content p {
    margin-left: 0px;
  }

  .__bg_wrapper {
    display: block;
  }

  .__sidebar-subheading {
    margin-left: 10px !important;
  }

  .__sub_content {
    padding-left: 0;
  }

  .__bg_content {
    width: 19cm;
    min-width: 19cm;
    min-height: 29.7cm;
    padding: 1cm;
    margin: 1cm auto;
    border: 1px #d3d3d3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin: 25px 0;
    color: black !important;
    /* width */
    max-width: 90vw;
    float: right;
    display: flex;
    margin: auto;
    /* justify-content: flex-start; */
    /* align-items: flex-start; */
    flex-direction: column;
    /* margin-top: 1cm !important; */
  }

  .__sidebar {
    border: none;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  ._new_sidebar {
    border: none;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin-top: 20px;
  }

  .__title {
    /* font-size: 1rem; */
  }

  .__content1 {
    width: 100%;
    margin-left: 0px;
    padding: 0px;
  }
}

@media only screen and (max-width: 992px) {
  .d_hide {
    display: block !important;
  }
  .__header_title {
    /* font-size: 14px; */
  }
  .__print {
    display: none !important;
  }
  .__content p {
    margin-left: 0px;
  }

  .__bg_wrapper {
    display: block;
  }

  .__sidebar-subheading {
    margin-left: 10px !important;
  }

  .__sub_content {
    padding-left: 0;
  }

  .__bg_content {
    width: 100% !important;
    min-width: 100px;
    max-width: 100%;
    min-height: 200px;
    padding: 10px !important;
    /* margin: 1cm auto; */
    border: none;
    box-shadow: none !important;
    margin: 0 !important;
    color: black !important;
    /* width */
    /* max-width: 90vw; */
    /* float: right; */
    display: flex;
    margin: auto;
    margin: 0;
    justify-content: center;
    flex-direction: column;
    text-wrap: wrap !important;
    /* margin-top: 1cm !important; */
  }

  .__sidebar {
    border: none;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  ._new_sidebar {
    border: none;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin-top: 20px;
  }

  .__title {
    /* font-size: 1rem; */
  }

  .__content1 {
    width: 100%;
    margin-left: 0px;
    padding: 0px;
  }
}

@media only screen and (max-width: 600px) {
  .__content p {
    margin-left: 0px !important;
    text-indent: 0.1in !important;
    text-align: initial !important;
  }

  .__header_title {
    /* font-size: 14px; */
  }

  .__content p {
    margin-left: 0px;
  }

  .__bg_wrapper {
    display: block;
  }

  .__sidebar-subheading {
    margin-left: 10px !important;
  }

  .__sub_content {
    padding-left: 0;
  }

  .__bg_content {
    width: 100% !important;
    min-width: 100px;
    min-height: 200px;
    padding: 0;
    /* margin: 1cm auto; */
    border: none;
    box-shadow: none !important;
    margin: 0 !important;
    color: black !important;
    /* width */
    /* max-width: 90vw; */
    /* float: right; */
    display: flex;
    margin: auto;
    margin-left: 30%;
    justify-content: center;
    flex-direction: column;
    text-wrap: wrap !important;
    /* margin-top: 1cm !important; */
  }

  .__sidebar {
    border: none;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  ._new_sidebar {
    border: none;
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 80vh;
    margin-top: 20px;
  }

  .__title {
    /* font-size: 1rem; */
  }

  .__content {
    width: 100%;
    margin-left: 0px;
    padding: 0px;
  }
}

.__hide-content {
  visibility: hidden;
  display: none;
}

.dd {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  /* max-width: 600px; */
  list-style: none;
  line-height: 20px;
}

.dd-list {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dd-list {
  padding-left: 10px;
}

.dd-item {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  min-height: 20px;
  line-height: 20px;
}

.dd-handle {
  display: block;
  margin: 7px 0;
  /* padding: 10px 10px; */
  display: flex;
  align-items: center;
  /* text-decoration: none; */
}

.folder-tree-wrapper {
}

.folder-tree {
  list-style: none;
  cursor: pointer;
  padding-left: 10px;
}

.folder-tree li {
  margin-bottom: 10px;
  font-size: 14px;
  transition: all 0.4s ease;
  position: relative;
  margin-left: 0px;
}

.folder-tree li:hover {
}

.folder-tree li i {
  color: rgb(242, 176, 53);
}

.folder-tree li ul {
  padding-left: 10px;
  padding-top: 8px;
}

/* .folder-tree ul {
  display: none;
  position: relative;
} */

.folder-tree li ul li:before {
  position: absolute;
  content: "";
  left: -10px;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: transparent;
  border-left: solid 1px #c2c2c2;
  border-bottom: solid 1px #c2c2c2;
}

.folder-tree li ul li {
  display: block;
  padding: 5px 0;
  margin: 0;
}

/* .folder-tree .arrow {
  position: absolute;
  top: 40px;
  left: -21px;
  width: 10px;
  height: 10px;
  transition: all .4s ease;
  transform: rotate(-90deg);
} */

.folder-tree .arrow i {
  color: #595959;
  transition: all 0.4s ease;
}

.folder-tree .arrow:hover i {
  color: #292929;
}

.folder-tree li.expanded > ul {
  display: block;
}

.folder-tree li.expanded > .arrow {
  transform: rotate(0deg);
}

.pdf-app p span {
  color: white !important;
}

 /* for dark theme */
 .pdf-app.dark {
    --pdf-toolbar-color: black;
  }

  /* for light theme */
  .pdf-app.light {
    --pdf-toolbar-color: white;
  }
</style>
