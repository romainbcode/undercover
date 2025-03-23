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
				@click="validate()"
			></v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['emitCloseDialogShowName'])

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
  },
  userIndex: {
	type: Number,
	required: true,
  },
})

function validate() {
	const users = JSON.parse(localStorage.getItem('game') || "[]");
	const indexUserName = users.findIndex((user: any) => user.name === props.userName)
	users[indexUserName].readyToPlay = true;

	/*const indexClicked = props.userIndex;

	const userTmp = users[indexClicked]

	users[indexClicked] = users[indexUserName];
	users[indexUserName] = userTmp;xscsfrsfrfr*/    

	localStorage.setItem('game', JSON.stringify(users));
	emit("emitCloseDialogShowName", false)
}
</script>