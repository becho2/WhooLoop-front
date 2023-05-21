<template>
  <div class="section">
    <h1>Section</h1>
    <form id="create-section-form" @submit.prevent="createSection">
      <div class="form-group col-md-12">
        <label for="section_name">섹션명 </label>
        <input
          type="text"
          id="section_name"
          v-model="sectionName"
          name="section_name"
          class="form-control"
          placeholder="Set section name"
        />
      </div>
      <div>
        <label for="webhook_url">후잉 Webhook Url </label>
        <input
          type="webhook_url"
          id="webhook_url"
          v-model="webhookUrl"
          name="webhook_url"
          class="form-control"
          placeholder="Copy webhook url and paste that here"
        />
      </div>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="submit">섹션 등록</button>
      </div>
    </form>
    <table>
      <thead>
        <th v-for="headerItem in header">{{ headerItem }}</th>
      </thead>
      <tbody>
        <tr v-for="line in sections">
          <td v-for="item in line">{{ item }}</td>
          <td>
            <button v-on:click="deleteSection(line)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table {
  width: 100%;
  border: 1px solid #444444;
}
th,
td {
  border: 1px solid #444444;
}
</style>

<script lang="ts">
import axios from "axios";
import { server } from "../helper";
import { CreateSectionDto } from "../dto/create-section.dto";
import { ref } from "vue";
import { useAuthStore } from "../store/modules/auth.store";
import { SectionDto } from "../dto/section-item.dto";

export default {
  data() {
    return {
      header: ["idx", "섹션명", "Webhook Url", "생성일시", ""],
      sections: [],
      sectionName: "",
      webhookUrl: "",
      accessToken: ref(useAuthStore().authData.accessToken),
      requestHeader: {},
    };
  },
  created() {
    this.requestHeader = {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    };
    this.getSections();
  },
  methods: {
    deleteSection(section: SectionDto) {
      if (confirm(`${section.section_name} 섹션을 정말 삭제하시겠습니까?`)) {
        axios
          .delete(
            `${server.baseUrl}/section/${section.section_idx}`,
            this.requestHeader
          )
          .then((data) => {
            alert("삭제되었습니다.");
            location.reload();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    getSections() {
      axios
        .get(`${server.baseUrl}/section`, this.requestHeader)
        .then((data) => {
          this.sections = data.data;
        })
        .catch((error) => {
          switch (error.response.data.statusCode) {
            case 401:
              useAuthStore().logout();
              alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
              break;
            case 404:
              break;
            default:
              alert(error.response.data.message);
              break;
          }
        });
    },
    createSection() {
      if (!this.webhookUrl) {
        alert("webhook url is required");
        return false;
      }
      let createSectionDto: CreateSectionDto = {
        section_name: this.sectionName,
        whooing_webhook_url: this.webhookUrl,
      };
      this.submitToServer(createSectionDto);
    },
    submitToServer(createSectionDto: CreateSectionDto) {
      axios
        .post(`${server.baseUrl}/section`, createSectionDto, this.requestHeader)
        .then((data) => {
          alert(`${createSectionDto.section_name} 섹션 등록이 완료되었습니다.`);
          this.getSections();
        })
        .catch((error) => {
          if (error.response.data.statusCode == 401) {
            useAuthStore().logout();
            alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
          } else {
            alert(error.response.data.message);
          }
        });
    },
  },
};
</script>
