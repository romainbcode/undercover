<template>
    <div class="d-flex justify-content-center align-items-center flex-column">
        <v-avatar :color="color" size="75" class="position-relative ttt">
            <span class=" fs-1 fw-bold text-center text-white">
                {{ props.name[0] }}
            </span>
        </v-avatar>
        <label class="badge text-black text-wrap w-100 mt-1"> 
            {{ props.name }}
        </label>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
})
</script>
<style>
  .ttt {
    border: 2px solid black;
  }
</style>