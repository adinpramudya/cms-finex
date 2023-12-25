// Utilities
import router from "@/router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    userId: null,
    token: null,
    userLogin: null,
    isLoggedIn: false,
    error: null,
  }),
  actions: {
    setToken(token: any) {
      this.token = token;
    },
    async login(body: any) {
      const data = await axios
        .post("https://api.finexkomoditi.id/v1/administrators/auth/login", body)
        .then((res: any) => {
          this.userLogin = res.data.data.name;
          this.token = res.data.data.access_token;
          this.setToken(res.data.data.access_token);
          localStorage.setItem("userLogin", res.data.data.name);
          localStorage.setItem("token", res.data.data.access_token);
          router.push("/");
        })
        .catch((err) => {
          console.log("error", err);
          this.error = err.message;
        });
    },
    logout(): void {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      this.userLogin = null;
      this.token = null;
      router.push("/login");
    },
  },
  getters: {
    isTokenExpired(): boolean {
      const token = localStorage.getItem("token");
      if (!token) {
        return true; // Token not set, consider it expired
      }

      const decodedToken = jwtDecode(token);

      localStorage.setItem("currentUser", JSON.stringify(decodedToken));
      this.isLoggedIn = true;
      const expirationTimestamp = decodedToken?.exp * 1000; // Convert seconds to milliseconds

      return Date.now() >= expirationTimestamp;
    },
    isAuthenticated() {
      const token = localStorage.getItem("token");

      return !!token;
    },
    getRole() {
      const data = localStorage.getItem("currentUser");
      const role = data ? JSON.parse(data) : null;

      return role.role;
    },
    autoLogout() {
      if (this.isTokenExpired) {
        this.logout();
      }
    },
  },
});
