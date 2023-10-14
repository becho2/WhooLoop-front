<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "./store/modules/auth.store";

const store = useAuthStore();
const { accessToken } = storeToRefs(store);
</script>

<template>
  <h1><router-link to="/">WhooLoop</router-link></h1>

  <router-link to="/info">Info </router-link>
  <router-link v-if="accessToken" to="/sections"> | Sections </router-link>
  <router-link v-if="accessToken" to="/transactions">
    | Transactions
  </router-link>
  <router-link v-if="accessToken" to="/" v-on:click.native="logout()" replace>
    | Logout
  </router-link>
  <router-view></router-view>

  <div class="go-to-whooing">
    <a
      href="https://whooing.com/#forum/developer/ko/all/0/_/431595"
      target="_blank"
      >후잉게시판 후룹 소개글 보러가기</a
    >
    <a href="https://whooing.com" target="_blank">
      <div>후잉 메인으로 이동</div>
    </a>
  </div>
  <div>Since 2023, Jinhoe (kimjh620@naver.com)</div>
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
router-link {
  font-size: large;
}
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
