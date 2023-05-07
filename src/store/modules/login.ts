import { defineStore } from "pinia";
import { LoginData } from "../index.interface";

export const loginStore = defineStore("login", {
  state: () => ({
    loginData: {
      email: "",
      accessToken: "",
    } as LoginData,
  }),
  getters: {},
  actions: {
    getAccessToken(accessToken: string): void {
      this.loginData.accessToken = accessToken;
    },
    removeAccessToken() {
      this.loginData.accessToken = "";
    },
  },
});
