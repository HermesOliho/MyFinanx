<template>
  <PublicNavbar />
  <section class="container py-5 min-vh-100 d-flex align-items-center">
    <div class="row justify-content-center w-100">
      <div class="col-12 col-md-8 col-lg-6">
        <AuthShell>
          <div class="text-center mb-4">
            <h1 class="h4 fw-bold mb-1">Creer un compte</h1>
            <p class="text-muted mb-0">Demarrez en moins d une minute.</p>
          </div>

          <form @submit.prevent="onSubmit" novalidate>
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

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
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
                  placeholder="Au moins 8 caracteres"
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
              <div class="form-text">Utilisez au moins 8 caracteres, avec lettres et chiffres.</div>
            </div>

            <div class="mb-3">
              <label for="passwordConfirm" class="form-label">Confirmer le mot de passe</label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': showErrors.passwordConfirm }"
                v-model="form.passwordConfirm"
                @blur="touched.passwordConfirm = true"
                placeholder="Repetez votre mot de passe"
                autocomplete="new-password"
                minlength="8"
                required
              />
              <div v-if="showErrors.passwordConfirm" class="invalid-feedback">
                {{ errors.passwordConfirm }}
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
            <p v-if="submitSuccess" class="text-success mt-3 small">
              Compte cree avec succes. Verifiez votre email si une confirmation est requise.
            </p>
          </form>

          <div class="text-center mt-4 small">
            Deja un compte ?
            <RouterLink to="/login">Se connecter</RouterLink>
          </div>
        </AuthShell>
        <script setup lang="ts">
          import PublicNavbar from '@/components/PublicNavbar.vue'
          import { supabase } from '@/lib/supabaseClient'
          import { useAuthStore } from '@/stores/auth'
          import AuthShell from '@/components/auth/AuthShell.vue'
          import { RouterLink, useRouter } from 'vue-router'

          const authStore = useAuthStore()
          const router = useRouter()

          const form = reactive({
            fullName: '',
            email: '',
            password: '',
            passwordConfirm: '',
          })

          const touched = reactive({
            fullName: false,
            email: false,
            password: false,
            passwordConfirm: false,
          })

          const submitting = ref(false)
          const submitError = ref('')
          const submitSuccess = ref(false)
          const attemptedSubmit = ref(false)
          const showPassword = ref(false)

          const errors = computed(() => {
            const e = { fullName: '', email: '', password: '', passwordConfirm: '' }

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

            if (!form.passwordConfirm) e.passwordConfirm = 'Veuillez confirmer le mot de passe.'
            else if (form.passwordConfirm !== form.password)
              e.passwordConfirm = 'Les mots de passe ne correspondent pas.'

            return e
          })

          const showErrors = computed(() => ({
            fullName: (touched.fullName || attemptedSubmit.value) && !!errors.value.fullName,
            email: (touched.email || attemptedSubmit.value) && !!errors.value.email,
            password: (touched.password || attemptedSubmit.value) && !!errors.value.password,
            passwordConfirm:
              (touched.passwordConfirm || attemptedSubmit.value) && !!errors.value.passwordConfirm,
          }))

          async function onSubmit() {
            attemptedSubmit.value = true
            touched.fullName = true
            touched.email = true
            touched.password = true
            touched.passwordConfirm = true

            if (
              errors.value.fullName ||
              errors.value.email ||
              errors.value.password ||
              errors.value.passwordConfirm
            )
              return

            submitting.value = true
            submitError.value = ''
            submitSuccess.value = false

            try {
              const { error } = await authStore.signUp(form.fullName, form.email, form.password)
              if (error) {
                submitError.value = error.message
                return
              }
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
      </div>
    </div>
  </section>
</template>
