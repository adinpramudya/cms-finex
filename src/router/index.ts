// Composables
import { useAppStore } from "@/store/app";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/berita",
    component: () => import("@/views/Berita/Berita.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresUnAuth: true },
  },
  {
    path: "/galeri",
    component: () => import("@/views/Galeri/Galeri.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/produk",
    component: () => import("@/views/Produk/Produk.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: () => import("@/views/Profile/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/berita/tambah-berita",
    name: "TambahBerita",
    component: () => import("@/views/Berita/AddChangeBerita.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/berita/:id/ubah-berita",
    name: "UbahBerita",
    component: () => import("@/views/Berita/AddChangeBerita.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/produk/tambah-produk",
    name: "TambahProduk",
    component: () => import("@/views/Produk/AddChangeProduk.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/produk/:id/tambah-produk",
    name: "UbahProduk",
    component: () => import("@/views/Produk/AddChangeProduk.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/galeri/tambah-galeri",
    name: "TambahGaleri",
    component: () => import("@/views/Galeri/AddChangeGaleri.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/galeri/:id/ubah-galeri",
    name: "UbahGaleri",
    component: () => import("@/views/Galeri/AddChangeGaleri.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const app = useAppStore();
  const isAuthenticated = app.isAuthenticated;
  console.log("auth", isAuthenticated);

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    // Redirect to login if trying to access a protected route without authentication
    next({ path: "/login" });
  } else if (
    to.matched.some((record) => record.meta.requiresUnAuth) &&
    isAuthenticated
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
