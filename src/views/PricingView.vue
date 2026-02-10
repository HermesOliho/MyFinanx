<template>
  <PublicNavbar />
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Header -->
    <section
      class="bg-gradient text-white py-5"
      style="background: linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)"
    >
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="badge bg-white text-primary px-3 py-2 mb-3 rounded-pill">
              <i class="bi bi-tag me-1"></i>
              Tarification
            </div>
            <h1 class="display-4 fw-bold mb-3">Simple, transparent, et gratuit</h1>
            <p class="lead opacity-90 mb-0">
              Toutes les fonctionnalités de MyFinanx sont gratuites. Pas de frais cachés, pas
              d'abonnement.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Pricing Card -->
    <section class="py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-xl-5">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-5 text-center">
                <div
                  class="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                  style="width: 100px; height: 100px"
                >
                  <i class="bi bi-gift-fill text-success display-4"></i>
                </div>
                <h2 class="fw-bold mb-3">Gratuit pour toujours</h2>
                <p class="text-muted mb-4">
                  Accédez à toutes les fonctionnalités sans aucun frais. Notre mission est de rendre
                  la gestion financière accessible à tous.
                </p>

                <div class="display-3 fw-bold text-primary mb-2">0 $</div>
                <p class="text-muted mb-4">Pour toujours</p>

                <router-link to="/signup" class="btn btn-primary btn-lg w-100 mb-4">
                  <i class="bi bi-rocket-takeoff me-2"></i>
                  Commencer maintenant
                </router-link>

                <div class="text-start">
                  <h6 class="fw-bold mb-3">Tout est inclus :</h6>
                  <ul class="list-unstyled">
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Transactions illimitées</strong> - Ajoutez autant de revenus et
                        dépenses que vous le souhaitez</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Support multi-devises</strong> - USD et CDF avec totaux
                        séparés</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Catégories personnalisables</strong> - Organisez vos finances à
                        votre façon</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Recherche et filtres avancés</strong> - Trouvez n'importe quelle
                        transaction instantanément</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Tableau de bord en temps réel</strong> - Visualisez vos finances
                        instantanément</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Sécurité maximale</strong> - Cryptage de niveau bancaire pour vos
                        données</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Interface responsive</strong> - Utilisez MyFinanx sur n'importe
                        quel appareil</span
                      >
                    </li>
                    <li class="d-flex align-items-start mb-3">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Mises à jour automatiques</strong> - Nouvelles fonctionnalités
                        ajoutées régulièrement</span
                      >
                    </li>
                    <li class="d-flex align-items-start">
                      <i class="bi bi-check-circle-fill text-success me-3 fs-5 flex-shrink-0"></i>
                      <span
                        ><strong>Support par email</strong> - Notre équipe est là pour vous
                        aider</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Free Section -->
    <section class="py-5 bg-white">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mb-5">
            <h2 class="display-6 fw-bold mb-3">Pourquoi c'est gratuit ?</h2>
            <p class="lead text-muted">
              Nous croyons que tout le monde mérite d'avoir accès à des outils de gestion financière
              de qualité, sans barrières financières.
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body p-4 text-center">
                <div
                  class="bg-primary-subtle rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                  style="width: 70px; height: 70px"
                >
                  <i class="bi bi-heart-fill text-primary fs-2"></i>
                </div>
                <h5 class="fw-bold mb-3">Notre mission</h5>
                <p class="text-muted mb-0">
                  Rendre la gestion financière accessible à tous, sans discrimination basée sur les
                  moyens financiers.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body p-4 text-center">
                <div
                  class="bg-success-subtle rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                  style="width: 70px; height: 70px"
                >
                  <i class="bi bi-graph-up-arrow text-success fs-2"></i>
                </div>
                <h5 class="fw-bold mb-3">Modèle durable</h5>
                <p class="text-muted mb-0">
                  Nous avons conçu MyFinanx pour être efficace et rentable, ce qui nous permet de
                  l'offrir gratuitement.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body p-4 text-center">
                <div
                  class="bg-warning-subtle rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                  style="width: 70px; height: 70px"
                >
                  <i class="bi bi-people-fill text-warning fs-2"></i>
                </div>
                <h5 class="fw-bold mb-3">Communauté d'abord</h5>
                <p class="text-muted mb-0">
                  Nous sommes financés par des utilisateurs satisfaits qui choisissent de soutenir
                  notre projet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5">
              <h2 class="display-6 fw-bold mb-3">Comparez avec les autres</h2>
              <p class="lead text-muted">
                Découvrez pourquoi MyFinanx est le meilleur choix pour vos finances
              </p>
            </div>

            <div class="card border-0 shadow-sm">
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light">
                      <tr>
                        <th class="p-4 border-0">Fonctionnalité</th>
                        <th class="text-center p-4 border-0">
                          <div class="fw-bold text-primary">MyFinanx</div>
                          <small class="text-muted">Gratuit</small>
                        </th>
                        <th class="text-center p-4 border-0">
                          <div class="fw-bold">Autres apps</div>
                          <small class="text-muted">$5-15/mois</small>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="p-4">Transactions illimitées</td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                        <td class="text-center p-4">
                          <i class="bi bi-dash-circle text-muted fs-4"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4">Multi-devises (USD/CDF)</td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4">Catégories personnalisées</td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4">Recherche avancée</td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                        <td class="text-center p-4">
                          <i class="bi bi-dash-circle text-muted fs-4"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4">Sans publicité</td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                        <td class="text-center p-4">
                          <i class="bi bi-x-circle text-danger fs-4"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="p-4">Support par email</td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                        <td class="text-center p-4">
                          <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </td>
                      </tr>
                      <tr class="table-active">
                        <td class="p-4 fw-bold">Prix mensuel</td>
                        <td class="text-center p-4">
                          <span class="badge bg-success fs-6 px-3 py-2">0 $ / mois</span>
                        </td>
                        <td class="text-center p-4">
                          <span class="badge bg-secondary fs-6 px-3 py-2">5-15 $ / mois</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary text-white py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-4">Commencez dès aujourd'hui</h2>
            <p class="lead opacity-90 mb-4">
              Rejoignez des milliers d'utilisateurs qui ont déjà pris le contrôle de leurs finances
              avec MyFinanx.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <router-link to="/signup" class="btn btn-light btn-lg px-5">
                <i class="bi bi-person-plus me-2"></i>
                Créer un compte gratuit
              </router-link>
              <router-link to="/fonctionnalites" class="btn btn-outline-light btn-lg px-5">
                Voir les fonctionnalités
              </router-link>
            </div>
            <p class="mt-4 mb-0 opacity-75">
              <i class="bi bi-shield-check me-2"></i>
              Aucune carte de crédit requise
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-auto">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <span class="fw-bold fs-5">MyFinanx</span>
            <p class="text-white-50 mb-0 small">© 2024 MyFinanx. Tous droits réservés.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <router-link
              to="/a-propos"
              class="text-white-50 text-decoration-none hover-text-white mx-2"
              >À propos</router-link
            >
            <router-link
              to="/contact"
              class="text-white-50 text-decoration-none hover-text-white mx-2"
              >Contact</router-link
            >
            <a href="#" class="text-white-50 text-decoration-none hover-text-white mx-2"
              >Confidentialité</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue'
</script>

<style scoped>
.hover-text-white:hover {
  color: white !important;
}
</style>
