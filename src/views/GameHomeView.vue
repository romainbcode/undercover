<template>
  <div v-if="isCreateMenuSelected === 0" class="d-flex justify-content-center align-items-center h-100" style="margin-bottom: 25%;">
    <SelectMenuGame @handleMenuSelected="callbackEventButtonMenuSelected"/>
  </div>
  <div v-if="isCreateMenuSelected === 1" class="d-flex flex-column p-3">
    <div class="menu">
      <div class="d-flex justify-content-center mt-2 mb-5">
        <label class="fw-bold fs-4">{{ players }} joueurs</label>
      </div>
      <v-slider 
        v-model="players"
        :max="13"
        :min="2"
        :step="1"
        thumb-label
      ></v-slider>
      <v-card class="d-flex flex-column align-items-center gap-3 p-3" style="background-color: #f1f1f1" >
        <div>
          <label class="fs-4">{{ civil }} {{ civil > 1 ? 'civils' : 'civil' }}  </label>
        </div>
        <div class="role">
          <button class="btn bg-black rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isMinusUndercoverHidden ? 'visibility: hidden;' : ''" @click="undercover--" :disabled="undercover <= 0">-</button>
          <label class="undercover fs-4 d-flex justify-content-center">{{ undercover }} {{undercover > 1 ? 'undercovers' : 'undercover' }} </label>
          <button class="btn bg-black rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isPlusUndercoverHidden ? 'visibility: hidden;' : ''" @click="undercover++">+</button>
        </div>
        <div class="role">
          <button class="btn bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isMinusWhiteHidden ? 'visibility: hidden;' : ''" @click="mrWhite--">-</button>
          <label class="mrwhite fs-4 d-flex justify-content-center">{{ mrWhite }} Mr. White: </label>
          <button class="btn bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isPlusWhiteHidden ? 'visibility: hidden;' : ''" @click="mrWhite++">+</button>
        </div>
      </v-card>
      <v-btn
        color="primary"
        text="Jouer"
        @click="goToGameSelect"
      ></v-btn>
    </div>
  </div>
  <div v-else-if="isCreateMenuSelected === 2" class="d-flex flex-column p-3">
    <v-card class="d-flex flex-column align-items-center gap-3 p-3 mb-5" style="background-color: #f1f1f1" >
      <div>
        <label class="fs-4">{{ civil }} {{ civil > 1 ? 'civils' : 'civil' }}  </label>
      </div>
      <div class="role">
        <button class="btn bg-black rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isMinusUndercoverHidden ? 'visibility: hidden;' : ''" @click="undercover--" :disabled="undercover <= 0">-</button>
        <label class="undercover fs-4 d-flex justify-content-center">{{ undercover }} {{undercover > 1 ? 'undercovers' : 'undercover' }} </label>
        <button class="btn bg-black rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isPlusUndercoverHidden ? 'visibility: hidden;' : ''" @click="undercover++">+</button>
      </div>
      <div class="role">
        <button class="btn bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isMinusWhiteHidden ? 'visibility: hidden;' : ''" @click="mrWhite--">-</button>
        <label class="mrwhite fs-4 d-flex justify-content-center">{{ mrWhite }} Mr. White: </label>
        <button class="btn bg-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; font-size: 1rem;" :style="isPlusWhiteHidden ? 'visibility: hidden;' : ''" @click="mrWhite++">+</button>
      </div>
    </v-card>

    <div class="grid-container mb-5">
      <PlayerCard v-for="index in players" :key="index-1" :refreshGame="refreshGame" @update:refresh-game="refreshGame++" :index="index-1" :canBeDeleted="true"
        @emitUserDeleted="refreshNumberPlayerWithLocalStorage"
      />
    </div>
    <v-btn
      color="primary"
      text="Jouer"
      @click="goToGameSelect"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import PlayerCard from '../components/PlayerCard.vue';
import SelectMenuGame from '@/components/SelectMenuGame.vue';

import { titleNavbar } from '@/stores/store';
import { descriptionNavbar } from '@/stores/store';
import { colors, dataGameCelest } from '@/helper/constants';

const refreshGame = ref<number>(0);

const isCreateMenuSelected = ref<number>(0);

const router = useRouter()
const players = ref(5)

const civil = computed(() => {
  return players.value - (undercover.value + mrWhite.value);
})
const undercover = ref(0)
const mrWhite = ref(0)

const isMinusWhiteHidden = computed(() => {
  return mrWhite.value <= 0 ? true : false;
})
const isMinusUndercoverHidden = computed(() => {
  return undercover.value <= 0 ? true : false;
})
const isPlusWhiteHidden = computed(() => {
  return mrWhite.value >= civil.value + mrWhite.value ? true : false;
})
const isPlusUndercoverHidden = computed(() => {
  return mrWhite.value >= civil.value + mrWhite.value ? true : false;
})

function generateRandomIndex(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1))
}

function callbackEventButtonMenuSelected(indexMenuSelected: number) {
  isCreateMenuSelected.value = indexMenuSelected;
  if(indexMenuSelected === 2) {
    localStorage.setItem('game', JSON.stringify(dataGameCelest));
    players.value = dataGameCelest.length;
  }
}

function refreshNumberPlayerWithLocalStorage() {
  players.value = JSON.parse(localStorage.getItem('game') || "[]").length;
  refreshGame.value ++;
}

function goToGameSelect() {
  let colorTmp = colors;

  if(isCreateMenuSelected.value === 1) {
    const users = [];

    let arraytmp = new Set();

    const minJoueur: number = 1;
    const maxJoueur: number = players.value;

    for(let i = 0; i < players.value; i++) {
      const index: number = generateRandomIndex(1, colors.length);
      const item = {
        id: i, 
        name: null, 
        role: 'civil', 
        color: colorTmp[index].value,
        order: null,
        alive: true,
        readyToPlay: false,
      };
      colorTmp.splice(index, 1)
      users.push(item);
    }

    let assigned = 0;

    while(assigned < undercover.value) {
      const index: number = generateRandomIndex(minJoueur, maxJoueur);

      if(!arraytmp.has(index)){
        arraytmp.add(index)
        users[index] = {
          id: users[index].id, 
          name: null, 
          role: 'undercover', 
          color: users[index].color,
          order: null,
          alive: true,
          readyToPlay: false,
        }
        assigned++;
      }
    }

    assigned = 0;

    while(assigned < mrWhite.value) {
      const index: number = generateRandomIndex(minJoueur, maxJoueur);

      if(!arraytmp.has(index)){
        arraytmp.add(index)
        users[index] = {
          id: users[index].id, 
          name: null, 
          role: 'mrWhite', 
          color: users[index].color,
          order: null,
          alive: true,
          readyToPlay: false,
        }
        assigned++;
      }
    }

    localStorage.setItem('game', JSON.stringify(users));

    localStorage.setItem('undercover', 'foot');
    localStorage.setItem('civil', 'rugby');

    titleNavbar.value = 'Joueur 1';
    descriptionNavbar.value = 'Sélectionne une carte !';
    
    router.push({path: '/game/select', state: { players: players.value, undercover: undercover.value, mrWhite: mrWhite.value, isChargedGame: 0 }})
  }else if(isCreateMenuSelected.value === 2) {
    const users = JSON.parse(localStorage.getItem('game') || "[]")

    let arraytmp = new Set();

    const minJoueur: number = 1;
    const maxJoueur: number = players.value;

    

    for(let i = 0; i < players.value; i++) {
      const index: number = generateRandomIndex(1, colors.length);
      console.log(index)
      const item = {
        id: i, 
        name: users[i].name, 
        role: 'civil', 
        color: colorTmp[index].value,
        order: null,
        alive: true,
        readyToPlay: false,
      };
      colorTmp.splice(index, 1)
      users[i] = item;
    }

    let assigned = 0;

    while(assigned < undercover.value) {
      const index: number = generateRandomIndex(minJoueur, maxJoueur);

      if(!arraytmp.has(index)){
        arraytmp.add(index)
        users[index] = {
          id: users[index].id, 
          name: users[index].name, 
          role: 'undercover', 
          color: users[index].color,
          order: null,
          alive: true,
          readyToPlay: false,
        }
        assigned++;
      }
    }

    assigned = 0;

    while(assigned < mrWhite.value) {
      const index: number = generateRandomIndex(minJoueur, maxJoueur);

      if(!arraytmp.has(index)){
        arraytmp.add(index)
        users[index] = {
          id: users[index].id, 
          name: users[index].name, 
          role: 'mrWhite', 
          color: users[index].color,
          order: null,
          alive: true,
          readyToPlay: false,
        }
        assigned++;
      }
    }

    localStorage.setItem('game', JSON.stringify(users));

    localStorage.setItem('undercover', 'foot');
    localStorage.setItem('civil', 'rugby');

    titleNavbar.value = users[0].name;
    descriptionNavbar.value = 'Sélectionne une carte !';
    
    router.push({path: '/game/select', state: { players: players.value, undercover: undercover.value, mrWhite: mrWhite.value, isChargedGame: 1 }})
    //maintenant que j'envoie au compsant que ca vient d'une aprtie chargé et j'ai toutes les données dans le localhost, 
    //adapter les dialogs pour afficher {nom} doit choisir une carte ..; et ainsi de suite
    //et mettre de base les cartes de dos et a chaque choix, afficher le nom et la couleur de la personne à la place de la carte

  }
  colorTmp = colors;
}

const users: any = computed(() => {
  refreshGame.value;
  return JSON.parse(localStorage.getItem('game') || "[]")
})

</script>

<style scoped>
.menu {
  padding: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.role {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.undercover {
  color: white;
  background-color: black;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 10px;
  width: 200px;
}

.btn:disabled {
  border-color: transparent !important;
}

.mrwhite {
  color: black;
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 10px;
  width: 200px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cartes par ligne */
  gap: 20px;
  justify-content: center;
}
</style>