<template>
  <div class="wrap">
    <div class="login">
      <img src="../assets/login.png" width="150" alt="login" />
      <h1 style="color: white">Admin Panel</h1>
      <v-text-field
        class="mt-5"
        label="Username"
        bg-color="#ffffff"
        color="#000"
        prepend-inner-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        bg-color="#ffffff"
        color="#000"
        prepend-inner-icon="mdi-account-key"
      ></v-text-field>

      <v-btn color="#FFC93C" @click="login">MASUK</v-btn>
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

const login = () => {
  router.push("/");
};
</script>
