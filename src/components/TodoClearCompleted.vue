<template>
  <button v-if="showClearCompleted" @click="clearCompleted">
    Clear Completed
  </button>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "todo-clear-completed",
  computed: {
    ...mapGetters({
      showClearCompleted: 'showClearCompleted'
    })
  },

  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
};
</script>

<style></style>
