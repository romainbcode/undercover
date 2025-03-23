<template>
    <img v-if="users[props.index].readyToPlay === false" class="card" src="../assets/card.png">
    <img v-else-if="!isAlive && canBeDeleted === false" class="card" src="../assets/player_eliminated.png"/>
    <div v-else class="d-flex flex-column align-items-center position-relative">
        <PlayerAvatar :color="users[props.index].color" :name="users[props.index].name"/>
        <div v-if="props.order && canBeVoted === false" class="badge-order">
          <label>{{ props.order }}</label>
        </div>
        <div v-if="canBeVoted === true" class="badge-vote">
          <label>Eliminer</label>
        </div>
        <div v-if="canBeDeleted"  class="badge-delete">
          <v-btn variant="text" density="compact" icon="mdi-close" color="red" @click="deleteUser(index)"/>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import PlayerAvatar from '../components/PlayerAvatar.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  refreshGame: {
    type: Number,
  },
  order: {
    type: Number
  },
  canBeVoted: {
    type: Boolean
  },
  isAlive: {
    type: Boolean
  },
  canBeDeleted: {
    type: Boolean,
  }
})

const emit = defineEmits(['emitUserDeleted'])

const users = computed(() => {
  props.refreshGame;
  return JSON.parse(localStorage.getItem('game') || "[]")
})

function deleteUser(index: number) {
  const users: any = JSON.parse(localStorage.getItem('game') || "[]")
  users.splice(index, 1)
  localStorage.setItem('game', JSON.stringify(users));
  emit('emitUserDeleted')
}
</script>

<style>

.card{
    border: 1px solid black;
}

.badge-order {
  position: absolute;
  right: 10px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid black;
  background-color: white;
  color: black;
  text-align: center;
}

.badge-vote {
  position: absolute;
  right: 20px;
  top: -10px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: white;
  color: black;
  text-align: center;
}

.badge-delete {
  position: absolute;
  right: 10px;
  top: 0px;
  width: 30px;
  height: 30px;
  background-color: white;
  text-align: center;
  border-radius: 50px;
  border: 1px solid red;
}

</style>