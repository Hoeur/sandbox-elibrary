<template>
  <div class="footer bg_color z-[99999] overflow-hidden text-white !block w-full bg-red-500">
    <div class="block lg:!flex w-full bg-[#1d2846] py-10 justify-center !items-center lg:mr-2 px-4 lg:">
      <div class="w-5/5 lg:w-2/5 flex flex-col lg:flex-row items-center justify-center">
        <img src="../assets/images/cropped-logo.png" class="w-[140px] lg:mr-4" />
        <div class="site-title-wrap ml-2">
          <p class="text-xl text-white font-bold text-center lg:text-start">
            ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់
          </p>
          <p class="site-description text-[10px] md:text-[10px] mt-2 text-white">
            Ministry of Land Management, Urban Planning and Construction
          </p>
        </div>
      </div>
      <div class="lg:w-2/5 w-[100%] grid grid-cols-2 gap-4 items-center">
        <a href="https://maps.app.goo.gl/ep8cPkufQYYvhsvZ6"
          class="border border-neutral-400 text-center flex justify-center items-center text-md w-full h-[50px] cursor-pointer">
          ទីតាំង</a>
        <div onclick="contactModal.showModal()"
          class="border border-neutral-400 text-center flex justify-center items-center text-md w-full h-[50px] cursor-pointer px-2">
          លេខទំនាក់ទំនង
        </div>
        <!-- <div onclick="emailModal.showModal()"
          class="border border-neutral-400 text-center flex justify-center items-center text-md w-full h-[50px] cursor-pointer">
          អ៊ុីម៉ែល
        </div> -->
      </div>
    </div>
    <div class="text-ld md:text-lg text-center w-full flex items-center justify-center py-8 bg-[#eaddc3] text-blue-900">
      {{ $t("copyrighted_by_mlmupc") }}
    </div>
  </div>
  <dialog id="contactModal" class="modal">
    <div class="modal-box !bg-white">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-red-600 !font-bold !text-2xl !bg-transparent">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-2xl text-center text-blue-700">
        លេខទំនាក់ទំនង
      </h3>
      <div class="divider"></div>
      <p class="py-4 text-center text-xl text-blue-500">
        ទូរស័ព្ទទាន់ហេតុការណ៍: 078 90 27 24
      </p>
    </div>
  </dialog>
  <dialog id="emailModal" class="modal">
    <div class="modal-box !bg-white">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 !text-red-600 !font-bold !text-2xl !bg-transparent">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-2xl text-center text-blue-700">អ៊ុីម៉ែល</h3>
      <div class="divider"></div>
      <p class="py-4 text-center text-xl text-blue-500">
        onewindowmlmupc@gmail.com
      </p>
    </div>
  </dialog>
</template>

<script setup lang="ts">

</script>

<style scoped>
.bg_color {
  background-color: #86c6e0;
}
</style>
