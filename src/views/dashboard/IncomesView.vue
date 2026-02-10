<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { addIncome, fetchIncomes } from '@/services/incomeService'
import { useAuthStore } from '@/stores/auth'
import type { TransactionModel } from '@/models/transactionModel'

const authStore = useAuthStore()

const incomes = ref<TransactionModel[]>([])
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
  category: 'Salaire',
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
  return incomes.value.reduce(
    (totals, item) => {
      totals[item.currency] += item.amount
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const totalMonthByCurrency = computed(() => {
  const now = new Date()
  return incomes.value.reduce(
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
  return incomes.value.reduce(
    (totals, item) => {
      if (new Date(item.date).getFullYear() === year) {
        totals[item.currency] += item.amount
      }
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const emptyState = computed(() => !loading.value && incomes.value.length === 0)

async function loadIncomes() {
  error.value = ''
  loading.value = true
  try {
    const userId = authStore.user?.id
    incomes.value = await fetchIncomes(userId)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = 'Impossible de charger les revenus pour le moment.'
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  submitError.value = ''
  const userId = authStore.user?.id
  if (!userId) {
    submitError.value = 'Veuillez vous reconnecter pour ajouter un revenu.'
    return
  }

  const amountValue = Number(form.amount)
  if (!amountValue || amountValue <= 0) {
    submitError.value = 'Le montant doit être supérieur a 0.'
    return
  }

  submitting.value = true
  try {
    const newIncome = await addIncome({
      user_id: userId,
      amount: amountValue,
      currency: form.currency,
      type: 'income',
      category: form.category,
      date: form.date,
      description: form.description || undefined,
    })
    incomes.value = [newIncome, ...incomes.value]
    form.amount = ''
    form.currency = 'USD'
    form.category = 'Salaire'
    form.date = new Date().toISOString().slice(0, 10)
    form.description = ''
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    submitError.value = "Impossible d'ajouter ce revenu. Veuillez réessayer."
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await authStore.init()
  await loadIncomes()
})
</script>

<template>
  <DashboardLayout>
    <section class="page-header">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <p class="text-uppercase text-primary fw-semibold small mb-2">Revenus</p>
          <h1 class="h3 fw-bold mb-1">Pilotez vos recettes</h1>
          <p class="text-muted mb-0">Suivez vos revenus et alimentez votre budget facilement.</p>
        </div>
        <button
          class="btn btn-primary header-action"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#incomeForm"
        >
          <i class="bi bi-plus-circle me-2"></i>Ajouter un revenu
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
              <span class="fw-semibold">{{ formatCurrency(totalsByCurrency.USD, 'USD') }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">CDF</span>
              <span class="fw-semibold">{{ formatCurrency(totalsByCurrency.CDF, 'CDF') }}</span>
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
              <span class="fw-semibold text-success">
                {{ formatCurrency(totalMonthByCurrency.USD, 'USD') }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">CDF</span>
              <span class="fw-semibold text-success">
                {{ formatCurrency(totalMonthByCurrency.CDF, 'CDF') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card stat-card border-0">
          <div class="card-body">
            <p class="text-muted small mb-1">Cette annee</p>
            <div class="d-flex justify-content-between">
              <span class="text-muted">USD</span>
              <span class="fw-semibold text-primary">
                {{ formatCurrency(totalYearByCurrency.USD, 'USD') }}
              </span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">CDF</span>
              <span class="fw-semibold text-primary">
                {{ formatCurrency(totalYearByCurrency.CDF, 'CDF') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="incomeForm" class="collapse mb-4">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h2 class="h5 fw-semibold mb-3">Nouveau revenu</h2>
          <form class="row g-3" @submit.prevent="handleSubmit">
            <div class="col-12 col-lg-4">
              <label class="form-label" for="amount">Montant</label>
              <div class="input-group">
                <span class="input-group-text">{{ form.currency }}</span>
                <input
                  id="amount"
                  v-model="form.amount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="form-control"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <label class="form-label" for="currency">Devise</label>
              <select id="currency" v-model="form.currency" class="form-select" required>
                <option value="USD">USD</option>
                <option value="CDF">CDF</option>
              </select>
            </div>
            <div class="col-12 col-lg-4">
              <label class="form-label" for="category">Categorie</label>
              <select id="category" v-model="form.category" class="form-select" required>
                <option>Salaire</option>
                <option>Freelance</option>
                <option>Vente</option>
                <option>Investissement</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="col-12 col-lg-4">
              <label class="form-label" for="date">Date</label>
              <input id="date" v-model="form.date" type="date" class="form-control" required />
            </div>
            <div class="col-12">
              <label class="form-label" for="description">Description</label>
              <input
                id="description"
                v-model="form.description"
                type="text"
                class="form-control"
                placeholder="Prime, bonus, remboursement..."
              />
            </div>
            <div class="col-12 d-flex flex-column flex-md-row gap-3 align-items-md-center">
              <button class="btn btn-primary" type="submit" :disabled="submitting">
                <span
                  v-if="submitting"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Enregistrer
              </button>
              <span v-if="submitError" class="text-danger small">{{ submitError }}</span>
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
          <h2 class="h5 fw-semibold mb-0">Historique des revenus</h2>
          <p class="text-muted small mb-0">Vos recettes les plus récentes.</p>
        </div>
        <div class="ms-md-auto d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" @click="loadIncomes" :disabled="loading">
            Actualiser
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <div v-if="error" class="alert alert-danger m-3" role="alert">{{ error }}</div>
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-if="emptyState" class="text-center py-5 text-muted">
          Aucun revenu enregistre pour le moment.
        </div>

        <div v-if="!loading && incomes.length" class="table-responsive">
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
              <tr v-for="income in incomes" :key="income.id">
                <td>{{ new Date(income.date).toLocaleDateString('fr-FR') }}</td>
                <td>
                  <span class="badge rounded-pill text-bg-light border">{{ income.category }}</span>
                </td>
                <td class="text-muted">{{ income.description || '-' }}</td>
                <td>
                  <span class="badge rounded-pill text-bg-light border">
                    {{ income.currency }}
                  </span>
                </td>
                <td class="text-end fw-semibold text-success">
                  {{ formatCurrency(income.amount, income.currency) }}
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
  background: linear-gradient(120deg, rgba(13, 110, 253, 0.08), rgba(32, 201, 151, 0.1));
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
