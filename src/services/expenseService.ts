// Le service pour gérer les opérations liées aux dépenses (Supabase)
import { supabase } from '@/lib/supabaseClient'
import type { NewTransaction, TransactionModel } from '@/models/transactionModel'

export const getTotalExpenses = async (
  userId?: string,
  currency?: 'USD' | 'CDF',
): Promise<number> => {
  let query = supabase.from('transactions').select('amount').eq('type', 'expense')
  if (userId) {
    query = query.eq('user_id', userId)
  }
  if (currency) {
    query = query.eq('currency', currency)
  }
  const { data, error } = await query
  if (error) throw error
  return data ? data.reduce((total, transaction) => total + transaction.amount, 0) : 0
}

export const getExpenseTotalsByCurrency = async (
  userId?: string,
): Promise<{ USD: number; CDF: number }> => {
  let query = supabase.from('transactions').select('amount,currency').eq('type', 'expense')
  if (userId) {
    query = query.eq('user_id', userId)
  }
  const { data, error } = await query
  if (error) throw error

  const totals = { USD: 0, CDF: 0 }
  for (const item of data ?? []) {
    if (item.currency === 'USD') totals.USD += item.amount
    if (item.currency === 'CDF') totals.CDF += item.amount
  }
  return totals
}

export const fetchExpenses = async (userId?: string): Promise<TransactionModel[]> => {
  let query = supabase.from('transactions').select('*').eq('type', 'expense')
  if (userId) {
    query = query.eq('user_id', userId)
  }
  const { data, error } = await query.order('date', { ascending: false })
  if (error) throw error
  return data ?? []
}

export const addExpense = async (expense: NewTransaction): Promise<TransactionModel> => {
  const { data, error } = await supabase.from('transactions').insert([expense]).select('*').single()
  if (error) throw error
  return data
}

export const updateExpense = async (
  id: number,
  updates: Partial<Omit<TransactionModel, 'id' | 'user_id' | 'created_at'>>,
): Promise<TransactionModel> => {
  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data
}

export const deleteExpense = async (id: number): Promise<void> => {
  const { error } = await supabase.from('transactions').delete().eq('id', id)
  if (error) throw error
}
