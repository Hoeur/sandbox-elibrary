<template>
  <section v-if="props.loading" class="flex h-full min-h-screen flex-col">
    <div class="w-full h-[400px] flex justify-center items-center">
      <span class="loading loading-spinner !w-[3rem] text-sky-500"></span>
    </div>
  </section>
  <section v-else class="flex h-full min-h-screen flex-col" :style="props.document.css">
    <header
      class="flex py-4 px-2 shadow-lg text-slate-900 relative lg:fixed top-0 lg:top-24 bg-white w-[100%] md:w-[90%]">
      <div class="text-xl font-bold __header_title">
        {{ props.document ? props.document.name : "undefine" }}
      </div>
    </header>
    <div v-if="props.document !== null">
      <button class="btn btn-info !rounded-full !w-14 !h-14 fixed top-[10rem] right-[20px] z-[99999]"
        @click="printContent">
        <font-awesome-icon icon="print" class="text-xl text-slate-200" />
      </button>
      <!-- <button class="btn btn-primary !rounded-full !w-14 !h-14 fixed top-[14rem] right-[20px] z-[99999]"
        @click="printContent">
        <font-awesome-icon icon="download" class="text-xl text-slate-200" />
      </button> -->
    </div>
    <div v-if="props.document == null && props.loading === false"
      class="h-screen w-full flex items-start justify-center text-2xl py-5 text-slate-500">
      <div class="flex items-center justify-center flex-col">
        <img src="../assets/images/document-data-file-not-found-con.png" class="object-contain w-[500px] mt-20" />
        <h1 class="text-4xl font-bold mt-4 text-slate-500">
          Document Not Found!
        </h1>
      </div>
      <div>
      </div>
    </div>

    <div v-show="props.document.content" class="_new_sidebar no-print">
      <div role="tablist" class="tabs grid md:grid-flow-col grid-cols-3  tabs-lifted w-full m-auto">
        <input type="radio" name="my_tabs_3" role="tab"
          class="tab flex-wrap text-slate-800 [--tab-bg:#0EA5E9] [--tab-border-color:#0EA5E9]" aria-label="មាតិកា"
          checked />
        <div role="tabpanel" class="tab-content active w-[300px] pt-4">
          <div class="folder-tree-wrapper">
            <ul class="folder-tree" ref="folderTree">
              <li v-for="(item, index) in props.document.heading" :key="index">
                <div class="flex items-center flex-nowrap">
                  <input type="checkbox" class="checkbox checkbox-info !rounded-none" :name="item.text"
                    :checked="item.state.selected" @click="item.state.selected = !item.state.selected"
                    v-on:change="parentChange(item, item.state.selected, item.value, parents, item)">
                  <div class="text-nowrap w-full pl-1"><a :href="item.href"
                      class="text-md link-hover !text-nowrap hover:link-info ml-2"
                      :class="fragment === item.href ? 'link-info':''">{{ item.text }}</a></div>
                  <div v-show="item.children.length > 0" class="arrow px-1">
                    <font-awesome-icon :icon="['fas', 'angle-right']"
                      class="transform transition-transform duration-500 text-2xl text-cyan-500"
                      :class="item.opened === true ? 'rotate-90' : 'rotate-180'" @click="toggleFolder(item)" />
                  </div>
                </div>
                <ul class="ml-2" v-show="item.opened && item.children.length > 0">
                  <li v-for="(child, childIndex) in item.children" :key="childIndex">
                    <div class="flex items-center">
                      <input type="checkbox" class="checkbox checkbox-info !rounded-none" :name="child.text"
                        :checked="child.state.selected" @click="child.state.selected = !child.state.selected"
                        v-on:change="parentChange(item, child.state.selected, child.value, child, item)">
                      <div class="pl-1">
                        <a :href="child.href" class="text-md link-hover !text-nowrap hover:link-info ml-2">{{ child.text
                          }}</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <input type="radio" name="my_tabs_3" role="tab"
          class="tab text-slate-800 [--tab-bg:#0EA5E9] [--tab-border-color:#0EA5E9]" aria-label="ប្រវត្តិ" />
        <div role="tabpanel" class="tab-content pt-4 __history">
          latest version : 1.0
        </div>

        <input type="radio" name="my_tabs_3" role="tab"
          class="tab text-slate-800 [--tab-bg:#0EA5E9] [--tab-border-color:#0EA5E9]" aria-label="លម្អិត" />
        <div role="tabpanel" class="tab-content pt-4 __details">
          <div class="text-lg ">
            <div class="mt-2">ចំណងជើង :</div>
            <div class="mt-2 text-slate-500">{{ props.document.name }}</div>
            <div class="mt-2">ការបរិច្ឆេទបង្ហោះ :</div>
            <span class="text-slate-500">
              {{ formatDate(props.document.date) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="h-auto mt-1 md:mt-10" ref="printableContent" v-html="props.document.content"></div>

  </section>
  <!-- {{ htmlContent }} -->
</template>
<script setup lang="ts">
import axios from "axios";
import { useRoute } from "vue-router";
import { onBeforeUnmount } from "vue";
import { useGlobalDocument } from "../store/document";
import { onBeforeMount, onMounted, computed, ref } from "vue";
const parents = ref<any>("parent");
const child = ref<any>("child");
interface data {
  took: number;
  timed_out: boolean;
  _shards: object;
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: [
      {
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: {
          number: string;
          text: string;
        };
      }
    ];
  };
}
const route = useRoute();
const props = useGlobalDocument();
const items = ref<any>([]);
const loading = ref<any>(true);
const fragment = window.location.hash.substring(1);
console.log(fragment);

const formatDate = (timestamp: any) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: any = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const parentChange = (item: any, selected: any, value: any, type: any, isParent: any) => {
  let content: any = document.getElementById(value);
  if (selected) {
    content.classList.remove('__hide-content');
  } else {
    content.classList.add('__hide-content');
  }
  if (type == 'parent') {
    for (let child of item.children) {
      let content: any = document.getElementById(child.value);
      if (selected) {
        content.classList.remove('__hide-content');
      } else {
        content.classList.add('__hide-content');
      }
      child.state.selected = selected
    }
  }

  if (type === 'child' && isParent) {
    let j: any = true;
    for (let i of isParent.children) {
      j = i.state.selected;
      console.log(j);
    }

    // let content: any = document.getElementById(item.value);
    // if (j == false) {
    //   item.state.selected = false
    //   content.classList.add('__hide-content');
    // } else {
    //   item.state.selected = true
    //   content.classList.remove('__hide-content');
    // }
  }
}
const getDocument = () => {
  props.getDocument(route.params.id);
  if (props.success) {
  } else {
  }
};
getDocument();
// ViewDocumentContent();
const printableContent = ref<any>(null);
const printContent = () => {
  // Get the content to be printed
  const contentToPrint = printableContent.value;

  // Create a new window for printing
  const printWindow = window.open("document", "_blank");

  // Write the content to the new window
  if (printWindow) {
    printWindow.document.write(`
        ${contentToPrint.innerHTML}
    `);

    // Close the print window after printing
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }
};

const style = ref<any>(props.document.css)
const applyStyle = (cssText: any) => {
  const styleTag = document.createElement('style');
  styleTag.textContent = cssText;
  document.head.appendChild(styleTag);
};
const getDocumentStyle = async () => {
  try {
    await axios
      .get(import.meta.env.VITE_VUE_APP_BASE_URL + "document/" + route.params.id,
        {
          withCredentials: false
        })
      .then((response) => {
        if (response) {
          applyStyle(response.data.data.css);
        } else {

        }
      });
  } catch (er) {
    console.log(er);
  }
};

getDocumentStyle()
const toggleFolder = (folder: any) => {
  folder.opened = !folder.opened;

};
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
  font-family: khmerOsMoul;
  src: url("../assets/fonts/KhmerOSMoul.ttf");
}

@font-face {
  font-family: Battambang;
  src: url('./fonts/Battambang.ttf');
}

/* * {
  font-family: "Battambang", sans-serif;
} */

@media print {
  .__sub_title {
    display: none !important;
  }
}

.h_screen{
  height: 100%;
  min-height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
}
.tab {
  --tab-color: #000000 !important;
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
  width: 21cm;
  min-width: 21cm;
  min-height: 29.7cm;
  padding: 1cm;
  /* margin: 1cm auto; */
  border: 1px #D3D3D3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 25px 0;
  color: black !important;
  /* width */
  max-width: 90vw;
  /* float: right; */
  display: flex;
  margin: auto;
  margin-left: 30%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 1cm !important;
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

@media only screen and (min-width: 1200px) {
  ._new_sidebar{
    left: 11%;
  }
}
@media only screen and (max-width: 1190px) {
  ._new_sidebar {
    height: 590px;
    left: 4%;
  }
  .__bg_content{
      width: 19cm !important;
      /* min-width: 19cm !important; */
  }
}
@media only screen and (min-width: 990px) {
  ._new_sidebar {
    left: 7%;
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

.__sidebar span,
p,
a {
  /* font-size: 15px !important; */
  font-family: "Battambang", sans-serif;
}

.__sidebar .checkbox {
  margin-right: 10px;
}

.__content {
  width: 100%;
  float: right;
  height: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  /* text-justify: inherit;
  text-align: justify; */
  line-height: 1.6;
  text-align: justify;
  color: #000000;
  white-space: inherit !important;
  text-justify: inherit !important;
  text-align: justify !important;
}

.__sub_content {
  padding-left: 20px;
}

.__content img,
video {
  margin: auto !important
}

table {
  border: 1px;
  border-style: solid;
}

.__content h1,
h2,
h3 {
  font-weight: bold;
}

.__content p {
  margin-left: 0px;
}

.__content span {
  line-height: 1.6;
  font-size: 16px !important;
}

.__title {
  /* font-size: 20px; */
  color: black;
  font-weight: bold;
}

.__sub_title {
  margin-top: 5px;
  text-transform: initial;
  text-align: justify;
  padding-left: 25px;
  /* font-size: 1.2rem; */
}

.__sidebar-subheading {
  margin-left: 35px;
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
@media only screen and (max-width: 900px) {
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
    margin-top: 1cm !important;
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

  .__content {
    width: 100%;
    margin-left: 0px;
    padding: 0px;
  }
}

@media only screen and (max-width: 600px) {
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
    margin-top: 1cm !important;
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


.folder-tree-wrapper {}

.folder-tree {
  list-style: none;
  cursor: pointer;
  padding-left: 20px;
}

.folder-tree li {
  margin-bottom: 10px;
  font-size: 14px;
  transition: all .4s ease;
  position: relative;
  margin-left: 8px;
}

.folder-tree li:hover {}

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
  content: '';
  left: -15px;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: transparent;
  border-left: dashed 1px #c2c2c2;
  border-bottom: dashed 1px #c2c2c2;
}

.folder-tree li ul li {
  display: block;
  margin-bottom: 8px;
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
  transition: all .4s ease;
}

.folder-tree .arrow:hover i {
  color: #292929;
}

.folder-tree li.expanded>ul {
  display: block;
}

.folder-tree li.expanded>.arrow {
  transform: rotate(0deg);
}
</style>
