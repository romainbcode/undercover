<template>
<v-dialog v-model="props.handleDialog" transition="dialog-bottom-transition" width="80%">
	<v-card>
		<v-card-title class="text-center">
			Eliminer {{ props.userName }} ?
		</v-card-title>
		<v-card-actions class="justify-center">  
			<v-btn
				color="primary"
				text="Annuler"
				variant="tonal"
				@click="$emit('emitCloseDialogEliminateSomeone', false)"
			></v-btn>
			<v-btn
				color="primary"
				text="Eliminer"
				variant="tonal"
				@click="$emit('emitConfirmeVoteSomeone')"
			></v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  handleDialog: {
    type: Boolean,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
})
</script>