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
    async login(body: any) {
      const data = await axios
        .post("https://api.finexkomoditi.id/v1/administrators/auth/login", body)
        .then((res: any) => {
          this.userLogin = res.data.data.name;
          this.token = res.data.data.access_token;
          localStorage.setItem("userLogin", res.data.data.name);
          localStorage.setItem("token", res.data.data.access_token);
          console.log("user", this.userLogin);
          console.log("data", res.data.data);
        })
        .catch((err) => {
          console.log("error", err);
          this.error = err.message;
        });
    },
    logout(): void {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("token");
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
      console.log("decode", decodedToken);
      this.isLoggedIn = true;
      const expirationTimestamp = decodedToken?.exp * 1000; // Convert seconds to milliseconds

      return Date.now() >= expirationTimestamp;
    },
    autoLogout() {
      if (this.isTokenExpired) {
        this.logout();
      }
    },
  },
});
