<template>
  <PublicNavbar />
  <AuthShell>
    <div class="text-center mb-4">
      <h1 class="h4 fw-bold mb-1">Connexion</h1>
      <p class="text-muted mb-0">Accédez à votre espace financier en toute sécurité.</p>
    </div>

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
          placeholder="vous@exemple.com"
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
        <div class="invalid-feedback">Veuillez saisir votre mot de passe (min. 6 caractères).</div>
      </div>

      <div class="d-flex align-items-center justify-content-between mb-3">
        <div class="form-check">
          <input id="remember" type="checkbox" class="form-check-input" v-model="remember" />
          <label for="remember" class="form-check-label">Se souvenir de moi</label>
        </div>
        <RouterLink to="/forgot-password" class="small">Mot de passe oublie ?</RouterLink>
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

    <div class="text-center mt-4 small">
      Pas encore de compte ?
      <RouterLink to="/signup">Créer un compte</RouterLink>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'
import AuthShell from '@/components/auth/AuthShell.vue'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const validated = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const remember = ref(false)
const error = ref('')
const success = ref(false)
const route = useRoute()

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
    const { error: signInError } = await authStore.signIn(form.email, form.password)
    if (signInError) {
      throw signInError
    }

    success.value = true
    setTimeout(() => {
      const redirectTarget = (route.query.redirect as string | undefined) || '/dashboard'
      router.push(redirectTarget)
    }, 500)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = 'Impossible de se connecter. Vérifiez vos identifiants.'
  } finally {
    loading.value = false
  }
}
</script>
