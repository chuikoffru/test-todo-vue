<template>
  <aside class="sidebar">
    <div class="sidebar__top">
      <div class="sidebar__top-title">
        <router-link to="/">Списки задач</router-link>
      </div>
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
        <div class="todo__left">
          <h3 class="todo__left-title">#{{todo.id}} {{todo.title}}</h3>
          <p class="todo__left-description" v-if="todo.tasks.length > 0">
            <time>
              {{new Date(todo.createdAt).toLocaleDateString()}}
            </time>
            <span v-for="t in todo.tasks" :key="t.text">{{t.text}}</span>
          </p>
        </div>
        <div class="todo__right">
          <button class="todo__right-remove" @click.stop="showConfirm(i)">Удалить</button>
        </div>
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
      this.$router.push('/');
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
    height: 90%
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
      a
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
      display: flex
      justify-content: space-between
      &.router-link-active
        background: $border
      &__left
        &-title
          font-size: 1.1rem
          margin-top: 5px
        &-description
          line-height: 125%
          margin: 10px 10px 0 0
          font-size: 0.9rem
          color: $sb-color
          overflow: hidden
          max-height: 55px
          time
            color: $accent
            font-weight: bold
          span
            &::after
              content: ", "
            &:last-child
              &::after
                content: "..."
      &__right
        height: 25px
        display: flex
        align-self: center
        &-remove
          background: $sb-color
          padding: 5px 10px
          visibility: hidden
      &:hover
        background: $border
        cursor: pointer
        .todo__right-remove
          visibility: visible
      &:last-child
        border-bottom: 0
      a
        color: #fff
</style>
