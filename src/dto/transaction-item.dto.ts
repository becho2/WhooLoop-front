export interface TransactionItemDto {
  transaction_idx: number;
  section_idx: number;
  transaction_nickname: string;
  request_day_of_week: string;
  request_time: string;
  transaction_item: string;
  transaction_money_amount: number;
  transaction_left: string;
  transaction_right: string;
  transaction_memo: string;
  expire_date: string;
  work_status: string;
}
