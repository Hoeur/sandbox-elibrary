<script setup lang="ts">
import axios from "axios";
import VueCookies from "vue-cookies";
import { defineComponent, ref } from "vue";
import { useGlobalStore } from "../store/store";
// import md5 from 'crypto-js/md5';

interface User {
  user: String;
  name: String;
  email: String;
  language: String;
  theme: String;
  role: String;
  comment: String;
  password: String;
  error: {
    username: String;
    name: String;
    email: String;
    language: String;
    theme: String;
    role: String;
    comment: String;
    password: String;
  };
  success: boolean;
}

const User = ref({
  user: "",
  name: "",
  email: "",
  language: "",
  theme: "",
  role: "",
  comment: "",
  password: "",
  error: {
    user: "",
    name: "",
    email: "",
    language: "",
    theme: "",
    role: "",
    comment: "",
    password: "",
  },
  success: false,
});

// global state
const state = useGlobalStore();
const registerModal = ref();
// function login
const Register = async () => {
  await state.createUser({
    user: User.value.user,
    password: User.value.password,
    email: User.value.email,
    language: User.value.language,
    theme: User.value.theme,
    role: User.value.role,
    comment: User.value.comment,
    name: User.value.name,
  });
  User.value.success = true;
  setTimeout(() => {
    User.value.success = false;
  }, 2000);
  registerModal.value.close();
};
function changeUsername() {
  if (User.value.user === "") {
    User.value.error["user"] = "user is required";
  } else {
    User.value.error["user"] = "";
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
  <form @submit.prevent="Register">
    <dialog ref="registerModal" id="my_modal_2" class="modal">
      <div class="modal-box bg-white">
        <h3 class="font-bold text-center __default_color text-3xl">Sign Up</h3>
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div class="w-full text-slate-800">
          <!-- input user -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg __default_color">user</span>
            </div>
            <input
              type="text"
              placeholder="Input User"
              @input="changeUsername"
              v-model="User.user"
              autocomplete="off"
              required
              class="input input-bordered input-ghost bg-white w-full"
            />
            <div class="label" v-if="User.error.user == 'username is required'">
              <span class="label-text-alt text-error">{{
                User.error.user
              }}</span>
            </div>
          </label>
          <!-- input name -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg __default_color">name</span>
            </div>
            <input
              type="text"
              placeholder="Input name"
              @input="changeUsername"
              v-model="User.name"
              autocomplete="off"
              required
              class="input input-bordered input-ghost bg-white w-full"
            />
            <div class="label" v-if="User.error.name == 'name is required'">
              <span class="label-text-alt text-error">{{
                User.error.name
              }}</span>
            </div>
          </label>
          <!-- input email -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg __default_color">Email</span>
            </div>
            <input
              type="email"
              placeholder="Input Email"
              @input="changeUsername"
              v-model="User.email"
              autocomplete="off"
              required
              class="input input-bordered input-ghost bg-white w-full"
            />
            <div class="label" v-if="User.error.email == 'email is required'">
              <span class="label-text-alt text-error">{{
                User.error.email
              }}</span>
            </div>
          </label>
          <!-- input language -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg __default_color">language</span>
            </div>
            <input
              type="text"
              placeholder="Input language"
              @input="changeUsername"
              v-model="User.language"
              autocomplete="off"
              required
              class="input input-bordered input-ghost bg-white w-full"
            />
            <div class="label" v-if="User.error.language == 'language is required'">
              <span class="label-text-alt text-error">{{
                User.error.language
              }}</span>
            </div>
          </label>
          <!-- input password -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg __default_color">Password</span>
            </div>
            <input
              type="password"
              placeholder="Input password"
              v-model="User.password"
              @input="changePassword"
              autocomplete="off"
              required
              class="input input-bordered input-ghost bg-white w-full"
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
          <!-- input confirm password -->
           <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-lg __default_color">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Input confirm password"
              v-model="User.password"
              @input="changePassword"
              autocomplete="off"
              required
              class="input input-bordered input-ghost bg-white w-full"
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
          <a href="/" class="link __default_color py-2"
            >you already sign up?</a
          >
          <div>
            <button
              class="btn __default_bg_color text-slate-200 w-full mt-2 text-xl hover:bg-blue-800"
              type="submit"
            >
              Sign Up
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
      <span>Your username {{ User.user }} Login Successfully</span>
    </div>
  </form>
</template>