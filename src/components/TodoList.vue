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
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed" />
        <div
          v-if="!todo.editing"
          @dblclick="editTodo(todo)"
          class="todo-item-label"
          :class="{ completed: todo.completed }"
        >
          {{ todo.title }}
        </div>
        <input
          v-else
          class="todo-item-edit-input"
          type="text"
          v-model="todo.title"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          v-focus
          @keyup.esc="cancelEdit(todo)"
        />
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        <span>&times;</span>
      </div>
    </div>
    <div class="extra-container">
      <label><input type="checkbox" :checked="!anyRemaining" />Check All</label>
      <div>{{ remaining }} items remaining</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: null,
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
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
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
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.title.trim().length === 0) {
        return;
      }

      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    }
  }
};
</script>

<style>
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
}
button:hover {
  background-color: lightgray;
}
button:focus {
  outline: none;
}

.active {
  background: lightgreen;
}
</style>
