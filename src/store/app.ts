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
    isLoading: false,
    error: null,
  }),
  actions: {
    setToken(token: any) {
      this.token = token;
    },
    setLoggedIn(login) {
      this.isLoggedIn = login;
    },
    async login(body: any) {
      this.isLoading = true;
      const data = await axios
        .post("https://api.finexkomoditi.id/v1/administrators/auth/login", body)
        .then((res: any) => {
          this.userLogin = res.data.data.name;
          this.token = res.data.data.access_token;
          this.setToken(res.data.data.access_token);
          const decodedToken: any = jwtDecode(res.data.data.access_token);

          localStorage.setItem("currentUser", JSON.stringify(decodedToken));
          localStorage.setItem("username", decodedToken.username);
          localStorage.setItem("role", decodedToken.role);
          localStorage.setItem("userLogin", res.data.data.name);
          localStorage.setItem("token", res.data.data.access_token);
          this.isLoggedIn = true;
          this.isLoading = false;
          router.push("/");
        })
        .catch((err) => {
          console.log("error", err);
          this.error = err.message;
        });
    },
    logout(): void {
      this.setLoggedIn(false);
      localStorage.removeItem("userLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      router.push("/login");
      this.userLogin = null;

      this.token = null;
    },
  },
  getters: {
    isTokenExpired(): boolean {
      const token = localStorage.getItem("token");
      if (!token) {
        return true; // Token not set, consider it expired
      }

      const decodedToken: any = jwtDecode(token);

      this.isLoggedIn = true;
      const expirationTimestamp = decodedToken?.exp * 1000; // Convert seconds to milliseconds

      return Date.now() >= expirationTimestamp;
    },
    isAuthenticated() {
      const token = localStorage.getItem("token");
      console.log("token", token);
      console.log("login", this.isLoggedIn);

      return !!token || this.isLoggedIn;
    },
    getRole() {
      const role = localStorage.getItem("role");
      return role;
    },
    autoLogout() {
      if (this.isTokenExpired) {
        this.logout();
      }
    },
  },
});
