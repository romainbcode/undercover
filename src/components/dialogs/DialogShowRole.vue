<template>
<v-dialog v-model="props.handleDialog" transition="dialog-bottom-transition" width="80%">
	<v-card>
		<v-card-title class="text-center">
			Role de {{ props.userName }} : 
			<br/>
			{{ props.userRole }}
		</v-card-title>
		
		<v-card-actions class="justify-center">  
			<v-btn
				color="primary"
				text="ok"
				variant="tonal"
				@click="$emit('emitCloseDialogShowName', false)"
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
  },
	userRole: {
    type: String,
    required: true
  }
})
</script>