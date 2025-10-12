<template>
  <PublicNavbar />
  <div class="min-vh-100 d-flex flex-column">
    <!-- Hero -->
    <section
      class="position-relative text-white"
      style="background: linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)"
    >
      <div class="container py-5">
        <div class="row align-items-center g-5 py-4">
          <div class="col-lg-6">
            <span class="badge bg-light text-primary mb-3">Votre coach financier</span>
            <h1 class="display-5 fw-bold mb-3">Gérez vos finances avec clarté et sérénité</h1>
            <p class="lead opacity-90 mb-4">
              Suivez vos entrées et dépenses, visualisez vos tendances et gardez le contrôle de
              votre budget.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <router-link to="/dashboard" class="btn btn-light btn-lg fw-semibold"
                >Voir le tableau de bord</router-link
              >
              <router-link to="/operations/new" class="btn btn-outline-light btn-lg"
                >Ajouter une opération</router-link
              >
            </div>
            <div class="d-flex align-items-center gap-3 mt-4 small opacity-75">
              <span class="d-inline-flex align-items-center">
                <span class="badge rounded-pill bg-success me-2">Nouveau</span> Budgets mensuels
              </span>
              <span class="d-none d-sm-inline">•</span>
              <span class="d-none d-sm-inline">Rapports exportables</span>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="card shadow-lg border-0 overflow-hidden">
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="mb-0">Aperçu rapide</h5>
                  <span class="badge bg-primary-subtle text-primary">Ce mois</span>
                </div>

                <div class="row text-center g-3 mb-3">
                  <div class="col-4">
                    <div class="small text-muted">Solde</div>
                    <div class="fw-bold fs-5">2 350 €</div>
                  </div>
                  <div class="col-4">
                    <div class="small text-muted">Entrées</div>
                    <div class="fw-bold text-success">+3 100 €</div>
                  </div>
                  <div class="col-4">
                    <div class="small text-muted">Dépenses</div>
                    <div class="fw-bold text-danger">−1 750 €</div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="d-flex justify-content-between small">
                    <span class="text-muted">Budget courses</span>
                    <span class="fw-semibold">72%</span>
                  </div>
                  <div class="progress" style="height: 8px">
                    <div class="progress-bar bg-success" style="width: 72%"></div>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="d-flex justify-content-between small">
                    <span class="text-muted">Transport</span>
                    <span class="fw-semibold">40%</span>
                  </div>
                  <div class="progress" style="height: 8px">
                    <div class="progress-bar bg-info" style="width: 40%"></div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="d-flex justify-content-between small">
                    <span class="text-muted">Loisirs</span>
                    <span class="fw-semibold">55%</span>
                  </div>
                  <div class="progress" style="height: 8px">
                    <div class="progress-bar bg-warning" style="width: 55%"></div>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <router-link to="/reports" class="btn btn-outline-secondary btn-sm"
                    >Voir les rapports</router-link
                  >
                  <router-link to="/budgets" class="btn btn-primary btn-sm"
                    >Gérer les budgets</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        class="position-absolute bottom-0 start-0 w-100"
        height="80"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,80 L0,80 Z"
          fill="#ffffff"
        />
      </svg>
    </section>

    <!-- Features -->
    <section class="container my-5">
      <div class="text-center mb-4">
        <h2 class="fw-bold">Tout pour piloter vos finances</h2>
        <p class="text-muted mb-0">Des outils simples, puissants et gratuits.</p>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="display-6 mb-2">📈</div>
              <h5 class="card-title">Tableau de bord</h5>
              <p class="card-text text-muted">
                Vue d’ensemble claire de vos entrées, dépenses et tendances.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="display-6 mb-2">🏷️</div>
              <h5 class="card-title">Catégories</h5>
              <p class="card-text text-muted">
                Classez vos opérations pour mieux comprendre où va votre argent.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="display-6 mb-2">🎯</div>
              <h5 class="card-title">Budgets</h5>
              <p class="card-text text-muted">
                Fixez des objectifs mensuels et suivez leur progression en temps réel.
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="display-6 mb-2">📤</div>
              <h5 class="card-title">Rapports</h5>
              <p class="card-text text-muted">
                Exportez vos données et analysez-les en détail quand vous le souhaitez.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-light py-5">
      <div class="container">
        <div class="text-center mb-4">
          <h2 class="fw-bold">Commencez en 3 étapes</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <div class="badge bg-primary mb-2">1</div>
                <h5 class="card-title">Ajoutez vos opérations</h5>
                <p class="card-text text-muted">
                  Saisissez vos entrées et dépenses en quelques secondes.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <div class="badge bg-primary mb-2">2</div>
                <h5 class="card-title">Catégorisez et budgétez</h5>
                <p class="card-text text-muted">
                  Organisez vos dépenses et définissez des limites par catégorie.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <div class="badge bg-primary mb-2">3</div>
                <h5 class="card-title">Analysez et progressez</h5>
                <p class="card-text text-muted">
                  Suivez vos progrès et ajustez vos habitudes facilement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <router-link to="/onboarding" class="btn btn-primary btn-lg"
            >Commencer maintenant</router-link
          >
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <footer class="container py-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div class="text-muted small">
          My Finanx — Prenez de meilleures décisions financières, chaque jour.
        </div>
        <div class="d-flex gap-2">
          <router-link to="/privacy" class="btn btn-outline-secondary btn-sm"
            >Confidentialité</router-link
          >
          <router-link to="/settings" class="btn btn-outline-secondary btn-sm"
            >Paramètres</router-link
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'

console.log('WelcomeView loaded')
</script>
