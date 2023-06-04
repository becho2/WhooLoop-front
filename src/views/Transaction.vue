<template>
  <div class="transaction">
    <h2>반복할 거래</h2>
    <form id="create-transaction-form" @submit.prevent="createTransaction">
      <div>
        <label for="section_idx"> 섹션 </label>
        <select name="section_idx" v-model="sectionIdx">
          <option
            v-for="section in sectionsOfUsers"
            :value="section.section_idx"
          >
            {{ section.section_name }}
          </option>
        </select>
      </div>
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
      <div class="form-group col-md-12">
        <label for="request_time"> 반복시간(HHMM) </label>
        <input
          type="text"
          id="request_time"
          v-model="requestTime"
          name="request_time"
          class="form-control"
          placeholder="시간분 4자리 숫자로 입력"
        />
      </div>
      <div>(ex.오전 7시:0700, 오후 3시12분:1512)</div>
      <div class="form-group col-md-12">
        <label for="transaction_item"> 아이템 </label>
        <input
          type="text"
          id="transaction_item"
          v-model="transactionItem"
          name="transaction_item"
          class="form-control"
          placeholder="거래 아이템 입력"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="transaction_money_amount"> 금액 </label>
        <input
          type="text"
          id="transaction_money_amount"
          v-model="transactionMoneyAmount"
          name="transaction_money_amount"
          class="form-control"
          placeholder="후잉 거래 금액 입력"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="transaction_left"> 왼쪽 </label>
        <input
          type="text"
          id="transaction_left"
          v-model="transactionLeft"
          name="transaction_left"
          class="form-control"
          placeholder="거래 왼쪽 정확히 입력"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="transaction_right"> 오른쪽 </label>
        <input
          type="text"
          id="transaction_right"
          v-model="transactionRight"
          name="transaction_right"
          class="form-control"
          placeholder="거래 오른쪽 정확하게 입력"
        />
      </div>
      <div class="form-group col-md-12">
        <label for="transaction_memo"> 메모 </label>
        <input
          style="width: 400px"
          type="text"
          id="transaction_memo"
          v-model="transactionMemo"
          name="transaction_memo"
          class="form-control"
          placeholder="(필수 아님)후잉 거래 메모를 입력하세요"
        />
      </div>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="submit">거래 등록</button>
      </div>
    </form>
    <table>
      <thead>
        <th v-for="headerItem in header">{{ headerItem }}</th>
      </thead>
      <tbody>
        <tr v-for="line in transactions">
          <td>{{ line.transaction_idx }}</td>
          <td>{{ line.section_idx }}</td>
          <td>{{ line.transaction_nickname }}</td>
          <td>{{ line.request_day_of_week }}</td>
          <td>{{ line.request_time }}</td>
          <td>{{ line.transaction_item }}</td>
          <td>{{ line.transaction_money_amount }}</td>
          <td>{{ line.transaction_left }}</td>
          <td>{{ line.transaction_right }}</td>
          <td>{{ line.transaction_memo }}</td>
          <td>
            <button v-on:click="toggleTransaction(line)">
              {{ line.work_status }}
            </button>
          </td>
          <td>
            <button v-on:click="deleteTransaction(line)">삭제</button>
          </td>
          <!-- <td v-for="item in line">{{ item }}</td> -->
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
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { ref } from "vue";
import { useAuthStore } from "../store/modules/auth.store";
import router from "../router";
import { TransactionItemDto } from "../dto/transaction-item.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";

export default {
  data() {
    return {
      sectionsOfUsers: [{ section_idx: 1, section_name: "a" }],
      header: [
        "idx",
        "섹션idx",
        "거래명",
        "반복요일",
        "반복시간",
        "아이템",
        "금액",
        "왼쪽",
        "오른쪽",
        "메모",
        "동작여부",
      ],
      transactions: [
        {
          transaction_idx: 1,
          /** owner's user idx */
          user_idx: 1,
          /** related section idx */
          section_idx: 1,
          /** 이 반복요청의 별칭 */
          transaction_nickname: "a",
          /** 요청을 반복할 요일(d: 매일, 1~7: 월~일요일) */
          request_day_of_week: "a",
          /** 요청을 보낼 시간 HHmm */
          request_time: "a",
          // /** 후잉 item 입력값 */
          transaction_item: "a",
          // /** 후잉 금액 입력값 */
          transaction_money_amount: 1,
          // /** 후잉 좌변(비용) */
          transaction_left: "a",
          // /** 후잉 우변(수익) */
          transaction_right: "a",
          // /** 후잉 거래 메모 */
          transaction_memo: "a",
          work_status: "a",
          is_deleted: "a",
          created: "a",
          updated_last: "a",
        },
      ],
      sectionIdx: "",
      transactionNickname: "",
      requestDayOfWeek: "",
      requestTime: "",
      transactionItem: "",
      transactionMoneyAmount: 0,
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
    this.getSectionsInfo();
  },
  methods: {
    toggleTransaction(transaction: TransactionItemDto) {
      const updateTransaction: UpdateTransactionDto = {
        work_status: transaction.work_status === "ON" ? "OFF" : "ON",
      };
      if (
        confirm(
          `${transaction.transaction_nickname} 자동입력상태를 변경하시겠습니까?`
        )
      ) {
        axios
          .patch(
            `${server.baseUrl}/trx/${transaction.transaction_idx}`,
            updateTransaction,
            this.requestHeader
          )
          .then(() => {
            alert("변경되었습니다.");
            this.getTransactions();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    deleteTransaction(transaction: TransactionItemDto) {
      if (
        confirm(
          `${transaction.transaction_nickname} 거래를 정말 삭제하시겠습니까?`
        )
      ) {
        axios
          .delete(
            `${server.baseUrl}/trx/${transaction.transaction_idx}`,
            this.requestHeader
          )
          .then(() => {
            alert("삭제되었습니다.");
            this.getTransactions();
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    getTransactions() {
      axios
        .get(`${server.baseUrl}/trx`, this.requestHeader)
        .then((data) => {
          this.transactions = data.data;
          this.transactions.map((transaction) => {
            switch (transaction.request_day_of_week) {
              case "d":
                transaction.request_day_of_week = "매일";
                break;
              case "1":
                transaction.request_day_of_week = "월";
                break;
              case "2":
                transaction.request_day_of_week = "화";
                break;
              case "3":
                transaction.request_day_of_week = "수";
                break;
              case "4":
                transaction.request_day_of_week = "목";
                break;
              case "5":
                transaction.request_day_of_week = "금";
                break;
              case "6":
                transaction.request_day_of_week = "토";
                break;
              case "7":
                transaction.request_day_of_week = "일";
                break;
            }

            return transaction;
          });
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
    getSectionsInfo() {
      axios
        .get(`${server.baseUrl}/section`, this.requestHeader)
        .then((data) => {
          console.log(data.data);
          this.sectionsOfUsers = data.data;
        })
        .catch((error) => {
          switch (error.response.data.statusCode) {
            case 401:
              useAuthStore().logout();
              alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
              break;
            case 404:
              if (
                confirm(
                  `거래를 등록하려면 최소한 하나의 섹션 등록이 필요합니다.
지금 섹션을 등록하러 가시겠습니까?`
                )
              ) {
                const returnUrl = "/sections";
                router.push(returnUrl || "/");
              }
              break;
            default:
              alert(error.response.data.message);
              break;
          }
        });
    },
    createTransaction() {
      if (!this.sectionIdx) {
        alert("섹션이 선택되지 않았습니다.");
        return false;
      }
      if (!this.transactionItem) {
        alert("아이템이 입력되지 않았습니다.");
        return false;
      }
      if (!this.transactionMoneyAmount) {
        alert("금액이 입력되지 않았습니다.");
        return false;
      }
      if (!this.transactionLeft) {
        alert("왼쪽이 입력되지 않았습니다.");
        return false;
      }
      if (!this.transactionRight) {
        alert("오른쪽이 입력되지 않았습니다.");
        return false;
      }

      let createTransactionDto: CreateTransactionDto = {
        section_idx: this.sectionIdx,
        request_day_of_week: this.requestDayOfWeek,
        request_time: this.requestTime,
        transaction_nickname: this.transactionNickname,
        transaction_item: this.transactionItem,
        transaction_money_amount: this.transactionMoneyAmount,
        transaction_left: this.transactionLeft,
        transaction_right: this.transactionRight,
        transaction_memo: this.transactionMemo,
      };
      this.submitToServer(createTransactionDto);
    },
    submitToServer(createTransactionDto: CreateTransactionDto) {
      axios
        .post(`${server.baseUrl}/trx`, createTransactionDto, this.requestHeader)
        .then(() => {
          alert(
            `${createTransactionDto.transaction_nickname} 거래 등록이 완료되었습니다.`
          );
          this.getTransactions();
        })
        .catch((error) => {
          if (error.code == 401) {
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
