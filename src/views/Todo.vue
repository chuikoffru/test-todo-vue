<template>
  <div class="todo">
    <div class="todo__input">
      <input
        type="text"
        v-model="newTask"
        placeholder="Введите описание задачи и нажмите Enter"
        @keydown.enter="addTask"
      >
      <img src="@/assets/enter-key.png" width="32"
        title="Нажмите Enter чтобы добавить новую задачу">
    </div>
    <div class="todo__list" v-if="getTodoList">
      <div class="todo__list-item input" v-for="(task, i) in getTodoList.tasks" :key="i">
          <div class="input__status">
            <input class="input__status-checkbox" type="checkbox" v-model="task.status">
            <label class="input__status-checkbox-custom" :class="{active : task.status}"></label>
          </div>
          <div class="input__text">
            <textarea
              class="input__text-textarea"
              v-model="task.text"
              v-resize>
            </textarea>
          </div>
          <div class="input__button">
            <button class="input__button-remove" @click="removeTask(i)">Удалить</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import autoHeight from '@/libs/autoHeight';

export default {
  name: 'Todo',
  data() {
    return {
      newTask: '',
    };
  },
  computed: {
    getTodoList() {
      return this.$route.params.id && this.$store.getters.getTodoById(+this.$route.params.id);
    },
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask', {
        id: +this.$route.params.id, text: this.newTask,
      });
      this.newTask = '';
    },
    removeTask(index) {
      this.$store.commit('removeTask', { index, id: +this.$route.params.id });
    },
  },
  beforeMount() {
    if (!this.getTodoList) {
      this.$router.push('/');
    }
  },
  directives: {
    resize: {
      inserted: (el) => autoHeight(el),
      update: (el) => autoHeight(el),
      componentUpdated: (el) => autoHeight(el),
    },
  },
};
</script>

<style lang="sass" scoped>
.todo
  &__input
    margin: 5px 0 25px
    display: flex
    align-items: center
    input
      padding: 10px 15px
      font-size: 1rem
      width: 50%
      margin-right: 10px
  &__list
    &-item
      margin: 15px 0
      font-size: 1.1rem
      display: flex
      flex-direction: row
      textarea:focus, input:focus
        outline: none
        box-shadow: 1px 1px 0 1px #000
      .input
        &__status
          width: 50px
          &-checkbox
            opacity: 0
            position: relative
            top: -2px
            left: 3px
            width: 25px
            height: 25px
            z-index: 2
            margin: 0
            cursor: pointer
          &-checkbox-custom
            display: inline-block
            position: relative
            width: 30px
            height: 30px
            margin-left: -25px
            background: #fff
            border: 3px solid #000
            &::before
              display: inline-block
              content: ""
              width: 20px
              height: 20px
              margin: 2px
              background: #fff
          &-checkbox-custom.active
            &::before
              background: #000
        &__text
          width: 100%
          padding-right: 20px
          &-textarea
            width: 100%
            resize: none
            background: $co-bg
            border: 0
            font-size: 1rem
            margin-top: 3px
</style>
