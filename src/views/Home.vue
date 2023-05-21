<template>
  <div class="home">
    <h1>Whooing Everyday</h1>
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
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { server } from "../helper";
import { useAuthStore } from "../store/modules/auth.store";
import { AuthData } from "../store/index.interface";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let userData = {
        email: this.email,
        password: this.password,
      };
      this.submitToServer(userData);
    },
    submitToServer(userData: any) {
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
