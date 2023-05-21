<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "./store/modules/auth.store";

const store = useAuthStore();
const { authData } = storeToRefs(store);
</script>

<template>
  <router-link v-if="!authData.accessToken" to="/">Home</router-link>
  <router-link v-if="!authData.accessToken" to="/create-user">
    | Join</router-link
  >
  <router-link v-if="authData.accessToken" to="/edit-user"> MyPage</router-link>
  <router-link v-if="authData.accessToken" to="/sections">
    | Sections</router-link
  >
  <router-link v-if="authData.accessToken" to="/transactions">
    | Transactions</router-link
  >
  <router-link
    v-if="authData.accessToken"
    to="/"
    v-on:click.native="logout()"
    replace
  >
    | Logout
  </router-link>
  <router-view></router-view>
  <div class="go-to-whooing">
    <a href="https://whooing.com" target="_blank">
      <div>후잉 바로가기</div>
      <img
        src="./assets/whooing-icon-180x180.svg"
        class="logo"
        alt="Whooing logo"
      />
    </a>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    logout(): void {
      useAuthStore().logout();
    },
  },
};
</script>

<style scoped>
.go-to-whooing {
  padding: 1.5em;
}
.logo {
  height: 6em;
  padding: 1em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
