<template>
  <PublicNavbar />
  <AuthShell>
    <div class="text-center mb-4">
      <h1 class="h4 fw-bold mb-1">Mot de passe oublie</h1>
      <p class="text-muted mb-0">Recevez un lien de reinitialisation par email.</p>
    </div>

    <div v-if="success" class="alert alert-success" role="alert">
      Un lien de reinitialisation vient d etre envoye a votre adresse.
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <form class="needs-validation" novalidate @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          type="email"
          class="form-control"
          v-model.trim="email"
          required
          autocomplete="email"
          :disabled="loading"
          placeholder="vous@exemple.com"
        />
        <div class="invalid-feedback">Veuillez saisir un email valide.</div>
      </div>

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        <span
          v-if="loading"
          class="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        Envoyer le lien
      </button>
    </form>

    <div class="text-center mt-4 small">
      <RouterLink to="/login">Retour a la connexion</RouterLink>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import PublicNavbar from '@/components/PublicNavbar.vue'
import AuthShell from '@/components/auth/AuthShell.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const email = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  success.value = false

  if (!/\S+@\S+\.\S+/.test(email.value)) {
    error.value = 'Veuillez saisir un email valide.'
    return
  }

  loading.value = true
  const { error: resetError } = await authStore.resetPassword(email.value)
  if (resetError) {
    error.value = resetError.message
  } else {
    success.value = true
  }
  loading.value = false
}
</script>
