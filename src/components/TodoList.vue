<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What need to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
      v-focus
    />
    <transition-group
      name="fade"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <todo-item
        v-for="(todo, index) in todosFilterd"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
      >
      </todo-item>
    </transition-group>
    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filter />
      <div>
        <transition name="fade">
          <todo-clear-completed :showClearCompleted="showClearCompleted" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFilter from "./TodoFilter.vue";
import TodoClearCompleted from "./TodoClearCompleted.vue";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted
  },

  data() {
    TodoFilter;
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: null,
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
    };
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  created() {
    eventBus.$on("removedTodo", index => this.removeTodo(index));
    eventBus.$on("finishedEdit", data => this.finishedEdit(data));
    eventBus.$on("checkAllChanged", checked => this.checkAllTodo(checked));
    eventBus.$on("filterChanged", filter => (this.filter = filter));
    eventBus.$on("clearCompletedTodo", () => this.clearCompleted());
  },
  beforeDestroy() {
    eventBus.$off("removedTodo", index => this.removeTodo(index));
    eventBus.$off("finishedEdit", data => this.finishedEdit(data));
    eventBus.$off("checkAllChanged", checked => this.checkAllTodo(checked));
    eventBus.$off("filterChanged", filter => (this.filter = filter));
    eventBus.$off("clearCompletedTodo", () => this.clearCompleted());
  },

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
    todosFilterd() {
      if (this.filter === "all") {
        return this.todos;
      }
      if (this.filter === "active") {
        return this.todos.filter(todo => !todo.completed);
      }
      if (this.filter === "completed") {
        return this.todos.filter(todo => todo.completed);
      }

      return this.todos;
    },
    showClearCompleted() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      });

      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodo(checked) {
      console.log(checked);
      this.todos.forEach(todo => (todo.completed = checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
.todo-input {
  width: 100%;
  padding: 10px 10px;
  font-size: 18px;
  margin-bottom: 20px;
}
.todo-input:focus {
  outline: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
}
.remove-item:hover {
  color: black;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit-input {
  font-size: 24px;
  color: #2c3e50;
  padding: 10px;
  margin-left: 12px;
  width: 100%;
  border: 1px solid #ccc;
}
.todo-item-edit:focus {
  outline: 0 !important;
}

.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  border: none;
  padding: 5px 10px;
}
button:hover {
  background-color: lightgray;
  cursor: pointer;
}
button:focus {
  outline: none;
}

.active {
  background: lightgreen;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
