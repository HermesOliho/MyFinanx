<template>
  <PublicNavbar />
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Header -->
    <section class="bg-primary text-white py-5">
      <div class="container py-md-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="badge bg-white text-primary px-3 py-2 mb-3 rounded-pill">
              <i class="bi bi-envelope me-1"></i>
              Contact
            </div>
            <h1 class="display-4 fw-bold mb-3">Nous sommes là pour vous aider</h1>
            <p class="lead opacity-90 mb-0">
              Une question, une suggestion, ou besoin d'assistance ? N'hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-5">
      <div class="container py-md-4">
        <div class="row g-5">
          <!-- Contact Form -->
          <div class="col-lg-7">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4 p-md-5">
                <h3 class="fw-bold mb-4">Envoyez-nous un message</h3>

                <form @submit.prevent="handleSubmit">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="firstName" class="form-label fw-semibold"
                        >Prénom <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        id="firstName"
                        v-model="form.firstName"
                        required
                        placeholder="Jean"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="lastName" class="form-label fw-semibold"
                        >Nom <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        id="lastName"
                        v-model="form.lastName"
                        required
                        placeholder="Dupont"
                      />
                    </div>
                    <div class="col-12">
                      <label for="email" class="form-label fw-semibold"
                        >Email <span class="text-danger">*</span></label
                      >
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        id="email"
                        v-model="form.email"
                        required
                        placeholder="jean.dupont@example.com"
                      />
                    </div>
                    <div class="col-12">
                      <label for="subject" class="form-label fw-semibold"
                        >Sujet <span class="text-danger">*</span></label
                      >
                      <select
                        class="form-select form-select-lg"
                        id="subject"
                        v-model="form.subject"
                        required
                      >
                        <option value="">Choisir un sujet...</option>
                        <option value="question">Question générale</option>
                        <option value="support">Support technique</option>
                        <option value="feature">Suggestion de fonctionnalité</option>
                        <option value="bug">Signaler un bug</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <label for="message" class="form-label fw-semibold"
                        >Message <span class="text-danger">*</span></label
                      >
                      <textarea
                        class="form-control form-control-lg"
                        id="message"
                        rows="6"
                        v-model="form.message"
                        required
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg w-100"
                        :disabled="isSubmitting"
                      >
                        <span v-if="!isSubmitting">
                          <i class="bi bi-send me-2"></i>
                          Envoyer le message
                        </span>
                        <span v-else>
                          <span class="spinner-border spinner-border-sm me-2"></span>
                          Envoi en cours...
                        </span>
                      </button>
                    </div>
                  </div>
                </form>

                <div v-if="submitSuccess" class="alert alert-success mt-4 mb-0">
                  <i class="bi bi-check-circle-fill me-2"></i>
                  Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs
                  délais.
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="col-lg-5">
            <!-- Contact Cards -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body p-4">
                <div class="d-flex align-items-start mb-4">
                  <div class="bg-primary-subtle rounded-3 p-3 me-3">
                    <i class="bi bi-envelope-fill text-primary fs-4"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Email</h6>
                    <p class="text-muted mb-0">support@myfinanx.com</p>
                    <small class="text-muted">Réponse sous 24h</small>
                  </div>
                </div>

                <div class="d-flex align-items-start mb-4">
                  <div class="bg-success-subtle rounded-3 p-3 me-3">
                    <i class="bi bi-chat-dots-fill text-success fs-4"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Chat en direct</h6>
                    <p class="text-muted mb-0">Disponible 24/7</p>
                    <small class="text-muted">Temps de réponse moyen : 5 min</small>
                  </div>
                </div>

                <div class="d-flex align-items-start">
                  <div class="bg-info-subtle rounded-3 p-3 me-3">
                    <i class="bi bi-geo-alt-fill text-info fs-4"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1">Adresse</h6>
                    <p class="text-muted mb-0">123 Avenue de la Finance<br />Kinshasa, RDC</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-4">
                  <i class="bi bi-question-circle text-primary me-2"></i>
                  Questions fréquentes
                </h5>

                <div class="accordion accordion-flush" id="faqAccordion">
                  <div class="accordion-item border-0 border-bottom">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed px-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        MyFinanx est-il gratuit ?
                      </button>
                    </h2>
                    <div
                      id="faq1"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div class="accordion-body px-0">
                        Oui ! MyFinanx est 100% gratuit, sans publicité et sans fonctionnalités
                        cachées. Toutes les fonctionnalités sont accessibles gratuitement.
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item border-0 border-bottom">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed px-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        Mes données sont-elles sécurisées ?
                      </button>
                    </h2>
                    <div
                      id="faq2"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div class="accordion-body px-0">
                        Absolument. Nous utilisons un cryptage de niveau bancaire et vos données
                        sont hébergées sur des serveurs sécurisés avec Supabase. Nous ne vendons ni
                        ne partageons jamais vos informations.
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item border-0 border-bottom">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed px-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        Comment puis-je réinitialiser mon mot de passe ?
                      </button>
                    </h2>
                    <div
                      id="faq3"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div class="accordion-body px-0">
                        Sur la page de connexion, cliquez sur "Mot de passe oublié ?". Vous recevrez
                        un email avec un lien pour réinitialiser votre mot de passe.
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item border-0">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed px-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                      >
                        Puis-je utiliser plusieurs devises ?
                      </button>
                    </h2>
                    <div
                      id="faq4"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div class="accordion-body px-0">
                        Oui ! MyFinanx supporte USD et CDF. Vous pouvez enregistrer des transactions
                        dans l'une ou l'autre devise, et vos totaux sont calculés séparément pour
                        chaque devise.
                      </div>
                    </div>
                  </div>
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
              to="/a-propos"
              class="text-white-50 text-decoration-none hover-text-white mx-2"
              >À propos</router-link
            >
            <router-link
              to="/fonctionnalites"
              class="text-white-50 text-decoration-none hover-text-white mx-2"
              >Fonctionnalités</router-link
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
import { ref } from 'vue'
import PublicNavbar from '@/components/PublicNavbar.vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitSuccess.value = false

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, you would send the form data to your backend
  console.log('Form submitted:', form.value)

  isSubmitting.value = false
  submitSuccess.value = true

  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  }

  // Hide success message after 5 seconds
  setTimeout(() => {
    submitSuccess.value = false
  }, 5000)
}
</script>

<style scoped>
.hover-text-white:hover {
  color: white !important;
}
</style>
