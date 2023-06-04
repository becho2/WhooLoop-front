<template>
  <div>
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
            v-model="user.password"
            name="password"
            class="form-control"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label for="password_confirm"> Password 재입력 </label>
          <input
            type="password"
            id="password_confirm"
            v-model="user.passwordConfirmation"
            name="password_confirm"
            class="form-control"
            placeholder="Enter password again"
          />
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit">비밀번호 변경</button>
        </div>
      </form>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="button" @click="deleteUser">
          회원 탈퇴
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { server } from "../../helper";
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "../../store/modules/auth.store";

export default {
  data() {
    return {
      id: 0,
      accessToken: ref(useAuthStore().authData.accessToken),
      header: {},
      user: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    };
  },
  created() {
    this.header = {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    };
    this.getUser();
  },
  methods: {
    editUser() {
      if (this.user.password !== this.user.passwordConfirmation) {
        alert("동일한 비밀번호를 입력해주세요.");
        return false;
      }
      let userData = {
        password: this.user.password,
      };
      axios
        .patch(`${server.baseUrl}/user`, userData, this.header)
        .then(() => {
          alert("패스워드가 성공적으로 변경되었습니다.");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    deleteUser() {
      if (
        !confirm(
          "정말 탈퇴하시겠습니까? 모든 관련 데이터가 완전히 삭제됩니다.(복구불가)"
        )
      ) {
        return false;
      }
      axios
        .delete(`${server.baseUrl}/user`, this.header)
        .then(() => {
          alert("회원탈퇴에 성공하였습니다.");
          useAuthStore().logout();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    getUser() {
      const getUserUrl = `${server.baseUrl}/user`;

      axios
        .get(getUserUrl, this.header)
        .then((data) => {
          if (!data.data) {
            alert("회원정보가 없습니다. 다시 로그인해주세요.");
            useAuthStore().logout();
          }
          this.user = data.data;
        })
        .catch((error) => {
          switch (error.response.data.statusCode) {
            case 401:
              useAuthStore().logout();
              alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
              break;
            default:
              alert(error.response.data.message);
              break;
          }
        });
    },
  },
};
</script>
