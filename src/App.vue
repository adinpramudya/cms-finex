<template>
  <v-app>
    <Navbar />
    <v-row>
      <v-col :cols="2" class="bg-wood custom-col"><SideBar /> </v-col>
      <v-col :cols="10" class="custom-main">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-app>
</template>
<style lang="scss" scoped>
.v-row {
  margin: 0px;
}
.custom-main {
  height: calc(100vh - 77px);
  overflow: auto;
}
.custom-col {
  padding: 0px !important;
}
.v-application--wrap {
  height: 100vh !important;
}
</style>
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import SideBar from "./components/SideBar.vue";
</script>
