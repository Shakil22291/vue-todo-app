<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        class="todo-item-edit-input"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        v-focus
        @keyup.esc="cancelEdit"
      />
    </div>
    <div>
      <button @click="pluralize">pluralize</button>
      <span class="remove-item" @click="removeTodo(id)">
        <span>&times;</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
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
  created() {
    eventBus.$on("pluralize", this.handlePluralize);
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  beforeDestroy() {
    eventBus.$off("pluralize", this.handlePluralize);
  },

  methods: {
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim().length === 0) {
        return;
      }
      this.editing = false;
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      eventBus.$emit("pluralize");
    },
    handlePluralize() {
      console.log("hello");
      this.title = this.title + "s";
      eventBus.$emit("finishedEdit", {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });
    }
  }
};
</script>

<style></style>
