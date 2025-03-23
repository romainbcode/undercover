<template>
<v-dialog v-model="props.handleDialog" transition="dialog-bottom-transition" width="auto">
  <v-card >
    <v-card-title class="text-center">
      <span> Joueur {{ cmpPlayerAlreadySelectedRole }}</span>
    </v-card-title>
    <v-card-text>
      <v-col class="d-flex justify-content-center">
        <span>Choisis une carte en cliquant dessus !</span>
      </v-col>
      <v-col class="d-flex justify-content-center">
        <img src="../../assets/card.png" class="w-50">
      </v-col>
    </v-card-text>
    <v-card-actions class="justify-center">  
      <v-btn
        color="primary"
        text="Ok"
        variant="tonal"
        @click="$emit('emitCloseDialogReminderPlayer', false)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script setup lang="ts">
import { cmpPlayerAlreadySelectedRole } from '@/stores/store';

const props = defineProps({
  handleDialog: {
    type: Boolean,
    required: true
  },
})
</script>
