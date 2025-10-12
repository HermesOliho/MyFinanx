<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link to="/dashboard" class="navbar-brand"> My Finanx </router-link>

      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#userNavbar"
        aria-controls="userNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="userNavbar">
        <!-- Left menu -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/dashboard"
              class="nav-link"
              :class="{ active: isActiveExact('/dashboard') }"
              aria-current="page"
            >
              Tableau de bord
            </router-link>
          </li>

          <li class="nav-item dropdown" :class="{ show: isTransactionsSection }">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="transactionsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :class="{ active: isTransactionsSection }"
            >
              Transactions
            </a>
            <ul
              class="dropdown-menu"
              :class="{ show: isTransactionsSection }"
              aria-labelledby="transactionsDropdown"
            >
              <li>
                <router-link
                  to="/transactions"
                  class="dropdown-item"
                  :class="{ active: isActiveExact('/transactions') }"
                >
                  Toutes
                </router-link>
              </li>
              <li>
                <router-link
                  to="/transactions/income"
                  class="dropdown-item"
                  :class="{ active: route.path.startsWith('/transactions/income') }"
                >
                  Entrées
                </router-link>
              </li>
              <li>
                <router-link
                  to="/transactions/expenses"
                  class="dropdown-item"
                  :class="{ active: route.path.startsWith('/transactions/expenses') }"
                >
                  Dépenses
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link
              to="/budgets"
              class="nav-link"
              :class="{ active: route.path.startsWith('/budgets') }"
            >
              Budgets
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/reports"
              class="nav-link"
              :class="{ active: route.path.startsWith('/reports') }"
            >
              Rapports
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/accounts"
              class="nav-link"
              :class="{ active: route.path.startsWith('/accounts') }"
            >
              Comptes
            </router-link>
          </li>
        </ul>

        <!-- Right side -->
        <div class="d-flex align-items-center gap-2">
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="handleQuickAdd"
            title="Ajouter une transaction"
            aria-label="Ajouter une transaction"
          >
            + Nouvelle transaction
          </button>

          <div class="dropdown">
            <button
              class="btn btn-outline-light d-flex align-items-center gap-2"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span v-if="avatarUrl" class="position-relative">
                <img
                  :src="avatarUrl"
                  alt="Avatar utilisateur"
                  class="rounded-circle"
                  width="28"
                  height="28"
                />
              </span>
              <span
                v-else
                class="rounded-circle bg-light text-dark d-inline-flex justify-content-center align-items-center"
                style="width: 28px; height: 28px; font-size: 0.75rem; font-weight: 600"
              >
                {{ initials }}
              </span>
              <span class="d-none d-sm-inline">{{ userName }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
              <li>
                <router-link
                  to="/profile"
                  class="dropdown-item"
                  :class="{ active: route.path.startsWith('/profile') }"
                >
                  Profil
                </router-link>
              </li>
              <li>
                <router-link
                  to="/settings"
                  class="dropdown-item"
                  :class="{ active: route.path.startsWith('/settings') }"
                >
                  Paramètres
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item text-danger" @click="handleLogout">Déconnexion</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- /collapse -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  userName: { type: String, default: 'Utilisateur' },
  avatarUrl: { type: String, default: '' },
})

const emit = defineEmits(['logout', 'add-transaction'])

const route = useRoute()

const initials = computed(() => {
  const parts = (props.userName || '').trim().split(/\s+/).filter(Boolean)
  return (
    parts
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('') || 'U'
  )
})

const isActiveExact = (path: string) => route.path === path
const isTransactionsSection = computed(() => route.path.startsWith('/transactions'))

const handleLogout = () => emit('logout')
const handleQuickAdd = () => emit('add-transaction')
</script>
