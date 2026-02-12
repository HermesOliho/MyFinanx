<template>
  <DashboardLayout>
    <div class="container-fluid py-4">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="fw-bold mb-1">
                <i class="bi bi-pie-chart text-primary me-2"></i>
                Statistiques
              </h2>
              <p class="text-muted mb-0">Analysez vos finances en profondeur</p>
            </div>
            <div class="d-flex gap-2">
              <select class="form-select" v-model="selectedPeriod" @change="loadData">
                <option value="1">1 dernier mois</option>
                <option value="3">3 derniers mois</option>
                <option value="6">6 derniers mois</option>
                <option value="12">12 derniers mois</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
        <p class="text-muted mt-3">Chargement des statistiques...</p>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
          <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="bg-primary-subtle rounded-3 p-3">
                    <i class="bi bi-wallet2 text-primary fs-4"></i>
                  </div>
                  <span class="badge bg-primary-subtle text-primary">Total</span>
                </div>
                <h6 class="text-muted mb-2">Solde net</h6>
                <div class="d-flex flex-column justify-content-start align-items-end">
                  <span class="fw-bold">{{ formatCurrency(summary.netBalanceUSD, 'USD') }}</span>
                  <span class="fw-bold">
                    {{ formatCurrency(summary.netBalanceCDF, 'CDF') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="bg-success-subtle rounded-3 p-3">
                    <i class="bi bi-arrow-up-circle text-success fs-4"></i>
                  </div>
                  <span class="badge bg-success-subtle text-success">Revenus</span>
                </div>
                <h6 class="text-muted mb-2">Total des revenus</h6>
                <div class="d-flex flex-column justify-content-start align-items-end">
                  <span class="fw-bold">{{ formatCurrency(summary.totalIncomeUSD, 'USD') }}</span>
                  <span class="fw-bold">
                    {{ formatCurrency(summary.totalIncomeCDF, 'CDF') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="bg-danger-subtle rounded-3 p-3">
                    <i class="bi bi-arrow-down-circle text-danger fs-4"></i>
                  </div>
                  <span class="badge bg-danger-subtle text-danger">Dépenses</span>
                </div>
                <h6 class="text-muted mb-2">Total des dépenses</h6>
                <div class="d-flex flex-column justify-content-start align-items-end">
                  <span class="fw-bold">{{ formatCurrency(summary.totalExpenseUSD, 'USD') }}</span>
                  <span class="fw-bold">
                    {{ formatCurrency(summary.totalExpenseCDF, 'CDF') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="bg-info-subtle rounded-3 p-3">
                    <i class="bi bi-graph-up text-info fs-4"></i>
                  </div>
                  <span class="badge bg-info-subtle text-info">Activité</span>
                </div>
                <h6 class="text-muted mb-2">Transactions</h6>
                <h3 class="fw-bold mb-2">{{ summary.transactionCount }}</h3>
                <p class="text-muted small mb-0">
                  {{ summary.incomeCount }} revenus · {{ summary.expenseCount }} dépenses
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="row g-4 mb-4">
          <!-- Monthly Trend Chart -->
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
                  <h5 class="fw-bold mb-0">
                    <i class="bi bi-graph-up me-2 text-primary"></i>
                    Évolution mensuelle
                  </h5>
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-light text-dark">{{ selectedPeriod }} mois</span>
                    <div class="nav nav-pills small" role="tablist">
                      <button
                        class="nav-link"
                        :class="{ active: monthlyCurrencyTab === 'USD' }"
                        type="button"
                        @click="monthlyCurrencyTab = 'USD'"
                      >
                        USD
                      </button>
                      <button
                        class="nav-link"
                        :class="{ active: monthlyCurrencyTab === 'CDF' }"
                        type="button"
                        @click="monthlyCurrencyTab = 'CDF'"
                      >
                        CDF
                      </button>
                    </div>
                  </div>
                </div>
                <div class="chart-container" style="position: relative; height: 300px">
                  <canvas v-if="currentMonthlyData.length > 0" ref="monthlyChartRef"></canvas>
                  <div v-else class="d-flex align-items-center justify-content-center h-100">
                    <div class="text-center text-muted">
                      <i class="bi bi-graph-up fs-1"></i>
                      <p class="mt-2">Aucune donnée disponible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Category Distribution (Expenses) -->
          <div class="col-lg-4">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
                  <h5 class="fw-bold mb-0">
                    <i class="bi bi-pie-chart-fill me-2 text-danger"></i>
                    Dépenses par catégorie
                  </h5>
                  <div class="nav nav-pills small" role="tablist">
                    <button
                      class="nav-link"
                      :class="{ active: expensePieCurrencyTab === 'USD' }"
                      type="button"
                      @click="expensePieCurrencyTab = 'USD'"
                    >
                      USD
                    </button>
                    <button
                      class="nav-link"
                      :class="{ active: expensePieCurrencyTab === 'CDF' }"
                      type="button"
                      @click="expensePieCurrencyTab = 'CDF'"
                    >
                      CDF
                    </button>
                  </div>
                </div>
                <div class="chart-container" style="position: relative; height: 300px">
                  <canvas
                    v-if="currentExpensePieCategories.length > 0"
                    ref="expensePieChartRef"
                  ></canvas>
                  <div v-else class="d-flex align-items-center justify-content-center h-100">
                    <div class="text-center text-muted">
                      <i class="bi bi-pie-chart fs-1"></i>
                      <p class="mt-2">Aucune dépense</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Details Row -->
        <div class="row g-4 mb-4">
          <!-- Top Expense Categories -->
          <div class="col-lg-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
                  <h5 class="fw-bold mb-0">
                    <i class="bi bi-arrow-down-circle me-2 text-danger"></i>
                    Top categories de depenses
                  </h5>
                  <div class="nav nav-pills small" role="tablist">
                    <button
                      class="nav-link"
                      :class="{ active: expenseCurrencyTab === 'USD' }"
                      type="button"
                      @click="expenseCurrencyTab = 'USD'"
                    >
                      USD
                    </button>
                    <button
                      class="nav-link"
                      :class="{ active: expenseCurrencyTab === 'CDF' }"
                      type="button"
                      @click="expenseCurrencyTab = 'CDF'"
                    >
                      CDF
                    </button>
                  </div>
                </div>
                <div v-if="currentExpenseCategories.length === 0" class="text-center py-4">
                  <i class="bi bi-inbox text-muted fs-1"></i>
                  <p class="text-muted mt-2">Aucune depense enregistree</p>
                </div>
                <div v-else class="d-flex flex-column gap-3">
                  <div
                    v-for="(cat, index) in currentExpenseCategories.slice(0, 5)"
                    :key="index"
                    class="d-flex align-items-center"
                  >
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between mb-1">
                        <span class="fw-semibold">{{ cat.category }}</span>
                        <span class="text-muted">{{ cat.percentage.toFixed(1) }}%</span>
                      </div>
                      <div class="progress" style="height: 8px">
                        <div
                          class="progress-bar"
                          :class="getProgressBarClass(index)"
                          :style="{ width: cat.percentage + '%' }"
                        ></div>
                      </div>
                      <div class="d-flex justify-content-between mt-1">
                        <small class="text-muted">{{ cat.count }} transactions</small>
                        <small class="fw-semibold">
                          {{ formatCurrency(cat.amount, expenseCurrencyTab) }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Income Categories -->
          <div class="col-lg-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
                  <h5 class="fw-bold mb-0">
                    <i class="bi bi-arrow-up-circle me-2 text-success"></i>
                    Top categories de revenus
                  </h5>
                  <div class="nav nav-pills small" role="tablist">
                    <button
                      class="nav-link"
                      :class="{ active: incomeCurrencyTab === 'USD' }"
                      type="button"
                      @click="incomeCurrencyTab = 'USD'"
                    >
                      USD
                    </button>
                    <button
                      class="nav-link"
                      :class="{ active: incomeCurrencyTab === 'CDF' }"
                      type="button"
                      @click="incomeCurrencyTab = 'CDF'"
                    >
                      CDF
                    </button>
                  </div>
                </div>
                <div v-if="currentIncomeCategories.length === 0" class="text-center py-4">
                  <i class="bi bi-inbox text-muted fs-1"></i>
                  <p class="text-muted mt-2">Aucun revenu enregistre</p>
                </div>
                <div v-else class="d-flex flex-column gap-3">
                  <div
                    v-for="(cat, index) in currentIncomeCategories.slice(0, 5)"
                    :key="index"
                    class="d-flex align-items-center"
                  >
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between mb-1">
                        <span class="fw-semibold">{{ cat.category }}</span>
                        <span class="text-muted">{{ cat.percentage.toFixed(1) }}%</span>
                      </div>
                      <div class="progress" style="height: 8px">
                        <div
                          class="progress-bar bg-success"
                          :style="{ width: cat.percentage + '%' }"
                        ></div>
                      </div>
                      <div class="d-flex justify-content-between mt-1">
                        <small class="text-muted">{{ cat.count }} transactions</small>
                        <small class="fw-semibold">
                          {{ formatCurrency(cat.amount, incomeCurrencyTab) }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Averages Row -->
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-4">
                  <i class="bi bi-calculator me-2 text-primary"></i>
                  Moyennes par transaction
                </h5>
                <div class="row g-3">
                  <div class="col-6">
                    <div class="bg-success-subtle p-3 rounded-3 text-center">
                      <i class="bi bi-arrow-up text-success fs-4 mb-2"></i>
                      <div class="small text-muted mb-1">Revenu moyen (USD)</div>
                      <div class="fw-bold fs-5">
                        {{ formatCurrency(summary.averageIncomeUSD, 'USD') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="bg-success-subtle p-3 rounded-3 text-center">
                      <i class="bi bi-arrow-up text-success fs-4 mb-2"></i>
                      <div class="small text-muted mb-1">Revenu moyen (CDF)</div>
                      <div class="fw-bold fs-5">
                        {{ formatCurrency(summary.averageIncomeCDF, 'CDF') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="bg-danger-subtle p-3 rounded-3 text-center">
                      <i class="bi bi-arrow-down text-danger fs-4 mb-2"></i>
                      <div class="small text-muted mb-1">Dépense moyenne (USD)</div>
                      <div class="fw-bold fs-5">
                        {{ formatCurrency(summary.averageExpenseUSD, 'USD') }}
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="bg-danger-subtle p-3 rounded-3 text-center">
                      <i class="bi bi-arrow-down text-danger fs-4 mb-2"></i>
                      <div class="small text-muted mb-1">Dépense moyenne (CDF)</div>
                      <div class="fw-bold fs-5">
                        {{ formatCurrency(summary.averageExpenseCDF, 'CDF') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Currency Breakdown -->
          <div class="col-lg-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-4">
                  <i class="bi bi-currency-exchange me-2 text-primary"></i>
                  Répartition par devise
                </h5>
                <div class="chart-container" style="position: relative; height: 200px">
                  <canvas v-if="hasCurrencyData" ref="currencyChartRef"></canvas>
                  <div v-else class="d-flex align-items-center justify-content-center h-100">
                    <div class="text-center text-muted">
                      <i class="bi bi-currency-exchange fs-1"></i>
                      <p class="mt-2">Aucune donnée</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import {
  getStatisticsSummary,
  getMonthlyStatistics,
  getCategoryStatistics,
  getCurrencyStatistics,
  type StatisticsSummary,
  type MonthlyData,
  type CategoryData,
  type CurrencyStats,
} from '@/services/statisticsService'
import {
  Chart,
  BarController,
  CategoryScale,
  DoughnutController,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartConfiguration,
} from 'chart.js'

// Register Chart.js components
Chart.register(
  BarController,
  CategoryScale,
  DoughnutController,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

const authStore = useAuthStore()

const loading = ref(true)
const selectedPeriod = ref(6)

const summary = ref<StatisticsSummary>({
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
})

const monthlyDataUSD = ref<MonthlyData[]>([])
const monthlyDataCDF = ref<MonthlyData[]>([])
const expenseCategories = ref<CategoryData[]>([])
const expenseCategoriesUSD = ref<CategoryData[]>([])
const expenseCategoriesCDF = ref<CategoryData[]>([])
const incomeCategoriesUSD = ref<CategoryData[]>([])
const incomeCategoriesCDF = ref<CategoryData[]>([])
const currencyStats = ref<CurrencyStats[]>([])

// Chart refs
const monthlyChartRef = ref<HTMLCanvasElement>()
const expensePieChartRef = ref<HTMLCanvasElement>()
const currencyChartRef = ref<HTMLCanvasElement>()

let monthlyChart: Chart | null = null
let expensePieChart: Chart | null = null
let currencyChart: Chart | null = null

// Computed properties
const hasCurrencyData = computed(() => {
  return currencyStats.value.some((stat) => stat.totalIncome > 0 || stat.totalExpense > 0)
})

const monthlyCurrencyTab = ref<'USD' | 'CDF'>('USD')
const expenseCurrencyTab = ref<'USD' | 'CDF'>('USD')
const expensePieCurrencyTab = ref<'USD' | 'CDF'>('USD')
const incomeCurrencyTab = ref<'USD' | 'CDF'>('USD')

const currentMonthlyData = computed(() => {
  return monthlyCurrencyTab.value === 'USD' ? monthlyDataUSD.value : monthlyDataCDF.value
})

const currentExpenseCategories = computed(() => {
  return expenseCurrencyTab.value === 'USD'
    ? expenseCategoriesUSD.value
    : expenseCategoriesCDF.value
})

const currentIncomeCategories = computed(() => {
  return incomeCurrencyTab.value === 'USD' ? incomeCategoriesUSD.value : incomeCategoriesCDF.value
})

const currentExpensePieCategories = computed(() => {
  return expensePieCurrencyTab.value === 'USD'
    ? expenseCategoriesUSD.value
    : expenseCategoriesCDF.value
})

const formatCurrency = (amount: number, currency: 'USD' | 'CDF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const getProgressBarClass = (index: number) => {
  const classes = ['bg-danger', 'bg-warning', 'bg-info', 'bg-primary', 'bg-secondary']
  return classes[index % classes.length]
}

const loadData = async () => {
  loading.value = true
  try {
    if (!authStore.ready) {
      await authStore.init()
    }
    const userId = authStore.user?.id

    // Load all data in parallel
    const [
      summaryData,
      monthlyUsd,
      monthlyCdf,
      expenseAll,
      expenseUsd,
      expenseCdf,
      incomeUsd,
      incomeCdf,
      currencyStat,
    ] = await Promise.all([
      getStatisticsSummary(userId),
      getMonthlyStatistics(userId, selectedPeriod.value, 'USD'),
      getMonthlyStatistics(userId, selectedPeriod.value, 'CDF'),
      getCategoryStatistics(userId, 'expense'),
      getCategoryStatistics(userId, 'expense', 'USD'),
      getCategoryStatistics(userId, 'expense', 'CDF'),
      getCategoryStatistics(userId, 'income', 'USD'),
      getCategoryStatistics(userId, 'income', 'CDF'),
      getCurrencyStatistics(userId),
    ])

    summary.value = summaryData
    monthlyDataUSD.value = monthlyUsd
    monthlyDataCDF.value = monthlyCdf
    expenseCategories.value = expenseAll
    expenseCategoriesUSD.value = expenseUsd
    expenseCategoriesCDF.value = expenseCdf
    incomeCategoriesUSD.value = incomeUsd
    incomeCategoriesCDF.value = incomeCdf
    currencyStats.value = currencyStat

    if (expenseCategoriesUSD.value.length === 0 && expenseCategoriesCDF.value.length > 0) {
      expenseCurrencyTab.value = 'CDF'
      expensePieCurrencyTab.value = 'CDF'
    } else if (expenseCategoriesUSD.value.length > 0) {
      expenseCurrencyTab.value = 'USD'
      expensePieCurrencyTab.value = 'USD'
    }

    if (incomeCategoriesUSD.value.length === 0 && incomeCategoriesCDF.value.length > 0) {
      incomeCurrencyTab.value = 'CDF'
    } else if (incomeCategoriesUSD.value.length > 0) {
      incomeCurrencyTab.value = 'USD'
    }

    // Wait for DOM to be ready
    await nextTick()
    // Use setTimeout to ensure canvas elements are fully rendered
    setTimeout(() => {
      renderCharts()
    }, 100)
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  } finally {
    loading.value = false
  }
}

const renderCharts = () => {
  renderMonthlyChart()
  renderExpensePieChart()
  renderCurrencyChart()
}

const renderMonthlyChart = () => {
  if (!monthlyChartRef.value) return

  if (currentMonthlyData.value.length === 0) return

  // Destroy existing chart
  if (monthlyChart) {
    monthlyChart.destroy()
  }

  const ctx = monthlyChartRef.value.getContext('2d')
  if (!ctx) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: currentMonthlyData.value.map((d) => d.month),
      datasets: [
        {
          label: `Revenus (${monthlyCurrencyTab.value})`,
          data: currentMonthlyData.value.map((d) => d.income),
          backgroundColor: 'rgba(25, 135, 84, 0.8)',
          borderColor: 'rgb(25, 135, 84)',
          borderWidth: 1,
        },
        {
          label: `Dépenses (${monthlyCurrencyTab.value})`,
          data: currentMonthlyData.value.map((d) => d.expense),
          backgroundColor: 'rgba(220, 53, 69, 0.8)',
          borderColor: 'rgb(220, 53, 69)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value: string | number) {
              if (typeof value === 'number') {
                return new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: monthlyCurrencyTab.value,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              }
              return value
            },
          },
        },
      },
    },
  }

  monthlyChart = new Chart(ctx, config)
}

const renderExpensePieChart = () => {
  if (!expensePieChartRef.value) return

  if (currentExpensePieCategories.value.length === 0) return

  if (expensePieChart) {
    expensePieChart.destroy()
  }

  const ctx = expensePieChartRef.value.getContext('2d')
  if (!ctx) return

  const topCategories = currentExpensePieCategories.value.slice(0, 5)
  const colors = [
    'rgba(220, 53, 69, 0.8)',
    'rgba(255, 193, 7, 0.8)',
    'rgba(13, 202, 240, 0.8)',
    'rgba(13, 110, 253, 0.8)',
    'rgba(108, 117, 125, 0.8)',
  ]

  const config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: topCategories.map((c) => c.category),
      datasets: [
        {
          data: topCategories.map((c) => c.amount),
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function (context: { label?: string; parsed?: number }) {
              const label = context.label || ''
              const value = context.parsed || 0
              const formatted = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: expensePieCurrencyTab.value,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value)
              return label + ': ' + formatted
            },
          },
        },
      },
    },
  }

  expensePieChart = new Chart(ctx, config)
}

const renderCurrencyChart = () => {
  if (!currencyChartRef.value) return

  // Check if there's any transaction data
  const hasData = currencyStats.value.some((stat) => stat.totalIncome > 0 || stat.totalExpense > 0)
  if (!hasData) return

  if (currencyChart) {
    currencyChart.destroy()
  }

  const ctx = currencyChartRef.value.getContext('2d')
  if (!ctx) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: currencyStats.value.map((c) => c.currency),
      datasets: [
        {
          label: 'Revenus',
          data: currencyStats.value.map((c) => c.totalIncome),
          backgroundColor: 'rgba(25, 135, 84, 0.8)',
        },
        {
          label: 'Dépenses',
          data: currencyStats.value.map((c) => c.totalExpense),
          backgroundColor: 'rgba(220, 53, 69, 0.8)',
        },
        {
          label: 'Solde net',
          data: currencyStats.value.map((c) => c.netBalance),
          backgroundColor: 'rgba(13, 110, 253, 0.8)',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  }

  currencyChart = new Chart(ctx, config)
}

watch(selectedPeriod, () => {
  loadData()
})

watch(monthlyCurrencyTab, () => {
  renderMonthlyChart()
})

watch(expensePieCurrencyTab, () => {
  renderExpensePieChart()
})

onMounted(async () => {
  if (!authStore.ready) {
    await authStore.init()
  }
  await loadData()
})
</script>

<style scoped>
.chart-container {
  min-height: 200px;
}
</style>
