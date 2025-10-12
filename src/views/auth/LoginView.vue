<template>
  <PublicNavbar />
  <div class="container min-vh-100 d-flex align-items-center justify-content-center py-5">
    <div class="row w-100 justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h1 class="h4 mb-4 text-center">Connexion</h1>

            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
            <div v-if="success" class="alert alert-success" role="alert">Connexion réussie.</div>

            <form
              class="needs-validation"
              :class="{ 'was-validated': validated }"
              novalidate
              @submit.prevent="onSubmit"
            >
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  v-model.trim="form.email"
                  required
                  autocomplete="email"
                  :disabled="loading"
                />
                <div class="invalid-feedback">Veuillez saisir un email valide.</div>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    class="form-control"
                    v-model="form.password"
                    required
                    minlength="6"
                    autocomplete="current-password"
                    :disabled="loading"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showPassword = !showPassword"
                    :aria-pressed="showPassword"
                    :disabled="loading"
                  >
                    {{ showPassword ? 'Masquer' : 'Afficher' }}
                  </button>
                </div>
                <div class="invalid-feedback">
                  Veuillez saisir votre mot de passe (min. 6 caractères).
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Se connecter
              </button>
            </form>
          </div>
        </div>

        <p class="text-center mt-3 text-muted small">
          Besoin d'un compte ?
          <a href="/register">Inscription</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const validated = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const error = ref('')
const success = ref(false)

function isFormValid() {
  return form.email && /\S+@\S+\.\S+/.test(form.email) && form.password && form.password.length >= 6
}

async function onSubmit(e: Event) {
  validated.value = true
  error.value = ''
  success.value = false

  const formEl = e.target as HTMLFormElement
  if (!formEl.checkValidity() || !isFormValid()) {
    return
  }

  loading.value = true
  try {
    // TODO: Remplacer par un appel API réel
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (error || !data.user) {
      throw error || new Error('Échec de la connexion')
    }
    authStore.setUser(data.user)
    authStore.setSession(data.session)
    success.value = true
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>
