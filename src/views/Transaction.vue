<template>
  <div class="transaction">
    <h1>Transaction</h1>
    <form id="create-section-form" @submit.prevent="createTransaction">
      <div class="form-group col-md-12">
        <label for="transaction_nickname"> 거래명 </label>
        <input
          type="text"
          id="transaction_nickname"
          v-model="transactionNickname"
          name="transaction_nickname"
          class="form-control"
          placeholder="Set transaction nickname"
        />
      </div>
      <div>
        <label for="request_day_of_week"> 반복요일 </label>
        <select name="request_day_of_week" v-model="requestDayOfWeek">
          <option value="d">매일</option>
          <option value="1">월</option>
          <option value="2">화</option>
          <option value="3">수</option>
          <option value="4">목</option>
          <option value="5">금</option>
          <option value="6">토</option>
          <option value="7">일</option>
        </select>
      </div>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="submit">
          Create Transaction
        </button>
      </div>
    </form>
    <table>
      <thead>
        <th v-for="headerItem in header">{{ headerItem }}</th>
      </thead>
      <tbody>
        <tr v-for="line in transactions">
          <td v-for="item in line">{{ item }}</td>
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
import { CreateTransactionDto } from "../dto/create-section.dto";
import { ref } from "vue";
import { useAuthStore } from "../store/modules/auth.store";

export default {
  data() {
    return {
      header: [
        "idx",
        "섹션idx",
        "거래명",
        "반복요일",
        "반복시간(HHMM)",
        "아이템",
        "금액",
        "왼쪽",
        "오른쪽",
        "메모",
        "생성일시",
        "마지막수정일시",
        "삭제여부",
      ],
      transactions: [],
      sectionIdx: "",
      transactionNickname: "",
      requestDayOfWeek: "",
      requestTime: "",
      transactionItem: "",
      transactionMoney: "",
      transactionLeft: "",
      transactionRight: "",
      transactionMemo: "",
      created: "",
      updatedLast: "",
      isDeleted: "",
      accessToken: ref(useAuthStore().authData.accessToken),
      requestHeader: {},
    };
  },
  created() {
    this.requestHeader = {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    };
    this.getTransactions();
  },
  methods: {
    getTransactions() {
      axios
        .get(`${server.baseUrl}/section`, this.requestHeader)
        .then((data) => {
          this.transactions = data.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    createTransaction() {
      if (!this.transactionItem) {
        alert("아이템이 입력되지 않았습니다.");
        return false;
      }
      let createTransactionDto: CreateTransactionDto = {
        transaction_nickname: this.transactionNickname,
        whooing_webhook_url: this.transactionItem,
      };
      this.submitToServer(createTransactionDto);
    },
    submitToServer(createTransactionDto: CreateTransactionDto) {
      axios
        .post(
          `${server.baseUrl}/section`,
          createTransactionDto,
          this.requestHeader
        )
        .then((data) => {
          alert(
            `${createTransactionDto.section_name} 거래 등록이 완료되었습니다.`
          );
          this.getTransactions();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
