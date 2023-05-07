<template>
  <div class="section">
    <h1>Section</h1>
    <input type="text" v-model="accessToken" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { loginStore } from "../store/modules/login";

export default {
  data() {
    return {
      email: "",
      accessToken: ref(loginStore().loginData.accessToken),
    };
  },
  methods: {},
};
</script>
