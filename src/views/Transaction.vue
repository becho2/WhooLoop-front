<template>
  <div class="transaction">
    <h2>반복할 거래</h2>
    <section>
      * 주의: '평일'은 단순히 '월화수목금'을 의미합니다. 즉, 공휴일에도
      입력됩니다.<br />
      * 종료일은 입력하지 않으면 무한반복이며 오늘보다 이전 날짜를 입력할 경우
      종료되지 않습니다.<br />
      (해당 날짜까지 동작하고 그날 밤 11시59분에 상태가 OFF로 변경됩니다.)
    </section>
    <form id="create-transaction-form" @submit.prevent="createTransaction">
      <div>
        <label for="section_idx"> 섹션 </label>
        <select
          name="section_idx"
          v-model="sectionIdx"
          @change="getAccountsAndFrequentItems"
        >
          <option
            v-for="section in sectionsOfUsers"
            :value="section.section_idx"
          >
            {{ section.section_name }}
          </option>
        </select>
      </div>
      <div>
        <button type="button" @click="refreshAccountsAndFreqeuntItemsOfSection">
          이 섹션의 왼쪽/오른쪽 항목, 자주입력거래 최신화
        </button>
      </div>
      <div>
        <button
          v-for="frequentItem in frequentItems"
          style="background-color: slategray; margin: 2px"
          type="button"
          @click="fillInputs(frequentItem)"
        >
          {{ frequentItem.item }}
        </button>
      </div>
      <div class="form-group col-md-12">
        <label for="transaction_nickname"> 반복거래 별명 </label>
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
        <label for="request_day_of_week"> 반복입력할 요일 </label>
        <select name="request_day_of_week" v-model="requestDayOfWeek">
          <option value="d">매일</option>
          <option value="w">평일</option>
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
        <label for="request_time"> 반복입력할 시간 </label>
        <input type="time" name="request_time" v-model="requestTime" />
      </div>
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
        <select name="transaction_left" v-model="transactionLeft">
          <option
            v-for="leftAssets in leftAccountsOfSection.assets"
            :value="leftAssets"
          >
            {{ leftAssets }}
          </option>
          <option
            v-for="leftLiabilities in leftAccountsOfSection.liabilities"
            :value="leftLiabilities"
          >
            {{ leftLiabilities }}
          </option>
          <option
            v-for="leftCapital in leftAccountsOfSection.capital"
            :value="leftCapital"
          >
            {{ leftCapital }}
          </option>
          <option
            v-for="leftExpenses in leftAccountsOfSection.expenses"
            :value="leftExpenses"
          >
            {{ leftExpenses }}
          </option>
        </select>
        <label for="transaction_right"> 오른쪽 </label>
        <select name="transaction_right" v-model="transactionRight">
          <option
            v-for="rightAssets in rightAccountsOfSection.assets"
            :value="rightAssets"
          >
            {{ rightAssets }}
          </option>
          <option
            v-for="rightLiabilities in rightAccountsOfSection.liabilities"
            :value="rightLiabilities"
          >
            {{ rightLiabilities }}
          </option>
          <option
            v-for="rightCapital in rightAccountsOfSection.capital"
            :value="rightCapital"
          >
            {{ rightCapital }}
          </option>
          <option
            v-for="rightIncome in rightAccountsOfSection.income"
            :value="rightIncome"
          >
            {{ rightIncome }}
          </option>
        </select>
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
      <div class="form-group col-md-12">
        <label for="expire_date">
          마지막 반복일자(종료일)(비워두면 무한반복)
        </label>
        <input
          type="date"
          max="2999-12-31"
          id="expire_date"
          v-model="expireDate"
          name="expire_date"
          class="form-control"
        />
      </div>
      <div class="form-group col-md-4 pull-right">
        <button class="btn btn-success" type="submit">반복거래 등록</button>
      </div>
    </form>
    <div style="padding: 10px">
      * 항목 더블클릭시 수정가능합니다. (현재 수정기능이 입력실수를 막아줄 수
      없으므로 정확히 입력해주세요!)
    </div>
    <table>
      <thead>
        <th v-for="headerItem in header">{{ headerItem }}</th>
      </thead>
      <tbody>
        <tr v-for="line in transactions">
          <td>{{ line.transaction_idx }}</td>
          <td>{{ line.section_idx }}</td>
          <td
            contenteditable="false"
            class="transaction_nickname"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.transaction_nickname }}
          </td>
          <td
            contenteditable="false"
            class="request_day_of_week"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.request_day_of_week }}
          </td>
          <td
            contenteditable="false"
            class="request_time"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.request_time }}
          </td>
          <td
            contenteditable="false"
            class="transaction_item"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.transaction_item }}
          </td>
          <td
            contenteditable="false"
            class="transaction_money_amount"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.transaction_money_amount }}
          </td>
          <td
            contenteditable="false"
            class="transaction_left"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.transaction_left }}
          </td>
          <td
            contenteditable="false"
            class="transaction_right"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.transaction_right }}
          </td>
          <td
            contenteditable="false"
            class="transaction_memo"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.transaction_memo }}
          </td>
          <td
            contenteditable="false"
            class="expire_date"
            @dblclick="makeEditable"
            @focusout="updateTransaction(line, $event)"
          >
            {{ line.expire_date }}
          </td>
          <td>
            <button @click="toggleTransaction(line)">
              {{ line.work_status }}
            </button>
          </td>
          <td>
            <button @click="deleteTransaction(line)">삭제</button>
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
import { server } from "../server-base-url";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { ref } from "vue";
import { useAuthStore } from "../store/modules/auth.store";
import { TransactionItemDto } from "../dto/transaction-item.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";

type FrequentItem = {
  item: string;
  money: number;
  left: string;
  right: string;
};
export default {
  data() {
    return {
      sectionsOfUsers: [{ section_idx: 1, section_name: "a" }],
      frequentItems: [
        {
          item: "아이템",
          money: 10,
          left: "현금",
          right: "기타수익",
        } as FrequentItem,
      ],
      leftAccountsOfSection: {
        assets: [],
        liabilities: [],
        capital: [],
        expenses: [],
      },
      rightAccountsOfSection: {
        assets: [],
        liabilities: [],
        capital: [],
        income: [],
      },
      header: [
        "idx",
        "섹션idx",
        "거래별명",
        "반복요일",
        "반복시간",
        "아이템",
        "금액",
        "왼쪽",
        "오른쪽",
        "메모",
        "마지막반복일자",
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
          request_day_of_week: "d",
          /** 요청을 보낼 시간 HHmm */
          request_time: "1230",
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
          expire_date: "29991231",
          work_status: "a",
          is_deleted: "N",
          created: "a",
          updated_last: "a",
        },
      ],
      sectionIdx: 0,
      transactionNickname: "",
      requestDayOfWeek: "",
      requestTime: "",
      transactionItem: "",
      transactionMoneyAmount: 0,
      transactionLeft: "",
      transactionRight: "",
      transactionMemo: "",
      expireDate: "",
      accessToken: ref(useAuthStore().accessToken),
      requestHeader: { headers: { Authorization: "Bearer " } },
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
    makeEditable(e: any) {
      e.target.contentEditable = true;
      e.target.focus();
    },
    fillInputs(frequentItem: FrequentItem) {
      this.transactionItem = frequentItem.item;
      this.transactionMoneyAmount = frequentItem.money;
      this.transactionLeft = frequentItem.left;
      this.transactionRight = frequentItem.right;
    },
    refreshAccountsAndFreqeuntItemsOfSection() {
      if (
        !confirm(
          "후잉 계정항목 또는 자주입력거래에 변경이 생겼을 경우 동기화시키는 기능입니다. 지금 최신화하시겠습니까?(5분에 한번만 가능)"
        )
      ) {
        return false;
      }
      axios
        .post(
          `${server.baseUrl}/account`,
          { sectionIdx: this.sectionIdx },
          this.requestHeader
        )
        .then((data) => {
          this.divideAccountsLeftAndRight(data.data);
          this.getFrequentItems(); // 항목 초기화하면서 자주입력거래도 최신화되므로, 해당 목록도 가져오기
        })
        .catch((error) => {
          if (error.response.data.statusCode == 401) {
            useAuthStore().logout();
          } else {
            alert(error.response.data.message);
          }
        });
    },
    getFrequentItems() {
      axios
        .get(
          `${server.baseUrl}/account/${this.sectionIdx}/frequents`,
          this.requestHeader
        )
        .then((data) => {
          this.frequentItems = data.data;
        })
        .catch((error) => {
          if (error.response.data.statusCode == 401) {
            useAuthStore().logout();
          } else {
            alert(error.response.data.message);
          }
        });
    },
    getAccounts() {
      axios
        .get(
          `${server.baseUrl}/account/${this.sectionIdx}/accounts`,
          this.requestHeader
        )
        .then((data) => {
          this.divideAccountsLeftAndRight(data.data);
        })
        .catch((error) => {
          if (error.response.data.statusCode == 401) {
            useAuthStore().logout();
          } else {
            alert(error.response.data.message);
          }
        });
    },
    divideAccountsLeftAndRight(accountsData: any) {
      this.leftAccountsOfSection.assets = accountsData.assets;
      this.leftAccountsOfSection.liabilities = accountsData.liabilities;
      this.leftAccountsOfSection.capital = accountsData.capital;
      this.leftAccountsOfSection.expenses = accountsData.expenses;
      this.rightAccountsOfSection.assets = accountsData.assets;
      this.rightAccountsOfSection.liabilities = accountsData.liabilities;
      this.rightAccountsOfSection.capital = accountsData.capital;
      this.rightAccountsOfSection.income = accountsData.income;
    },
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
    updateTransaction(transaction: TransactionItemDto, e: any) {
      let updateTransaction: UpdateTransactionDto;
      switch (e.target.className) {
        case "transaction_nickname":
          if (transaction.transaction_nickname === e.target.innerText) {
            return false;
          }
          updateTransaction = { transaction_nickname: e.target.innerText };
          break;
        case "request_day_of_week":
          if (transaction.request_day_of_week === e.target.innerText) {
            return false;
          }
          const convertRequestDayOfWeek = this.convertRequestDayOfWeek(
            e.target.innerText
          );
          updateTransaction = {
            request_day_of_week: convertRequestDayOfWeek,
          };
          break;
        case "request_time":
          if (transaction.request_time === e.target.innerText) {
            return false;
          }
          updateTransaction = { request_time: e.target.innerText };
          break;
        case "transaction_item":
          if (transaction.transaction_item === e.target.innerText) {
            return false;
          }
          updateTransaction = { transaction_item: e.target.innerText };
          break;
        case "transaction_money_amount":
          // text와 number 타입에 상관없이 같으면 false return
          if (transaction.transaction_money_amount === +e.target.innerText) {
            return false;
          }
          updateTransaction = { transaction_money_amount: +e.target.innerText };
          break;
        case "transaction_left":
          if (transaction.transaction_left === e.target.innerText) {
            return false;
          }
          updateTransaction = { transaction_left: e.target.innerText };
          break;
        case "transaction_right":
          if (transaction.transaction_right === e.target.innerText) {
            return false;
          }
          updateTransaction = { transaction_right: e.target.innerText };
          break;
        case "transaction_memo":
          if (transaction.transaction_memo === e.target.innerText) {
            return false;
          }
          updateTransaction = { transaction_memo: e.target.innerText };
          break;
        case "expire_date":
          if (transaction.expire_date === e.target.innerText) {
            return false;
          }
          updateTransaction = { expire_date: e.target.innerText };
          break;
        default:
          updateTransaction = {};
      }

      if (confirm(`${e.target.innerText} (으)로 수정하시겠습니까?`)) {
        axios
          .patch(
            `${server.baseUrl}/trx/${transaction.transaction_idx}`,
            updateTransaction,
            this.requestHeader
          )
          .then(() => {
            alert("변경되었습니다.");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
      location.reload();
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
            if (transaction.expire_date === "29991231") {
              transaction.expire_date = "-";
            }
            transaction.request_day_of_week = this.convertRequestDayOfWeek(
              transaction.request_day_of_week
            );

            return transaction;
          });
        })
        .catch((error) => {
          if (error.response.data.statusCode == 401) {
            useAuthStore().logout();
          } else {
            alert(error.response.data.message);
          }
        });
    },
    async getSectionsInfo() {
      await axios
        .get(`${server.baseUrl}/section`, this.requestHeader)
        .then((data) => {
          this.sectionsOfUsers = data.data;
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

      // 페이지 진입시 첫번째 섹션 자동선택 + 왼쪽오른쪽항목 바로 불러오기
      this.sectionIdx = this.sectionsOfUsers[0].section_idx;
      this.getAccountsAndFrequentItems();
    },
    getAccountsAndFrequentItems() {
      this.getAccounts();
      this.getFrequentItems();
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
      // YYYY-MM-DD format을 YYYYMMDD로 변경해서 보내기, 입력 안 할 시에는 기본값 29991231로 보내기
      const convertedExpireDateForApiFormat = this.expireDate
        ? this.expireDate.split("-").join("")
        : "29991231";

      // 13:11 형태의 시간 문자열을 :를 떼고 1311 과 같은 네자리 숫자만 있는 문자열로 변경
      const convertedRequestTimeForApiFormat = this.requestTime
        .split(":")
        .join("");
      let createTransactionDto: CreateTransactionDto = {
        section_idx: this.sectionIdx,
        request_day_of_week: this.requestDayOfWeek,
        request_time: convertedRequestTimeForApiFormat,
        transaction_nickname: this.transactionNickname,
        transaction_item: this.transactionItem,
        transaction_money_amount: +this.transactionMoneyAmount,
        transaction_left: this.transactionLeft,
        transaction_right: this.transactionRight,
        transaction_memo: this.transactionMemo,
        expire_date: convertedExpireDateForApiFormat,
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
    convertRequestDayOfWeek(target: string): string {
      switch (target) {
        case "d":
          return "매일";
        case "w":
          return "평일";
        case "1":
          return "월";
        case "2":
          return "화";
        case "3":
          return "수";
        case "4":
          return "목";
        case "5":
          return "금";
        case "6":
          return "토";
        case "7":
          return "일";
        case "매일":
          return "d";
        case "평일":
          return "w";
        case "월":
          return "1";
        case "화":
          return "2";
        case "수":
          return "3";
        case "목":
          return "4";
        case "금":
          return "5";
        case "토":
          return "6";
        case "일":
          return "7";
        default:
          return "";
      }
    },
  },
};
</script>
