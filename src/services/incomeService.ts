// Le service pour gérer les opérations liées aux revénus (Supabase)
import { supabase } from '@/lib/supabaseClient'
import type { NewTransaction, TransactionModel } from '@/models/transactionModel'

export const getTotalIncomes = async (
  userId?: string,
  currency?: 'USD' | 'CDF',
): Promise<number> => {
  let query = supabase.from('transactions').select('amount').eq('type', 'income')
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

export const getIncomeTotalsByCurrency = async (
  userId?: string,
): Promise<{ USD: number; CDF: number }> => {
  let query = supabase.from('transactions').select('amount,currency').eq('type', 'income')
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

export const fetchIncomes = async (userId?: string): Promise<TransactionModel[]> => {
  let query = supabase.from('transactions').select('*').eq('type', 'income')
  if (userId) {
    query = query.eq('user_id', userId)
  }
  const { data, error } = await query.order('date', { ascending: false })
  if (error) throw error
  return data ?? []
}

export const addIncome = async (income: NewTransaction): Promise<TransactionModel> => {
  const { data, error } = await supabase.from('transactions').insert([income]).select('*').single()
  if (error) throw error
  return data
}
