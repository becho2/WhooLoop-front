<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <!-- <button class="btn btn-success" v-on:click="navigate()">
          View All Users
        </button> -->
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
            readonly
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
            name="password_confirm"
            class="form-control"
            placeholder="Enter password again"
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
export default {
  data() {
    return {
      id: 0,
      user: {},
    };
  },
  created() {
    this.accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indob29pbmdldmVyeWRheTNAZ21haWwuY29tIiwidXNlcl9pZHgiOjcsImlhdCI6MTY4MzM0NDk0MiwiZXhwIjoxNjgzMzQ4NTQyfQ.bW6yblAwY7k2SZrdXlVoFjNoZFBJYk0a1o0GxlB3tEs";
    this.getUser(this.accessToken);
  },
  methods: {
    editUser() {
      let userData = {
        password: this.user.password,
      };
      axios
        .patch(`${server.baseUrl}/user`, userData)
        .then((data) => {})
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    getUser() {
      const getUserUrl = `${server.baseUrl}/user`;
      const header = {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      };
      axios.get(getUserUrl, header).then((data) => {
        console.log(data);
        this.user = data.data;
      });
    },
  },
};
</script>
