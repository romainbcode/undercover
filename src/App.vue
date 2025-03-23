<template>
  .
  <v-app>
    <v-app-bar :elevation="0" class="position-relative" style="height: 12%"> 
      <template v-slot:prepend >
        <v-btn @click="dialogGoToHome = true;" class="position-absolute left-0">
          <LogOut />
        </v-btn>
      </template>
      <v-app-bar-title class="m-0">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <span class="fw-bold fs-4">{{ titleNavbar }}</span><br>
          <span v-if="descriptionNavbar" class="fs-6 text-muted">{{ descriptionNavbar }}</span>
        </div>
      </v-app-bar-title>
    </v-app-bar>
    <RouterView />
  </v-app>
  <v-dialog v-model="dialogGoToHome" transition="dialog-bottom-transition">
    <v-card width="auto">
      <v-card-title class="text-center">
        <p>
          <span class="fw-bold fs-4">Retourner au menu ?</span><br>
          <span class="fs-6 text-muted">Les données seront effacées</span>
        </p>
      </v-card-title>
      <v-card-actions class="justify-center">  
        <v-btn
          class="mr-10"
          color="primary"
          text="annuler"
          variant="tonal"
          @click="dialogGoToHome = false;"
        ></v-btn>
        <v-btn
          color="primary"
          text="Oui"
          variant="tonal"
          @click="resetGoToHome"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LogOut } from 'lucide-vue-next';
import { useRouter } from 'vue-router'
import { ref } from 'vue';

import { cmpPlayerAlreadySelectedRole, descriptionNavbar, titleNavbar } from '@/stores/store';

const router = useRouter()

const dialogGoToHome = ref<boolean>(false);

function resetGoToHome() {
  localStorage.setItem('game', JSON.stringify([]));
  resetValuesStore();
  router.push('/');
  dialogGoToHome.value = false;
  
}

function resetValuesStore() {
  cmpPlayerAlreadySelectedRole.value = 0;
  titleNavbar.value = 'Undercover!!!';
  descriptionNavbar.value = '';
}
</script>

<style>


</style>