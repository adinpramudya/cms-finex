<template>
  <div class="mt-4">
    <div class="d-flex align-center">
      <hr width="48px" color="black" />
      <h1 class="ml-4 text-h4 font-weight-medium">Dashboard</h1>
    </div>

    <div class="mt-4 d-flex justify-space-between">
      <div v-for="item in card" class="w-100 mx-3">
        <Card :title="item.title" :value="item.value" :image="item.image" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Card from "@/components/Card.vue";
import { useToast, POSITION } from "vue-toastification";
import { onMounted } from "vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      card: [
        {
          title: "Produk",
          value: 4,
          image: "ic-product",
        },
        {
          title: "Galeri",
          value: 4,
          image: "galeri",
        },
        {
          title: "Berita",
          value: 4,
          image: "berita",
        },
      ],
    };
  },
  methods: {},
  created() {
    this.toast("Selamat Datang di Dashboard Admin", {
      position: this.position,
      timeout: false,
      closeOnClick: false,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  },
  setup() {
    const toast = useToast();
    const position: POSITION | undefined = "top-right" as POSITION;

    onMounted(() => {});
    return { toast, position };
  },
};
</script>
