<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/section">Section</router-link>
  <router-view></router-view>
  <div>
    <div>후잉 바로가기</div>
    <a href="https://whooing.com" target="_blank">
      <img
        src="./assets/whooing-icon-180x180.svg"
        class="logo"
        alt="Whooing logo"
      />
    </a>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
