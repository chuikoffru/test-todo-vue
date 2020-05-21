<template>
  <div class="home">
    <div class="home__create">
      <img src="@/assets/pngfuel.com.png" width="250" alt="Create new todo" />
      <p class="home__create-title">Создайте новый список задач</p>
      <button class="home__create-button button" @click="createTodo">Создать список</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  methods: mapActions(['createTodo']),
};
</script>

<style lang="sass">
.home
  width: 100%
  height: 100%
  &__create
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    &-title
      margin: 20px
    &-button
      margin: 20px
</style>
