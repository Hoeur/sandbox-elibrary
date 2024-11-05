<template>
    <div class="bg-content w-full min-h-[600px] h-auto p-2 text-slate-200 mt-0 md:mt-10">

        <section class="mt-1 capitalize">
            <hr />
            <div class="flex justify-between items-center py-4">
                <div class="text-slate-800 font-bold text-2xl border-l-4 border-blue-500 px-2">
                    សេចក្តីជូនដំណឹង
                </div>
            </div>
            <hr />
            <div v-if="Posts.loading" class="w-full flex flex-col items-center min-h-[400px]">
                <div class="my-4 w-3/4 relative flex items-end flex-col justify-end">
                    <div class="skeleton bg-slate-400 w-full h-5"></div>
                    <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
                </div>
                <div class="my-4 w-3/4 relative flex items-end flex-col justify-end">
                    <div class="skeleton bg-slate-400 w-full h-5"></div>
                    <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
                </div>
                <div class="my-4 w-3/4 relative flex items-end flex-col justify-end">
                    <div class="skeleton bg-slate-400 w-full h-5"></div>
                    <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
                </div>
                <div class="my-4 w-3/4 relative flex items-end flex-col justify-end">
                    <div class="skeleton bg-slate-400 w-full h-5"></div>
                    <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
                </div>
                <div class="my-4 w-3/4 relative flex items-end flex-col justify-end">
                    <div class="skeleton bg-slate-400 w-full h-5"></div>
                    <div class="skeleton bg-slate-400 w-[80%] h-5 mt-1"></div>
                </div>
            </div>
            <NoticeItem v-else v-for="(item, idx) in Posts.all_categories_posts" v-bind:key="idx" :item="item" />
        </section>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from 'vue'
import { usePost } from "../store/Post";
import NoticeItem from "../components/NoticeItem.vue"
const Posts = usePost();

const getAllPostCategories = async () => {
    await Posts.getAllCategoriesPost();
}

onMounted(async () => {
    await getAllPostCategories()
})
</script>


<style></style>