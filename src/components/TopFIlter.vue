<template>
  <section
    class="py-2 d_font w-[100%] md:w-[90%] hidden md:flex shadow-xl relative md:fixed bg-white rounded-lg z-30 items-center justify-center"
  >
    <!-- filter all or only .... -->
    <div class="flex">
      <!-- <div>
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-10"
              class="radio radio-info"
              checked
            />
            <span class="label-text ml-2 text-slate-500 font-bold"
              >Law name only</span
            >
          </label>
        </div> -->
      <div class="">
        <label class="label cursor-pointer">
          <input
            type="radio"
            name="radio-10"
            checked
            class="radio radio-info"
          />
          <span class="label-text ml-2 text-slate-500 font-bold w-full">{{
            $t("all_of_contents")
          }}</span>
        </label>
      </div>
    </div>

    <!-- filter by ...  -->
    <div class="!grid grid-cols-2 md:grid-cols-4">
      <div
        v-for="(item, idx) in props.all_categories"
        v-bind:key="idx"
        class=""
      >
        <label
          v-show="showAll || idx < 4 || (idx >= 4 && show_more)"
          class="cursor-pointer label mx-1"
        >
          <input
            type="checkbox"
            v-model="checkedNames"
            :value="item.id"
            class="checkbox checkbox-info"
          />
          <span class="label-text ml-2 w-full">{{ item.name }}</span>
        </label>
      </div>
    </div>
    <label v-if="props.all_categories.length > 4" class="">
      <div
        tabindex="0"
        class="link link-info text-center"
        @click="handleClickMore"
      >
        {{ !show_more ? $t("see_more") : $t("less") }}
      </div>
    </label>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useGlobalDocument } from "../store/document";
const props = useGlobalDocument();
const checkedNames = ref([]);
props.filters = checkedNames;
props.getAllCategories();
console.log(props.all_categories);

const show_more = ref<boolean>(false);
const showAll = ref(false);
const handleClickMore = () => {
  show_more.value = !show_more.value;
};
</script>

<style>
@font-face {
  font-family: Battambang;
  src: url('./fonts/Battambang.ttf');
}

.d_font{
  font-family: Battambang;
}
</style>