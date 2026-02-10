<template>
  <DashboardLayout>
    <section class="dashboard-hero">
      <div class="d-flex flex-column flex-lg-row align-items-start justify-content-between gap-3">
        <div>
          <p class="text-uppercase text-primary fw-semibold small mb-2">Tableau de bord</p>
          <h1 class="h3 fw-bold mb-1">Bienvenue dans votre espace</h1>
          <p class="text-muted mb-0">Gardez un oeil sur vos flux financiers en un coup d oeil.</p>
        </div>
        <div class="d-flex flex-column flex-sm-row gap-2">
          <RouterLink to="/incomes" class="btn btn-outline-primary">Ajouter un revenu</RouterLink>
          <RouterLink to="/expenses" class="btn btn-primary">Ajouter une depense</RouterLink>
        </div>
      </div>
    </section>

    <section class="row g-3 mb-4">
      <div class="col-12 col-lg-6">
        <div class="card stat-card border-0">
          <div class="card-body">
            <p class="text-muted small mb-1">USD</p>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Solde net</span>
              <span class="fw-semibold">{{ formatCurrency(netBalance.USD, 'USD') }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Revenus</span>
              <span class="fw-semibold text-success">{{ formatCurrency(incomes.USD, 'USD') }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Depenses</span>
              <span class="fw-semibold text-danger">{{ formatCurrency(expenses.USD, 'USD') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card stat-card border-0">
          <div class="card-body">
            <p class="text-muted small mb-1">CDF</p>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Solde net</span>
              <span class="fw-semibold">{{ formatCurrency(netBalance.CDF, 'CDF') }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Revenus</span>
              <span class="fw-semibold text-success">{{ formatCurrency(incomes.CDF, 'CDF') }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Depenses</span>
              <span class="fw-semibold text-danger">{{ formatCurrency(expenses.CDF, 'CDF') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="card border-0 shadow-sm">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-2">Resume rapide</h2>
        <p class="text-muted mb-0">
          Consultez vos modules Revenus et Depenses pour un suivi detaille, ou ajoutez une nouvelle
          transaction depuis les raccourcis ci-dessus.
        </p>
      </div>
    </section>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getExpenseTotalsByCurrency } from '@/services/expenseService.ts'
import { getIncomeTotalsByCurrency } from '@/services/incomeService.ts'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const expenses = ref({ USD: 0, CDF: 0 })
const incomes = ref({ USD: 0, CDF: 0 })
const authStore = useAuthStore()

const currencyFormatters = {
  USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
  CDF: new Intl.NumberFormat('fr-CD', { style: 'currency', currency: 'CDF' }),
}

const formatCurrency = (amount: number, currency: 'USD' | 'CDF') => {
  return currencyFormatters[currency].format(amount)
}

const netBalance = computed(() => ({
  USD: incomes.value.USD - expenses.value.USD,
  CDF: incomes.value.CDF - expenses.value.CDF,
}))

onMounted(async () => {
  document.title = 'Tableau de bord - Mon Application'
  try {
    const userId = authStore.user?.id
    expenses.value = await getExpenseTotalsByCurrency(userId)
    incomes.value = await getIncomeTotalsByCurrency(userId)
  } catch (error) {
    console.error('Erreur lors de la récupération des dépenses :', error)
  }
})
</script>

<style scoped>
.dashboard-hero {
  background: linear-gradient(120deg, rgba(13, 110, 253, 0.08), rgba(32, 201, 151, 0.12));
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
  border-radius: 16px;
}

@media (max-width: 575px) {
  .dashboard-hero {
    padding: 18px;
  }
}
</style>
