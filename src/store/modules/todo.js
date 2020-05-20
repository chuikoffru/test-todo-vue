import router from '@/router';

const DB_NAME = 'todo';
const AI_NAME = 'auto_increment_todo';

export default {
  state: {
    todos: JSON.parse(localStorage.getItem(DB_NAME) || '[]'),
    idx: +localStorage.getItem(AI_NAME) || 1,
  },
  mutations: {
    addTodo(state) {
      state.todos.push({
        id: state.idx,
        title: 'Новый список задач',
        tasks: [],
        createdAt: Date.now(),
      });
      state.idx += 1;
      localStorage.setItem(DB_NAME, JSON.stringify(state.todos));
      localStorage.setItem(AI_NAME, state.idx);
      router.push(`/todo/${state.idx - 1}`);
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
    addTask(state, payload) {
      const index = state.todos.findIndex((s) => s.id === payload.id);
      console.log('state.todos, payload', state.todos, payload);
      state.todos[index].tasks.push({
        text: payload.text,
        status: false,
      });
    },
    removeTask(state, id, task) {
      console.log('state, id', state, id, task);
    },
    editTodoTask(state, id, task) {
      console.log('state, id', state, id, task);
    },
  },
  actions: {
    createTodo({ commit }) {
      commit('addTodo');
    },
    removeTodo({ commit, dispatch }, index) {
      commit('removeTodo', index);
      dispatch('saveData');
    },
    addTask({ commit }, payload) {
      commit('addTask', payload);
    },
    saveData({ state }) {
      localStorage.setItem(DB_NAME, JSON.stringify(state.todos));
    },
  },
  getters: {
    getTodos: (state) => state.todos,
    getTodoById: (state) => (id) => state.todos.find((item) => item.id === id),
  },
};
