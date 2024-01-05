<template>
  <div class="wrap">
    <div class="login">
      <img src="../assets/login.png" width="150" alt="login" />
      <h1 style="color: white">Admin Panel</h1>
      <form @submit="login">
        <v-text-field
          class="mt-5"
          label="Username"
          bg-color="#ffffff"
          color="#000"
          v-on:keyup.enter="login"
          v-model="username"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-on:keyup.enter="login"
          bg-color="#ffffff"
          color="#000"
          v-model="password"
          prepend-inner-icon="mdi-account-key"
        ></v-text-field>

        <v-btn color="#FFC93C" :loading="app.isLoading" @click="login"
          >MASUK</v-btn
        >
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  background-color: var(--textPrimary);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  border-radius: 10px;
  padding: 60px;
  text-align: center;
  width: 400px;
  height: 600px;
  background-color: var(--woodsmkoke);
}
</style>

<script setup>
import router from "@/router";
import { useAppStore } from "@/store/app";
import { ref, onMounted } from "vue";

const username = ref();
const password = ref();
const app = useAppStore();
onMounted(() => {
  // const token =
});

const login = () => {
  if (username.value && password.value) {
    let body = {
      username: username.value,
      password: password.value,
    };
    app.login(body);
    app.isTokenExpired;
  } else {
    alert("Username atau password tidak valid");
  }
};
</script>
