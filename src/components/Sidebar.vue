<template>
  <aside class="sidebar">
    <div class="sidebar__title">Список задач</div>
    <div class="sidebar__list">
      <div class="sidebar__list-item todo" v-for="todo in getTodos" :key="todo.id">
        <h3 class="todo__title">{{todo.title}}</h3>
        <p class="todo__description" v-show="todo.tasks.length > 0">
          {{todo.tasks.join(', ')}}
        </p>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['getTodos']),
};
</script>

<style lang="sass">
.sidebar
  color: #fff
  padding-top: 25px
  height: 100vh
  overflow: auto
  &__title
    font-size: 1.6rem
    text-align: center
  &__list
    margin: 20px
    .todo
      padding: 25px
      border-bottom: 1px solid #222
      &__title
        font-size: 1.2rem
      &__description
        margin-top: 10px
      &:hover
        background: #222
        cursor: pointer
      &:last-child
        border-bottom: 0
</style>
