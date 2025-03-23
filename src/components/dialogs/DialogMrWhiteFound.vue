<template>
  <v-dialog v-model="props.handleDialog" transition="dialog-bottom-transition" width="80%">
    <v-card>
      <v-card-title class="text-center">
        Mr White a été trouvé !
      </v-card-title>
      <v-card-text>
        <v-row justify="center" class="mb-10">
          <img class="logo-role" src="../assets/inspecteur_mrwhite.png"/>
        </v-row>
        <v-row>
            <v-text-field
              label="Supposition de Mr White"
              variant="outlined"
              v-model="mrWhiteAnswer"
              required
            ></v-text-field>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">  
        <v-btn
          color="primary"
          text="Eliminer"
          variant="tonal"
          @click="validateMrWhiteAnswer()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  handleDialog: {
    type: Boolean,
    required: true
  },
})

const emit = defineEmits(['emitValidateMrWhiteAnswer'])

const mrWhiteAnswer = ref<string>('')

function validateMrWhiteAnswer() {
	emit('emitValidateMrWhiteAnswer', mrWhiteAnswer.value)
	mrWhiteAnswer.value = '';
}

</script>