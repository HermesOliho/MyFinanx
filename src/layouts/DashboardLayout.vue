<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '@/components/dashboard/SideBar.vue'
import UserNavbar from '@/components/UserNavbar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const sidebarOpen = ref(true)

const displayName = computed(() => authStore.userName)

async function handleLogout() {
  const { error } = await authStore.signOut()
  if (!error) {
    router.push({ name: 'login' })
  }
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="app-shell">
    <UserNavbar :user-name="displayName" @logout="handleLogout" @toggle-sidebar="toggleSidebar" />
    <div class="app-body">
      <SideBar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="app-content" :class="{ 'sidebar-closed': !sidebarOpen }">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  background: #f8fafc;
  min-height: 100vh;
  overflow-x: hidden;
  max-width: 100vw;
}

.app-body {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: calc(100vh - 72px);
  position: relative;
  overflow-x: hidden;
}

.app-content {
  padding: 28px;
  transition: margin-left 0.3s ease;
  overflow-x: hidden;
  max-width: 100%;
}

@media screen and (max-width: 991px) {
  .app-body {
    grid-template-columns: 1fr;
  }

  .app-content {
    padding: 20px;
    margin-left: 0;
  }

  .sidebar-closed {
    margin-left: 0 !important;
  }
}

@media screen and (max-width: 575px) {
  .app-content {
    padding: 16px;
  }
}
</style>
