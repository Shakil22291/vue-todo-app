<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "todo-filter",
  computed: {
    ...mapState({
      filter: 'filter'
    })
  },
  methods: {
    changeFilter(filter) {
      this.$store.commit('updateFilter', filter);
    }
  }
};
</script>

<style></style>
