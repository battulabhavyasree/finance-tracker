
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category?: string; // Only for expenses
  date: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
}

export interface PieChartData {
  name: string;
  value: number;
}
