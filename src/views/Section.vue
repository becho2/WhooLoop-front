<template>
  <div class="section">
    <h1>Section</h1>
    <table>
      <thead>
        <th v-for="item in header">{{ item }}</th>
      </thead>
      <tbody>
        <tr v-for="line in sections">
          <td v-for="item in line">{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { server } from "../helper";

export default {
  data() {
    return {
      header: ["섹션명", "Webhook Url"],
      sections: [],
    };
  },
  created() {},
  methods: {
    getSections(idx: number) {
      axios
        .get(`${server.baseUrl}/user/${idx}`)
        .then((data) => {
          this.sections = data.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
