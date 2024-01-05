<template>
  <v-layout class="h-auto mt-4">
    <v-navigation-drawer
      class="p-0"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list density="compact" nav class="p-0">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/"
          value="dashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-newspaper-variant-outline"
          title="Berita"
          to="/berita"
          value="berita"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-view-gallery-outline"
          title="Galeri"
          value="galeri"
          to="/galeri"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-package"
          title="Produk"
          value="produk"
          v-if="role == 'superadmin'"
          to="/produk"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-domain"
          title="Profil Perusahaan"
          v-if="role == 'superadmin'"
          value="profil"
          to="/profile"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height: 250px"></v-main>
  </v-layout>
</template>
<style lang="scss" scoped>
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline: 9px !important;
}
.v-theme--light {
  background-color: var(--woodsmkoke);
  color: white;
}

.v-list-item-title {
  font-size: 13px !important;
}
.v-navigation-drawer .v-list {
  padding: 0px !important;
}
</style>
<script>
import { useAppStore } from "@/store/app";

export default {
  data() {
    return {
      open: ["Users"],
      drawer: true,
      rail: false,
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
    };
  },
  setup() {
    const app = useAppStore();
    const role = app.getRole;
    return { role };
  },
};
</script>
