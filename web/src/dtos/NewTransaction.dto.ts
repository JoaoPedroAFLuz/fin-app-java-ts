export interface NewTransactionDTO {
  accountId: number;
  value: number;
  type: 'DEBIT' | 'CREDIT';
}
