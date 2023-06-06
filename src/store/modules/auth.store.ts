import { defineStore } from "pinia";
import { AuthData, OauthData } from "../index.interface";
import router from "../../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authData: JSON.parse(
      localStorage.getItem("authData") ?? '{"email":"", "accessToken":""}'
    ) as AuthData,
    oauthData: JSON.parse(
      localStorage.getItem("OauthData") ??
        '{"userId":"", "accessToken":"", "accessTokenSecret":""}'
    ) as OauthData,
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
    oauthLogin(oauthData: OauthData): void {
      this.oauthData = oauthData;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("oauthData", JSON.stringify(this.oauthData));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.authData = { email: "", accessToken: "" } as AuthData;
      this.oauthData = {
        userId: "",
        accessToken: "",
        accessTokenSecret: "",
      } as OauthData;
      localStorage.removeItem("authData");
      localStorage.removeItem("oauthData");
      router.push("/");
    },
  },
});
