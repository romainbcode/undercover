<template>
	<v-dialog v-model="props.handleDialog" transition="dialog-bottom-transition" width="80%">
		<v-card>
			<v-card-title class="text-center">
			<p>
				<span class="fw-bold fs-4">Ecris ton nom</span><br>
				<span class="fs-6 text-muted">découvre ton role</span>
			</p>
		</v-card-title>
		<v-card-text>
			<v-row dense>
				<v-text-field
					label="Nom"
					variant="outlined"
					v-model="name"
					required
				></v-text-field>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				text="Annuler"
				variant="plain"
				@click="$emit('emitCloseDialogSelectName')"
			></v-btn>
			<v-btn
				color="primary"
				text="Valider"
				variant="tonal"
				@click="validateName()"
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

const emit = defineEmits(['emitValidateName', 'emitCloseDialogSelectName'])

const name = ref<string>('')

function validateName() {
	emit('emitValidateName', name.value)
	name.value = '';
}
</script>