<script setup lang="ts">
import { usePageStore } from '@/stores/page.ts'
import { useRoute } from 'vue-router'

const pageStore = usePageStore()
const route = useRoute()

defineProps({
  isOpen: { type: Boolean, default: true },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <!-- Overlay for mobile (only when sidebar is open) -->
    <div v-if="isOpen" class="sidebar-overlay" @click="emit('close')"></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ open: isOpen }">
      <div class="sidebar-header">
        <div class="brand-mark">MF</div>
        <div>
          <div class="fw-semibold">MyFinanx</div>
          <div class="small text-muted">Espace utilisateur</div>
        </div>
        <!-- Close button for mobile -->
        <button
          type="button"
          class="btn-close ms-auto sidebar-close-btn"
          aria-label="Fermer"
          @click="emit('close')"
        ></button>
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
  </div>
</template>

<style scoped>
.sidebar-overlay {
  display: none;
}

.sidebar {
  min-height: calc(100vh - 72px);
  background: #ffffff;
  padding: 20px;
  border-right: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  width: 260px;
  transition: transform 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-close-btn {
  display: none;
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

/* Desktop: hide sidebar when closed */
@media (min-width: 992px) {
  .sidebar:not(.open) {
    transform: translateX(-100%);
    position: absolute;
  }
}

/* Mobile/Tablet: sidebar as overlay */
@media (max-width: 991px) {
  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .sidebar {
    position: fixed;
    top: 72px;
    left: 0;
    bottom: 0;
    width: 280px;
    min-height: auto;
    border-right: none;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 1050;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-close-btn {
    display: block;
  }

  .sidebar .nav {
    flex-direction: column;
  }

  .sidebar-footer {
    display: flex;
  }
}

@media (max-width: 575px) {
  .sidebar {
    width: 260px;
  }

  .brand-mark {
    width: 34px;
    height: 34px;
    border-radius: 10px;
  }
}
</style>
