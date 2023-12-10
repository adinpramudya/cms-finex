<template>
  <v-app>
    <Navbar v-if="isShow" />
    <v-row v-if="isShow">
      <v-col :cols="2" class="bg-wood custom-col"><SideBar /> </v-col>
      <v-col :cols="10" class="custom-main">
        <router-view></router-view>
      </v-col>
    </v-row>
    <router-view v-else></router-view>
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
import { useRoute, useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";
import SideBar from "./components/SideBar.vue";

import { ref, onMounted, watch } from "vue";

const currentRoute = ref(useRoute());
const isShow = ref(true);
const router = useRouter();
onMounted(() => {
  const unwatch = router.beforeEach((to, from, next) => {
    // Update the current route
    currentRoute.value = to;

    // Continue with the navigation
    next();
  });

  // Optionally, you can log the current route on component mount
  console.log("Current Route on mount:", currentRoute.value.path);

  // Remember to clean up the watcher when the component is unmounted
});

watch(currentRoute, (newRoute) => {
  if (currentRoute.value.path == "/login") {
    isShow.value = false;
  } else {
    isShow.value = true;
  }
});
</script>
