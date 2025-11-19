<script setup lang="ts">

import SideBar from '@/components/dashboard/SideBar.vue'
import NavBar from '@/components/dashboard/NavBar.vue'
</script>

<template>
  <div>
    <!-- NavBar -->
    <NavBar />
    <!-- Contenu de la page avec la SideBar à gauche -->
    <main>
      <SideBar/>
      <div class="main-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
main{
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: calc(100vh - 56px); /* Ajuste la hauteur en fonction de la hauteur de la navbar */
}
@media screen and (max-width: 768px) {
  main {
    grid-template-columns: 1fr; /* Sidebar en haut sur les petits écrans */
  }

}
</style>
