<template>
  <div class="mt-5">
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <hr width="48px" color="black" />
        <h1 class="ml-4 text-h4 font-weight-medium">Galeri</h1>
      </div>
      <v-btn
        prepend-icon="mdi-plus"
        class="bg-wood color-sunglow"
        @click="toAddGaleri"
      >
        TAMBAH GALERI
      </v-btn>
    </div>
    <v-card-text>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Cari Galeri"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="searchText"
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
    <v-data-table
      class="mt-5"
      :headers="headers"
      :search="searchText"
      :thead-class="'thead-custom'"
      :items="galeries"
      :items-per-page="'7'"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="retrieveGaleries"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<style lang="scss">
.v-toolbar__content,
.v-toolbar__extension {
  display: none !important;
}
</style>
<script lang="ts">
import router from "@/router";
import { Ref, ref, onMounted } from "vue";
import { IGaleri, Galeri } from "@/models/galeri";
import { galeriService } from "@/services/galeri-service";
import { useToast } from "vue-toastification";
export default {
  data: () => ({
    searchText: "",
    dialog: false,
    dialogDelete: false,
    deleteId: null,
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Caption", key: "caption" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    tableHeaderClass: "thead-custom",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {},

  methods: {
    toAddGaleri() {
      router.push({ name: "TambahGaleri" });
    },

    editItem(item: IGaleri) {
      router.push({ name: "UbahGaleri", params: { id: item.id } });
    },

    deleteItem(item: IGaleri) {
      this.deleteId = item.id;
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await galeriService.delete(parseInt(this.deleteId));
      if (res.data) {
        this.toast.success("Galeri Telah Di Hapus", {
          position: "top-right",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        this.closeDelete();
        this.retrieveGaleries();
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
  setup() {
    const isFetching = ref(false);
    let galeries: Ref<IGaleri[]> = ref([]);
    const toast = useToast();

    const retrieveGaleries = async () => {
      try {
        isFetching.value = true;
        const res = await galeriService.retrieve();
        console.log("ress", res);
        galeries.value = res.data.data;
      } catch (error) {
        console.log("error", error);
        isFetching.value = false;
      } finally {
        isFetching.value = false;
      }
    };
    onMounted(() => {
      retrieveGaleries();
    });
    return { galeries, toast, retrieveGaleries };
  },
};
</script>
