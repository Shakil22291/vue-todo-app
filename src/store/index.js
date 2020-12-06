import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [
      {
        id: 1,
        title: "Finish the task",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "do some hello world",
        completed: true,
        editing: false
      }
    ]
  },

  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    todosFilterd(state) {
      if (state.filter === "all") {
        return state.todos;
      }
      if (state.filter === "active") {
        return state.todos.filter(todo => !todo.completed);
      }
      if (state.filter === "completed") {
        return state.todos.filter(todo => todo.completed);
      }

      return state.todos;
    },
    showClearCompleted(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },

  actions: {
    addTodo({ commit }, todo) {
      commit("pushTodo", todo);
    }
  },

  mutations: {
    pushTodo(state, data) {
      state.todos.push(data);
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, todo);
    }
  }
});
