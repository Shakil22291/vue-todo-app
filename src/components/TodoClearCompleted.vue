<template>
  <button v-if="showClearCompleted" @click="clearCompleted">
    Clear Completed
  </button>
</template>

<script>
export default {
  name: "todo-clear-completed",
  props: {
    showClearCompleted: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    clearCompleted() {
      eventBus.$emit('clearCompletedTodo');
    }
  }
};
</script>

<style></style>
