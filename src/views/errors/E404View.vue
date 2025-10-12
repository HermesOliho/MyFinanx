<template>
  <PublicNavbar />
  <section class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="text-center p-4 p-md-5 bg-white rounded-3 shadow-sm">
            <div class="display-1 fw-bold text-primary">404</div>
            <h1 class="h3 mt-3 mb-2">Page introuvable</h1>
            <p class="lead text-muted mb-4">
              Désolé, la page demandée est introuvable ou a été déplacée.
            </p>
            <div class="d-flex justify-content-center gap-2">
              <router-link to="/" class="btn btn-primary">Retour à l’accueil</router-link>
              <button type="button" class="btn btn-outline-secondary" @click="router.back()">
                Revenir en arrière
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
