<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
    <div class="container">
      <router-link to="/" class="navbar-brand"> MyFinanx </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#publicNavbar"
        aria-controls="publicNavbar"
        aria-expanded="false"
        aria-label="Basculer la navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="publicNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" exact-active-class="active">
              Accueil
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/fonctionnalites" class="nav-link" active-class="active">
              Fonctionnalités
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tarifs" class="nav-link" active-class="active"> Tarifs </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/a-propos" class="nav-link" active-class="active">
              À propos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" active-class="active">
              Contact
            </router-link>
          </li>
        </ul>

        <div class="d-flex" v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-primary me-2"> Connexion </router-link>
          <router-link :to="{ name: 'signup' }" class="btn btn-primary"> Inscription </router-link>
        </div>
        <div class="d-flex align-items-center gap-2" v-else>
          <router-link to="/dashboard" class="btn btn-outline-primary">
            Tableau de bord
          </router-link>
          <button class="btn btn-primary" type="button" @click="handleLogout">Deconnexion</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

async function handleLogout() {
  const { error } = await authStore.signOut()
  if (!error) {
    router.push({ name: 'login' })
  }
}
</script>
