<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
  <DashboardLayout>
    <section class="container mt-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1>Dépenses</h1>
        <RouterLink to="#" class="btn btn-primary ms-auto align-self-center">
          <i class="bi bi-plus-circle mr-1"></i>
          Ajouter une dépense
        </RouterLink>
      </div>
      <p class="text-secondary">
        Bienvenue dans le module des dépenses. Ici, vous pouvez gérer et suivre toutes vos dépenses.
      </p>
      <hr />
      <!-- Contenu spécifique aux dépenses à ajouter ici -->
    </section>
  </DashboardLayout>
</template>

<style scoped></style>
