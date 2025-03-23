<template>
  <div class="roles">
    <!-- Bloc Mr. White -->
    <div class="role">
      <img src="../assets/inspecteur_mrwhite.png" alt="Mr. White" class="role-img" />
      <span class="role-number">{{ nbMrwhite }}</span>
    </div>

    <!-- Bloc Undercover -->
    <div class="role">
      <img src="../assets/inspecteur_undercover.png" alt="Undercover" class="role-img" />
      <span class="role-number">{{ nbUndercover }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineProps({
  nbMrwhite: {
    type: Number,
    required: true,
  },
  nbUndercover:{ 
    type: Number,
    required: true,
  },
})
</script>

<style>
.container {
}

.title {
  margin-bottom: 20px;
}

.roles {
  display: flex;
  justify-content: center;
  background-color: var(--background-color-container);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.role {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-img {
  width: 50px; /* Ajuste la taille selon tes images */
  height: 50px;
  object-fit: contain;
  margin-bottom: 5px;
}

.role-number {
  font-size: 20px;
  font-weight: bold;
}
</style>
