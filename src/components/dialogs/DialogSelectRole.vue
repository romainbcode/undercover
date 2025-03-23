<template>
	<v-dialog v-model="props.handleDialog" transition="dialog-bottom-transition" width="80%">
    <v-card class="rounded-lg py-2">
      <v-card-title>
        <PlayerAvatar :color="props.userColor" :name="props.userName"/>
      </v-card-title>
      <v-card-text>
        <v-col class="d-flex justify-content-center">
          <span>{{ props.description }}</span>
        </v-col>
        <v-col class="card d-flex align-items-center border-1 border-black rounded p-5">
          <span>{{ props.secretWord ? props.secretWord : 'Tu es MrWhite' }}</span>
        </v-col>
      </v-card-text>
      <v-card-actions class="mx-3">  
        <v-btn
          color="primary"
          text="D'accord"
          variant="tonal"
          width="100%"
          @click="$emit('emitCloseDialogSelectName')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import PlayerAvatar from '../PlayerAvatar.vue';
const props = defineProps({
	handleDialog: {
    type: Boolean,
    required: true
  },
	userColor: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	secretWord: {
		type: [String, null],
		required: true
	}
})
</script>
