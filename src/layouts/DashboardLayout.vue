<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '@/components/dashboard/SideBar.vue'
import UserNavbar from '@/components/UserNavbar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const displayName = computed(() => authStore.userName)

async function handleLogout() {
  const { error } = await authStore.signOut()
  if (!error) {
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <div>
    <!-- NavBar -->
    <UserNavbar :user-name="displayName" @logout="handleLogout" />
    <!-- Contenu de la page avec la SideBar à gauche -->
    <main>
      <SideBar />
      <div class="main-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
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
