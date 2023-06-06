<template>
  <div class="home">
    <h2>WhooLoop</h2>
    <section>후잉가계부 동일 거래 자동 반복입력기, 후룹</section>
  </div>
  <div>
    <div class="col-md-12 form-wrapper">
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="button" @click="goWhooingOauth">
          후잉으로 로그인(핀 얻기)
        </button>
        <form id="oauth-login-post-form" @submit.prevent="oauthLogin">
          <div>
            <label for="pin"> Pin </label>
            <input
              type="password"
              id="pin"
              v-model="pin"
              name="pin"
              class="form-control"
              placeholder="후잉 pin을 붙여넣어주세요."
            />
          </div>
          <div class="form-group col-md-4 pull-right">
            <button class="btn btn-success" type="submit">핀 확인</button>
          </div>
        </form>
      </div>
      <form id="login-post-form" @submit.prevent="login">
        <div class="form-group col-md-12">
          <label for="email"> Email </label>
          <input
            type="text"
            id="email"
            v-model="email"
            name="email"
            class="form-control"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label for="password"> Password </label>
          <input
            type="password"
            id="password"
            v-model="password"
            name="password"
            class="form-control"
            placeholder="Enter password"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">(BetaTest)Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { useAuthStore } from "../store/modules/auth.store";
import { AuthData, OauthData } from "../store/index.interface";
import { server } from "../server-base-url";

export default {
  data() {
    return {
      email: "",
      password: "",
      pin: "",
      requestToken: "",
    };
  },
  methods: {
    login(): void {
      let userData = {
        email: this.email,
        password: this.password,
      };
      this.submitToServer(userData);
    },
    submitToServer(userData: any): void {
      axios
        .post(`${server.baseUrl}/auth/login`, userData)
        .then((response) => {
          const authData: AuthData = {
            email: this.email,
            accessToken: response.data,
          };
          useAuthStore().login(authData);
          this.$router.push("/transactions");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    goWhooingOauth(): void {
      axios
        .get(`${server.baseUrl}/oauth`)
        .then((response) => {
          this.requestToken = response.data.requestToken;
          window.open(response.data.whooingAuthUrl, "_blank");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    oauthLogin(): void {
      let oauthData = {
        requestToken: this.requestToken,
        pin: this.pin,
      };
      axios
        .post(`${server.baseUrl}/oauth`, oauthData)
        .then((response) => {
          const oauthData: OauthData = {
            userId: response.data.userId,
            accessToken: response.data.accessToken,
            accessTokenSecret: response.data.accessTokenSecret,
          };
          useAuthStore().oauthLogin(oauthData);
          this.$router.push("/transactions");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
