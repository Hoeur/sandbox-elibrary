<script setup lang="ts">
import axios from "axios";
import VueCookies from "vue-cookies";
import { defineComponent, ref } from "vue";
import { useGlobalStore } from "../store/store";
// import md5 from 'crypto-js/md5';

interface User {
  username: String;
  password: String;
  error: {
    username: String;
    password: String;
  };
  success: boolean;
}

const User = ref({
  username: "",
  password: "",
  error: {
    username: "",
    password: "",
  },
  success: false,
});

// global state
const state = useGlobalStore();
const loginModal = ref();
// function login
const Login = async () => {
  await state.Login(User.value.username, User.value.password);
  User.value.success = true;
  setTimeout(() => {
    User.value.success = false;
  }, 2000);
  loginModal.value.close();
};
function changeUsername() {

  if (User.value.username === "") {
    User.value.error["username"] = "username is required";
  } else {
    User.value.error["username"] = "";
  }
}
function changePassword() {
  if (User.value.password === "") {
    User.value.error["password"] = "password is required";
  } else {
    User.value.error["password"] = "";
  }
}
</script>

<template>
  <form @submit.prevent="Login">
    <dialog ref="loginModal" id="my_modal_1" class="modal">
      <div class="modal-box !bg-white">
        <h3 class="font-bold text-center !text-sky-500 text-3xl">Sign In</h3>
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div class="w-full text-slate-800">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg !text-sky-500">username</span>
            </div>
            <input
              type="text"
              placeholder="Input UserName"
              @input="changeUsername"
              v-model="User.username"
              autocomplete="off"
              required
              class="input input-bordered input-ghost !bg-white w-full"
            />
            <div
              class="label"
              v-if="User.error.username == 'username is required'"
            >
              <span class="label-text-alt text-error">{{
                User.error.username
              }}</span>
            </div>
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg !text-sky-500">Password</span>
            </div>
            <input
              type="password"
              placeholder="Input password"
              v-model="User.password"
              @input="changePassword"
              autocomplete="off"
              required
              class="input input-bordered input-ghost !bg-white w-full"
            />
            <div class="label">
              <div
                class="label"
                v-if="User.error.password == 'password is required'"
              >
                <span class="label-text-alt text-error">{{
                  User.error.password
                }}</span>
              </div>
            </div>
          </label>
          <!-- <a onclick="my_modal_2.showModal()" class="link __default_color py-2">you don't have account?</a> -->
          <div>
            <button class="btn btn-info !text-slate-200 w-full mt-2 !text-xl hover:bg-sky-500" type="submit">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </dialog>
    <div
      v-if="User.success"
      role="alert"
      class="alert alert-info w-[400px] z-[999] fixed top-2 right-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Your username {{ User.username }} Login Successfully</span>
    </div>
  </form>
</template>