<template>
  <div class="section">
    <h2>Section</h2>
    <section>
      * Whooing에서 섹션이름을 변경하셨을 경우 섹션 삭제 후 다시 핀로그인하시면
      변경된 이름으로 추가됩니다. (주의. 현재 섹션 삭제시 기존 해당 섹션에
      연결돼있던 반복거래들은 정상동작하지 않게 됩니다.)
    </section>
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
section {
  padding: 15px;
}
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
import { server } from "../server-base-url";
import { CreateSectionDto } from "../dto/create-section.dto";
import { ref } from "vue";
import { useAuthStore } from "../store/modules/auth.store";
import { SectionDto } from "../dto/section.dto";

export default {
  data() {
    return {
      header: ["idx", "섹션명", "Webhook Url Token", "삭제하기"],
      sections: [],
      sectionName: "",
      webhookUrl: "",
      accessToken: ref(useAuthStore().accessToken),
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
      if (
        confirm(
          `해당 섹션의 반복거래를 삭제 후 다시 등록하셔야 합니다. 그래도 ${section.section_name} 섹션을 삭제하시겠습니까?`
        )
      ) {
        axios
          .delete(
            `${server.baseUrl}/section/${section.section_idx}`,
            this.requestHeader
          )
          .then(() => {
            alert("삭제되었습니다.");
            this.getSections();
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
        .then(() => {
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
