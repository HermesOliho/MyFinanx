<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { addIncome } from '@/services/incomeService'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const submitError = ref('')
const submitSuccess = ref('')
const submitting = ref(false)

const currencyOptions = ['USD', 'CDF'] as const
type Currency = (typeof currencyOptions)[number]

const categories = ['Salaire', 'Freelance', 'Vente', 'Investissement', 'Autre']

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

async function handleSubmit() {
  submitError.value = ''
  submitSuccess.value = ''
  const userId = authStore.user?.id
  if (!userId) {
    submitError.value = 'Veuillez vous reconnecter pour ajouter un revenu.'
    return
  }

  const amountValue = Number(form.amount)
  if (!amountValue || amountValue <= 0) {
    submitError.value = 'Le montant doit etre superieur a 0.'
    return
  }

  submitting.value = true
  try {
    await addIncome({
      user_id: userId,
      amount: amountValue,
      currency: form.currency,
      type: 'income',
      category: form.category,
      date: form.date,
      description: form.description || undefined,
    })
    form.amount = ''
    form.currency = 'USD'
    form.category = 'Salaire'
    form.date = new Date().toISOString().slice(0, 10)
    form.description = ''
    submitSuccess.value = 'Revenu ajoute avec succes.'
    setTimeout(() => {
      router.push({ name: 'incomes' })
    }, 800)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    submitError.value = "Impossible d'ajouter ce revenu. Veuillez reessayer."
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
          <p class="text-uppercase text-primary fw-semibold small mb-2">Revenus</p>
          <h1 class="h3 fw-bold mb-1">Nouveau revenu</h1>
          <p class="text-muted mb-0">Ajoutez une entree et suivez vos recettes facilement.</p>
        </div>
        <RouterLink :to="{ name: 'incomes' }" class="btn btn-outline-secondary header-action">
          <i class="bi bi-arrow-left me-2"></i>Retour aux revenus
        </RouterLink>
      </div>
    </section>

    <section class="card border-0 shadow-sm">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">Details du revenu</h2>
        <form class="row g-3" @submit.prevent="handleSubmit">
          <div v-if="submitError" class="col-12">
            <div class="alert alert-danger" role="alert">{{ submitError }}</div>
          </div>
          <div v-if="submitSuccess" class="col-12">
            <div class="alert alert-success" role="alert">{{ submitSuccess }}</div>
          </div>

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
              <option v-for="curr in currencyOptions" :key="curr" :value="curr">{{ curr }}</option>
            </select>
          </div>
          <div class="col-12 col-lg-4">
            <label class="form-label" for="category">Categorie</label>
            <select id="category" v-model="form.category" class="form-select" required>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="col-12 col-lg-4">
            <label class="form-label" for="date">Date</label>
            <input id="date" v-model="form.date" type="date" class="form-control" required />
          </div>
          <div class="col-12">
            <label class="form-label" for="description">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              class="form-control"
              rows="2"
            ></textarea>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
              {{ submitting ? 'Enregistrement...' : 'Enregistrer le revenu' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </DashboardLayout>
</template>

<style scoped>
.page-header {
  background: linear-gradient(120deg, rgba(13, 110, 253, 0.08), rgba(32, 201, 151, 0.12));
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
