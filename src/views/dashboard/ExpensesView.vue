<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { addExpense, fetchExpenses } from '@/services/expenseService'
import { useAuthStore } from '@/stores/auth'
import type { TransactionModel } from '@/models/transactionModel'

const authStore = useAuthStore()

const expenses = ref<TransactionModel[]>([])
const loading = ref(false)
const error = ref('')
const submitError = ref('')
const submitting = ref(false)

const currencyOptions = ['USD', 'CDF'] as const
type Currency = (typeof currencyOptions)[number]

const form = reactive<{
  amount: string
  currency: Currency
  category: string
  date: string
  description: string
}>({
  amount: '',
  currency: 'USD',
  category: 'Alimentation',
  date: new Date().toISOString().slice(0, 10),
  description: '',
})

const currencyFormatters = {
  USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
  CDF: new Intl.NumberFormat('fr-CD', { style: 'currency', currency: 'CDF' }),
}

const formatCurrency = (amount: number, currency: 'USD' | 'CDF') => {
  return currencyFormatters[currency].format(amount)
}

const totalsByCurrency = computed(() => {
  return expenses.value.reduce(
    (totals, item) => {
      totals[item.currency] += item.amount
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const totalMonthByCurrency = computed(() => {
  const now = new Date()
  return expenses.value.reduce(
    (totals, item) => {
      const date = new Date(item.date)
      if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
        totals[item.currency] += item.amount
      }
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const totalYearByCurrency = computed(() => {
  const year = new Date().getFullYear()
  return expenses.value.reduce(
    (totals, item) => {
      if (new Date(item.date).getFullYear() === year) {
        totals[item.currency] += item.amount
      }
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const emptyState = computed(() => !loading.value && expenses.value.length === 0)

async function loadExpenses() {
  error.value = ''
  loading.value = true
  try {
    const userId = authStore.user?.id
    expenses.value = await fetchExpenses(userId)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = 'Impossible de charger les dépenses pour le moment.'
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  submitError.value = ''
  const userId = authStore.user?.id
  if (!userId) {
    submitError.value = 'Veuillez vous reconnecter pour ajouter une dépense.'
    return
  }

  const amountValue = Number(form.amount)
  if (!amountValue || amountValue <= 0) {
    submitError.value = 'Le montant doit être supérieur à 0.'
    return
  }

  submitting.value = true
  try {
    const newExpense = await addExpense({
      user_id: userId,
      amount: amountValue,
      currency: form.currency,
      type: 'expense',
      category: form.category,
      date: form.date,
      description: form.description || undefined,
    })
    expenses.value = [newExpense, ...expenses.value]
    form.amount = ''
    form.currency = 'USD'
    form.category = 'Alimentation'
    form.date = new Date().toISOString().slice(0, 10)
    form.description = ''
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    submitError.value = "Impossible d'ajouter cette dépense. Veuillez réessayer."
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await authStore.init()
  await loadExpenses()
})
</script>

<template>
  <DashboardLayout>
    <section class="page-header">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <p class="text-uppercase text-danger fw-semibold small mb-2">Dépenses</p>
          <h1 class="h3 fw-bold mb-1">Gardez le contrôle de vos sorties</h1>
          <p class="text-muted mb-0">Suivi clair des charges et postes de dépenses.</p>
        </div>
        <button
          class="btn btn-danger header-action"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#expenseForm"
        >
          <i class="bi bi-plus-circle me-2"></i>Ajouter une dépense
        </button>
      </div>
    </section>

    <section class="row g-3 mb-4">
      <div class="col-12 col-lg-4">
        <div class="card stat-card border-0">
          <div class="card-body">
            <p class="text-muted small mb-1">Total</p>
            <div class="d-flex justify-content-between">
              <span class="text-muted">USD</span>
              <span class="fw-semibold text-danger">
                {{ formatCurrency(totalsByCurrency.USD, 'USD') }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">CDF</span>
              <span class="fw-semibold text-danger">
                {{ formatCurrency(totalsByCurrency.CDF, 'CDF') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card stat-card border-0">
          <div class="card-body">
            <p class="text-muted small mb-1">Ce mois</p>
            <div class="d-flex justify-content-between">
              <span class="text-muted">USD</span>
              <span class="fw-semibold text-danger">
                {{ formatCurrency(totalMonthByCurrency.USD, 'USD') }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">CDF</span>
              <span class="fw-semibold text-danger">
                {{ formatCurrency(totalMonthByCurrency.CDF, 'CDF') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card stat-card border-0">
          <div class="card-body">
            <p class="text-muted small mb-1">Cette année</p>
            <div class="d-flex justify-content-between">
              <span class="text-muted">USD</span>
              <span class="fw-semibold text-danger">
                {{ formatCurrency(totalYearByCurrency.USD, 'USD') }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">CDF</span>
              <span class="fw-semibold text-danger">
                {{ formatCurrency(totalYearByCurrency.CDF, 'CDF') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="expenseForm" class="collapse mb-4">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h2 class="h5 fw-semibold mb-3">Nouvelle dépense</h2>
          <form class="row g-3" @submit.prevent="handleSubmit">
            <div v-if="submitError" class="col-12">
              <div class="alert alert-danger" role="alert">{{ submitError }}</div>
            </div>

            <div class="col-md-6">
              <label for="amount" class="form-label">Montant</label>
              <input
                type="number"
                step="0.01"
                class="form-control"
                id="amount"
                v-model="form.amount"
                required
                placeholder="0.00"
              />
            </div>

            <div class="col-md-6">
              <label for="currency" class="form-label">Devise</label>
              <select class="form-select" id="currency" v-model="form.currency" required>
                <option v-for="curr in currencyOptions" :key="curr" :value="curr">
                  {{ curr }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="category" class="form-label">Catégorie</label>
              <select class="form-select" id="category" v-model="form.category" required>
                <option value="Alimentation">Alimentation</option>
                <option value="Transport">Transport</option>
                <option value="Logement">Logement</option>
                <option value="Santé">Santé</option>
                <option value="Éducation">Éducation</option>
                <option value="Loisirs">Loisirs</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Services">Services</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="date" class="form-label">Date</label>
              <input type="date" class="form-control" id="date" v-model="form.date" required />
            </div>

            <div class="col-12">
              <label for="description" class="form-label">Description (facultatif)</label>
              <textarea
                class="form-control"
                id="description"
                v-model="form.description"
                rows="2"
                placeholder="Note ou détail supplémentaire..."
              ></textarea>
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-danger" :disabled="submitting">
                <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                {{ submitting ? 'Enregistrement...' : 'Enregistrer la dépense' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="card border-0 shadow-sm">
      <div
        class="card-header bg-white border-0 d-flex flex-column flex-md-row gap-2 align-items-md-center"
      >
        <div>
          <h2 class="h5 fw-semibold mb-0">Historique des dépenses</h2>
          <p class="text-muted small mb-0">Vos dépenses récentes.</p>
        </div>
        <div class="ms-md-auto d-flex align-items-center gap-2">
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="loadExpenses"
            :disabled="loading"
          >
            Actualiser
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <div v-if="error" class="alert alert-danger m-3" role="alert">{{ error }}</div>
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-danger" role="status"></div>
        </div>
        <div v-if="emptyState" class="text-center py-5 text-muted">
          Aucune dépense enregistrée pour le moment.
        </div>

        <div v-if="!loading && expenses.length" class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Catégorie</th>
                <th scope="col">Description</th>
                <th scope="col">Devise</th>
                <th scope="col" class="text-end">Montant</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in expenses" :key="expense.id">
                <td>{{ new Date(expense.date).toLocaleDateString('fr-FR') }}</td>
                <td>
                  <span class="badge rounded-pill text-bg-light border">{{
                    expense.category
                  }}</span>
                </td>
                <td class="text-muted">{{ expense.description || '-' }}</td>
                <td>
                  <span class="badge rounded-pill text-bg-light border">
                    {{ expense.currency }}
                  </span>
                </td>
                <td class="text-end fw-semibold text-danger">
                  {{ formatCurrency(expense.amount, expense.currency) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>

<style scoped>
.page-header {
  background: linear-gradient(120deg, rgba(220, 53, 69, 0.08), rgba(255, 193, 7, 0.12));
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.stat-card {
  background: #ffffff;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

/* Table responsive improvements */
.table-responsive {
  margin: 0;
  border-radius: 0;
}

.table {
  min-width: 600px; /* Minimum width to ensure table doesn't collapse */
  margin-bottom: 0;
}

@media (max-width: 767px) {
  .page-header {
    padding: 18px;
  }

  .header-action {
    width: 100%;
  }

  .table {
    min-width: 500px; /* Smaller minimum on mobile */
  }
}
</style>
