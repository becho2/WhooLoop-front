<template>
  <q-page>
    hello
    {{ name }}: {{ counter }} : {{ doubleCount }}
    <q-btn @click="addOne"> addOne </q-btn>
    <q-btn @click="add(15)"> add </q-btn>
    <q-btn @click="reset"> reset </q-btn>
    <q-btn @click="update"> update </q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { counterStore } from "../store/counter-store";

const main = counterStore();

const { counter, name, doubleCount } = storeToRefs(main);
const { addOne } = main;

function add(value: number) {
  main.$patch((state) => {
    state.counter += value;
  });

  // 또는
  // main.$patch({
  //   counter: counter.value + value
  // })
}

function reset() {
  main.$reset();
}

function update() {
  main.$state = { counter: 900, name: "korea" };
}

main.$subscribe((mutation, state) => {
  console.log("mutation", mutation);
  console.log("state", state);
});
</script>
