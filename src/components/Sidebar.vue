<template>
  <aside class="sidebar">
    <div class="sidebar__top">
      <div class="sidebar__top-title">Списки задач</div>
      <div class="sidebar__top-addButton">
        <button @click="createTodo" title="Создать новый список">+</button>
      </div>
    </div>
    <div class="sidebar__list" v-if="getTodos.length > 0">
      <router-link
        tag="div"
        class="sidebar__list-item todo"
        v-for="(todo, i) in getTodos"
        :key="todo.id"
        :to="'/todo/' + todo.id"
      >
        <h3 class="todo__title">#{{todo.id}} {{todo.title}}</h3>
        <p class="todo__description" v-show="todo.tasks.length > 0">{{todo.tasks.join(', ')}}</p>
        <button class="todo__remove" @click.stop="showConfirm(i)">Удалить</button>
      </router-link>
    </div>
    <div class="sidebar__empty" v-else>
      <p>Список задач пуст. Создайте новый список.</p>
    </div>
    <transition name="appear">
      <Confirm
        :modal="modal"
        v-if="modal.isVisible"
        @confirm="confirmRemove(modal.index)"
        @cancel="cancelRemove"
      />
    </transition>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Confirm from '@/components/Confirm.vue';

export default {
  components: {
    Confirm,
  },
  data() {
    return {
      modal: {
        isVisible: false,
        message: 'Вы уверены что хотите удалить список?',
        index: null,
      },
    };
  },
  computed: mapGetters(['getTodos']),
  methods: {
    ...mapActions(['createTodo', 'removeTodo']),
    showConfirm(index) {
      this.modal = {
        ...this.modal,
        isVisible: true,
        index,
      };
    },
    confirmRemove() {
      this.removeTodo(this.modal.index);
      this.cancelRemove();
    },
    cancelRemove() {
      this.modal = {
        ...this.modal,
        isVisible: false,
        item: {},
        index: null,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.sidebar
  color: #fff
  height: 100vh
  overflow: auto
  &__empty
    text-align: center
    padding: 25px
    height: 97%
    display: flex
    justify-content: center
    align-items: center
  &__top
    display: flex
    justify-content: space-between
    padding: 25px
    &-title
      font-size: 1.5rem
      font-weight: bold
      padding-top: 12px
      color: $sb-color
    &-addButton button
      font-size: 1.2rem
      font-weight: bold
      border-radius: 50%
      padding: 6px 10px 8px
      vertical-align: middle
      cursor: pointer
      border: 0
      line-height: 100%
      background: $sb-color
  &__list
    .todo
      padding: 25px
      border-bottom: 1px solid $border
      &.router-link-active
        background: $border
      &__title
        font-size: 1.2rem
      &__description
        margin-top: 10px
      &:hover
        background: $border
        cursor: pointer
      &:last-child
        border-bottom: 0
      a
        color: #fff
</style>