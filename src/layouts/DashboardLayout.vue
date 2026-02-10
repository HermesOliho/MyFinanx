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
  <div class="app-shell">
    <UserNavbar :user-name="displayName" @logout="handleLogout" />
    <div class="app-body">
      <SideBar />
      <main class="app-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  background: #f8fafc;
  min-height: 100vh;
}

.app-body {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: calc(100vh - 72px);
}

.app-content {
  padding: 28px;
}

@media screen and (max-width: 991px) {
  .app-body {
    grid-template-columns: 1fr;
  }

  .app-content {
    padding: 20px;
  }
}

@media screen and (max-width: 575px) {
  .app-content {
    padding: 16px;
  }
}
</style>
