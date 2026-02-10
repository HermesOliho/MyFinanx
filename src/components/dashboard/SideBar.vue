<script setup lang="ts">
import { usePageStore } from '@/stores/page.ts'
import { useRoute } from 'vue-router'

const pageStore = usePageStore()
const route = useRoute()
</script>

<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <div class="brand-mark">MF</div>
      <div>
        <div class="fw-semibold">MyFinanx</div>
        <div class="small text-muted">Espace utilisateur</div>
      </div>
    </div>
    <hr class="my-3" />
    <ul class="nav nav-pills flex-column gap-1">
      <li class="nav-item">
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="nav-link"
          :class="{ active: route.name === 'dashboard' }"
          :aria-current="{ active: route.name === 'dashboard' ? 'page' : null }"
          @click="pageStore.setModuleTitle('Tableau de bord')"
        >
          <i class="bi bi-grid me-2"></i>Tableau de bord
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'expenses' }"
          class="nav-link"
          :class="{ active: route.name === 'expenses' }"
          :aria-current="{ active: route.name === 'expenses' ? 'page' : null }"
          @click="pageStore.setModuleTitle('Depenses')"
        >
          <i class="bi bi-wallet2 me-2"></i>Depenses
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'incomes' }"
          class="nav-link"
          :class="{ active: route.name === 'incomes' }"
          :aria-current="{ active: route.name === 'incomes' ? 'page' : null }"
          @click="pageStore.setModuleTitle('Revenus')"
        >
          <i class="bi bi-graph-up-arrow me-2"></i>Revenus
        </RouterLink>
      </li>
      <li>
        <a href="#" class="nav-link" @click="pageStore.setModuleTitle('Rapports')">
          <i class="bi bi-bar-chart-line me-2"></i>Rapports
        </a>
      </li>
      <li>
        <a href="#" class="nav-link" @click="pageStore.setModuleTitle('Statistiques')">
          <i class="bi bi-pie-chart me-2"></i>Statistiques
        </a>
      </li>
    </ul>
    <div class="sidebar-footer mt-auto">
      <div class="d-flex align-items-center gap-2">
        <div class="status-dot"></div>
        <span class="small text-muted">Synchronise avec Supabase</span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  min-height: calc(100vh - 72px);
  background: #ffffff;
  padding: 20px;
  border-right: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d6efd, #20c997);
  color: #fff;
  font-weight: 700;
}

.nav-link {
  color: #334155;
  border-radius: 12px;
  padding: 10px 12px;
}

.nav-link:hover {
  background: rgba(15, 23, 42, 0.05);
}

.nav-link.active {
  background: rgba(13, 110, 253, 0.12);
  color: #0d6efd;
  font-weight: 600;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #16a34a;
}

@media (max-width: 991px) {
  .sidebar {
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    padding: 14px 16px;
  }

  .sidebar-header {
    gap: 8px;
  }

  .sidebar .nav {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .sidebar .nav-link {
    white-space: nowrap;
  }

  .sidebar-footer {
    display: none;
  }
}

@media (max-width: 575px) {
  .brand-mark {
    width: 34px;
    height: 34px;
    border-radius: 10px;
  }
}
</style>
