<template>
    <div class="flex mb-3">
        <div class="w-full flex flex-col sm:flex-row md:flex-row items-start text-slate-500 gap-2 py-3 md:px-5">
            <div class="w-[300px] flex items-center justify-start">
                <div class="w-[180px] text-sm">{{newDate ?  formatDateToKhmer(newDate||123456789):'' }}</div>
                <div class="w-full mx-2 min-w-[160px]">
                    <span
                        class="type-text-badge-text !text-xs w-full inline-block text-white p-2 uppercase text-bold tracking-wide"
                        :style="{ backgroundColor: props.item.category?.color}">
                        {{ props.item.category?.name }}
                    </span>
                </div>
            </div>
            <div class="w-5/5 md:max-w-[64%] xl:max-w-[67%] text-slate-700 " v-html='props.item?.body'>
            </div>
            <a v-if="props.item.category?.type == 'update'" :href="'/update-laws?date='+ formatDate(props.item.publishedAt||props.item.createdAt)" class="link text-blue-600"><font-awesome-icon :icon="['far', 'copy']" /> មើលលម្អិត</a>
        </div>
    </div>
    <hr>
</template>

<script setup lang="ts">
import { formatDateToKhmer } from '../helper/khmerDateFormat';
import moment from 'moment'
const props = defineProps<{
    item: any
}>()

let newDate = new Date(props.item?.publishedAt||props.item.createdAt).getTime()/1000;
const formatDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD');
}
</script>
<style scoped>
a {
    text-decoration: underline;
    text-decoration-color: blue; /* Change to your desired color */
}
.type-text-badge {
    width: 110px;
}
.type-text-badge-text {
    font-size: 10px;
    text-align: center;
}
</style>