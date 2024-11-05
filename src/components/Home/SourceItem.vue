<template>
    <div class="flex flex-col lg:basis-1/2">
        <div class="text-slate-900 py-5 text-lg">{{ props.item[0].key }}</div>
        <div class="flex flex-col bg-[#e8e9e9] p-5 h-full">
            <div v-for="(source, idx) in props.item[0].list" :key="idx" class="my-1">
                <a @click="handleClickDetail(source.url)" class="text-blue-600 cursor-pointer">{{ source.title }}</a>
            </div>
        </div>
    </div>
    <div class="flex flex-col lg:basis-1/2">
        <div class="text-slate-900 py-5 h-[1px] md:h-[68px] text-lg"></div>
        <div class="flex flex-col bg-[#e8e9e9] p-5">
            <div v-if="about.loading" class="my-1 text-slate-700 text-center min-h-[168px] flex items-center justify-center">
                <span class="loading loading-spinner w-[2rem] text-primary"></span>
            </div>
            <div v-else class="my-1 text-slate-700">
                <p v-html="about.data?.content"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type DummySource } from "../../store/dummyDocumentStore"
import { useRouter} from "vue-router"
import { useAbout } from "../../store/about";
import { onMounted } from "vue";
const about = useAbout()
const props = defineProps<{
    item: Array<DummySource>
}>()

const router = useRouter();
const handleClickDetail = (link:any) => {
    window.location.href=link
}

onMounted(async() => {
    await about.getAllAbout()
})
</script>

<style scoped>
a {
    text-decoration: underline;
    text-decoration-color: blue;
    /* Change to your desired color */
}
</style>
