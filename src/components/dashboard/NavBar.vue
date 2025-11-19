<script setup lang="ts">
import { usePageStore } from '@/stores/page.ts'

const pageStore = usePageStore()
</script>

<template>
<!-- Navbar stylisée avec Bootstrap5 -->
<nav class="navbar navbar-expand-lg navbar-light bg-light border-b shadow-sm sticky top-0">
  <div class="container-fluid">
    <!-- Titre du module (Ex: Recettes, Dépenses, Stats,... -->
    <a class="navbar-brand" href="#">
      {{pageStore.moduleTitle}}
    </a>
<!--    <button-->
<!--      class="navbar-toggler"-->
<!--      type="button"-->
<!--      data-bs-toggle="collapse"-->
<!--      data-bs-target="#navbarNav"-->
<!--      aria-controls="navbarNav"-->
<!--      aria-expanded="false"-->
<!--      aria-label="Toggle navigation"-->
<!--    >-->
<!--      <span class="navbar-toggler-icon"></span>-->
<!--    </button>-->
<!--    <div class="collapse navbar-collapse" id="navbarNav">-->
<!--      <ul class="navbar-nav">-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link active" aria-current="page" href="#">Accueil</a>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" href="#">Dépenses</a>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" href="#">Revenus</a>-->
<!--        </li>-->
<!--        <li class="nav-item">-->
<!--          <a class="nav-link" href="#">Rapports</a>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</nav>
</template>

<style scoped>

</style>
