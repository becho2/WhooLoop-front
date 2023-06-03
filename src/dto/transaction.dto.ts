export interface TransactionDto {
  /** transactionIdx */
  transaction_idx: number;

  /** owner's user idx */
  user_idx: number;

  /** related section idx */
  section_idx: number;

  /** 이 반복요청의 별칭 */
  transaction_nickname: string;

  /** 요청을 반복할 요일(d: 매일, 1~7: 월~일요일) */
  request_day_of_week: string;

  /** 요청을 보낼 시간 HHmm */
  request_time: string;

  /** 후잉 item 입력값 */
  transaction_item: string;

  /** 후잉 금액 입력값 */
  transaction_money_amount: number;

  /** 후잉 좌변(비용) */
  transaction_left: string;

  /** 후잉 우변(수익) */
  transaction_right: string;

  /** 후잉 거래 메모 */
  transaction_memo: string;

  /** workStatus */
  work_status: string;

  /** isDeleted */
  is_deleted: string;

  created: string;

  updated_last: string;
}
