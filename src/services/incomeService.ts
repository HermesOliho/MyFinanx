// Le service pour gérer les opérations liées aux revénus (Supabase)
import { supabase } from '@/lib/supabaseClient';
import type { NewTransaction, TransactionModel } from '@/models/transactionModel'

export const getTotalIncomes = async (): Promise<number> => {
  const { data, error } = await supabase.from('transactions')
    .select('amount', { count: 'exact' })
    .eq('type', 'income');
  if (error) throw error;
  return data ? data.reduce((total, transaction) => total + transaction.amount, 0) : 0;
};

export const fetchIncomes = async (): Promise<TransactionModel[]> => {
  const { data, error } = await supabase.from('transactions')
    .where('type', 'income')
    .select('*');
  if (error) throw error;
  return data;
};

export const addIncome = async (income: NewTransaction): Promise<TransactionModel> => {
  const { data, error } = await supabase.from('transactions').insert([income]);
  if (error) throw error;
  return data;
};
