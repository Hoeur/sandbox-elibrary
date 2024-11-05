<template>
    <div class="w-full flex items-center gap-5 lg:gap-0">
        <div class="w-[100%] lg:w-full flex flex-col gap-3">
            <div class="flex flex-col justify-between items-center lg:flex-row bg-[#F5F6F8] p-5 gap-3">
                <div class="w-full lg:border-r-2 lg:border-slate-300">
                    <div class="text-slate-700 flex gap-3 mb-1">
                        <span class="inline-block bg-[#636974] text-white p-1 text-sm text-center min-w-[120px]"
                            v-for="(status, idx) in uniqueCategories(props.item.categories)" :key="idx">
                            {{ status.name }}
                        </span>
                        <span v-show="uniqueCategories(props.item.categories).length == 0"
                            class="inline-block bg-[#636974] text-white p-1 text-sm text-center min-w-[120px]">
                            មិនមាន
                        </span>
                    </div>
                    <div v-if="ifResultPage" @click="handleClickDetail(props.item.id)"
                        class="font-black text-xl hover:link text-blue-800 lg:basis-3/5">
                        <div class="font-bold text-lg" v-html="highlightText(props.item?.name, props.item?.words)"></div>
                        <!-- <div class="overflow-hidden text-sm whitespace-nowrap overflow-ellipsis max-w-[800px] text-black"
                            v-html="highlightText(props.item?.text, props.item?.words)"></div> -->
                    </div>
                    <div v-else @click="handleClickDetail(props.item?.id)"
                        class="font-black text-xl hover:link text-blue-800 lg:basis-3/5">
                        {{ props.item?.name }}
                    </div>
                </div>
                <div class="flex flex-col  md:justify-start gap-2 text-slate-600 text-sm w-full lg:basis-1/3">
                    <div v-if="data.loading"></div>
                    <div v-else>
                        <span class="mr-2">កាលបរិច្ឆេទប្រកាសឲ្យប្រើ
                            : {{ getDateFormat() }}</span>
                        <!-- <span>({{ props.item.note }})</span> -->
                    </div>
                    <div v-if="data.loading"></div>
                    <div v-else>កាលបរិច្ឆេទបង្ហោះ​ : {{ props.item.date ? formatDateToKhmer(props.item.date||123456789):'' }}</div>
                </div>
                <div
                    class="hidden lg:flex lg:flex-col lg:justify-evenly lg:items-center gap-2 text-blue-700 basis-1/15">
                    <!-- <font-awesome-icon :icon="['far', 'file']" class="cursor-pointer" /> -->
                    <font-awesome-icon :icon="['fas', 'download']" @click="openModal(props.item.id)"
                        class="cursor-pointer" />
                </div>
            </div>
        </div>
        <div class="flex-col justify-start hidden text-blue-700 text-2xl gap-5">
            <!-- <font-awesome-icon :icon="['far', 'file']" /> -->
            <font-awesome-icon :icon="['fas', 'download']" @click="openModal(props.item.id)" class="cursor-pointer"/>
        </div>
    </div>
    <!-- modal download  -->
    <dialog ref="modalDownload" :id="'modal' + props.item.id" class="modal top-0 right-0">
        <div class="modal-box !bg-slate-200 text-slate-800">
            <form method="dialog">
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-red-600 !font-bold !text-2xl !bg-transparent"
                    @click="closeModal(props.item.id)">
                    ✕
                </button>
            </form>
            <div class="!grid grid-cols-2 md:grid-cols-3 gap-1 my-2">
                <div @click="clickDownload()"
                    class="flex items-center justify-center flex-col cursor-pointer transition-all transform hover:scale-105">
                    <img src="../../assets/images/1200px-PDF_file_icon.png" alt="img-pdf-download" class="w-[40px]" />
                    <p class="text-sm mt-2">ទាញយកជាទម្រង់ PDF</p>
                </div>
                <div @click="clickDownloadDocx()"
                    class="flex items-center justify-center flex-col cursor-pointer transition-all transform hover:scale-105">
                    <img src="../../assets/images/icons8-microsoft-word-2019-240.png" alt="img-docx-download" class="w-[50px]" />
                    <p class="text-sm mt-2">ទាញយកជាទម្រង់ WORD</p>
                </div>
            </div>
        </div>
    </dialog>
    <!-- end modal download  -->
</template>

<script setup lang="ts">
import { useGlobalDocument } from "../../store/document";
import { formatDateToKhmer } from '../../helper/khmerDateFormat';
import { useRoute } from "vue-router";
import { ref } from "vue"; 
import _ from 'lodash';
import { API } from "@/types/api";
const data = useGlobalDocument();
const route = useRoute();
const props = defineProps<{
    item: any
}>()

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

const getDateFormat = () => {
    let date = new Date()
    let newDate: any;
    if (props.item.attributes.length > 0 && props.item.attributes[0] != null) {
        props.item.attributes.forEach((itm: any) => {
            if (itm?.name == "កាលបរិច្ឆេទចេញផ្សាយ" && itm?.name && itm?.name != null ) {
                let DateFormat = new Date(itm.value)        
                newDate = formatDateToKhmer(DateFormat,true);
                return newDate;
            }
        });
    }
    
    return newDate;
};

const  bytesToKilobytes = (bytes:any) => {
  const kilobytes = bytes / 1024;
  return `${kilobytes.toFixed(2)} KB`;
}
const clickDownload = async () => {
    // await data.DownloadDocument(props.item.name, props.item.id, 1);
    window.location.href = API+'download/'+props.item.id
};

const uniqueCategories = (cat:any):any => {
  return _.unionBy(cat, 'id')
};
const clickDownloadDocx = async () => {
    await data.DownloadDocumentDocx(props.item.name, props.item.id, 1);
};
const handleClickDetail = (id: any) => {
    window.location.href=`document/${id}`;
};

const ifResultPage = ref<boolean>(false);
const ifResult = () => {
    if (route.name == 'result') {
        ifResultPage.value = true
        return;
    } else {
        ifResultPage.value = false;
        return;
    }
}
ifResult()
const highlightText = (text: string, words: string[]) => {
    if (!words || words.length === 0) return text;

    const regex = new RegExp(words?.join('|'), 'gi');
    return text?.replace(regex, '<span class="highlight highlight_text">$&</span>');
};
</script>

<style scoped>
a {
    text-decoration: underline;
    text-decoration-color: blue;
    /* Change to your desired color */
}
</style>