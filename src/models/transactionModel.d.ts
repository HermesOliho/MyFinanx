export interface TransactionModel {
  id: number;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface NewTransaction {
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
}
