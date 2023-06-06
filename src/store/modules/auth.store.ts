import { defineStore } from "pinia";
import router from "../../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.accessToken ?? "",
    returnUrl: "",
  }),
  getters: {},
  actions: {
    login(accessToken: string): void {
      this.accessToken = accessToken;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("accessToken", accessToken);
      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.accessToken = "";
      localStorage.removeItem("accessToken");
      router.push("/");
    },
  },
});
