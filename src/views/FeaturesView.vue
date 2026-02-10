<template>
  <PublicNavbar />
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Header -->
    <section class="bg-primary text-white py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="badge bg-white text-primary px-3 py-2 mb-3 rounded-pill">
              <i class="bi bi-cpu me-1"></i>
              Fonctionnalités
            </div>
            <h1 class="display-4 fw-bold mb-3">
              Tout ce dont vous avez besoin pour gérer vos finances
            </h1>
            <p class="lead opacity-90 mb-0">
              Une suite complète d'outils pour suivre, analyser et optimiser vos finances
              personnelles
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Features -->
    <section class="py-5">
      <div class="container py-md-4">
        <!-- Dashboard -->
        <div class="row align-items-center g-5 mb-5 pb-md-4">
          <div class="col-lg-6">
            <div class="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
              <i class="bi bi-speedometer2 me-1"></i>
              Vue d'ensemble
            </div>
            <h2 class="display-6 fw-bold mb-3">Tableau de bord intelligent</h2>
            <p class="lead text-muted mb-4">
              Visualisez instantanément l'état de vos finances avec un tableau de bord clair et
              intuitif. Suivez votre solde, vos revenus et dépenses en temps réel.
            </p>
            <ul class="list-unstyled">
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Résumé instantané</strong>
                  <p class="text-muted mb-0">
                    Solde net, revenus totaux et dépenses du mois en un coup d'œil
                  </p>
                </div>
              </li>
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Multi-devises</strong>
                  <p class="text-muted mb-0">Support USD et CDF avec totaux séparés par devise</p>
                </div>
              </li>
              <li class="d-flex align-items-start">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Graphiques interactifs</strong>
                  <p class="text-muted mb-0">
                    Visualisez vos tendances financières avec des graphiques élégants
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h6 class="mb-0 fw-semibold">Tableau de bord</h6>
                  <span class="badge bg-primary">Décembre 2024</span>
                </div>
                <div class="row g-3">
                  <div class="col-4">
                    <div class="bg-light p-3 rounded text-center">
                      <div class="small text-muted">Solde</div>
                      <div class="fw-bold fs-5 text-primary">2 350 $</div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="bg-success-subtle p-3 rounded text-center">
                      <div class="small text-muted">Revenus</div>
                      <div class="fw-bold fs-5 text-success">+3 100 $</div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="bg-danger-subtle p-3 rounded text-center">
                      <div class="small text-muted">Dépenses</div>
                      <div class="fw-bold fs-5 text-danger">−750 $</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction Management -->
        <div class="row align-items-center g-5 mb-5 pb-md-4 flex-lg-row-reverse">
          <div class="col-lg-6">
            <div class="badge bg-success-subtle text-success px-3 py-2 mb-3">
              <i class="bi bi-cash-stack me-1"></i>
              Gestion
            </div>
            <h2 class="display-6 fw-bold mb-3">Revenus et dépenses simplifiés</h2>
            <p class="lead text-muted mb-4">
              Enregistrez vos transactions financières en quelques clics. Ajoutez, modifiez ou
              supprimez vos revenus et dépenses avec une interface intuitive.
            </p>
            <ul class="list-unstyled">
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Catégorisation automatique</strong>
                  <p class="text-muted mb-0">
                    Organisez vos transactions par catégories personnalisables
                  </p>
                </div>
              </li>
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Recherche et filtres</strong>
                  <p class="text-muted mb-0">
                    Trouvez rapidement n'importe quelle transaction avec la recherche avancée
                  </p>
                </div>
              </li>
              <li class="d-flex align-items-start">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Tri flexible</strong>
                  <p class="text-muted mb-0">
                    Triez par date, montant ou catégorie selon vos besoins
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <h6 class="mb-3 fw-semibold">
                  <i class="bi bi-cash-coin text-success me-2"></i>
                  Historique des revenus
                </h6>
                <div class="table-responsive">
                  <table class="table table-hover align-middle mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <div class="fw-semibold">Salaire</div>
                          <small class="text-muted">15 Déc 2024</small>
                        </td>
                        <td>
                          <span class="badge bg-primary-subtle text-primary">Emploi</span>
                        </td>
                        <td class="text-end">
                          <span class="fw-bold text-success">+3 000 $</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="fw-semibold">Freelance</div>
                          <small class="text-muted">10 Déc 2024</small>
                        </td>
                        <td>
                          <span class="badge bg-info-subtle text-info">Projet</span>
                        </td>
                        <td class="text-end">
                          <span class="fw-bold text-success">+500 $</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="row align-items-center g-5 mb-5 pb-md-4">
          <div class="col-lg-6">
            <div class="badge bg-warning-subtle text-warning px-3 py-2 mb-3">
              <i class="bi bi-tags me-1"></i>
              Organisation
            </div>
            <h2 class="display-6 fw-bold mb-3">Catégories personnalisées</h2>
            <p class="lead text-muted mb-4">
              Organisez vos finances selon vos besoins avec des catégories flexibles et adaptées à
              votre style de vie.
            </p>
            <ul class="list-unstyled">
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Catégories prédéfinies</strong>
                  <p class="text-muted mb-0">Commencez rapidement avec nos catégories par défaut</p>
                </div>
              </li>
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Personnalisation complète</strong>
                  <p class="text-muted mb-0">Créez vos propres catégories adaptées à vos besoins</p>
                </div>
              </li>
              <li class="d-flex align-items-start">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Analyse par catégorie</strong>
                  <p class="text-muted mb-0">
                    Identifiez où va votre argent avec des statistiques détaillées
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="row g-3">
              <div class="col-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="fs-1 mb-2">🍔</div>
                    <h6 class="fw-semibold mb-1">Alimentation</h6>
                    <p class="text-muted small mb-0">280 $ / 400 $</p>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="fs-1 mb-2">🚗</div>
                    <h6 class="fw-semibold mb-1">Transport</h6>
                    <p class="text-muted small mb-0">120 $ / 200 $</p>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="fs-1 mb-2">🎮</div>
                    <h6 class="fw-semibold mb-1">Loisirs</h6>
                    <p class="text-muted small mb-0">180 $ / 250 $</p>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card border-0 shadow-sm">
                  <div class="card-body text-center p-4">
                    <div class="fs-1 mb-2">🏠</div>
                    <h6 class="fw-semibold mb-1">Logement</h6>
                    <p class="text-muted small mb-0">600 $ / 800 $</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="row align-items-center g-5 flex-lg-row-reverse">
          <div class="col-lg-6">
            <div class="badge bg-danger-subtle text-danger px-3 py-2 mb-3">
              <i class="bi bi-shield-check me-1"></i>
              Sécurité
            </div>
            <h2 class="display-6 fw-bold mb-3">Vos données en sécurité</h2>
            <p class="lead text-muted mb-4">
              Nous prenons la sécurité de vos informations financières très au sérieux. Toutes vos
              données sont cryptées et protégées.
            </p>
            <ul class="list-unstyled">
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Cryptage de bout en bout</strong>
                  <p class="text-muted mb-0">
                    Vos données sont toujours cryptées lors du stockage et du transfert
                  </p>
                </div>
              </li>
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Authentification sécurisée</strong>
                  <p class="text-muted mb-0">
                    Protection par mot de passe avec récupération sécurisée
                  </p>
                </div>
              </li>
              <li class="d-flex align-items-start">
                <i class="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                <div>
                  <strong>Infrastructure fiable</strong>
                  <p class="text-muted mb-0">
                    Hébergé sur Supabase avec des sauvegardes automatiques
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="card shadow-lg border-0 bg-dark text-white">
              <div class="card-body p-5 text-center">
                <i class="bi bi-shield-lock-fill display-1 mb-4 text-success"></i>
                <h4 class="fw-bold mb-3">100% Sécurisé</h4>
                <p class="mb-0 opacity-75">
                  Vos informations financières sont protégées par des technologies de cryptage de
                  niveau bancaire. Nous ne vendons ni ne partageons jamais vos données.
                </p>
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
            <h2 class="display-5 fw-bold mb-4">Prêt à prendre le contrôle de vos finances ?</h2>
            <p class="lead opacity-90 mb-4">
              Rejoignez des milliers d'utilisateurs qui ont déjà simplifié leur gestion financière
              avec MyFinanx.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <router-link to="/signup" class="btn btn-light btn-lg px-5">
                <i class="bi bi-rocket-takeoff me-2"></i>
                Commencer gratuitement
              </router-link>
              <router-link to="/contact" class="btn btn-outline-light btn-lg px-5">
                Nous contacter
              </router-link>
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
