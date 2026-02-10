<template>
  <PublicNavbar />
  <AuthShell>
    <div class="text-center mb-4">
      <h1 class="h4 fw-bold mb-1">Nouveau mot de passe</h1>
      <p class="text-muted mb-0">Choisissez un mot de passe robuste.</p>
    </div>

    <div v-if="!ready" class="text-center py-3">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else>
      <div v-if="!hasSession" class="alert alert-warning" role="alert">
        Lien invalide ou expiré. Demandez un nouveau lien de réinitialisation.
      </div>

      <div v-if="success" class="alert alert-success" role="alert">
        Mot de passe mis à jour. Vous pouvez vous connecter.
      </div>
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

      <form v-if="hasSession" novalidate @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="password" class="form-label">Nouveau mot de passe</label>
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            v-model="password"
            minlength="8"
            required
            autocomplete="new-password"
          />
        </div>

        <div class="mb-3">
          <label for="passwordConfirm" class="form-label">Confirmer le mot de passe</label>
          <input
            id="passwordConfirm"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            v-model="passwordConfirm"
            minlength="8"
            required
            autocomplete="new-password"
          />
        </div>

        <div class="form-check mb-3">
          <input
            id="showPassword"
            class="form-check-input"
            type="checkbox"
            v-model="showPassword"
          />
          <label for="showPassword" class="form-check-label">Afficher le mot de passe</label>
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Mettre a jour
        </button>
      </form>

      <div class="text-center mt-4 small">
        <RouterLink to="/login">Retour a la connexion</RouterLink>
      </div>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import PublicNavbar from '@/components/PublicNavbar.vue'
import AuthShell from '@/components/auth/AuthShell.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref(false)
const ready = ref(false)

const hasSession = computed(() => !!authStore.session)

onMounted(async () => {
  await authStore.init()
  ready.value = true
})

async function onSubmit() {
  error.value = ''
  success.value = false

  if (password.value.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    return
  }
  if (password.value !== passwordConfirm.value) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  loading.value = true
  const { error: updateError } = await authStore.updatePassword(password.value)
  loading.value = false

  if (updateError) {
    error.value = updateError.message
    return
  }

  success.value = true
  setTimeout(() => {
    router.push({ name: 'login' })
  }, 900)
}
</script>
