<template>
  <div class="d-flex flex-column ga-8 w-75">
    <v-btn rounded="lg" variant="outlined" text="Créer une partie" @click="$emit('handleMenuSelected', 1)"/>
    <v-btn rounded="lg" variant="outlined" text="Charger la partie de Celest" @click="$emit('handleMenuSelected', 2)"/>
  </div>
</template>

<script setup lang='ts'>
</script>

