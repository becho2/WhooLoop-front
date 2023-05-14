export interface CreateTransactionDto {
  section_idx: string;
  request_day_of_week: string;
  request_time: string;
  transaction_nickname: string;
  transaction_item: string;
  transaction_money_amount: number;
  transaction_left: string;
  transaction_right: string;
  transaction_memo: string;
}
