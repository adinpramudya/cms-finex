// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/berita",
    component: () => import("@/views/Berita/Berita.vue"),
  },
  {
    path: "/produk",
    component: () => import("@/views/Produk/Produk.vue"),
  },
  {
    path: "/berita/tambah-berita",
    name: "TambahBerita",
    component: () => import("@/views/Berita/AddChangeBerita.vue"),
  },
  {
    path: "/produk/tambah-produk",
    name: "TambahProduk",
    component: () => import("@/views/Produk/AddChangeProduk.vue"),
  },
  {
    path: "/berita/:id/ubah-berita",
    name: "UbahBerita",
    component: () => import("@/views/Berita/AddChangeBerita.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
