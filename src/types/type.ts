export type popupProps = {
  popup: (popupValue: boolean) => void;
  transactionData: (transactiondata: transactionData) => void;
  transaction?: transactionData;
  transactionId?: number;
  deleteTransactionData?: (deleteTransactionData: transactionData) => void;
};

export type transactionData = {
  index?: number;
  amount: number;
  description?: string;
  transactionType?: string;
};
