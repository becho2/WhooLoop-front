<template>
  <router-link v-if="!authenticated" to="/">Home</router-link>
  <router-link v-if="authenticated" to="/section"> | Section</router-link>
  <router-link v-if="authenticated" to="/" v-on:click.native="logout()" replace>
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
    return {
      authenticated: false,
    };
  },
  methods: {
    setAuthenticated(status: boolean): void {
      this.authenticated = status;
    },
    logout(): void {
      this.authenticated = false;
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
