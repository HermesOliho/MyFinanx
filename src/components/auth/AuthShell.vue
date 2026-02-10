<template>
  <div class="auth-shell">
    <div class="container py-5 min-vh-100 d-flex align-items-center">
      <div class="row w-100 justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card shadow-lg border-0 auth-card">
            <div class="card-body p-4 p-md-5">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-shell {
  background:
    radial-gradient(circle at top, rgba(13, 110, 253, 0.12), transparent 55%),
    radial-gradient(circle at bottom right, rgba(32, 201, 151, 0.14), transparent 45%), #f8f9fa;
}

.auth-card {
  backdrop-filter: blur(6px);
  border-radius: 18px;
}
</style>
