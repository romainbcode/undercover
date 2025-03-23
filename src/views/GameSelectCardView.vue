<template>
  <div class="container">
    <RemainingRoleCard class="mb-5" :nbMrwhite="mrWhiteCount" :nbUndercover="undercoverCount"/>
    <div class="grid-container mb-5">
      <PlayerCard v-for="(n, index) in playersCount" :key="n" 
        :index="index" :refreshGame="refreshGame" :order="users[index].order" 
        :canBeVoted="readyToVote" :isAlive="users[index].alive"
        data-bs-toggle="modal" data-bs-target="#exampleModal" 
        @click="openModal(index)"/>
    </div>
  </div>
  <v-spacer></v-spacer>
  <div 
    :style="
      (cmpPlayerAlreadySelectedRole !== playersCount || readyToVote === true) 
      ? 'visibility: hidden;' 
      : ''
    "
    class="d-flex justify-content-center" style="margin-bottom: 2rem;">
    <v-btn
      color="primary"
      text="Aller voter"
      rounded
      @click="readyToVote = true;"
    ></v-btn>
  </div>
  <div :style="cmpPlayerAlreadySelectedRole !== playersCount ? 'visibility: hidden;' : ''"
  class="d-flex justify-content-center" style="margin-bottom: 5rem;">
    <v-btn
        @click="isAvailableSeeRolePlayer = !isAvailableSeeRolePlayer;"
        icon
        rounded="circle" 
        size="large"
      >
      <img v-if="isAvailableSeeRolePlayer" src="../assets/eye-open.png" class="role-img"/>
      <img v-else src="../assets/eye-close.png" class="role-img"/>
    </v-btn>
  </div>
  <DialogReminderPlayer :handleDialog="dialogReminderPlayer" 
    @emitCloseDialogReminderPlayer="dialogReminderPlayer = false"
  />
  <DialogSelectName :handleDialog="dialog" @emitCloseDialogSelectName="dialog = false"
    @emitValidateName="validateRole"
  />
  <DialogSelectRole :handleDialog="dialogSelectRole" :userColor="users[selectedPlayerIndex].color" :userName="users[selectedPlayerIndex].name"
    :description="description" :secretWord="secretWord" @emitCloseDialogSelectName="dialogSelectRole = false"
  />
  
  <DialogEliminateSomeone 
    :handleDialog="dialogSomeoneVoted" :userName="users[selectedPlayerIndexVoted].name"
    @emitCloseDialogEliminateSomeone="dialogSomeoneVoted = false" 
    @emitConfirmeVoteSomeone="confirmVoteSomeone()"
  /> 
  <DialogShowRole :handleDialog="dialogSeeRole" :userName="users[selectedPlayerIndexSeeRole].name" 
    :userRole="users[selectedPlayerIndexSeeRole].role" @emitCloseDialogShowName="dialogSeeRole = false"
  />
  <DialogReminderPlayerChargedGame :handleDialog="dialogReminderPlayerChargedGame" :userName="users[cpmIndexChargedGame].name"
    @emitCloseDialogReminderPlayerChargedGame="closeDialogReminderPlayerChargedGame"
  />
  <DialogShowRoleChargedGame :handleDialog="dialogSeeRoleChargedGame" :userName="users[cpmIndexChargedGame].name" :userIndex="selectedPlayerIndexSeeRole"
    :userRole="users[cpmIndexChargedGame].role" @emitCloseDialogShowName="closeDialogShowRoleChargedGame"
  />
  <DialogMrWhiteFound :handleDialog="dialogMrWhiteFind" @emitValidateMrWhiteAnswer="confirmMrWhiteAnswer"/>
  
</template>

<script setup lang="ts">
import PlayerCard from '../components/PlayerCard.vue';
import RemainingRoleCard from '../components/RemainingRoleCard.vue';
import PlayerAvatar from '@/components/PlayerAvatar.vue';

import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue';
import { cmpPlayerAlreadySelectedRole, descriptionNavbar, titleNavbar } from '@/stores/store';

import DialogEliminateSomeone from '@/components/dialogs/DialogEliminateSomeone.vue';
import DialogReminderPlayer from '@/components/dialogs/DialogReminderPlayer.vue';
import DialogShowRole from '@/components/dialogs/DialogShowRole.vue';
import DialogSelectName from '@/components/dialogs/DialogSelectName.vue';
import DialogSelectRole from '@/components/dialogs/DialogSelectRole.vue';
import DialogMrWhiteFound from '@/components/dialogs/DialogMrWhiteFound.vue';
import DialogShowRoleChargedGame from '@/components/dialogs/DialogShowRoleChargedGame.vue';
import DialogReminderPlayerChargedGame from '@/components/dialogs/DialogReminderPlayerChargedGame.vue';

const router = useRouter()

const playerName = ref<string>('');
const selectedPlayerIndex = ref<number>(0);
const selectedPlayerIndexVoted = ref<number>(0);
const selectedPlayerIndexSeeRole = ref<number>(0);
const playersCount = parseInt(router.options.history.state.players!.toString());
const undercoverCount = parseInt(router.options.history.state.undercover!.toString());
const mrWhiteCount = parseInt(router.options.history.state.mrWhite!.toString());
const isChargedGame = parseInt(router.options.history.state.isChargedGame!.toString()) //1 = partie préchargé, 0 = parti non pré chargé

const description = ref<string>('');
const role = ref<string>('');
const secretWord = ref<string | null>('fr');

const isAvailableSeeRolePlayer = ref<boolean>(false);

const dialogReminderPlayer = ref<boolean>(isChargedGame ? false : true);
const dialog = ref<boolean>(false);
const dialogSelectRole = ref<boolean>(false);
const dialogSomeoneVoted = ref<boolean>(false);
const dialogMrWhiteFind = ref<boolean>(false);
const dialogSeeRole = ref<boolean>(false);
const dialogReminderPlayerChargedGame = ref<boolean>(isChargedGame ? true : false);
const dialogSeeRoleChargedGame = ref<boolean>(false);

const readyToVote = ref<boolean>(false);

const refreshGame = ref<number>(0);

const cpmIndexChargedGame = ref<number>(0);

function validateRole(name: string){
  if(selectedPlayerIndex.value >= 0) {
    playerName.value = name;
    const users = JSON.parse(localStorage.getItem('game') || "[]");
    role.value = users[selectedPlayerIndex.value].role;
    if(role.value === 'mrWhite') {
      description.value = `Tu n'as pas de mots secrets `;
    } else {
      description.value = `Ton mot secret est `;
    }
    users[selectedPlayerIndex.value].name = playerName.value;
    users[selectedPlayerIndex.value].readyToPlay = true;
    localStorage.setItem('game', JSON.stringify(users));
    dialog.value = false;
    secretWord.value = localStorage.getItem(users[selectedPlayerIndex.value].role);
    refreshGame.value ++;
    dialogSelectRole.value = true;
    playerName.value = '';
  }
}

const getNumberPlayerSelectedRole = () => {
  const users = JSON.parse(localStorage.getItem('game') || "[]");
  let numberPlayerSelectedRole: number = 1;
  users.forEach((user: any) => {
    if(user.name !== null) {
      numberPlayerSelectedRole = numberPlayerSelectedRole + 1;
    }
  });
  return numberPlayerSelectedRole;
}


const openModal = (index: number) => {
  const users = JSON.parse(localStorage.getItem('game') || "[]");
  
  selectedPlayerIndex.value = index;
  if(readyToVote.value === true) {
    selectedPlayerIndexVoted.value = index;
    dialogSomeoneVoted.value = true;
  } else if (isAvailableSeeRolePlayer.value === true) {
    selectedPlayerIndexSeeRole.value = index;
    dialogSeeRole.value = true;
  } else if (users[index].name === null) {
    dialog.value = true;
  } else if(users[index].readyToPlay === false && users[index].name !== null) {
    selectedPlayerIndexSeeRole.value = index;
    dialogSeeRoleChargedGame.value = true;
  }
};

function closeShowRole() {
  cmpPlayerAlreadySelectedRole.value++;
  selectedPlayerIndexSeeRole.value = 0;
  dialogSelectRole.value = false;
  if(cmpPlayerAlreadySelectedRole.value !== playersCount) {
    dialogReminderPlayer.value = true;
  }
}



function confirmVoteSomeone() {
  const users = JSON.parse(localStorage.getItem('game') || "[]");

  const index = selectedPlayerIndexVoted.value;
  dialogSomeoneVoted.value = false;
  if(users[index].role === 'mrWhite') {
    dialogMrWhiteFind.value = true;
  } else {
    users[index].alive = false
    localStorage.setItem('game', JSON.stringify(users))
  }
  //selectedPlayerIndexVoted.value = -1;

}

function confirmMrWhiteAnswer(mrWhiteAnswer: string) {
  const answerWaited = localStorage.getItem('civil');
  if(answerWaited === mrWhiteAnswer) {
    return alert('victoire');
  }else {
    const users = JSON.parse(localStorage.getItem('game') || "[]");
    users[selectedPlayerIndexVoted.value].alive = false;
    localStorage.setItem('game', JSON.stringify(users));
    dialogMrWhiteFind.value = false;

    return alert('Faux ! Mr white éliminé')
  }
}

const users: any = computed(() => {
  refreshGame.value;
  console.log('dans computed')
  return JSON.parse(localStorage.getItem('game') || "[]")
})

function calculateOrderPlayer() {
  let users = JSON.parse(localStorage.getItem('game') || "[]");
  let order: number = 1;
  let firstPlayerFounded: boolean = false;
  while(firstPlayerFounded !== true) {
    const index = Math.floor(Math.random() * (playersCount))

    if(users[index].role !== 'mrWhite') {
      users[index].order = order;
      firstPlayerFounded = true;
      order ++;
    }
  }
  for(let a=0; a<users.length; a++) {
    if(users[a].order === null) {
      users[a].order = order;
      order ++;
    }
  }

  const orderedUsersWithoutMrWhiteInFirstPosition = users.sort((a: any, b: any) => {
    return a.order - b.order;
  })
  localStorage.setItem('game', JSON.stringify(orderedUsersWithoutMrWhiteInFirstPosition));
}

function closeDialogShowRoleChargedGame() {
  refreshGame.value ++;
  const users = JSON.parse(localStorage.getItem('game') || "[]")
  
  const index = cpmIndexChargedGame.value + 1;
  if(index < users.length) {
    titleNavbar.value = users[index].name;
    descriptionNavbar.value = 'Sélectionne une carte !';
    cpmIndexChargedGame.value ++;
    dialogReminderPlayerChargedGame.value = true;
    dialogSeeRoleChargedGame.value = false
  }else {
    dialogSeeRoleChargedGame.value = false
  }
  cmpPlayerAlreadySelectedRole.value++;
  
}

function closeDialogReminderPlayerChargedGame() {
  dialogReminderPlayerChargedGame.value = false

  titleNavbar.value = users[cmpPlayerAlreadySelectedRole.value].name;
  descriptionNavbar.value = 'Sélectionne une carte !';
}

watch(cmpPlayerAlreadySelectedRole, (newValue) => {
  console.log(cmpPlayerAlreadySelectedRole.value, playersCount)
  if(cmpPlayerAlreadySelectedRole.value !== playersCount) {
    titleNavbar.value = 'Joueur ' + cmpPlayerAlreadySelectedRole.value;
  }else{
    titleNavbar.value = 'Description';
    descriptionNavbar.value = "Décris ton mot dans l'ordre indiqué";
  }
})

watch(playerName, (newPlayerName, oldPlayerName) => {
  if(cmpPlayerAlreadySelectedRole.value === playersCount && newPlayerName === '') {
    calculateOrderPlayer()
  }
})

</script>

<style scoped>
.container {
  text-align: center;
}

.title {
  margin-bottom: 20px;
}

.role-img {
  width: 40px; /* Ajuste la taille selon tes images */
  height: 40px;
  object-fit: contain;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cartes par ligne */
  gap: 20px;
  justify-content: center;
}

.grid-container > * {
  width: 100%;
}

.custom-close-btn {
  background-color: black !important;
  color: white !important;
}

.logo-role, img {
  width: 50px;
}

.btn-close{
  color: black;
  box-shadow: 0 0 0 0;
}
</style>

