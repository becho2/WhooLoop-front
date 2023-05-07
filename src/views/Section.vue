<template>
  <div class="section">
    <h1>Section</h1>
    <input type="text" v-model="accessToken" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/modules/auth.store";

export default {
  data() {
    return {
      email: "",
      accessToken: ref(useAuthStore().loginData.accessToken),
    };
  },
  methods: {},
};
</script>
