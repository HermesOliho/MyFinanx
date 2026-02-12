<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { addExpense } from '@/services/expenseService'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const submitError = ref('')
const submitSuccess = ref('')
const submitting = ref(false)

const currencyOptions = ['USD', 'CDF'] as const
type Currency = (typeof currencyOptions)[number]

const categories = [
  'Alimentation',
  'Transport',
  'Logement',
  'Santé',
  'Éducation',
  'Loisirs',
  'Vêtements',
  'Services',
  'Autre',
]

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

async function handleSubmit() {
  submitError.value = ''
  submitSuccess.value = ''
  const userId = authStore.user?.id
  if (!userId) {
    submitError.value = 'Veuillez vous reconnecter pour ajouter une depense.'
    return
  }

  const amountValue = Number(form.amount)
  if (!amountValue || amountValue <= 0) {
    submitError.value = 'Le montant doit etre superieur a 0.'
    return
  }

  submitting.value = true
  try {
    await addExpense({
      user_id: userId,
      amount: amountValue,
      currency: form.currency,
      type: 'expense',
      category: form.category,
      date: form.date,
      description: form.description || undefined,
    })
    form.amount = ''
    form.currency = 'USD'
    form.category = 'Alimentation'
    form.date = new Date().toISOString().slice(0, 10)
    form.description = ''
    submitSuccess.value = 'Depense ajoutee avec succes.'
    setTimeout(() => {
      router.push({ name: 'expenses' })
    }, 800)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    submitError.value = "Impossible d'ajouter cette depense. Veuillez reessayer."
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await authStore.init()
})
</script>

<template>
  <DashboardLayout>
    <section class="page-header">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <p class="text-uppercase text-danger fw-semibold small mb-2">Depenses</p>
          <h1 class="h3 fw-bold mb-1">Nouvelle depense</h1>
          <p class="text-muted mb-0">Ajoutez une sortie et gardez le controle de votre budget.</p>
        </div>
        <RouterLink :to="{ name: 'expenses' }" class="btn btn-outline-secondary header-action">
          <i class="bi bi-arrow-left me-2"></i>Retour aux depenses
        </RouterLink>
      </div>
    </section>

    <section class="card border-0 shadow-sm">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">Details de la depense</h2>
        <form class="row g-3" @submit.prevent="handleSubmit">
          <div v-if="submitError" class="col-12">
            <div class="alert alert-danger" role="alert">{{ submitError }}</div>
          </div>
          <div v-if="submitSuccess" class="col-12">
            <div class="alert alert-success" role="alert">{{ submitSuccess }}</div>
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
            <label for="category" class="form-label">Categorie</label>
            <select class="form-select" id="category" v-model="form.category" required>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
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
              placeholder="Note ou detail supplementaire..."
            ></textarea>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-danger" :disabled="submitting">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ submitting ? 'Enregistrement...' : 'Enregistrer la depense' }}
            </button>
          </div>
        </form>
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

@media (max-width: 767px) {
  .page-header {
    padding: 18px;
  }

  .header-action {
    width: 100%;
  }
}
</style>
