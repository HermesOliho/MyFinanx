// Service pour gérer les statistiques et analyses financières
import { supabase } from '@/lib/supabaseClient'
import type { TransactionModel } from '@/models/transactionModel'

export interface MonthlyData {
  month: string
  income: number
  expense: number
  net: number
}

export interface CategoryData {
  category: string
  amount: number
  count: number
  percentage: number
}

export interface CurrencyStats {
  currency: 'USD' | 'CDF'
  totalIncome: number
  totalExpense: number
  netBalance: number
  transactionCount: number
}

export interface StatisticsSummary {
  totalIncomeUSD: number
  totalIncomeCDF: number
  totalExpenseUSD: number
  totalExpenseCDF: number
  netBalanceUSD: number
  netBalanceCDF: number
  transactionCount: number
  incomeCount: number
  expenseCount: number
  averageIncomeUSD: number
  averageIncomeCDF: number
  averageExpenseUSD: number
  averageExpenseCDF: number
}

// Récupérer les statistiques mensuelles
export const getMonthlyStatistics = async (
  userId?: string,
  months: number = 6,
  currency?: 'USD' | 'CDF',
): Promise<MonthlyData[]> => {
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - months)

  let query = supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (currency) {
    query = query.eq('currency', currency)
  }

  const { data, error } = await query
  if (error) throw error

  // Grouper par mois
  const monthlyMap = new Map<string, { income: number; expense: number }>()

  for (const transaction of data ?? []) {
    const date = new Date(transaction.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { income: 0, expense: 0 })
    }

    const monthData = monthlyMap.get(monthKey)!
    if (transaction.type === 'income') {
      monthData.income += transaction.amount
    } else {
      monthData.expense += transaction.amount
    }
  }

  // Convertir en tableau et calculer le net
  const result: MonthlyData[] = []
  monthlyMap.forEach((value, key) => {
    const parts = key.split('-')
    if (parts.length < 2) return

    const yearStr = parts[0]
    const monthStr = parts[1]
    if (!yearStr || !monthStr) return

    const date = new Date(parseInt(yearStr), parseInt(monthStr) - 1)
    const monthName = date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })

    result.push({
      month: monthName,
      income: value.income,
      expense: value.expense,
      net: value.income - value.expense,
    })
  })

  return result.sort((a, b) => a.month.localeCompare(b.month))
}

// Récupérer les statistiques par catégorie
export const getCategoryStatistics = async (
  userId?: string,
  type: 'income' | 'expense' = 'expense',
  currency?: 'USD' | 'CDF',
): Promise<CategoryData[]> => {
  let query = supabase.from('transactions').select('*').eq('type', type)

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (currency) {
    query = query.eq('currency', currency)
  }

  const { data, error } = await query
  if (error) throw error

  // Grouper par catégorie
  const categoryMap = new Map<string, { amount: number; count: number }>()
  let total = 0

  for (const transaction of data ?? []) {
    const category = transaction.category || 'Non catégorisé'
    if (!categoryMap.has(category)) {
      categoryMap.set(category, { amount: 0, count: 0 })
    }

    const catData = categoryMap.get(category)!
    catData.amount += transaction.amount
    catData.count += 1
    total += transaction.amount
  }

  // Convertir en tableau avec pourcentages
  const result: CategoryData[] = []
  categoryMap.forEach((value, category) => {
    result.push({
      category,
      amount: value.amount,
      count: value.count,
      percentage: total > 0 ? (value.amount / total) * 100 : 0,
    })
  })

  return result.sort((a, b) => b.amount - a.amount)
}

// Récupérer les statistiques par devise
export const getCurrencyStatistics = async (userId?: string): Promise<CurrencyStats[]> => {
  let query = supabase.from('transactions').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query
  if (error) throw error

  const stats = new Map<'USD' | 'CDF', CurrencyStats>()
  stats.set('USD', {
    currency: 'USD',
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
    transactionCount: 0,
  })
  stats.set('CDF', {
    currency: 'CDF',
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
    transactionCount: 0,
  })

  for (const transaction of data ?? []) {
    const currencyStats = stats.get(transaction.currency)!
    currencyStats.transactionCount += 1

    if (transaction.type === 'income') {
      currencyStats.totalIncome += transaction.amount
    } else {
      currencyStats.totalExpense += transaction.amount
    }
    currencyStats.netBalance = currencyStats.totalIncome - currencyStats.totalExpense
  }

  return Array.from(stats.values())
}

// Récupérer un résumé complet des statistiques
export const getStatisticsSummary = async (userId?: string): Promise<StatisticsSummary> => {
  let query = supabase.from('transactions').select('*')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query
  if (error) throw error

  const summary: StatisticsSummary = {
    totalIncomeUSD: 0,
    totalIncomeCDF: 0,
    totalExpenseUSD: 0,
    totalExpenseCDF: 0,
    netBalanceUSD: 0,
    netBalanceCDF: 0,
    transactionCount: 0,
    incomeCount: 0,
    expenseCount: 0,
    averageIncomeUSD: 0,
    averageIncomeCDF: 0,
    averageExpenseUSD: 0,
    averageExpenseCDF: 0,
  }

  let incomeCountUSD = 0
  let incomeCountCDF = 0
  let expenseCountUSD = 0
  let expenseCountCDF = 0

  for (const transaction of data ?? []) {
    summary.transactionCount += 1

    if (transaction.type === 'income') {
      summary.incomeCount += 1
      if (transaction.currency === 'USD') {
        summary.totalIncomeUSD += transaction.amount
        incomeCountUSD += 1
      } else {
        summary.totalIncomeCDF += transaction.amount
        incomeCountCDF += 1
      }
    } else {
      summary.expenseCount += 1
      if (transaction.currency === 'USD') {
        summary.totalExpenseUSD += transaction.amount
        expenseCountUSD += 1
      } else {
        summary.totalExpenseCDF += transaction.amount
        expenseCountCDF += 1
      }
    }
  }

  summary.netBalanceUSD = summary.totalIncomeUSD - summary.totalExpenseUSD
  summary.netBalanceCDF = summary.totalIncomeCDF - summary.totalExpenseCDF
  summary.averageIncomeUSD = incomeCountUSD > 0 ? summary.totalIncomeUSD / incomeCountUSD : 0
  summary.averageIncomeCDF = incomeCountCDF > 0 ? summary.totalIncomeCDF / incomeCountCDF : 0
  summary.averageExpenseUSD = expenseCountUSD > 0 ? summary.totalExpenseUSD / expenseCountUSD : 0
  summary.averageExpenseCDF = expenseCountCDF > 0 ? summary.totalExpenseCDF / expenseCountCDF : 0

  return summary
}

// Récupérer les transactions récentes
export const getRecentTransactions = async (
  userId?: string,
  limit: number = 10,
): Promise<TransactionModel[]> => {
  let query = supabase.from('transactions').select('*').order('date', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (limit > 0) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}
