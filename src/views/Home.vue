<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/modules/auth.store";

const store = useAuthStore();
const { accessToken } = storeToRefs(store);
</script>
<template>
  <div class="home">
    <section>후잉가계부 동일 거래 자동 반복입력기, 후룹입니다.</section>
  </div>
  <div>
    <div class="col-md-12 form-wrapper">
      <div class="form-group col-md-4 pull-right">
        <button
          v-if="!accessToken"
          class="btn btn-success"
          type="button"
          @click="goWhooingOauth"
        >
          후잉으로 후룹 로그인하기
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
    </div>
  </div>
</template>

<style scoped>
#oauth-login-post-form {
  display: none;
}
</style>

<script lang="ts">
import axios from "axios";
import { server } from "../server-base-url";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      email: "",
      password: "",
      pin: "",
      requestToken: "",
    };
  },
  created() {
    const route = useRoute();
    if (route.query.pin !== undefined && route.query.token !== undefined) {
      this.requestToken = route.query.token as string;
      this.pin = route.query.pin as string;
      this.oauthLogin();
    }
  },
  methods: {
    login(): void {
      let userData = {
        email: this.email,
        password: this.password,
      };
      this.submitToServer(`${server.baseUrl}/auth/login`, userData);
    },
    oauthLogin(): void {
      let oauthData = {
        requestToken: this.requestToken,
        pin: this.pin,
      };
      this.submitToServer(`${server.baseUrl}/oauth`, oauthData);
    },
    submitToServer(url: string, data: any): void {
      axios
        .post(url, data)
        .then((response) => {
          const accessToken = response.data;
          useAuthStore().login(accessToken);
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
          window.open(response.data.whooingAuthUrl, "_self");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
