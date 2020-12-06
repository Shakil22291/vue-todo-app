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
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filter />
      <div>
        <transition name="fade">
          <todo-clear-completed />
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
import { mapGetters } from "vuex";

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
      beforeEditCache: null
    };
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    ...mapGetters({
      remaining: "remaining",
      anyRemaining: "anyRemaining",
      todosFilterd: "todosFilterd",
      showClearCompleted: "showClearCompleted"
    })
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }

      this.$store.dispatch("addTodo", {
        id: this.idForTodo,
        title: this.newTodo,
      });

      this.newTodo = "";
      this.idForTodo++;
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
