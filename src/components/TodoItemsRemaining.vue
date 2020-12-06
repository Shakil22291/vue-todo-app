<template>
  <div>
    <div v-if="remaining == 0">No items remaining</div>
    <div v-else>{{ remaining }} items remaining</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "todo-remaining",
  computed: {
    ...mapGetters({
      remaining: "remaining"
    })
  }
};
</script>

<style></style>
