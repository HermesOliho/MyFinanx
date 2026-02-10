<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
</script>

<template>
  <RouterView />
</template>

<style>
/* Global overflow control */
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

#app {
  overflow-x: hidden;
  max-width: 100vw;
}

* {
  box-sizing: border-box;
}

/* Ensure tables are scrollable horizontally */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
