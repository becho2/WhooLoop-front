import { defineStore } from "pinia";
import { AuthData } from "../index.interface";
import router from "../../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authData:
      typeof localStorage.getItem("authData") === "string"
        ? (JSON.parse(localStorage.getItem("authData")) as AuthData)
        : ({ email: "", accessToken: "" } as AuthData),
    returnUrl: "",
  }),
  getters: {},
  actions: {
    login(authData: AuthData): void {
      this.authData = authData;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("authData", JSON.stringify(this.authData));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.authData = { email: "", accessToken: "" } as AuthData;
      localStorage.removeItem("authData");
      router.push("/");
    },
  },
});
