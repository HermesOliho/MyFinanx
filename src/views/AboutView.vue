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
              <i class="bi bi-heart me-1"></i>
              À propos
            </div>
            <h1 class="display-4 fw-bold mb-3">Notre mission : simplifier vos finances</h1>
            <p class="lead opacity-90 mb-0">
              MyFinanx est né d'une conviction simple : gérer ses finances personnelles ne devrait
              pas être compliqué.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="card border-0 shadow-sm mb-5">
              <div class="card-body p-5">
                <h2 class="fw-bold mb-4">Notre histoire</h2>
                <p class="lead text-muted mb-4">
                  Nous avons créé MyFinanx parce que nous étions frustrés par la complexité des
                  outils de gestion financière existants. Trop compliqués, trop chers, ou manquant
                  de fonctionnalités essentielles.
                </p>
                <p class="text-muted mb-4">
                  Notre objectif était simple : créer une plateforme intuitive, puissante et
                  accessible à tous pour gérer ses revenus, dépenses et budgets. Une solution qui
                  s'adapte à votre vie, pas l'inverse.
                </p>
                <p class="text-muted mb-0">
                  Aujourd'hui, MyFinanx aide des milliers d'utilisateurs à reprendre le contrôle de
                  leurs finances et à atteindre leurs objectifs financiers, qu'il s'agisse
                  d'économiser pour un projet, de réduire leurs dépenses ou simplement de mieux
                  comprendre où va leur argent.
                </p>
              </div>
            </div>

            <!-- Values -->
            <div class="row g-4 mb-5">
              <div class="col-md-4">
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div
                      class="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style="width: 80px; height: 80px"
                    >
                      <i class="bi bi-lightning-charge-fill text-primary fs-1"></i>
                    </div>
                    <h5 class="fw-bold mb-3">Simplicité</h5>
                    <p class="text-muted mb-0">
                      Interface intuitive et facile à utiliser, même pour les débutants. Pas de
                      jargon financier compliqué.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div
                      class="bg-success-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style="width: 80px; height: 80px"
                    >
                      <i class="bi bi-shield-check text-success fs-1"></i>
                    </div>
                    <h5 class="fw-bold mb-3">Sécurité</h5>
                    <p class="text-muted mb-0">
                      Vos données financières sont précieuses. Nous utilisons un cryptage de niveau
                      bancaire pour les protéger.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-body p-4 text-center">
                    <div
                      class="bg-warning-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style="width: 80px; height: 80px"
                    >
                      <i class="bi bi-people-fill text-warning fs-1"></i>
                    </div>
                    <h5 class="fw-bold mb-3">Accessibilité</h5>
                    <p class="text-muted mb-0">
                      Gratuit pour tous, sans fonctionnalités cachées. Nous croyons que chacun
                      mérite d'accéder à des outils financiers de qualité.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Features Highlight -->
            <div class="card border-0 shadow-sm bg-dark text-white">
              <div class="card-body p-5">
                <div class="row align-items-center">
                  <div class="col-lg-7">
                    <h3 class="fw-bold mb-4">Ce qui nous rend différents</h3>
                    <ul class="list-unstyled mb-0">
                      <li class="d-flex align-items-start mb-3">
                        <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <div>
                          <strong>100% gratuit</strong> - Aucun abonnement, aucune publicité, aucun
                          coût caché
                        </div>
                      </li>
                      <li class="d-flex align-items-start mb-3">
                        <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <div>
                          <strong>Multi-devises</strong> - Support natif pour USD et CDF sans
                          conversion
                        </div>
                      </li>
                      <li class="d-flex align-items-start mb-3">
                        <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <div>
                          <strong>Interface moderne</strong> - Design élégant et responsive sur tous
                          les appareils
                        </div>
                      </li>
                      <li class="d-flex align-items-start mb-3">
                        <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <div>
                          <strong>Données sécurisées</strong> - Hébergement fiable avec Supabase et
                          sauvegardes automatiques
                        </div>
                      </li>
                      <li class="d-flex align-items-start">
                        <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <div>
                          <strong>Mises à jour régulières</strong> - Nouvelles fonctionnalités
                          ajoutées en continu
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-5 text-center mt-4 mt-lg-0">
                    <div class="display-1 mb-3">🚀</div>
                    <h4 class="fw-bold mb-3">En constante évolution</h4>
                    <p class="opacity-75 mb-0">
                      Nous écoutons vos retours et améliorons MyFinanx chaque jour pour mieux
                      répondre à vos besoins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-5 bg-white">
      <div class="container py-md-4">
        <div class="row g-4 text-center">
          <div class="col-md-3 col-6">
            <div class="display-4 fw-bold text-primary mb-2">1000+</div>
            <p class="text-muted mb-0">Utilisateurs actifs</p>
          </div>
          <div class="col-md-3 col-6">
            <div class="display-4 fw-bold text-success mb-2">50K+</div>
            <p class="text-muted mb-0">Transactions enregistrées</p>
          </div>
          <div class="col-md-3 col-6">
            <div class="display-4 fw-bold text-warning mb-2">24/7</div>
            <p class="text-muted mb-0">Disponibilité</p>
          </div>
          <div class="col-md-3 col-6">
            <div class="display-4 fw-bold text-danger mb-2">100%</div>
            <p class="text-muted mb-0">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-lg bg-primary text-white">
              <div class="card-body p-5 text-center">
                <h2 class="display-6 fw-bold mb-4">Rejoignez la communauté MyFinanx</h2>
                <p class="lead opacity-90 mb-4">
                  Commencez dès aujourd'hui à prendre le contrôle de vos finances. C'est gratuit et
                  ça le restera toujours.
                </p>
                <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <router-link to="/signup" class="btn btn-light btn-lg px-5">
                    <i class="bi bi-person-plus me-2"></i>
                    Créer un compte
                  </router-link>
                  <router-link to="/fonctionnalites" class="btn btn-outline-light btn-lg px-5">
                    Découvrir les fonctionnalités
                  </router-link>
                </div>
              </div>
            </div>
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
              to="/fonctionnalites"
              class="text-white-50 text-decoration-none hover-text-white mx-2"
              >Fonctionnalités</router-link
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
