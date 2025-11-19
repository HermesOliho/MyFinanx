<template>
  <DashboardLayout>
    <section class="container mt-4">
      <h1>Tableau de bord</h1>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <!-- Carte montrant le nombre des dépenses totales -->
          <div class="card bg-danger bg-opacity-10">
            <div class="card-body">
              <h2>Dépenses Totales</h2>
              <p class="fs-1 text-end">{{ expenses }}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <!-- Carte montrant le nombre des revenus totales -->
          <div class="card bg-success bg-opacity-10">
            <div class="card-body">
              <h2>Revenus Totales</h2>
              <p class="fs-1 text-end">{{ incomes }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTotalExpenses } from '@/services/expenseService.ts'
import { getTotalIncomes } from '@/services/incomeService.ts'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const expenses = ref<number>(0)
const incomes = ref<number>(0)

onMounted(async () => {
  document.title = 'Tableau de bord - Mon Application'
  try {
    expenses.value = await getTotalExpenses()
    incomes.value = await getTotalIncomes()
  } catch (error) {
    console.error('Erreur lors de la récupération des dépenses :', error)
  }
})
</script>
