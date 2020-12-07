<template>
  <div>
    <label
      ><input
        type="checkbox"
        @change="checkAll"
        :checked="!anyRemaining"
      />Check All</label
    >
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "todo-check-all",
  computed: {
    ...mapGetters({
      anyRemaining: 'anyRemaining'
    })
  },
  methods: {
    checkAll(e) {
      this.$store.dispatch('checkAll', e.target.checked);
    }
  }
};
</script>

<style></style>
