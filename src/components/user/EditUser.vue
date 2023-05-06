<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()">
          View All Users
        </button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2>Edit User</h2>
      <form id="create-post-form" @submit.prevent="editUser">
        <div class="form-group col-md-12">
          <label for="email"> Email </label>
          <input
            type="text"
            id="email"
            v-model="user.email"
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
          <button class="btn btn-success" type="submit">Edit User</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      user: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
  },
  methods: {
    editUser() {
      let userData = {
        email: this.user.email,
        password: this.user.password,
      };
      axios.patch(`${server.baseUrl}/user`, userData).then((data) => {
        console.log(data);
        router.push({ name: "home" });
      });
    },
    getUser() {
      axios
        .get(`${server.baseUrl}/user/${this.id}`)
        .then((data) => (this.user = data.data));
    },
    navigate() {
      router.go(-1);
    },
  },
};
</script>
