<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
  <DashboardLayout>
    <section class="page-header">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <p class="text-uppercase text-danger fw-semibold small mb-2">Depenses</p>
          <h1 class="h3 fw-bold mb-1">Gardez le controle de vos sorties</h1>
          <p class="text-muted mb-0">Suivi clair des charges et postes de depenses.</p>
        </div>
        <RouterLink to="#" class="btn btn-primary header-action">
          <i class="bi bi-plus-circle me-2"></i>Ajouter une depense
        </RouterLink>
      </div>
    </section>

    <section class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted mb-0">
          Le module Depenses detaille sera aligne sur Revenus avec filtres, resume et saisie rapide.
          Dites-moi si vous voulez la meme experience que pour les revenus.
        </p>
      </div>
    </section>
  </DashboardLayout>
</template>

<style scoped>
.page-header {
  background: linear-gradient(120deg, rgba(220, 53, 69, 0.08), rgba(255, 193, 7, 0.12));
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
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
