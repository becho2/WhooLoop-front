<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create User</h2>
      <form id="create-post-form" @submit.prevent="createUser">
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
        <div>
          <label for="password_confirm"> Password Again </label>
          <input
            type="password"
            id="password_confirm"
            v-model="passwordConfirmation"
            name="password_confirm"
            class="form-control"
            placeholder="Enter password again"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">이메일 등록</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { server } from "../../helper";
import router from "../../router/index";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  methods: {
    createUser() {
      if (this.password !== this.passwordConfirmation) {
        alert("동일한 비밀번호를 입력해주세요.");
        return false;
      }
      let userData = {
        email: this.email,
        password: this.password,
      };
      this.submitToServer(userData);
    },
    submitToServer(userData: any) {
      axios
        .post(`${server.baseUrl}/user`, userData)
        .then((data) => {
          alert(`${this.email}님 가입이 완료되었습니다.`);
          router.push("/");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
