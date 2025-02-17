<script setup>
import { ref } from 'vue';
import { http } from '../utils/http.mjs'

const email = ref('');
const password = ref('');
const name = ref('');

function submit() {
  http.post('/register', {
    name: name.value,
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <div class="flex flex-col p-4">
    <input v-model="name" placeholder="Your name" type="text" />
    <input v-model="email" placeholder="Your email" type="email" />
    <input
      v-model="password"
      placeholder="Your password"
      type="password"
      @keypress.enter="submit"
    />
    <button class="bg-blue-500 text-white" @click="submit">
      Sign up
    </button>
  </div>
</template>
