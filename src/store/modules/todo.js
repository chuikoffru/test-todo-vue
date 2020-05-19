const DB_NAME = 'todo';
const AI_NAME = 'auto_increment';

export default {
  state: {
    todos: JSON.parse(localStorage.getItem(DB_NAME) || '[]'),
    idx: localStorage.getItem(AI_NAME) || 1,
  },
  mutations: {
    addTodo(state) {
      state.todos.push({
        id: state.idx,
        title: `#${state.idx} Новый список задач`,
        tasks: [],
      });
      state.idx += 1;
      localStorage.setItem(DB_NAME, JSON.stringify(state.todos));
      localStorage.setItem(AI_NAME, parseInt(state.idx, 0));
    },
    removeTodo(state, id) {
      console.log('state, id', state, id);
    },
    addTask(state, id, task) {
      console.log('state, id', state, id, task);
    },
    removeTask(state, id, task) {
      console.log('state, id', state, id, task);
    },
    editTodoTitle(state, id) {
      console.log('state, id', state, id);
    },
    editTodoTask(state, id, task) {
      console.log('state, id', state, id, task);
    },
  },
  actions: {
    createTodo({ commit }) {
      commit('addTodo');
    },
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
};
