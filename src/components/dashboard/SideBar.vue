<script setup lang="ts">
import { usePageStore } from '@/stores/page.ts'
import { useRoute } from 'vue-router'

const pageStore = usePageStore()
const route = useRoute()
</script>

<template>
  <!-- Sidebar stylisée avec Bootstrap 5 -->
  <nav class="d-flex flex-column bg-dark text-light vh-100 p-3" style="width: 250px">
    <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
      <span class="fs-4">MyFinanx</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="nav-link text-light"
          :class="{ active: route.name === 'dashboard' }"
          :aria-current="{ active: route.name === 'dashboard' ? 'page' : null }"
          @click="pageStore.setModuleTitle('Tableau de bord')"
        >
          Accueil
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'expenses' }"
          class="nav-link text-light"
          :class="{ active: route.name === 'expenses' }"
          :aria-current="{ active: route.name === 'expenses' ? 'page' : null }"
          @click="pageStore.setModuleTitle('Dépenses')"
        >
          Dépenses
        </RouterLink>
      </li>
      <li>
        <a href="#" class="nav-link text-light" @click="pageStore.setModuleTitle('Revenus')"> Revenus </a>
      </li>
      <li>
        <a href="#" class="nav-link text-light" @click="pageStore.setModuleTitle('Rapports')"> Rapports </a>
      </li>
      <li>
        <a href="#" class="nav-link text-light" @click="pageStore.setModuleTitle('Statistiques')">
          Statistiques
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
