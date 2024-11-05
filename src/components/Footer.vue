<template>
  <footer class="footer p-10 mt-2 bg_color z-[99999] overflow-hidden text-white">
    <div class="!flex items-center !place-items-center justify-center">
      <div class="">
        <img src="../assets/images/cropped-logo.png" class="w-[100px]" />
        <!-- <div class="site-title-wrap ml-2">
            <p class="site-title text-sm xl:text-xl text-slate-200">
              ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
            </p>
            <p class="site-description text-sm xl:text-xl">
              Ministry of Land Management, Urban Planning and Construction
            </p>
          </div> -->
      </div>
      <div class="ml-5 text-sm md:text-xl">
        {{ $t("copyrighted_by_mlmupc") }}
      </div>
    </div>
    <nav class="!grid-flow-col gap-4 md:place-self-center md:justify-self-end !m-auto">
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
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bg_color {
  background-color: #86C6E0;
}
</style>