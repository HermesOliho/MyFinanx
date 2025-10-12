<template>
  <PublicNavbar />
  <section class="container py-5 min-vh-100 d-flex align-items-center">
    <div class="row justify-content-center w-100">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h1 class="h3 mb-3 text-center">Créer un compte</h1>

            <form @submit.prevent="onSubmit" novalidate>
              <!-- Nom complet -->
              <div class="mb-3">
                <label for="fullName" class="form-label">Nom complet</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': showErrors.fullName }"
                  v-model.trim="form.fullName"
                  @blur="touched.fullName = true"
                  placeholder="Jean Dupont"
                  autocomplete="name"
                  required
                />
                <div v-if="showErrors.fullName" class="invalid-feedback">
                  {{ errors.fullName }}
                </div>
              </div>

              <!-- E-mail -->
              <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': showErrors.email }"
                  v-model.trim="form.email"
                  @blur="touched.email = true"
                  placeholder="jean.dupont@example.com"
                  autocomplete="email"
                  required
                />
                <div v-if="showErrors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>

              <!-- Mot de passe -->
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <div class="input-group has-validation">
                  <input
                    id="password"
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': showErrors.password }"
                    v-model="form.password"
                    @blur="touched.password = true"
                    placeholder="Au moins 8 caractères"
                    autocomplete="new-password"
                    minlength="8"
                    required
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="showPassword = !showPassword"
                    :aria-pressed="showPassword ? 'true' : 'false'"
                    :aria-label="
                      showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
                    "
                  >
                    {{ showPassword ? 'Masquer' : 'Afficher' }}
                  </button>
                  <div v-if="showErrors.password" class="invalid-feedback">
                    {{ errors.password }}
                  </div>
                </div>
                <div class="form-text">
                  Utilisez au moins 8 caractères, avec lettres et chiffres.
                </div>
              </div>

              <div class="d-grid">
                <button class="btn btn-primary" type="submit" :disabled="submitting">
                  <span
                    v-if="submitting"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  S'inscrire
                </button>
              </div>

              <p v-if="submitError" class="text-danger mt-3 small">{{ submitError }}</p>
              <p v-if="submitSuccess" class="text-success mt-3 small">Compte créé avec succès.</p>
            </form>
          </div>
        </div>

        <p class="text-center mt-3 small">
          Déjà un compte ?
          <RouterLink to="/login">Se connecter</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'
import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  fullName: '',
  email: '',
  password: '',
})

const touched = reactive({
  fullName: false,
  email: false,
  password: false,
})

const submitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const attemptedSubmit = ref(false)
const showPassword = ref(false)

const errors = computed(() => {
  const e = { fullName: '', email: '', password: '' }

  // Nom complet
  const name = form.fullName.trim()
  if (!name) e.fullName = 'Le nom complet est requis.'
  else if (name.length < 2) e.fullName = 'Le nom doit contenir au moins 2 caractères.'

  // E-mail
  const email = form.email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!email) e.email = "L'e-mail est requis."
  else if (!emailRegex.test(email)) e.email = 'Adresse e-mail invalide.'

  // Mot de passe
  if (!form.password) e.password = 'Le mot de passe est requis.'
  else if (form.password.length < 8) e.password = 'Minimum 8 caractères.'

  return e
})

const showErrors = computed(() => ({
  fullName: (touched.fullName || attemptedSubmit.value) && !!errors.value.fullName,
  email: (touched.email || attemptedSubmit.value) && !!errors.value.email,
  password: (touched.password || attemptedSubmit.value) && !!errors.value.password,
}))

async function onSubmit() {
  attemptedSubmit.value = true
  touched.fullName = true
  touched.email = true
  touched.password = true

  if (errors.value.fullName || errors.value.email || errors.value.password) return

  submitting.value = true
  submitError.value = ''
  submitSuccess.value = false

  try {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })
    if (error) {
      submitError.value = error.message
      return
    }
    authStore.setUser(data.user)
    authStore.setSession(data.session)
    submitSuccess.value = true
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    submitError.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    submitting.value = false
  }
}
</script>
