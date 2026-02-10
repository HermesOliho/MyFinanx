<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { addIncome, fetchIncomes, updateIncome, deleteIncome } from '@/services/incomeService'
import { useAuthStore } from '@/stores/auth'
import type { TransactionModel } from '@/models/transactionModel'

const authStore = useAuthStore()

const incomes = ref<TransactionModel[]>([])
const loading = ref(false)
const error = ref('')
const submitError = ref('')
const submitting = ref(false)

// Filters and search
const searchQuery = ref('')
const filterCategory = ref('all')
const filterCurrency = ref('all')
const sortBy = ref<'date' | 'amount' | 'category'>('date')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Edit modal
const editingIncome = ref<TransactionModel | null>(null)
const editForm = reactive<{
  amount: string
  currency: 'USD' | 'CDF'
  category: string
  date: string
  description: string
}>({
  amount: '',
  currency: 'USD',
  category: '',
  date: '',
  description: '',
})

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

const categories = ['Salaire', 'Freelance', 'Vente', 'Investissement', 'Autre']

// Filtered and sorted incomes
const filteredIncomes = computed(() => {
  let result = incomes.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (income) =>
        income.description?.toLowerCase().includes(query) ||
        income.category.toLowerCase().includes(query) ||
        income.amount.toString().includes(query),
    )
  }

  // Category filter
  if (filterCategory.value !== 'all') {
    result = result.filter((income) => income.category === filterCategory.value)
  }

  // Currency filter
  if (filterCurrency.value !== 'all') {
    result = result.filter((income) => income.currency === filterCurrency.value)
  }

  // Sorting
  result = [...result].sort((a, b) => {
    let comparison = 0
    if (sortBy.value === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy.value === 'amount') {
      comparison = a.amount - b.amount
    } else if (sortBy.value === 'category') {
      comparison = a.category.localeCompare(b.category)
    }
    return sortOrder.value === 'asc' ? comparison : -comparison
  })

  return result
})

const totalsByCurrency = computed(() => {
  return filteredIncomes.value.reduce(
    (totals, item) => {
      totals[item.currency] += item.amount
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const totalMonthByCurrency = computed(() => {
  const now = new Date()
  return filteredIncomes.value.reduce(
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
  return filteredIncomes.value.reduce(
    (totals, item) => {
      if (new Date(item.date).getFullYear() === year) {
        totals[item.currency] += item.amount
      }
      return totals
    },
    { USD: 0, CDF: 0 } as { USD: number; CDF: number },
  )
})

const emptyState = computed(() => !loading.value && filteredIncomes.value.length === 0)

function toggleSort(column: 'date' | 'amount' | 'category') {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'desc'
  }
}

function openEditModal(income: TransactionModel) {
  editingIncome.value = income
  editForm.amount = income.amount.toString()
  editForm.currency = income.currency
  editForm.category = income.category
  editForm.date = income.date
  editForm.description = income.description || ''
}

function closeEditModal() {
  editingIncome.value = null
  editForm.amount = ''
  editForm.currency = 'USD'
  editForm.category = ''
  editForm.date = ''
  editForm.description = ''
}

async function handleUpdate() {
  if (!editingIncome.value) return

  const amountValue = Number(editForm.amount)
  if (!amountValue || amountValue <= 0) {
    submitError.value = 'Le montant doit être supérieur à 0.'
    return
  }

  submitting.value = true
  submitError.value = ''
  try {
    const updated = await updateIncome(editingIncome.value.id, {
      amount: amountValue,
      currency: editForm.currency,
      category: editForm.category,
      date: editForm.date,
      description: editForm.description || undefined,
    })
    const index = incomes.value.findIndex((i) => i.id === updated.id)
    if (index !== -1) {
      incomes.value[index] = updated
    }
    closeEditModal()
  } catch (err) {
    submitError.value = 'Impossible de modifier ce revenu.'
  } finally {
    submitting.value = false
  }
}

async function handleDelete(income: TransactionModel) {
  if (
    !confirm(
      `Voulez-vous vraiment supprimer ce revenu de ${formatCurrency(income.amount, income.currency)} ?`,
    )
  ) {
    return
  }

  try {
    await deleteIncome(income.id)
    incomes.value = incomes.value.filter((i) => i.id !== income.id)
  } catch (err) {
    error.value = 'Impossible de supprimer ce revenu.'
  }
}

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
          <p class="text-muted small mb-0">{{ filteredIncomes.length }} résultat(s)</p>
        </div>
        <div class="ms-md-auto d-flex align-items-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" @click="loadIncomes" :disabled="loading">
            <i class="bi bi-arrow-clockwise me-1"></i>Actualiser
          </button>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="card-body border-bottom">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label small text-muted mb-1">Recherche</label>
            <input
              type="search"
              class="form-control"
              v-model="searchQuery"
              placeholder="Montant, catégorie, description..."
            />
          </div>
          <div class="col-md-3">
            <label class="form-label small text-muted mb-1">Catégorie</label>
            <select class="form-select" v-model="filterCategory">
              <option value="all">Toutes</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small text-muted mb-1">Devise</label>
            <select class="form-select" v-model="filterCurrency">
              <option value="all">Toutes</option>
              <option value="USD">USD</option>
              <option value="CDF">CDF</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label small text-muted mb-1">Trier par</label>
            <select class="form-select" v-model="sortBy">
              <option value="date">Date</option>
              <option value="amount">Montant</option>
              <option value="category">Catégorie</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card-body p-0">
        <div v-if="error" class="alert alert-danger m-3" role="alert">{{ error }}</div>
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-if="emptyState" class="text-center py-5 text-muted">
          <i class="bi bi-inbox fs-1 d-block mb-2"></i>
          <p class="mb-0">Aucun revenu trouvé</p>
        </div>

        <div v-if="!loading && filteredIncomes.length" class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th scope="col" class="cursor-pointer" @click="toggleSort('date')">
                  Date
                  <i
                    v-if="sortBy === 'date'"
                    :class="sortOrder === 'asc' ? 'bi-sort-up' : 'bi-sort-down'"
                    class="bi ms-1"
                  ></i>
                </th>
                <th scope="col" class="cursor-pointer" @click="toggleSort('category')">
                  Catégorie
                  <i
                    v-if="sortBy === 'category'"
                    :class="sortOrder === 'asc' ? 'bi-sort-up' : 'bi-sort-down'"
                    class="bi ms-1"
                  ></i>
                </th>
                <th scope="col">Description</th>
                <th scope="col">Devise</th>
                <th scope="col" class="text-end cursor-pointer" @click="toggleSort('amount')">
                  Montant
                  <i
                    v-if="sortBy === 'amount'"
                    :class="sortOrder === 'asc' ? 'bi-sort-up' : 'bi-sort-down'"
                    class="bi ms-1"
                  ></i>
                </th>
                <th scope="col" class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="income in filteredIncomes" :key="income.id">
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
                <td class="text-end">
                  <button
                    class="btn btn-sm btn-outline-primary me-1"
                    @click="openEditModal(income)"
                    title="Modifier"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="handleDelete(income)"
                    title="Supprimer"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Edit Modal -->
    <div v-if="editingIncome" class="modal-backdrop" @click="closeEditModal"></div>
    <div v-if="editingIncome" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier le revenu</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div v-if="submitError" class="alert alert-danger">{{ submitError }}</div>

              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Montant</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    v-model="editForm.amount"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Devise</label>
                  <select class="form-select" v-model="editForm.currency" required>
                    <option value="USD">USD</option>
                    <option value="CDF">CDF</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Catégorie</label>
                  <select class="form-select" v-model="editForm.category" required>
                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Date</label>
                  <input type="date" class="form-control" v-model="editForm.date" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" v-model="editForm.description" rows="2"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">Annuler</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleUpdate"
              :disabled="submitting"
            >
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
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
  min-width: 700px; /* Minimum width to ensure table doesn't collapse */
  margin-bottom: 0;
}

.cursor-pointer {
  cursor: pointer;
  user-select: none;
}

.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal.d-block {
  z-index: 1050;
}

@media (max-width: 767px) {
  .page-header {
    padding: 18px;
  }

  .header-action {
    width: 100%;
  }

  .table {
    min-width: 600px; /* Smaller minimum on mobile */
  }
}
</style>
