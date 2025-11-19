// Le service pour gérer les opérations liées aux dépenses (Supabase)
import { supabase } from '@/lib/supabaseClient';
import type { NewTransaction, TransactionModel } from '@/models/transactionModel'

export const getTotalExpenses = async (): Promise<number> => {
  const { data, error } = await supabase.from('transactions')
    .select('amount', { count: 'exact' })
    .eq('type', 'expense');
  if (error) throw error;
  return data ? data.reduce((total, transaction) => total + transaction.amount, 0) : 0;
};

export const fetchExpenses = async (): Promise<TransactionModel[]> => {
  const { data, error } = await supabase.from('transactions')
    .where('type', 'expense')
    .select('*');
  if (error) throw error;
  return data;
};

export const addExpense = async (expense: NewTransaction): Promise<TransactionModel> => {
  const { data, error } = await supabase.from('transactions').insert([expense]);
  if (error) throw error;
  return data;
}
