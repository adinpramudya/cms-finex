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
          to="/produk"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-domain"
          title="Profil Perusahaan"
          value="profil"
          to="/profile"
        ></v-list-item>
        <!-- <v-list v-model:opened="open">
          <v-list-group value="Users">
            <template v-slot:activator="{ props }">
              <v-list-item
                prepend-icon="mdi-domain"
                title="Profil Perusahaan"
                v-bind="props"
                style="font-size: 13px"
              ></v-list-item>
            </template>

            <v-list-item
              prepend-icon="mdi-google-maps"
              title="Google Map"
              value="Google Map"
              to="/g-map"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-contacts"
              title="Kontak"
              to="/kontak"
              value="Kontak"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-information-outline"
              title="Disclaimer"
              to="/disclaimer"
              value="Disclaimer"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-instagram"
              title="Link Media Social"
              to="/social-media"
              value="Link Media Social"
            ></v-list-item>
          </v-list-group>
        </v-list> -->
        <!-- <v-list v-model:opened="open">
          <v-list-item
            prepend-icon="mdi-domain"
            title="Profil Perusahaan"
            value="profil"
          ></v-list-item>
          <v-list-group value="Profile">
            <v-list-item
              value="props"
              prepend-icon="mdi-account-circle"
              title="Google Map"
            ></v-list-item>
            <v-list-item
              value="props"
              prepend-icon="mdi-account-circle"
              title="Kontak"
            ></v-list-item>
            <v-list-item
              value="props"
              prepend-icon="mdi-account-circle"
              title="Disclaimer"
            ></v-list-item>
            <v-list-item
              value="props"
              prepend-icon="mdi-account-circle"
              title="Link Media Social"
            ></v-list-item>
          </v-list-group>
        </v-list> -->
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
};
</script>
