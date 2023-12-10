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
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/galeri",
    component: () => import("@/views/Galeri/Galeri.vue"),
  },
  {
    path: "/produk",
    component: () => import("@/views/Produk/Produk.vue"),
  },
  {
    path: "/profile",
    component: () => import("@/views/Profile/Profile.vue"),
  },
  {
    path: "/berita/tambah-berita",
    name: "TambahBerita",
    component: () => import("@/views/Berita/AddChangeBerita.vue"),
  },
  {
    path: "/berita/:id/ubah-berita",
    name: "UbahBerita",
    component: () => import("@/views/Berita/AddChangeBerita.vue"),
  },
  {
    path: "/produk/tambah-produk",
    name: "TambahProduk",
    component: () => import("@/views/Produk/AddChangeProduk.vue"),
  },
  {
    path: "/galeri/tambah-galeri",
    name: "TambahGaleri",
    component: () => import("@/views/Galeri/AddChangeGaleri.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
