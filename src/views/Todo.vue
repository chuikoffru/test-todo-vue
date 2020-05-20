<template>
  <div class="todo">
    <div class="todo__input">
      <input
        type="text"
        v-model="newTask"
        placeholder="Введите описание задачи"
        @keydown.enter="addTask"
      >
    </div>
    <div class="todo__list">
      <div class="todo__list-item" v-for="(task, i) in tasks" :key="i">
        <label><input type="checkbox" v-model="task.status"> {{task.title}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Todo',
  data() {
    return {
      id: +this.$route.params.id,
      newTask: '',
      tasks: [],
    };
  },
  computed: mapGetters(['getTodos', 'getTodoById']),
  watch: {
    $route: 'getTodo',
  },
  methods: {
    getTodo() {
      const todo = this.getTodoById(this.id).tasks;
      if (!todo) {
        this.$router.push('/');
      } else {
        this.tasks = todo;
      }
    },
    addTask() {
      this.$store.dispatch('addTask', {
        id: this.id, text: this.newTask,
      });
      this.newTask = '';
    },
  },
};
</script>

<style lang="sass" scoped>
.todo
</style>
