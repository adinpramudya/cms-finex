<template>
  <div class="mt-4">
    <div class="d-flex align-center">
      <hr width="48px" color="black" />
      <h1 class="ml-4 text-h4 font-weight-medium">Dashboard</h1>
    </div>

    <div class="mt-4 d-flex justify-space-between">
      <div v-for="item in card" class="w-100 mx-3">
        <Card
          :title="item.title"
          :value="item.value"
          :image="item.image"
          :image-bw="item.imageBw"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Card from "@/components/Card.vue";
import { useToast, POSITION } from "vue-toastification";
import { productService } from "@/services/product-service";
import { galeriService } from "@/services/galeri-service";
import { postService } from "@/services/post-service";
import { onMounted, ref } from "vue";
export default {
  components: {
    Card,
  },
  data() {
    return {};
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
    const countProduct = ref(0);
    const countGaleri = ref(0);
    const countBerita = ref(0);
    const card = ref();
    const countData = async () => {
      const resPro = await productService.retrieveCount();
      countProduct.value = resPro;
      const resGaleri = await galeriService.retrieveCount();
      countGaleri.value = resGaleri;
      const resPost = await postService.retrieveCount();
      countBerita.value = resPost;
      card.value = [
        {
          title: "Produk",
          value: resPro,
          image:
            "https://res.cloudinary.com/dycicfqk1/image/upload/v1703496959/Attachments/y0fu4nguvm7bw71hcztd.png",
          imageBw:
            "https://res.cloudinary.com/dycicfqk1/image/upload/v1703496966/Attachments/huxagy1apoolagotikgl.png",
        },
        {
          title: "Galeri",
          value: resGaleri,
          image:
            "https://res.cloudinary.com/dycicfqk1/image/upload/v1703496940/Attachments/s7l9yunv4lgegu7lepuy.png",
          imageBw:
            "https://res.cloudinary.com/dycicfqk1/image/upload/v1703496948/Attachments/kcmhtx0fp62j3p7rjk98.png",
        },
        {
          title: "Berita",
          value: resPost,
          image:
            "https://res.cloudinary.com/dycicfqk1/image/upload/v1703496931/Attachments/gsemupxc5py4afalooyl.png",
          imageBw:
            "https://res.cloudinary.com/dycicfqk1/image/upload/v1703496918/Attachments/lhk4yylfemongjiuoagm.png",
        },
      ];
    };
    onMounted(() => {
      countData();
    });
    return { toast, position, card };
  },
};
</script>
