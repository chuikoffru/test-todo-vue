<template>
  <header class="header" v-if="todo">
    <div class="header__left">
      <input
        type="text"
        class="header__left-title"
        ref="title"
        v-model="todo.title"
      />
    </div>
    <div class="header__right">
      <button class="header__right-button button" @click="saveData">Сохранить</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      todo: null,
    };
  },
  watch: {
    $route: 'getTodo',
  },
  methods: {
    getTodo() {
      if (this.$route.params.id) {
        this.todo = this.$store.getters.getTodoById(+this.$route.params.id);
      }
    },
    updateTitle(e) {
      this.$store.commit('updateTitle', +this.$route.params.id, e.target.value);
    },
    saveData() {
      this.$store.dispatch('saveData');
    },
  },
};
</script>

<style lang="sass">
.header
  width: 100%
  height: 60px
  background: #ccc
  display: flex
  justify-content: space-between
  &__left
    flex-basis: 50%
    &-title
      color: $border
      width: 100%
      border: 0
      background: inherit
      border-bottom: 2px solid $border
      border-left: 2px solid $border
      font-size: 1.6em
      padding: 5px 10px
      margin: 10px
  &__right
    &-button
      margin: 5px
</style>
