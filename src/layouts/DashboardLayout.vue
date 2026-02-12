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
  background: linear-gradient(135deg, #f5f7fa 0%, #f8fafc 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.app-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  overflow-x: hidden;
  background: transparent;
  transition: all 0.3s ease;
}

.app-content.sidebar-closed {
  margin-left: 0;
}

@media screen and (max-width: 991px) {
  .app-body {
    flex-direction: column;
  }

  .app-content {
    padding: 24px;
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
