<template>
  <div class="home">
    <h2>WhooLoop</h2>
    <section>후잉가계부 동일 거래 자동 반복입력기, 후룹</section>
  </div>
  <div>
    <div class="col-md-12 form-wrapper">
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
          <button class="btn btn-success" type="submit">Login</button>
        </div>
      </form>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="button" @click="resetPassword">
          비밀번호 찾기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { useAuthStore } from "../store/modules/auth.store";
import { AuthData } from "../store/index.interface";
import { server } from "../server-base-url";

export default {
  data() {
    return {
      email: "",
      password: "",
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
    resetPassword(): void {
      alert("이메일을 통한 비밀번호 재설정 기능을 개발 중입니다.");
    },
    submitToServer(userData: any): void {
      axios
        .post(`${server.baseUrl}/auth/login`, userData)
        .then((data) => {
          const authData: AuthData = {
            email: this.email,
            accessToken: data.data,
          };
          useAuthStore().login(authData);
          this.$router.push("/transactions");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
