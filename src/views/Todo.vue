<template>
  <div class="todo">
    {{tasks}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Todo',
  data() {
    return {
      tasks: [],
    };
  },
  computed: mapGetters(['getTodos', 'getTodoById']),
  watch: {
    getTodos: 'checkTodo',
  },
  methods: {
    checkTodo() {
      if (!this.getTodoById(+this.$route.params.id)) {
        this.$router.push('/');
      }
    },
  },
  mounted() {
    if (this.getTodos.length > 0) {
      this.tasks = this.getTodoById(+this.$route.params.id).tasks;
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="sass" scoped>
</style>
